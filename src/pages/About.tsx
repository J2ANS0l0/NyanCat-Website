import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { transformText } from '@/utils/textTransforms';

const About = () => {
  const { t } = useLanguage();

  const sources = [
    { name: 'nyan.cat', url: 'https://nyan.cat' },
    { name: '3D car website', url: '#' },
    { name: 'Instagram Reel', url: '#' },
  ];

  return (
    <div className="flex flex-col">
      <section className="py-20">
        <div className="container max-w-4xl space-y-12">
          {/* Project Description */}
          <Card className="p-8 bg-card border-border">
            <h2 className="text-3xl font-bold mb-6 text-gradient-rainbow">
              {transformText(t('projectDescription'), true)}
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed">
              {t('projectDescText')}
            </p>
          </Card>

          {/* Sales Model */}
          <Card className="p-8 bg-card border-border">
            <h2 className="text-3xl font-bold mb-6 text-gradient-rainbow">
              {transformText(t('salesModel'), true)}
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed">
              {t('salesModelText')}
            </p>
          </Card>

          {/* Inspiration and Sources */}
          <Card className="p-8 bg-card border-border">
            <h2 className="text-3xl font-bold mb-6 text-gradient-rainbow">
              {transformText(t('inspiration'), true)}
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
                {t('copyright')}
              </p>
              <p className="text-sm text-muted-foreground">
                Copyright © 2025 Nyan Cat 3D
              </p>
              <p className="text-sm text-muted-foreground">
                {t('contact')}: J2AN.S0l0@gmail.com
              </p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default About;
