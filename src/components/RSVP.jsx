import { useState } from "react";

export default function RSVP() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: replace with a real endpoint — e.g. Formspree, a Google Form
    // action URL, or your own API route. This just flips local state.
    setSent(true);
  };

  return (
    <section className="ws-section" id="rsvp">
      <div className="ws-sheet-title ws-display">RSVP</div>
      <form className="ws-rsvp" onSubmit={handleSubmit}>
        <div className="ws-field">
          <label htmlFor="name">Full name</label>
          <input id="name" required />
        </div>
        <div className="ws-field">
          <label htmlFor="attending">Will you attend?</label>
          <select id="attending">
            <option>Joyfully accepts</option>
            <option>Regretfully declines</option>
          </select>
        </div>
        <div className="ws-field">
          <label htmlFor="guests">Number of guests</label>
          <input id="guests" type="number" min="1" max="6" defaultValue={1} />
        </div>
        <div className="ws-field">
          <label htmlFor="note">Message for the couple (optional)</label>
          <textarea id="note" />
        </div>
        <button className="ws-submit" type="submit">
          Send RSVP
        </button>
        <p className="ws-rsvp-note">
          {sent
            ? "Thanks! (Demo only — connect this form to Formspree, a Google Form, or your own backend to actually collect responses.)"
            : "This form doesn't send anywhere yet — it needs to be wired to a real service."}
        </p>
      </form>
    </section>
  );
}