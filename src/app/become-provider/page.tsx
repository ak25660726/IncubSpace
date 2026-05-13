'use client';

import { motion } from 'framer-motion';
import { Briefcase, TrendingUp, ShieldCheck, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function BecomeProviderPage() {
  const benefits = [
    "Accès à des centaines de demandes locales",
    "Visibilité prioritaire sur le marché tunisien",
    "Paiements et interactions sécurisés",
    "Badge de confiance INCUB SPACE",
    "Gestion simplifiée de vos offres",
    "Outils de croissance pour votre activité"
  ];

  return (
    <div className="min-h-screen pt-20 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-50 text-orange-600 text-sm font-bold mb-8 border border-orange-100">
              <TrendingUp className="w-4 h-4 mr-2" />
              Boostez votre carrière de prestataire
            </div>
            <h1 className="text-4xl lg:text-7xl font-extrabold text-gray-900 mb-8 leading-tight">
              Devenez un Expert <br />
              <span className="text-orange-500">Certifié Incub</span>
            </h1>
            <p className="text-xl text-gray-500 mb-10 leading-relaxed">
              Rejoignez le réseau local de prestataires qualifiés supervisé par INCUB SPACE. Accédez à des missions sérieuses et développez votre communauté.
            </p>
            <Link href="/register?role=prestataire">
              <button className="px-10 py-5 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition shadow-2xl flex items-center gap-3 group">
                Rejoindre maintenant
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition" />
              </button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {[
              { icon: <Briefcase className="text-blue-600" />, title: "Missions Réelles", desc: "Pas de faux profils, que des besoins concrets." },
              { icon: <Zap className="text-orange-500" />, title: "Premium", desc: "Commission réduite de 15% à 10%." },
              { icon: <ShieldCheck className="text-green-600" />, title: "Sécurité", desc: "Vos intérêts sont protégés par INCUB SPACE." },
              { icon: <TrendingUp className="text-purple-600" />, title: "Croissance", desc: "Améliorez votre réputation locale." },
            ].map((card, i) => (
              <div key={i} className="p-8 bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50">
                <div className="mb-4 p-3 bg-gray-50 rounded-2xl w-fit">{card.icon}</div>
                <h3 className="font-bold text-lg mb-2">{card.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="bg-orange-500 rounded-[3rem] p-12 lg:p-20 text-white flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1">
            <h2 className="text-3xl lg:text-5xl font-bold mb-8">Pourquoi nous rejoindre ?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-orange-200" />
                  <span className="font-medium">{b}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0">
             <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20">
                <p className="text-6xl font-black mb-2">10%</p>
                <p className="text-orange-100 font-bold">Commission Premium</p>
                <div className="mt-6 h-1 w-full bg-orange-300 rounded-full overflow-hidden">
                  <div className="bg-white h-full w-[10%]" />
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
