import {FETCH_ERROR,
    FETCH_START,
    COUNT_PARAMETER_MANUAL,
    GET_ALL_PARAMETER_MANUAL,
    POST_PARAMETER_MANUAL,
    STATUS_ALL_PARAMETER_MANUAL,
    STATUS_POST_PARAMETER_MANUAL,
    STATUS_ALL_PARAMETER_MANUAL_TABLE
} from "../../constants/ActionTypes";
import axios from 'util/Api'

export const getAllParameterManualTable = ({page, token, name}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        //console.log('berhasil horee --> page :',page,' token :',token);
        var /*parameters = '';*/
        /*if (risk_id > 0){
            parameters = 'page='+page+'&risk_id='+risk_id+'&name='+name+'&bobot='+bobot+'&risk_nama='+risk_nama;
        } else {*/
            parameters = 'page='+page+'&name='+name;
        /*}*/
        axios.get('api/ingredients?'+parameters,{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: GET_ALL_PARAMETER_MANUAL, payload: data.data.rows});
                dispatch({type: STATUS_ALL_PARAMETER_MANUAL_TABLE, payload: data.statusCode});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            dispatch({type: FETCH_ERROR, payload: error.message});
            console.log("Error****:", error.message);
        });
    }
};

export const countAllParameterManual = ({token, name}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        //console.log('berhasil horee --> page :',page,' token :',token);
        var /*parameters = '';*/
            /*if (risk_id > 0){
                parameters = 'page='+page+'&risk_id='+risk_id+'&name='+name+'&bobot='+bobot+'&risk_nama='+risk_nama;
            } else {*/
            parameters = 'name='+name;
        /*}*/
        axios.get('api/ingredients?'+parameters,{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: COUNT_PARAMETER_MANUAL, payload: data.data.rows.length});
                dispatch({type: STATUS_ALL_PARAMETER_MANUAL, payload: data.statusCode});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            dispatch({type: FETCH_ERROR, payload: error.message});
            console.log("Error****:", error.message);
        });
    }
};

export const postParameterManual = ({risk_id, penomoran, name, level, bobot, induk_id,
                                        pr_low, pr_lowtomod, pr_mod, pr_modtohigh, pr_high, token}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.post('api/parameter-faktor',{
            risk_id: risk_id,
            name: name,
            level: level,
            induk_id: induk_id,
            keys: null,
            penomoran: penomoran,
            pr_low: pr_low,
            pr_lowtomod: pr_lowtomod,
            pr_mod: pr_mod,
            pr_modtohigh: pr_modtohigh,
            pr_high: pr_high,
            urutan_sub: null,
            bobot: bobot,
            desc_pr_low: null,
            desc_pr_lowtomod: null,
            desc_pr_mod: null,
            desc_pr_modtohigh: null,
            desc_pr_high: null,
            ratio_manual: null,
            id_indikator_pembilang: 139,
            id_indikator_penyebut: 139,
            version: null,
            stock: null,
            bulan: 0,
            tahun: 0,
            jenis: "PR"
        },{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: POST_PARAMETER_MANUAL, payload: data.data});
                dispatch({type: STATUS_POST_PARAMETER_MANUAL, payload: data.statusCode});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            if (error.response) {
                if (error.response.data.data){
                    dispatch({type: POST_PARAMETER_MANUAL, payload: error.response.data.data});
                } else {
                    dispatch({type: FETCH_ERROR, payload: error.response.data.message});
                    console.log("Error****:", error.response.data.message);
                }
            }
        });
    }
};

export const resetPostParameterManual = () => {
    return (dispatch) => {
        dispatch({type: STATUS_POST_PARAMETER_MANUAL, payload: 'STATUS_POST_PARAMETER_MANUAL'});
    }
}