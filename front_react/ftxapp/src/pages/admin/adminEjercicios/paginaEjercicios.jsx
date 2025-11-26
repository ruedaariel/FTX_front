import React from 'react'
import HeaderCrud from '../../../components/componentsShare/header/HeaderCrud.jsx';
import CrudEjercicioBasico from './components/CrudEjercicioBasico.jsx';

const PaginaEjercicios = () => {
    return (

        <div className='container'>
            <HeaderCrud title="Ejercicios Básicos" widthPercent={100} />
            <CrudEjercicioBasico/>

        </div>

    )
}

export default PaginaEjercicios