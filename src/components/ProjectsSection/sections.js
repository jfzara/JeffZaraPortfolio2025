import ProjectsSection from "./components/ProjectsSection/ProjectsSection";

export const sections = [
  { title: "Accueil" },
  { title: "À propos" },
  {
    title: "Projets",
    component: <ProjectsSection />  // 🔥 parfait maintenant
  },
  { title: "Contact" }
];