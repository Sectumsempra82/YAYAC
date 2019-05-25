import React, { Component } from 'react';
import Academies from './Academies/Academies';
import classes from './List.module.css'

class List extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      list: []
    }
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.getList();
  }

  // Retrieves the list of items from the Express app
  getList = () => {
    fetch('/api/getList')
    .then(res => res.json())
    .then(list => this.setState({ list }))
  }

  render() {
    const { list } = this.state;

    return (
      <div className={classes.List}>
        <h1>List of Yoda Academies</h1>
        {/* Check to see if any items are found*/}
        {list.length ? (
          <Academies list={list} />
        ) : (
          <div>
            <h2>No Yoda Academies Found</h2>
          </div>
        )
      }
      </div>
    );
  }
}

export default List;