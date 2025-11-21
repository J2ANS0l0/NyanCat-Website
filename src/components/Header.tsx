import { Link } from 'react-router-dom';
import { Moon, Sun, Globe, LogOut } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNyan } from '@/contexts/NyanContext';
import { Button } from '@/components/ui/button';
import { transformText } from '@/utils/textTransforms';
import { useState, useEffect } from 'react';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { isNyanMode } = useNyan();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Obtener email del usuario del localStorage
    const email = localStorage.getItem('nyan-user-email');
    if (email) {
      setUserEmail(email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('nyan-auth');
    localStorage.removeItem('nyan-user-email');
    localStorage.removeItem('nyan-login-time');
    window.location.href = '/login';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-gradient-rainbow">
            {transformText('NYAN CAT 3D', true, isNyanMode)}
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {transformText(t('home'), true, isNyanMode)}
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {transformText(t('about'), true, isNyanMode)}
          </Link>
          <Link
            to="/game"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {transformText(t('game'), true, isNyanMode)}
          </Link>

          {/* Información del usuario y botón de logout */}
          {userEmail && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{userEmail}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="h-8 w-8"
                title="Cerrar sesión"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="flex items-center gap-2 ml-4 border-l border-border pl-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="h-9 w-9"
            >
              <Globe className="h-4 w-4" />
              <span className="sr-only">
                {language === 'en' ? 'ES' : 'EN'}
              </span>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;