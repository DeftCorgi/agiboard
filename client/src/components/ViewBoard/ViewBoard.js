import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/boards';
import { withRouter } from 'react-router-dom';
import BackButton from '../BackButton';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import NewList from './NewList';
import List from './List';
import { BeatLoader } from 'react-spinners';
import EditableLabel from './EditableLabel';

class ViewBoard extends Component {
  state = { loading: true };

  async componentDidMount() {
    // this.props.resetViewBoard();
    await this.props.getBoard(this.props.match.params.boardId);
    this.setState({ loading: false });
  }

  // Handler methods for interactive elements

  handleCreateTask(listId, task) {
    this.props.createTask(this.props.board._id, listId, task);
  }

  handleRenameList(listId, listName) {
    this.props.renameList(this.props.board._id, listId, listName);
  }

  handleRenameTask(listId, taskId, description) {
    this.props.renameTask(this.props.board._id, listId, taskId, description);
  }

  handleTagTask(listId, taskId, color) {
    this.props.tagTask(this.props.board._id, listId, taskId, color);
  }

  handleCreateList(list) {
    this.props.createList(this.props.board._id, list);
  }

  handleDeleteList(listId) {
    const response = window.confirm(
      'Are you sure you want to delete this list?'
    );
    response && this.props.deleteList(this.props.board._id, listId);
  }

  handleDeleteTask(listId, taskId) {
    const response = window.confirm(
      'Are you sure you want to delete this task?'
    );
    response && this.props.deleteTask(this.props.board._id, listId, taskId);
  }

  // -- end handler methods --

  // required method for react-beautiful-dnd
  onDragEnd(result) {
    // if dropped outside of droppable element then return
    // decide whether a TASK or LIST was shifted and use appropriate action creator
    if (result.destination == null) {
      return;
    } else if (result.type === 'TASK') {
      this.props.shiftTask(result);
    } else if (result.type === 'LIST') {
      this.props.shiftList(result);
    }
  }

  renderLists(lists = []) {
    return lists.map((list, index) => (
      <List
        list={list}
        key={list._id}
        index={index}
        handleCreateTask={this.handleCreateTask.bind(this)}
        onDeleteTask={this.handleDeleteTask.bind(this)}
        handleDeleteList={this.handleDeleteList.bind(this)}
        onRenameList={this.handleRenameList.bind(this)}
        onRenameTask={this.handleRenameTask.bind(this)}
        onTagTask={this.handleTagTask.bind(this)}
      />
    ));
  }
  renderBoard() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
        <Droppable
          droppableId={this.props.match.params.boardId}
          type="LIST"
          direction="horizontal"
        >
          {(provided, snapshot) => (
            <div ref={provided.innerRef} type="LIST" className="lists">
              <div className="list">
                <h3 className="title">{this.props.board.name}</h3>
                <h4 className="title">People</h4>
                <section className="about">
                  <h4 className="title">About</h4>
                  <EditableLabel
                    className="left"
                    label={this.props.board.about}
                  >
                    {this.props.board.about}
                  </EditableLabel>
                </section>
              </div>
              {provided.placeholder}
              {this.renderLists(this.props.board.lists)}
              <NewList handleSubmit={this.handleCreateList.bind(this)} />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }

  renderSpinner() {
    return (
      <div className="spinner pt-3">
        <BeatLoader />
        <span className="small">Retrieving board...</span>
      </div>
    );
  }

  render() {
    let content;
    if (this.state.loading) {
      content = this.renderSpinner();
    } else {
      content = this.renderBoard();
    }
    return (
      <div className="ViewBoard container-full">
        {/* <div className="container"><BackButton /></div> */}
        {content}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { board: state.board };
};

export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(ViewBoard)
);
