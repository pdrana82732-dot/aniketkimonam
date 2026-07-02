export default function Hero() {
  return (
    <header className="ws-hero" id="top">
      <div className="ws-hero-stamp ws-mono">
        14·02·2027
        <br />
        BLR · IND
      </div>

      {/* the one signature touch: a wax-seal badge marking the day itself */}
      <div className="ws-seal" aria-hidden="true">
        <span>Just</span>
        <span>Married</span>
      </div>

      <div className="ws-hero-eyebrow ws-mono">Together with their families</div>
      <h1 className="ws-hero-names">
        <span>
          Vimal <span className="ws-hero-amp">&amp;</span>
        </span>
        <span>Ayushi</span>
      </h1>
      <div className="ws-hero-meta ws-mono">
        <span>14 February 2027</span>
        <span>·</span>
        <span>The Garden Court, Bengaluru</span>
      </div>
    </header>
  );
}