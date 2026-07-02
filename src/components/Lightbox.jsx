import { useEffect, useCallback } from "react";

export default function Lightbox({ photos, index, onClose, onChange }) {
  const next = useCallback(
    () => onChange((index + 1) % photos.length),
    [index, photos.length, onChange]
  );
  const prev = useCallback(
    () => onChange((index - 1 + photos.length) % photos.length),
    [index, photos.length, onChange]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, onClose]);

  if (index === null) return null;
  const photo = photos[index];

  return (
    <div
      className="ws-lightbox"
      onClick={(e) => {
        if (e.target.classList.contains("ws-lightbox")) onClose();
      }}
    >
      <button className="ws-lb-btn ws-lb-close" onClick={onClose} aria-label="Close">
        &times;
      </button>
      <button className="ws-lb-btn ws-lb-prev" onClick={prev} aria-label="Previous photo">
        &#8249;
      </button>
      <img src={photo.src} alt={photo.caption || `Photo ${photo.frame}`} />
      <button className="ws-lb-btn ws-lb-next" onClick={next} aria-label="Next photo">
        &#8250;
      </button>
      <div className="ws-lb-cap ws-mono">
        FRAME <b>{photo.frame}</b> {photo.caption ? `— ${photo.caption}` : ""}
      </div>
    </div>
  );
}