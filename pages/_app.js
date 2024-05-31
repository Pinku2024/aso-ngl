import "../public/assets/styles/normalize.css"
import "../public/assets/styles/webflow.css"
import "../public/assets/styles/pricing.css"
import "../public/assets/styles/audit.css"
import "../public/assets/styles/random.css"
import "../public/assets/styles/style.css"
import { AppSelectProvider } from "../context/EventContext"
import { CountryProvider } from "../context/CountryContext"

export default function App({ Component, pageProps }) {
  return (
    <AppSelectProvider>
      <CountryProvider>
        <Component {...pageProps} />
      </CountryProvider>
    </AppSelectProvider>
  )
}
