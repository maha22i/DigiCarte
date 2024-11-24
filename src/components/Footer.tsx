import { Mail, Phone, Linkedin, Twitter, Instagram, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#2a1659]/50 backdrop-blur-lg border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* À propos */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              DigiCarte
            </h3>
            <p className="text-white/60">
              Simplifiez vos cartes de visite avec notre solution digitale innovante.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contactez-nous</h4>
            <div className="space-y-2">
              <p className="text-white/60">Mohamed Chehem Mohamed</p>
              <a 
                href="mailto:ali@example.com" 
                className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
              >
                <Mail className="h-4 w-4 mr-2" />
                chehem21@gmail.com
              </a>
              <a 
                href="tel:+25312345678" 
                className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
              >
                <Phone className="h-4 w-4 mr-2" />
                +33 07 75 84 09 62
              </a>
            </div>
          </div>

          {/* Réseaux sociaux */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Suivez-nous</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/mohamed-chehem-563057231/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-purple-400" />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                title="Twitter"
              >
                <Twitter className="h-5 w-5 text-purple-400" />
              </a>
              <a
                href="https://www.instagram.com/chehemmahami/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                title="Instagram"
              >
                <Instagram className="h-5 w-5 text-purple-400" />
              </a>
            </div>
          </div>

          {/* Liens utiles */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Liens utiles</h4>
            <div className="flex flex-col space-y-2">
              <a href="/about" className="text-purple-400 hover:text-purple-300 transition-colors">
                À propos
              </a>
              <a href="/privacy-policy" className="text-purple-400 hover:text-purple-300 transition-colors">
                Politique de confidentialité
              </a>
              <a href="/contact" className="text-purple-400 hover:text-purple-300 transition-colors">
                Contactez-nous
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <p className="text-white/60">
              © 2024 DigiCarte. Tous droits réservés.
            </p>
            <p className="flex items-center text-white/60">
              Développé avec <Heart className="h-4 w-4 mx-2 text-red-400" /> Par Mohamed Chehem Mohamed
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}