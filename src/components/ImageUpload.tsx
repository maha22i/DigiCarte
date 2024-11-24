import { useState, useRef } from 'react';
import { Image, Loader2 } from 'lucide-react';
import { storage } from '../lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface ImageUploadProps {
  currentImage?: string;
  onImageUploaded: (url: string) => void;
  userId: string;
}

export default function ImageUpload({ currentImage, onImageUploaded, userId }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérification de la taille (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      setError('Le fichier doit faire moins de 2MB');
      return;
    }

    // Vérification du type
    if (!file.type.startsWith('image/')) {
      setError('Seules les images sont acceptées');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const fileName = `${Date.now()}-${file.name}`;
      const storageRef = ref(storage, `profile-photos/${userId}/${fileName}`);
      
      await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(storageRef);
      
      onImageUploaded(downloadUrl);
    } catch (err) {
      setError('Erreur lors du téléchargement');
      console.error('Erreur upload:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div 
      onClick={() => fileInputRef.current?.click()}
      className="relative flex flex-col items-center justify-center p-8 border-2 border-dashed border-white/20 rounded-lg hover:border-purple-400/50 transition-colors cursor-pointer"
    >
      {currentImage ? (
        <div className="relative w-32 h-32 mb-4">
          <img
            src={currentImage}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
          <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <p className="text-white text-sm">Changer la photo</p>
          </div>
        </div>
      ) : (
        <Image className="h-12 w-12 text-white/40 mb-4" />
      )}

      {!uploading && (
        <p className="text-white/60 text-center">
          {currentImage ? 'Cliquez pour changer la photo' : 'Cliquez pour ajouter une photo'}
          <br />
          <span className="text-sm">JPG, PNG (max. 2MB)</span>
        </p>
      )}

      {uploading && (
        <div className="flex items-center space-x-2">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Téléchargement...</span>
        </div>
      )}

      {error && (
        <p className="text-red-400 text-sm mt-2">{error}</p>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}