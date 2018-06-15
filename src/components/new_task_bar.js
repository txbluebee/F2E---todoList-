import React from 'react';
import Icon from './icon';
import TaskForm from './task_form';

class NewTaskBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
    this.handleFormOpen = this.handleFormOpen.bind(this);
    this.handleFormCancel = this.handleFormCancel.bind(this);
  }

  handleFormOpen(){
    this.setState({
      isOpen: true
    })
  }

  handleFormCancel(){
    this.setState({
      isOpen:false
    })
  }

  render() {
    console.log(this.state.isOpen);
    return (
      <div className="newTask">
        { !this.state.isOpen && 
        <button 
          type="button" 
          className="newTask__btn"
          onClick={this.handleFormOpen}>
          <Icon name="icon-plus" style="newTask__icon" />
          <span>Add Task</span>
        </button>}

        {this.state.isOpen && <TaskForm handleFormCancel={this.handleFormCancel}/>}
      </div>
    );
  }
}

export default NewTaskBar;