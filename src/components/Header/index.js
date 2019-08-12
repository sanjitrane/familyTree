import React,{Component,Fragment} from 'react'

class Header extends Component{

    onAdd=e=>{
        e.preventDefault()
        this.props.onAdd()
    }

    onRemove=e=>{
        e.preventDefault()
        this.props.onRemove()
    }

    render(){
        return(
        <header>
            <div className='left-section'>
                <span className='logo'>Family Tree</span>
            </div>    
            <div className='right-section'>
                <button className='margin-right-10' onClick={(e)=>this.onAdd(e)}>Add Member</button>
                <button onClick={this.onRemove}>Remove Member</button>
            </div>
        </header>
        )
    }

}

export default Header;