import React, {Component} from 'react';
import NewAcademy from './Academies/NewAcademy';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions';

class Creator extends Component {

    render(){
        return(
                <NewAcademy create={this.props.onFormSubmit}/>
        )
    }

};


const mapDispatchToPorps = dispatch => {
    return {
      onFormSubmit: params => actionCreators.addAcademy(dispatch, params)
    }
}

export default connect(null, mapDispatchToPorps)(Creator);