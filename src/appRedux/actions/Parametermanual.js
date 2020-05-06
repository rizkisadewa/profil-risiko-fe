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

export const getAllParameterManualTable = ({page, token, name, bulan, tahun, risk_id,
                                               pr_low, pr_lowtomod, pr_mod, pr_modtohigh, pr_high}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        var parameters = '';
        if (risk_id > 0 && bulan > 0 && tahun > 0){
            parameters = 'page='+page+'&risk_id='+risk_id+'&name='+name+'&bulan='+bulan+'&tahun='+tahun+
                '&pr_low='+pr_low+'&pr_lowtomod='+pr_lowtomod+'&pr_mod='+pr_mod+'&pr_modtohigh='+pr_modtohigh+'&pr_high='+pr_high;
        } else if (risk_id > 0 && bulan > 0){
            parameters = 'page='+page+'&risk_id='+risk_id+'&name='+name+'&bulan='+bulan+
                '&pr_low='+pr_low+'&pr_lowtomod='+pr_lowtomod+'&pr_mod='+pr_mod+'&pr_modtohigh='+pr_modtohigh+'&pr_high='+pr_high;
        } else if (risk_id > 0 && tahun > 0){
            parameters = 'page='+page+'&risk_id='+risk_id+'&name='+name+'&tahun='+tahun+
                '&pr_low='+pr_low+'&pr_lowtomod='+pr_lowtomod+'&pr_mod='+pr_mod+'&pr_modtohigh='+pr_modtohigh+'&pr_high='+pr_high;
        } else if (bulan > 0 && tahun > 0){
            parameters = 'page='+page+'&name='+name+'&bulan='+bulan+'&tahun='+tahun+
                '&pr_low='+pr_low+'&pr_lowtomod='+pr_lowtomod+'&pr_mod='+pr_mod+'&pr_modtohigh='+pr_modtohigh+'&pr_high='+pr_high;
        } else if (risk_id > 0){
            parameters = 'page='+page+'&risk_id='+risk_id+'&name='+name+
                '&pr_low='+pr_low+'&pr_lowtomod='+pr_lowtomod+'&pr_mod='+pr_mod+'&pr_modtohigh='+pr_modtohigh+'&pr_high='+pr_high;
        } else if (bulan > 0){
            parameters = 'page='+page+'&name='+name+'&bulan='+bulan+
                '&pr_low='+pr_low+'&pr_lowtomod='+pr_lowtomod+'&pr_mod='+pr_mod+'&pr_modtohigh='+pr_modtohigh+'&pr_high='+pr_high;
        } else if (tahun > 0){
            parameters = 'page='+page+'&name='+name+'&tahun='+tahun+
                '&pr_low='+pr_low+'&pr_lowtomod='+pr_lowtomod+'&pr_mod='+pr_mod+'&pr_modtohigh='+pr_modtohigh+'&pr_high='+pr_high;
        } else {
            parameters = 'page='+page+'&name='+name+
                '&pr_low='+pr_low+'&pr_lowtomod='+pr_lowtomod+'&pr_mod='+pr_mod+'&pr_modtohigh='+pr_modtohigh+'&pr_high='+pr_high;
        }
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

export const countAllParameterManual = ({token, name,  bulan, tahun, risk_id,
                                            pr_low, pr_lowtomod, pr_mod, pr_modtohigh, pr_high}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        var parameters = '';
        if (risk_id > 0 && bulan > 0 && tahun > 0){
            parameters = 'risk_id='+risk_id+'&name='+name+'&bulan='+bulan+'&tahun='+tahun+
                '&pr_low='+pr_low+'&pr_lowtomod='+pr_lowtomod+'&pr_mod='+pr_mod+'&pr_modtohigh='+pr_modtohigh+'&pr_high='+pr_high;
        } else if (risk_id > 0 && bulan > 0){
            parameters = 'risk_id='+risk_id+'&name='+name+'&bulan='+bulan+
                '&pr_low='+pr_low+'&pr_lowtomod='+pr_lowtomod+'&pr_mod='+pr_mod+'&pr_modtohigh='+pr_modtohigh+'&pr_high='+pr_high;
        } else if (risk_id > 0 && tahun > 0){
            parameters = 'risk_id='+risk_id+'&name='+name+'&tahun='+tahun+
                '&pr_low='+pr_low+'&pr_lowtomod='+pr_lowtomod+'&pr_mod='+pr_mod+'&pr_modtohigh='+pr_modtohigh+'&pr_high='+pr_high;
        } else if (bulan > 0 && tahun > 0){
            parameters = 'name='+name+'&bulan='+bulan+'&tahun='+tahun+
                '&pr_low='+pr_low+'&pr_lowtomod='+pr_lowtomod+'&pr_mod='+pr_mod+'&pr_modtohigh='+pr_modtohigh+'&pr_high='+pr_high;
        } else if (risk_id > 0){
            parameters = 'risk_id='+risk_id+'&name='+name+
                '&pr_low='+pr_low+'&pr_lowtomod='+pr_lowtomod+'&pr_mod='+pr_mod+'&pr_modtohigh='+pr_modtohigh+'&pr_high='+pr_high;
        } else if (bulan > 0){
            parameters = 'name='+name+'&bulan='+bulan+
                '&pr_low='+pr_low+'&pr_lowtomod='+pr_lowtomod+'&pr_mod='+pr_mod+'&pr_modtohigh='+pr_modtohigh+'&pr_high='+pr_high;
        } else if (tahun > 0){
            parameters = 'name='+name+'&tahun='+tahun+
                '&pr_low='+pr_low+'&pr_lowtomod='+pr_lowtomod+'&pr_mod='+pr_mod+'&pr_modtohigh='+pr_modtohigh+'&pr_high='+pr_high;
        } else {
            parameters = 'name='+name+
                '&pr_low='+pr_low+'&pr_lowtomod='+pr_lowtomod+'&pr_mod='+pr_mod+'&pr_modtohigh='+pr_modtohigh+'&pr_high='+pr_high;
        }
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
            version: null,
            stock: null,
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