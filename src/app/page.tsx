'use client';

import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Code, 
  Palette, 
  Briefcase, 
  Home as HomeIcon, 
  GraduationCap,
  Layers,
  Settings,
  MessageCircle,
  CreditCard,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-white overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative w-full pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-block px-4 py-1.5 mb-6 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest"
              >
                La plateforme de jobbing n°1 en Tunisie
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 mb-8 leading-[1.1]"
              >
                Des services <span className="text-blue-600">experts</span> pour chaque besoin
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg lg:text-xl text-gray-500 mb-10 leading-relaxed max-w-xl"
              >
                Connectez-vous avec les meilleurs talents tunisiens. Trouvez des professionnels vérifiés ou votre prochain grand projet à Tunis, Sousse et au-delà.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link href="/services">
                  <button className="px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition shadow-2xl shadow-blue-200">
                    Explorer les services
                  </button>
                </Link>
                <Link href="/register">
                  <button className="px-10 py-4 bg-white text-blue-600 border-2 border-blue-100 font-bold rounded-2xl hover:bg-blue-50 transition">
                    Devenir un talent
                  </button>
                </Link>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
              className="flex-1 relative"
            >
              <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
                  alt="Modern Office" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-blue-600/10 mix-blend-multiply" />
              </div>
              {/* Floating Cards */}
              <div className="absolute -bottom-10 -left-10 bg-white/80 backdrop-blur-xl p-6 rounded-[32px] shadow-2xl border border-white/50 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Rapidité</p>
                    <p className="text-sm font-bold text-gray-900">Mise en relation en 24h</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full py-24 bg-gray-50/50">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-center text-gray-900 mb-16">Parcourez les talents locaux</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: Code, label: "IT & Logiciels", color: "text-blue-600", bg: "bg-blue-50" },
              { icon: Palette, label: "Arts Créatifs", color: "text-orange-600", bg: "bg-orange-50" },
              { icon: Briefcase, label: "Conseil aux entreprises", color: "text-indigo-600", bg: "bg-indigo-50" },
              { icon: HomeIcon, label: "Services à domicile", color: "text-green-600", bg: "bg-green-50" },
              { icon: GraduationCap, label: "Éducation", color: "text-purple-600", bg: "bg-purple-50" },
            ].map((cat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all cursor-pointer text-center group"
              >
                <div className={`w-16 h-16 ${cat.bg} rounded-[24px] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition`}>
                  <cat.icon className={`w-8 h-8 ${cat.color}`} />
                </div>
                <h3 className="text-sm font-bold text-gray-900 leading-tight">{cat.label}</h3>
                <p className="text-xs text-blue-600 font-bold mt-4 opacity-0 group-hover:opacity-100 transition">Explorer <ChevronRight className="inline w-3 h-3" /></p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Solutions Section */}
      <section className="w-full py-24 bg-white">
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900">Solutions Premium</h2>
            <Link href="/services" className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-2">
              Voir toutes les solutions <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative h-[400px] rounded-[48px] overflow-hidden group cursor-pointer"
            >
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200" 
                className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110" 
                alt="Enterprise"
              />
              <div className="absolute inset-0 bg-blue-900/80 backdrop-blur-[2px]" />
              <div className="absolute inset-0 p-12 flex flex-col justify-end">
                <span className="px-4 py-1 bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full w-fit mb-4">Pour les entreprises</span>
                <h3 className="text-3xl font-extrabold text-white mb-4">Solutions Entreprise</h3>
                <p className="text-blue-100 text-sm mb-8 max-w-sm opacity-80">Des services sur mesure pour les grandes organisations et les startups en pleine croissance.</p>
                <button className="w-fit px-8 py-3 bg-white text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition">En savoir plus</button>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative h-[400px] rounded-[48px] overflow-hidden group cursor-pointer"
            >
              <img 
                src="https://images.unsplash.com/photo-1454165833767-027ff33026b8?auto=format&fit=crop&q=80&w=1200" 
                className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110" 
                alt="Management"
              />
              <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-[2px]" />
              <div className="absolute inset-0 p-12 flex flex-col justify-end">
                <span className="px-4 py-1 bg-gray-700 text-white text-[10px] font-black uppercase tracking-widest rounded-full w-fit mb-4">Pour les indépendants</span>
                <h3 className="text-3xl font-extrabold text-white mb-4">Gestion de Projet</h3>
                <p className="text-gray-300 text-sm mb-8 max-w-sm opacity-80">Gérez vos contrats et vos paiements en toute sécurité avec nos outils professionnels.</p>
                <button className="w-fit px-8 py-3 bg-white text-gray-900 font-bold rounded-2xl hover:bg-gray-100 transition">Explorer</button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="w-full py-24 bg-gray-50/30">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-center text-gray-900 mb-20">Simple comme 1-2-3</h2>
          <div className="flex flex-col md:flex-row justify-center items-start gap-12 lg:gap-24 relative">
            {/* Connector Lines */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-gray-100 hidden md:block" />
            
            {[
              { icon: Layers, label: "Publier", desc: "Décrivez votre besoin en quelques minutes et recevez des offres." },
              { icon: MessageCircle, label: "Connecter", desc: "Discutez avec les meilleurs prestataires et choisissez votre favori." },
              { icon: CreditCard, label: "Payer", desc: "Libérez le paiement en toute sécurité une fois le travail terminé." },
            ].map((step, i) => (
              <div key={i} className="flex-1 flex flex-col items-center text-center relative z-10">
                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-black shadow-2xl shadow-blue-100 mb-8">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.label}</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="container px-4 mx-auto py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative w-full py-24 px-8 rounded-[64px] bg-blue-600 overflow-hidden text-center text-white shadow-2xl shadow-blue-200"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px] -ml-48 -mb-48" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-5xl lg:text-6xl font-extrabold mb-8">Prêt à commencer ?</h2>
            <p className="text-xl text-blue-100 mb-12 opacity-90 leading-relaxed">
              Rejoignez la plus grande communauté de professionnels en Tunisie. <br className="hidden md:block" />
              L'excellence n'attend que vous.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="px-12 py-5 bg-white text-blue-600 font-bold rounded-2xl hover:bg-gray-50 transition shadow-2xl text-lg">
                S'inscrire maintenant
              </button>
              <button className="px-12 py-5 bg-transparent border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 transition text-lg">
                Nous contacter
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="w-full py-20 bg-white border-t border-gray-100">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="text-left">
              <div className="text-2xl font-bold mb-4">
                <span className="text-blue-600 font-black">IncubLink</span>
              </div>
              <p className="text-sm text-gray-400 font-medium">
                Connecter les talents tunisiens avec les opportunités de demain.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-[11px] font-black uppercase tracking-widest text-gray-400">
              <span className="hover:text-blue-600 cursor-pointer transition">À propos</span>
              <span className="hover:text-blue-600 cursor-pointer transition">Conditions</span>
              <span className="hover:text-blue-600 cursor-pointer transition">Confidentialité</span>
              <span className="hover:text-blue-600 cursor-pointer transition">Support</span>
            </div>
          </div>
          <div className="pt-12 border-t border-gray-50 mt-12 text-center text-[10px] text-gray-300 font-bold uppercase tracking-[0.2em]">
            © 2026 IncubLink Tunisian Jobbing. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
