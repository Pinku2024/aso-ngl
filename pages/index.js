import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Audit from "../components/Audit";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import OurPricing from "../components/OurPricing";
import ASOTools from "../components/ASOTools";
import AppIntelligence from "../components/AppIntelligence";
import Other from "../components/Other";
import ContactForm from "../components/ContactForm";
import Clients from "../components/Clients";
// import AppSearch from "../components/elements/AppSearch";
export default function Home() {
  return (
    <>
      <Head>
        <title>
          App Store Optimization Services | ASO Agency | ASO Company India
        </title>
        <meta
          content="App Store Optimization (ASO) is a strategy for increasing an app's visibility in app stores. You can rank higher and drive more downloads by using optimal keywords, useful images, and localized descriptions."
          name="description"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Header />
        <Audit /> 
        <Clients />
        {/* <AppSearch /> */}
        <Services />
        <Testimonials />
        <OurPricing />
        <ASOTools />
        <AppIntelligence />
        <Other />
        <ContactForm />
        <Footer />
      </main>
    </>
  );
}
