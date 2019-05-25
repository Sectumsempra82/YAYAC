import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Home extends Component {
  render() {
    return (
    <div className="App">
      <h1>Project Home</h1>
      {/* Link to List.js */}
      <Link to={'./Academies/List'}>
        <button variant="raised">
        Yoda Academies List
        </button>
      </Link>
    </div>
    );
  }
}
export default Home;