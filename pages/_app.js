import "../styles/globals.css";
import Footer from "../components/Footer";
import GlobalNavigation from '../components/GlobalNavigationBar'

function MyApp({ Component, pageProps }) {
  return (
    <div>
    <GlobalNavigation/>
      <div className="py-8 px-5 w-full">
        <Component {...pageProps} />
      </div>
      <Footer/>
    </div>
  );
}

export default MyApp;
