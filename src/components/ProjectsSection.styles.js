import styled, { keyframes } from "styled-components";

/* =========================
   Animations
========================= */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const popUp = keyframes`
  0% { transform: scale(0.88); opacity: 0; }
  70% { transform: scale(0.98); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

/* =========================
   Layout
========================= */

export const SectionContainer = styled.section`
  padding: 6rem 8vw;
  background: #fafafa;
  color: #3a3a3a;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 2.5rem;
  width: 100%;
  padding-left: 2vw;
  color: #111;
  animation: ${fadeUp} 0.9s ease-out forwards;
`;

export const MajorProjects = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

/* Card */
export const MajorCard = styled.div`
  position: relative;
  width: 45%;
  min-width: 300px;
  min-height: 520px; /* plus de hauteur pour la vidéo */
  background: #fffaf5; /* blanc cassé léger */
  border-radius: 10px;
  padding: 2rem;
  overflow: visible;
  box-sizing: border-box;
  transition: transform 0.35s ease;
`;

/* tag container used when rendering inline SVG+video+label */
export const TagWrapper = styled.div`
  position: absolute;
  width: 180px;
  height: 60px;
  transform-origin: center;
  overflow: visible;
  display: block;
  cursor: pointer;
  z-index: 9999; /* toujours accessible */
  pointer-events: auto;

  &.pop-up { animation: ${popUp} 0.42s cubic-bezier(0.22,1,0.36,1) forwards; }
`;

/* inline svg styles */
export const TagSVG = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  display: block;
  pointer-events: none; /* polygon handles pointer through wrapper */
`;

/* video used inside tag (paper texture) */
export const TagVideo = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: 0.35;
  pointer-events: none;
`;

/* label text over the polygon */
export const TagLabel = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 10px;
  font-weight: 700;
  color: #020079;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
`;

/* Overlay (when an item is active) */
export const ClickOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-radius: 8px;
  z-index: 9000;
  background: rgba(255,255,255,0.96); /* overlay white to avoid seeing card behind */
  box-sizing: border-box;
  animation: fadeIn 0.28s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.995); }
    to { opacity: 1; transform: scale(1); }
  }

  /* video styling inside overlay */
  video {
    width: 90%;
    height: 80%;
    object-fit: cover;
    border-radius: 6px;
  }

  /* simple content styling for tech/case */
  .panel {
    width: 88%;
    max-height: 84%;
    overflow: auto;
  }
  h3 { margin-top: 0; margin-bottom: 0.7rem; }
  ul { margin: 0; padding-left: 1.2rem; }
`;

/* Card inner content */
export const CardContent = styled.div`
  position: relative;
  z-index: 10;
  margin-top: auto;

  h3 { font-size: 1.4rem; margin-bottom: 0.5rem; color: #111; }
  p { font-size: 1rem; color: #333; margin: 0; }
`;
