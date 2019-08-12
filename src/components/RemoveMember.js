import React,{Component, Fragment} from 'react';
import { Button } from 'react-bootstrap';
import Select from 'react-select';
import { connect } from 'react-redux';
import { addMember } from '../actions';
//

class RemoveMember extends Component{

    state={
        parentOptions:[],
        selectedParent:[],
        member: this.props.member,
        errMsg:false
    }

    componentDidMount=()=>{
        let {member} = this.state
        if(Object.keys(member).length===0) return
        let list = this.getList()
        if(list.length > 0){
            let arr = []
            list.map((item, index)=>{
                arr.push({"label": item, "value": item})
            })
            this.setState({parentOptions: arr})
        }
    }

    onHandleChange=(obj)=>{
        this.setState({selectedParent: obj})
    }

    onSubmit=(e)=>{
        e.preventDefault();
        let {selectedParent} = this.state
        this.props.remove(selectedParent.label)
    }

    traverseDF(fn) {
        const arr = [this.state.member];
        while (arr.length && arr.length > 0) {
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
        let {parentOptions, selectedParent, errMsg, member} = this.state
        return(
            <Fragment>
                <h4>Remove Member</h4>
                <hr/>
                {Object.keys(member).length > 0 &&
                <div>
                    <Select value={selectedParent}
                    onChange={selectedOption =>this.onHandleChange(selectedOption)}
                    isMulti ={false}
                    options ={parentOptions}
                    required
                    /> 
                    {errMsg && 
                        <p className='error-msg'>Select Member to Delete</p>
                    }
                
                <p>Note: Removing a member will also remove its children</p>
                <Button variant="primary" className='margin-right-10' onClick={(e)=>{this.onSubmit(e)}}>Proceed</Button>
                <Button variant="secondary" onClick={this.props.handleClose}>Cancel</Button>
                </div>
                }
                {
                    Object.keys(member).length === 0 &&
                    <div>
                    <p>Note: No members to remove</p>
                    <Button variant="secondary" onClick={this.props.handleClose}>Close</Button>
                </div>
                }
            </Fragment>
        )
    }
}
const mapStateToProps=state=>state;

export default connect(mapStateToProps)(RemoveMember);
