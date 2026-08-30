import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import ScrollToTop from './components/ScrollToTop';
import { LanguageProvider } from '@/lib/LanguageContext';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import FreeJefry from '@/pages/FreeJefry';
import Services from '@/pages/Services';
import ServiceDetail from '@/pages/ServiceDetail';
import Contact from '@/pages/Contact';
import ViewMensajes from '@/pages/ViewMensajes';

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <LanguageProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/free-jefry" element={<FreeJefry />} />
              <Route path="/desarrollos" element={<Services />} />
              <Route path="/desarrollos/:slug" element={<ServiceDetail />} />
              <Route path="/contacto" element={<Contact />} />
            </Route>
            <Route path="/view-mensajes" element={<ViewMensajes />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </LanguageProvider>
      <Toaster />
    </QueryClientProvider>
  )
}

export default App
