import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { 
  ArrowLeft, Save, Briefcase, Mail, Phone, Globe, MapPin,
  Facebook, Instagram, Linkedin, Github, PhoneCall
} from 'lucide-react';
import ImageUpload from '../components/ImageUpload';

export default function CreateCard() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error('Non authentifié');

      await addDoc(collection(db, 'businessCards'), {
        ...formData,
        userId,
        createdAt: new Date().toISOString(),
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Erreur lors de la création:', error);
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
            Créer une Carte de Visite
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
              {loading ? 'Création...' : 'Créer la carte'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}