import React from 'react'
import PropTypes from 'prop-types'

const Book = (props) => (
    <div className="book">
        <div className="book-top">
            <div className="book-cover"
                 style={{ width: 128, height: 193, backgroundImage: `url("${props.book.imageLinks ? props.book.imageLinks.thumbnail : ''}")` }} />
            <div className="book-shelf-changer">
                <select value={props.book.shelf || 'none'} onChange={(event) => { props.onShelfChanged(props.book, event.target.value) }}>
                    <option value="move" disabled>Move to...</option>
                    {props.shelves.map((shelf) => (
                        <option key={shelf.slug} value={shelf.slug}>{shelf.name}</option>
                    ))}
                </select>
            </div>
        </div>
        <div className="book-title">{props.book.title}</div>
        <div className="book-authors">{props.book.authors ? props.book.authors.join('; ') : ''}</div>
    </div>
);

Book.propTypes = {
    book: PropTypes.object.isRequired,
    shelves: PropTypes.array.isRequired,
    onShelfChanged: PropTypes.func.isRequired
};

export default Book;