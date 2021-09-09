import "../styles/globals.css";
import Footer from "../components/Footer";
import GlobalNavigation from '../components/GlobalNavigationBar'

function MyApp({ Component, pageProps }) {
  return (
    <div className='w-full'>
    <GlobalNavigation/>
        <Component {...pageProps} />
      <Footer/>
    </div>
  );
}

export default MyApp;
