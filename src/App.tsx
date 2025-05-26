// Modifié le 2025-05-26 13:34 - Refactorisation du code et ajout de commentaires
// Modifié le 2025-05-23 15:48 - Petits ajustements dans la structure
// Modifié le 2025-05-23 15:19 - Test du layout avec Header et Footer
// Modifié le 2025-05-23 09:37 - Ajout des fichiers main.tsx et App.tsx
// Modifié le 2025-05-25 13:34 - Refactorisation du code et ajout de commentaires
// Modifié le 2025-05-22 15:48 - Petits ajustements dans la structure
// Modifié le 2025-05-22 15:19 - Test du layout avec Header et Footer
// Modifié le 2025-05-22 09:37 - Ajout des fichiers main.tsx et App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { ProjectsPage } from './pages/ProjectsPage';
import { Contact } from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark text-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;