import React from 'react'
import { Fetch } from './fetch.js'
import BookCard from '../interface/bookCard.js'
import logo from '../static/wolwerine.jpg'

class Library extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            id: 0,
            books: [],
            loading: false,
            error: null
        }
        this.next = this.next.bind(this)
        this.edit = this.edit.bind(this)
        this.delete = this.delete.bind(this)
        this.previous = this.previous.bind(this)
    }

    componentDidMount() {
        const headers = {
            'Accept': 'application/json',
            'Authorization': this.props.token
        }

        this.setState({ loading: true })
        Fetch('GET', 'http://localhost:3000/api.homecomix/books', headers)
            .then(response => {
                const books = []

                if (response.success) {
                    for (var book of response.books) { books.push(book) }
                    this.setState({ books: books, loading: false })
                } else if (response.status === 404) {
                    this.setState({ books: [], loading: false})
                }
            })
            .catch(err => { 
                console.log(err)
                this.setState({ error: err, loading: false })
            })
    }
    
    previous() {
        this.setState({ id: !this.state.id ? this.state.books.length - 1 : this.state.id - 1 })
        
    }

    next() {
        this.setState({ id: this.state.id + 1 > this.state.books.length - 1 ? 0 : this.state.id + 1 })
    }

    delete(event) {
        event.preventDefault()

        const headers = {
            'Authorization': this.props.token
          }
      
        Fetch('DELETE', 'http://localhost:3000/api.homecomix/book/' + this.state.books[this.state.id]._id, headers)
            .then(response => {
                const books = this.state.books.slice()
                books.splice(this.state.id, 1)
                this.setState({ books: books })
            })
            .catch(err => { console.log(err) })

        this.setState({ id: 0 })
    }

    edit(event, data) {
        const body = {
            year: data.get('year'),
            description: data.get('description'),
            authors: data.get('authors'),
            collections: data.get('collections'),
            illustrators: data.get('illustrators')
        }
 
        const headers = {
            'Content-type': 'application/json',
            'Authorization': this.props.token
          }
      
        Fetch('PUT', 'http://localhost:3000/api.homecomix/book/' + this.state.books[this.state.id]._id, headers, body)
            .then(response => {
                if (response.success) {
                    Fetch('GET', 'http://localhost:3000/api.homecomix/book/' + this.state.books[this.state.id]._id, headers)
                    .then(response => {
                        if (response.success) {
                            const books = this.state.books.slice()
                            books[this.state.id] = response.book
                            this.setState({ books: books })
                        } 
                    })
                    .catch(err => { console.log(err) })
                }
             })
            .catch(err => { console.log(err) })

         this.setState({ id: this.state.id })
    }

    render(){
        const { loading, error } = this.state

        if (error) {
            return(
                <p>{error.message}</p>
            )
        }

        if (loading) {
            return(
                <p>Loading...</p>
            )
        }

        return(
            <div className="library">
                {this.state.books.length 
                    ?
                    
                    <div className="library-singlepage">
                        <BookCard token={this.props.token} data={this.state.books[this.state.id]} delete={this.delete} edit={this.edit}/>
                        <button className="button-profil profil-button-left" onClick={this.previous}>&#10094;</button>
                        <button className="button-profil profil-button-right"onClick={this.next}>&#10095;</button>
                    </div>
                    :
                    <img className="nobook" src={logo} alt="loading"/>
                }
            </div>
        )
    }
  }

export default Library