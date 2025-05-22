'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Menu, Globe, LogIn, UserPlus, LockKeyhole, Mail } from 'lucide-react';
import { inscription, connexion } from '../lib/authStore';
import Link from 'next/link';



export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      if (isLogin) {
        await connexion(email, password);
      } else {
        await inscription(email, password);
      }
      router.push('/dashboard');
    } catch (err) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <div className="relative min-h-screen flex items-center justify-center pt-5 px-4 bg-bg-gray-50">
       {/* === IMAGE DE FOND AVEC OPACITÉ === */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('/assets/images/imexp.jpg')" }}
        />
      </div>
      <div className="absolute inset-0 bg-[#242b4b] opacity-70 z-10" /> 
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-sm fixed top-0 left-0 right-0 z-50 border-b border-gray-100">
        <div className="flex items-center gap-2 text-2xl font-bold text-blue-600">
          <Globe className="w-10 h-10" />
          <Link href="/" className="leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              MAWADA <br />EXPORTECH
            </span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Fonctionnalités</Link>
          <Link href="#process" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Processus</Link>
          <Link href="#dashboard" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Dashboard</Link>
          
          <div className="flex items-center gap-4 ml-4">
            <Link href="/connexion">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">Connexion</Button>
            </Link>
            <Link href="/inscription">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg">
                Essai gratuit
              </Button>
            </Link>
          </div>
        </div>

        <div className="md:hidden">
          <Menu className="w-6 h-6 text-gray-600" />
        </div>
      </nav>

      
      <div className="relative min-h-screen flex items-center justify-center pt-4 px-4 bg-bg-gray-50">
        {/* Fond animé avec dégradé */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0  from-indigo-50/50 to-purple-50/50" />
            {/* Motifs décoratifs */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-100/20 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-100/20 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        {/* Formulaire */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md z-10"
        >
          <Card className="shadow-lg rounded-xl overflow-hidden border-0">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                  <LockKeyhole className="h-6 w-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-white text-center text-2xl font-bold">
                {isLogin ? 'Connexion' : 'Créer un compte'}
              </CardTitle>
              <CardDescription className="text-white/80 text-center">
                {isLogin
                  ? 'Accédez à votre tableau de bord'
                  : 'Rejoignez notre plateforme dès maintenant'}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 bg-white">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Adresse email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="votre@email.com"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="pl-10"
                      minLength={6}
                    />
                  </div>
                </div>
                
                {error && (
                  <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {error}
                  </div>
                )}
                
                <Button
                  type="submit"
                  className="w-full mt-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Chargement...
                    </div>
                  ) : (
                    <>
                      {isLogin ? (
                        <>
                          <LogIn className="mr-2 h-4 w-4" />
                          Se connecter
                        </>
                      ) : (
                        <>
                          <UserPlus className="mr-2 h-4 w-4" />
                          S'inscrire
                        </>
                      )}
                    </>
                  )}
                </Button>
                
                <div className="text-center text-sm text-gray-500 mt-4">
                  <p>
                    {isLogin ? 'Nouveau sur TradeFlow ?' : 'Déjà un compte ?'}{' '}
                    <button
                      type="button"
                      onClick={() => setIsLogin(!isLogin)}
                      className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                    >
                      {isLogin ? 'Créer un compte' : 'Se connecter'}
                    </button>
                  </p>
                </div>
                
                <div className="relative mt-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Ou continuer avec</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <Button variant="outline" type="button" className="flex items-center">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.784-1.672-4.152-2.703-6.735-2.703-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.524 10-10 0-0.67-0.069-1.325-0.189-1.961h-9.811z" />
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" type="button" className="flex items-center">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <div className="text-center text-xs text-gray-500 mt-6">
            <p>En continuant, vous acceptez nos <Link href="/terms" className="text-indigo-600 hover:underline">Conditions d'utilisation</Link> et notre <Link href="/privacy" className="text-indigo-600 hover:underline">Politique de confidentialité</Link>.</p>
          </div>
        </motion.div>
      </div>
     </div>
    </>
  );
}