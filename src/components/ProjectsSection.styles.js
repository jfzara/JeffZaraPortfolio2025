import styled, { keyframes } from "styled-components";

/* == Animations == */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;

const popUp = keyframes`
  0% { transform: scale(0.6) translateY(10px); opacity: 0; }
  70% { transform: scale(1.1) translateY(-2px); opacity: 1; }
  100% { transform: scale(1) translateY(0); opacity: 1; }
`;

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
  margin-bottom: 4rem;
  width: 100%;
  padding-left: 2vw;
  color: #111;
  position: relative;
  animation: ${fadeUp} 1s ease-out forwards;
`;

export const MajorProjects = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  justify-content: center;
  margin-bottom: 6rem;
  width: 100%;
`;

export const MajorCard = styled.div`
  position: relative;
  width: 45%;
  height: 330px;
  border-radius: 2px;

  background: white;
  color: #111;
  overflow: visible; /* important pour dépasser les tags */
  padding: 2.2rem;

  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  transition: transform 0.6s cubic-bezier(.22,1,.36,1),
              box-shadow 0.6s ease;

  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 18px 45px rgba(0,0,0,0.18);
  }

  .project-video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    pointer-events: none;
    transform: scale(1.08);
    filter: blur(6px) brightness(1.1);
    transition: opacity 0.5s ease, filter 0.5s ease, transform 0.6s ease;
  }

  /* apparaitre séquentiellement et pop-up */
 .tag {
  position: absolute;
  background: #bbbbbbff;
  color: black;
  padding: 0.4rem 1rem;
  font-size: 0.85rem;
  border: 0.2px solid white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.18);
  opacity: 0;
  transform: scale(0.6) translateY(10px);
  cursor: pointer;
  pointer-events: all;
  letter-spacing: 0.04em;
  transition: clip-path 0.6s ease-in-out, transform 0.35s ease, box-shadow 0.35s ease;

  &:hover {
    transform: scale(1.05) translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.25);
  }
}

  &:hover .tag {
    opacity: 1;
    animation: ${popUp} 0.35s forwards;
  }

&.tag-demo { animation-delay: 0.05s; }
&.tag-tech { animation-delay: 0.15s; }
&.tag-case { animation-delay: 0.25s; }
`;

export const CardContent = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  z-index: 2;
  color: white;
  animation: ${fadeUp} 1.2s ease-out forwards;

  h3 { font-size: 1.9rem; margin-bottom: 0.4rem; }
  p { font-size: 1.1rem; max-width: 90%; opacity: 0.95; }
`;

export const MinorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 2rem;
  width: 100%;
`;

export const MinorCard = styled.div`
  background: ${(p) => p.color};
  height: 160px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
  font-weight: 600;
  font-size: 1.2rem;
  letter-spacing: 0.05em;

  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  cursor: pointer;
  transition: 0.4s ease;

  &:hover {
    transform: translateY(-6px) scale(1.04);
    box-shadow: 0 12px 28px rgba(0,0,0,0.2);
  }
`;
