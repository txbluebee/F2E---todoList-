import React from 'react';
import Icon from './icon';
import { tasksRef } from './../services/firebase';

export class TaskForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      taskName: '',
      date: '',
      comment: ''
    }
    this.onInputChange = this.onInputChange.bind(this);
    this.onBtnCancel = this.onBtnCancel.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(e){
    console.log(e);
    this.setState({[e.target.name]: e.target.value});
  }

  onFormSubmit(e){
    e.preventDefault();

    // create task object
    const task = {
      taskName: this.state.taskName,
      date: this.state.date,
      comment: this.state.comment,
      bookmarked: false
    };

    // push to firebase
    const taskRef = tasksRef.push();
    task.id = taskRef.key;
    taskRef.set(task);

    // clear fields 
    this.setState({
      taskName: '',
      date: '',
      comment: ''
    })

    // hide task form
    document.querySelector('.newTask__btn').style.display = "flex";
    document.querySelector('.taskForm').style.display = "none";
  }

  onBtnCancel(){
    document.querySelector('.newTask__btn').style.display = "flex";
    document.querySelector('.taskForm').style.display = "none";
  }

  render() {
    return (
      <form className="taskForm" onSubmit={this.onFormSubmit} id={`form-${this.props.id}`}>
        <div className="taskForm__header">
          <input 
            type="text"
            name="taskName" 
            className="taskForm__input" 
            onChange={this.onInputChange}
            value={this.state.taskName}
            placeholder="Type Something Here..." />
          <div className="taskForm__input-checkbox"></div>
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
                value={this.state.date}
                className="taskForm__dateInput" 
                placeholder="yyyy//mm/dd" />
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
                value={this.state.comment}
                className="taskForm__textarea" rows="3">
              </textarea>
            </div>
          </div>
        </div>
        <div className="taskForm__footer">
          <button 
            type="button"
            className="taskForm__button taskForm__button-cancel"
            onClick={this.onBtnCancel}>
            <Icon name="icon-close" style="taskForm__footerIcon"/>
            <span>Cancel</span>
          </button>
          <button 
            type="submit"
            role="button"
            className="taskForm__button taskForm__button-add">
            <Icon name="icon-plus" style="taskForm__footerIcon"/>
            <span>Add Task</span>
          </button>
        </div>
      </form>
    );
  }
}

export default TaskForm;