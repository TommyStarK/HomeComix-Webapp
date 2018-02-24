import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye'

export default class EditBookDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    const body = new FormData()
    const data = new FormData(event.target)

    body.append('year', data.get('year'))
    body.append('description', data.get('description'))
    body.append('authors', data.get('authors'))
    body.append('collections', data.get('collections'))
    body.append('illustrators', data.get('illustrators'))
    this.props.edit(event, body)
  }

  handleOpen() {
    this.setState({ open: true })
  }

  handleClose()  {
    this.setState({ open: false })
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />
    ]

    return (
      <div>
        <FlatButton style={{ width: '100px'}} label="Edit" labelPosition="before" icon={<RemoveRedEye/>} onClick={this.handleOpen}/>
        <Dialog
          title={"Edit " + this.props.data.title}
          actions={actions}
          // modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          style={{ 
            // left: '50%',
          padding: '2rem',
          position: 'fixed',
          width: '700px',
          
          // right: '50%',
          // top: '50%'
        }}
          
        >
          <form onSubmit={this.handleSubmit}>
            <label>
                Year:&nbsp;
                <input type="text" name="year"/>
            </label><br/>
            <label>
                Description:&nbsp;
                <input type="text" name="description"/>
            </label><br/>
            <label>
                authors:&nbsp;
                <input type="text" name="authors"/>
            </label><br/>
            <label>
                illustrators:&nbsp;
                <input type="text" name="illustrators"/>
            </label><br/>
            <label>
                collections:&nbsp;
                <input type="text" name="collections"/>
            </label><br/>
            <input className="edit-submit-btn" type="submit" value="Submit" />
          </form>
        </Dialog>
      </div>
    )
  }
}