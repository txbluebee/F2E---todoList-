import React, { Component } from "react";
import TopNav from "./top_nav";
import Icon from "./icon";
import TaskForm from "./task_form";
import Task from "./task";

import { tasksRef } from "./../services/firebase";

export default class App extends Component {
  state = {
    tasks: [],
    displayTask: "all",
    isFormOpen: false
  };

  componentDidMount() {
    this.selectTasks(this.state.displayTask);
  }

  handleFormOpen = () => {
    this.setState({
      isFormOpen: true
    });
  };

  handleFormCancel = () => {
    this.setState({
      isFormOpen: false
    });
  };

  selectTasks = (term) =>{
    tasksRef.on("value", snapshot => {
      let currentTasks = [];
      snapshot.forEach(item => {
        currentTasks.push(item.val());
      });
      if (term === "all") {
        this.setState({ tasks: currentTasks });
      } else if (term === "bookmarked") {
        currentTasks = currentTasks.filter(task => task.bookmarked);
        this.setState({ tasks: currentTasks });
      } else if (term === "completed") {
        currentTasks = currentTasks.filter(task => task.completed);
        this.setState({ tasks: currentTasks });
      }
      console.log(currentTasks);
    });
  }

  handleCreateTask = (newTask) => {
    newTask.bookmarked = false;
    newTask.completed = false;

    const taskRef = tasksRef.push();
    newTask.id = taskRef.key;
    taskRef.set(newTask).then();

    this.setState({
      isFormOpen: false
    });
  };

  handleUpdateTask = (updatedTask) => {
    tasksRef.child(updatedTask.id).set(updatedTask);
    console.log(updatedTask);
  }

  deleteTask(id) {
    tasksRef
      .child(id)
      .remove()
      .then(() => {
        const updatedState = this.state.tasks.filter(task => task.id !== id);
        this.setState({ tasks: updatedState });
      });
  }

  renderTask() {
    return this.state.tasks.map(taskItem => {
      return (
        <Task
          key={taskItem.id}
          id={taskItem.id}
          taskItem={taskItem}
          updateTask={this.handleUpdateTask}
          deleteTask={this.deleteTask}
        />
      );
    });
  }

  render() {
    if (!this.state.tasks) {
      return <div>loading...</div>;
    }

    const { isFormOpen } = this.state;
    return (
      <div>
        <TopNav selectTasks={this.selectTasks} />

        <div className="content">
          {/* Add new Task Button/form */}
          {!isFormOpen && (
            <button
              type="button"
              className="newTask__btn"
              onClick={this.handleFormOpen}
            >
              <Icon name="icon-plus" style="newTask__icon" />
              <span>Add Task</span>
            </button>
          )}

          {isFormOpen && (
            <TaskForm
              createTask={this.handleCreateTask}
              cancelEmptyForm={this.handleFormCancel}
            />
          )}
          <ul className="taskList">{this.renderTask()}</ul>
        </div>
      </div>
    );
  }
}
