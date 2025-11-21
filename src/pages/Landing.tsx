import { Link } from 'react-router-dom';
import { Sparkles, Box, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNyan } from '@/contexts/NyanContext';
import { transformText } from '@/utils/textTransforms';
import ScoreDisplay from '@/components/ScoreDisplay';
import ScamWarning from '@/components/ScamWarning';

const Landing = () => {
  const { t } = useLanguage();
  const { isNyanMode, toggleNyanMode } = useNyan();

  const features = [
    {
      icon: Box,
      title: isNyanMode ? 'NYAN 3D' : t('interactive3d'),
      description: isNyanMode 
        ? 'NYAN NYAN NYAN NYAN NYAN NYAN NYAN NYAN NYAN NYAN NYAN NYAN' 
        : t('interactive3dDesc'),
    },
    {
      icon: Sparkles,
      title: isNyanMode ? 'NYAN MAGIC' : t('transformationItems'),
      description: isNyanMode 
        ? 'NYAN NYAN NYAN NYAN NYAN NYAN NYAN NYAN NYAN NYAN NYAN NYAN'
        : t('transformationDesc'),
    },
    {
      icon: Music,
      title: isNyanMode ? 'NYAN SOUND' : t('musicEffects'),
      description: isNyanMode 
        ? 'NYAN NYAN NYAN NYAN NYAN NYAN NYAN NYAN NYAN NYAN NYAN NYAN'
        : t('musicDesc'),
    },
  ];

  return (
    <div className="flex flex-col">
      <ScamWarning />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden cosmic-stars">
        <div className="absolute inset-0 bg-gradient-cosmic opacity-50" />
        <div className="container relative z-10 text-center space-y-8 py-20">
          <h1 className="text-6xl md:text-8xl font-bold text-gradient-rainbow animate-float">
            {isNyanMode 
              ? transformText('NYAN NYAN NYAN', true, true)
              : transformText(t('title'), true, isNyanMode)
            }
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-foreground/80">
            {isNyanMode 
              ? transformText('NYAN NYAN NYAN NYAN', false, true)
              : transformText(t('subtitle'), false, isNyanMode)
            }
          </p>
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              {isNyanMode 
                ? transformText('NYAN EXPERIENCE', true, true)
                : transformText(t('experience'), true, isNyanMode)
              }
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isNyanMode 
                ? 'NYAN NYAN NYAN NYAN NYAN NYAN NYAN NYAN NYAN NYAN NYAN NYAN NYAN NYAN NYAN NYAN'
                : t('controlDescription')
              }
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/game">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-bold animate-pulse-glow"
              >
                {isNyanMode 
                  ? transformText('START NYAN', true, true)
                  : transformText(t('viewDemo'), true, isNyanMode)
                }
              </Button>
            </Link>
            
            <Button
              onClick={toggleNyanMode}
              variant={isNyanMode ? "default" : "outline"}
              size="lg"
              className="text-lg px-8 py-6 font-bold border-rainbow text-rainbow hover:bg-rainbow/10"
            >
              {isNyanMode 
                ? transformText('NYAN MODE ON', true, true)
                : transformText('ACTIVATE NYAN MODE', true, isNyanMode)
              }
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient-rainbow mb-4">
              {isNyanMode 
                ? transformText('NYAN FEATURES', true, true)
                : transformText('AMAZING FEATURES', true, isNyanMode)
              }
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {isNyanMode 
                ? 'NYAN NYAN NYAN NYAN NYAN NYAN NYAN NYAN NYAN NYAN NYAN NYAN'
                : 'Discover the incredible features of our Nyan Cat universe'
              }
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-8 text-center space-y-4 hover:shadow-xl transition-shadow bg-card border-border"
              >
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">
                  {transformText(feature.title, true, isNyanMode)}
                </h3>
                <p className="text-muted-foreground">
                  {transformText(feature.description, false, isNyanMode)}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Score Section */}
      <section className="py-20">
        <div className="container max-w-2xl">
          <ScoreDisplay />
        </div>
      </section>

      {/* Nyan Mode CTA */}
      {!isNyanMode && (
        <section className="py-16 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
          <div className="container text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-gradient-rainbow">
                {transformText('READY FOR NYAN MODE?', true, false)}
              </h3>
              <p className="text-lg text-muted-foreground">
                Activate the ultimate Nyan experience with rainbow text and cosmic transformations!
              </p>
              <Button
                onClick={toggleNyanMode}
                size="lg"
                className="font-bold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {transformText('ACTIVATE NYAN MODE', true, false)}
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Landing;