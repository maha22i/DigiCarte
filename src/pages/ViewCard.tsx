import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { 
  Mail, Phone, Globe, MapPin, Share2, Download,
  Facebook, Instagram, Linkedin, Github, Building2,
  PhoneCall, Link as LinkIcon
} from 'lucide-react';

export default function ViewCard() {
  const { id } = useParams();
  const [card, setCard] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCard = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'businessCards', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCard({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error('Erreur lors du chargement:', error);
      } finally {
        setLoading(false);
      }
    };
    loadCard();
  }, [id]);

  const handleDownloadVCard = () => {
    if (!card) return;
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${card.name}
TITLE:${card.title || ''}
ORG:${card.company || ''}
EMAIL:${card.email || ''}
TEL;TYPE=CELL:${card.phone || ''}
TEL;TYPE=WORK:${card.phoneWork || ''}
URL:${card.website || ''}
URL;TYPE=WORK:${card.companyWebsite || ''}
ADR:;;${card.address || ''}
END:VCARD`;

    const blob = new Blob([vCard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${card.name}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a1033]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-400"></div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a1033]">
        <p className="text-white/60">Carte non trouvée</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1033] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* En-tête avec photo */}
        <div className="relative h-48 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-t-3xl overflow-hidden">
          <div className="absolute inset-0 backdrop-blur-sm"></div>
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={handleDownloadVCard}
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              title="Télécharger vCard"
            >
              <Download className="h-5 w-5 text-white" />
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Lien copié !');
              }}
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              title="Partager"
            >
              <Share2 className="h-5 w-5 text-white" />
            </button>
          </div>
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
            {card.photo ? (
              <img
                src={card.photo}
                alt={card.name}
                className="w-32 h-32 rounded-full border-4 border-[#2a1659] object-cover shadow-xl"
              />
            ) : (
              <div className="w-32 h-32 rounded-full border-4 border-[#2a1659] bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-xl">
                <span className="text-4xl font-bold text-white">{card.name.charAt(0)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Corps de la carte */}
        <div className="bg-gradient-to-br from-[#2a1659] to-[#3a1659] rounded-3xl -mt-12 pt-20 pb-8 px-6 shadow-2xl">
          {/* Informations principales */}
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-2xl font-bold text-white">{card.name}</h1>
            {card.title && (
              <p className="text-purple-300">{card.title}</p>
            )}
            {card.company && (
              <p className="text-purple-300/80 text-sm">{card.company}</p>
            )}
          </div>

          {/* Actions rapides */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {card.phone && (
              <a
                href={`tel:${card.phone}`}
                className="flex flex-col items-center p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
              >
                <Phone className="h-6 w-6 text-purple-400 mb-2" />
                <span className="text-xs text-purple-300">Appeler</span>
              </a>
            )}
            {card.email && (
              <a
                href={`mailto:${card.email}`}
                className="flex flex-col items-center p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
              >
                <Mail className="h-6 w-6 text-purple-400 mb-2" />
                <span className="text-xs text-purple-300">Email</span>
              </a>
            )}
            <button
              onClick={handleDownloadVCard}
              className="flex flex-col items-center p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
            >
              <Download className="h-6 w-6 text-purple-400 mb-2" />
              <span className="text-xs text-purple-300">Sauvegarder</span>
            </button>
          </div>

          {/* Réseaux sociaux */}
          {(card.linkedin || card.github || card.facebook || card.instagram) && (
            <div className="flex justify-center space-x-4 mb-8">
              {card.linkedin && (
                <a
                  href={card.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <Linkedin className="h-6 w-6 text-purple-400" />
                </a>
              )}
              {card.github && (
                <a
                  href={card.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <Github className="h-6 w-6 text-purple-400" />
                </a>
              )}
              {card.facebook && (
                <a
                  href={card.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <Facebook className="h-6 w-6 text-purple-400" />
                </a>
              )}
              {card.instagram && (
                <a
                  href={card.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <Instagram className="h-6 w-6 text-purple-400" />
                </a>
              )}
            </div>
          )}

          {/* Détails de contact */}
          <div className="space-y-4">
            {card.phoneWork && (
              <div className="flex items-center p-4 bg-white/5 rounded-xl">
                <PhoneCall className="h-5 w-5 text-purple-400 mr-4" />
                <div>
                  <span className="text-white">{card.phoneWork}</span>
                  <p className="text-sm text-purple-300/60">Téléphone professionnel</p>
                </div>
              </div>
            )}

            {card.website && (
              <a
                href={card.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
              >
                <Globe className="h-5 w-5 text-purple-400 mr-4" />
                <div>
                  <span className="text-white">Site web personnel</span>
                  <p className="text-sm text-purple-300/60 truncate">{card.website}</p>
                </div>
              </a>
            )}

            {card.companyWebsite && (
              <a
                href={card.companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
              >
                <Building2 className="h-5 w-5 text-purple-400 mr-4" />
                <div>
                  <span className="text-white">Site de l'entreprise</span>
                  <p className="text-sm text-purple-300/60 truncate">{card.companyWebsite}</p>
                </div>
              </a>
            )}

            {card.address && (
              <div className="flex items-center p-4 bg-white/5 rounded-xl">
                <MapPin className="h-5 w-5 text-purple-400 mr-4 flex-shrink-0" />
                <div>
                  <span className="text-white">{card.address}</span>
                  <p className="text-sm text-purple-300/60">Adresse</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}