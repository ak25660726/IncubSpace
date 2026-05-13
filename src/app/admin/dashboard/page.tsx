'use client';

import { motion } from 'framer-motion';
import { 
  Users, 
  Briefcase, 
  CreditCard, 
  AlertTriangle, 
  Search,
  MoreVertical
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, onSnapshot, where } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();
  const [recentRequests, setRecentRequests] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || profile?.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, profile, authLoading, router]);

  useEffect(() => {
    const q = query(collection(db, 'requests'), orderBy('createdAt', 'desc'), limit(10));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRecentRequests(docs);
      setLoading(false);
    });

    const qAlerts = query(collection(db, 'messages'), where('is_filtered', '==', true), orderBy('createdAt', 'desc'), limit(5));
    const unsubscribeAlerts = onSnapshot(qAlerts, (snapshot) => {
      const alertDocs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAlerts(alertDocs);
    });

    return () => {
      unsubscribe();
      unsubscribeAlerts();
    };
  }, []);
  const stats = [
    { label: 'Total Clients', value: '1,284', icon: <Users className="text-blue-600" />, trend: '+12%' },
    { label: 'Prestataires', value: '456', icon: <Briefcase className="text-orange-500" />, trend: '+5%' },
    { label: 'Commissions (DT)', value: '12,450', icon: <CreditCard className="text-green-600" />, trend: '+18%' },
    { label: 'Signalements', value: '12', icon: <AlertTriangle className="text-red-500" />, trend: '-2%' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrateur</h1>
          <p className="text-gray-500">Bienvenue, Superviseur INCUB SPACE</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Rechercher..." 
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-gray-50 rounded-2xl">{stat.icon}</div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                stat.trend.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
              }`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Requests Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h2 className="font-bold text-lg">Demandes Récentes</h2>
            <button className="text-blue-600 text-sm font-bold hover:underline">Voir tout</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Catégorie</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentRequests.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4 font-medium">Utilisateur</td>
                    <td className="px-6 py-4 text-gray-600">{row.category}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        row.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {row.status === 'open' ? 'Ouvert' : row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))}
                {recentRequests.length === 0 && !loading && (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                      Aucune demande trouvée.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Anti-Circumvention Alerts */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h2 className="font-bold text-lg text-red-600">Alertes Sécurité</h2>
          </div>
          <div className="p-6 space-y-6">
            {alerts.length === 0 && (
              <div className="text-center text-gray-500 text-sm py-4">Aucune alerte récente.</div>
            )}
            {alerts.map((alert, i) => (
              <div key={alert.id || i} className="p-4 bg-red-50 rounded-2xl border border-red-100">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-red-900 text-sm">Utilisateur {alert.senderId?.substring(0, 5)}...</span>
                  <span className="text-[10px] text-red-500 font-medium">
                    {alert.createdAt ? alert.createdAt.toDate().toLocaleTimeString('fr-FR') : 'À l\'instant'}
                  </span>
                </div>
                <p className="text-xs text-red-700 leading-relaxed mb-3">A tenté de contourner le système. Message original masqué contenant des informations de contact.</p>
                <div className="flex gap-2">
                  <button className="flex-1 py-1.5 bg-red-600 text-white text-[10px] font-bold rounded-lg hover:bg-red-700 transition">Examiner</button>
                  <button className="flex-1 py-1.5 bg-white text-red-600 border border-red-200 text-[10px] font-bold rounded-lg hover:bg-red-50 transition">Ignorer</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
