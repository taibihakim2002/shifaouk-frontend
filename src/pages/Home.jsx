import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import Categories from "../components/home/Categories";
import Doctors from "../components/home/Doctors";
import FAQ from "../components/home/FAQ";
import Hero from "../components/home/Hero";
import Services from "../components/home/Services";
import Stats from "../components/home/Stats";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <Categories />
      <Doctors />
      <FAQ />
      <Footer />
    </>
  );
}
