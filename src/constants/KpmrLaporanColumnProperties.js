import React from "react";
import {Tag} from "antd";


// TINGKAT RISIKO INHEREN
export const renderTingkatRisikoInherenColumn = (value, row, index, totalColSpan) => {
  const obj = {
    children: value,
    props: {},
    className: 'no-class-edit'
  };

  // Tingkat Risiko Inheren
  if (row.level === "inheren") {
    obj.props.colSpan = totalColSpan;
    obj.props.className = "tingkat-risiko-inheren";
  }

  return obj;
}

// render column name
export const renderNameColumn = (value, row, index) => {
  const obj = {
    children: row.penomoran+". "+value,
    props: {},
    className: 'no-class-edit'
  };

  if(typeof row.pr_low === "undefined"){
    if(row.level === 1){
      obj.props.colSpan = 11;
      obj.props.className = 'parameter-faktor';
    } else if (row.level >= 2){
      obj.props.colSpan = 6;
      obj.props.className = 'level2-row';
    } else if (row.level === "Per Faktor"){
      obj.props.colSpan = 6;
      obj.children = value;
    }

  } else {
    obj.props.className = 'editable-row';
  }

  return obj;
}

// render parameter faktor : valid only for bobot, risk
export const renderParameterFaktorColumn = (value, row, index) => {
  const obj = {
    children: value,
    props: {}
  };

  if(typeof row.pr_low === "undefined"){
    if(row.level >= 1 && typeof row.level !== "string"){
      obj.props.colSpan = 0;
    }
  }

  return obj;
}

// render parameter faktor : valid only for bobot, risk
export const renderRisikoPerFaktorBobot = (value, row, index) => {
  const obj = {
    children: value,
    props: {}
  };

  obj.props.colSpan = 1;

  return obj;
}

// render parameter faktor : valid only for risk rate
export const renderRiskRateColumn = (value, row, index) => {
  const obj = {
    children: (
      <>
        {
          <Tag
            color={value === 'Unsatisfactory' ? 'red' :
                   value === "Marginal" ? 'orange' :
                   value === "Fair" ? "yellow" :
                   value === "Satisfactory" ? 'green' :
                   value === "Strong" ? "blue" : "black" }
            key={value}
          > {value} </Tag>
        }
      </>
    ),
    props: {}
  };

  if(typeof row.pr_low === "undefined"){
    obj.props.colSpan = 0;
  }

  return obj;
}

// render other column
export const renderParameterRight = (value, row, index) => {
  const obj = {
    children: value,
    props: {}
  };

  if(typeof row.pr_low === "undefined"){
    obj.props.colSpan = 0;
  }

  return obj;
}

// render bobot
export const renderParameterBobot = (value, row, index) => {
  const obj = {
    children: value,
    props: {}
  };

  if(typeof row.pr_low === "undefined"){
    if(typeof row.bobot !== "undefined"){
      obj.props.colSpan = 5;
    } else {
      obj.props.colSpan = 0;
    }
  }

  return obj;
}

// render other ratio
export const renderParameterRatio = (value, row, index) => {
  const obj = {
    children: value,
    props: {}
  };

  if(typeof row.pr_low === "undefined"){
    if(row.level === "Per Faktor"){
      obj.props.colSpan = 3;
    } else {
      obj.props.colSpan = 0;
    }
  }

  return obj;
}

// RENDER ID JENIS NILAI PARAMETER KUALITATIF DUAL
// Level 1
export const renderParameterKualitatifDual = (value, row, index, totalColSpan) => {
  const obj = {
    children: value,
    props: {}
  };

  if(row.level === 1){
    obj.props.colSpan = 0;
  } else if(typeof value === "undefined"){
    obj.props.colSpan = totalColSpan;
  } else {
    obj.props.colSpan = totalColSpan;
  }

  return obj;
}

// render column name
export const renderNameParameterKualitatifDual = (value, row, index) => {
  const obj = {
    children: row.penomoran+". "+value,
    props: {},
    className: 'no-class-edit'
  };

  // sorting refer to the level
  switch (row.level) {
    case 1:
      obj.props.colSpan = 11;
      obj.props.className = 'parameter-faktor';
      break;
    case 2:
      if(row.pr_low_name !== "Header Kualitatif - KPMR"){
        obj.props.colSpan = 1;
        obj.props.className = 'level2-row';
      } else {
        obj.props.colSpan = 6;
        obj.props.className = 'level2-row';
      }
      break;
    case 3:
      obj.props.colSpan = 6;
      obj.props.className = 'level2-row';
      break;
    case "Per Faktor":
      obj.props.colSpan = 6;
      obj.children = value;
      break;
    default:
      break;
  }

  return obj;
}

