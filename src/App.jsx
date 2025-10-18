import { lazy, Suspense } from "react" //nos permite importar de forma dinamica los componentes
import { Router } from "./components/Router.jsx"
import { Route } from "./components/Route.jsx"

//import HomePage from "./pages/Home.jsx" // es un import estatico
//import AboutPage from "./pages/About.jsx" // es un import estatico
//import Page404 from "./pages/404.jsx" // es un import estatico
//import SearchPage from "./pages/Search.jsx" // es un import estatico
const LazyAboutPage = lazy(() => import('./pages/About.jsx')) // es un import dinámico, solo se importa cuando se necesite
const LazyHomePage = lazy(() => import('./pages/Home.jsx')) // es un import dinámico, solo se importa cuando se necesite
const LazyPage404 = lazy(() => import('./pages/404.jsx')) // es un import dinámico, solo se importa cuando se necesite
const LazySearchPage = lazy(() => import('./pages/Search.jsx')) // es un import dinámico, solo se importa cuando se necesite
// 4.3. Al final lo tenemos en /utils/consts.js
// const NAVEGATION_EVENT = 'pushstate'

// ===========================================================
// 1_
const routes = [
/**
   * La ruta principal y la de about ahora son dinamicas con el parametro lang
    {
      path: '/',
      Component: HomePage
    },
    {
      path: '/about',
      Component: AboutPage
    },
*/
  {
    path: '/:lang',
    Component: LazyHomePage
  },
  {
    path: '/:lang/about',
    Component: LazyAboutPage
  },
  {
    path: '/search/:query',
    Component: LazySearchPage
  }
]
//===========================================================

function App() {

  return (
    <main>
      {/* {currentPath === '/' && <HomePage />} 2. Crearia un componente que renderice la pagina si es '/' */}
      {/* {currentPath === '/about' && <AboutPage />} 3. Crearia un componente que renderice la pagina si es '/about' */}
      <Suspense fallback={<div>Loading...</div>}> { /* Para poder renderizar el componente de forma dinamica, el lazyAboutPage */}
        <Router routes={routes} defaultComponent={LazyPage404}>
          <Route path='/' Component={LazyHomePage} />
          <Route path='/about' Component={LazyAboutPage} />
        </Router>
      </Suspense>
    </main>
  )
}

export default App
