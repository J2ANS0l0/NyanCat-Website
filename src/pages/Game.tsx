import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { transformText, setNyanMode, getNyanMode } from '@/utils/textTransforms';
import NyanCat3D from '@/components/NyanCat3D';
import ScoreDisplay from '@/components/ScoreDisplay';
import ScamWarning from '@/components/ScamWarning';

const Game = () => {
  const { t } = useLanguage();
  const [isNyanMode, setIsNyanMode] = useState(false);

  const toggleNyanMode = () => {
    const newMode = !isNyanMode;
    setIsNyanMode(newMode);
    setNyanMode(newMode);
    // Force re-render by updating state
    window.location.reload();
  };

  return (
    <div className="flex flex-col">
      <ScamWarning />
      
      <section className="py-20 min-h-screen cosmic-stars">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-gradient-rainbow">
              {transformText(t('experience'), true)}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('controlDescription')}
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={toggleNyanMode}
                variant={isNyanMode ? 'default' : 'outline'}
                className="font-bold"
              >
                {isNyanMode ? 'NYAN NYAN NYAN' : 'ACTIVATE NYAN MODE'}
              </Button>
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            <NyanCat3D />
          </div>

          <div className="max-w-2xl mx-auto">
            <ScoreDisplay />
          </div>

          <div className="max-w-4xl mx-auto bg-card/80 backdrop-blur rounded-lg p-8 border border-border">
            <h3 className="text-2xl font-bold mb-4 text-center text-gradient-rainbow">
              {transformText('CONTROLS', true)}
            </h3>
            <ul className="space-y-2 text-center text-muted-foreground">
              <li>🖱️ Click and drag to rotate the view</li>
              <li>🔍 Scroll to zoom in/out</li>
              <li>👆 Click on Nyan Cat to interact</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Game;
