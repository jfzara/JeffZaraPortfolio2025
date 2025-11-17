// src/components/ProjectModal.jsx
import React from "react";
import styled from "styled-components";

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {project.video && (
          <video src={project.video} autoPlay loop muted playsInline />
        )}
        <h2>{project.title}</h2>
        <p>{project.description}</p>
        <CloseButton onClick={onClose}>Fermer</CloseButton>
      </ModalContent>
    </Overlay>
  );
}

// ==================== STYLES ====================
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #111;
  padding: 2rem;
  border-radius: 1.5rem;
  max-width: 600px;
  width: 90%;
  color: #fff;
  text-align: center;

  video {
    width: 100%;
    border-radius: 1rem;
    margin-bottom: 1rem;
  }
`;

const CloseButton = styled.button`
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  background: #00fff0;
  border: none;
  border-radius: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;
