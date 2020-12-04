console.clear();
//Suppose we have a Insurance Company WIth three departments claims history dep.,policy dep and accounting dep...when a client fills form and submits...user can either create policy,delete policy and create claim...our insurance front officer(dispatch) will colllect the form and pass to respective department... when our department get the form, they will get a copy of all insurance data(central state) and make changes according to form...is form is for creating policy them two departments make changes..acoounting add money to bag(state) and policy department list the name of client
//if u're using this in code pen, create new pen and select js and add redux as dependency


//*(Action Creators) *people drpping off a form 
const createPolicy = (name,amount) =>{
  return {/*action*/
    type:'CREATE_POLICY',
    payload:{
      name: name,
      amount: amount
    }
  };
};

const deletePolicy = (name) =>{
    return {    /*action*/
      type: 'DELETE_POLICY',
      payload:{
        name: name
      }
    }
};

const createClaim = (name, amountOfMoneyToCollect) => {
  return {      /*action*/
    type: 'CREATE_CLAIM',
    payload:{
      name:name,
      amountOfMoneyToCollect: amountOfMoneyToCollect
    }
  }
};

//*Reducers (Departments)

const claimsHistory = (oldListOfClaims = [], action) => { /*takes two arguments always...first-->data from state,action(like new user form)*/       //hen reducer is called for the first time, data may not be there, oldListItem may be undefined so empty array if no previous data exist 
   if(action.type === 'CREATE_CLAIM'){
     //we care about this action(FORM!
     return [...oldListOfClaims,action.payload];  //we always return a new array o object in reducer return as opposed to modifying an existing one                                                                                   will modify existing array 
   }
  
    //we dont care about the action(FORM!)
    return oldListOfClaims;
};

const accounting = (bagOfMoney =100,action)=>{
  if(action.type === 'CREATE_CLAIM'){
    return bagOfMoney - action.payload.amountOfMoneyToCollect;
  }
  else if(action.type === 'CREATE_POLICY'){
    return bagOfMoney + action.payload.amount
  }
  //when this is not trying to create a claim 
  return bagOfMoney;
}


const policies = (listOfPolicies=[], action) =>{
  
  if(action.type === "CREATE_POLICY"){
    return [...listOfPolicies,action.payload.name];
  }
  else if(action.type === "DELETE_POLICY"){
    return listOfPolicies.filter(name => name !== action.payload.name);
  }
  
  return listOfPolicies;
  
};


//*Accessing and modifying our app state with help of redux functions

const { createStore, combineReducers } = Redux;     //pulling two function from redux

const ourDepartments = combineReducers({   //combining all reducers together 
   accounting: accounting,
   claimsHistory: claimsHistory,
   policies: policies
});

const store = createStore(ourDepartments);
//*store;      //this object represents our entire redux application....it contains reference to all our different reducers, all state produced by reducers
//*store object has different functions on it 
//*one of them is dispatch function, dispatch function.. so we pass dispatch function an 'action' and dispatch is going to make copy of it and send it to each reducers in our application...in order to call dispatch we first have to pass in an action i.e created by action creator

const action = createPolicy('Alex',20);   //creating a new policy for alex

store.dispatch(action);   //now action will be given to each reducers, now each of reducer functions run and process that action(form);
store.dispatch(createPolicy('Jim',30));
store.dispatch(createPolicy('Bob',40));

store.dispatch(createClaim('Alex',120));
store.dispatch(createClaim('Jim',50));

store.dispatch(deletePolicy('Bob'));
//! NOTE: we cannot get direct access to our state property like "store.state.accounting -100" like this ...we can only modify our state by dispatching an action

console.log(store.getState());          //*get access to our entire common information 




