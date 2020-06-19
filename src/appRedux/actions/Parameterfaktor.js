import {FETCH_ERROR,
    FETCH_START,
    GET_ALL_PARAMETER_FAKTOR_TABLE,
    GET_ALL_PARAMETER_FAKTOR,
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
import axios from 'util/Api';
import {
  addParameterversion,
  resetAddParameterversion,
  deleteParameterversion,
  resetDeleteParameterversion
} from "./Parameterversion";

export const getAllFaktorParameterTable = ({page, token, searchData}) => {
  if(typeof searchData === 'undefined'){
    return (dispatch) => {
      axios.get(`api/parameter-faktor-table?page=${page}`, {
        headers: {
            Authorization: "Bearer "+token
        }
      }).then(response => {
        // check if there are some of data
        const parameterFaktor = response.data;
        dispatch({type: GET_ALL_PARAMETER_FAKTOR_TABLE, payload: parameterFaktor.data});
        dispatch({type: STATUS_ALL_PARAMETER_FAKTOR_TABLE, payload: parameterFaktor.statusCode});
      }).catch(error => {
        dispatch({type: FETCH_ERROR, payload: error.message});
        console.log("Error****:", error.message);
      });

    }
  } else {
    return (dispatch) => {

        var parameters = '';
        var searchParameters = '';

        let paramColumn = [
          "risk_id",
          "penomoran",
          "name",
          "level",
          "bobot",
          "created_by",
          "risk_nama",
          "jenis"
        ];

        let searchCounter = 0;

        let paramValue = [
          searchData.risk_id,
          searchData.penomoran,
          searchData.name,
          searchData.level,
          searchData.bobot,
          searchData.created_by,
          searchData.risk_nama,
          searchData.jenis
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
              parameters += `&${paramColumn[i]}=${paramValue[i]}`;

              if(searchCounter > 1) {
                searchParameters += '&';
              }
              searchParameters += `${paramColumn[i]}=${paramValue[i]}`;

            }
          }
        }

        // get total refer to the filter
        axios.get(`api/parameter-faktor-table?page=${page}&`+searchParameters, {
          headers: {
            Authorization: "Bearer "+token
          }
        }).then(response => {
          const parameterFaktor = response.data;
          dispatch({type: GET_ALL_PARAMETER_FAKTOR_TABLE, payload: parameterFaktor.data});
          dispatch({type: STATUS_ALL_PARAMETER_FAKTOR_TABLE, payload: parameterFaktor.statusCode});
        }).catch(error => {
          dispatch({type: FETCH_ERROR, payload: error.message});
          console.log("Error****:", error.message);
        })
    }
  }

};

