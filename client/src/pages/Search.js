import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import Button from "../components/Button";
import { BookList, BookListItem } from "../components/BookList";
import API from "../utils/API";

class Search extends Component {

    state = {
        books: [],
        bookSearch: ""
    };

    handleInputChange = event => {
        // Destructure the name and value properties off of event.target
        // Update the appropriate state
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        API.getBooks(this.state.bookSearch)
            .then(res => this.setState({ books: res.data }))
            .catch(err => console.log(err));
        this.setState({
            bookSearch: ""
        });
    };

    handleSave = (event, title, authors, description, href, thumbnail) => {
        event.preventDefault();
        API.saveBook({
            title: title,
            authors: authors,
            description: description,
            href: href,
            thumbnail: thumbnail
        })
        .then(res => alert("Book saved"));
    };

    render() {
        return (
            <Container>
                <Row>
                    <div className="heading col rounded text-center bg-info mt-4 p-4">
                        <h1>Welcome to the Book Cave</h1>
                        <h4>Find a book, kick back, and enjoy!</h4>
                    </div>
                </Row>
                <Row>
                    <div className="searchContainer rounded bg-info mt-0 p-4">
                        <form>
                            <div className="form-group">
                                <label htmlFor="bookSearch"><h4>Book Search</h4></label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="bookSearch" 
                                    name="bookSearch" 
                                    defaultValue="harrypotter"
                                    value={this.state.bookSearch} 
                                    onChange={this.handleInputChange} />
                            </div>
                            <Button onClick={this.handleFormSubmit}>Search</Button>
                        </form>
                    </div>
                </Row>
                <Row>
                    <div className="searchResults col border border-rounded p-4">
                        <h4>Results</h4>
                        {!this.state.books.length ? (
                            <h6 className="text-center">No books to display currently</h6>
                        ) : (
                            <BookList>
                                {this.state.books.map(book => {
                                    return (
                                        <BookListItem
                                            key={book.volumeInfo.infoLink}
                                            title={book.volumeInfo.title}
                                            authors={Array.isArray(book.volumeInfo.authors) ? book.volumeInfo.authors : ["Unknown"]}
                                            description={book.volumeInfo.description}
                                            thumbnail={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : "https://placehold.it/128x197?text=No%20Preview"}
                                            href={book.volumeInfo.infoLink}
                                            saved={false}
                                            clickEvent={this.handleSave}
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

export default Search;