import React from 'react'
// import { Image } from '©react-native'
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Toggle from 'material-ui/Toggle';
import FlatButton from 'material-ui/FlatButton'
import Delete from 'material-ui/svg-icons/action/delete'
import { Fetch } from '../logic/fetch.js'
import EditBookDialog from './editBookDialog.js'
import Loader from '../interface/loader.js'


import Logo from '../static/toto.jpg'


export default class BookCard extends React.Component {

  constructor(props) {
    	super(props)
		this.state = {
			loading: false,
			thumbnail: null,
			expanded: false
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

	handleExpandChange = (expanded) => {
		this.setState({expanded: expanded})
	}

	handleToggle = (event, toggle) => {
		this.setState({expanded: toggle})
	}

	handleExpand = () => {
		this.setState({expanded: true})
	}

	handleReduce = () => {
		this.setState({expanded: false})
	}

  render() {
		let authors = []
		let collections = []
		let illustrators = []
		const { loading } = this.state

	  	
        if (loading) {
            return(
                <Loader />
            )
		}
		
		for (let author of this.props.data.authors) {
			authors.push(author.name)
		}

		for (let collection of this.props.data.collections) {
			collections.push(collection.name)
		}

		for (let illustrator of this.props.data.illustrators) {
			illustrators.push(illustrator.name)
		}

		return (		
			<Card className="bookCard" expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
				<CardMedia overlay={<CardTitle title={this.props.data.title}/>}>
					{/* <img src={{uri: thubmail}}  alt="thumbnail" /> */}
					<img src={Logo} alt="thumbnail" />
				</CardMedia>
				<Toggle
					toggled={this.state.expanded}
					onToggle={this.handleToggle}
					labelPosition='left'
					label='See details'
				/>
				<CardText expandable={true}>
					<div style={{display: 'flex', flexDirection: 'row'}}>
						<span style={{ fontWeight: 'bold', color: 'black' }}>Year</span>:&nbsp;{!this.props.data.year.length ? 'Not provided' : this.props.data.year}<br/>
					</div>
					<div style={{display: 'flex', flexDirection: 'row'}}>
						<span style={{ fontWeight: 'bold', color: 'black' }}>Description</span>:&nbsp;{!this.props.data.description.length ? 'Not provided' : this.props.data.description}<br/>
					</div>
					<div style={{display: 'flex', flexDirection: 'row'}}>
						<span style={{ fontWeight: 'bold', color: 'black' }}>Authors</span>:&nbsp;{authors.join('-')}<br/>
					</div>
					<div style={{display: 'flex', flexDirection: 'row'}}>
						<span style={{ fontWeight: 'bold', color: 'black' }}>Collections</span>:&nbsp;{collections.join('-')}<br/>
					</div>
					<div style={{display: 'flex', flexDirection: 'row'}}>
						<span style={{ fontWeight: 'bold', color: 'black' }}>Illustrators</span>:&nbsp;{illustrators.join('-')}<br/>
					</div>
					<CardActions>
						<div className="edit-remove-book">
							<EditBookDialog data={this.props.data} edit={this.props.edit}/>
							<FlatButton label="Delete" labelPosition="before" icon={<Delete/>} onClick={this.delete}/>
						</div>
					</CardActions>
				</CardText>
			</Card>
		)
  }
}