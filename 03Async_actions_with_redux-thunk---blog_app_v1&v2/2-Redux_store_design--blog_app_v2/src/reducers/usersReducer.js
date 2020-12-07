export default (state=[],action) =>{
    // console.log(action.payload)      //! something wrong here
    switch(action.type){
        case 'FETCH_USER':
            return [...state,action.payload];
        default:
            return state;
    }
};