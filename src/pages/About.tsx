import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNyan } from '@/contexts/NyanContext';
import { transformText } from '@/utils/textTransforms';
import { Button } from '@/components/ui/button';

const About = () => {
  const { t } = useLanguage();
  const { isNyanMode, toggleNyanMode } = useNyan();

  const sources = [
    { name: isNyanMode ? 'NYAN.CAT' : 'nyan.cat', url: 'https://nyan.cat' },
    { name: isNyanMode ? '3D NYAN CAR' : '3D car website', url: '#' },
    { name: isNyanMode ? 'NYAN INSTAGRAM' : 'Instagram Reel', url: '#' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-12 cosmic-stars">
        <div className="container max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient-rainbow">
            {isNyanMode 
              ? transformText('ABOUT NYAN UNIVERSE', true, true)
              : transformText(t('about'), true, isNyanMode)
            }
          </h1>
          <p className="text-lg text-muted-foreground">
            {isNyanMode 
              ? 'Discover the ultimate Nyan experience'
              : 'Discover the story behind our Nyan Cat 3D experience'
            }
          </p>
          
          <Button
            onClick={toggleNyanMode}
            variant={isNyanMode ? "default" : "outline"}
            className="font-bold border-rainbow text-rainbow hover:bg-rainbow/10"
          >
            {isNyanMode 
              ? transformText('NYAN MODE ON', true, true)
              : transformText('TOGGLE NYAN MODE', true, isNyanMode)
            }
          </Button>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-4xl space-y-12">
          {/* Project Description */}
          <Card className="p-8 bg-card border-border">
            <h2 className="text-3xl font-bold mb-6 text-gradient-rainbow">
              {isNyanMode 
                ? transformText('NYAN PROJECT', true, true)
                : transformText(t('projectDescription'), true, isNyanMode)
              }
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed">
              {isNyanMode 
                ? 'Experience Nyan Cat like never before in our immersive 3D universe. Fly through space with rainbow trails and cosmic adventures in this ultimate Nyan experience.'
                : t('projectDescText')
              }
            </p>
          </Card>

          {/* Sales Model */}
          <Card className="p-8 bg-card border-border">
            <h2 className="text-3xl font-bold mb-6 text-gradient-rainbow">
              {isNyanMode 
                ? transformText('NYAN BUSINESS', true, true)
                : transformText(t('salesModel'), true, isNyanMode)
              }
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed">
              {isNyanMode 
                ? 'Our Nyan universe offers premium experiences and exclusive content for true Nyan enthusiasts. Join the Nyan revolution today!'
                : t('salesModelText')
              }
            </p>
          </Card>

          {/* Inspiration and Sources */}
          <Card className="p-8 bg-card border-border">
            <h2 className="text-3xl font-bold mb-6 text-gradient-rainbow">
              {isNyanMode 
                ? transformText('NYAN SOURCES', true, true)
                : transformText(t('inspiration'), true, isNyanMode)
              }
            </h2>
            <ul className="space-y-3">
              {sources.map((source, index) => (
                <li key={index}>
                  <a
                    href={source.url}
                    className="text-lg text-primary hover:text-primary/80 transition-colors underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {source.name}
                  </a>
                </li>
              ))}
            </ul>
          </Card>

          {/* Credits */}
          <Card className="p-8 bg-gradient-cosmic border-border">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                {isNyanMode ? 'NYAN UNIVERSE' : t('copyright')}
              </p>
              <p className="text-sm text-muted-foreground">
                {isNyanMode ? 'NYAN CAT 2025' : 'Copyright © 2025 Nyan Cat 3D'}
              </p>
              <p className="text-sm text-muted-foreground">
                {isNyanMode ? 'NYAN@EMAIL.COM' : `${t('contact')}: J2AN.S0l0@gmail.com`}
              </p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default About;