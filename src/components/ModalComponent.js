import React,{Component} from 'React';
import {Modal, Button} from 'react-bootstrap';

class ModalComponent extends Component{

    constructor(props){
        super(props)
        this.state= {show:this.props.show}
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.show !== this.props){
            this.setState({show: nextProps.show})
        }
    }

    close=()=>{
        this.setState({show:"false"})
    }

    open=()=>{
        this.setState({show:"true"})
    }
    render(){
        let {title, body} = this.props
        return(
          <Modal show={this.state.show} onHide={this.props.handleClose}>
            <Modal.Body>{body}</Modal.Body>
          </Modal>
        )
    }
    
}

export default ModalComponent;