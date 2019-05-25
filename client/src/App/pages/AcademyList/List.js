import React, { Component } from 'react';
import Academies from './Academies/Academies';
import classes from './List.module.css';
import {connect} from 'react-redux';

class List extends Component {
  // // Initialize the state
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     list: []
  //   }
  // }

  // Fetch the list on first mount
  componentDidMount() {
    this.props.onListInit();
  }

  // // Retrieves the list of items from the Express app
  // getList = () => {
  //   fetch('/api/getList')
  //   .then(res => res.json())
  //   .then(list => this.setState({ list }))
  // }

  render() {
    return (
      <div className={classes.List}>
        <h1>List of Yoda Academies</h1>
        {/* Check to see if any items are found*/}
        {this.props.list ? (
          <Academies list={this.props.list} />
        ) : (
          <div>
            <h2>No Yoda Academies Found</h2>
          </div>
        )
      }
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    list: state.list
  };
};

const mapDispatchToPorps = dispatch => {
  return {
    onListInit: () => dispatch({type: 'GETLIST'})
  }
}


export default connect(mapStateToProps, mapDispatchToPorps)(List);