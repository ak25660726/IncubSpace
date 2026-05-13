'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { auth, db } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { Bell, User as UserIcon, LogOut, Settings } from 'lucide-react';
import { collection, query, where, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { useState, useEffect } from 'react';

export function Navbar() {
  const { user, profile } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifs, setShowNotifs] = useState(false);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc'),
      limit(5)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotifications(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      // Erreur silencieuse pour le mode offline
    });
    return () => unsubscribe();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Erreur lors de la déconnexion', error);
    }
  };
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <Link href="/" className="text-2xl font-bold tracking-tight">
              <span className="text-blue-600">INCUB</span>
              <span className="text-orange-500 ml-1">LINK</span>
            </Link>
          </motion.div>
          
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/services" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">
              Trouver du travail
            </Link>
            <Link href="/register?role=client" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">
              Recruter des talents
            </Link>
            <Link href="/how-it-works" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">
              Comment ça marche
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">
              À propos
            </Link>
            
            <div className="flex space-x-4 items-center pl-4 border-l border-gray-100">
              {user ? (
                <div className="flex items-center gap-6">
                  {/* Notifications */}
                  <div className="relative">
                    <button 
                      onClick={() => setShowNotifs(!showNotifs)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition relative"
                    >
                      <Bell className="w-5 h-5" />
                      {notifications.length > 0 && (
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                      )}
                    </button>

                    <AnimatePresence>
                      {showNotifs && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute right-0 mt-2 w-80 bg-white border border-gray-100 rounded-3xl shadow-2xl z-50 overflow-hidden"
                        >
                          <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                            <span className="font-bold text-sm">Notifications</span>
                            <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-bold">Nouveau</span>
                          </div>
                          <div className="max-h-96 overflow-y-auto">
                            {notifications.length === 0 ? (
                              <div className="p-8 text-center text-gray-400 text-xs">Aucune notification pour le moment.</div>
                            ) : (
                              notifications.map((n) => (
                                <div key={n.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition cursor-pointer">
                                  <p className="text-xs font-bold text-gray-900 mb-1">{n.title}</p>
                                  <p className="text-[11px] text-gray-500 line-clamp-2">{n.message}</p>
                                </div>
                              ))
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="h-8 w-px bg-gray-100 mx-2" />

                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-bold text-gray-900 leading-tight">{profile?.full_name || user.email?.split('@')[0]}</p>
                      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{profile?.role}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition"
                      title="Se déconnecter"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
                    Connexion
                  </Link>
                  <Link href="/register">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition shadow-lg shadow-blue-200"
                    >
                      S'inscrire
                    </motion.button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