export const getAllFaktorParameterDataOption = ({token, risk_id}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        let url = '';

        if(typeof risk_id !== 'undefined'){
          url = `api/parameter-faktor-table?risk_id=${risk_id}&jenis=PR`
        } else {
          url = `api/parameter-faktor-table?jenis=PR`
        }

        axios.get(url,{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: GET_ALL_PARAMETER_FAKTOR, payload: data.data});
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

export const getAllFaktorParameter = ({token, risk_id, name, bobot, risk_nama}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        //console.log('berhasil horee --> page :',page,' token :',token);
        var parameters = '';
        if (risk_id > 0){
            parameters = 'risk_id='+risk_id+'&name='+name+'&bobot='+bobot+'&risk_nama='+risk_nama;
        } else {
            parameters = 'name='+name+'&bobot='+bobot+'&risk_nama='+risk_nama;
        }
        axios.get('api/parameter-faktor-table?'+parameters,{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(({data}) => {
            if (data.data){
                dispatch({type: GET_ALL_PARAMETER_FAKTOR, payload: data.data});
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

export const countAllFaktorParameter = ({token, searchData}) => {
  if(typeof searchData === 'undefined'){
    return (dispatch) => {
      dispatch({type: FETCH_START});
      axios.get(`api/parameter-faktor-table?`, {
        headers: {
            Authorization: "Bearer "+token
        }
      }).then(response => {
        // check if there are some of data
        const parameterFaktor = response.data;
        if(response.data.message !== "Data Parameter Version kosong"){
          dispatch({type: COUNT_ALL_PARAMETER_FAKTOR, payload: parameterFaktor.data.length});
          dispatch({type: STATUS_ALL_PARAMETER_FAKTOR, payload: parameterFaktor.statusCode});
        } else {
          dispatch({type: COUNT_ALL_PARAMETER_FAKTOR, payload: 1});
          dispatch({type: STATUS_ALL_PARAMETER_FAKTOR, payload: parameterFaktor.statusCode});
        }

      }).catch(error => {
        dispatch({type: FETCH_ERROR, payload: error.message});
        console.log("Error****:", error.message);
      });

    }
  } else {
    return (dispatch) => {
        dispatch({type: FETCH_START});

        var parameters = '';
        var searchParameters = '';

        let paramColumn = [
          "risk_id",
          "name",
          "bobot",
          "risk_nama",
          "jenis"
        ];

        let searchCounter = 0;

        let paramValue = [
          searchData.risk_id,
          searchData.name,
          searchData.bobot,
          searchData.risk_nama,
          searchData.jenis
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
              parameters += `&${paramColumn[i]}=${paramValue[i]}`;

              if(searchCounter > 1) {
                searchParameters += '&';
              }
              searchParameters += `${paramColumn[i]}=${paramValue[i]}`;

            }
          }
        }

        // get total refer to the filter
        axios.get(`api/parameter-faktor-table?`+searchParameters, {
          headers: {
            Authorization: "Bearer "+token
          }
        }).then(response => {
          const parameterFaktor = response.data;
          if(response.data.message !== "Data Parameter Version kosong"){
            dispatch({type: COUNT_ALL_PARAMETER_FAKTOR, payload: parameterFaktor.data.length});
            dispatch({type: STATUS_ALL_PARAMETER_FAKTOR, payload: parameterFaktor.statusCode});
          } else {
            dispatch({type: COUNT_ALL_PARAMETER_FAKTOR, payload: 1});
            dispatch({type: STATUS_ALL_PARAMETER_FAKTOR, payload: parameterFaktor.statusCode});
          }

        }).catch(error => {
          dispatch({type: FETCH_ERROR, payload: error.message});
          console.log("Error****:", error.message);
        })
    }
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

export const updateFaktorParameter = ({id, risk_id, penomoran, name, level, bobot, token, master_version_list, history_parameter_version}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});

        console.log("***DATA FROM FE");
        console.log(master_version_list);
        console.log(history_parameter_version);

        // deleting all history
        if(history_parameter_version.length > 0){
          // checking if any history parameter version
          for(let i=0;i<history_parameter_version.length;i++){
            dispatch(deleteParameterversion(token, history_parameter_version[i].id));
          }
        }

        // adding new parameter version
        if(master_version_list.length > 0){
          // checking if any master list to be added
          for(let j=0;j<master_version_list.length;j++){
            dispatch(addParameterversion(token, {
              ingredients_id: id,
              version_id: master_version_list[j]
            }));
            dispatch(resetAddParameterversion());
          }
        }

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

export const resetPutFaktorParameter = () => {
    return (dispatch) => {
        dispatch({type: STATUS_PUT_PARAMETER_FAKTOR, payload: 'STATUS_PUT_PARAMETER_FAKTOR'});
    }
}

// add parameter faktof for risiko inheren
export const postFaktorParameter = ({risk_id, penomoran, name, level, bobot, token, master_version_list}) => {
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

                // looping to insert parameter version
                for(let i=0;i<master_version_list.length;i++){
                  dispatch(addParameterversion(token, {
                    ingredients_id: data.data.id,
                    version_id: master_version_list[i]
                  }));
                  dispatch(resetAddParameterversion());
                }
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

// add parameter version for KPMR
export const postFaktorParameterForKPMR = ({risk_id, penomoran, name, level, bobot, token, master_version_list}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.post('api/parameter-kpmr-faktor',{
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

                // looping to insert parameter version
                for(let i=0;i<master_version_list.length;i++){
                  dispatch(addParameterversion(token, {
                    ingredients_id: data.data.id,  
                    version_id: master_version_list[i]
                  }));
                  dispatch(resetAddParameterversion());
                }
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

export const resetPostFaktorParameterForKPMR = () => {
    return (dispatch) => {
        dispatch({type: STATUS_POST_PARAMETER_FAKTOR, payload: 'STATUS_POST_PARAMETER_FAKTOR'});
    }
}

// delete parameter faktor
export const deleteFaktorParameter = ({id,token}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        // searching parameter faktor

        axios.get('/api/parameter-version?ingredients_id='+id, {
          headers: {
            Authorization: "Bearer "+token,
          }
        }).then((response) => {
          // looping all parameter version list id to be deleted
          if(response.data.message !== "Data Parameter Version kosong"){
            console.log(response.data);
            const parameterVersionList = response.data.data.rows;

            for(let i=0;i< parameterVersionList.length;i++){
              dispatch(deleteParameterversion(token, parameterVersionList[i].id));
              dispatch(resetDeleteParameterversion());
            }
          }

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

        });





    }
};
