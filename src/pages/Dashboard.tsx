import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../lib/firebase';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { 
  Plus, QrCode, Edit2, Trash2, LogOut, Mail, Phone, Building2,
  Globe, MapPin, Facebook, Instagram, Linkedin, Github, PhoneCall,
  Link as LinkIcon
} from 'lucide-react';
import { signOut } from 'firebase/auth';

export default function Dashboard() {
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/');
      } else {
        loadCards(user.uid);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const loadCards = async (userId: string) => {
    const q = query(collection(db, 'businessCards'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const cardsData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setCards(cardsData);
    setLoading(false);
  };

  const handleDelete = async (cardId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette carte ?')) return;

    try {
      await deleteDoc(doc(db, 'businessCards', cardId));
      setCards(cards.filter(card => card.id !== cardId));
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-400"></div>
    </div>;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Mes Cartes de Visite
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/create-card')}
              className="btn-primary !w-auto"
            >
              <Plus className="h-5 w-5 mr-2" />
              Nouvelle Carte
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-white/80 hover:text-white transition-colors"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Déconnexion
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div key={card.id} className="relative group">
              <div className="glass-morphism rounded-xl overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/10">
                {/* En-tête avec photo */}
                <div className="relative h-48 bg-gradient-to-br from-purple-600/20 to-pink-600/20">
                  <div className="absolute inset-0 backdrop-blur-sm"></div>
                  {/* Actions */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={() => navigate(`/edit-card/${card.id}`)}
                      className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                      title="Modifier"
                    >
                      <Edit2 className="h-4 w-4 text-white" />
                    </button>
                    <button
                      onClick={() => navigate(`/share-card/${card.id}`)}
                      className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                      title="Partager"
                    >
                      <QrCode className="h-4 w-4 text-white" />
                    </button>
                    <button
                      onClick={() => handleDelete(card.id)}
                      className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </button>
                  </div>
                  {/* Photo de profil */}
                  <div className="absolute -bottom-10 left-6">
                    {card.photo ? (
                      <img
                        src={card.photo}
                        alt={card.name}
                        className="w-24 h-24 rounded-xl border-4 border-[#2a1659] object-cover"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-xl border-4 border-[#2a1659] bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <span className="text-3xl font-bold text-white">
                          {card.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contenu de la carte */}
                <div className="pt-14 px-6 pb-6">
                  <h3 className="text-xl font-bold text-white mb-1">{card.name}</h3>
                  {card.title && (
                    <p className="text-purple-300 text-sm mb-4">{card.title}</p>
                  )}

                  <div className="space-y-3">
                    {/* Informations professionnelles */}
                    {card.company && (
                      <div className="flex items-center text-white/80">
                        <Building2 className="h-4 w-4 text-purple-400 mr-2 flex-shrink-0" />
                        <span className="text-sm truncate">{card.company}</span>
                      </div>
                    )}

                    {/* Contact */}
                    {card.email && (
                      <div className="flex items-center text-white/80">
                        <Mail className="h-4 w-4 text-purple-400 mr-2 flex-shrink-0" />
                        <span className="text-sm truncate">{card.email}</span>
                      </div>
                    )}
                    {card.phone && (
                      <div className="flex items-center text-white/80">
                        <Phone className="h-4 w-4 text-purple-400 mr-2 flex-shrink-0" />
                        <span className="text-sm truncate">{card.phone}</span>
                      </div>
                    )}
                    {card.phoneWork && (
                      <div className="flex items-center text-white/80">
                        <PhoneCall className="h-4 w-4 text-purple-400 mr-2 flex-shrink-0" />
                        <span className="text-sm truncate">{card.phoneWork}</span>
                      </div>
                    )}

                    {/* Sites web */}
                    {card.website && (
                      <div className="flex items-center text-white/80">
                        <Globe className="h-4 w-4 text-purple-400 mr-2 flex-shrink-0" />
                        <a 
                          href={card.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm truncate hover:text-purple-300 transition-colors"
                        >
                          Site personnel
                        </a>
                      </div>
                    )}
                    {card.companyWebsite && (
                      <div className="flex items-center text-white/80">
                        <LinkIcon className="h-4 w-4 text-purple-400 mr-2 flex-shrink-0" />
                        <a 
                          href={card.companyWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm truncate hover:text-purple-300 transition-colors"
                        >
                          Site entreprise
                        </a>
                      </div>
                    )}

                    {/* Adresse */}
                    {card.address && (
                      <div className="flex items-center text-white/80">
                        <MapPin className="h-4 w-4 text-purple-400 mr-2 flex-shrink-0" />
                        <span className="text-sm truncate">{card.address}</span>
                      </div>
                    )}

                    {/* Réseaux sociaux */}
                    <div className="flex items-center space-x-3 pt-2">
                      {card.linkedin && (
                        <a
                          href={card.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                          title="LinkedIn"
                        >
                          <Linkedin className="h-4 w-4 text-purple-400" />
                        </a>
                      )}
                      {card.github && (
                        <a
                          href={card.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                          title="GitHub"
                        >
                          <Github className="h-4 w-4 text-purple-400" />
                        </a>
                      )}
                      {card.facebook && (
                        <a
                          href={card.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                          title="Facebook"
                        >
                          <Facebook className="h-4 w-4 text-purple-400" />
                        </a>
                      )}
                      {card.instagram && (
                        <a
                          href={card.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                          title="Instagram"
                        >
                          <Instagram className="h-4 w-4 text-purple-400" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {cards.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center glass-morphism rounded-xl p-12">
              <QrCode className="h-16 w-16 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-center mb-2">
                Aucune carte de visite
              </h3>
              <p className="text-white/60 text-center mb-6">
                Créez votre première carte de visite numérique
              </p>
              <button
                onClick={() => navigate('/create-card')}
                className="btn-primary !w-auto"
              >
                <Plus className="h-5 w-5 mr-2" />
                Créer une carte
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}