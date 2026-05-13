'use client';

import { useEffect, useState, useRef } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import { useParams } from 'next/navigation';
import { filterSensitiveContent } from '@/lib/utils';
import { Send, ShieldAlert } from 'lucide-react';

export default function MessagingPage() {
  const params = useParams();
  const offerId = params.offerId as string;
  const { user } = useAuth();
  
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!offerId) return;

    const q = query(
      collection(db, 'messages'),
      where('offerId', '==', offerId),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(docs);
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    });

    return () => unsubscribe();
  }, [offerId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    setIsSending(true);

    // Apply anti-circumvention filter
    const { content, hasFiltered } = filterSensitiveContent(newMessage);

    try {
      await addDoc(collection(db, 'messages'), {
        offerId,
        senderId: user.uid,
        content: content,
        is_filtered: hasFiltered,
        createdAt: serverTimestamp()
      });

      setNewMessage('');
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
    } finally {
      setIsSending(false);
    }
  };

  if (!user) return <div className="text-center py-20">Veuillez vous connecter.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-64px)] flex flex-col">
      <div className="bg-white border-b border-gray-100 p-6 rounded-t-[2rem] shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">Messagerie Sécurisée</h1>
        <p className="text-sm text-gray-500">Supervisée par INCUB SPACE</p>
      </div>

      <div className="flex-grow bg-gray-50 p-6 overflow-y-auto border-x border-gray-100">
        <div className="space-y-6">
          <div className="bg-orange-50 text-orange-800 p-4 rounded-2xl text-center text-sm mb-8 flex flex-col items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-orange-500" />
            <p>
              Pour votre sécurité, le partage de coordonnées (téléphone, email) est strictement interdit avant la validation officielle de la prestation. Tout message non conforme sera automatiquement filtré.
            </p>
          </div>

          {messages.map((msg) => {
            const isMe = msg.senderId === user.uid;
            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] ${isMe ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border border-gray-100'} p-4 rounded-2xl ${isMe ? 'rounded-tr-sm' : 'rounded-tl-sm'} shadow-sm relative`}>
                  {msg.is_filtered && (
                    <div className="text-[10px] uppercase font-bold text-red-300 mb-1 flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3" /> Contenu filtré
                    </div>
                  )}
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  <span className={`text-[10px] mt-2 block ${isMe ? 'text-blue-200' : 'text-gray-400'}`}>
                    {msg.createdAt?.toDate().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-white p-4 rounded-b-[2rem] border border-gray-100 shadow-sm">
        <form onSubmit={handleSendMessage} className="flex gap-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Écrivez votre message..."
            className="flex-grow px-6 py-4 bg-gray-50 border border-gray-100 rounded-full focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
          <button
            type="submit"
            disabled={isSending || !newMessage.trim()}
            className="p-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-100"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
