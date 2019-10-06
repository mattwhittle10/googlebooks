import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import Button from "../components/Button";
import { BookList, BookListItem } from "../components/BookList";
import API from "../utils/API";

class Saved extends Component {

    state = {
        savedBooks: []
    }

    componentDidMount() {
        this.loadSavedBooks();
    }

    loadSavedBooks = () => {
        API.getSavedBooks()
            .then(res =>
                this.setState({ savedBooks: res.data }))
    }

    deleteSavedBook = (event, id) => {
        event.preventDefault();
        API.deleteSavedBook(id)
          .then(res => this.loadSavedBooks())
          .catch(err => console.log(err));
    };

    render() {
        return (
            <Container>
                <Row>
                    <div className="favorites rounded text-center bg-info mt-4 mb-4 p-4">
                        <h1>Favorited Books</h1>
                    </div>
                </Row>
                <Row>
                    <div className="favoritesList col border bg-info border-rounded p-4">
                        <h4>Favorites</h4>
                        {!this.state.savedBooks.length ? (
                            <h6 className="text-center">No books to display currently</h6>
                        ) : (
                            <BookList>
                                {this.state.savedBooks.map(book => {
                                    return (
                                        <BookListItem
                                            key={book._id}
                                            id={book._id}
                                            title={book.title}
                                            authors={book.authors}
                                            description={book.description}
                                            thumbnail={book.thumbnail ? book.thumbnail : "https://placehold.it/128x197?text=No%20Preview"}
                                            href={book.href}
                                            saved={true}
                                            clickEvent={this.deleteSavedBook}
                                        />
                                    );
                                })}
                            </BookList>
                        )}
                    </div>
                </Row>
            </Container>
        )
    }
}

export default Saved;