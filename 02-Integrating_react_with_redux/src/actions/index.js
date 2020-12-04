//Action Creator
export const selectSong = (song) =>{
    //Return an action object
    return {
        type: 'SONG_SELECTED',        //*must specify type property in action
        payload: song                  //selected song
    };
};

