//*Action creators are responsible for making api requests (this is where redux-thunk comes into play)

import jsonPlaceholder from "../apis/jsonPlaceholder";
import _ from "lodash"; //convention: we name lodash _

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
  return async (dispatch) => {
    //*FIX   this function takes (dispatch, getState) arguments    once our api gets data..we can manually dispatch
    const response = await jsonPlaceholder.get("./posts");

    //call dispatch and pass action object
    dispatch({
      type: "FETCH_POSTS",
      payload: response.data, //because we dont want other unnecessry headers and other data to be picekd up by reducer
    });
  };
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

//*ACTION CREATOR 2---
//*For fetching user who posted ...fetching all users at once in not practical in real world instead we fetch on user at one request
//! problem with this function is it works but it makes duplicate api requests for example if we make userid 1 reuqest 1 time, agian we need data of userId 1 it is going to call it agian so we momoize our function
// export const fetchUser = (id) =>{       //id of user that we want to fetch  returned by above api
//     return async (dispatch) => {                                    //*FIX   this function takes (dispatch, getState) arguments    once our api gets data..we can manually dispatch
//         const response = await jsonPlaceholder.get(`./users/${id}`);          //eg: /users/10

//         dispatch({
//             type:'FETCH_USER',
//             payload: response.data
//         });
//     }
// }

//*lodash memoize function prevents making same api calls again and again, when we call with same argument twice, it will return initially reutrnd calue instead of running function second time
// export const fetchUser = function (id) {        //!#ISSUE 1 ---if we memoize here, it is still making duplicate requests as it returns function and when we call it again it will return previous return but previous return is not some value it is still a function that makes api call...so duplicate api calls happen here
//     return _.memoize(async function (dispatch){
//         const response = await jsonPlaceholder.get(`./users/${id}`);    //!#ISSUE 2--if we call memoize here it will memoize but everytime we call it fetchUser, it will create new version of re-memoized function instead we need only one memoized function that remembers previous returned value if same argument are passed //so to sovle this we will define memeize outside and call api and dispatch from outside function

//         dispatch({
//             type:'FETCH_USER',
//             payload: response.data
//         });
//     });
// }

//*ISSUE FIXED:    //defining function outside of our action creator and memoize function that calls api and dispatch action outside of action creator

export const fetchUser = (id) => {
  return (dispatch) => {
    _fetchUser(id, dispatch); //calling memoized function
  };
};

const _fetchUser = _.memoize(async (id, dispatch) => {
  //_fetchUser indicates that this is a private function and other enginners should not call it unless they really know what they are doing
  const response = await jsonPlaceholder.get(`./users/${id}`);

  dispatch({
    type: "FETCH_USER",
    payload: response.data,
  });
});

//*non memoized version of this fix.......     (without use of lodash memoize function)
/*
export const fetchUser = (id) => async (dispatch) => {
    const response = await jsonPlaceholder.get(`./users/${id}`);

    dispatch({
        type: "FETCH_USER",
        payload: response.data,
    });
};


//1 creating new function 
export const fetchPostsAndUsers = () => async (dispatch,getState)=>{        //getState is the function in redux store that gives us access to all the data inside of redux
    console.log('about to fetched posts');
    await dispatch(fetchPosts());         //this invokes fetchPosts that returns its inner function ...so redux thunk will see new function and auto invoke it  //awiait before we move to new action creator
    getState().posts;
    //4 then iterate over unique posts...(we can also make use of lodash libraty to find unique)--lodash version of map has nice features
    const userIds = _.uniq(_.map(getState().posts,'userId'));       //_.map pulls all userId from list and _.uniq return array of unique userId  
    //5 then call 'fetchUser' with each every unique userId
    userIds.forEach(id=>dispatch(fetchUser(id)));       //*note: async await syntax does not work with foreach statement.. in this case we could do like await Promise.all(userIds.map(id=> dispatch(fetchUser(id)))); maybe..but in this case we dont need async await
    
    //* we could make refactor above two lines with lodash chain ...when we use chain result of one will be passed as first arg to other
    //*_.chain(getState().posts).map('userId).uniq().forEach(id=> dispatch(fetchUser(id))).value();     //.value means execute all steps
    console.log('fetched posts');
};

*/

//STEPS:
//1 first make new function fetchPostsAndUsers that call calls our action creators and dispatches them
//2 now import fetchPostsAndUsers to PostList and connect and call fetchPostsAndUsers() instead of fetchPosts...remove fetchPosts and add fetchPostsAndUsers
//3 then we need to find unique user ids from list of posts
//4 then iterate over unique posts...
//5 then call 'fetchUser' with each every unique userId

//now go to UserHeader -- remove fetchUser from import...componentDidiMount and connect function as we dont want that now
