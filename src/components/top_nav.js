import React from 'react';

export default (props) => {
  return (
    <nav className="top-nav">
      <div className="top-nav__list">
        <a 
          href="#" 
          className="top-nav__link"
          onClick={()=>props.selectTasks("all")}>
          My Tasks</a>
          <a 
          href="#" 
          className="top-nav__link"
          onClick={()=>props.selectTasks("bookmarked")}>
          In Progress</a>
          <a 
          href="#" 
          className="top-nav__link"
          onClick={()=>props.selectTasks("completed")}>
          Completed</a>
      </div>
    </nav>
  )
}