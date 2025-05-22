"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import { CheckIcon, ChevronLeft, ChevronRight, X, HelpCircle, Bell, Settings, FileText, BarChart2, MapPin, User, Mail, Download, Globe, Gavel, BookOpen, Truck, ClipboardCheck, Shield, CreditCard, MessageCircle, LogOut } from "lucide-react";
import "leaflet/dist/leaflet.css";
import Link from 'next/link';
import { useRouter } from "next/navigation";

const stepDetails = [
  {
    label: "Déclaration Douanière",
    description: "Remplissez et soumettez la déclaration en douane pour les biens importés/exportés.",
    instructions: "Complétez tous les champs requis. Besoin d'aide ? Contactez nos experts.",
    document: "/docs/declaration-douaniere.pdf",
    pricing: "100€",
    expert: "Jean Dupont",
    expertRole: "Spécialiste en douanes",
    avatar: "/experts/jean.jpg",
    location: "Paris, France",
    coordinates: [48.8566, 2.3522],
    date: "2025-05-17",
    fields: [
      { name: "numDeclaration", label: "Numéro de déclaration", type: "text" },
      { name: "dateDeclaration", label: "Date de déclaration", type: "date" }
    ]
  },
  {
    label: "Contrôle Qualité",
    description: "Inspection des marchandises pour respecter les normes.",
    instructions: "Assurez-vous que les documents de certification sont à jour.",
    document: "/docs/controle-qualite.pdf",
    pricing: "75€",
    expert: "Sophie Durand",
    expertRole: "Ingénieure qualité",
    avatar: "/experts/sophie.jpg",
    location: "Lyon, France",
    coordinates: [45.7640, 4.8357],
    date: "2025-05-18",
    fields: [
      { name: "rapportControle", label: "Rapport de contrôle", type: "textarea" }
    ]
  },
  {
    label: "Certification Sanitaire",
    description: "Validez que les produits répondent aux exigences sanitaires.",
    instructions: "Téléversez les analyses de laboratoire et certifications sanitaires.",
    document: "/docs/certification-sanitaire.pdf",
    pricing: "90€",
    expert: "Dr. Ahmed Benali",
    expertRole: "Expert sanitaire",
    avatar: "/experts/ahmed.jpg",
    location: "Marseille, France",
    coordinates: [43.2965, 5.3698],
    date: "2025-05-19",
    fields: [
      { name: "certificatSanitaire", label: "Certificat sanitaire", type: "file" }
    ]
  },
  {
    label: "Transport & Livraison",
    description: "Suivi de l'acheminement jusqu'à la destination finale.",
    instructions: "Confirmez l'adresse de livraison et informations de transport.",
    document: "/docs/transport-livraison.pdf",
    pricing: "120€",
    expert: "Julie Morel",
    expertRole: "Responsable logistique",
    avatar: "/experts/julie.jpg",
    location: "Bordeaux, France",
    coordinates: [44.8378, -0.5792],
    date: "2025-05-20",
    fields: [
      { name: "adresseLivraison", label: "Adresse de livraison", type: "text" },
      { name: "dateLivraison", label: "Date estimée de livraison", type: "date" }
    ]
  }
];

const regulationsData = [
  {
    category: "Douanes",
    items: [
      { title: "Code des douanes 2025", link: "/docs/code-douanes.pdf" },
      { title: "Procédures d'importation", link: "/docs/procedures-import.pdf" },
      { title: "Tarifs douaniers par pays", link: "/docs/tarifs-douaniers.pdf" }
    ]
  },
  {
    category: "Normes",
    items: [
      { title: "Normes CE pour produits industriels", link: "/docs/normes-ce.pdf" },
      { title: "Certifications sanitaires", link: "/docs/certifs-sanitaires.pdf" },
      { title: "Règlementations textiles", link: "/docs/reg-textiles.pdf" }
    ]
  },
  {
    category: "Transport",
    items: [
      { title: "Règles Incoterms 2025", link: "/docs/incoterms.pdf" },
      { title: "Documentation transport maritime", link: "/docs/transport-maritime.pdf" },
      { title: "Checklist export aérien", link: "/docs/checklist-aerien.pdf" }
    ]
  }
];

