import React from 'react';
import {connect} from 'react-redux';
import {fetchUser} from '../actions';

class UserHeader extends React.Component{

    componentDidMount(){
        this.props.fetchUser(this.props.userId);
    }

    render(){
        const {user} = this.props;
        if(!user) {
            return null;            //return nothing
        }     

        return <div className="header">{user.name}</div>;
    }
}

const mapStateToProps = (state,ownProps) => {       //ownProps is a reference to above class props
    // console.log(state.users);        //something wrong here
    // const user = this.props.users.find((user)=> user.id === this.props.userId);       //as we return true, find stop and reutrn whatever element we have returned true for 
    return { user: state.users.find(user=>user.id === ownProps.userId) };
};

export default connect(mapStateToProps,{fetchUser:fetchUser}) (UserHeader);