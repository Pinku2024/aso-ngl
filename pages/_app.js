import "../public/assets/styles/normalize.css";
import "../public/assets/styles/webflow.css";
import "../public/assets/styles/pricing.css";
import "../public/assets/styles/audit.css";
import "../public/assets/styles/random.css";
import "../public/assets/styles/style.css";
import { RefsProvider } from '../context/RefsContext';
export default function App({ Component, pageProps }) {
  return( 
  <RefsProvider>
  <Component {...pageProps} />
</RefsProvider>

)}
