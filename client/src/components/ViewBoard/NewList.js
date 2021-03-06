import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewBoard extends Component {
  state = { name: '' };
  onChange(e) {
    this.setState({ name: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit({ name: this.state.name });
    this.setState({ name: '' });
  }

  render() {
    return (
      <div>
        <div className="NewList list">
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="New list name"
                onChange={this.onChange.bind(this)}
                value={this.state.name}
              />
            </div>
            <input
              type="submit"
              className="btn btn-primary btn-block"
              value="Create"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, {})(NewBoard);
