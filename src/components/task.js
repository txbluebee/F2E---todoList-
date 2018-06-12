import React from 'react';
import Icon from './icon';

export default (props) => {

  const checkedTask = (id) =>{
    const checkbox = document.getElementById(`task-${id}`);
    if (checkbox.checked){
      checkbox.parentNode.parentNode.classList.add('task-checked');
    } else {
      checkbox.parentNode.parentNode.classList.remove('task-checked');
    }
  }

  return (
    <li className="task">
      <div className="task__checkbox-group">
        <input 
          type="checkbox" 
          className="task__checkbox-input" 
          id={`task-${props.id}`} 
          onClick={() => checkedTask(props.id)} />
        <label htmlFor={`task-${props.id}`} className="task__checkbox-label">
          <span className="task__checkmark"></span>
        </label>
      </div>
      <div className="task__content">
        <p className="task__text">{props.taskName}</p>
        <div className="task__details">

          <Icon name="icon-watch"/>
          <Icon name="icon-file" />
          <Icon name="icon-message-circle" />
        </div>
      </div>
      <div className="task__icons">
        <span className="fa fa-star-o task__icons-star"></span>
        <span className="fa fa-pencil task__icons-edit"></span>
        <span 
          onClick={() => props.deleteTask(props.id)}
          className="fa fa-times-circle-o task__icons-delete">
        </span>
      </div>
    </li>
  )
}