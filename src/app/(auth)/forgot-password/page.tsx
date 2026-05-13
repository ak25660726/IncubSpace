'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Un email de réinitialisation a été envoyé à ' + email);
    } catch (err: any) {
      setError('Adresse email introuvable.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl shadow-gray-200 border border-gray-100"
      >
        <div className="text-center mb-10">
          <Link href="/" className="text-3xl font-bold text-blue-600 inline-block mb-4">
            INCUB <span className="text-orange-500">LINK</span>
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">Mot de passe oublié</h2>
          <p className="text-gray-500 mt-2">Entrez votre email pour recevoir un lien de réinitialisation</p>
        </div>

        {error && <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100">{error}</div>}
        {message && <div className="mb-6 p-4 bg-green-50 text-green-700 text-sm rounded-xl border border-green-100">{message}</div>}

        <form className="space-y-6" onSubmit={handleReset}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                placeholder="nom@exemple.tn"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition shadow-lg ${loading ? 'opacity-50' : ''}`}
          >
            {loading ? 'Envoi...' : 'Envoyer le lien'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/login" className="text-blue-600 font-bold hover:underline text-sm flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Retour à la connexion
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
