import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './screens/LandingPage';
import { CGVPage } from './pages/CGV';
import { MentionsLegalesPage } from './pages/MentionsLegales';
import { PolitiqueConfidentialitePage } from './pages/PolitiqueConfidentialite';
import { EcommercePage } from './pages/Ecommerce';
import EspaceClientLogin from './pages/EspaceClientLogin';
import EspaceClientDashboard from './pages/espace-client-dashboard';

function App() {
  return (
    <div className="w-full overflow-x-hidden">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/commande" element={<EcommercePage />} />
          <Route path="/cgv" element={<CGVPage />} />
          <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialitePage />} />
          <Route path="/espace-client-login" element={<EspaceClientLogin />} />
          <Route path="/espace-client-dashboard" element={<EspaceClientDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;