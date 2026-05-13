'use client';

import { motion } from 'framer-motion';
import { 
  Star, 
  MapPin, 
  CheckCircle2, 
  Award, 
  MessageSquare,
  Share2,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'next/navigation';

export default function PrestataireProfile() {
  const params = useParams();
  const id = params.id as string;
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const docRef = doc(db, 'profiles', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProfile();
  }, [id]);

  if (loading) return <div className="py-20 text-center">Chargement du profil...</div>;
  if (!profile) return <div className="py-20 text-center text-red-500">Profil introuvable ou non-prestataire.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100 overflow-hidden sticky top-24"
          >
            <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-400" />
            <div className="px-6 pb-6">
              <div className="relative -mt-16 mb-6">
                <div className="w-32 h-32 rounded-3xl border-4 border-white bg-white shadow-lg overflow-hidden mx-auto">
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-300">AB</span>
                  </div>
                </div>
                <div className="absolute bottom-2 right-1/2 translate-x-16">
                  <div className="bg-green-500 w-6 h-6 rounded-full border-4 border-white" />
                </div>
              </div>

              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">{profile.full_name}</h1>
                <p className="text-blue-600 font-semibold">{profile.role === 'prestataire' ? 'Prestataire de Services' : profile.role}</p>
                <div className="flex items-center justify-center gap-1 mt-2 text-gray-500 text-sm">
                  <MapPin className="w-4 h-4" />
                  {profile.region || 'Région non renseignée'}
                </div>
              </div>

              <div className="flex justify-around py-4 border-y border-gray-50 mb-6">
                <div className="text-center">
                  <div className="flex items-center gap-1 text-orange-500 font-bold">
                    <Star className="w-4 h-4 fill-orange-500" />
                    {profile.rating || 0}
                  </div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">Note</p>
                </div>
                <div className="text-center">
                  <div className="font-bold text-gray-900">{profile.reviews || 0}</div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">Avis</p>
                </div>
                <div className="text-center">
                  <div className="font-bold text-green-600">98%</div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">Succès</p>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition flex items-center justify-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Contacter
                </button>
                <button className="w-full py-4 bg-white text-gray-700 border border-gray-100 font-bold rounded-2xl hover:bg-gray-50 transition flex items-center justify-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Partager
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Bio Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
          >
            <h2 className="text-xl font-bold mb-4">À propos</h2>
            <p className="text-gray-600 leading-relaxed">{profile.bio || 'Aucune biographie renseignée.'}</p>
            
            <div className="mt-8">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Compétences</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills?.map((skill: string, i: number) => (
                  <span key={i} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm font-semibold">
                    {skill}
                  </span>
                ))}
                {(!profile.skills || profile.skills.length === 0) && (
                  <span className="text-sm text-gray-400">Aucune compétence listée.</span>
                )}
              </div>
            </div>
          </motion.section>

          {/* Badges Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Award className="text-orange-500" />
              Récompenses & Vérifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {profile.badges?.map((badge: string, i: number) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-orange-50 border border-orange-100">
                  <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                  <span className="font-bold text-orange-800 text-sm">{badge}</span>
                </div>
              ))}
              {(!profile.badges || profile.badges.length === 0) && (
                <span className="text-sm text-gray-400">Aucun badge obtenu.</span>
              )}
            </div>
          </motion.section>

          {/* Portfolio Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
          >
            <h2 className="text-xl font-bold mb-6">Portfolio</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {profile.portfolio?.map((item: any, i: number) => (
                <div key={i} className="group relative rounded-2xl border border-gray-50 overflow-hidden hover:border-blue-100 transition">
                  <div className="aspect-video bg-gray-50 flex items-center justify-center">
                    <ExternalLink className="text-gray-200 group-hover:text-blue-200 transition" />
                  </div>
                  <div className="p-4 bg-white">
                    <h4 className="font-bold text-gray-900">{item.title}</h4>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </p>
                  </div>
                </div>
              ))}
              {(!profile.portfolio || profile.portfolio.length === 0) && (
                <span className="text-sm text-gray-400 col-span-2">Aucun projet dans le portfolio.</span>
              )}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
