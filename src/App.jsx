import { useState } from "react";
import Nav from "./components/Nav.jsx";
import FilmstripRail from "./components/FilmstripRail.jsx";
import Hero from "./components/Hero.jsx";
import Story from "./components/Story.jsx";
import Gallery from "./components/Gallery.jsx";
import Lightbox from "./components/Lightbox.jsx";
import Details from "./components/Details.jsx";
import RSVP from "./components/RSVP.jsx";
import Footer from "./components/Footer.jsx";
import photos from "./data/photos.js";
import details from "./data/details.js";

export default function App() {
  const [lbIndex, setLbIndex] = useState(null);

  return (
    <div className="ws-root">
      <div className="ws-grain" />

      <FilmstripRail photos={photos} onSelect={setLbIndex} />

      <div className="ws-main">
        <Nav />
        <Hero />
        <Story />
        <Gallery photos={photos} onSelect={setLbIndex} />
        <Details items={details} />
        <RSVP />
        <Footer />
      </div>

      <Lightbox
        photos={photos}
        index={lbIndex}
        onClose={() => setLbIndex(null)}
        onChange={setLbIndex}
      />
    </div>
  );
}