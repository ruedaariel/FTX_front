import React, { useEffect, useState, useRef } from "react";
import { fetchGeneral } from "../../../../components/componentsShare/utils/fetchGeneral";
//import '../../../styles/colores.css';
import '../../../../styles/colores.css'
import './validacion.css';
import './crud_ejercicio.css';
import SelectorEjercicio from "./SelectorEjercicio";
import LOGO_PLACEHOLDER from '../../../../assets/Recursos/IconosLogos/logoblanco.png';

import { EJERCICIO_VACIO } from './utils/ejercicio_vacio';
import { useEjercicioForm } from "./useEjercicioForm";
import { getEmbedUrl } from "./utils/formatoVideo";
import { useModal } from "../../../../context/ModalContext";
import ModalDecision from "../../../../components/componentsShare/Modal/ModalDecision";


const CrudEjercicioBasico = () => {
    //ejercicio seleccionado (Crear -> null, Editar -> ejrcicio del backend)
    const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState(null);
    //Crear o Editar
    const [modoEjercicio, setModoEjercicio] = useState("Crear");
    //Todos los ejercicios que vienen del backend (EjercicioBasicoEntity[])
    const [ejercicios, setEjercicios] = useState([]); //ejercicios 
    //maneja delay
    // const [loading, setLoading] = useState(false);
    //interviene en el manejo de error
    const [error, setError] = useState(null);
    //para previsualizar el video
    const [showVideo, setShowVideo] = useState(false);
    //para recargar o no los ejercicios del backend
    const [reload, setReload] = useState(false);
    //para desseleccionar la imagen
    const fileInputRef = useRef(null);
    //hook `useModal()` para mostrar un mensaje
    const { showModal } = useModal();
    //Para el modal desicion que pregunta en el delete
    const [mostrarDecision, setMostrarDecision] = useState(false);



    const {
        ejercicioData,      // Datos del formulario
        errores,            // Errores de validación
        loading,          // Estado de carga 
        setLoading,
        handleInputChange,  // on/Change
        handleBlur,         // onBlur
        handleSubmit,       // onSubmit
        handleDeselectImg //fe para deseleccionar imagen, liberar espacio,etc
    } = useEjercicioForm(modoEjercicio, ejercicioSeleccionado, setReload, setEjercicioSeleccionado, fileInputRef);

    const fetchEjercicios = () => {
        fetchGeneral({
            url: `${API_URL}/ejbasico/all`,
            method: "GET",
            setLoading,
            setError,
            onSuccess: (data) => {
                setEjercicios(data);
                setReload(false);
            },
            showModal,
        });
    }

    //cuando se carga la pagina, se carga el arreglo de ejercicios desde el BE
    useEffect(() => {
        fetchEjercicios();
    }, []);

    //se vuelve a cargar los Ejercicios cada vez que se graba
    useEffect(() => {
        if (reload) {
            fetchEjercicios();
        }

    }, [reload]);

    //si cambia la seleccion o el modo, no muestra el video
    useEffect(() => {
        setShowVideo(false);
    }, [ejercicioSeleccionado, modoEjercicio]);

    const handleSeleccionarModo = (nuevoModo) => {
        setModoEjercicio(nuevoModo);
        if (nuevoModo === "Crear") {
            setEjercicioSeleccionado(null);
        }
    }

    // Manejador que selecciona un ejercicio por su ID (si es necesario) o por el objeto
    const handleSeleccionarEjercicio = (ejercicio) => {
        if (ejercicio && ejercicio.idEjercicioBasico) {
            setEjercicioSeleccionado(ejercicio);
            setModoEjercicio("Editar");
        } else {
            setEjercicioSeleccionado(null);
            setModoEjercicio("Crear");
            showModal("Para seleccionar un ejercicio debes hacer clic en 'Editar'", "success", 3000);
        }

    }

    const ejecutarBorrado = async () => {
        const url = `${API_URL}/ejbasico/delete/${ejercicioSeleccionado.idEjercicioBasico}`;
        try {
            await fetchGeneral({
                url, method: 'DELETE', setLoading, setError, onSuccess: () => {
                    setEjercicioSeleccionado(null);
                    setModoEjercicio('Crear');
                    setReload(true);
                },
                 showModal,
            });
        } catch (err) {
            showModal(`Error eliminando ejercicio: ${ejercicioSeleccionado.nombreEjercicio}`, err.message ?? err, 0, true);
            console.error(err);
        }
    };

    const handleEliminarEjercicio = async () => {
//pregunta si borra o no, si -> llama a ejecutar borrado
        showModal(`¿Estás seguro que querés eliminar el ejercicio ${ejercicioSeleccionado.nombreEjercicio}?`,
            "decision",
            0,
            true,
            (respuesta) => {
                if (!respuesta) return;

                ejecutarBorrado();
            }
        );


    };



    return (
        < >
            <SelectorEjercicio
                modoEjercicio={modoEjercicio}
                ejercicios={ejercicios}
                ejercicioSeleccionado={ejercicioSeleccionado}
                onSeleccionarEjercicio={handleSeleccionarEjercicio}
                onCambiarModo={handleSeleccionarModo}
                // error={error}
            ></SelectorEjercicio>

            <div className="my-container-ejercicio">
                <form id="ejercicioForm" onSubmit={handleSubmit}>
                    <div className="form-container-ejercicio">
                        {/*columna izq - contiene la informacion basica del ej*/}
                        <div className="columna-izq-ejercicio">

                            <div className="form-group-ejercicio">
                                <label htmlFor="nombreEjercicio">Nombre Ejercicio:</label>
                                <div className="input-icon-validate">
                                    <input type="text" id="nombreEjercicio" name="nombreEjercicio" className={`form-control-ejercicio input-ejercicio ${errores.nombreEjercicio ? 'is-invalid' : ''}`}
                                        required placeholder="El nombre debe ser unico, por ejemplo, sentadilla sumo"
                                        value={ejercicioData?.nombreEjercicio || ''} onChange={handleInputChange} onBlur={handleBlur} />
                                   
                                    <span className="icon-validate" data-icon="nombreEjercicio"></span>
                                </div>
                                {errores.nombreEjercicio && (
                                    <div className="input-warning text-danger"   >
                                        {errores.nombreEjercicio}
                                    </div>
                                )}

                            </div>



                            <div className="form-group-ejercicio">
                                <label htmlFor="observaciones">Observaciones:</label>
                                <textarea id="observaciones" name="observaciones"
                                rows={ejercicioData.observaciones?.trim() ? 4 : 2}
                                    className={`form-control textarea-ejercicio ${errores.observaciones ? 'is-invalid' : ''}`}
                                    value={ejercicioData.observaciones || ''} onChange={handleInputChange} onBlur={handleBlur}></textarea>
                                {errores.observaciones && (
                                    <div className="input-warning text-danger" style={{ display: "block" }}>
                                        {errores.observaciones}
                                    </div>
                                )}
                            </div>

                            <div className={`form-group-ejercicio ${ejercicioData.imagenPreviewUrl ? 'con-preview' : ''}`}>
                                <label htmlFor="imagenLink">Link Imagen: </label>
                                {ejercicioData.imagenPreviewUrl && (
                                    <span className="etiqueta-carga-ejercicio"
                                        onClick={handleDeselectImg}>
                                        Deseleccionar
                                    </span>
                                )}
                                <input ref={fileInputRef} type="file" id="imagenLink" name="imagenLink"
                                    className={`form-control input-ejercicio ${errores.imagenLink ? 'is-invalid' : ''}`}
                                    accept="image/*" onChange={handleInputChange} />
                                {errores.imagenLink && (
                                    <div className="input-warning text-danger" >
                                        {errores.imagenLink}
                                    </div>
                                )}
                            </div>

                            <div className="form-group-ejercicio">
                                <label htmlFor="videoLink">Link Video:
                                    {ejercicioData.videoLink && !showVideo && (
                                        <span className="etiqueta-carga-ejercicio"
                                            onClick={() => { setShowVideo(true); }}>
                                            Previsualizar video
                                        </span>
                                    )}

                                </label>
                                <input type="url" id="videoLink" name="videoLink"
                                    className={`form-control input-ejercicio ${errores.videoLink ? 'is-invalid' : ''}`}
                                    value={ejercicioData.videoLink || ''}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur} />
                                {errores.videoLink && (
                                    <div className="input-warning text-danger" style={{ display: "block" }}>
                                        {errores.videoLink}
                                    </div>
                                )} </div>

                            <div className="botones-ejercicio">
                                <button type="submit" className="btn btn-primary button-ejercicio" disabled={loading}>
                                    {loading ? 'Guardando...' : 'Guardar'}
                                </button>
                                {/* El botón eliminar solo se muestra en modo Editar */}
                                {modoEjercicio === "Editar" && (
                                    <button type="button" className="btn btn-danger button-ejercicio" disabled={loading}
                                        onClick={handleEliminarEjercicio}>
                                        Eliminar
                                    </button>
                                )}
                            </div>
                        </div>

                        { /*columna derecha: vista previa de imagen y video*/}
                        <div className="columna-der-ejercicio">
                            {/* El valor de src ahora proviene de ejercicioData.imagenLink del hook */}
                            <div className="imagen-preview-ejercicio">
                                <h4>Vista previa de la imagen</h4>
                                <img id="imagenPreview-ejercicio" src={ejercicioData.imagenPreviewUrl ? ejercicioData.imagenPreviewUrl : LOGO_PLACEHOLDER}
                                    alt="Vista previa de la imagen" style={{ maxWidth: '100%', maxHeight: '150px' }} />
                            </div>
                            <div className="video-preview-ejercicio">
                                <h4>Vista previa del video</h4>

                                <div className="video-iframe-wrapper-ejercicio">
                                    <div className="video-iframe-preview-ejercicio">
                                        {ejercicioData.videoLink && showVideo ? (
                                            <iframe src={getEmbedUrl(ejercicioData.videoLink)} title="Preview" />
                                        ) : (
                                            <div className="video-placeholder-mensaje-ejercicio">
                                                {ejercicioData.videoLink
                                                    ? 'Presione "Previsualizar video" para cargarlo.'
                                                    : 'No hay un enlace de video ingresado.'}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </form >


            </div>


        </ >

    )
}

export default CrudEjercicioBasico;