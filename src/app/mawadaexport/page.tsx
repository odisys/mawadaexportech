"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Menu, PackageSearch, Globe, BarChart, Bell, FileText, Users, CheckCircle, MapPin, Clock, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Navigation Bar - Version améliorée */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-sm fixed top-0 left-0 right-0 z-50 border-b border-gray-100">
        <div className="flex items-center gap-2 text-2xl font-bold text-blue-600">
          <Globe className="w-10 h-10" />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            MAWADA <br />EXPORTECH
          </span>
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

      {/* Hero Section - Version améliorée */}
      <section className="relative h-screen overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-indigo-900/80 z-10" />
        <Image
          src="/assets/images/imexp.jpg"
          alt="Carte du monde"
          fill
          className="object-cover"
          priority
        />
        
        <div className="relative z-20 container mx-auto h-full flex flex-col justify-center items-center text-center px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              Suivez et Optimisez vos <span className="text-blue-300">opérations d'exportations</span> en temps réel
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              La plateforme tout-en-un pour suivre, analyser et optimiser vos flux commerciaux internationaux
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/connexion">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-medium shadow-lg">
                  Commencer maintenant
                </Button>
              </Link>
              <Link href="#demo">
                <Button variant="outline" className="border-white text-current hover:bg-blue-300 px-8 py-6 text-lg font-medium">
                  Voir la démo
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="absolute bottom-10 animate-bounce">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* Logos Marquee - Section de confiance */}
      <section className="py-8 bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 mb-6">Ils nous font confiance :</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-70">
            {/* Remplacez par vos vrais logos */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-10 w-32 bg-gray-200 rounded-md"></div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Version améliorée */}
      <section id="features" className="py-20 px-4 md:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Une <span className="text-blue-600">solution complète</span> pour vos exports
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez comment SysOpEx simplifie et sécurise toutes les étapes de vos opérations internationales
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart className="w-8 h-8 text-blue-600" />,
                title: "Tableau de bord intelligent",
                description: "Visualisez vos KPI et statistiques d'export sur des dashboards personnalisables."
              },
              {
                icon: <MapPin className="w-8 h-8 text-blue-600" />,
                title: "Suivi géolocalisé",
                description: "Suivez en temps réel la position de vos marchandises sur une carte interactive."
              },
              {
                icon: <Bell className="w-8 h-8 text-blue-600" />,
                title: "Alertes proactives",
                description: "Recevez des notifications pour chaque étape critique de votre processus."
              },
              {
                icon: <FileText className="w-8 h-8 text-blue-600" />,
                title: "Gestion documentaire",
                description: "Centralisez et gérez tous vos documents d'export en un seul endroit sécurisé."
              },
              {
                icon: <Users className="w-8 h-8 text-blue-600" />,
                title: "Équipe dédiée",
                description: "Bénéficiez d'un accompagnement personnalisé par nos experts en commerce international."
              },
              {
                icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
                title: "Conformité garantie",
                description: "Restez en conformité avec les réglementations douanières en temps réel."
              }
            ].map((feature, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 border border-gray-100 rounded-xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Nouvelle section */}
      <section id="process" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Votre <span className="text-blue-600">processus d'export</span> simplifié
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              De la préparation à la livraison, nous accompagnons chaque étape
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-200 top-0"></div>
            
            {/* Steps */}
            <div className="space-y-12 md:space-y-0">
              {[
                {
                  step: "1",
                  title: "Préparation des documents",
                  description: "Générez automatiquement vos documents d'export et vérifiez leur conformité.",
                  icon: <FileText className="w-6 h-6" />
                },
                {
                  step: "2",
                  title: "Dédouanement",
                  description: "Suivez en temps réel l'avancement de vos procédures douanières.",
                  icon: <CheckCircle className="w-6 h-6" />
                },
                {
                  step: "3",
                  title: "Transport & Logistique",
                  description: "Optimisez vos itinéraires et suivez vos marchandises en direct.",
                  icon: <PackageSearch className="w-6 h-6" />
                },
                {
                  step: "4",
                  title: "Livraison & Réception",
                  description: "Confirmation automatique de livraison avec preuve de réception.",
                  icon: <MapPin className="w-6 h-6" />
                },
                {
                  step: "5",
                  title: "Paiement & Facturation",
                  description: "Gérez vos paiements internationaux et factures en toute sécurité.",
                  icon: <Clock className="w-6 h-6" />
                }
              ].map((step, index) => (
                <div key={index} className={`relative md:flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}>
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'} mb-4 md:mb-0`}>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 h-full flex items-center justify-center">
                      <div className="text-blue-600 bg-blue-50 p-4 rounded-lg">
                        {step.icon}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview - Version améliorée */}
      <section id="dashboard" className="py-20 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Un <span className="text-blue-300">tableau de bord</span> puissant
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Prenez le contrôle de vos opérations avec notre interface intuitive
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
            <div className="p-1 bg-gradient-to-r from-blue-500/20 to-indigo-500/20">
              <div className="flex space-x-2 p-3">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div className="p-8">
              <div className="bg-gray-900 rounded-lg overflow-hidden h-96 flex items-center justify-center">
                <div className="text-center p-8">
                  <Image 
                    src="/assets/images/dashboard-preview.png" 
                    alt="Aperçu du dashboard" 
                    width={800} 
                    height={450}
                    className="rounded-lg shadow-xl border border-gray-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Prêt à révolutionner vos exports ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Essayez SysOpEx gratuitement pendant 14 jours et découvrez comment nous pouvons simplifier vos opérations internationales.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/inscription">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 px-8 py-6 text-lg font-medium shadow-lg">
                Commencer l'essai gratuit
              </Button>
            </Link>
            <Link href="#demo">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg font-medium">
                Demander une démo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}