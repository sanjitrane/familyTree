import React,{Component, Fragment} from 'react';
import { connect } from 'react-redux'
import { Form, Col, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import Select from 'react-select';
import { addMember } from '../actions';
//

class FormComponent extends Component{

    state={
        parentOptions:[],
        selectedParent:[],
        member: this.props.member,
        errMsg:false
    }

    componentDidMount=()=>{
        let {member} = this.state
        let arr = []
        if(Object.keys(member).length > 0){
        let list = this.getList()
        if(list.length > 0){
            
            list.map((item, index)=>{
                arr.push({"label": item, "value": item})
            })
            
        }
        this.setState({parentOptions: arr})
        }
        
    }

    onHandleChange=(obj)=>{
        this.setState({selectedParent: obj})
    }

    onSubmit=(e)=>{
        e.preventDefault()
        let {member, selectedParent} = this.state
        let form = e.currentTarget
        let {name, gender, color, parentId} = form
        let obj = {
            "name": name.value,
            "gender": gender.value,
            "color": color.value,
            "children":[]
        } 
        if(Object.keys(member).length !== 0){
            if(selectedParent.length !=[]){
               obj =  Object.assign( {"parent":selectedParent.label},{...obj})
            }else{
                this.setState({errMsg:true})
                return
            }
            
        }
        this.props.add(obj)
    }

    traverseDF(fn) {
        const arr = [this.state.member];
        while (arr.length) {
          const node = arr.shift();
    
          arr.unshift(...node.children);
          fn(node);
        }
    }

    getList=()=>{
        let arr =[]
        this.traverseDF(node=>{
            arr.push(node.name)
        })
        return arr
    }

    render(){
        let {parentOptions, selectedParent, member, errMsg} = this.state
        
        return(
            <Fragment>
                <h4>Add Member</h4>
                <hr/>
                <Form onSubmit={this.onSubmit}>
                    <FormGroup controlId="name">
                        <ControlLabel>Name</ControlLabel>
                        <FormControl type="text" required  />
                    </FormGroup>

                    {Object.keys(member).length > 0 &&
                    <FormGroup controlId="parentId">
                        <ControlLabel>Parent</ControlLabel>
                        <Select value={selectedParent}
                        onChange={selectedOption =>this.onHandleChange(selectedOption)}
                        isMulti ={false}
                        options ={parentOptions}
                        required
                        /> 
                        {errMsg && 
                        <p className='error-msg'>Select Parent</p>
                        }
                    </FormGroup>
                    }
                    
                    <FormGroup controlId="gender">
                        <ControlLabel>Gender</ControlLabel>
                        <FormControl type="text" required />
                    </FormGroup>

                    <FormGroup controlId="color">
                        <ControlLabel>Favorite Color</ControlLabel>
                        <FormControl type="text" required />
                    </FormGroup>
                    
                    <Button variant="primary" className='margin-right-10' type='submit'>Save</Button>
                    <Button variant="secondary" onClick={this.props.handleClose}>Cancel</Button>
                </Form>
            </Fragment>
        )
    }
}

const mapStateToProps=state=>state

export default connect(mapStateToProps)(FormComponent);