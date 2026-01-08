import Header from "./components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import OpeningHours from "@/components/OpeningHours";
import FollowUs from "@/components/FollowUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import './App.css'

function App() {

  return (
    <>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <Services />
          <OpeningHours />
          <FollowUs />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
