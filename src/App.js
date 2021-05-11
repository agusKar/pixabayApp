import React, { useState, useEffect, Fragment } from 'react';
import Formulario from './components/Formulario';

function App() {
  const [busqueda, guardarBusqueda] = useState("");
  const [resultados, guardarResultados] = useState([]);
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);

  useEffect(() => {
    const busquedaApi = async () => {
      if (busqueda === '') return;
      const keyAPI = '21074251-811195e7e6d5a9fcc7ea6dc43';
      const imagesPorPagina = 30;

      const urlAPI = `https://pixabay.com/api/?key=${keyAPI}&q=${busqueda}&per_page=${imagesPorPagina}&page=${paginaactual}`;

      const resultadoAPI = await fetch(urlAPI);
      const resultadosJSON = await resultadoAPI.json();

      guardarResultados(resultadosJSON.hits);

      // Calcular total de paginas
      guardarTotalPaginas(Math.ceil(resultadosJSON.totalHits / imagesPorPagina));

      // Scrollear hacia arriba cuando se usa el paginador
      const id_to_scroll = document.querySelector('#main_scroll');
      id_to_scroll.scrollIntoView({behavior: 'smooth'});
    }

    busquedaApi();
  }, [busqueda, paginaactual])

  // Funcion para retrocer en la paginacion
  const paginaAnterior = () => {
    const paginaNueva = paginaactual - 1;

    if (paginaNueva === 0) return;

    guardarPaginaActual(paginaNueva);
  }

  // Funcion para avanzar en la paginacion
  const paginaSiguiente = () => {
    const paginaNueva = paginaactual + 1;

    if (paginaNueva > totalpaginas) return;

    guardarPaginaActual(paginaNueva);
  }

  return (
    <Fragment>
      <div id="main_scroll" className="container bg-danger">
        <div className="row">
          <div className="col-12 text-center py-4">
            <h4 className="text-white font-weight-bold">Buscador de Imagenes</h4>
          </div>
        </div>
        <Formulario
          guardarBusqueda={guardarBusqueda}
        />
      </div>

      <div className="container mt-5">

        <div className="row">
          {
            resultados.map(resultado => (

              <div key={resultado.id} className="col-12 col-md-6 col-lg-4">
                <img src={resultado.largeImageURL} alt="" className="img-fluid m-2" />
              </div>
            ))
          }

        </div>
        <div className="row justify-content-center my-4">

          {
            paginaactual > 1 ?
              <button
                className="btn btn-info mr-1"
                type="button"
                onClick={paginaAnterior}
              >&laquo; Anterior</button>
              : null
          }

          {
            paginaactual < totalpaginas ?
              <button
                className="btn btn-info"
                type="button"
                onClick={paginaSiguiente}
              > Siguiente &raquo;</button>
              : null
          }
        </div>
      </div>
    </Fragment>
  );
}

export default App;
