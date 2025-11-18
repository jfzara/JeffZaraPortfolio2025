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
  animation: ${fadeUp} 1s ease-out forwards;
`;

export const MajorProjects = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  justify-content: center;
  width: 100%;
`;

export const MajorCard = styled.div`
  position: relative;
  width: 45%;
  height: 330px;
  border-radius: 2px;
  background: white;
  color: #111;
  overflow: visible;
  padding: 2.2rem;

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

  .tag {
    position: absolute;
    z-index: 2;
    background: #00000000;
    color: transparent;
    font-weight: 700;
    padding: 1rem 2rem;
    font-size: 1rem;
    border-radius: 50px;
    cursor: pointer;
    pointer-events: all;
    letter-spacing: 0.05em;
    transform: scale(0.95);
    transition: transform 0.6s cubic-bezier(0.22,1,.36,1),
                clip-path 0.8s cubic-bezier(0.22,1,.36,1),
                background 0.7s ease,
                color 0.7s ease;
    clip-path: polygon(25% 0%, 75% 5%, 95% 45%, 70% 85%, 30% 95%, 5% 50%);
  }

  .tag.pop-up {
    animation: ${popUp} 1s forwards;
  }

  .tag-demo.pop-up { animation-delay: 0s; }
  .tag-tech.pop-up { animation-delay: 0.3s; }
  .tag-case.pop-up { animation-delay: 0.6s; }

  .tag:hover {
    transform: scale(1.08) translateY(-3px);
    clip-path: polygon(20% 5%, 80% 0%, 100% 50%, 75% 95%, 25% 85%, 0% 50%);
    transition: transform 0.4s cubic-bezier(0.68,-0.55,0.27,1.55),
                clip-path 0.6s cubic-bezier(0.22,1,.36,1);
  }
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
