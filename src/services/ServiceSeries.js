import React, { Component } from 'react'
import Global from '../Global'
import axios from 'axios';


export default class ServiceSeries  {
  
async getSeries(){
    let url = Global.urlApiSeries;
    let request = "api/Series"
    const response = await axios.get(url + request);
    console.log(response)
    return response.data



}


async getPersonajes(){
     let url = Global.urlApiSeries;
    let request = "api/Personajes"
    const response = await axios.get(url + request);
    console.log(response)
    return response.data
}




 async createPersonaje(personaje) {
        let url = Global.urlApiSeries
        let request = 'api/personajes'
        const response = await axios.post(url + request, personaje)
        return response.data

    }





    async getSerieById(idSerie){
         let url = Global.urlApiSeries;
        let request = "api/Series/" + idSerie ;
        const response = await axios.get(url + request);
            console.log("serie obtenida" + idSerie);
            return response.data
        
    }



    async getPersonjesByIdSerie(idSerie){
         let url = Global.urlApiSeries;
        let request = "api/Series/PersonajesSerie" + idSerie ;
        const response = await axios.get(url + request);
            console.log(response)
            return response.data
    }
}




