import {
    FETCH_ERROR,
    FETCH_START,
    FETCH_SUCCESS, GET_ALL_PARAMETER_FAKTOR_TABLE,
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
      console.log("data:", data);
      if (data.result) {
        localStorage.setItem("token", JSON.stringify(data.token.access_token));
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
        axios.defaults.headers.common['access-token'] = "Bearer " + data.data.token;
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_TOKEN_SET, payload: data.data.token});
        dispatch({type: USER_DATA, payload: data.data.user_data.user_real_name});
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
      dispatch({type: FETCH_SUCCESS});
      dispatch({type: SIGNOUT_USER_SUCCESS});
    }, 2000);
  }
};

export const getAllFaktorParameterTable = ({page, token}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.get('api/parameter-faktor-table?page=1',{
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDAyLCJ1c2VybmFtZSI6InMwNTgxIiwicGFzc3dvcmQiOiIkMmEkMTAkbHZ5cHJSOUV4Y1V0S0Q0bjhZc0ZydXFuTjQyY0hSSy5JSGMvTnljNEx3OUpxTzNUcEJ3QUsiLCJ1c2VyX3JlYWxfbmFtZSI6IlRFRERZIFRSSSBBR1VORyBSIiwidXNlcl9lbWFpbCI6InRlZGR5LnRyaS5hZ3VuZ0BiamJzLmNvLmlkIiwidXNlcl9waG9uZV9udW1iZXIiOiIwODExMTExMTMyNiIsImlzX2FjdGl2ZSI6MSwia3RwIjoiMzI3MzEzMTQwNzg5MDAwMSIsIm5pcCI6IjEzLjg5LjA1MjQiLCJqYWJhdGFuIjoiU3RhZiBEaXZpc2kgUGVtYmlheWFhbiBLb25zdW1lciIsImJyYW5jaF9uYW1lIjoiS0FOVE9SIFBVU0FUIEJKQiBTWUFSSUFIIiwiYnJhbmNoX2NvZGUiOiIwMDAiLCJicmFuY2hfYWRkcmVzcyI6IkpMLiBCUkFHQSBOTy4gMTM1Iiwia29kZV93aWxheWFoIjoiMzI3MyIsImZvdG8iOm51bGwsImlhdCI6MTU4NjU5OTIxMywiZXhwIjoxNTg3NDk5MjEzfQ._zy8Dtjm12oYFcvcbUOJo5VnEdSQ4FcY0Siy6mTSfNQ"
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: GET_ALL_PARAMETER_FAKTOR_TABLE, payload: data.data.rows});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            dispatch({type: FETCH_ERROR, payload: error.message});
            console.log("Error****:", error.message);
        });
    }
};