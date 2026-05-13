'use client';

import { motion } from 'framer-motion';
import { 
  Send, 
  MapPin, 
  List, 
  AlertCircle,
  Camera,
  Info,
  ChevronDown,
  CheckCircle2
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { app } from '@/lib/firebase';
import { getFirestore, collection, addDoc, doc, setDoc } from 'firebase/firestore/lite';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const dbLite = getFirestore(app);

export default function PublishRequestPage() {
  const router = useRouter();
  const { user, profile, loading: authLoading } = useAuth();
  const [category, setCategory] = useState('');
  const [region, setRegion] = useState('');
  const [urgency, setUrgency] = useState('Moyenne');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const categories = [
    'Plomberie', 
    'Électricité', 
    'Bricolage', 
    'Nettoyage', 
    'Jardinage', 
    'Cours particuliers', 
    'Informatique',
    'Déménagement',
    'Peinture'
  ];
  
  const regions = [
    'Tunis', 
    'Ariana', 
    'Sousse', 
    'Sfax', 
    'Nabeul', 
    'Bizerte', 
    'Monastir', 
    'Gabès', 
    'Kairouan'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert('Erreur : Session expirée.');
      router.push('/login');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 1. Préparation des données (simplifiées pour Firestore Lite)
      const requestData = {
        category: category || "Autre",
        region: region || "Tunis",
        description: description || "",
        urgency: urgency || "Moyenne",
        status: 'open',
        clientId: user.uid,
        clientName: profile?.full_name || user.email?.split('@')[0] || 'Utilisateur',
        createdAt: new Date().toISOString()
      };

      console.log("Tentative d'envoi via Firestore Lite (HTTP)...");
      
      // 2. Envoi via Lite (beaucoup plus robuste aux problèmes de proxy/WebSocket)
      const docRef = collection(dbLite, 'requests');
      const result = await addDoc(docRef, requestData);
      
      console.log("Publication réussie (Lite) ! ID:", result.id);
      
      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);

    } catch (error: any) {
      console.error('Erreur publication Lite:', error);
      
      let msg = error.message;
      if (error.code === "permission-denied" || (msg && msg.includes("permission"))) {
        msg = "Permissions Firestore insuffisantes. Vérifiez vos Security Rules.";
      } else if (msg && msg.includes("network")) {
        msg = "Problème réseau détecté. Vérifiez votre connexion.";
      }
      
      alert(`ERREUR CRITIQUE : ${msg}`);
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-[40px] text-center shadow-2xl border border-blue-50 max-w-md w-full"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Demande publiée !</h2>
          <p className="text-gray-500 mb-8">Votre demande est maintenant visible par nos prestataires. Vous allez être redirigé vers votre tableau de bord.</p>
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2 }}
              className="h-full bg-green-500"
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[48px] shadow-2xl shadow-blue-100/50 border border-white overflow-hidden"
        >
          {/* Header Decor */}
          <div className="h-4 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 w-full" />
          
          <div className="p-8 md:p-16">
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Publier une Demande</h1>
              <p className="text-gray-500 text-lg">Trouvez le bon prestataire en quelques minutes.</p>
            </div>

            <form className="space-y-10" onSubmit={handleSubmit}>
              {/* Main Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                      <List className="w-4 h-4" />
                    </div>
                    Catégorie
                  </label>
                  <div className="relative group">
                    <select 
                      required
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-6 py-5 bg-gray-50 border-2 border-gray-50 rounded-[24px] focus:border-blue-600 focus:bg-white outline-none appearance-none transition-all font-bold text-gray-900"
                    >
                      <option value="">Quelle catégorie ?</option>
                      {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none group-focus-within:text-blue-600 transition" />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                      <MapPin className="w-4 h-4" />
                    </div>
                    Localisation
                  </label>
                  <div className="relative group">
                    <select 
                      required
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="w-full px-6 py-5 bg-gray-50 border-2 border-gray-50 rounded-[24px] focus:border-blue-600 focus:bg-white outline-none appearance-none transition-all font-bold text-gray-900"
                    >
                      <option value="">Dans quelle ville ?</option>
                      {regions.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none group-focus-within:text-blue-600 transition" />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <label className="text-sm font-black text-gray-400 uppercase tracking-widest">
                  Description détaillée
                </label>
                <textarea 
                  required
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Expliquez précisément ce que vous recherchez (ex: nature des travaux, dimensions, délais souhaités...)"
                  className="w-full px-8 py-6 bg-gray-50 border-2 border-gray-50 rounded-[32px] focus:border-blue-600 focus:bg-white outline-none transition-all font-medium text-gray-900 resize-none leading-relaxed"
                />
              </div>

              {/* Urgency */}
              <div className="space-y-6">
                <label className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center gap-3">
                  <AlertCircle className="w-4 h-4 text-orange-500" />
                  Niveau d'urgence
                </label>
                <div className="flex flex-wrap gap-4">
                  {['Basse', 'Moyenne', 'Urgente'].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setUrgency(level)}
                      className={`flex-1 min-w-[120px] py-4 px-6 rounded-2xl font-black text-sm transition-all duration-300 ${
                        urgency === level 
                        ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 scale-105' 
                        : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Photos */}
              <div className="space-y-6">
                <label className="text-sm font-black text-gray-400 uppercase tracking-widest">
                  Photos (Optionnel)
                </label>
                <div className="flex gap-4">
                  <button type="button" className="w-24 h-24 bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center gap-2 hover:border-blue-400 hover:bg-blue-50 transition-all group">
                    <Camera className="w-6 h-6 text-gray-400 group-hover:text-blue-600" />
                    <span className="text-[10px] font-black text-gray-400 uppercase group-hover:text-blue-600">Ajouter</span>
                  </button>
                </div>
              </div>

              {/* Safety Alert */}
              <div className="bg-orange-50 p-8 rounded-[32px] border border-orange-100 flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                  <Info className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <p className="font-black text-orange-900 uppercase tracking-widest text-[10px]">Rappel de sécurité</p>
                  <p className="text-sm text-orange-800 leading-relaxed font-medium">
                    Pour votre sécurité, INCUB LINK interdit l'échange de coordonnées personnelles (téléphone, email) avant la validation officielle de l'offre sur la plateforme.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-6 bg-blue-600 text-white font-black text-lg rounded-[24px] hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 flex items-center justify-center gap-4 group ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'}`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                    Publication...
                  </>
                ) : (
                  <>
                    Publier ma Demande
                    <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition" />
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
