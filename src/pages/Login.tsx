import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { LogIn, Mail, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Email ou mot de passe incorrect');
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Veuillez entrer votre email');
      return;
    }

    try {
      setIsResetting(true);
      setError('');
      await sendPasswordResetEmail(auth, email);
      setResetEmailSent(true);
    } catch (err) {
      setError('Erreur lors de l\'envoi de l\'email de réinitialisation');
    } finally {
      setIsResetting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md space-y-6 glass-morphism p-6 sm:p-8 lg:p-10 rounded-2xl">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-24 w-24 rounded-full bg-purple-500/20 blur-xl"></div>
          </div>
          <div className="relative flex flex-col items-center">
            <div className="bg-white/10 p-4 rounded-full backdrop-blur-sm mb-4">
              <LogIn className="h-8 w-8 sm:h-10 sm:w-10 text-purple-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Connexion à DigiCarte
            </h2>
            <p className="mt-2 text-sm sm:text-base text-white/60 text-center max-w-sm">
              Connectez-vous pour gérer vos cartes de visite numériques
            </p>
          </div>
        </div>

        {resetEmailSent && (
          <div className="bg-green-500/10 text-green-400 p-4 rounded-lg text-sm backdrop-blur-sm text-center flex items-center justify-center space-x-2">
            <AlertCircle className="h-5 w-5" />
            <span>Email de réinitialisation envoyé ! Vérifiez votre boîte de réception.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {error && (
            <div className="bg-red-500/10 text-red-400 p-4 rounded-lg text-sm backdrop-blur-sm text-center flex items-center justify-center space-x-2">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-4 sm:space-y-6">
            <div className="group">
              <label htmlFor="email" className="flex items-center text-sm font-medium text-white/80 mb-2 group-focus-within:text-purple-400 transition-colors">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-style w-full pl-4 pr-4 py-3 sm:py-4"
                  placeholder="exemple@email.com"
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-focus-within:opacity-100 -z-10 blur transition-opacity"></div>
              </div>
            </div>

            <div className="group">
              <label htmlFor="password" className="flex items-center text-sm font-medium text-white/80 mb-2 group-focus-within:text-purple-400 transition-colors">
                <Lock className="h-4 w-4 mr-2" />
                Mot de passe
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-style w-full pl-4 pr-12 py-3 sm:py-4"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-purple-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-purple-400" />
                  )}
                </button>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-focus-within:opacity-100 -z-10 blur transition-opacity"></div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button type="submit" className="btn-primary group">
              <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span className="relative flex items-center justify-center">
                <LogIn className="h-5 w-5 mr-2" />
                Se connecter
              </span>
            </button>

            <div className="flex flex-col items-center space-y-2 text-sm">
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={isResetting}
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                {isResetting ? 'Envoi en cours...' : 'Mot de passe oublié ?'}
              </button>

              <Link 
                to="/register" 
                className="font-medium text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center"
              >
                Pas encore de compte ? S'inscrire
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}