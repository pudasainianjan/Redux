import React from 'react';
import {connect} from 'react-redux';

const SongDetail = ({song}) =>{             //props.song
    //!console.log(props);     //gives error because when is first render component selectedState is set to null in reducer so do if check
    if(!song){
        return <div>Select a song</div>
    }
    return (
        <div>
            <h3>Details For:</h3>
            <p>Title: {song.title}</p>
            <p>Duration: {song.duration}</p>
        </div>
    );
};

const mapStateToProps = (state) =>{         //everytime selected song change SongDetail rerenders
     return { song: state.selectedSong }
};

export default connect(mapStateToProps) (SongDetail);