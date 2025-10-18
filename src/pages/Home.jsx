/* eslint-disable react/prop-types */
import { Link } from "../components/Link.jsx";

const i18n = {
    es: {
        title: 'Pagina Principal',
        description: 'Esta es una página de ejemplo para crear un React Router',
        button: 'Ir a Sobre Nosotros'
    },
    en: {
        title: 'Home Page',
        description: 'This is an example page to create a React Router',
        button: 'Go to About Us'
    }
}

const useI18n = (lang) => {
    return i18n[lang] || i18n.en
}

export default function HomePage({ routeParams }) {
    const i18n = useI18n(routeParams.lang ?? 'es')
    const ruta = `/${routeParams.lang}/about`

    return (
        <>
            <h2> {i18n.title} </h2>
            <p>{i18n.description}</p>
            {/*<a href='/about'>Ir a Sobre nosotros (AboutPage)</a>*/}
            <Link to={ruta}>{i18n.button}</Link>
            {/* <button onClick={() => navigate('/about')}>Ir a Sobre nosotros (AboutPage)</button> 6. Esto es mal pero para poder llamar a la función navigateTo y que funcione de momento */}
        </>
    )
}
