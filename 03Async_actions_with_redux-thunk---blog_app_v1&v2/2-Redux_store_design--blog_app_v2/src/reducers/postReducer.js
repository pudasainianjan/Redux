// export default (state=[],action) => {         //when reducer runs on first render the first state argument is always undefined so put some default there
//     // return undefined;           //reducer must not return undefined and must return any other value
//     if(action.type === 'FETCH_POSTS'){
//         return action.payload;
//     }
//     return state;               //if we dont see any action.type that matches ...we must return because we cannot refuse to return or return undefined from reducer
// };


//* very common syntax(use switch in reducers)... we mostly use switch cases to check action type inside reducers instead of i checks ...
export default (state=[],action) => {        
    switch(action.type){
        case 'FETCH_POSTS':
            return action.payload;
        default:
            return state;               
    } 
};