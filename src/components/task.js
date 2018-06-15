import React from "react";
import Icon from "./icon";
import TaskForm from "./task_form";

import { tasksRef } from "./../services/firebase";

class Task extends React.Component {

  
  state = {
    isEditFormOpen: false
  };

  openEditForm = () => {
    this.setState({
      isEditFormOpen: true
    });
  };

  cancelEditForm = () =>{
    this.setState({
      isEditFormOpen: false
    });
  }

  handleChecked = () => {
    const { id, completed } = this.props.taskItem;
    tasksRef.child(id).update({ completed: !completed });
  };


  toggleBookmark = () => {
    const { id, bookmarked } = this.props.taskItem;
    tasksRef
      .child(this.props.id)
      .update({ bookmarked: !bookmarked });
  };

  shortenComment(string) {
    if (string.length > 6) {
      return string.substr(0, 6) + "...";
    } else {
      return string;
    }
  }

  render() {
    const { taskItem } = this.props;
    const {
      id,
      taskName,
      date,
      comment,
      bookmarked,
      completed
    } = this.props.taskItem;
    const taskClassName = `task ${bookmarked ? "task__bookmark" : ""} ${
      completed ? "task-checked" : ""
    }`;

    return (
      <li>
        {!this.state.isEditFormOpen && (
          <div className={taskClassName}>
            <div className="task__checkbox-group">
              <input
                type="checkbox"
                className="task__checkbox-input"
                id={`checkbox-${id}`}
                onClick={this.handleChecked}
              />
              <label
                htmlFor={`checkbox-${id}`}
                className="task__checkbox-label"
              >
                <span className="task__checkmark" />
              </label>
            </div>
            <div className="task__content">
              <p className="task__text">{taskName}</p>
              <div className="task__details">
                <span>
                  <Icon name="icon-watch" /> {date}
                </span>

                <Icon name="icon-file" />
                <span>
                  <Icon name="icon-message-circle" />{" "}
                  {this.shortenComment(comment)}
                </span>
              </div>
            </div>
            <div className="task__icons">
              <span
                onClick={this.toggleBookmark}
                className="fa fa-star task__icons-fullstar"
              />
              <span
                onClick={this.toggleBookmark}
                className="fa fa-star-o task__icons-star"
              />
              <span
                onClick={this.openEditForm}
                className="fa fa-pencil task__icons-edit"
              />
              <span
                onClick={() => this.props.deleteTask(id)}
                className="fa fa-times-circle-o task__icons-delete"
              />
            </div>
          </div>
        )}

        {this.state.isEditFormOpen && (
          <TaskForm 
            taskItem={this.props.taskItem} 
            updateTask={this.props.updateTask}
            cancelEditForm={this.cancelEditForm}/>
        )}
      </li>
    );
  }
}

export default Task;
