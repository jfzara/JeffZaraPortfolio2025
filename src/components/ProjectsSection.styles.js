import styled, { keyframes } from "styled-components";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(0); }
  to { opacity: 1; transform: translateY(0); }
`;

const popUp = keyframes`
  0% { transform: scale(0.8); opacity: 0; }
  70% { transform: scale(0.95); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
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
  min-height: 500px;
  border-radius: 7px;
  background: white;
  color: #111;
  overflow: visible;
  padding: 2.2rem;

  .tag.pop-up { animation: ${popUp} 0.5s forwards; }
`;

export const CardContent = styled.div`
  position: relative;
  z-index: 5;
  margin-top: auto;
  transition: opacity 0.3s ease;

  &.fade-out { opacity: 0; }
  &.fade-in { opacity: 1; }

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

  video {
    width: 95%;
    height: 90%;
    object-fit: cover;
    border-radius: 4px;
  }
`;

export const TagSVG = styled.svg`
  position: absolute;
  cursor: pointer;
  width: 160px;
  height: 60px;
  z-index: 50;
  overflow: visible;

  polygon {
    fill: ${props => props.bg || "#fff"};
    stroke: #000;
    stroke-width: 0.2px;
    transition: all 0.35s ease;
  }

  foreignObject {
    width: 100%;
    height: 100%;
    pointer-events: none;

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      font-weight: bold;
      font-size: 0.85rem;
      color: ${props => props.color || "#020079"};
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  &.pop-up {
    transform: scale(1);
    opacity: 1;
  }

  video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
    pointer-events: none;
    opacity: 0.25;
  }
`;
