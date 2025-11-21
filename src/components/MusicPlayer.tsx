import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Intentar reproducir automáticamente
    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Reproducción automática bloqueada:', error);
        setIsPlaying(false);
      }
    };

    playAudio();

    // Manejar eventos de audio
    const handleEnded = () => {
      // Repetir la canción cuando termine
      audio.currentTime = 0;
      audio.play().catch(console.error);
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(console.error);
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      {/* Elemento de audio oculto */}
      <audio
        ref={audioRef}
        loop
        muted={isMuted}
        preload="auto"
      >
        <source src="/music/NyanCat.mp3" type="audio/mpeg" />
        Tu navegador no soporta el elemento de audio.
      </audio>

      {/* Controles de música en esquina inferior derecha */}
      <div className="fixed bottom-4 right-4 z-50 flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={togglePlay}
          className="h-10 w-10 bg-background/80 backdrop-blur border-border"
          title={isPlaying ? 'Pausar música' : 'Reproducir música'}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMute}
          className="h-10 w-10 bg-background/80 backdrop-blur border-border"
          title={isMuted ? 'Activar sonido' : 'Silenciar'}
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>
      </div>
    </>
  );
};

export default MusicPlayer;