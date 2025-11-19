import styled, { keyframes } from "styled-components";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;

const popUp = keyframes`
  0% { transform: scale(0.8) translateY(10px); opacity: 0; }
  70% { transform: scale(0.95) translateY(-2px); opacity: 1; }
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
  align-items: flex-start;
  margin-bottom: 6rem;
  width: 100%;
`;

export const MajorCard = styled.div`
  position: relative;
  width: 45%;
  min-height: 500px; /* hauteur augmentée */
  border-radius: 7px;
  background: white;
  color: #111;
  overflow: visible;
  padding: 2.2rem;

.tag {
  position: absolute;
  z-index: 20;
  font-weight: 700;
  padding: 1rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  letter-spacing: 0.05em;
  transform: scale(0.95);
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: inherit;
    filter: blur(6px);
    z-index: -1;
    opacity: 0.6;
    transition: all 0.3s ease;
  }

  &:hover {
    transform: scale(1.05);
  }
  &:hover::before {
    filter: blur(10px);
    opacity: 0.8;
  }
}

  .tag.pop-up { animation: ${popUp} 1s forwards; }
`;


export const Tag = styled.div`
  position: absolute;
  z-index: 20;
  font-weight: 700;
  padding: 1rem 2rem;
  font-size: 1rem;
  border-radius: 50px;
  cursor: pointer;
  pointer-events: all;
  letter-spacing: 0.05em;
  transform: scale(0.95);
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), background 0.5s ease, color 0.5s ease;
  opacity: 1; /* visible par défaut maintenant */

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: inherit;
    border-radius: inherit;
    filter: blur(6px);
    z-index: -1;
    opacity: 0.6;
    transition: all 0.3s ease;
  }

  &:hover {
    transform: scale(1.05);
  }

  &:hover::before {
    filter: blur(10px);
    opacity: 0.8;
  }

  &.pop-up {
    animation: ${popUp} 1s forwards;
  }

  &.tag-demo.pop-up { animation-delay: 0s; }
  &.tag-tech.pop-up { animation-delay: 0.3s; }
  &.tag-case.pop-up { animation-delay: 0.6s; }
`;

export const CardContent = styled.div`
  position: relative;
  z-index: 5;
  margin-top: auto;

  h3 { font-size: 1.5rem; margin-bottom: 0.5rem; color: #111; }
  p { font-size: 1rem; color: #333; }
`;

export const ClickOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-radius: 12px;
  z-index: 15;
  animation: fade 0.4s ease-out;

  video {
    width: 60%;
    max-height: 60%;
    border-radius: 12px;
    object-fit: cover;
  }

  @keyframes fade {
    from { opacity: 0; transform: scale(0.98); }
    to { opacity: 1; transform: scale(1); }
  }

  @media(max-width: 768px) {
    video { width: 90%; max-height: 50%; }
  }
`;

export const TechStack = styled.div`
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;

  span {
    background: rgba(0,0,0,0.1);
    padding: 0.5rem 0.9rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
    color: #111;
  }
`;

export const CaseStudyText = styled.div`
  padding: 1rem 1.5rem;
  background: rgba(0,0,0,0.05);
  border-radius: 12px;
  font-size: 1rem;
  color: #111;
  max-width: 250px;
  text-align: center;

  @media(max-width: 768px) {
    max-width: 90%;
  }
`;

export const tagPositionsAroundModal = {
  demo: { top: "-2rem", left: "50%", transform: "translateX(-50%)" },
  tech: { top: "50%", left: "-4rem", transform: "translateY(-50%)" },
  case: { top: "50%", right: "-4rem", transform: "translateY(-50%)" },
};
