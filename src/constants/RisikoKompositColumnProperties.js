import React from "react";
import {Tag} from "antd";

// render for risk level
export const renderRiskLevel = (value, row, index) => {
  const obj = {
    children: (
      <>
        {
          <Tag
            color={value === 'H' ? 'red' : value === "MTH" ? 'orange' : value === "M" ? "yellow" : value === "LTM" ? 'green' : value === "L" ? "blue" : "black" }
            key={value}
          > {value} </Tag>
        }
      </>
    ),
    props: {}
  };

  if(row.jenis_risiko === "Total"){
    obj.props.className = "risiko-komposit-total";
  }

  return obj;
}

// render for controler level
export const renderControlLevel = (value, row, index) => {
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

  if(row.jenis_risiko === "Total"){
    obj.props.className = "risiko-komposit-total";
  }

  return obj;
}

// render for controler level
export const renderPeringkatKomposit = (value, row, index) => {
  const obj = {
    children: (
      <>
        {
          <Tag
            color={value === 'Tingkat 5' ? 'red' :
                   value === "Tingkat 4" ? 'orange' :
                   value === "Tingkat 3" ? "yellow" :
                   value === "Tingkat 2" ? 'green' :
                   value === "Tingkat 1" ? "blue" : "black" }
            key={value}
          > {value} </Tag>
        }
      </>
    ),
    props: {}
  };

  if(row.jenis_risiko === "Total"){
    obj.props.className = "risiko-komposit-total";
  }

  return obj;
}

// render default
export const renderDefault = (value, row, index) => {
  var obj = {
    children: value,
    props: {}
  };

  if(row.jenis_risiko === "Total"){
    obj = {
      props: {},
      children: value
    };
    obj.props.className = "risiko-komposit-total";
    return obj;
  }

  return obj;
}

// render all column specs
export const renderColumn = (name, value, row, index) => {
  switch (name) {
    case "risk_level":
      return renderRiskLevel(value, row, index);
    case "control_level":
      return renderControlLevel(value, row, index);
    case "peringkat_komposit":
      return renderPeringkatKomposit(value, row, index);
    default:
      return renderDefault(value, row, index);
  }
}
