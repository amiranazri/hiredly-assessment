const initialState = {
    userData: {}, 
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case "STORE_USER_DATA":
        return {
          ...state,
          userData: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  