/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import { EVENTS } from "../utils/consts"

//4. la funcion que cambia cambia la url de  la barra de direcciones y crea un evento y lo va a disparar
export function navigate(path) {
    window.history.pushState({}, '', path) // 4.1. objeto que nos permite cambiar la URL de la pagina pero sin refrescar la pagina.
    const navigationEvent = new Event(EVENTS.PUSHSTATE) // 4.2 crear evento personalizado para avisar a la url que la hemos cambiado
    window.dispatchEvent(navigationEvent) //4.4 Nos falta enviar el evento
}

// NUEVO: 5.
export function Link({ target, to, ...props }) {
    // 5.2
    const handleClick = (event) => {

        // LOS COMANDOS
        const isMainEvent = event.button === 0// 5.2.3 Si el usuario esta pulsando el botón principal del raton
        const isModifiedEvent = event.metaKey || event.ctrlKey || event.altKey || event.shiftKey // 5.2.4 Si el usuario esta pulsando alguna tecla de modificador (ctrl, alt, shift, etc.)
        const isManageableEvent = target === undefined || target === null || target === '_self' // 5.2.5 Si el enlace no tiene target o si el target es _self

        // Navegar a la ruta 'to' si se cumplen las condiciones que no queremos que se navegue de forma normal como dar a botón derecho, abrir en nueva pestaña, etc.
        if (isMainEvent && isManageableEvent && !isModifiedEvent) {
            event.preventDefault() // 5.2.2 Prevenimos el comportamiento por defecto de un enlace, así ya no es 'MPA' sino 'SPA'
            navigate(to) // 5.2.1 le decimos vas a ir a esta página (llamada con el url: to)
            window.scrollTo(0, 0) // Hacemos scroll arriba cada vez que navegamos a una nueva ruta
        }
    }

    return <a onClick={handleClick} href={to} target={target} {...props} /> // 5.1 Los props son los atributos que le pasamos al componente como el className, id, etc.
}