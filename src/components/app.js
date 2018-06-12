import React, { Component } from 'react';

import TopNav from './top_nav';
import NewTaskBar from './new_task_bar';
import Task from './task';
import _ from 'lodash';

import { tasksRef } from './../services/firebase';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { tasks: [] }

    this.renderTask = this.renderTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  componentDidMount() {
    tasksRef.on('value', snapshot => {
      let newState = [];

      snapshot.forEach(item => {
        newState.push(item.val());
      })

      this.setState({ tasks: newState });
    })
  }

  deleteTask(id){
    tasksRef.child(id).remove().then(
      () =>{
        const updatedState = this.state.tasks.filter(task => task.id !== id);
        this.setState({tasks: updatedState});
      }
    );
  }

  renderTask() {
    return this.state.tasks.map(item => {
      const { id, taskName, date, comment, bookmarked, completed } = item;
      return (
        <Task 
          key={id} 
          id={id} 
          taskName={taskName} 
          date={date} 
          comment={comment}
          bookmarked={bookmarked}
          completed={completed}
          deleteTask={this.deleteTask}/>
      )
    })
  }


  render() {

    if (!this.state.tasks) {
      return <div>loading...</div>
    }

    return (
      <div>
        <TopNav />
        <div className="content">
          <NewTaskBar />
          <ul className="taskList">
            {this.renderTask()}
          </ul>
        </div>
      </div>
    );
  }
}