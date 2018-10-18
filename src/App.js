import React from 'react'
import {BrowserRouter as Router, Route} from "react-router-dom"
import HomePage from './Pages/HomePage'
import SearchPage from './Pages/SearchPage'
import Loading from './Components/Loading'
import * as BooksAPI from './Services/BooksAPI'
import './App.css'

class BooksApp extends React.Component {

    state = {
        loading: false,
        books: [],
        shelves: [
            {
                slug: 'currentlyReading',
                name: 'Currently Reading'
            },
            {
                slug: 'wantToRead',
                name: 'Want to Read'
            },
            {
                slug: 'read',
                name: 'Read'
            },
            {
                slug: 'none',
                name: 'None',
                hidden: true
            }
        ]
    };

    componentDidMount() {
        this.setState({
            loading: true
        });
        BooksAPI.getAll().then((books) => {
            this.setState(() => ({
                books,
                loading: false
            }))
        })
    }

    changeShelf = (book, shelf) => {
        this.setState({
            loading: true
        });
        BooksAPI.update(book, shelf).then(() => {
            this.setState((prevState) => {
                let books = prevState.books;

                const bookInState = books.find((_book) => (
                    _book.id === book.id
                ));
                if (bookInState) {
                    bookInState.shelf = shelf;
                } else {
                    book.shelf = shelf
                    books = books.concat([book])
                }

                return {
                    books,
                    loading: false
                }
            })
        });
    };

    render() {
        return (
            <Router>
                <div className="app">
                    <Loading loading={this.state.loading} />

                    <Route exact path="/" render={() => (
                        <HomePage
                            books={this.state.books}
                            shelves={this.state.shelves}
                            onShelfChanged={this.changeShelf}
                        />
                    )}/>
                    <Route path="/search" render={() => (
                        <SearchPage
                            books={this.state.books}
                            shelves={this.state.shelves}
                            onShelfChanged={this.changeShelf}
                        />
                    )}/>
                </div>
            </Router>
        )
    }
}

export default BooksApp
