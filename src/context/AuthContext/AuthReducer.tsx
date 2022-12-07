const AuthReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOGIN': {
      return {
        currentUser: action.payload,
        uid: action.payload.uid,
      };
    }
    case 'LOGOUT': {
      return {
        currentUser: null,
        uid: null,
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;
