// src/pages/Game.tsx
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNyan } from '@/contexts/NyanContext';
import { transformText } from '@/utils/textTransforms';
import NyanCat3D from '@/components/NyanCat3D';
import ScoreDisplay from '@/components/ScoreDisplay';
import ScamWarning from '@/components/ScamWarning';

const Game = () => {
  const { t } = useLanguage();
  const { isNyanMode, toggleNyanMode } = useNyan();

  return (
    <div className="flex flex-col">
      <ScamWarning />
      
      <section className="py-20 min-h-screen cosmic-stars">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-gradient-rainbow">
              {transformText(t('experience'), true, isNyanMode)}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {transformText(t('controlDescription'), false, isNyanMode)}
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

          {/* Componente NyanCat3D - Experiencia de vuelo 3D */}
          <div className="max-w-6xl mx-auto">
            <NyanCat3D height="600px" className="rounded-lg border-2 border-rainbow shadow-2xl" />
          </div>
          
          {/* Controles del juego */}
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-card/80 backdrop-blur rounded-lg p-6 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-center text-gradient-rainbow">
                {transformText('FLIGHT CONTROLS', true, isNyanMode)}
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="font-mono bg-primary/20 px-2 py-1 rounded">W</span>
                  <span>{transformText('Pitch Down', false, isNyanMode)}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-mono bg-primary/20 px-2 py-1 rounded">S</span>
                  <span>{transformText('Pitch Up', false, isNyanMode)}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-mono bg-primary/20 px-2 py-1 rounded">A</span>
                  <span>{transformText('Turn Left', false, isNyanMode)}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-mono bg-primary/20 px-2 py-1 rounded">D</span>
                  <span>{transformText('Turn Right', false, isNyanMode)}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-mono bg-primary/20 px-2 py-1 rounded">SHIFT</span>
                  <span>{transformText('Turbo Boost', false, isNyanMode)}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-mono bg-primary/20 px-2 py-1 rounded">V</span>
                  <span>{transformText('Change Camera View', false, isNyanMode)}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-mono bg-primary/20 px-2 py-1 rounded">R</span>
                  <span>{transformText('Reset Position', false, isNyanMode)}</span>
                </li>
              </ul>
            </div>

            <div className="bg-card/80 backdrop-blur rounded-lg p-6 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-center text-gradient-rainbow">
                {transformText('GAME FEATURES', true, isNyanMode)}
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="text-rainbow font-bold">RAINBOW</span>
                  <span>{transformText('Rainbow Particle Trail', false, isNyanMode)}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-rainbow font-bold">MOTION</span>
                  <span>{transformText('Motion Blur Effects', false, isNyanMode)}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-rainbow font-bold">STARS</span>
                  <span>{transformText('Starry Space Background', false, isNyanMode)}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-rainbow font-bold">TRACKING</span>
                  <span>{transformText('Real-time Position Tracking', false, isNyanMode)}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-rainbow font-bold">CAMERA</span>
                  <span>{transformText('Multiple Camera Angles', false, isNyanMode)}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-rainbow font-bold">PHYSICS</span>
                  <span>{transformText('Smooth Flight Physics', false, isNyanMode)}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Score Display */}
          <div className="max-w-2xl mx-auto">
            <ScoreDisplay />
          </div>

          {/* Tips adicionales */}
          <div className="max-w-3xl mx-auto bg-card/80 backdrop-blur rounded-lg p-6 border border-border">
            <h3 className="text-2xl font-bold mb-4 text-center text-gradient-rainbow">
              {transformText('PRO TIPS', true, isNyanMode)}
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-muted-foreground">
              <div>
                <h4 className="font-semibold text-primary mb-2">{transformText('For Beginners', false, isNyanMode)}</h4>
                <ul className="space-y-1 text-sm">
                  <li>{transformText('Start with gentle movements', false, isNyanMode)}</li>
                  <li>{transformText('Use R to reset if you get lost', false, isNyanMode)}</li>
                  <li>{transformText('Try both camera views with V', false, isNyanMode)}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2">{transformText('For Experts', false, isNyanMode)}</h4>
                <ul className="space-y-1 text-sm">
                  <li>{transformText('Combine Shift turbo with sharp turns', false, isNyanMode)}</li>
                  <li>{transformText('Master the camera switching mid-flight', false, isNyanMode)}</li>
                  <li>{transformText('Create complex flight patterns', false, isNyanMode)}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Game;