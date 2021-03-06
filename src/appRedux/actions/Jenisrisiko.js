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
    GET_RISK,
    STATUS_ALL_RISK,
    COUNT_ALL_RISKS
} from "../../constants/ActionTypes";
import axios from 'util/Api'

export const getAllRisks = ({token, page, jenis, nama, keterangan}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        let url = `api/risks?page=${page}&jenis=${jenis}&nama=${nama}&keterangan=${keterangan}`
        axios.get(url, {
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: GET_ALL_RISKS, payload: data.data});
                dispatch({type: STATUS_ALL_RISKS, payload: data.statusCode});
            } else {
                // dispatch({type: FETCH_ERROR, payload: data.error});
                dispatch({type: GET_ALL_RISKS, payload: []});
                dispatch({type: STATUS_ALL_RISKS, payload: data.statusCode});
            }
        }).catch(function (error) {
            dispatch({type: FETCH_ERROR, payload: error.message});
            console.log("Error****:", error.message);
        });
    }
};

export const getAllRisksForTable = ({token, page, searchData}) => {

  if(typeof searchData === 'undefined'){
    return (dispatch) => {
      dispatch({type: FETCH_START});

      axios.get(`api/risks?page=${page}`, {
        headers: {
            Authorization: "Bearer "+token
        }
      }).then(({data}) => {
          if (data.data){
              dispatch({type: GET_ALL_RISKS, payload: data.data});
              dispatch({type: STATUS_ALL_RISKS, payload: data.statusCode});
          } else {
              // dispatch({type: FETCH_ERROR, payload: data.error});
              dispatch({type: GET_ALL_RISKS, payload: []});
              dispatch({type: STATUS_ALL_RISKS, payload: data.statusCode});
          }
      }).catch(function (error) {
          dispatch({type: FETCH_ERROR, payload: error.message});
          console.log("Error****:", error.message);
      });
    }
  } else {
    return (dispatch) => {
      dispatch({type: FETCH_START});

      var searchParameters = '';

      let paramColumn = [
        "jenis",
        "nama",
        "keterangan"
      ];

      let searchCounter = 0;

      let paramValue = [
        searchData.jenis,
        searchData.nama,
        searchData.keterangan
      ];

      console.log("Param Value : ");
      console.log(paramValue);
      console.log(searchData);

      // looping all column
      for(let i=0;i<paramColumn.length;i++){
        // process only for not undefined
        console.log("Param Column ke-"+i);
        console.log(" Tipe : "+typeof paramColumn[i]+", Value : "+paramColumn[i]);
        // process only for not undefined
        console.log("Param Value ke-"+i);
        console.log(" Tipe : "+typeof paramValue[i]+", Value : "+paramValue[i]);
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

      // get total refer to the filter
      axios.get(`api/risks?page=${page}`+searchParameters, {
        headers: {
            Authorization: "Bearer "+token
        }
      }).then(({data}) => {
          if (data.data){
              dispatch({type: GET_ALL_RISKS, payload: data.data});
              dispatch({type: STATUS_ALL_RISKS, payload: data.statusCode});
          } else {
              // dispatch({type: FETCH_ERROR, payload: data.error});
              dispatch({type: GET_ALL_RISKS, payload: []});
              dispatch({type: STATUS_ALL_RISKS, payload: data.statusCode});
          }
      }).catch(function (error) {
          dispatch({type: FETCH_ERROR, payload: error.message});
          console.log("Error****:", error.message);
      });

    }
  }
    // return (dispatch) => {
    //     dispatch({type: FETCH_START});
    //     let url = `api/risks?page=${page}&jenis=${jenis}&nama=${nama}&keterangan=${keterangan}`
    //     axios.get(url, {
    //         headers: {
    //             Authorization: "Bearer "+token
    //         }
    //     }).then(({data}) => {
    //         if (data.data){
    //             dispatch({type: GET_ALL_RISKS, payload: data.data});
    //             dispatch({type: STATUS_ALL_RISKS, payload: data.statusCode});
    //         } else {
    //             // dispatch({type: FETCH_ERROR, payload: data.error});
    //             dispatch({type: GET_ALL_RISKS, payload: []});
    //             dispatch({type: STATUS_ALL_RISKS, payload: data.statusCode});
    //         }
    //     }).catch(function (error) {
    //         dispatch({type: FETCH_ERROR, payload: error.message});
    //         console.log("Error****:", error.message);
    //     });
    // }
};

export const getCountRisks = ({token, jenis, nama, keterangan}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.get('api/risks?jenis='+jenis+'&nama='+nama+'&keterangan='+keterangan,{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: COUNT_ALL_RISKS, payload: data.data.length});
                dispatch({type: STATUS_ALL_RISK, payload: data.statusCode});
            } else {
                // dispatch({type: FETCH_ERROR, payload: data.error});
                dispatch({type: COUNT_ALL_RISKS, payload: 0});
                dispatch({type: STATUS_ALL_RISK, payload: data.statusCode});
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

export const addRisk = ({nama, keterangan, jenis, token}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.post('api/risks/profil-risiko',{
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
