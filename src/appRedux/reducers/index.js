import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import Settings from "./Settings";
import Auth from "./Auth";
import Common from "./Common";
import Parameterfaktor from "./Parameterfaktor";
import Jenisrisiko from "./Jenisrisiko";
import Peringkatrisiko from "./Peringkatrisiko";
import Masterparameter from "./Masterparameter";
import Jenispenilaian from "./Jenispenilaian";
import Ratioindikator from "./RatioIndikator";
import Parametermanual from "./Parametermanual";


const reducers = combineReducers({
  routing: routerReducer,
  settings: Settings,
  auth: Auth,
  commonData: Common,
  parameterfaktor: Parameterfaktor,
  jenisrisiko: Jenisrisiko,
  peringkatrisiko: Peringkatrisiko,
  masterparameter: Masterparameter,
  jenispenilaian: Jenispenilaian,
  ratioindikator: Ratioindikator,
  parametermanual: Parametermanual
});

export default reducers;
