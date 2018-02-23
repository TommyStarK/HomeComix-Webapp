import React from 'react'
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Delete from 'material-ui/svg-icons/action/delete'
import EditBookDialog from './editBookDialog.js'


export default class BookCard extends React.Component {

  constructor(props) {
    super(props)
    this.edit = this.edit.bind(this)
    this.delete = this.delete.bind(this)
  }

  edit(event) {
    this.props.edit(event)
  }

  delete(event) {
    this.props.delete(event)
  }

  render() {
    return (
      <Card>
        {/* <CardMedia overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}>
          <img src="images/nature-600-337.jpg" alt="" />
        </CardMedia> */}
        <CardTitle title={this.props.data.title} subtitle={this.props.data.year} />
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