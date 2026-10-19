import React, { Component } from 'react'
import ServiceSeries from '../services/ServiceSeries'

export default class UpdatePersonaje extends Component {

  service = new ServiceSeries();
   cajaNombre = React.createRef();
    cajaImagen = React.createRef();
     selectSerie = React.createRef();
      selectPersonaje = React.createRef();


    state = {
      series : [],
      personajes : [],
      personajeSelected : null,
      serieSelected : null,
      status: false,
        mensaje: null
    };

    loadPersonajes = async () =>{
       const personajes = await this.service.getPersonajes();
       console.log(personajes)


        this.setState({
            personajes : personajes,
           status : true
            
        })

    }


     loadSeries = async() =>{
      
        const series = await this.service.getSeries();
        console.log(series)


        this.setState({
            series : series,
            status : true
            
        })



    }
    componentDidMount = ()=>{
      this.loadPersonajes();
      this.loadSeries();
    }
    


  render() {
    return (

      <div className="mx-auto my-8 w-[calc(100%-2rem)] max-w-xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm"> 
        <h1 className="mb-6 text-2xl font-bold text-gray-900">Modificar personaje</h1>
            <form className="space-y-5">
              <div className="space-y-2">
              <label htmlFor="update-serie" className="block text-sm font-medium text-gray-700">
                Serie
              </label>
              <select id="update-serie" ref={this.selectSerie} className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200">
              {this.state.series.map((serie, index) => {
            return (
              <option key={serie.idSerie} value={serie.idSerie}>
                {serie.nombre}
              </option>
            );
          })}
              </select>
              </div>

              <div className="space-y-2">
                            <label htmlFor="update-personaje" className="block text-sm font-medium text-gray-700">
                Personaje
              </label>
              <select id="update-personaje" ref={this.selectPersonaje} className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200">
              {this.state.personajes.map((personaje, index) => {
            return (
              <option key={personaje.idPersonaje} value={personaje.idPersonaje}>
                {personaje.nombre}
              </option>
            );
          })}
              </select>
              </div>
                
                
               
            </form>
             <button type="submit" className="mt-6 w-full rounded-lg bg-yellow-400 px-4 py-2 font-medium text-gray-900 transition-colors hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-200 sm:w-auto">
                    Modificar Personaje
                </button>

                <div>

                  </div>
                
                </div>



    )
  }
}

