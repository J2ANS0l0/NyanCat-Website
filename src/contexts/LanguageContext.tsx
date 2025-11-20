import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'es';

interface Translations {
  [key: string]: {
    en: string;
    es: string;
  };
}

const translations: Translations = {
  home: { en: 'Home', es: 'Inicio' },
  about: { en: 'About', es: 'Acerca de' },
  game: { en: 'Game', es: 'Juego' },
  title: { en: 'NON-STOP NYAN CAT 3D', es: 'NYAN CAT 3D SIN PARAR' },
  subtitle: { en: '3D GAME EXPERIMENTATION', es: 'EXPERIMENTACIÓN CON VIDEOJUEGOS 3D' },
  warning: { en: 'THERE ARE NO OFFICIAL NYAN CAT COINS, BEWARE OF SCAMS!', es: '¡NO EXISTEN MONEDAS OFICIALES DE NYAN CAT, CUIDADO CON LAS ESTAFAS!' },
  experience: { en: 'EXPERIENCE NYAN CAT IN 3D', es: 'EXPERIMENTA EL NYAN CAT EN 3D' },
  controlDescription: { en: 'Control Nyan Cat in an infinite environment and discover special items', es: 'Controla a Nyan Cat en un entorno infinito y descubre items especiales' },
  viewDemo: { en: 'VIEW INTERACTIVE DEMO', es: 'VER DEMO INTERACTIVA' },
  interactive3d: { en: 'INTERACTIVE 3D MODELS', es: 'MODELOS 3D INTERACTIVOS' },
  interactive3dDesc: { en: 'Nyan Cat comes to life in a three-dimensional environment using Three.js', es: 'Nyan Cat cobra vida en un entorno tridimensional utilizando Three.js' },
  transformationItems: { en: 'TRANSFORMATION ITEMS', es: 'ITEMS DE TRANSFORMACIÓN' },
  transformationDesc: { en: 'Collect mexican hats, retro versions and more to change the look', es: 'Recoge sombreros mexicanos, versiones retro y más para cambiar el aspecto' },
  musicEffects: { en: 'MUSIC AND EFFECTS', es: 'MÚSICA Y EFECTOS' },
  musicDesc: { en: "Enjoy Nyan Cat's iconic melody with synchronized visual effects", es: 'Disfruta de la icónica melodía de Nyan Cat con efectos visuales sincronizados' },
  nyaned: { en: "You've NYANED for", es: 'Has NYANEADO durante' },
  seconds: { en: 'seconds', es: 'segundos' },
  shareScore: { en: 'SHARE SCORE', es: 'COMPARTIR PUNTAJE' },
  projectDescription: { en: 'PROJECT DESCRIPTION', es: 'DESCRIPCIÓN DEL PROYECTO' },
  projectDescText: { 
    en: 'The project consists of creating a 3D Nyan Cat within an infinite environment (similar to Blender\'s 3D space) that can be controlled by the user, like a video game. In this environment, different items will appear that the user can collect (for example, a Mexican hat, a retro version or a corrupted version). Each item will modify the visual environment of the game, the color palette, the music and the design of Nyan Cat itself.',
    es: 'El proyecto consiste en crear un Nyan Cat en 3D dentro de un entorno infinito (similar al espacio 3D de Blender) que pueda ser controlado por el usuario, como un videojuego. En este entorno aparecerán diferentes items que el usuario podrá recoger (por ejemplo, un sombrero mexicano, una versión retro o una versión corrupta). Cada item modificará el entorno visual del juego, la paleta de colores, la música y el diseño del propio Nyan Cat.'
  },
  salesModel: { en: 'SALES MODEL', es: 'MODELO DE VENTA' },
  salesModelText: {
    en: 'The sales model for Nyan Cat 3D is based on offering an interactive, fun and absurd web game, available at low cost. It relies on virality: players share their achievements and game clips on social networks, while time-played rankings encourage them to constantly return.',
    es: 'El modelo de venta para Nyan Cat 3D se basa en ofrecer un juego web interactivo, divertido y absurdo, disponible a bajo costo. Se apoya en la viralidad: los jugadores comparten sus logros y clips del juego en redes sociales, mientras los rankings de tiempo jugado fomentan que vuelvan constantemente.'
  },
  inspiration: { en: 'INSPIRATION AND SOURCES', es: 'INSPIRACIÓN Y FUENTES' },
  copyright: { 
    en: 'Nyan Cat 3D - Experimentation with video games: implementation of 3D models in interactive web pages',
    es: 'Nyan Cat 3D - Experimentación con videojuegos: implementación de modelos 3D en páginas web interactivas'
  },
  contact: { en: 'Contact', es: 'Contacto' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
