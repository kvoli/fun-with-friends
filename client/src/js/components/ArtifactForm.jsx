import React, { Component } from "react";
import uuidv1 from "uuid";
import { addArticle } from "../actions/index";
import { useSelector, useDispatch } from 'react-redux';


class ArtifactForm extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      desc: "",
      date: "",
      tags: [],
      text: "",
      src: ""
    };


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    const { title } = this.state;
    const id = uuidv1();
    this.props.addArticle({ title, id });
    this.setState({ title: "" });
  }
  render() {
    const { title, desc, date, tags, text, src } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success btn-lg">
          SAVE
        </button>
      </form>
    );
  }
}

export default ArtifactForm;