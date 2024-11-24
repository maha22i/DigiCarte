import { useEffect, useState } from 'react';

interface NFCHookResult {
  isNFCSupported: boolean;
  writeNFCTag: (url: string) => Promise<void>;
  error: string | null;
}

export function useNFC(): NFCHookResult {
  const [isNFCSupported, setIsNFCSupported] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Vérifier si le navigateur supporte NFC
    if ('NDEFReader' in window) {
      setIsNFCSupported(true);
    }
  }, []);

  const writeNFCTag = async (url: string) => {
    if (!isNFCSupported) {
      setError('NFC n\'est pas supporté sur cet appareil');
      return;
    }

    try {
      const ndef = new (window as any).NDEFReader();
      await ndef.write({
        records: [{
          recordType: "url",
          data: url,
        }]
      });
    } catch (err) {
      console.error('Erreur NFC:', err);
      setError('Erreur lors de l\'écriture NFC. Assurez-vous que NFC est activé.');
    }
  };

  return {
    isNFCSupported,
    writeNFCTag,
    error
  };
}