import React, {useState} from 'react';

const Formulario = ({guardarBusqueda}) => {
    const [ busqueda, actualizarBusqueda] = useState("");
    const [ error, actualizarError] = useState(false);
    
    const handleSubmit = e => {
        e.preventDefault();

        // Validar
        if(busqueda.trim() === ""){
            actualizarError(true);
            return;
        }
        actualizarError(false);

        // Enviar a componente principal
        guardarBusqueda(busqueda);
    }

    return ( 
        <form
            onSubmit={handleSubmit}
        >
            <div className="row text-center">
                <div className="form-group col-12 col-md-8">
                    <input 
                        type="text" 
                        name="palabra"
                        placeholder="Buscar imagen, por ejemplo: Café"
                        className="form-control form-control-lg"
                        onChange={e => actualizarBusqueda(e.target.value)}
                    />
                </div>
                <div className="form-group col-12 col-md-4">
                    <input 
                        type="submit"
                        className="btn btn-lg btn-info btn-block" 
                        value="Buscar"
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    {error? 
                    <div className="alert alert-dismissible alert-primary text-center">
                        <strong>¡Hubo un error!</strong> Todos los campos son requeridos.
                    </div>
                    :
                    null}
                </div>
            </div>
        </form>
     );
}
 
export default Formulario;