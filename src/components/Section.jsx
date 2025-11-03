import React from "react";

export default function Section({ title, content, gradient, onBack }) {
  return (
    <section
      className="section"
      style={{ background: gradient }}
    >
      <div className="section-content">
        <h1>{title}</h1>
        <p>{content}</p>
        <button className="back-btn" onClick={onBack}>
          ← Retour
        </button>
      </div>
    </section>
  );
}