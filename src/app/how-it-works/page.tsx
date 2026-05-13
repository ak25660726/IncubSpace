'use client';

import { motion } from 'framer-motion';
import { UserPlus, ClipboardList, Send, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

export default function HowItWorksPage() {
  const steps = [
    {
      icon: <ClipboardList className="w-10 h-10 text-blue-600" />,
      title: "Publication",
      description: "Le client publie une demande détaillée en précisant sa région, sa catégorie et son urgence."
    },
    {
      icon: <Send className="w-10 h-10 text-orange-500" />,
      title: "Réception d'Offres",
      description: "Les prestataires qualifiés à proximité reçoivent une notification et envoient leurs offres (prix, délai)."
    },
    {
      icon: <CheckCircle2 className="w-10 h-10 text-green-500" />,
      title: "Sélection & Validation",
      description: "Le client compare les profils, les notes et les prix, puis choisit le prestataire idéal."
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-6xl font-extrabold text-gray-900 mb-6"
          >
            Comment fonctionne <span className="text-blue-600">INCUB LINK</span> ?
          </motion.h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Une plateforme d'intermédiation transparente et sécurisée pour dynamiser le jobbing local en Tunisie.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative mb-32">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50 flex flex-col items-center text-center"
            >
              <div className="mb-8 p-6 bg-gray-50 rounded-3xl group-hover:scale-110 transition">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
              
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 -translate-y-1/2 text-gray-200">
                  <Zap className="w-8 h-8 rotate-90" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="bg-gray-900 rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
             <ShieldCheck className="w-full h-full text-white" />
          </div>
          
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl lg:text-5xl font-bold mb-8">La sécurité avant tout.</h2>
            <p className="text-lg text-gray-400 mb-10 leading-relaxed">
              Pour protéger les intérêts de chacun, INCUB LINK supervise les échanges. Tout échange de coordonnées personnelles avant la validation d'une offre est filtré pour garantir la conformité et la sécurité des transactions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/register">
                <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition shadow-xl shadow-blue-500/20">
                  Créer un compte
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
