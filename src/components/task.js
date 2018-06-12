import React from 'react';
import Icon from './icon';
import TaskForm from './task_form';

class Task extends React.Component {

  constructor(props){
    super(props);

    this.checkedTask = this.checkedTask.bind(this);
    this.editTask = this.editTask.bind(this);
  }

  checkedTask(){
    const checkbox = document.getElementById(`checkbox-${this.props.id}`);
    if (checkbox.checked) {
      checkbox.parentNode.parentNode.classList.add('task-checked');
    } else {
      checkbox.parentNode.parentNode.classList.remove('task-checked');
    }
  }


  editTask() {
    document.getElementById(`task-${this.props.id}`).style.display = 'none';
    document.getElementById(`form-${this.props.id}`).style.display = 'block';
  }

  render(){

    const {id, taskName, date, comment} = this.props;
    return (
      <li>
      <div className="task" id={`task-${id}`}>
        <div className="task__checkbox-group">
          <input
            type="checkbox"
            className="task__checkbox-input"
            id={`checkbox-${id}`}
            onClick={this.checkedTask} />
          <label htmlFor={`checkbox-${id}`} className="task__checkbox-label">
            <span className="task__checkmark"></span>
          </label>
        </div>
        <div className="task__content">
          <p className="task__text">{taskName}</p>
          <div className="task__details">
            <span>
              <Icon name="icon-watch" /> {date}
            </span>
            
            <Icon name="icon-file" />
            <Icon name="icon-message-circle" />
          </div>
        </div>
        <div className="task__icons">
          <span 
            className="fa fa-star-o task__icons-star">
          </span>
          <span
            onClick={this.editTask}
            className="fa fa-pencil task__icons-edit">
          </span>
          <span
            onClick={() => this.props.deleteTask(id)}
            className="fa fa-times-circle-o task__icons-delete">
          </span>
        </div>
      </div>
      <TaskForm
        id={id}
        taskName={taskName}
        date={date}
        comment={comment} />
    </li>
    );
  }
}

export default Task;