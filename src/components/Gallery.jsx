export default function Gallery({ photos, onSelect }) {
  return (
    <section className="ws-section" id="gallery">
      <div className="ws-sheet-head">
        <div className="ws-sheet-title ws-display">Contact Sheet</div>
        <div className="ws-sheet-sub">
          Every frame comes from <code>src/data/photos.js</code> — swap in
          your own images and captions there.
        </div>
      </div>
      <div className="ws-contact-sheet">
        {photos.map((p, i) => (
          <div className="ws-cell" key={p.frame} onClick={() => onSelect(i)}>
            <img src={p.src} alt={p.caption || `Photo ${p.frame}`} loading="lazy" />
            <span className="ws-cell-tag ws-mono">{p.frame}</span>
            {p.caption && <span className="ws-cell-cap">{p.caption}</span>}
          </div>
        ))}
      </div>
    </section>
  );
}