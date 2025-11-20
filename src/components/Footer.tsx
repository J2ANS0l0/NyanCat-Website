import { useLanguage } from '@/contexts/LanguageContext';
import { transformText } from '@/utils/textTransforms';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="w-full border-t border-border/40 bg-card/50 backdrop-blur">
      <div className="container py-8">
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            {transformText(t('copyright'))}
          </p>
          <p className="text-sm text-muted-foreground">
            Copyright © 2025 Nyan Cat 3D | {t('contact')}: J2AN.S0l0@gmail.com
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
