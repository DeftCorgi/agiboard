import React, { Component } from 'react';
import clickOutside from 'react-click-outside';
import TextAreaAutoSize from 'react-autosize-textarea';

class EditableLabel extends Component {
  state = { editing: false, name: '' };

  componentDidMount() {
    this.setState({ newName: '', name: this.props.label });
  }

  handleClickOutside() {
    this.setState({ editing: false });
  }

  handleSubmit(e) {
    this.props.onRename(this.state.newName);
  }

  handleNameChange(e) {
    this.setState({ newName: e.target.value });
  }

  handleEnterPress = e => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      this.handleSubmit(e);
      this.setState({ name: this.state.newName, editing: false });
    }
  };

  toggleEditing() {
    this.setState({ editing: !this.state.editing, newName: this.state.name });
  }

  renderForm() {
    return (
      <form>
        <TextAreaAutoSize
          wrap="hard"
          autoFocus
          type="text"
          value={this.state.newName}
          onChange={this.handleNameChange.bind(this)}
          onKeyDown={this.handleEnterPress.bind(this)}
        />
      </form>
    );
  }

  renderName() {
    return (
      <span onDoubleClick={this.toggleEditing.bind(this)}>
        {this.props.children}
      </span>
    );
  }

  render() {
    return (
      <div className="EditableLabel">
        {this.state.editing ? this.renderForm() : this.renderName()}
      </div>
    );
  }
}

export default clickOutside(EditableLabel);
