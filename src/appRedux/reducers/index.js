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
import Parameterkuantitatif from "./Parameterkuantitatif";
import Parameterkualitatif from "./Parameterkualitatif";
import Ingredients from "./Ingredients";
import RisikoInherenRatioIndikator from "./RisikoInherenRatioIndikator";
import Masterversion from "./Masterversion";
import Parameterversion from "./Parameterversion";
import Ratioindikatorformula from "./Ratioindikatorformula";

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
  parametermanual: Parametermanual,
  parameterkuantitatif: Parameterkuantitatif,
  parameterkualitatif: Parameterkualitatif,
  ingredients: Ingredients,
  risikoinherenratioindikator: RisikoInherenRatioIndikator,
  masterversion: Masterversion,
  parameterversion: Parameterversion,
  ratioindikatorformula: Ratioindikatorformula
});

export default reducers;
