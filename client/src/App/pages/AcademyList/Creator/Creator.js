import {Component} from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../../store/actions';

class Creator extends Component {

    render(){
        return this.props.render({
            onFormSubmit: this.props.onFormSubmit
        })
    }
}


const mapDispatchToPorps = dispatch => {
    return {
      onFormSubmit: params => actionCreators.addAcademy(dispatch, params)
    }
}

export default connect(null, mapDispatchToPorps)(Creator);