import {FETCH_ERROR, FETCH_START, GET_ALL_PARAMETER_FAKTOR_TABLE, GET_PARAMETER_FAKTOR, PUT_PARAMETER_FAKTOR} from "../../constants/ActionTypes";
import axios from 'util/Api'

export const getAllFaktorParameterTable = ({page, token}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        //console.log('berhasil horee --> page :',page,' token :',token);
        axios.get('api/parameter-faktor-table?page='+page,{
            headers: {
                Authorization: "Bearer "+token
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