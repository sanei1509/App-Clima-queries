import React, { Fragment, useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";
import Error from "./components/Error";

function App() {
  // estado/state del FORMULARIO
  const [busqueda, setBusqueda] = useState({
    ciudad: "",
    pais: "",
  });

  // FETCH
  const [consultar, setConsultar] = useState(false);
  // Almacenar Respuesta
  const [resultado, setResultado] = useState({});

  // extraemos ciudad y país ingresados
  const { ciudad, pais } = busqueda;

  // creamos estado de error 404
  const [error, setError] = useState(false);

  useEffect(() => {
    const consultarAPI = async () => {
      const appId = "4bebd5770852aa0e4e6155a6337f8959";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      // guardamos el RESULTADO DE LA PETICION
      setResultado(resultado);
      setConsultar(false);

      // detectamos si hubo algun ERROR - 404

      if (resultado.cod === "404") {
        setError(true);
      } else {
        setError(false);
      }
    };
    if (consultar) {
      consultarAPI();
    }
    // eslint-disable-next-line
  }, [consultar]);

  let component;
  if (error) {
    component = (
      <Error mensaje="No hay resultado, asegúrese de que los datos sean validos" />
    );
  } else {
    component = <Clima resultado={resultado} />;
  }

  return (
    <Fragment>
      <Header titulo="Clima react app" />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                setBusqueda={setBusqueda}
                setConsultar={setConsultar}
                busqueda={busqueda}
              />
            </div>
            <div className="col m6 s12">
              {/* {error & consultar ? (
                <Error mensaje="No hay resultado, asegúrese de que los datos sean válidos" />
              ) : (
                <Clima resultado={resultado} />
              )} */}
              {component}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
