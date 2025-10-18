/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect } from "react"

export default function SearchPage({ routeParams }) {
    useEffect(() => {
        document.title = `En ${routeParams.query}`// para que cambia tambien el titulo de la pestaña de la pagina
    }, [])
    return (
        <h1>Has buscado {routeParams.query}</h1>
    )
}