// render for risk ratio and bobot score
export const renderCombineColumnParameterKualitatifDual = (value, row, index, risk_rate=false) => {
  const obj = {
    children: value,
    props: {},
    className: 'no-class-edit'
  };

  // sorting refer to the level
  switch (row.level) {
    case 1:
      obj.props.colSpan = 0;
      break;
    case 2:
      obj.props.colSpan = 1;
      obj.props.className = 'level2-row';
      break;
    default:
      break;
  }

  return obj;
}

// render for risk rate
export const renderRiskRateParameterKualitatifDual = (value, row, index, risk_rate=false) => {
  const obj = {
    children: (
      <>
        {
          <Tag
            color={value === 'Unsatisfactory' ? 'red' :
                   value === "Marginal" ? 'orange' :
                   value === "Fair" ? "yellow" :
                   value === "Satisfactory" ? 'green' :
                   value === "Strong" ? "blue" : "black" }
            key={value}
          > {value} </Tag>
        }
      </>
    ),
    props: {},
    className: 'no-class-edit'
  };

  // sorting refer to the level
  switch (row.level) {
    case 1:
      obj.props.colSpan = 0;
      break;
    case 2:
      obj.props.colSpan = 1;
      obj.props.className = 'level2-row';
      break;
    default:
      break;
  }

  return obj;
}


// RENDER ID JENIS NILAI PARAMETER KUALITATIF MULTI
// render column name
export const renderNameParameterKualitatifMulti = (value, row, index) => {
  const obj = {
    children: row.penomoran+". "+value,
    props: {},
    className: 'no-class-edit'
  };

  // sorting refer to the level
  switch (row.level) {
    case 1:
      // if(row.id_jenis_nilai !== 0){
      //   obj.props.colSpan = 1;
      // } else {
      //   obj.props.colSpan = 11;
      //   obj.props.className = 'parameter-faktor';
      // }
      // obj.props.colSpan = 1;

      obj.props.colSpan = 11;
      obj.props.className = 'parameter-faktor';
      break;
    case 2:
    case 3:
      if(row.pr_low_name !== "Header Kualitatif - KPMR"){
        obj.props.colSpan = 1;
        obj.props.className = 'level2-row';
      } else {
        obj.props.colSpan = 6;
        obj.props.className = 'level2-row';
      }
      // obj.props.colSpan = 6;
      // obj.props.className = 'level2-row';
      break;
    case "Per Faktor":
      obj.props.colSpan = 1;
      obj.children = value;
      break;
    default:
      break;
  }

  return obj;
}

// general render
export const renderParameterKualitatifMulti = (value, row, index, totalColSpan) => {
  const obj = {
    children: value,
    props: {}
  };

  if(row.level === 1){
    obj.props.colSpan = 0;
  } else if(row.pr_low_name === "Header Kualitatif - KPMR"){
    if(value === "Header Kualitatif - KPMR"){
      obj.props.colSpan = 0;
    } else {
      obj.props.colSpan = 5;
    }
  } else if(typeof value === "undefined"){
    obj.props.colSpan = totalColSpan;
  } else {
    obj.props.colSpan = totalColSpan;
  }

  return obj;
}

// general render
export const renderPeringkatRisikoParameterKualitatifMulti = (value, row, index, totalColSpan, name) => {

  // convert from id peringkat risiko to name
  switch (name) {
    case "pr_low":
      value = row.pr_low_name;
      break;
    case "pr_lowtomod":
      value = row.pr_lowtomod_name;
      break;
    case "pr_mod":
      value = row.pr_mod_name;
      break;
    case "pr_modtohigh":
      value = row.pr_modtohigh_name;
      break;
    case "pr_high":
      value = row.pr_high_name;
      break;
    default:
      break;
  }

  const obj = {
    children: value,
    props: {}
  };

  if(row.level === 1){
    obj.props.colSpan = 0;
  } else if(row.level === 2){
    if(row.pr_low_name === "Header Kualitatif - KPMR"){
      obj.props.colSpan = 0;
    }
  }else if(typeof value === "undefined"){
    obj.props.colSpan = totalColSpan;
  } else {
    obj.props.colSpan = totalColSpan;
  }

  return obj;
}

