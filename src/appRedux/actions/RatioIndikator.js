import {
    FETCH_ERROR,
    FETCH_START,
    COUNT_RATIO_INDIKATOR,
    DELETE_RATIO_INDIKATOR,
    GET_ALL_RATIO_INDIKATOR,
    GET_RATIO_INDIKATOR,
    POST_RATIO_INDIKATOR,
    PUT_RATIO_INDIKATOR,
    STATUS_POST_RATIO_INDIKATOR,
    STATUS_PUT_RATIO_INDIKATOR,
    STATUS_ALL_RATIO_INDIKATOR,
    GET_ALL_RATIO_INDIKATOR_TABLE,
    STATUS_ALL_RATIO_INDIKATOR_TABLE,
    GET_ALL_RATIO_INDIKATOR_KUALITATIF
} from "../../constants/ActionTypes";
import axios from 'util/Api'

export const getAllRatioIndikatortable = ({page, token, jenis}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.get('api/ratio-indikator-table?page='+page+'&jenis='+jenis,{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: GET_ALL_RATIO_INDIKATOR_TABLE, payload: data.data.rows});
                dispatch({type: STATUS_ALL_RATIO_INDIKATOR_TABLE, payload: data.statusCode});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            dispatch({type: FETCH_ERROR, payload: error.message});
            console.log("Error****:", error.message);
        });
    }
};

export const getAllRatioIndikatorForParamterKualitatif = ({token, jenis}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.get(`api/ratio-indikator-table?jenis=${jenis}&id_jenis_nilai=4`,{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: GET_ALL_RATIO_INDIKATOR_KUALITATIF, payload: data.data.rows});
                dispatch({type: STATUS_ALL_RATIO_INDIKATOR_TABLE, payload: data.statusCode});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            dispatch({type: FETCH_ERROR, payload: error.message});
            console.log("Error****:", error.message);
        });
    }
};

export const countAllRatioIndikator = ({token, jenis}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.get('api/ratio-indikator-table?jenis='+jenis,{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: COUNT_RATIO_INDIKATOR, payload: data.data.rows.length});
                dispatch({type: STATUS_ALL_RATIO_INDIKATOR, payload: data.statusCode});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            dispatch({type: FETCH_ERROR, payload: error.message});
            console.log("Error****:", error.message);
        });
    }
};

export const getAllRatioIndikator = ({token}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.get('api/ratio-indikator',{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: GET_ALL_RATIO_INDIKATOR, payload: data.data});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            dispatch({type: FETCH_ERROR, payload: error.message});
            console.log("Error****:", error.message);
        });
    }
};

export const getRatioIndikator = ({id, token}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.get('api/ratio-indikator/'+id,{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: GET_RATIO_INDIKATOR, payload: data.data});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            if (error.response) {
                if (error.response.data.data){
                    dispatch({type: GET_RATIO_INDIKATOR, payload: error.response.data.data});
                } else {
                    dispatch({type: FETCH_ERROR, payload: error.response.data.message});
                    console.log("Error****:", error.response.data.message);
                }
            }
        });
    }
};

export const updateRatioIndikator = ({id, name, description, token, jenis, id_jenis_nilai}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.put('api/ratio-indikator/'+id,{
            name: name,
            description: description,
            jenis:jenis,
            id_jenis_nilai:id_jenis_nilai
        },{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: PUT_RATIO_INDIKATOR, payload: data.data});
                dispatch({type: STATUS_PUT_RATIO_INDIKATOR, payload: data.statusCode});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            if (error.response) {
                if (error.response.data.data){
                    dispatch({type: PUT_RATIO_INDIKATOR, payload: error.response.data.data});
                } else {
                    dispatch({type: FETCH_ERROR, payload: error.response.data.message});
                    console.log("Error****:", error.response.data.message);
                }
            }
        });
    }
};

export const postRatioIndikator = ({name, description, jenis, id_jenis_nilai, token}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.post('api/ratio-indikator',{
            name: name,
            description: description,
            jenis:jenis,
            id_jenis_nilai:id_jenis_nilai
        },{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: POST_RATIO_INDIKATOR, payload: data.data});
                dispatch({type: STATUS_POST_RATIO_INDIKATOR, payload: data.statusCode});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            if (error.response) {
                if (error.response.data.data){
                    dispatch({type: POST_RATIO_INDIKATOR, payload: error.response.data.data});
                } else {
                    dispatch({type: FETCH_ERROR, payload: error.response.data.message});
                    console.log("Error****:", error.response.data.message);
                }
            }
        });
    }
};

export const resetPostRatioIndikator = () => {
    return (dispatch) => {
        dispatch({type: STATUS_POST_RATIO_INDIKATOR, payload: 'STATUS_POST_RATIO_INDIKATOR'});
    }
}

export const resetPutRatioIndikator = () => {
    return (dispatch) => {
        dispatch({type: STATUS_PUT_RATIO_INDIKATOR, payload: 'STATUS_PUT_RATIO_INDIKATOR'});
    }
}

export const deleteRatioIndikator = ({id,token}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.delete('api/ratio-indikator/'+id,{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.statusCode === 200){
                dispatch({type: DELETE_RATIO_INDIKATOR, payload: data.statusCode});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            if (error.response) {
                if (error.response.data.data){
                    dispatch({type: DELETE_RATIO_INDIKATOR, payload: error.response.data.data});
                } else {
                    dispatch({type: FETCH_ERROR, payload: error.response.data.message});
                    console.log("Error****:", error.response.data.message);
                }
            }
        });
    }
};
