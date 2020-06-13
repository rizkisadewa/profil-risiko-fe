import {FETCH_ERROR,
    FETCH_START,
    GET_ALL_PARAMETER_MANUAL,
    GET_PARAMETER_MANUAL,
    PUT_PARAMETER_MANUAL,
    POST_PARAMETER_MANUAL,
    STATUS_POST_PARAMETER_MANUAL,
    STATUS_PUT_PARAMETER_MANUAL,
    COUNT_PARAMETER_MANUAL,
    STATUS_ALL_PARAMETER_MANUAL,
    STATUS_ALL_PARAMETER_MANUAL_TABLE,
    DELETE_PARAMETER_MANUAL
} from "../../constants/ActionTypes";
import axios from 'util/Api'

export const getAllParameterManualTable = ({page, token, name, bulan, tahun, risk_id,
                                               pr_low, pr_lowtomod, pr_mod, pr_modtohigh, pr_high, bobot}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});

        var searchParameters = '';

        let paramColumn = [
          "page", "name", "bulan", "tahun", "risk_id",
          "pr_low", "pr_lowtomod", "pr_mod", "pr_modtohigh", "pr_high", "bobot"
        ];

        let searchCounter = 0;

        let paramValue = [
          page, name, bulan, tahun, risk_id,
          pr_low, pr_lowtomod, pr_mod, pr_modtohigh, pr_high, bobot
        ];

        // if empty string, then assume undefined
        if(
          pr_low === '' ||
          pr_lowtomod === '' ||
          pr_mod === '' ||
          pr_modtohigh === '' ||
          pr_high === ''
        ){
          paramColumn = [
            "page", "name", "bulan", "tahun", "risk_id", "bobot"
          ];
          paramValue = [
            page, name, bulan, tahun, risk_id, bobot
          ];
        }

        // looping all column
        for(let i=0;i<paramColumn.length;i++){

          // checking if undefined or null
          if(typeof paramValue[i] !== 'undefined'){
            // conditon for number greater than 0
            if(paramValue[i] !== ""){
              searchCounter += 1;

              if(searchCounter > 1) {
                searchParameters += '&';
              }
              searchParameters += `${paramColumn[i]}=${paramValue[i]}`;

            }
          }
        }

        axios.get('api/parameter-manual?'+searchParameters,{
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
                                            pr_low, pr_lowtomod, pr_mod, pr_modtohigh, pr_high, bobot}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});

        var searchParameters = '';

        let paramColumn = [
          "name", "bulan", "tahun", "risk_id",
          "pr_low", "pr_lowtomod", "pr_mod", "pr_modtohigh", "pr_high", "bobot"
        ];

        let searchCounter = 0;

        let paramValue = [
          name, bulan, tahun, risk_id,
          pr_low, pr_lowtomod, pr_mod, pr_modtohigh, pr_high, bobot
        ];

        // if empty string, then assume undefined
        if(
          pr_low === '' ||
          pr_lowtomod === '' ||
          pr_mod === '' ||
          pr_modtohigh === '' ||
          pr_high === ''
        ){
          paramColumn = [
            "name", "bulan", "tahun", "risk_id", "bobot"
          ];
          paramValue = [
            name, bulan, tahun, risk_id, bobot
          ];
        }

        // looping all column
        for(let i=0;i<paramColumn.length;i++){

          // checking if undefined or null
          if(typeof paramValue[i] !== 'undefined'){
            // conditon for number greater than 0
            if(paramValue[i] !== ""){
              searchCounter += 1;

              if(searchCounter > 1) {
                searchParameters += '&';
              }
              searchParameters += `${paramColumn[i]}=${paramValue[i]}`;

            }
          }
        }

        axios.get('api/parameter-manual?'+searchParameters,{
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
        axios.post('api/parameter-manual',{
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

export const getParameterManual = ({name, induk_id, tahun, token}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});

    axios.get(`api/parameter-manual?name=${name}&induk_id=${induk_id}&tahun=${tahun}`, {
      headers: {
          Authorization: "Bearer "+token
      }
    }).then((res) => {
      if(res.data){
        dispatch({type: GET_PARAMETER_MANUAL, payload: res.data});
      } else {
        dispatch({type: FETCH_ERROR, payload: res.error});
      }
    }).catch(function (error) {
      if(error.response) {
        if(error.response.data.data){
          dispatch({type: GET_PARAMETER_MANUAL, payload: error.response.data.data});
        } else {
          dispatch({type: FETCH_ERROR, payload: error.response.data.message});
          console.log("Error****: "+error.response.data.message);
        }
      }
    });
  }
};

export const updateParameterManual = (updated, altered) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    let parameters = '';
    parameters = `name=${updated.name}&induk_id=${updated.induk_id}&tahun=${updated.tahun}`;

    axios.put('api/parameter-manual?'+parameters, altered, {
      headers: {
        Authorization: `Bearer ${updated.token}`
      }
    }).then(({data}) => {
      if(data.data){
        dispatch({
          type: PUT_PARAMETER_MANUAL, payload: data.data
        });
        dispatch({type: STATUS_PUT_PARAMETER_MANUAL, payload: data.statusCode});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error){
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****: "+error.message);
    })
  }
};

export const resetPutParameterManual = () => {
  return (dispatch) => {
    dispatch({type: STATUS_PUT_PARAMETER_MANUAL, payload: 'STATUS_PUT_PARAMETER_MANUAL'});
  }
}

export const deleteParameterManual = ({name, induk_id, tahun, token}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.delete(`api/parameter-manual?name=${name}&induk_id=${induk_id}&tahun=${tahun}`, {
      headers: {
        Authorization: "Bearer "+token
      }
    }).then(({data}) => {
      if (data.statusCode === 200) {
        dispatch({type: DELETE_PARAMETER_MANUAL, payload: data.statusCode});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error){
      if(error.response){
        if(error.response.data.data){
          dispatch({type: DELETE_PARAMETER_MANUAL, payload: error.response.data.data});
        } else {
          dispatch({type: FETCH_ERROR, payload: error.response.data.message});
        }
      }
    });
  }
};
