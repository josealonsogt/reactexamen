import React, { Component } from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import MenuComponent from './MenuComponent'
import HomeComponent from './HomeComponent'

import SerieComponent from './SerieComponent'
import CreatePersonaje from './CreatePersonaje'
import UpdatePersonaje from './UpdatePersonaje'



function SeriesElement() {
    const { idSerie } = useParams();
    return (<SerieComponent idSerie={idSerie} />)
}

export default class Router extends Component {



    render() {
        return (
            <BrowserRouter>
                <MenuComponent />
                <Routes>
                    <Route path="/" element={<HomeComponent />} />
                    <Route path="/series/:idSerie" element={<SeriesElement />} />
                    <Route path="/create" element={<CreatePersonaje />}/>
                    <Route path="/update" element={<UpdatePersonaje />}/>
                    





                </Routes>
            </BrowserRouter>
        )
    }
}
