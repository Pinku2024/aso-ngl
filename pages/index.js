import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "next/head";
import Audit from "../components/Audit";
import Solutions from "../components/Solutions";
import Testimonials from "../components/Testimonials";
import OurPricing from "../components/OurPricing";
import ASOTools from "../components/ASOTools";
import AppIntelligence from "../components/AppIntelligence";
import Other from "../components/Other";
import ContactForm from "../components/ContactForm";

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
        <Solutions />
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
