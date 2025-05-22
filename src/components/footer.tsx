import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';


export function Footer() {
  return (
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 text-2xl font-bold mb-4">
                {/* <Globe className="w-6 h-6 text-blue-400" /> */}
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  MAWADA EXPORTECH
                </span>
              </div>
              <p className="text-gray-400">
                La plateforme tout-en-un pour optimiser et sécuriser vos opérations d'export.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Navigation</h3>
              <ul className="space-y-2">
                <li><Link href="#features" className="text-gray-400 hover:text-white transition">Fonctionnalités</Link></li>
                <li><Link href="#process" className="text-gray-400 hover:text-white transition">Processus</Link></li>
                <li><Link href="#dashboard" className="text-gray-400 hover:text-white transition">Dashboard</Link></li>
                <li><Link href="#testimonials" className="text-gray-400 hover:text-white transition">Témoignages</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Légal</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white transition">Conditions d'utilisation</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition">Politique de confidentialité</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition">Mentions légales</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>contact@mawadaexportech.com</li>
                <li>+33 1 23 45 67 89</li>
                <li>Ouagadougou, Burkina Faso</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
            © {new Date().getFullYear()}  MAWADA EXPORTECH. Tous droits réservés.
          </div>
        </div>
      </footer>
  );
}