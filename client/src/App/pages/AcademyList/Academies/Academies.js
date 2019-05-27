import React from 'react';
import classes from './Academies.module.css';
import { Table } from 'react-bootstrap';

const Academies = (props) => {
  // Generate the list of academies 
  const list = props.list.map((item) => {
    return (
      <tr key={item.name}>
        <td>{item.name}</td>
        <td>{item.description}</td>
        <td>{item.grade}</td>
        <td>{item.tag}</td>
      </tr>
    );
  })

  return (
    <div className={classes.Academies}>
      {/* Render the list of academies */}
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Grade</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {list}
        </tbody>
      </Table>
    </div>
  )
};

export default Academies;