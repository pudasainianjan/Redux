//*Action creators are responsible for making api requests (this is where redux-thunk comes into play)

import jsonPlaceholder from '../apis/jsonPlaceholder';

// export const fetchPosts = async () => {
//     //!bad approach --because we are breaking the rule of redux(action creator)..gives error actions must be plain objects and use custom middleware for async actions
//? why this error? because of async await syntax..becasue when it gets converted to es2015 version it becomes something like this: 
//?  when we initially run it, it will return case 0 and send returned to dispatch and redux wants action to be plain js object...thats why error
//? what if we remove async await?  -- then by the time our action gets to reducer, our api wont have fetched our data!!! means reducers already run before fetching data if async await removed...
/*
    export const fetchPosts = async () => {
        case 0:
            const response = await jsonPlaceholder.get('./posts');
        case 1:
            return {
                type: 'FETCH_POSTS',
                payload: response
            };
};
*/
//     const response = await jsonPlaceholder.get('./posts');
//     return {
//         type: 'FETCH_POSTS',
//         payload: response
//     };
// };

//TODO: SOLUTION-----------use middle-ware 

export const fetchPosts = () => {
    return async (dispatch) => {                                    //*FIX   this function takes (dispatch, getState) arguments    once our api gets data..we can manually dispatch 
        const response = await jsonPlaceholder.get('./posts');
        
        //call dispatch and pass action object
        dispatch({
                type: 'FETCH_POSTS',
                payload: response  
        })
    }  
};

//above can be refactored as: as we are returning only one thing
/*
export const fetchPosts = () => async (dispatch) => {                                      
        const response = await jsonPlaceholder.get('./posts');
        
        //call dispatch and pass action object
        dispatch({
                type: 'FETCH_POSTS',
                payload: response  
        })
    }  

*/

//Note:  Totally fine -- if we can still make normal action creators that only returns an objects
/*
    export const selectPost = () =>{
        return {
            type:'SELECT_POST'
        }
    };
*/