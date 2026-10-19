import React, { Component } from "react";
import ServiceSeries from "../services/ServiceSeries";
import { NavLink } from "react-router-dom";

export default class SerieComponent extends Component {
  service = new ServiceSeries();

  state = {
    serie: null,
    status: false,
    mensaje: null,
    personajes : []
      

  };  

  loadSeriesById = async () => {
    try {
      const serie = await this.service.getSerieById(this.props.idSerie);

      console.log(serie)

      this.setState({
        serie: serie,
        
      });


    } catch (error) {
      this.setState({
        mensaje: "No se pudo cargar la serie .",
      });
      console.error(error);
    }
  };

  loadPersonajesBySerie = async () => {
    try {
      const personajes = await this.service.getPersonjesByIdSerie(this.props.idSerie);

      console.log(personajes)

      this.setState({
      
        personajes : personajes
        
      });


    } catch (error) {
      this.setState({
        mensaje: "No se pudo cargar los personajes .",
      });
      console.error(error);
    }
  };

    
  



  componentDidMount = () => {
    this.loadSeriesById();
  }

  componentDidUpdate = async (oldProps) => {
        if (oldProps.idSerie != this.props.idSerie){
            await this.loadSeriesById();
        }
    }


  render() {
    return (
      <div className="mx-auto my-8 w-[calc(100%-2rem)] max-w-4xl space-y-6">
        {this.state.mensaje && (
          <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {this.state.mensaje}
          </p>
        )}
        <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm sm:flex">
         
            <img
                  src={this.state.serie?.imagen}
                  className="h-64 w-full bg-gray-100 object-cover sm:h-auto sm:w-2/5"
                  alt={`${this.state.serie?.nombre}`}
                /> 

          

            <div className="flex flex-1 flex-col items-start gap-4 p-6 sm:p-8">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                                {this.state.serie?.nombre} 
                            </h2>
                            <p className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                                Puntuación: {this.state.serie?.puntuacion}
                            </p>
                            <button type="button" className="mt-2 w-full rounded-lg bg-yellow-400 px-4 py-2 font-medium text-gray-900 transition-colors hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-200 sm:w-auto"
                              onClick={this.loadPersonajesBySerie}>
                              Mostrar personajes
                            </button>
                            </div>
        </article>

       
         {this.state.personajes.length > 0 && (
           <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm" aria-labelledby="personajes-heading">
             <h3 id="personajes-heading" className="mb-4 text-xl font-bold text-gray-900">Personajes</h3>
             <ul className="grid gap-3 sm:grid-cols-2">
                   {this.state.personajes.map((personaje, index) => {
                    return (
                    <li key={personaje.idPersonaje} className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 font-medium text-gray-800">
                        {personaje.nombre}
                    </li>
                    );
                })}
             </ul>
           </section>
         )}
                    


        
      </div>
    );
  }
}