// render for risk rate
export const renderRiskRateParameterKualitatifMulti = (value, row, index, risk_rate=false) => {
  const obj = {
    children: (
      <>
        {
          <Tag
            color={value === 'Unsatisfactory' ? 'red' :
                   value === "Marginal" ? 'orange' :
                   value === "Fair" ? "yellow" :
                   value === "Satisfactory" ? 'green' :
                   value === "Strong" ? "blue" : "black" }
            key={value}
          > {value} </Tag>
        }
      </>
    ),
    props: {},
    className: 'no-class-edit'
  };

  // sorting refer to the level
  switch (row.level) {
    case 1:
      obj.props.colSpan = 0;
      break;
    case 2:
      if(row.pr_low_name === "Header Kualitatif - KPMR"){
        obj.props.colSpan = 0;
      } else {
        obj.props.colSpan = 1;
        obj.props.className = 'level2-row';
      }
      break;
    default:
      break;
  }

  return obj;
}

// render for risk ratio and bobot score
export const renderCombineColumnParameterKualitatifMulti = (value, row, index, risk_rate=false) => {
  const obj = {
    children: value,
    props: {},
    className: 'no-class-edit'
  };

  // sorting refer to the level
  switch (row.level) {
    case 1:
      obj.props.colSpan = 0;
      break;
    case 2:
      if(row.pr_low_name === "Header Kualitatif - KPMR"){
        obj.props.colSpan = 0;
      } else {
        obj.props.colSpan = 1;
        obj.props.className = 'level2-row';
      }
      break;
    case "inheren":
      obj.props.className = 'tingkat-risiko-inheren';
      break;
    default:
      break;
  }

  return obj;
}

export const renderParameterKualitatifMultiBobot = (value, row, index, totalColSpan) => {
  const obj = {
    children: value,
    props: {}
  };

  if(row.level === 1){
    obj.props.colSpan = 0;
  } else if(typeof value === "undefined"){
    obj.props.colSpan = totalColSpan;
  } else {
    obj.props.colSpan = totalColSpan;
  }

  return obj;
}

