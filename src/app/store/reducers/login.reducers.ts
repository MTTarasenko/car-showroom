import {initialLoginState, LoginState} from '../state/login.state';
import {ELoginActions, LoginActions} from '../actions/login.actions';


export const loginReducers = (
  state = initialLoginState,
  action: LoginActions
): LoginState => {
  switch (action.type) {
    case ELoginActions.GetLoginSuccess: {
      return {
        ...state,
        loginData: action.payload
      };
    }

    default: {
      return state;
    }
  }
};
