import React, { Component } from 'react';
import {connect} from 'react-redux';
import { selectSong } from '../actions';      //when filename is not specified here...webpack will auto pull index.js file..thats why we put name of action index.js

class SongList extends Component{           //import React,{ Component } from 'react'; as I want only component

    renderList(){
        return this.props.songs.map((song)=>{
            return(     //? why two return here? ...map produce new array of jsx elements and after we produce that array we want to return the array from the renderlist method
                <div className="item" key={song.title}>
                    <div className="right floated content">
                        <button className="ui button primary" onClick={()=>this.props.selectSong(song)}>Select</button> {/*Why dont we have to call dispatch(actionCreator) here?  because this action creator is passed as object to connect in second argument which and connect sees if there is function in object and connect auto takes returned value of actionCreator and puts it to dispatch which updates our state...this update data inside redux store and cause this component to rerender  */}
                    </div>                    
                    <div className="content">
                        {song.title}
                    </div>
                    
                </div>
            );
        });
    }

    render(){
        // console.log(this.props);
    return <div className="ui divided list">{this.renderList()}</div>;
    }
}

const mapStateToProps = (state) =>{     //called with all redux store data(state)     //mapStateToProps naming is convention only     //take our state object(redux store data) and run computaion that cause that data to eventually show as prop inside our component
    //console.log(state);                     //this gets updated when we click on the button which calls action creator and also causes component to rerender
    return {songs:state.songs};
}

export default connect(mapStateToProps,{ selectSong:selectSong}) (SongList);        //selectSong action creator is now passed into prop of this prop


//Explanation example About creating instance of connect
/*
function connect(){
    return function(){
        return 'Hi there';
    }
}

connect()();
*/

//*this means connect returns a function and second set of parenthesis invoke the fun that get returned