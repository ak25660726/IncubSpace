'use client';

import { motion } from 'framer-motion';
import { Search, MapPin, Clock, Tag, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import Link from 'next/link';

export default function ServicesListPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('Toutes les régions');
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const regions = ['Toutes les régions', 'Tunis', 'Ariana', 'Sousse', 'Sfax', 'Nabeul', 'Bizerte', 'Monastir'];

  useEffect(() => {
    let q = query(
      collection(db, 'requests'), 
      where('status', '==', 'open'),
      orderBy('createdAt', 'desc')
    );

    if (selectedRegion !== 'Toutes les régions') {
      q = query(q, where('region', '==', selectedRegion));
    }
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRequests(docs);
      setLoading(false);
    }, (error) => {
      console.warn("Firestore (Services) est en mode hors-ligne.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Demandes de Services</h1>
          <p className="text-gray-500 text-lg">Trouvez des missions qui correspondent à vos compétences.</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <select 
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition font-medium"
          >
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un service..." 
              className="w-full pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
              spellCheck={false}
              suppressHydrationWarning
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {requests.map((request, i) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition duration-300 flex flex-col"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                  <Tag className="w-6 h-6" />
                </div>
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  request.urgency === 'Urgente' ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-500'
                }`}>
                  {request.urgency}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition">
                {request.category}
              </h3>
              
              <p className="text-gray-600 mb-8 line-clamp-3 leading-relaxed flex-grow">
                {request.description}
              </p>

              <div className="space-y-4 mb-8 pt-6 border-t border-gray-50">
                <div className="flex items-center gap-3 text-gray-500 text-sm font-medium">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {request.region}
                </div>
                <div className="flex items-center gap-3 text-gray-500 text-sm font-medium">
                  <Clock className="w-4 h-4 text-gray-400" />
                  {mounted && request.createdAt?.toDate().toLocaleDateString('fr-FR')}
                </div>
              </div>

              <Link href={`/services/${request.id}`} className="block">
                <button className="w-full py-4 bg-gray-50 text-gray-900 font-bold rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all flex items-center justify-center gap-2">
                  Voir les détails
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </motion.div>
          ))}

          {requests.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <div className="text-gray-400 mb-4">Aucune demande active pour le moment.</div>
              <Link href="/demandes/publier" className="text-blue-600 font-bold hover:underline">
                Soyez le premier à publier une demande !
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
