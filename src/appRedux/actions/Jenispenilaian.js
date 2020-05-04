import {
    FETCH_ERROR,
    FETCH_START,
    GET_ALL_JENIS_PENILAIAN,
    GET_JENIS_PENILAIAN,
    PUT_JENIS_PENILAIAN,
    POST_JENIS_PENILAIAN,
    DELETE_JENIS_PENILAIAN,
    STATUS_POST_JENIS_PENILAIAN,
    STATUS_PUT_JENIS_PENILAIAN,
    COUNT_JENIS_PENILAIAN,
    STATUS_ALL_JENIS_PENILAIAN,
    STATUS_ALL_JENIS_PENILAIAN_TABLE
} from "../../constants/ActionTypes";
import axios from 'util/Api'

export const getAllJenisPenilaian = ({page, token, name, description}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.get('api/master-jenis-nilai?page='+page+'&name='+name+'&description='+description,{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: GET_ALL_JENIS_PENILAIAN, payload: data.data.rows});
                dispatch({type: STATUS_ALL_JENIS_PENILAIAN_TABLE, payload: data.statusCode});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            dispatch({type: FETCH_ERROR, payload: error.message});
            console.log("Error****:", error.message);
        });
    }
};

export const countAllJenisPenilaian = ({token, name, description}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.get('api/master-jenis-nilai?name='+name+'&description='+description,{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: COUNT_JENIS_PENILAIAN, payload: data.data.rows.length});
                dispatch({type: STATUS_ALL_JENIS_PENILAIAN, payload: data.statusCode});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            dispatch({type: FETCH_ERROR, payload: error.message});
            console.log("Error****:", error.message);
        });
    }
};

export const getJenisPenilaian = ({id, token}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.get('api/master-jenis-nilai/'+id,{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: GET_JENIS_PENILAIAN, payload: data.data});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            if (error.response) {
                if (error.response.data.data){
                    dispatch({type: GET_JENIS_PENILAIAN, payload: error.response.data.data});
                } else {
                    dispatch({type: FETCH_ERROR, payload: error.response.data.message});
                    console.log("Error****:", error.response.data.message);
                }
            }
        });
    }
};

export const updateJenisPenilaian = ({id, name, description, token}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.put('api/master-jenis-nilai/'+id,{
            name: name,
            description: description,
        },{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: PUT_JENIS_PENILAIAN, payload: data.data});
                dispatch({type: STATUS_PUT_JENIS_PENILAIAN, payload: data.statusCode});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            if (error.response) {
                if (error.response.data.data){
                    dispatch({type: PUT_JENIS_PENILAIAN, payload: error.response.data.data});
                } else {
                    dispatch({type: FETCH_ERROR, payload: error.response.data.message});
                    console.log("Error****:", error.response.data.message);
                }
            }
        });
    }
};

export const postJenisPenilaian = ({name, description, token}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.post('api/master-jenis-nilai',{
            name: name,
            description: description,
        },{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: POST_JENIS_PENILAIAN, payload: data.data});
                dispatch({type: STATUS_POST_JENIS_PENILAIAN, payload: data.statusCode});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            if (error.response) {
                if (error.response.data.data){
                    dispatch({type: POST_JENIS_PENILAIAN, payload: error.response.data.data});
                } else {
                    dispatch({type: FETCH_ERROR, payload: error.response.data.message});
                    console.log("Error****:", error.response.data.message);
                }
            }
        });
    }
};

export const resetPostJenisPenilaian = () => {
    return (dispatch) => {
        dispatch({type: STATUS_POST_JENIS_PENILAIAN, payload: 'STATUS_POST_JENIS_PENILAIAN'});
    }
}

export const resetPutJenisPenilaian = () => {
    return (dispatch) => {
        dispatch({type: STATUS_PUT_JENIS_PENILAIAN, payload: 'STATUS_PUT_JENIS_PENILAIAN'});
    }
}

export const deleteJenisPenilaian = ({id,token}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.delete('api/master-jenis-nilai/'+id,{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.statusCode === 200){
                dispatch({type: DELETE_JENIS_PENILAIAN, payload: data.statusCode});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            if (error.response) {
                if (error.response.data.data){
                    dispatch({type: DELETE_JENIS_PENILAIAN, payload: error.response.data.data});
                } else {
                    dispatch({type: FETCH_ERROR, payload: error.response.data.message});
                    console.log("Error****:", error.response.data.message);
                }
            }
        });
    }
};