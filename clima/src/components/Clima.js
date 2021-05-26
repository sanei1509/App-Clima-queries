import React from "react";
import PropTypes from "prop-types";

const Clima = ({ resultado }) => {
  // extraemos VALORES
  const { name, main } = resultado;

  if (!name) return null;

  //   grados
  const kelvin = 273.15;

  return (
    <div className="card-panel white col s12">
      <h2>El clima en {name} es: </h2>
      <p className="temperatura">{Number(main.temp - kelvin).toFixed(2)} °C</p>
      <p>
        la temperatura mínima es: {Number(main.temp_min - kelvin).toFixed(0)} °c
      </p>
      <p>
        la temperatura máxima es: {Number(main.temp_max - kelvin).toFixed(0)} °c
      </p>
    </div>
  );
};

Clima.propTypes = {
  resultado: PropTypes.object.isRequired,
};

export default Clima;
