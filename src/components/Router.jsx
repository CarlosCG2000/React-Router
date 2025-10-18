/* eslint-disable react-hooks/immutability */
/* eslint-disable react/prop-types */
import { EVENTS } from "../utils/consts"
import { Children, useEffect, useState } from "react"
import { match } from "path-to-regexp" // para rutas de forma dinamica y sencillo de usar sin tener que hacer
import { getCurrentPath } from "../utils/getCurrentPath"

// 2_
export function Router({ children, routes = [], defaultComponent: DefaultComponent = () => null }) {
    //defaultComponent porque si no se puede renderizar niguna ruta por defecto que renderice esta

    // 1. Crearia un estado que se inicialice con el valor de la ruta actual (window.location.pathname)
    const [currentPath, setCurrentPath] = useState(getCurrentPath()) // 1.1. getCurrentPath() es una funcion que nos devuelve la ruta actual

    // 5. Hacemos un useEffets para escuchar el evento que hemos creado y ver cuando cambia y solo se va ejecutar la primera vez que se renderice
    useEffect(() => {
        const onLocationChange = () => {     // 5.1. se tiene que ejectiutar cada que tenamos el NAVEGATION_EVENT
            setCurrentPath(window.location.pathname)
        }

        window.addEventListener(EVENTS.PUSHSTATE, onLocationChange) // 5.2. escuchar el evento de cambio de url
        window.addEventListener(EVENTS.POPSTATE, onLocationChange) // 8. El popstate es el evento que esta el navegador lanzando cuando le das al boton de ir atras

        return () => {
            window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange) // 5.3. limpiar el evento
        }

    }, [])

    let routeParams = {} //# 1. Crear un objeto vacio para los parametros de la ruta

    // ============== LO EXTRAEMOS LEYENDO LAS PROPS DEL CHILDREN ===================
    // añadir las rutas que vienen del children componente <Route />
    const routesFromChildren = Children.map(children, ({ props, type }) => { // Children biene de react que te permite iterar lo diferentes hijos (children) de un componente. Estraemos del children las props y el type
        const { name } = type // del type sacar el name para asegurarnos que sea Route
        const isRoute = name === 'Route'
        //console.log({ props, type })

        if (!isRoute) return null
        return props// { path: props.path, Component: props.Component } // devolvemos un objeto con la ruta y el componente
    })

    //console.log(routesFromChildren)
    // tenemos que concatenar las rutas que nos estan pasando por props con las rutas que nos estan pasando por children
    const routesToUse = routes.concat(routesFromChildren).filter(Boolean) // Concatenamos las rutas que nos pasan por props con las rutas que nos pasan por children

    // ==============================================================================
    const Page = /*routes*/ routesToUse.find(({ path }) => {
        if (path === currentPath) return true  //# 2. Buscar la ruta actual en el array de rutas

        // PARA PODER DETECTAR RUTAS DINAMICAS
        const matcherUrl = match(path, { decode: decodeURIComponent }) // # 3. Decodificar la ruta
        const matched = matcherUrl(currentPath)
        if (!matched) return false // # 4. Si no hay coincidencia, devolver false
        routeParams = matched.params // # 4.1 Guardar los parametros de la ruta en routeParams, como { 'query': 'javascript' } igual a /search/javascript
        return true // # 5
    }

    )?.Component || DefaultComponent
    // 2.1_ Buscar la ruta actual en el array de rutas y si no la encuentra renderizar el componente por defecto. Seria comparando  path: '/', con window.location.pathname, una vez lo encontramos renderizamos el componente que le corresponde (.Component) que ser , Component: HomePage

    return <Page routeParams={routeParams} /> // 2.2_ renderizamos el componente // # 6
}