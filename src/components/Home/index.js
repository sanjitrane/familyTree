import React,{ Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { canUseDOM } from 'exenv';
import _ from 'lodash';
import Tree from 'react-d3-tree';
import { addMember } from '../../actions';
import Header from '../Header';
import Form from '../FormComponent';
import ModalComponent from '../ModalComponent';
import RemoveMember from '../RemoveMember';
  

  const containerStyles = {
    width: '100%',
    height: '100vh',
  }


class Home extends Component {

    constructor(props){
        super(props)
        this.state = {
          show:false,
          modalType:'',
          myTreeData:[],
          member: this.props.member
        }
        this.root = null
        this.props.dispatch(addMember([]))
        
    }
  
    // Setup the stage for the tree
    componentDidMount=()=>{
      if(canUseDOM){
        const dimensions = this.treeContainer.getBoundingClientRect();
        this.setState({
          translate: {
            x: dimensions.width / 2,
            y: dimensions.height / 2
          }
        });
      }
    }

    // Adding the member to the tree. This function is called from the FormComponent Submit function
    addMember=(data)=>{
      if(this.root == null){
        this.root = data;
      }else{
        let ele = this.searchTree(this.root, data.parent)
        ele ? ele.children.push(data): null
        
      }
      this.props.dispatch(addMember(this.root))
      //Hack: The Tree component does not refresh with the new data. Passing empty data and then the actual data to maximize the data difference
      this.setState({myTreeData: []},()=>{
      this.setState({myTreeData:this.root})
      })
      this.onClose() 
    }

    // Remove the member from the tree. This function is called from RemoveMember
    removeMember=(name)=>{
      let ele = this.searchTree(this.root, name)
      let parentEle = this.searchTree(this.root, ele.parent)
      parentEle.children = _.filter(parentEle.children, (o)=>{
        return o.name !== name
      })
      this.props.dispatch(addMember(this.root)) 
      this.setState({myTreeData: []},()=>{
        this.setState({myTreeData:this.root})
      })
      this.onClose()
      
    }

    // To get an element in the tree based on the name passed
    searchTree=(element, title)=>{
      if(element.name == title){
           return element;
      }else if (element.children != null){
           var i;
           var result = null;
           for(i=0; result == null && i < element.children.length; i++){
                result = this.searchTree(element.children[i], title);
           }
           return result;
      }
      return null;
    }

    // To display Form Modal
    onShowFormModal=()=>{
      this.setState({show:true, modalType:'add'})
    }

    // To show Remove Modal
    onShowRemoveModal=()=>{
      this.setState({show:true, modalType:'remove'})
    }

    onClose=()=>{
      this.setState({show:false, modalType:''})
    }

    getComponent=()=>{
      let {modalType} = this.state
      if(modalType==='add'){
        return <Form handleClose={this.onClose} add={this.addMember}/> 
      }else if(modalType==='remove'){
        return <RemoveMember handleClose={this.onClose} remove={this.removeMember}/> 
      }
    }

    render() {
      let {show, modalType, myTreeData} = this.state
      
      return (
          <Fragment>
            <Header
            onAdd={this.onShowFormModal}
            onRemove={this.onShowRemoveModal}
            />
            <ModalComponent show={show}
            handleClose={this.onClose.bind(this)}
            body = {this.getComponent()}
            />
            <div style={containerStyles} ref={tc => (this.treeContainer = tc)}>
            {
              canUseDOM && Object.keys(myTreeData).length != 0 && 
              <Tree data={myTreeData} 
              orientation={'vertical'}
              translate={this.state.translate}
            />  
            }          
            </div>            
        
          </Fragment>
          
      );
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Home);