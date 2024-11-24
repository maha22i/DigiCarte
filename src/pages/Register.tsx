import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { UserPlus, Mail, Lock, ShieldCheck, Eye, EyeOff } from 'lucide-react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: email,
        createdAt: new Date().toISOString(),
      });
      navigate('/dashboard');
    } catch (err) {
      setError('Erreur lors de l\'inscription');
    }
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
              <UserPlus className="h-8 w-8 sm:h-10 sm:w-10 text-purple-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Créer un compte DigiCarte
            </h2>
            <p className="mt-2 text-sm sm:text-base text-white/60 text-center max-w-sm">
              Créez votre compte pour commencer à gérer vos cartes de visite numériques
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {error && (
            <div className="bg-red-500/10 text-red-400 p-4 rounded-lg text-sm backdrop-blur-sm text-center">
              {error}
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
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
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

            <div className="group">
              <label htmlFor="confirmPassword" className="flex items-center text-sm font-medium text-white/80 mb-2 group-focus-within:text-purple-400 transition-colors">
                <ShieldCheck className="h-4 w-4 mr-2" />
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-style w-full pl-4 pr-12 py-3 sm:py-4"
                  placeholder="••••••••"
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {showConfirmPassword ? (
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
                <UserPlus className="h-5 w-5 mr-2" />
                S'inscrire
              </span>
            </button>

            <div className="text-sm text-center">
              <Link 
                to="/" 
                className="font-medium text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center"
              >
                Déjà un compte ? Se connecter
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}