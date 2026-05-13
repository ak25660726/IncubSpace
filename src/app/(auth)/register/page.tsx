'use client';

import { motion } from 'framer-motion';
import { Mail, Lock, User, Briefcase, Eye, EyeOff, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get('role') === 'prestataire' ? 'prestataire' : 'client';
  
  const [role, setRole] = useState(defaultRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'profiles', user.uid), {
        id: user.uid,
        role: role,
        full_name: fullName,
        email: email,
        avatar_url: null,
        bio: null,
        region: null,
        skills: [],
        badges: [],
        rating: 0,
        portfolio: [],
        premium_status: false,
        created_at: new Date().toISOString()
      });

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la création du compte');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[700px]"
      >
        {/* Left Side - Branding Panel */}
        <div className="hidden lg:flex w-2/5 bg-blue-600 relative overflow-hidden p-12 flex-col justify-between text-white">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-700/50 rounded-full blur-3xl -ml-32 -mb-32" />
          
          <div className="relative z-10">
            <Link href="/" className="text-3xl font-bold mb-16 inline-block">
              INCUB<span className="text-white/70">LINK</span>
            </Link>
            <h2 className="text-4xl font-extrabold leading-tight mb-6">
              Élevez le paysage professionnel tunisien.
            </h2>
            <p className="text-blue-100 text-lg opacity-80 leading-relaxed mb-12">
              Rejoignez une communauté où l'expertise traditionnelle rencontre l'agilité moderne de l'économie du jobbing.
            </p>

            <div className="space-y-6">
              <div className="p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/10">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4 text-white">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="font-bold mb-2 text-white">Évoluez rapidement</h4>
                <p className="text-sm text-blue-50 opacity-70">Accédez aux meilleurs talents tunisiens en quelques minutes.</p>
              </div>
              <div className="p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/10">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4 text-white">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold mb-2 text-white">La confiance d'abord</h4>
                <p className="text-sm text-blue-50 opacity-70">Des professionnels vérifiés garantissant la qualité de chaque projet.</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 text-xs opacity-50">
            © 2026 IncubLink Tunisian Jobbing. Tous droits réservés.
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 p-8 lg:p-16 flex flex-col justify-center bg-white">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-10">
              <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2">Créez votre compte</h1>
              <p className="text-gray-500">Commencez votre voyage avec la première plateforme de jobbing en Tunisie.</p>
            </div>

            {/* Role Switcher */}
            <div className="bg-gray-50 p-1.5 rounded-[20px] flex mb-8">
              <button
                onClick={() => setRole('prestataire')}
                className={`flex-1 py-3 px-4 rounded-[16px] text-sm font-bold flex items-center justify-center gap-2 transition ${
                  role === 'prestataire' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <User className="w-4 h-4" />
                Je suis un Talent
              </button>
              <button
                onClick={() => setRole('client')}
                className={`flex-1 py-3 px-4 rounded-[16px] text-sm font-bold flex items-center justify-center gap-2 transition ${
                  role === 'client' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                Je recrute
              </button>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm rounded-2xl border border-red-100 flex items-center gap-3 animate-shake">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2 ml-1">Nom complet</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ahmed Ben Ali"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-blue-100 focus:ring-4 focus:ring-blue-50/50 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2 ml-1">Adresse e-mail</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nom@exemple.tn"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-blue-100 focus:ring-4 focus:ring-blue-50/50 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2 ml-1">Mot de passe</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 8 caractères"
                    className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-blue-100 focus:ring-4 focus:ring-blue-50/50 outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 px-1">
                <input 
                  type="checkbox" 
                  id="terms" 
                  required 
                  className="w-5 h-5 rounded border-gray-200 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="terms" className="text-xs text-gray-500">
                  J'accepte les <Link href="/terms" className="text-blue-600 font-bold hover:underline">Conditions d'utilisation</Link> et la <Link href="/privacy" className="text-blue-600 font-bold hover:underline">Politique de confidentialité</Link>.
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition shadow-xl shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]"
              >
                {loading ? 'Création en cours...' : 'Créer un compte'}
              </button>
            </form>

            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-gray-400 font-bold tracking-widest">Ou s'inscrire avec</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 py-3 border border-gray-100 rounded-2xl hover:bg-gray-50 transition font-bold text-sm">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/action/google.svg" className="w-5 h-5" alt="Google" />
                Google
              </button>
              <button className="flex items-center justify-center gap-3 py-3 border border-gray-100 rounded-2xl hover:bg-gray-50 transition font-bold text-sm">
                <div className="w-5 h-5 bg-blue-700 rounded-sm flex items-center justify-center text-[10px] text-white font-black">in</div>
                LinkedIn
              </button>
            </div>

            <p className="mt-10 text-center text-sm text-gray-500 font-medium">
              Vous avez déjà un compte ?{' '}
              <Link href="/login" className="text-blue-600 font-bold hover:underline">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
