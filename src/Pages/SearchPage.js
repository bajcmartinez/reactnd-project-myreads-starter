import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Loading from '../Components/Loading'
import Book from '../Components/Book'
import * as BooksAPI from '../Services/BooksAPI'

class SearchPage extends Component {
    state = {
        search: '',
        results: []
    };

    search(query) {
        this.setState({
            search: query,
            searching: true
        });
        BooksAPI.search(query.trim()).then((results) => {
            if (Array.isArray(results)) {
                results.forEach((book) => {
                   const bookInShelf = this.props.books.find((_book) => ( _book.id === book.id ));
                   book.shelf = bookInShelf ? bookInShelf.shelf : 'none';
                });

                this.setState({
                    results,
                    searching: false
                })
            }else{
                this.setState({
                    results: [],
                    searching: false
                })
            }
        })
    }

    render() {
        const { books, shelves, onShelfChanged } = this.props;
        const { search } = this.state;

        const displayingBooks = search === '' ? books : this.state.results;

        return (
            <div className="search-books">
                <Loading loading={this.state.searching} />

                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" value={search} onChange={(event) => {this.search(event.target.value)}} placeholder="Search by title or author"/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {displayingBooks.map((book) => (
                            <li key={`search-${book.id}`}>
                                <Book
                                    book={book}
                                    shelves={shelves}
                                    onShelfChanged={onShelfChanged}
                                />
                            </li>
                        ))}
                    </ol>
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

export default SearchPage;