//Maneja la logica: validacion campo a campo, validacion antes del submit, creacion y edicion

import { useState, useEffect } from 'react';
import { EJERCICIO_VACIO } from './utils/ejercicio_vacio';
import { VALIDACION_REGLAS } from './utils/validacionReglas';
import { fetchGeneral } from "../../../../components/componentsShare/utils/fetchGeneral";
import { useModal } from "../../../../context/ModalContext";
import API_URL from "../../../../config/api";

export const useEjercicioForm = (modoEjercicio, ejercicioSeleccionado, setReload, setEjecicioSeleccionado, fileInputRef) => {
    //ejercicio del form (vacio o lleno )
    const [ejercicioData, setEjercicioData] = useState(EJERCICIO_VACIO);
    //errores de validacion en el form
    const [errores, setErrores] = useState({});
    //para el fetchGeneral
    const [loading, setLoading] = useState(false);
    //para el fetchGeneral
    const [error, setError] = useState(false);
    //modal
    const { showModal } = useModal();


    const validarCampo = (nameEj, value, tempData = null) => {
        const reglas = VALIDACION_REGLAS[nameEj];
        let error = '';

        if (!reglas) return ''; //no hay reglas para ese campo

        if (nameEj === 'imagenLink') { // Usamos el objeto File real
            //  Usa el archivo del objeto temporal si se proporciona (en handleInputChange),
            //           o usa el archivo del estado global (en handleBlur o handleSubmit).
            const fileToValidate = tempData ? tempData.imagenFile : ejercicioData.imagenFile;

            // Si no hay archivo y no es requerido, se considera válido aquí.
            if (!fileToValidate) {
                return error;
            }

            const maxSizeInBytes = reglas.maxSizeMB * 1024 * 1024;
            if (fileToValidate.size > maxSizeInBytes) {
                error = reglas.messages.maxSize;
                return error;
            }

            //validacion de tipo
            if (!reglas.allowedTypes.includes(fileToValidate.type)) {
                error = reglas.messages.invalidType;
                return error;
            }
        }

        if (reglas.required && !value) {
            error = reglas.messages.required;
        } else if (value) {
            if (reglas.min && String(value).length < reglas.min) {
                error = reglas.messages.min;
            } else if (reglas.regex && !reglas.regex.test(value)) {
                error = reglas.messages.regex;
            }
        }

        return error;
    }

    const validarTodoEjercicio = (data) => {
        let esValido = true;
        let nuevosErrores = {};

        const camposaValidar = Object.keys(VALIDACION_REGLAS);

        camposaValidar.forEach(nombreEj => {
            const value = data[nombreEj];

            const error = validarCampo(nombreEj, value, data); //se pasa data para la validacion de la imagen
            if (error) {
                nuevosErrores[nombreEj] = error;
                esValido = false;
            }
        });
        //le cambio el nombre a nuevos errores
        return { errores: nuevosErrores, esValido };
    }

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;

        if (type === 'file') {
            const file = e.target.files[0];
            let previewUrl = null;
            let validationError = '';

            if (file) {
                //Crear la URL temporal segura para el navegador
                previewUrl = URL.createObjectURL(file);

                // Temporalmente, se crea un objeto con el archivo para que validarCampo lo pueda usar
                const tempEjercicioData = { ...ejercicioData, imagenFile: file };
                // Llama a la validación. Si devuelve un string, es un error.
                //  validationError = validarCampo('imagenLink', file.name, tempEjercicioData);
                validationError = validarCampo('imagenLink', null, tempEjercicioData);



                setEjercicioData(prev => {
                    if (prev.imagenPreviewUrl?.startsWith('blob:')) URL.revokeObjectURL(prev.imagenPreviewUrl);
                    return { ...prev, imagenPreviewUrl: previewUrl, imagenFile: file };
                });
                // Se actualiza el estado de errores
                setErrores(prev => ({
                    ...prev,
                    // Asumiendo que el campo de error en el JSX es 'errores.imagenFile'
                    //  imagenFile: validationError
                    imagenLink: validationError
                }));
            } else {
                // si no hay archivo seleccionado, opcionalmente limpiar preview y file
                setEjercicioData(prev => ({ ...prev, imagenPreviewUrl: null, imagenFile: null }));
                setErrores(prev => ({ ...prev, imagenLink: '' }));
            }


            return;
        }

       const transformedValue = name === 'nombreEjercicio' ? value.replace(/\s{2,}/g, ' ') : value;
        setEjercicioData(prevData => ({
            ...prevData, [name]: transformedValue,
        }));
    };



    // Detecta solo los campos modificados para la petición PATCH
    const getChangedFields = (ejercicioSeleccionado, ejercicioData) => {
        const changedFields = {};

        // Si no hay datos originales, algo es incorrecto en el modo 'Editar', pero devolvemos todo por seguridad.
        if (!ejercicioSeleccionado) return ejercicioData;

        for (const key in ejercicioData) {
            // Ignoramos las claves de control internas del frontend
            if (key === 'imagenPreviewUrl' || key === 'idEjercicioBasico') {
                continue;
            }

            const originalValue = ejercicioSeleccionado[key];
            const currentValue = ejercicioData[key];

            //  Comparación para campos que NO son archivos
            if (key !== 'imagenFile') {
                const originalStr = String(originalValue || '').trim();
                const currentStr = String(currentValue || '').trim();

                // Detectar si el valor ha cambiado
                if (originalStr !== currentStr) {
                    changedFields[key] = currentValue;
                }
            }
        }


        // no se puede comparar archivos, se detecta si ha seleccionado un archivo
        if (ejercicioData.imagenFile instanceof File) {
            changedFields.imagenLink = ejercicioData.imagenFile; // 
        }

        return changedFields;
    };

    //validacion por campo
    const handleBlur = (e) => {
        const { name, value } = e.target;
        const error = validarCampo(name, value);
        setErrores(prev => ({ ...prev, [name]: error }));//al estado previo, le agrega el nuevo

    };

    const handleDeselectImg = (e) => {
        e?.preventDefault();

        // Revoke URL, si existe
        setEjercicioData(prev => {

            if (prev.imagenPreviewUrl?.startsWith('blob:')) {
                URL.revokeObjectURL(prev.imagenPreviewUrl);
            }
            return {
                ...prev,
                imagenPreviewUrl: null,
                imagenFile: null,
            };
        });

        // Limpiar input type="file" para permitir volver a seleccionar el mismo archivo si se quiere
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }

        // Limpiar error asociado
        setErrores(prev => ({ ...prev, imagenLink: '' }));

        return {}
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { errores, esValido } = validarTodoEjercicio(ejercicioData);

        setErrores(errores);

        if (!esValido) {
            //devuelve un arreglo [clave,valor] a partir de un objeto, itera (con map) para generar una unica linea (mensaje que se quiere mostrar)
            // const mensaje = Object.entries(errores)
            //     .map(([k, v]) => `En ${k}: ${v}`)
            //     .join('\n');
            showModal("No se puede guardar \n Existen errores en el formulario", "error", 3000)
            setLoading(false);
            return;
        }

        //Preparacion para enviar al backend
        let dataToSend = {};
        const urlBase = `${API_URL}/ejbasico`;
        let url = '';
        const method = modoEjercicio === 'Crear' ? "POST" : "PATCH";

        if (modoEjercicio === 'Crear') {
            url = `${urlBase}/register`;
            dataToSend = ejercicioData;
        } else { // modoEjercicio === 'Editar'
            url = `${urlBase}/update/${ejercicioData.idEjercicioBasico}`;

            // ejercicioSeleccionado es el estado original, ejercicioData es el estado actual.
            dataToSend = getChangedFields(ejercicioSeleccionado, ejercicioData);

            // Si no hay campos cambiados, abortamos la petición PATCH
            if (Object.keys(dataToSend).length === 0) {
                showModal("No hay cambios detectados para guardar.", "warning", 3000)
                setLoading(false);
                return;
            }
        }

        //construccion del formData
        const formData = new FormData();

        for (const key in dataToSend) {
            const value = dataToSend[key];
            
            if (key === 'imagenFile' && value instanceof File) {
                formData.append('imagenLink', value); // ← enviar con el nombre que espera el backend
                continue;
            }

            if (key === 'imagenLink' && value instanceof File) {
                // por si en algún caso ya tenés imagenLink como File
                formData.append('imagenLink', value);
                continue;
            }

            if (value !== null && value !== undefined && key !== 'imagenPreviewUrl') {
                formData.append(key, value);
            }
        }

        try {

            await fetchGeneral({
                url: url,
                method: method,
                body: formData, // Usa el objeto FormData como body
                setLoading,
                setError,
                onSuccess: (data) => {
                    setEjercicioData(EJERCICIO_VACIO);
                    if (setReload) {
                        setReload(true);
                    }
                    if (typeof setEjecicioSeleccionado === 'function') {
                        setEjecicioSeleccionado(null)
                    }
                    if (fileInputRef?.current) {
                        fileInputRef.current.value = ''; //saca el nombre del input
                    }

                },
                showModal,
                // estado para reacargar ejercicios
            });

        } catch (error) {
            console.error("Error en la operación del formulario:", error);
            showModal(error, "error", 3000);
        }

    }

    //carga el ejercicio seleccionado en modo edicion o un ejercicio vacio en modo crear
    useEffect(() => {

        if (ejercicioSeleccionado && modoEjercicio !== 'Crear') {

            //REVOCAR URL antigua (si existe) para liberar memoria
            if (ejercicioData.imagenPreviewUrl && ejercicioData.imagenPreviewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(ejercicioData.imagenPreviewUrl);
            }

            //  Establecer los datos del ejercicio seleccionado
            setEjercicioData({
                ...ejercicioSeleccionado,
                imagenPreviewUrl: ejercicioSeleccionado.imagenLink || null,
                imagenFile: null, // Siempre nulo al cargar desde el servidor
            });
            setErrores({});

        } else {
            //  Lógica de Resetear (cuando se pasa a modo 'Crear' o el ejercicio se deselecciona)

            // REVOCAR URL antigua (si existe)
            if (ejercicioData.imagenPreviewUrl && ejercicioData.imagenPreviewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(ejercicioData.imagenPreviewUrl);
            }

            // Resetear al estado inicial
            setEjercicioData(EJERCICIO_VACIO);
            setErrores({});
        }

    }, [ejercicioSeleccionado, modoEjercicio]);

    return {
        ejercicioData,
        errores,
        loading,
        setLoading,
        handleInputChange,
        handleBlur,
        handleSubmit,
        fileInputRef,
        handleDeselectImg
    };
}
