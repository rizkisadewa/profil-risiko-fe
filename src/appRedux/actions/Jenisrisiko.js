import {
    FETCH_ERROR,
    FETCH_START,
    GET_ALL_RISKS,
    DELETE_ALL_RISKS,
    POST_ALL_RISKS,
    PUT_ALL_RISKS,
    STATUS_ALL_RISKS,
    STATUS_POST_RISK,
    STATUS_PUT_RISK,
    GET_RISK
} from "../../constants/ActionTypes";
import axios from 'util/Api'

export const getAllRisks = ({token}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.get('api/risks',{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: GET_ALL_RISKS, payload: data.data});
                dispatch({type: STATUS_ALL_RISKS, payload: data.statusCode});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            dispatch({type: FETCH_ERROR, payload: error.message});
            console.log("Error****:", error.message);
        });
    }
};

export const getRisk = ({id, token}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.get('api/risks/'+id,{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: GET_RISK, payload: data.data});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            dispatch({type: FETCH_ERROR, payload: error.message});
            console.log("Error****:", error.message);
        });
    }
};

export const addRisk = ({nama, keterangan, token}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.post('api/risks/profil-risiko',{
            nama: nama,
            keterangan: keterangan,
        },{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: POST_ALL_RISKS, payload: data.data});
                dispatch({type: STATUS_POST_RISK, payload: data.statusCode});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            if (error.response) {
                if (error.response.data.data){
                    dispatch({type: POST_ALL_RISKS, payload: error.response.data.data});
                } else {
                    dispatch({type: FETCH_ERROR, payload: error.response.data.message});
                    console.log("Error****:", error.response.data.message);
                }
            }
        });
    }
};

export const updateRisk = ({id, nama, keterangan, jenis, token}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.put('api/risks/'+id,{
            nama: nama,
            keterangan: keterangan,
            jenis: jenis
        },{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: PUT_ALL_RISKS, payload: data.data});
                dispatch({type: STATUS_PUT_RISK, payload: data.statusCode});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            if (error.response) {
                if (error.response.data.data){
                    dispatch({type: PUT_ALL_RISKS, payload: error.response.data.data});
                } else {
                    dispatch({type: FETCH_ERROR, payload: error.response.data.message});
                    console.log("Error****:", error.response.data.message);
                }
            }
        });
    }
};

export const deleteRisk = ({id,token}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.delete('api/risks/'+id,{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.statusCode === 200){
                dispatch({type: DELETE_ALL_RISKS, payload: data.statusCode});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            if (error.response) {
                if (error.response.data.data){
                    dispatch({type: DELETE_ALL_RISKS, payload: error.response.data.data});
                } else {
                    dispatch({type: FETCH_ERROR, payload: error.response.data.message});
                    console.log("Error****:", error.response.data.message);
                }
            }
        });
    }
};

export const resetPostRisk = () => {
    return (dispatch) => {
        dispatch({type: STATUS_POST_RISK, payload: 'STATUS_POST_RISK'});
    }
}

export const resetPutRisk = () => {
    return (dispatch) => {
        dispatch({type: STATUS_PUT_RISK, payload: 'STATUS_PUT_RISK'});
    }
}