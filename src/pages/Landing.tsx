import { Link } from 'react-router-dom';
import { Sparkles, Box, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { transformText } from '@/utils/textTransforms';
import ScoreDisplay from '@/components/ScoreDisplay';
import ScamWarning from '@/components/ScamWarning';

const Landing = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Box,
      title: t('interactive3d'),
      description: t('interactive3dDesc'),
    },
    {
      icon: Sparkles,
      title: t('transformationItems'),
      description: t('transformationDesc'),
    },
    {
      icon: Music,
      title: t('musicEffects'),
      description: t('musicDesc'),
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
            {transformText(t('title'), true)}
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-foreground/80">
            {transformText(t('subtitle'), true)}
          </p>
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              {transformText(t('experience'), true)}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('controlDescription')}
            </p>
          </div>
          <Link to="/game">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-bold animate-pulse-glow"
            >
              {transformText(t('viewDemo'), true)}
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
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
                  {transformText(feature.title, true)}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
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
    </div>
  );
};

export default Landing;
