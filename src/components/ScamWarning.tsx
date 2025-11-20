import { AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { transformText } from '@/utils/textTransforms';

const ScamWarning = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full bg-destructive/10 border-y border-destructive/20 py-3">
      <div className="container">
        <div className="flex items-center justify-center gap-3">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <p className="text-sm font-semibold text-destructive">
            {transformText(t('warning'), true)}
          </p>
          <AlertTriangle className="h-5 w-5 text-destructive" />
        </div>
      </div>
    </div>
  );
};

export default ScamWarning;
