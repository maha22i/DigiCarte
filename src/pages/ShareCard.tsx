import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { QrCode, Share2, Copy, ArrowLeft, Smartphone, Download } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useNFC } from '../hooks/useNFC';

export default function ShareCard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { isNFCSupported, writeNFCTag, error: nfcError } = useNFC();

  const cardUrl = `${window.location.origin}/card/${id}`;

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

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(cardUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erreur de copie:', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Carte de visite de ${card?.name}`,
          text: 'Voici ma carte de visite numérique',
          url: cardUrl
        });
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error('Erreur de partage:', err);
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  const handleNFCShare = async () => {
    try {
      await writeNFCTag(cardUrl);
    } catch (err) {
      console.error('Erreur NFC:', err);
    }
  };

  const handleDownloadQR = () => {
    const canvas = document.getElementById('qr-code') as HTMLCanvasElement;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `qr-code-${card?.name || 'carte'}.png`;
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-400"></div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white/60">Carte non trouvée</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] p-6">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
            Partager votre carte
          </h1>
          <p className="text-white/60">
            Scannez le QR code ou utilisez les options de partage ci-dessous
          </p>
        </div>

        <div className="glass-morphism rounded-xl p-8 flex flex-col items-center space-y-8">
          {/* QR Code avec bouton de téléchargement */}
          <div className="relative">
            <div className="p-4 bg-white rounded-xl">
              <QRCodeSVG
                id="qr-code"
                value={cardUrl}
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>
            <button
              onClick={handleDownloadQR}
              className="absolute -bottom-4 right-0 p-2 bg-purple-500 rounded-full hover:bg-purple-600 transition-colors shadow-lg"
              title="Télécharger le QR code"
            >
              <Download className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Options de partage */}
          <div className="w-full space-y-4">
            <button
              onClick={handleShare}
              className="btn-primary flex items-center justify-center space-x-2"
            >
              <Share2 className="h-5 w-5" />
              <span>Partager</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Copy className="h-5 w-5" />
              <span>{copied ? 'Lien copié !' : 'Copier le lien'}</span>
            </button>

            {isNFCSupported && (
              <button
                onClick={handleNFCShare}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Smartphone className="h-5 w-5" />
                <span>Partager via NFC</span>
              </button>
            )}

            {nfcError && (
              <p className="text-red-400 text-sm text-center">{nfcError}</p>
            )}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-white/60 hover:text-white transition-colors"
          >
            Retour au tableau de bord
          </button>
        </div>
      </div>
    </div>
  );
}