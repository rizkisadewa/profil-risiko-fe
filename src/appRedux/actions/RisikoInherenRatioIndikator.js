import {
    FETCH_ERROR,
    FETCH_START,
    GET_ALL_RISIKO_INHEREN_RATIO_INDIKATOR,
    GET_RISIKO_INHEREN_RATIO_INDIKATOR,
    PUT_RISIKO_INHEREN_RATIO_INDIKATOR,
    POST_RISIKO_INHEREN_RATIO_INDIKATOR,
    DELETE_RISIKO_INHEREN_RATIO_INDIKATOR,
    STATUS_POST_RISIKO_INHEREN_RATIO_INDIKATOR,
    STATUS_PUT_RISIKO_INHEREN_RATIO_INDIKATOR,
    COUNT_RISIKO_INHEREN_RATIO_INDIKATOR,
    STATUS_ALL_RISIKO_INHEREN_RATIO_INDIKATOR,
    STATUS_ALL_RISIKO_INHEREN_RATIO_INDIKATOR_TABLE
} from "../../constants/ActionTypes";
import axios from 'util/Api'

export const getAllRisikoInherenRatioIndikator = ({page, token, description, name, jenis_nilai}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.get('api/risiko-inheren/ratio-indikator?page='+page+'&description='+description+'&name='+name+'&jenis_nilai='+jenis_nilai,{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: GET_ALL_RISIKO_INHEREN_RATIO_INDIKATOR, payload: data.data.rows});
                dispatch({type: STATUS_ALL_RISIKO_INHEREN_RATIO_INDIKATOR_TABLE, payload: data.statusCode});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            dispatch({type: FETCH_ERROR, payload: error.message});
            console.log("Error****:", error.message);
        });
    }
};

export const countAllRisikoInherenRatioIndikator = ({token, description, name, jenis_nilai}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.get('api/risiko-inheren/ratio-indikator?description='+description+'&name='+name+'&jenis_nilai='+jenis_nilai,{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: COUNT_RISIKO_INHEREN_RATIO_INDIKATOR, payload: data.data.rows.length});
                dispatch({type: STATUS_ALL_RISIKO_INHEREN_RATIO_INDIKATOR, payload: data.statusCode});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            dispatch({type: FETCH_ERROR, payload: error.message});
            console.log("Error****:", error.message);
        });
    }
};

export const getRisikoInherenRatioIndikator = ({id, token}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        //console.log('berhasil horee --> token :',token,' id :',id);
        axios.get('api/risiko-inheren/ratio-indikator/'+id,{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: GET_RISIKO_INHEREN_RATIO_INDIKATOR, payload: data.data});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            if (error.response) {
                if (error.response.data.data){
                    dispatch({type: GET_RISIKO_INHEREN_RATIO_INDIKATOR, payload: error.response.data.data});
                } else {
                    dispatch({type: FETCH_ERROR, payload: error.response.data.message});
                    console.log("Error****:", error.response.data.message);
                }
            }
        });
    }
};

export const updateRisikoInherenRatioIndikator = ({id, name, description, id_jenis_nilai, token}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.put('api/risiko-inheren/ratio-indikator/'+id,{
            name: name,
            description: description,
            id_jenis_nilai: id_jenis_nilai,
        },{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: PUT_RISIKO_INHEREN_RATIO_INDIKATOR, payload: data.data});
                dispatch({type: STATUS_PUT_RISIKO_INHEREN_RATIO_INDIKATOR, payload: data.statusCode});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            if (error.response) {
                if (error.response.data.data){
                    dispatch({type: PUT_RISIKO_INHEREN_RATIO_INDIKATOR, payload: error.response.data.data});
                } else {
                    dispatch({type: FETCH_ERROR, payload: error.response.data.message});
                    console.log("Error****:", error.response.data.message);
                }
            }
        });
    }
};

export const postRisikoInherenRatioIndikator = ({name, description, id_jenis_nilai, token}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.post('api/risiko-inheren/ratio-indikator',{
            name: name,
            description: description,
            id_jenis_nilai: id_jenis_nilai,
        },{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: POST_RISIKO_INHEREN_RATIO_INDIKATOR, payload: data.data});
                dispatch({type: STATUS_POST_RISIKO_INHEREN_RATIO_INDIKATOR, payload: data.statusCode});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            if (error.response) {
                if (error.response.data.data){
                    dispatch({type: POST_RISIKO_INHEREN_RATIO_INDIKATOR, payload: error.response.data.data});
                } else {
                    dispatch({type: FETCH_ERROR, payload: error.response.data.message});
                    console.log("Error****:", error.response.data.message);
                }
            }
        });
    }
};

export const resetPostRisikoInherenRatioIndikator = () => {
    return (dispatch) => {
        dispatch({type: STATUS_POST_RISIKO_INHEREN_RATIO_INDIKATOR, payload: 'STATUS_POST_RISIKO_INHEREN_RATIO_INDIKATOR'});
    }
}

export const resetPutRisikoInherenRatioIndikator = () => {
    return (dispatch) => {
        dispatch({type: STATUS_PUT_RISIKO_INHEREN_RATIO_INDIKATOR, payload: 'STATUS_PUT_RISIKO_INHEREN_RATIO_INDIKATOR'});
    }
}

export const deleteRisikoInherenRatioIndikator = ({id,token}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.delete('api/risiko-inheren/ratio-indikator/'+id,{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.statusCode === 200){
                dispatch({type: DELETE_RISIKO_INHEREN_RATIO_INDIKATOR, payload: data.statusCode});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            if (error.response) {
                if (error.response.data.data){
                    dispatch({type: DELETE_RISIKO_INHEREN_RATIO_INDIKATOR, payload: error.response.data.data});
                } else {
                    dispatch({type: FETCH_ERROR, payload: error.response.data.message});
                    console.log("Error****:", error.response.data.message);
                }
            }
        });
    }
};