// render all column specs
export const renderColumn = (name, value, row, index) => {
  switch (name) {
    case "name":
      if(row.id_jenis_nilai === 1){
        return renderNameColumn(value, row, index);
      } else if(row.id_jenis_nilai === 0){
        return renderNameParameterKualitatifDual(value, row, index);
      } else if (row.id_jenis_nilai === 21) {
        return renderNameParameterKualitatifDual(value, row, index);
      } else if (row.id_jenis_nilai === 4) {
        return renderNameParameterKualitatifMulti(value, row, index);
      }else if (row.level === 'inheren'){
        return renderTingkatRisikoInherenColumn(value, row, index, 8);
      }
      break;
    case "pr_low":
      if(row.id_jenis_nilai === 1){
        return renderParameterRight(value, row, index);
      } else if (row.level === 'inheren'){
        return renderTingkatRisikoInherenColumn(value, row, index, 0);
      } else if (row.id_jenis_nilai === 21 || row.id_jenis_nilai === 0){
        return renderParameterKualitatifDual(value, row, index, 0);
      } else if (row.id_jenis_nilai === 4 || row.id_jenis_nilai === 0){
        return renderPeringkatRisikoParameterKualitatifMulti(value, row, index, 1, "pr_low");
      }
      break;
    case "pr_lowtomod":
      if(row.id_jenis_nilai === 1){
        return renderParameterRight(value, row, index);
      } else if (row.level === 'inheren'){
        return renderTingkatRisikoInherenColumn(value, row, index, 0);
      } else if (row.id_jenis_nilai === 21 || row.id_jenis_nilai === 0){
        return renderParameterKualitatifDual(value, row, index, 0)
      } else if (row.id_jenis_nilai === 4 || row.id_jenis_nilai === 0){
        return renderPeringkatRisikoParameterKualitatifMulti(value, row, index, 1, "pr_lowtomod");
      }
      break;
    case "pr_mod":
      if(row.id_jenis_nilai === 1){
        return renderParameterRight(value, row, index);
      } else if (row.level === 'inheren'){
        return renderTingkatRisikoInherenColumn(value, row, index, 0);
      } else if (row.id_jenis_nilai === 21 || row.id_jenis_nilai === 0){
        return renderParameterKualitatifDual(value, row, index, 0)
      } else if (row.id_jenis_nilai === 4 || row.id_jenis_nilai === 0){
        return renderPeringkatRisikoParameterKualitatifMulti(value, row, index, 1, "pr_mod");
      }
      break;
    case "pr_modtohigh":
      if(row.id_jenis_nilai === 1){
        return renderParameterRight(value, row, index);
      } else if (row.level === 'inheren'){
        return renderTingkatRisikoInherenColumn(value, row, index, 0);
      } else if (row.id_jenis_nilai === 21 || row.id_jenis_nilai === 0){
        return renderParameterKualitatifDual(value, row, index, 0)
      } else if (row.id_jenis_nilai === 4 || row.id_jenis_nilai === 0){
        return renderPeringkatRisikoParameterKualitatifMulti(value, row, index, 1, "pr_modtohigh");
      }
      break;
    case "pr_high":
      if(row.id_jenis_nilai === 1){
        return renderParameterRight(value, row, index);
      } else if (row.level === 'inheren'){
        return renderTingkatRisikoInherenColumn(value, row, index, 0);
      } else if (row.id_jenis_nilai === 21 || row.id_jenis_nilai === 0){
        return renderParameterKualitatifDual(value, row, index, 0)
      } else if (row.id_jenis_nilai === 4 || row.id_jenis_nilai === 0){
        return renderPeringkatRisikoParameterKualitatifMulti(value, row, index, 1, "pr_high");
      }
      break;
    case "bobot":
      if (row.level === "Per Faktor"){
        return renderRisikoPerFaktorBobot(value, row, index);
        // return renderParameterKualitatifMultiBobot(value, row, index, 1)
      } else if(row.id_jenis_nilai === 1){
        return renderParameterBobot(value, row, index);
      } else if (row.level === 'inheren'){
        return renderTingkatRisikoInherenColumn(value, row, index, 0);
      } else if (row.id_jenis_nilai === 21 || row.id_jenis_nilai === 0){
        return renderParameterKualitatifDual(value, row, index, 1)
      } else if (row.id_jenis_nilai === 4 || row.id_jenis_nilai === 0){
        return renderParameterKualitatifMulti(value, row, index, 1);
      }
      break;
    case "ratio":
      if(row.id_jenis_nilai === 1){
        return renderParameterRatio(value, row, index);
      } else if (row.level === 'inheren'){
        return renderTingkatRisikoInherenColumn(value, row, index, 0);
      } else if (row.id_jenis_nilai === 21 || row.id_jenis_nilai === 0){
        return renderParameterKualitatifDual(value, row, index, 1)
      } else if (row.id_jenis_nilai === 4 || row.id_jenis_nilai === 0){
        return renderParameterKualitatifMulti(value, row, index, 1);
      }
      break;
    case "risk_rate":
      if(row.id_jenis_nilai === 1){
        return renderRiskRateColumn(value, row, index);
      } else if (row.level === 'inheren'){
        return renderTingkatRisikoInherenColumn(value, row, index, 1);
      } else if (row.id_jenis_nilai === 21 || row.id_jenis_nilai === 0){
        return renderRiskRateParameterKualitatifDual(value, row, index);
      } else if (row.id_jenis_nilai === 4 || row.id_jenis_nilai === 0) {
        return renderRiskRateParameterKualitatifMulti(value, row, index);
      }
      break;
    case "score":
      if(row.id_jenis_nilai === 1){
        return renderParameterRight(value, row, index);
      } else if (row.level === 'inheren'){
        return renderTingkatRisikoInherenColumn(value, row, index, 1);
      } else if (row.id_jenis_nilai === 21 || row.id_jenis_nilai === 0){
        return renderCombineColumnParameterKualitatifDual(value, row, index);
      } else if (row.id_jenis_nilai === 4 || row.id_jenis_nilai === 0) {
        return renderCombineColumnParameterKualitatifMulti(value, row, index);
      }
      break;
    case "bobot_score":
      if(row.id_jenis_nilai === 1){
        return renderParameterFaktorColumn(value, row, index);
      } else if (row.level === 'inheren'){
        return renderTingkatRisikoInherenColumn(value, row, index, 1);
      } else if (row.id_jenis_nilai === 21 || row.id_jenis_nilai === 0){
        return renderCombineColumnParameterKualitatifDual(value, row, index);
      } else if (row.id_jenis_nilai === 4 || row.id_jenis_nilai === 0){
        return renderCombineColumnParameterKualitatifMulti(value, row, index);
      }
      break;
    default:
      break;
  }
}
