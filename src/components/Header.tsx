import { Link } from 'react-router-dom';
import { Moon, Sun, Globe } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { transformText } from '@/utils/textTransforms';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-gradient-rainbow">
            {transformText('NYAN CAT 3D', true)}
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {transformText(t('home'), true)}
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {transformText(t('about'), true)}
          </Link>
          <Link
            to="/game"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {transformText(t('game'), true)}
          </Link>

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
