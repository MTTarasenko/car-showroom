import {ELoginActions, LoginActions} from '../actions/login.actions';
import {LoginDataModel} from '../../models/login-data.model';

export interface LoginState {
  loginData: LoginDataModel;
}

export const initialLoginState: LoginState = {
  loginData: null,
};

export const loginReducers = (
  state = initialLoginState,
  action: LoginActions
): LoginState => {
  switch (action.type) {
    case ELoginActions.GetLogin: {
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
