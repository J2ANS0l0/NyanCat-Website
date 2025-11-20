import { useState, useEffect } from 'react';
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { transformText } from '@/utils/textTransforms';
import { toast } from 'sonner';

const ScoreDisplay = () => {
  const [seconds, setSeconds] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 0.1);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleShare = () => {
    const message = `${t('nyaned')} ${seconds.toFixed(1)} ${t('seconds')}! 🌈`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Nyan Cat 3D Score',
        text: message,
      }).catch(() => {
        copyToClipboard(message);
      });
    } else {
      copyToClipboard(message);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Score copied to clipboard!');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-lg animate-pulse-glow">
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-bold text-gradient-rainbow">
          {transformText(`${t('nyaned')} ${seconds.toFixed(1)} ${t('seconds')}`, true)}
        </h3>
        <Button
          onClick={handleShare}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
        >
          <Share2 className="mr-2 h-4 w-4" />
          {transformText(t('shareScore'), true)}
        </Button>
      </div>
    </div>
  );
};

export default ScoreDisplay;
