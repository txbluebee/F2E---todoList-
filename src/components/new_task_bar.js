import React from 'react';
import Icon from './icon';
import TaskForm from './task_form';

class NewTaskBar extends React.Component {

  constructor(props) {
    super(props);
    this.displayTaskForm = this.displayTaskForm.bind(this);
  }

  displayTaskForm(){
    document.querySelector('.newTask__btn').style.display = "none";
    document.querySelector('.taskForm').style.display = "block";
  }

  render() {
    return (
      <div className="newTask">
        <button 
          type="button" 
          className="newTask__btn"
          onClick={this.displayTaskForm}>
          <Icon name="icon-plus" style="newTask__icon" />
          <span>Add Task</span>
        </button>
        <TaskForm addNewTask={this.props.addNewTask}/>
      </div>
    );
  }
}

export default NewTaskBar;