export default function Details({ items }) {
  return (
    <section className="ws-section" id="details">
      <div className="ws-sheet-title ws-display">The Details</div>
      <div className="ws-detail-grid">
        {items.map((d) => (
          <div className="ws-detail-card" key={d.label}>
            <div className="ws-detail-time ws-mono">{d.time}</div>
            <div className="ws-detail-label">{d.label}</div>
            <div className="ws-detail-meta">{d.meta}</div>
          </div>
        ))}
      </div>
    </section>
  );
}