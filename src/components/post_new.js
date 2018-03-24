import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostNew extends Component {
  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          placeholder={field.placeholder}
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : '' }
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          placeholder="It was a good day in summer..."
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          placeholder="Fun, Beach"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Aliquam semper sem quis maximus rhoncus.
          Etiam ipsum augue, pretium a odio quis, tincidunt vulputate lorem."
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  // Validate the inputs from 'values'
  if (!values.title || values.title.length < 3) {
    errors.title = 'Enter a title of at least 3 characters or more';
  }
  if (!values.categories) {
    errors.categories = 'Enter some categories';
  }
  if (!values.content) {
    errors.content = 'Your post does not contain any content. Please enter some content';
  }

  // if errors is empty. redux form will say the form is fine to submit
  // if errors has *any* properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostNew)
);
