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
import Parameterkualitatifdualalternatif from './Parameterkualitatifdualalternatif';
import Kpmrparameterkualitatif from './Kpmrparameterkualitatif';
import Risikoinhereninputkuantitatif from './Risikoinhereninputkuantitatif';
import Risikoinhereninputkualitatif from './Risikoinhereninputkualitatif';
import Risikoinhereninputkualitatifdual from './Risikoinhereninputkualitatifdual';
import Risikoinherenreport from './Risikoinherenreport';
import ExportExcel from './Excel';
import Lockedreport from './Lockedreport';

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
  ratioindikatorformula: Ratioindikatorformula,
  parameterkualitatifdualalternatif: Parameterkualitatifdualalternatif,
  kpmrparameterkualitatif: Kpmrparameterkualitatif,
  risikoinhereninputkuantitatif : Risikoinhereninputkuantitatif,
  risikoinhereninputkualitatif : Risikoinhereninputkualitatif,
  risikoinhereninputkualitatifdual : Risikoinhereninputkualitatifdual,
  risikoinherenreport: Risikoinherenreport,
  exportexcel: ExportExcel,
  lockedreport: Lockedreport,
});

export default reducers;
