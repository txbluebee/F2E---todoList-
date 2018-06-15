import React from "react";
import Icon from "./icon";
import { tasksRef } from "./../services/firebase";

const emptyTask = {
  taskName: "",
  date: "",
  comment: ""
};

export class TaskForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      task: emptyTask
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount(){
    if (this.props.taskItem){
      this.setState({
        task: this.props.taskItem
      })
    }  
  }

  onInputChange(e) {
    const newTask = this.state.task;
    newTask[e.target.name] = e.target.value;
    this.setState({
      task: newTask
    });
  }

  onFormSubmit(e) {
    e.preventDefault();

    if (this.props.taskItem.id){
      this.props.updateTask(this.state.task);
      this.props.cancelEditForm();
    } else {
      this.props.createTask(this.state.task);
      this.setState({
        task: emptyTask
      });
    }
  }

  handleFormCancel = () =>{
    if (!this.props.taskItem){
      this.props.cancelEmptyForm();
    } else {
      this.props.cancelEditForm();
    }
  }


  render() {
    const { task } = this.state;
    const defaultFormID = `${
      this.props.id === undefined ? "task-form" : `form-${this.props.id}`
    }`;

    return (
      <form
        className="taskForm"
        onSubmit={this.onFormSubmit}
        id={defaultFormID}
      >
        <div className="taskForm__header">
          <input
            type="text"
            name="taskName"
            className="taskForm__input"
            onChange={this.onInputChange}
            value={task.taskName}
            placeholder="Type Something Here..."
          />
          <div className="taskForm__input-checkbox" />
          <Icon name="icon-star" style="taskForm__icon-star" />
          <Icon name="icon-edit" style="taskForm__icon-edit" />
        </div>
        <div className="taskForm__body">
          <div className="taskForm__group">
            <div className="taskForm__label">
              <Icon name="icon-watch" />
              <span className="taskForm__text">Deadline</span>
            </div>
            <div className="taskForm__inputBox">
              <input
                type="date"
                name="date"
                onChange={this.onInputChange}
                value={task.date}
                className="taskForm__dateInput"
                placeholder="yyyy//mm/dd"
              />
            </div>
          </div>
          <div className="taskForm__group">
            <div className="taskForm__label">
              <Icon name="icon-file" />
              <span className="taskForm__text">File</span>
            </div>
            <div className="taskForm__inputBox">
              <Icon name="icon-plus" style="taskForm__icon-addFile" />
            </div>
          </div>
          <div className="taskForm__group">
            <div className="taskForm__label">
              <Icon name="icon-message-circle" />
              <span className="taskForm__text">Comments</span>
            </div>
            <div className="taskForm__inputBox">
              <textarea
                name="comment"
                onChange={this.onInputChange}
                value={task.comment}
                className="taskForm__textarea"
                rows="3"
              />
            </div>
          </div>
        </div>
        <div className="taskForm__footer">
          <button
            type="button"
            className="taskForm__button taskForm__button-cancel"
            onClick={this.handleFormCancel}
          >
            <Icon name="icon-close" style="taskForm__footerIcon" />
            <span>Cancel</span>
          </button>
          <button
            type="submit"
            role="button"
            className="taskForm__button taskForm__button-add"
          >
            <Icon name="icon-plus" style="taskForm__footerIcon" />
            <span>{task.id ? "Edit Task" : "Add Task"}</span>
          </button>
        </div>
      </form>
    );
  }
}

export default TaskForm;
