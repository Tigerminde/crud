import React, { Component } from 'react';
import FormNewNote from './FormNewNote';
import ItemNote from './ItemNote';

export default class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
    this.URL = 'https://coursar-heroku.herokuapp.com/';
  }

  render() {
    return (
      <>
        <h2>Notes <span className='material-icons refresh' onClick={this.getNotes()}>refresh</span></h2>
        <div className='list-notes'>
          {this.state.notes.map((item) => (
            <ItemNote key={item.id} note={item} onDelete={this.handleDelete} />
          ))}
        </div>
        <FormNewNote onFormSubmit={this.handleSbmit} />
      </>
    );
  }

  handleDelete = (id) => {
    fetch(`${this.URL}/${id}`, {
      method: 'DELETE',
    })
      .then(() => this.getNotes());
  }

  handleSbmit = (newNote) => {
    fetch(this.URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(newNote),
    })
      .then(() => this.getNotes());
  }

  getNotes = () => {
    fetch(this.URL)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ notes: result });
      });
  }

  componentDidMount() {
    this.getNotes();
  }
}
