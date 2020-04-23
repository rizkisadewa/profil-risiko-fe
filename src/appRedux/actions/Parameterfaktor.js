import {FETCH_ERROR,
    FETCH_START,
    GET_ALL_PARAMETER_FAKTOR_TABLE,
    GET_PARAMETER_FAKTOR,
    PUT_PARAMETER_FAKTOR,
    POST_PARAMETER_FAKTOR,
    DELETE_PARAMETER_FAKTOR,
    STATUS_POST_PARAMETER_FAKTOR,
    STATUS_ALL_PARAMETER_FAKTOR_TABLE,
    STATUS_ALL_PARAMETER_FAKTOR,
    STATUS_PUT_PARAMETER_FAKTOR,
    COUNT_ALL_PARAMETER_FAKTOR
} from "../../constants/ActionTypes";
import axios from 'util/Api'

export const getAllFaktorParameterTable = ({page, token, risk_id, name, bobot}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        //console.log('berhasil horee --> page :',page,' token :',token);
        var parameters = '';
        if (risk_id > 0){
            parameters = 'page='+page+'&risk_id='+risk_id+'&name='+name+'&bobot='+bobot;
        } else {
            parameters = 'page='+page+'&name='+name+'&bobot='+bobot;
        }
        axios.get('api/parameter-faktor-table?'+parameters,{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: GET_ALL_PARAMETER_FAKTOR_TABLE, payload: data.data});
                dispatch({type: STATUS_ALL_PARAMETER_FAKTOR_TABLE, payload: data.statusCode});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            dispatch({type: FETCH_ERROR, payload: error.message});
            console.log("Error****:", error.message);
        });
    }
};

export const countAllFaktorParameter = ({token, risk_id, name, bobot}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        var parameters = '';
        if (risk_id > 0){
            parameters = '?risk_id='+risk_id+'&name='+name+'&bobot='+bobot;
        } else {
            parameters = '?name='+name+'&bobot='+bobot;
        }

        axios.get('api/parameter-faktor-table'+parameters,{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: COUNT_ALL_PARAMETER_FAKTOR, payload: data.data.length});
                dispatch({type: STATUS_ALL_PARAMETER_FAKTOR, payload: data.statusCode});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            dispatch({type: FETCH_ERROR, payload: error.message});
            console.log("Error****:", error.message);
        });
    }
};

export const getFaktorParameter = ({id, token}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        //console.log('berhasil horee --> token :',token,' id :',id);
        axios.get('api/parameter-faktor/'+id,{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: GET_PARAMETER_FAKTOR, payload: data.data});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            if (error.response) {
                if (error.response.data.data){
                    dispatch({type: GET_PARAMETER_FAKTOR, payload: error.response.data.data});
                } else {
                    dispatch({type: FETCH_ERROR, payload: error.response.data.message});
                    console.log("Error****:", error.response.data.message);
                }
            }
        });
    }
};

export const updateFaktorParameter = ({id, risk_id, penomoran, name, level, bobot, token}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.put('api/parameter-faktor/'+id,{
            risk_id: risk_id,
            penomoran: penomoran,
            name: name,
            level: level,
            bobot: bobot
        },{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: PUT_PARAMETER_FAKTOR, payload: data.data});
                dispatch({type: STATUS_PUT_PARAMETER_FAKTOR, payload: data.statusCode});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            if (error.response) {
                if (error.response.data.data){
                    dispatch({type: PUT_PARAMETER_FAKTOR, payload: error.response.data.data});
                } else {
                    dispatch({type: FETCH_ERROR, payload: error.response.data.message});
                    console.log("Error****:", error.response.data.message);
                }
            }
        });
    }
};

export const postFaktorParameter = ({risk_id, penomoran, name, level, bobot, token}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.post('api/parameter-faktor',{
            risk_id: risk_id,
            penomoran: penomoran,
            name: name,
            level: level,
            bobot: bobot
        },{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: POST_PARAMETER_FAKTOR, payload: data.data});
                dispatch({type: STATUS_POST_PARAMETER_FAKTOR, payload: data.statusCode});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            if (error.response) {
                if (error.response.data.data){
                    dispatch({type: POST_PARAMETER_FAKTOR, payload: error.response.data.data});
                } else {
                    dispatch({type: FETCH_ERROR, payload: error.response.data.message});
                    console.log("Error****:", error.response.data.message);
                }
            }
        });
    }
};

export const resetPostFaktorParameter = () => {
    return (dispatch) => {
        dispatch({type: STATUS_POST_PARAMETER_FAKTOR, payload: 'STATUS_POST_PARAMETER_FAKTOR'});
    }
}

export const resetPutFaktorParameter = () => {
    return (dispatch) => {
        dispatch({type: STATUS_PUT_PARAMETER_FAKTOR, payload: 'STATUS_PUT_PARAMETER_FAKTOR'});
    }
}

export const deleteFaktorParameter = ({id,token}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.delete('api/parameter-faktor/'+id,{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.statusCode === 200){
                dispatch({type: DELETE_PARAMETER_FAKTOR, payload: data.statusCode});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            if (error.response) {
                if (error.response.data.data){
                    dispatch({type: DELETE_PARAMETER_FAKTOR, payload: error.response.data.data});
                } else {
                    dispatch({type: FETCH_ERROR, payload: error.response.data.message});
                    console.log("Error****:", error.response.data.message);
                }
            }
        });
    }
};