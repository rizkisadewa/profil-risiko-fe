import {FETCH_ERROR,
    FETCH_START,
    GET_ALL_PARAMETER_FAKTOR_TABLE,
    GET_PARAMETER_FAKTOR,
    PUT_PARAMETER_FAKTOR,
    POST_PARAMETER_FAKTOR,
    DELETE_PARAMETER_FAKTOR,
    STATUS_POST_PARAMETER_FAKTOR,
    GET_ALL_RISKS,
    DELETE_ALL_RISKS,
    POST_ALL_RISKS,
    PUT_ALL_RISKS,
    JENIS_NILAI_PARAM
} from "../../constants/ActionTypes";
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

export const deleteFaktorParameter = ({id,token}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.delete('api/parameter-faktor/'+id,{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: DELETE_PARAMETER_FAKTOR, payload: data.data});
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
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            dispatch({type: FETCH_ERROR, payload: error.message});
            console.log("Error****:", error.message);
        });
    }
};

export const addRisk = ({nama, keterangan, jenis, token}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.post('api/risks',{
            nama: nama,
            keterangan: keterangan,
            jenis: jenis
        },{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: POST_ALL_RISKS, payload: data.data});
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
            if (data.data){
                dispatch({type: DELETE_ALL_RISKS, payload: data.data});
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

export const jenisNilaiParam = ({token}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.get('api/master',{
            data : {
                "table_id": "mst_jenis_nilai",
                "value_id": "id",
                "text_id": "name",
                "param_id": "",
                "param_value": "",
                "sort_id": "",
                "sort_value": ""
            }
        }
        ,{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: JENIS_NILAI_PARAM, payload: data.data});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            dispatch({type: FETCH_ERROR, payload: error.message});
            console.log("Error****:", error.message);
        });
    }
};