/* eslint-disable react/prop-types */
import { Link } from '../components/Link.jsx'

console.log('Estamos en AboutPage')

const i18n = {
    es: {
        title: 'Sobre Nosotros',
        description: '¡Hola! Me llamo Carlos y estoy creando un Clone de React Router',
        button: 'Ir a Principal'
    },
    en: {
        title: 'About Us',
        description: 'Hello! My name is Carlos and I am creating a Clone of React Router',
        button: 'Go to Home'
    }
}

const useI18n = (lang) => {
    return i18n[lang] || i18n.en
}

export default function AboutPage({ routeParams }) { // añadimos el routeParams para la internacionalización
    const i18n = useI18n(routeParams.lang ?? 'es') // añadimos el routeParams para la internacionalización

    const ruta = `/${routeParams.lang}`

    return (
        <>
            <h2> {i18n.title} </h2>
            <div>
                <img src='https://pbs.twimg.com/profile_images/1788284810827358208/sXSbjv9r_400x400.jpg' alt='Foto de Carlos' />
                <p>{i18n.description}</p>
            </div>
            {/*<a href='/'>Ir a Principal  (HomePage)</a>*/}
            <Link to={ruta}>{i18n.button}</Link>
            {/* <button onClick={() => navigate('/')}>Ir a Sobre nosotros (HomePage)</button> 7. Esto es mal pero para poder llamar a la función navigateTo y que funcione de momento */}
        </>
    )
}