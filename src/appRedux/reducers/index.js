import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import Settings from "./Settings";
import Auth from "./Auth";
import Common from "./Common";
import Parameterfaktor from "./Parameterfaktor";
import Jenisrisiko from "./Jenisrisiko";


const reducers = combineReducers({
  routing: routerReducer,
  settings: Settings,
  auth: Auth,
  commonData: Common,
  parameterfaktor: Parameterfaktor,
  jenisrisiko: Jenisrisiko,
});

export default reducers;
