import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

/* === Animations légères === */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const SectionContainer = styled.section`

  padding: 6rem 8vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fafafa;
  color: #3a3a3a;
`;

export const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 4rem;
  text-align: left;
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
  margin-bottom: 6rem;
  width: 100%;
`;

export const MajorCard = styled.div`
  position: relative;
  width: 45%;
  height: 300px;
  border-radius: 2rem;
  background: ${(props) => props.color};
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  transform: translateY(0);
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);

  .overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.25);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 15px 45px rgba(0,0,0,0.25);

    .overlay {
      opacity: 1;
    }
  }

  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const CardContent = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  z-index: 2;
  color: white;
  animation: ${fadeUp} 1.2s ease-out forwards;

  h3 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.1rem;
    max-width: 90%;
  }
`;

export const MinorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 2rem;
  width: 100%;
`;

export const MinorCard = styled.div`
  background: ${(props) => props.color};
  height: 160px;
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
  letter-spacing: 0.05em;
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  cursor: pointer;
  transition: transform 0.4s ease, box-shadow 0.4s ease;

  &:hover {
    transform: translateY(-6px) scale(1.03);
    box-shadow: 0 10px 25px rgba(0,0,0,0.25);
  }
`;