const statsData = [
  { name: "Jan", imports: 120, exports: 80 },
  { name: "Fév", imports: 210, exports: 150 },
  { name: "Mar", imports: 160, exports: 120 },
  { name: "Avr", imports: 300, exports: 200 },
  { name: "Mai", imports: 250, exports: 180 },
  { name: "Juin", imports: 400, exports: 320 }
];

const checkpoints = [
  { id: 1, name: "Commande confirmée", status: "completed", date: "2025-05-10", location: "Paris, France" },
  { id: 2, name: "Documentation préparée", status: "completed", date: "2025-05-12", location: "Paris, France" },
  { id: 3, name: "Contrôle douanier", status: "completed", date: "2025-05-15", location: "Le Havre, France" },
  { id: 4, name: "Chargement", status: "current", date: "2025-05-18", location: "Le Havre, France" },
  { id: 5, name: "En transit maritime", status: "pending", date: "2025-05-22", location: "Océan Atlantique" },
  { id: 6, name: "Arrivée destination", status: "pending", date: "2025-06-05", location: "New York, USA" },
  { id: 7, name: "Livraison finale", status: "pending", date: "2025-06-08", location: "Client final" }
];

function ProgressSteps({ total, current, completedSteps }: { total: number; current: number; completedSteps: number }) {
  return (
    <div className="flex justify-between items-center mb-8 px-4 relative">
      <div className="absolute top-5 left-10 right-10 h-1 bg-gray-200 z-0">
        <div 
          className="h-full bg-blue-600 transition-all duration-500" 
          style={{ width: `${(completedSteps / (total - 1)) * 100}%` }}
        />
      </div>
      
      {Array.from({ length: total }).map((_, i) => {
        const isCompleted = i < completedSteps;
        const isCurrent = i === current;

        let bgColor = "bg-gray-200 text-gray-600 border-gray-300";
        if (isCompleted) bgColor = "bg-green-500 text-white border-green-600";
        else if (isCurrent) bgColor = "bg-blue-600 text-white border-blue-700";

        return (
          <div key={i} className="flex flex-col items-center z-10">
            <div
              className={`flex items-center justify-center rounded-full w-10 h-10 mb-2 transition-all duration-300 border-2 ${bgColor}`}
            >
              {isCompleted ? (
                <CheckIcon className="w-5 h-5" />
              ) : (
                <span className="font-semibold">{i + 1}</span>
              )}
            </div>
            <span
              className={`text-xs text-center max-w-20 ${
                isCurrent ? "text-blue-700 font-semibold" : "text-gray-500"
              }`}
            >
              {stepDetails[i].label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3"
      onClick={onClose}
    >
      <CheckIcon className="w-5 h-5" />
      <span>{message}</span>
    </motion.div>
  );
}

export default function Dashboard() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Record<number, Record<string, any>>>({});
  const [completedSteps, setCompletedSteps] = useState(0);
  const [toastMsg, setToastMsg] = useState("");
  const [activeTab, setActiveTab] = useState("operations");
  const [chatOpen, setChatOpen] = useState(false);
  const [user, setUser] = useState({ name: "test user", email: "test.user@mawadaexportech.com" });
  const router = useRouter();

  const currentStep = stepDetails[step];
  const totalSteps = stepDetails.length;

  function handleInputChange(fieldName: string, value: any) {
    setFormData((prev) => ({
      ...prev,
      [step]: {
        ...prev[step],
        [fieldName]: value
      }
    }));
  }

  function handleSubmit() {
    const currentData = formData[step];
    if (!currentData || Object.values(currentData).some((v) => v === "" || v === undefined || v === null)) {
      setToastMsg("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setCompletedSteps((prev) => Math.max(prev, step + 1));
    setToastMsg(`Étape "${currentStep.label}" soumise avec succès !`);

    if (step < totalSteps - 1) {
      setStep(step + 1);
    }
  }

  const handleLogout = () => {
    // Ici vous pourriez ajouter une logique de déconnexion (effacer le token, etc.)
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Barre de navigation supérieure */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center">
              <Globe className="h-6 w-6 text-blue-600 mr-2" />
              <h1 className="text-xl font-bold text-gray-900 leading-tight">
                MAWADA <br />EXPORTECH
              </h1>
            </Link>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              
              <div className="flex items-center space-x-2 group relative">
                <Image
                  src="/assets/images/imex.jpg"
                  alt=""
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="text-sm font-medium">{user.name}</span>
                
                {/* Menu déroulant */}
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-gray-500 text-xs truncate">{user.email}</div>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Déconnexion
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Reste du code inchangé */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* En-tête du dashboard */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Tableau de bord </h2>
          <p className="text-gray-600">
            Suivi complet de vos opérations internationales
          </p>
        </div>

        {/* Onglets principaux */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100">
            <TabsTrigger value="regulations" className="flex items-center gap-2">
              <Gavel className="h-4 w-4" />
              Réglementation
            </TabsTrigger>
            <TabsTrigger value="operations" className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Suivi des opérations
            </TabsTrigger>
            <TabsTrigger value="experts" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Experts certifiés
            </TabsTrigger>
          </TabsList>

          {/* Contenu des onglets */}
          <TabsContent value="regulations" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {regulationsData.map((section, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      {section.category === "Douanes" && <ClipboardCheck className="h-5 w-5 text-blue-600" />}
                      {section.category === "Normes" && <Shield className="h-5 w-5 text-green-600" />}
                      {section.category === "Transport" && <Truck className="h-5 w-5 text-orange-600" />}
                      {section.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText className="h-4 w-4 text-gray-400" />
                            <span className="text-sm font-medium">{item.title}</span>
                          </div>
                          <a 
                            href={item.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                          >
                            <Download className="h-4 w-4" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                  Ressources utiles
                </CardTitle>
                <CardDescription>Guides et outils pour vos opérations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button variant="outline" className="flex flex-col items-center justify-center h-32 gap-3">
                    <FileText className="h-6 w-6 text-blue-600" />
                    <span>Générateur de documents</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center justify-center h-32 gap-3">
                    <Globe className="h-6 w-6 text-green-600" />
                    <span>Calculateur de droits de douane</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center justify-center h-32 gap-3">
                    <CreditCard className="h-6 w-6 text-orange-600" />
                    <span>Simulateur de coûts</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center justify-center h-32 gap-3">
                    <MapPin className="h-6 w-6 text-purple-600" />
                    <span>Points de contrôle douaniers</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="operations" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Colonne de gauche - Statistiques */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Vos statistiques</CardTitle>
                    <CardDescription>Import/Export des 6 derniers mois</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={statsData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="imports" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="exports" fill="#10b981" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Checkpoints</CardTitle>
                    <CardDescription>Suivi en temps réel de votre envoi #IMP-2025-0452</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {checkpoints.map((checkpoint) => (
                        <div key={checkpoint.id} className="flex items-start gap-3">
                          <div className={`flex items-center justify-center rounded-full w-6 h-6 mt-1 flex-shrink-0 ${
                            checkpoint.status === "completed" 
                              ? "bg-green-500 text-white" 
                              : checkpoint.status === "current" 
                                ? "bg-blue-600 text-white" 
                                : "bg-gray-200 text-gray-600"
                          }`}>
                            {checkpoint.status === "completed" ? (
                              <CheckIcon className="w-4 h-4" />
                            ) : (
                              <span className="text-xs font-medium">{checkpoint.id}</span>
                            )}
                          </div>
                          <div>
                            <p className={`font-medium ${
                              checkpoint.status === "current" ? "text-blue-700" : "text-gray-700"
                            }`}>
                              {checkpoint.name}
                            </p>
                            <p className="text-sm text-gray-500">{checkpoint.date} • {checkpoint.location}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Colonne centrale - Formulaire étape par étape */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Progression du dossier</CardTitle>
                    <CardDescription>
                      Étape {step + 1} sur {totalSteps} • {Math.round(((step + 1) / totalSteps) * 100)}% complet
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ProgressSteps total={totalSteps} current={step} completedSteps={completedSteps} />

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold flex items-center">
                          {currentStep.label}
                          <Badge variant="outline" className="ml-2">
                            En cours
                          </Badge>
                        </h3>
                        <p className="text-gray-600 mt-1">{currentStep.description}</p>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-800 flex items-center">
                          <HelpCircle className="w-4 h-4 mr-2" />
                          Instructions importantes
                        </h4>
                        <p className="text-blue-700 mt-1">{currentStep.instructions}</p>
                        <div className="mt-3">
                          <a
                            href={currentStep.document}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                          >
                            <FileText className="w-4 h-4 mr-1" />
                            Télécharger le document de référence
                          </a>
                        </div>
                      </div>

                      <form onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                      }} className="space-y-4">
                        {currentStep.fields.map(({ name, label, type }) => {
                          const value = formData[step]?.[name] || "";
                          if (type === "textarea") {
                            return (
                              <div key={name}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  {label}
                                </label>
                                <Textarea
                                  placeholder={`Saisissez votre ${label.toLowerCase()}`}
                                  value={value}
                                  onChange={(e) => handleInputChange(name, e.target.value)}
                                  required
                                  className="min-h-[100px]"
                                />
                              </div>
                            );
                          }
                          if (type === "file") {
                            return (
                              <div key={name}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  {label}
                                </label>
                                <div className="flex items-center">
                                  <label className="cursor-pointer bg-white border border-gray-300 rounded-md px-4 py-2 flex items-center justify-center hover:bg-gray-50">
                                    <span className="text-sm font-medium text-gray-700">
                                      {value ? "Fichier sélectionné" : "Choisir un fichier"}
                                    </span>
                                    <input
                                      type="file"
                                      onChange={(e) =>
                                        handleInputChange(name, e.target.files ? e.target.files[0] : null)
                                      }
                                      required
                                      className="hidden"
                                    />
                                  </label>
                                  {value && (
                                    <span className="ml-3 text-sm text-gray-500">
                                      {value.name}
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          }
                          return (
                            <div key={name}>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                {label}
                              </label>
                              <Input
                                type={type}
                                placeholder={`Saisissez votre ${label.toLowerCase()}`}
                                value={value}
                                onChange={(e) => handleInputChange(name, e.target.value)}
                                required
                              />
                            </div>
                          );
                        })}

                        <div className="pt-2">
                          <Button
                            type="submit"
                            className="w-full"
                            disabled={completedSteps > step}
                          >
                            {completedSteps > step ? (
                              <>
                                <CheckIcon className="w-4 h-4 mr-2" />
                                Étape validée
                              </>
                            ) : (
                              "Valider cette étape"
                            )}
                          </Button>
                        </div>
                      </form>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Colonne de droite - Carte et détails */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Suivi géographique</CardTitle>
                    <CardDescription>Localisation actuelle de votre dossier</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 rounded-lg overflow-hidden">
                      <MapContainer
                        center={currentStep.coordinates}
                        zoom={6}
                        scrollWheelZoom={false}
                        style={{ height: "100%", width: "100%" }}
                      >
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={currentStep.coordinates}>
                          <Popup>
                            <div className="text-sm">
                              <p className="font-semibold">{currentStep.label}</p>
                              <p>{currentStep.location}</p>
                              <p className="text-gray-500">{currentStep.date}</p>
                            </div>
                          </Popup>
                        </Marker>
                      </MapContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Détails financiers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Coût de l'étape actuelle</span>
                        <span className="font-medium">{currentStep.pricing}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Coût total estimé</span>
                        <span className="font-medium">
                          {stepDetails.reduce((acc, curr) => acc + parseInt(curr.pricing), 0)}€
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Montant déjà payé</span>
                        <span className="font-medium">
                          {stepDetails.slice(0, completedSteps).reduce((acc, curr) => acc + parseInt(curr.pricing), 0)}€
                        </span>
                      </div>
                      <div className="border-t pt-3 mt-3">
                        <div className="flex justify-between font-semibold">
                          <span>Reste à payer</span>
                          <span>
                            {stepDetails.slice(completedSteps).reduce((acc, curr) => acc + parseInt(curr.pricing), 0)}€
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full mt-4">Payer maintenant</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="experts" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stepDetails.map((step, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{step.label}</CardTitle>
                    <CardDescription>{step.expertRole}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center text-center space-y-4">
                      <Image
                        src={step.avatar}
                        alt={step.expert}
                        width={96}
                        height={96}
                        className="rounded-full border-4 border-white shadow"
                      />
                      <div>
                        <h3 className="font-semibold">{step.expert}</h3>
                        <p className="text-sm text-gray-500">{step.expertRole}</p>
                        <p className="text-sm text-gray-500 flex items-center justify-center mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          {step.location}
                        </p>
                      </div>
                      <div className="w-full space-y-2">
                        <Button variant="outline" className="w-full gap-2">
                          <Mail className="w-4 h-4" />
                          Envoyer un email
                        </Button>
                        <Button className="w-full gap-2">
                          <MessageCircle className="w-4 h-4" />
                          Chat en direct
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Assistance 24/7</CardTitle>
                <CardDescription>Notre équipe est disponible pour répondre à vos questions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-6 rounded-lg flex flex-col items-center text-center">
                    <h3 className="font-semibold mb-1">Support téléphonique</h3>
                    <p className="text-sm text-gray-600 mb-3">Du lundi au vendredi, 9h-18h</p>
                    <Button variant="link" className="text-blue-600">
                      +33 1 23 45 67 89
                    </Button>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg flex flex-col items-center text-center">
                    <MessageCircle className="h-8 w-8 text-green-600 mb-3" />
                    <h3 className="font-semibold mb-1">Chat en direct</h3>
                    <p className="text-sm text-gray-600 mb-3">Réponse immédiate</p>
                    <Button onClick={() => setChatOpen(true)}>
                      Ouvrir le chat
                    </Button>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-lg flex flex-col items-center text-center">
                    <h3 className="font-semibold mb-1">Rendez-vous</h3>
                    <p className="text-sm text-gray-600 mb-3">Planifiez un appel vidéo</p>
                    <Button variant="outline">
                      Prendre rendez-vous
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Chat d'assistance */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50"
          >
            <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
              <h3 className="font-semibold">Assistance en direct</h3>
              <button onClick={() => setChatOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 h-64 overflow-y-auto">
              <div className="flex items-start gap-2 mb-4">
                <Image
                  src="/experts/sophie.jpg"
                  alt="Expert"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div className="bg-gray-100 p-3 rounded-lg max-w-[70%]">
                  <p className="text-sm">Bonjour ! Je suis Sophie, comment puis-je vous aider aujourd'hui ?</p>
                </div>
              </div>
            </div>
            <div className="border-t p-3">
              <div className="flex gap-2">
                <Input placeholder="Tapez votre message..." className="flex-1" />
                <Button>
                  {/* <Send className="w-4 h-4" /> */}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toastMsg && (
          <Toast
            message={toastMsg}
            onClose={() => {
              setToastMsg("");
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}