import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNyan } from '@/contexts/NyanContext';
import { transformText } from '@/utils/textTransforms';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { t } = useLanguage();
  const { isNyanMode } = useNyan();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validaciones básicas
    if (!email || !password) {
      setError('Por favor ingresa email y contraseña');
      return;
    }

    if (!email.includes('@')) {
      setError('Por favor ingresa un email válido');
      return;
    }

    if (password.length < 3) {
      setError('La contraseña debe tener al menos 3 caracteres');
      return;
    }

    setIsLoading(true);

    // Simular proceso de login
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Guardar autenticación en localStorage
    localStorage.setItem('nyan-auth', 'true');
    localStorage.setItem('nyan-user-email', email);
    localStorage.setItem('nyan-login-time', new Date().toISOString());
    
    setIsLoading(false);
    
    // Redirigir a la página principal
    navigate('/');
  };

  return (
    <div className="min-h-screen cosmic-stars flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-card/90 backdrop-blur border-border shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <CardTitle className="text-3xl font-bold text-gradient-rainbow">
              {transformText('NYAN UNIVERSE', true, isNyanMode)}
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              {transformText('Acceso Requerido', false, isNyanMode)}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-destructive text-sm text-center">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  {transformText('Email', false, isNyanMode)}
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder={transformText('nyan@example.com', false, isNyanMode)}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background/70 border-border"
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  {transformText('Contraseña', false, isNyanMode)}
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder={transformText('••••••••', false, isNyanMode)}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-background/70 border-border"
                  disabled={isLoading}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full font-bold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 h-11 text-base"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {transformText('Accediendo...', false, isNyanMode)}
                  </span>
                ) : (
                  transformText('Acceder al Universo', true, isNyanMode)
                )}
              </Button>
            </form>
            
            <div className="text-center text-sm text-muted-foreground space-y-2">
              <p className="font-medium">
                {transformText('Credenciales de Demo', false, isNyanMode)}
              </p>
              <ul className="space-y-1 text-xs">
                <li>{transformText('• Cualquier email válido (debe incluir @)', false, isNyanMode)}</li>
                <li>{transformText('• Cualquier contraseña (mínimo 3 caracteres)', false, isNyanMode)}</li>
                <li>{transformText('• El acceso se guarda en el navegador', false, isNyanMode)}</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;