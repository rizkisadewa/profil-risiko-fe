import {FETCH_ERROR,
    FETCH_START,
    JENIS_NILAI_PARAM,
} from "../../constants/ActionTypes";
import axios from 'util/Api'

export const jenisNilaiParam = ({token}) => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.get('api/all-master',{
                table_id: "mst_jenis_nilai",
                value_id: "id",
                text_id: "name",
                param_id: "",
                param_value: "",
                sort_id: "",
                sort_value: ""
            }
            ,{
                headers: {
                    Authorization: "Bearer "+token
                }
            }).then(({data}) => {
            if (data.data){
                dispatch({type: JENIS_NILAI_PARAM, payload: data.data.box.jenis_nilai});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            dispatch({type: FETCH_ERROR, payload: error.message});
            console.log("Error****:", error.message);
        });
    }
};