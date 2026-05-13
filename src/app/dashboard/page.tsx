'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  Briefcase, 
  Bookmark, 
  FileText, 
  MessageSquare, 
  LayoutDashboard, 
  Search, 
  MapPin, 
  ChevronDown,
  Clock,
  DollarSign,
  MapPin as Pin,
  ChevronRight,
  Plus
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!user) return null;

  const mockJobs = [
    {
      id: 1,
      title: "Architecte Frontend Senior",
      company: "TechVibe Solutions",
      location: "Tunis, Tunisie",
      salary: "2.5k - 4k TND",
      type: "Temps plein",
      tags: ["React", "Tailwind"],
      new: true
    },
    {
      id: 2,
      title: "Product Designer (UI/UX)",
      company: "CreativeHub Tunis",
      location: "Sousse, Remote",
      salary: "1.8k - 2.5k TND",
      type: "Hybride",
      tags: ["Figma", "Design System"],
      new: false
    },
    {
      id: 3,
      title: "Growth Marketing Lead",
      company: "InnovVentures Sousse",
      location: "Sousse, Tunisie",
      salary: "3k - 5k TND",
      type: "Temps plein",
      tags: ["Ads", "Analytics"],
      new: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col">
      <div className="flex flex-1 container mx-auto px-4 py-8 gap-8">
        
        {/* Left Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0 gap-8">
          <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                {profile?.full_name?.[0] || user.email?.[0].toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <h3 className="font-bold text-gray-900 truncate">{profile?.full_name || 'Utilisateur'}</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Dashboard</p>
              </div>
            </div>

            <nav className="space-y-1">
              {[
                { icon: LayoutDashboard, label: "Tableau de bord", active: false },
                { icon: Briefcase, label: "Flux d'emplois", active: true },
                { icon: Bookmark, label: "Jobs enregistrés", active: false },
                { icon: FileText, label: "Mes candidatures", active: false },
                { icon: MessageSquare, label: "Messages", active: false },
              ].map((item, i) => (
                <button
                  key={i}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition font-bold text-sm ${
                    item.active 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="mt-12">
              <Link href="/demandes/publier">
                <button className="w-full py-4 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 transition shadow-xl shadow-orange-100 flex items-center justify-center gap-2">
                  <Plus className="w-5 h-5" />
                  Publier une offre
                </button>
              </Link>
            </div>
          </div>

          <div className="p-6 text-xs text-gray-400 leading-relaxed">
            Bridging the gap between talent and opportunity in Tunisia.
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-8">
          {/* Search Header */}
          <div className="bg-white p-2 rounded-[24px] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-2">
            <div className="flex-1 flex items-center px-4 py-3 border-r border-gray-100 last:border-0 w-full">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input 
                type="text" 
                placeholder="Titre du poste ou mots-clés..." 
                className="w-full bg-transparent outline-none text-sm font-medium"
              />
            </div>
            <div className="flex-1 flex items-center px-4 py-3 border-r border-gray-100 last:border-0 w-full">
              <LayoutDashboard className="w-5 h-5 text-gray-400 mr-3" />
              <div className="flex-1 text-sm font-medium text-gray-500 flex justify-between items-center cursor-pointer">
                Toutes catégories
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
            <div className="flex-1 flex items-center px-4 py-3 border-r border-gray-100 last:border-0 w-full">
              <MapPin className="w-5 h-5 text-gray-400 mr-3" />
              <input 
                type="text" 
                defaultValue="Tunis, Tunisie"
                className="w-full bg-transparent outline-none text-sm font-medium"
              />
            </div>
            <button className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-bold rounded-[18px] hover:bg-blue-700 transition">
              Trouver
            </button>
          </div>

          {/* Job Feed */}
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-extrabold text-gray-900">Flux de jobs récents</h2>
              <p className="text-sm text-gray-400 font-bold">Affichage de 24 offres</p>
            </div>

            <div className="space-y-4">
              {mockJobs.map((job) => (
                <motion.div
                  key={job.id}
                  whileHover={{ y: -4 }}
                  className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all cursor-pointer group"
                >
                  <div className="flex gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-blue-600 border border-gray-100 group-hover:bg-blue-50 transition">
                      <Briefcase className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition">{job.title}</h3>
                          {job.new && <span className="bg-orange-100 text-orange-600 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">Nouveau</span>}
                        </div>
                        <button className="text-gray-300 hover:text-blue-600">
                          <Bookmark className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="text-blue-600 text-sm font-bold mb-4">{job.company}</p>
                      
                      <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-gray-500 mb-6 font-medium">
                        <div className="flex items-center gap-2"><Pin className="w-4 h-4 text-gray-400" /> {job.location}</div>
                        <div className="flex items-center gap-2"><DollarSign className="w-4 h-4 text-gray-400" /> {job.salary}</div>
                        <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-gray-400" /> {job.type}</div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          {job.tags.map((tag, t) => (
                            <span key={t} className="px-4 py-1 bg-gray-50 rounded-full text-[11px] font-bold text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition">{tag}</span>
                          ))}
                        </div>
                        <Link href={`/services/${job.id}`}>
                          <button className="text-blue-600 text-sm font-bold flex items-center gap-2">
                            Voir les détails
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>

        {/* Right Panel */}
        <aside className="hidden xl:flex flex-col w-80 shrink-0 gap-8">
          {/* Recommendations */}
          <div className="bg-blue-600 p-8 rounded-[40px] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16" />
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-4">Recommandations</h3>
              <p className="text-blue-100 text-sm mb-8 opacity-80">Basé sur votre profil récent et vos compétences.</p>
              
              <div className="space-y-4 mb-8">
                {[
                  { title: "Full Stack Developer", company: "NeoTech Hub", salary: "4k TND" },
                  { title: "DevOps Engineer", company: "CloudScale TN", salary: "5k TND" }
                ].map((rec, r) => (
                  <div key={r} className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 cursor-pointer hover:bg-white/20 transition">
                    <h4 className="font-bold text-sm mb-1">{rec.title}</h4>
                    <p className="text-[10px] text-blue-200 font-medium">{rec.company} • {rec.salary}</p>
                  </div>
                ))}
              </div>

              <button className="w-full py-4 bg-white text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition shadow-xl">
                Mettre à jour le profil
              </button>
            </div>
          </div>

          {/* Featured Companies */}
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold mb-8">Entreprises à la une</h3>
            <div className="space-y-6 mb-8">
              {[
                { name: "DataStream Ltd", jobs: 12, color: "bg-blue-50" },
                { name: "Creative Mind", jobs: 5, color: "bg-orange-50" },
                { name: "FinTech TN", jobs: 8, color: "bg-green-50" }
              ].map((comp, c) => (
                <div key={c} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${comp.color} rounded-2xl flex items-center justify-center font-bold text-gray-400 group-hover:scale-110 transition`}>
                      {comp.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">{comp.name}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">{comp.jobs} Offres</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition" />
                </div>
              ))}
            </div>
            <button className="w-full py-4 bg-gray-50 text-gray-600 font-bold text-sm rounded-2xl hover:bg-gray-100 transition">
              Toutes les entreprises
            </button>
          </div>
        </aside>
      </div>

      <footer className="w-full py-12 bg-white border-t border-gray-100 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between gap-12">
            <div>
              <div className="text-xl font-bold mb-4">
                <span className="text-blue-600">INCUB</span>
                <span className="text-orange-500">LINK</span>
              </div>
              <p className="max-w-xs text-sm text-gray-400 leading-relaxed">
                Connecter les talents tunisiens avec les opportunités du futur.
              </p>
            </div>
            <div className="flex gap-20">
              <div>
                <h4 className="font-bold text-gray-900 mb-6">Plateforme</h4>
                <ul className="text-sm text-gray-500 space-y-4">
                  <li className="hover:text-blue-600 cursor-pointer">Flux de jobs</li>
                  <li className="hover:text-blue-600 cursor-pointer">Publier une offre</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-6">Support</h4>
                <ul className="text-sm text-gray-500 space-y-4">
                  <li className="hover:text-blue-600 cursor-pointer">Centre d'aide</li>
                  <li className="hover:text-blue-600 cursor-pointer">Contact</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-gray-50 mt-12 flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            <span>© 2026 IncubLink Tunisian Jobbing.</span>
            <div className="flex gap-8">
              <span className="hover:text-blue-600 cursor-pointer">Carrières</span>
              <span className="hover:text-blue-600 cursor-pointer">Presse</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
