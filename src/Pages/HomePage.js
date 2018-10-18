import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SearchPage from "./SearchPage";
import Book from '../Components/Book'
import PropTypes from "prop-types";

class HomePage extends Component {
    render() {
        const { books, shelves, onShelfChanged } = this.props;

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {shelves.filter((shelf) => (!shelf.hidden)).map((shelf) => (
                            <div className="bookshelf" key={shelf.slug}>
                                <h2 className="bookshelf-title">{shelf.name}</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {books.filter((book) => ( book.shelf === shelf.slug )).map((book) => (
                                            <li key={`home-${book.id}`}>
                                                <Book book={book} shelves={shelves} onShelfChanged={onShelfChanged} />
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}

SearchPage.propTypes = {
    books: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired,
    onShelfChanged: PropTypes.func.isRequired
};

export default HomePage;