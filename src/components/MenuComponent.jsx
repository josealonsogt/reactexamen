import React, { Component } from "react";
import Global from '../Global';
import ServiceSeries from '../services/ServiceSeries';
import { NavLink } from "react-router-dom";

export default class MenuComponent extends Component {
    state = {
        menuAbierto: false,
        dropdownAbierto: false,
        series: []
    };

    service = new ServiceSeries();

    loadSeries = async() =>{
        const series = await this.service.getSeries();
        console.log(series)


        this.setState({
            series : series,
            dropdownAbierto:true
            
        })

    }

     componentDidMount = () => {
        this.loadSeries();
        };


    render() {
        const { menuAbierto, dropdownAbierto } = this.state;

        return (
            <nav className="bg-blue-50">
                <div className="mx-auto flex max-w-screen-xl flex-wrap items-center gap-6 p-4">
                    <a href="#" className="text-xl font-bold text-gray-900">
                        Logo
                    </a>

                    <button
                        type="button"
                        className="ml-auto rounded-lg border border-gray-300 px-3 py-2 text-gray-700 lg:hidden"
                        aria-label="Abrir o cerrar menú"
                        aria-controls="navbar-menu"
                        aria-expanded={menuAbierto}
                        onClick={() =>
                            this.setState((estado) => ({
                                menuAbierto: !estado.menuAbierto,
                            }))
                        }
                    >
                        ☰
                    </button>

                    <div
                        id="navbar-menu"
                        className={`${
                            menuAbierto ? "block" : "hidden"
                        } w-full lg:block lg:w-auto`}
                    >
                        <ul className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
                            <li>
                                <NavLink
                                to="/"
                                    className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-blue-100"
                                >
                                    Home
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                
                                    className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-blue-100"
                                    to="/create"

                                >
                                    Nuevo Personaje
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    
                                    className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-blue-100"
                                    to="/update"
                                >
                                    Modificar Personaje
                                </NavLink>
                            </li>

                            <li
                                className="relative"
                                onBlur={(event) => {
                                    if (!event.currentTarget.contains(event.relatedTarget)) {
                                        this.setState({ dropdownAbierto: false });
                                    }
                                }}
                                onKeyDown={(event) => {
                                    if (event.key === "Escape") {
                                        this.setState({ dropdownAbierto: false });
                                        event.currentTarget.querySelector("button").focus();
                                    }
                                }}
                            >
                                <button
                                    id="dropdown-button"
                                    type="button"
                                    aria-expanded={dropdownAbierto}
                                    aria-controls="dropdown-menu"
                                    onClick={() =>
                                        this.setState((estado) => ({
                                            dropdownAbierto: !estado.dropdownAbierto,
                                        }))
                                    }
                                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                                >
                                    Dropdown
                                    <svg
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m6 9 6 6 6-6"
                                        />
                                    </svg>
                                </button>

                                <ul
                                    id="dropdown-menu"
                                
                                    aria-labelledby="dropdown-button"
                                    className={`${
                                        dropdownAbierto ? "block" : "hidden"
                                    } absolute left-0 z-20 mt-2 w-48 rounded-lg border border-gray-200 bg-white p-2 shadow-lg`}>

                                    {this.state.series.map((serie,idSerie)=>{
                                        return(
                                            <li key={idSerie}>
                                            
                                            <NavLink
                                            className="dropdown-item"
                                            to={"/series/" + serie.idSerie}>
                                                {serie.nombre}

                                            </NavLink>
                                                
                                            
                                            </li>

                                        )


                                    })}
                                
                                    
                                </ul>
                            </li>

                            <li>
                                <span
                                    aria-disabled="true"
                                    className="block cursor-not-allowed px-3 py-2 text-gray-400"
                                >
                                    Disabled
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}