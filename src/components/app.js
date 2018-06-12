import React, { Component } from 'react';

import TopNav from './top_nav';
import NewTaskBar from './new_task_bar';
import Task from './task';
import _ from 'lodash';

import { tasksRef } from './../services/firebase';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      currentTasks: []
    }

    this.renderTask = this.renderTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.selectTasks = this.selectTasks.bind(this);
  }


  componentDidMount() {
    // tasksRef.on('value', snapshot => {
    //   let newState = [];
    //   snapshot.forEach(item => {
    //     newState.push(item.val());
    //   })

    //   this.setState({ tasks: newState });
    // })
    this.selectTasks('all');
  }


  selectTasks(term) {
    tasksRef.on('value', snapshot => {
      let currentTasks = [];
      snapshot.forEach(item => {
        currentTasks.push(item.val());
      })
      if (term === 'all'){
        this.setState({ tasks: currentTasks });
      } else if (term === 'bookmarked'){
        currentTasks = currentTasks.filter(task => task.bookmarked);
        this.setState({ tasks: currentTasks });
      } else if (term === 'completed'){
        currentTasks = currentTasks.filter(task => task.completed);
        this.setState({ tasks: currentTasks });
      }
    })
  } 


    deleteTask(id){
      tasksRef.child(id).remove().then(
        () => {
          const updatedState = this.state.tasks.filter(task => task.id !== id);
          this.setState({ tasks: updatedState });
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
            deleteTask={this.deleteTask} />
        )
      })
    }


    render() {

      if (!this.state.tasks) {
        return <div>loading...</div>
      }
      return (
        <div>
          <TopNav selectTasks={this.selectTasks} />
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