import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { 
  ArrowLeft, Save, Briefcase, Mail, Phone, Globe, MapPin,
  Facebook, Instagram, Linkedin, Github, PhoneCall
} from 'lucide-react';
import ImageUpload from '../components/ImageUpload';

interface CardFormData {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  phoneWork: string;
  website: string;
  address: string;
  photo: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  github: string;
  companyWebsite: string;
}

const initialFormData: CardFormData = {
  name: '',
  title: '',
  company: '',
  email: '',
  phone: '',
  phoneWork: '',
  website: '',
  address: '',
  photo: '',
  facebook: '',
  instagram: '',
  linkedin: '',
  github: '',
  companyWebsite: ''
};

export default function EditCard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CardFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const loadCard = async () => {
      if (!id) return;
      
      try {
        const docRef = doc(db, 'businessCards', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const cardData = docSnap.data();
          // Ensure all form fields have at least an empty string
          setFormData({
            name: cardData.name || '',
            title: cardData.title || '',
            company: cardData.company || '',
            email: cardData.email || '',
            phone: cardData.phone || '',
            phoneWork: cardData.phoneWork || '',
            website: cardData.website || '',
            address: cardData.address || '',
            photo: cardData.photo || '',
            facebook: cardData.facebook || '',
            instagram: cardData.instagram || '',
            linkedin: cardData.linkedin || '',
            github: cardData.github || '',
            companyWebsite: cardData.companyWebsite || ''
          });
        }
      } catch (error) {
        console.error('Erreur lors du chargement:', error);
      } finally {
        setInitialLoading(false);
      }
    };

    loadCard();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!id) throw new Error('ID non trouvé');
      
      const docRef = doc(db, 'businessCards', id);
      await updateDoc(docRef, formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Erreur lors de la modification:', error);
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUploaded = (url: string) => {
    setFormData(prev => ({ ...prev, photo: url }));
  };

  if (initialLoading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-400"></div>
    </div>;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="mr-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Modifier la Carte de Visite
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="glass-morphism rounded-xl p-6 space-y-6">
            <ImageUpload
              currentImage={formData.photo}
              onImageUploaded={handleImageUploaded}
              userId={auth.currentUser?.uid || ''}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  Nom complet
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-style"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  Titre / Poste
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="input-style"
                  placeholder="Développeur Full Stack"
                />
              </div>

              <div className="flex items-center space-x-4">
                <Briefcase className="h-5 w-5 text-purple-400" />
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="input-style"
                  placeholder="Nom de l'entreprise"
                />
              </div>

              <div className="flex items-center space-x-4">
                <Mail className="h-5 w-5 text-purple-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-style"
                  placeholder="email@exemple.com"
                />
              </div>

              <div className="flex items-center space-x-4">
                <Phone className="h-5 w-5 text-purple-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-style"
                  placeholder="Téléphone personnel"
                />
              </div>

              <div className="flex items-center space-x-4">
                <PhoneCall className="h-5 w-5 text-purple-400" />
                <input
                  type="tel"
                  name="phoneWork"
                  value={formData.phoneWork}
                  onChange={handleChange}
                  className="input-style"
                  placeholder="Téléphone professionnel"
                />
              </div>

              <div className="flex items-center space-x-4">
                <Globe className="h-5 w-5 text-purple-400" />
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="input-style"
                  placeholder="Site personnel"
                />
              </div>

              <div className="flex items-center space-x-4">
                <Globe className="h-5 w-5 text-purple-400" />
                <input
                  type="url"
                  name="companyWebsite"
                  value={formData.companyWebsite}
                  onChange={handleChange}
                  className="input-style"
                  placeholder="Site de l'entreprise"
                />
              </div>

              <div className="flex items-center space-x-4">
                <Facebook className="h-5 w-5 text-purple-400" />
                <input
                  type="url"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleChange}
                  className="input-style"
                  placeholder="Profil Facebook"
                />
              </div>

              <div className="flex items-center space-x-4">
                <Instagram className="h-5 w-5 text-purple-400" />
                <input
                  type="url"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  className="input-style"
                  placeholder="Profil Instagram"
                />
              </div>

              <div className="flex items-center space-x-4">
                <Linkedin className="h-5 w-5 text-purple-400" />
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="input-style"
                  placeholder="Profil LinkedIn"
                />
              </div>

              <div className="flex items-center space-x-4">
                <Github className="h-5 w-5 text-purple-400" />
                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  className="input-style"
                  placeholder="Profil GitHub"
                />
              </div>

              <div className="md:col-span-2 flex items-center space-x-4">
                <MapPin className="h-5 w-5 text-purple-400" />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="input-style"
                  placeholder="Adresse complète"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 text-white/80 hover:text-white transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary !w-auto"
            >
              <Save className="h-5 w-5 mr-2" />
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}