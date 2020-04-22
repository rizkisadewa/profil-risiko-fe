import {
    FETCH_ERROR,
    FETCH_START,
    GET_ALL_PERINGKAT_RISIKO,
    GET_PERINGKAT_RISIKO,
    PUT_PERINGKAT_RISIKO,
    POST_PERINGKAT_RISIKO,
    DELETE_PERINGKAT_RISIKO,
    STATUS_POST_PERINGKAT_RISIKO,
    STATUS_PUT_PERINGKAT_RISIKO,
    COUNT_PERINGKAT_RISIKO,
    STATUS_ALL_PERINGKAT_RISIKO,
    STATUS_ALL_PERINGKAT_RISIKO_TABLE
} from "../../constants/ActionTypes";
import axios from 'util/Api'

export const getAllPeringkatRisiko = ({page, token}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.get('api/peringkat-risiko?page='+page,{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: GET_ALL_PERINGKAT_RISIKO, payload: data.data.rows});
                dispatch({type: STATUS_ALL_PERINGKAT_RISIKO_TABLE, payload: data.statusCode});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            dispatch({type: FETCH_ERROR, payload: error.message});
            console.log("Error****:", error.message);
        });
    }
};

export const countAllPeringkatRisiko = ({token}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.get('api/peringkat-risiko',{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: COUNT_PERINGKAT_RISIKO, payload: data.data.rows.length});
                dispatch({type: STATUS_ALL_PERINGKAT_RISIKO, payload: data.statusCode});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            dispatch({type: FETCH_ERROR, payload: error.message});
            console.log("Error****:", error.message);
        });
    }
};

export const getPeringkatRisiko = ({id, token}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        //console.log('berhasil horee --> token :',token,' id :',id);
        axios.get('api/peringkat-risiko/'+id,{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: GET_PERINGKAT_RISIKO, payload: data.data});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            if (error.response) {
                if (error.response.data.data){
                    dispatch({type: GET_PERINGKAT_RISIKO, payload: error.response.data.data});
                } else {
                    dispatch({type: FETCH_ERROR, payload: error.response.data.message});
                    console.log("Error****:", error.response.data.message);
                }
            }
        });
    }
};

export const updatePeringkatRisiko = ({id, name, description, id_jenis_nilai, token}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.put('api/peringkat-risiko/'+id,{
            name: name,
            description: description,
            id_jenis_nilai: id_jenis_nilai,
        },{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: PUT_PERINGKAT_RISIKO, payload: data.data});
                dispatch({type: STATUS_PUT_PERINGKAT_RISIKO, payload: data.statusCode});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            if (error.response) {
                if (error.response.data.data){
                    dispatch({type: PUT_PERINGKAT_RISIKO, payload: error.response.data.data});
                } else {
                    dispatch({type: FETCH_ERROR, payload: error.response.data.message});
                    console.log("Error****:", error.response.data.message);
                }
            }
        });
    }
};

export const postPeringkatRisiko = ({name, description, id_jenis_nilai, token}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.post('api/peringkat-risiko',{
            name: name,
            description: description,
            id_jenis_nilai: id_jenis_nilai,
        },{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: POST_PERINGKAT_RISIKO, payload: data.data});
                dispatch({type: STATUS_POST_PERINGKAT_RISIKO, payload: data.statusCode});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            if (error.response) {
                if (error.response.data.data){
                    dispatch({type: POST_PERINGKAT_RISIKO, payload: error.response.data.data});
                } else {
                    dispatch({type: FETCH_ERROR, payload: error.response.data.message});
                    console.log("Error****:", error.response.data.message);
                }
            }
        });
    }
};

export const resetPostPeringkatRisiko = () => {
    return (dispatch) => {
        dispatch({type: STATUS_POST_PERINGKAT_RISIKO, payload: 'STATUS_POST_PERINGKAT_RISIKO'});
    }
}

export const resetPutPeringkatRisiko = () => {
    return (dispatch) => {
        dispatch({type: STATUS_PUT_PERINGKAT_RISIKO, payload: 'STATUS_PUT_PERINGKAT_RISIKO'});
    }
}

export const deletePeringkatRisiko = ({id,token}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.delete('api/peringkat-risiko/'+id,{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.statusCode === 200){
                dispatch({type: DELETE_PERINGKAT_RISIKO, payload: data.statusCode});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            if (error.response) {
                if (error.response.data.data){
                    dispatch({type: DELETE_PERINGKAT_RISIKO, payload: error.response.data.data});
                } else {
                    dispatch({type: FETCH_ERROR, payload: error.response.data.message});
                    console.log("Error****:", error.response.data.message);
                }
            }
        });
    }
};