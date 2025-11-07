// src/components/ProjectCarouselSection.jsx
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

// 🔹 Animation "breathing" (fond mouvant léger)
const breathing = keyframes`
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
`;

// 🔹 Animation de fade / slide des cartes
const fadeSlide = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// 🔹 Section principale
const Section = styled.section`
  height: 100vh;
  padding: 6vw 8vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(150deg, #0b1d17, #133d33, #0b1d17);
  background-size: 200% 200%;
  animation: ${breathing} 20s ease-in-out infinite;
  color: #fff;
  font-family: "Space Grotesk", sans-serif;
  position: relative;
  overflow: hidden;
`;

// 🔹 Titre principal
const Title = styled.h2`
  font-size: clamp(2rem, 6vw, 4rem);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 3rem;
  text-align: center;
  background: linear-gradient(90deg, #00ffc3, #00b3ff, #00ffc3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

// 🔹 Carousel container
const Carousel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  max-width: 1000px;
  overflow: hidden;
`;

// 🔹 Wrapper interne pour les slides
const SlidesWrapper = styled.div`
  display: flex;
  transition: transform 0.8s cubic-bezier(0.6, 0, 0.2, 1);
  transform: ${({ index }) => `translateX(-${index * 100}%)`};
`;

// 🔹 Carte de projet
const Card = styled.div`
  min-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeSlide} 0.8s ease forwards;
  opacity: 0.95;
`;

const CardInner = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(14px);
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.4);
  width: 85%;
  max-width: 700px;
  text-align: center;
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 12px 60px rgba(0, 255, 204, 0.25);
    background: rgba(255, 255, 255, 0.15);
  }
`;

// 🔹 Image du projet
const ProjectImage = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-radius: 14px;
  margin-bottom: 1.5rem;
`;

// 🔹 Texte
const ProjectTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #ddd;
  margin-bottom: 1.5rem;
`;

// 🔹 Bouton d’action
const Button = styled.a`
  display: inline-block;
  padding: 0.8rem 1.8rem;
  border-radius: 4px;
  text-transform: uppercase;
  font-weight: 700;
  text-decoration: none;
  color: #000;
  background: linear-gradient(90deg, #00ffc3, #00b3ff);
  transition: all 0.4s ease;

  &:hover {
    background: linear-gradient(90deg, #00b3ff, #00ffc3);
    transform: translateY(-2px);
  }
`;

// 🔹 Contrôles du carousel
const Controls = styled.div`
  margin-top: 2.5rem;
  display: flex;
  gap: 1.5rem;
  justify-content: center;
`;

const Dot = styled.button`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: none;
  background: ${({ active }) =>
    active
      ? "linear-gradient(145deg,#00ffc3,#00b3ff)"
      : "rgba(255,255,255,0.25)"};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(145deg,#00ffff,#0099ff);
  }
`;


// 🔹 Composant principal
export default function ProjectCarouselSection() {
  const projects = [
    {
      title: "Recettes Créatives",
      description:
        "Une application React permettant d’ajouter, filtrer et gérer des recettes personnalisées, avec authentification JWT et base de données MongoDB.",
      image: "/assets/projects/recettes.jpg",
      link: "#",
    },
    {
      title: "Portfolio Interactif",
      description:
        "Ce portfolio dynamique combine animations fluides, blur glassmorphism et design réactif, propulsé par React et styled-components.",
      image: "/assets/projects/portfolio.jpg",
      link: "#",
    },
    {
      title: "API Express Backend",
      description:
        "Développement d’une API Node.js complète avec validation, authentification, et gestion d’erreurs propre, prête pour déploiement cloud.",
      image: "/assets/projects/api.jpg",
      link: "#",
    },
  ];

  const [index, setIndex] = useState(0);

  // 🔹 Navigation automatique (optionnelle)
  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % projects.length),
      6000
    );
    return () => clearInterval(timer);
  }, [projects.length]);

  return (
    <Section id="projects">
      <Title>Mes Projets</Title>

      <Carousel>
        <SlidesWrapper index={index}>
          {projects.map((p, i) => (
            <Card key={i}>
              <CardInner>
                <ProjectImage src={p.image} alt={p.title} />
                <ProjectTitle>{p.title}</ProjectTitle>
                <ProjectDescription>{p.description}</ProjectDescription>
                <Button href={p.link} target="_blank" rel="noreferrer">
                  Voir le projet
                </Button>
              </CardInner>
            </Card>
          ))}
        </SlidesWrapper>
      </Carousel>

      <Controls>
        {projects.map((_, i) => (
          <Dot key={i} active={i === index} onClick={() => setIndex(i)} />
        ))}
      </Controls>
    </Section>
  );
}
