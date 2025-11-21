import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNyan } from '@/contexts/NyanContext';
import { transformText } from '@/utils/textTransforms';
import NyanCat3D from '@/components/NyanCat3D';
import ScoreDisplay from '@/components/ScoreDisplay';
import ScamWarning from '@/components/ScamWarning';
import { useState, useEffect } from 'react';

// Datos falsos para el ranking mundial (tiempos en segundos)
const fakeGlobalRanking = [
  { rank: 1, player: 'NyanMaster', time: 367.8, country: '🇺🇸' },
  { rank: 2, player: 'RainbowRider', time: 342.1, country: '🇯🇵' },
  { rank: 3, player: 'SpaceExplorer', time: 315.4, country: '🇩🇪' },
  { rank: 4, player: 'CosmicCat', time: 298.7, country: '🇬🇧' },
  { rank: 5, player: 'GalaxyGamer', time: 276.3, country: '🇨🇦' },
  { rank: 6, player: 'StarChaser', time: 254.9, country: '🇦🇺' },
  { rank: 7, player: 'NebulaNinja', time: 231.2, country: '🇫🇷' },
  { rank: 8, player: 'UniversePro', time: 215.6, country: '🇰🇷' },
  { rank: 9, player: 'AstroPilot', time: 198.4, country: '🇧🇷' },
  { rank: 10, player: 'QuantumFlyer', time: 176.9, country: '🇪🇸' },
];

const Game = () => {
  const { t } = useLanguage();
  const { isNyanMode, toggleNyanMode } = useNyan();
  const [nyanTime, setNyanTime] = useState(0);

  // Contador automático del tiempo en la página
  useEffect(() => {
    const startTime = Date.now();
    
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const timeInSeconds = (currentTime - startTime) / 1000;
      setNyanTime(timeInSeconds);
    }, 100); // Actualizar cada 100ms para mayor precisión

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Formatear tiempo en formato MM:SS.ms
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const milliseconds = Math.floor((time % 1) * 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds}`;
  };

  // Calcular el ranking del usuario basado en su tiempo actual
  const getUserRank = () => {
    const userTime = nyanTime;
    // Contar cuántos jugadores tienen mejor tiempo que el usuario
    const betterPlayers = fakeGlobalRanking.filter(player => player.time > userTime).length;
    return betterPlayers + 1; // +1 porque el ranking empieza en 1
  };

  const userRank = getUserRank();

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

          {/* Contador de tiempo Nyan y Ranking */}
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Tu tiempo Nyan AUTOMÁTICO */}
            <div className="bg-card/80 backdrop-blur rounded-lg p-6 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-center text-gradient-rainbow">
                {transformText('YOUR NYAN TIME', true, isNyanMode)}
              </h3>
              
              <div className="text-center space-y-4">
                <div className="text-4xl font-mono font-bold text-rainbow bg-black/30 p-4 rounded-lg border border-rainbow/30">
                  {formatTime(nyanTime)}
                </div>
                
                <div className="space-y-2">
                  <p className="text-lg text-muted-foreground">
                    {isNyanMode 
                      ? 'NYAN NYAN NYAN NYAN NYAN'
                      : 'YOU\'VE NYANED FOR'
                    } <span className="font-bold text-primary">{nyanTime.toFixed(1)} SECONDS</span>
                  </p>
                  
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <span className="bg-primary/20 px-2 py-1 rounded text-primary font-bold">
                      RANK #{userRank}
                    </span>
                    <span className="text-muted-foreground">
                      {userRank <= 10 ? 'TOP 10!' : `of ${fakeGlobalRanking.length + 1} players`}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  {isNyanMode 
                    ? 'TIME NYAN AUTOMATIC NYAN'
                    : 'Time updates automatically while you explore'
                  }
                </div>
              </div>
            </div>

            {/* Ranking Mundial */}
            <div className="bg-card/80 backdrop-blur rounded-lg p-6 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-center text-gradient-rainbow">
                {transformText('GLOBAL RANKING', true, isNyanMode)}
              </h3>
              
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {fakeGlobalRanking.map((player) => (
                  <div
                    key={player.rank}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      player.rank <= 3 
                        ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30' 
                        : 'bg-background/50 border-border'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        player.rank === 1 ? 'bg-yellow-500 text-white' :
                        player.rank === 2 ? 'bg-gray-400 text-white' :
                        player.rank === 3 ? 'bg-orange-500 text-white' :
                        'bg-primary/20 text-primary'
                      }`}>
                        {player.rank}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{player.country}</span>
                        <span className="font-semibold text-foreground">
                          {isNyanMode ? `NYAN${player.rank}` : player.player}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-mono font-bold text-lg">
                        {formatTime(player.time)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {player.time.toFixed(1)} seconds
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-center text-sm text-muted-foreground">
                <p>
                  {isNyanMode 
                    ? 'NYAN MORE TIME NYAN BETTER RANK'
                    : 'Longer time = Better ranking!'
                  }
                </p>
              </div>
            </div>
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

        </div>
      </section>
    </div>
  );
};

export default Game;