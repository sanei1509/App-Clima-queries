import React, { useState } from "react";
import Error from "./Error";
import PropTypes from "prop-types";

const Formulario = ({ busqueda, setBusqueda, setConsultar }) => {
  //instancing error controler
  const [error, setError] = useState(false);

  // extraer ciudad y país
  const { ciudad, pais } = busqueda;

  // instanciamos un controlador de estos datos
  const handleChange = (e) => {
    // actualizamos state
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  // evento click - o ENVIAR
  const handleSubmit = (e) => {
    e.preventDefault();
    // validar
    if (ciudad.trim() === "" || pais.trim() === "") {
      setError(true);
      return;
    }

    setError(false);
    setConsultar(true);
    // pasarlo al componente principal
  };
  return (
    <form onSubmit={handleSubmit}>
      {error ? <Error mensaje="Es necesario completar ambos datos" /> : null}
      <div className="input-field col s12">
        <input
          type="text"
          name="ciudad"
          id="ciudad"
          value={ciudad}
          onChange={handleChange}
        />
        <label htmlFor="ciudad">Ciudad: </label>
      </div>
      <div className="input-field col s12">
        <select name="pais" id="pais" value={pais} onChange={handleChange}>
          <option value="">--Selecciona un país--</option>
          <option value="US">Estados Unidos</option>
          <option value="UY">Uruguay</option>
          <option value="MX">México</option>
          <option value="AR">Argentina</option>
          <option value="CO">Colombia</option>
          <option value="CR">Costa Rica</option>
          <option value="ES">España</option>
          <option value="PE">Perú</option>
        </select>
        <label htmlFor="pais">País: </label>
      </div>
      <div className="input-field col s12">
        <a
          className="waves-effect waves-light btn-large col s12"
          onClick={handleSubmit}
        >
          Buscar Clima
        </a>
      </div>
    </form>
  );
};

// documentación
Formulario.propTypes = {
  busqueda: PropTypes.object.isRequired,
  setBusqueda: PropTypes.func.isRequired,
  setConsultar: PropTypes.func.isRequired,
};

export default Formulario;
