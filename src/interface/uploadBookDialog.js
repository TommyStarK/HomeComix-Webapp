import React from 'react';
import Dialog from 'material-ui/Dialog'
// import Button from 'material-ui/Button'
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add'
// import FloatingActionButton from 'material-ui/FloatingActionButton'
import { Fetch } from '../logic/fetch.js'

export default class UploadBookDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      file: null
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    const body = new FormData()
    const data = new FormData(event.target)

    body.append('file', this.state.file)
    body.append('year', data.get('year'))
    body.append('description', data.get('description'))
    body.append('authors', data.get('authors'))
    body.append('collections', data.get('collections'))
    body.append('illustrators', data.get('illustrators'))

    const headers = {
      'Authorization': this.props.token
    }

    Fetch('POST', 'http://localhost:3000/api.homecomix/book', headers, body)
      .then(response => { console.log(response) })
      .catch(err => { console.log(err) })
  }

  handleChange(event) {
    console.log(event.target.files)
    this.setState({ file: event.target.files[0] })
  }

  handleOpen() {
    this.setState({ open: true })
  }

  handleClose()  {
    this.setState({ open: false });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />
    ];

    const style = {
      backgroundColor: '#666',
	    color: '#fff',
	    fontWeight: 'bold',
  	  padding: '10px',
	    MozBorderRadius: '5px',
      WebkitBorderRadius: '5px',
      width: '150px', 
      height: '50px',
      marginTop: '20px', 
      marginRight: '50px',
      letterSpacing: '-1px'
    }

    return (
      <div className="uploadBook">
        <FlatButton variant="raised" style={style} onClick={this.handleOpen}>
          <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '20px'}}>
            <span style={{ fontWeight: 'bold', color: 'white' }}>Add book</span>
            <ContentAdd style={{marginTop: '5px', color: 'white' }}/>
          </div>
        </FlatButton>
        <Dialog
          title="Upload a new book"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <label>
                File:
                <input type="file" onChange={this.handleChange}/>
            </label>
            <label>
                Year:
                <input type="text" name="year"/>
            </label>
            <label>
                Description:
                <input type="text" name="description"/>
            </label>
            <label>
                authors:
                <input type="text" name="authors"/>
            </label>
            <label>
                illustrators:
                <input type="text" name="illustrators"/>
            </label>
            <label>
                collections:
                <input type="text" name="collections"/>
            </label>
            <input type="submit" value="Submit" />
          </form>
        </Dialog>
      </div>
    );
  }
}