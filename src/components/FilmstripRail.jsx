import React from "react";

export default function FilmstripRail({ photos, onSelect }) {
  return (
    <nav className="ws-rail" aria-label="Photo filmstrip navigation">
      {photos.map((p, i) => (
        <React.Fragment key={p.frame}>
          <div className="ws-sprocket-row">
            <span className="ws-sprocket" />
            <span className="ws-sprocket" />
          </div>
          <div
            className="ws-rail-frame"
            onClick={() => onSelect(i)}
            title={p.caption || `Frame ${p.frame}`}
          >
            <img src={p.src} alt="" />
            <span className="ws-rail-num ws-mono">{p.frame}</span>
          </div>
        </React.Fragment>
      ))}
      <div className="ws-sprocket-row">
        <span className="ws-sprocket" />
        <span className="ws-sprocket" />
      </div>
    </nav>
  );
}