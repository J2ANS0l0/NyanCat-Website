import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { NyanProvider } from "@/contexts/NyanContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MusicPlayer from "@/components/MusicPlayer"; // ← Agregar esta importación
import Landing from "./pages/Landing";
import About from "./pages/About";
import Game from "./pages/Game";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { useState, useEffect } from "react";

// Componente de ruta protegida
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const authStatus = localStorage.getItem('nyan-auth') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen cosmic-stars flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p>Verificando acceso...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Componente de ruta pública (solo accesible sin login)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const authStatus = localStorage.getItem('nyan-auth') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen cosmic-stars flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <NyanProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <div className="flex flex-col min-h-screen">
                  <Routes>
                    {/* Ruta de Login - pública */}
                    <Route path="/login" element={
                      <PublicRoute>
                        <Login />
                        <MusicPlayer /> {/* Música en login */}
                      </PublicRoute>
                    } />
                    
                    {/* Rutas protegidas */}
                    <Route path="/*" element={
                      <ProtectedRoute>
                        <Header />
                        <main className="flex-1">
                          <Routes>
                            <Route path="/" element={<Landing />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/game" element={<Game />} />
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                        </main>
                        <Footer />
                        <MusicPlayer /> {/* Música en todas las páginas protegidas */}
                      </ProtectedRoute>
                    } />
                  </Routes>
                </div>
              </BrowserRouter>
            </TooltipProvider>
          </NyanProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;