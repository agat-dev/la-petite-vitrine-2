import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './screens/LandingPage';
import { CGVPage } from './pages/CGV';
import { MentionsLegalesPage } from './pages/MentionsLegales';
import { PolitiqueConfidentialitePage } from './pages/PolitiqueConfidentialite';
import { EcommercePage } from './pages/Ecommerce';
import EspaceClientPage from './pages/espace-client';

function App() {
  return (
    <div className="w-full overflow-x-hidden">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/commande" element={<EcommercePage />} />
          <Route path="/cgv" element={<CGVPage />} />
          <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
          <Route path="/politique_confidentialite" element={<PolitiqueConfidentialitePage />} />
          <Route path="/espace-client" element={<EspaceClientPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;