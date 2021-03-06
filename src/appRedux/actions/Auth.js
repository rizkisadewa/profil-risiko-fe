import {
    FETCH_ERROR,
    FETCH_START,
    FETCH_SUCCESS,
    INIT_URL,
    SIGNOUT_USER_SUCCESS,
    USER_DATA,
    USER_TOKEN_SET
} from "../../constants/ActionTypes";
import axios from 'util/Api'

export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url
  };
};

export const userSignUp = ({email, password, name}) => {
  console.log(email, password);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('auth/register', {
        email: email,
        password: password,
        name: name
      }
    ).then(({data}) => {
      console.log("data auth:", data);
      if (data.result) {
        localStorage.setItem("user", JSON.stringify(data.token.access_token));
        axios.defaults.headers.common['access-token'] = "Bearer " + data.token.access_token;
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_TOKEN_SET, payload: data.token.access_token});
        dispatch({type: USER_DATA, payload: data.user});
      } else {
        console.log("payload: data.error", data.error);
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  }
};

export const userSignIn = ({username, password}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('api/auth/sign-in', {
        username: username,
        password: password,
      }
    ).then(({data}) => {
      console.log("userSignIn: ", data.data.user_data.user_real_name);
      if (data.data) {
        localStorage.setItem("token", JSON.stringify(data.data.token));
        localStorage.setItem("user", JSON.stringify(data.data.user_data));
        axios.defaults.headers.common['access-token'] = "Bearer " + data.data.token;
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_TOKEN_SET, payload: data.data.token});
        dispatch({type: USER_DATA, payload: data.data.user_data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  }
};

export const getUser = () => {
  return (dispatch) => {
    /*dispatch({type: FETCH_START});
    axios.post('auth/me',
    ).then(({data}) => {
      console.log("userSignIn: ", data);
      if (data.result) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_DATA, payload: data.user});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });*/
  }
};


export const userSignOut = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch({type: FETCH_SUCCESS});
      dispatch({type: SIGNOUT_USER_SUCCESS});
    }, 2000);
  }
};
