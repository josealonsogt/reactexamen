    import React, { Component } from "react";
    import ServiceSeries from "../services/ServiceSeries";
import { Navigate } from "react-router-dom";


    export default class CreatePersonaje extends Component {
    service = new ServiceSeries();
    cajaNombre = React.createRef();
    cajaImagen = React.createRef();
    selectSerie = React.createRef();

    state = {
        mensaje: null,
        status: false,
        series: [],
        selectSerie : null
    };

    insertPersonaje = async (event) => {
        event.preventDefault();
        let personaje = {
        
        nombre: this.cajaNombre.current.value,
        imagen: this.cajaImagen.current.value,
        idSerie: this.selectSerie.current.value
        };
        try {
        await this.service.createPersonaje(personaje);
        console.log("personaje insertado");
        this.setState({
            status: true,
        });
        } catch (error) {
        this.setState({
            mensaje: "No se pudo insertar el personaje",
        });
        console.error("No se pudo insertar:", error);
        }
    };
    loadSeries = async(event) =>{
        
       

        const series = await this.service.getSeries();
        console.log(series)


        this.setState({
            series : series,
            status : false
           
            
        })



    }

     componentDidMount = ()=>{
      this.loadSeries();
    }
    

    render() {
        if (this.state.status == true) {
        return <Navigate to="/" />;
        } else {
        return (

            <div className="mx-auto my-8 w-[calc(100%-2rem)] max-w-xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm">

                <h1 className="mb-6 text-2xl font-bold text-gray-900">Crear personaje</h1>

                {
                    this.state.mensaje && 
                    (<p className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 font-medium text-red-700">
                        {this.state.mensaje}
                    </p>)
                }

                <form className="space-y-4" onSubmit={this.insertPersonaje}>
                    <label htmlFor="nombre" className="block font-medium text-gray-700">Nombre</label>
                    <input id="nombre" type="text" className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        ref={this.cajaNombre}/>
                    <label htmlFor="imagen" className="block font-medium text-gray-700">Imagen:</label>
                    <input id="imagen" type="text" className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        ref={this.cajaImagen}/>
                    <label className="block font-medium text-gray-700">Series: </label>
                
                    <select id="update-serie" ref={this.selectSerie} className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200">
                    {this.state.series.map((serie, index) => {
                    return (
                    <option key={serie.idSerie} value={serie.idSerie}>
                        {serie.nombre}
                    </option>
                    );
                })}
              </select>
                    
                    
                    <button className="w-full rounded-lg bg-yellow-400 px-4 py-2 font-medium text-gray-900 transition-colors hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-200 sm:w-auto" 
                    onClick={this.insertPersonaje}>
                        Crear Personaje
                    </button>
                </form>



                </div>
        )
        
        }
    }
    }
