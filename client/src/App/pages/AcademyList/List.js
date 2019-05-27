import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Academies from './Academies/Academies';
import classes from './List.module.css';
import * as actionCreators from '../../store/actions';

class List extends Component {

  // Fetch the list on first mount
  componentDidMount() {
    this.props.onListInit();
  }

  render() {
    return (
      <div className={classes.List}>
        <h1>List of Yoda Academies</h1>
        {/* Link to Creator.js */}
        <Link to={'/Academies/AddAcademy'}>
          <button variant="raised">
            Yoda Academies Creator
          </button>
        </Link>
        <Link to={'/'}>
          {/* Link to Home.js */}
          <button variant="raised">
            Home
          </button>
        </Link>
        {/* Check to see if any items are found*/}
        {this.props.list && this.props.list.length ? (
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onListInit: actionCreators.getList(dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(List);