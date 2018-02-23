import React from 'react'
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Delete from 'material-ui/svg-icons/action/delete'
import { Fetch } from '../logic/fetch.js'
import EditBookDialog from './editBookDialog.js'


export default class BookCard extends React.Component {

  constructor(props) {
    	super(props)
		this.state = {
			loading: false,
			thumbnail: null
		}
		this.edit = this.edit.bind(this)
		this.delete = this.delete.bind(this)
  }

  componentDidMount() {
    	const headers = {
			'Accept': 'application/json',
			'Authorization': this.props.token
		}
		
		this.setState({ loading: true })

		Fetch('GET', 'http://localhost:3000/api.homecomix/book/' + this.props.data._id + '/thumbnail', headers)
			.then(response => {
				console.log(response)
				if (response.success) {
					this.setState({ thumbnail: response.page, loading: false })
				}
			})
			.catch(err => {
				console.log(err)
				this.setState({ loading: false})
			})
	}

  edit(event) {
    	this.props.edit(event)
  }

  delete(event) {
    	this.props.delete(event)
  }

  render() {
		const { loading } = this.state
		  
	  	if (loading) {
			  return(
				 	 <div>
						Loading ...
					</div>
			  )
		}

		console.log(this.state.thumbnail)
		const thubmail = 'data:image/png;base64,' + this.state.thumbnail

		return (
			<Card className="bookCard">
				<CardMedia overlay={<CardTitle title={this.props.data.title} subtitle={this.props.data.year} />}>
					<img src={{uri: thubmail}} style={{ height: 100, width: 50 }} alt="thumbnail" />
				</CardMedia>
				<CardText>
					{this.props.data.description}
				</CardText>
				<CardActions>
					<EditBookDialog data={this.props.data} edit={this.props.edit}/>
					<FlatButton label="Delete" labelPosition="before" icon={<Delete/>} onClick={this.delete}/>
				</CardActions>
			</Card>
		)
  }
}