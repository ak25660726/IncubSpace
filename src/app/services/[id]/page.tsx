'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  Briefcase, 
  Bookmark, 
  Share2, 
  CheckCircle2, 
  DollarSign, 
  Users,
  ChevronRight,
  ArrowLeft,
  X
} from 'lucide-react';
import Link from 'next/link';

export default function ServiceDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { user, profile } = useAuth();
  
  const [request, setRequest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showApplyModal, setShowApplyModal] = useState(false);
  
  const [price, setPrice] = useState('');
  const [delay, setDelay] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const docRef = doc(db, 'requests', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRequest({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error('Error fetching request:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchRequest();
  }, [id]);

  const handleSendOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || profile?.role !== 'prestataire') {
      alert("Seuls les prestataires connectés peuvent envoyer une offre.");
      return;
    }

    if (!price || !delay || !message) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'offers'), {
        request_id: id,
        prestataire_id: user.uid,
        price: parseFloat(price),
        delay,
        message,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      alert('Candidature envoyée avec succès !');
      setShowApplyModal(false);
      router.push('/dashboard');
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'offre:', error);
      alert('Erreur lors de l\'envoi de l\'offre.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
    </div>
  );
  
  if (!request) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
      <div className="text-4xl text-gray-300">🔍</div>
      <p className="text-gray-500 font-bold">Demande introuvable.</p>
      <Link href="/dashboard" className="text-blue-600 font-bold hover:underline">Retour au tableau de bord</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-100 py-4">
        <div className="container mx-auto px-4">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition font-bold text-sm">
            <ArrowLeft className="w-4 h-4" />
            Retour aux offres
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Header Section */}
        <div className="bg-white p-8 lg:p-12 rounded-[40px] border border-gray-100 shadow-sm mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
            <div className="flex items-start gap-8">
              <div className="w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-blue-100">
                {request.category?.[0] || 'J'}
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">{request.category}</h1>
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 font-medium">
                  <div className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-blue-600" /> {request.clientName || 'Entreprise Vérifiée'}</div>
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-600" /> {request.region}, Tunisie</div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-blue-600" /> Publié il y a 2 jours</div>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="p-4 rounded-2xl border border-gray-100 hover:bg-gray-50 transition text-gray-400 hover:text-blue-600 shadow-sm">
                <Bookmark className="w-6 h-6" />
              </button>
              <button className="p-4 rounded-2xl border border-gray-100 hover:bg-gray-50 transition text-gray-400 hover:text-blue-600 shadow-sm">
                <Share2 className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content (70%) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 lg:p-12 rounded-[40px] border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-8">À propos du rôle</h2>
              <p className="text-gray-500 leading-relaxed mb-12 text-lg whitespace-pre-wrap">
                {request.description}
              </p>

              <h2 className="text-2xl font-extrabold text-gray-900 mb-8">Missions principales</h2>
              <div className="grid grid-cols-1 gap-4 mb-12">
                {[
                  "Gérer et maintenir des systèmes performants en utilisant les meilleures pratiques.",
                  "Prendre des décisions techniques stratégiques pour le développement du projet.",
                  "Collaborer étroitement avec l'équipe pour assurer une qualité supérieure.",
                  "Optimiser les performances et assurer la scalabilité de la solution."
                ].map((mission, m) => (
                  <div key={m} className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                    <p className="text-gray-600 font-medium">{mission}</p>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-extrabold text-gray-900 mb-8">Profil recherché</h2>
              <ul className="space-y-4 mb-12">
                {[
                  "Expérience avérée dans le domaine de la catégorie demandée.",
                  "Maîtrise des outils et technologies modernes associés.",
                  "Capacité à travailler de manière autonome et rigoureuse.",
                  "Excellentes compétences en communication et en résolution de problèmes."
                ].map((req, r) => (
                  <li key={r} className="flex items-center gap-4 text-gray-600 font-medium">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    {req}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {["Expertise", "Qualité", "Innovation", "Sérieux"].map((tag, t) => (
                  <span key={t} className="px-6 py-2 bg-gray-50 text-blue-600 font-bold rounded-full text-sm border border-blue-50">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar (30%) */}
          <div className="space-y-8">
            {/* Info Card */}
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
              <div className="mb-8">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">FOURCHETTE DE BUDGET</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-gray-900">200 - 500</span>
                  <span className="text-lg font-bold text-gray-400">DT</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 mb-12">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Type</p>
                    <p className="text-sm font-bold text-gray-900">Service Unique</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Localisation</p>
                    <p className="text-sm font-bold text-gray-900">{request.region} Friendly</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => setShowApplyModal(true)}
                  className="w-full py-5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition shadow-xl shadow-blue-100"
                >
                  Candidature rapide
                </button>
                <button className="w-full py-5 border-2 border-blue-600 text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition">
                  Message au recruteur
                </button>
                <p className="text-center text-[10px] text-gray-400 font-bold mt-4 uppercase">Répond généralement sous 24h</p>
              </div>
            </div>

            {/* About Company */}
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6">À propos du client</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 text-xl font-bold">
                  {request.clientName?.[0] || 'C'}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900">{request.clientName || 'Client Vérifié'}</h4>
                  <p className="text-xs text-gray-400 font-medium">Membre depuis 2024</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-8 opacity-80">
                Ce client a déjà réalisé plusieurs projets avec succès sur IncubLink et maintient une excellente note de satisfaction.
              </p>
              <button className="w-full py-4 bg-gray-50 text-blue-600 font-bold text-sm rounded-2xl hover:bg-blue-50 transition flex items-center justify-center gap-2">
                Voir le profil complet
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <AnimatePresence>
        {showApplyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowApplyModal(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="p-8 lg:p-12">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-extrabold text-gray-900">Postuler</h2>
                  <button onClick={() => setShowApplyModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition text-gray-400">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSendOffer} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2 ml-1">Prix proposé (DT)</label>
                      <input 
                        type="number" 
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Ex: 50" 
                        className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-blue-100 focus:ring-4 focus:ring-blue-50/50 outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2 ml-1">Délai estimé</label>
                      <input 
                        type="text" 
                        required
                        value={delay}
                        onChange={(e) => setDelay(e.target.value)}
                        placeholder="Ex: 2 jours" 
                        className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-blue-100 focus:ring-4 focus:ring-blue-50/50 outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2 ml-1">Message pour le client</label>
                    <textarea 
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Pourquoi êtes-vous le meilleur pour ce job ?"
                      className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-blue-100 focus:ring-4 focus:ring-blue-50/50 outline-none transition resize-none"
                    />
                  </div>

                  <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex gap-3 items-start">
                    <X className="w-5 h-5 text-blue-600 mt-1 shrink-0 rotate-45" />
                    <p className="text-[10px] text-blue-800 font-bold leading-tight uppercase">
                      Important : L'échange de coordonnées directes est interdit. Tout contact doit passer par la plateforme IncubLink.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition shadow-xl shadow-blue-200 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'Envoi...' : 'Confirmer la candidature'}
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
