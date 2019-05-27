import React, {Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import classes from './NewAcademy.module.css';
import { Link } from 'react-router-dom';
import Creator from './Creator';
class NewAcademy extends Component {



    render() {
        

        const handleSubmit = (event, onFormSubmit) => {
            event.preventDefault();
            event.stopPropagation();

            let Name = this.academyName.value; 
            let Description = this.academyDescription.value; 
            let Grade = this.academyGrade.value; 
            let Tags = [...this.academyTags.selectedOptions]
                .map(el => {
                    return el.value;
                });
            if (Name ===  '' || Description === ''){
                alert('Empty fields are not allowed! Make sure you filled in both Name and Description for the new academy and try again.')
            }else{
                onFormSubmit([Name, Description, Grade, Tags])
            }
        }

        

        return (
            <div className={classes.NewAcademy}>
                <Creator 
                render={({onFormSubmit}) => (
                <Form onSubmit={e => handleSubmit(e, onFormSubmit)}>
                    <Form.Group>
                        <Form.Label>Academy Name</Form.Label>
                        <Form.Control type="text" placeholder="Academy Name" ref={ref => this.academyName = ref} />
                        <Form.Text className="text-muted">
                            Name of the new Yoda academy
                    </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Academy Description</Form.Label>
                        <Form.Control type="text" placeholder="Academy Description" ref={ref => this.academyDescription = ref} />
                        <Form.Text className="text-muted">
                            Description of the new Yoda academy
                    </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Academy Grade</Form.Label>
                        <Form.Control as="select" ref={ref => this.academyGrade = ref}>
                            <option value={1} >padawan</option>
                            <option value={2} >jedi</option>
                            <option value={3} >master</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Academy tags</Form.Label>
                        <Form.Control as="select" multiple ref={ref => this.academyTags = ref}>
                            <option value={1}>KAMINOANS</option>
                            <option value={2}>WOOKIEES</option>
                            <option value={3}>GUNGANS</option>
                            <option value={4}>HUMANS</option>
                            <option value={5}>ZABRAK</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                </Button>
                </Form>
                )}/>
                {/* Link to List.js */}
                <Link to={'/Academies/List'}>
                    <button variant="raised">
                         Yoda Academies List
                    </button>
                 </Link>
            </div>
        )
    }
};

export default NewAcademy;