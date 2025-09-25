import { Provider } from 'react-redux'
import { store } from '../redux/store'
import Navbar from '../components/Navbar'

export default function App({ Component, pageProps }){
  return (
    <Provider store={store}>
      <Navbar />
      <main style={{padding:20}}>
        <Component {...pageProps} />
      </main>
    </Provider>
  )
}
