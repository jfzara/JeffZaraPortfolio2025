// Modifié le 2025-05-25 17:09 - Ajout de la page de contact
// Modifié le 2025-05-24 17:09 - Ajout de la page de contact
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  Mail, 
  MapPin, 
  Phone, 
  CheckCircle, 
  AlertCircle, 
  ArrowLeft,
  Clock,
  MessageSquare,
  User
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SocialIcon } from '../components/ui/SocialIcon';
import { socialLinks } from '../data/socialLinks';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  projectType: string;
  budget: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    projectType: '',
    budget: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation d'envoi de formulaire
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        projectType: '',
        budget: ''
      });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'votre.email@example.com',
      href: 'mailto:votre.email@example.com',
      description: 'Réponse garantie sous 24h'
    },
    {
      icon: Phone,
      label: 'Téléphone',
      value: '+33 1 23 45 67 89',
      href: 'tel:+33123456789',
      description: 'Lun-Ven: 9h-18h'
    },
    {
      icon: MapPin,
      label: 'Localisation',
      value: 'Paris, France',
      href: 'https://maps.google.com/?q=Paris,France',
      description: 'Disponible pour rencontres'
    }
  ];

  const projectTypes = [
    'Site vitrine',
    'E-commerce',
    'Application web',
    'API/Backend',
    'Maintenance',
    'Consultation',
    'Autre'
  ];

  const budgetRanges = [
    'Moins de 1 000€',
    '1 000€ - 5 000€',
    '5 000€ - 10 000€',
    '10 000€ - 25 000€',
    'Plus de 25 000€',
    'À discuter'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-darkgray"
      >
        <div className="container mx-auto px-6">
          {/* Breadcrumb */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-neon transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>

          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Travaillons <span className="text-neon glow-text">Ensemble</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Vous avez un projet en tête ? Je suis là pour vous accompagner dans sa réalisation.
              Parlons de vos besoins et trouvons ensemble la meilleure solution.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Informations de contact rapides */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 bg-dark"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {contactInfo.map((info) => {
              const IconComponent = info.icon;
              return (
                <motion.a
                  key={info.label}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  variants={itemVariants}
                  className="glass-effect p-6 rounded-xl hover:glow-box transition-all duration-300 group text-center"
                >
                  <div className="w-16 h-16 bg-neon bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-30 transition-colors">
                    <IconComponent className="w-8 h-8 text-neon" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{info.label}</h3>
                  <p className="text-white font-medium mb-1">{info.value}</p>
                  <p className="text-sm text-gray-400">{info.description}</p>
                </motion.a>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Formulaire principal */}
      <section className="py-20 bg-darkgray">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Informations complémentaires */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-heading font-bold mb-6">
                  Discutons de votre projet
                </h2>
                <p className="text-gray-300 mb-8">
                  Que vous ayez besoin d'un site web, d'une application ou d'une consultation,
                  je suis là pour vous accompagner. Remplissez le formulaire et je vous
                  recontacterai rapidement.
                </p>
              </div>

              {/* Processus de collaboration */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">Comment ça marche ?</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-neon bg-opacity-20 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-neon" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">1. Premier contact</h4>
                      <p className="text-gray-300 text-sm">Discussion de vos besoins et objectifs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-neon bg-opacity-20 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-neon" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">2. Analyse détaillée</h4>
                      <p className="text-gray-300 text-sm">Étude technique et proposition personnalisée</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-neon bg-opacity-20 rounded-full flex items-center justify-center">
                      <Clock className="w-4 h-4 text-neon" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">3. Développement</h4>
                      <p className="text-gray-300 text-sm">Réalisation avec suivi régulier</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Réseaux sociaux */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Suivez-moi</h3>
                <div className="flex gap-4">
                  {socialLinks.map((link) => (
                    <SocialIcon key={link.name} {...link} />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Formulaire de contact */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass-effect p-8 rounded-xl"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-lightgray border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon focus:border-transparent text-white placeholder-gray-400"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-lightgray border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon focus:border-transparent text-white placeholder-gray-400"
                      placeholder="votre.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-2">
                      Type de projet
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-lightgray border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon focus:border-transparent text-white"
                    >
                      <option value="">Sélectionner...</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                      Budget estimé
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-lightgray border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon focus:border-transparent text-white"
                    >
                      <option value="">Sélectionner...</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Sujet *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-lightgray border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon focus:border-transparent text-white placeholder-gray-400"
                    placeholder="Sujet de votre message"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-lightgray border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon focus:border-transparent text-white placeholder-gray-400 resize-none"
                    placeholder="Décrivez votre projet en détail : objectifs, fonctionnalités souhaitées, délais..."
                  />
                </div>

                {/* Message de statut */}
                {submitStatus !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center gap-2 p-3 rounded-lg ${
                      submitStatus === 'success' 
                        ? 'bg-green-500 bg-opacity-20 text-green-400 border border-green-400 border-opacity-30'
                        : 'bg-red-500 bg-opacity-20 text-red-400 border border-red-400 border-opacity-30'
                    }`}
                  >
                    {submitStatus === 'success' ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <AlertCircle className="w-5 h-5" />
                    )}
                    <span className="text-sm">
                      {submitStatus === 'success' 
                        ? 'Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.'
                        : 'Erreur lors de l\'envoi. Veuillez réessayer ou me contacter directement.'
                      }
                    </span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-neon text-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all transform hover:scale-105 glow-box disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer le message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ rapide */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 bg-dark"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">Questions fréquentes</h2>
            <p className="text-gray-300">Quelques réponses aux questions les plus courantes</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="glass-effect p-6 rounded-xl">
              <h3 className="font-semibold mb-3">Quels sont vos délais de réponse ?</h3>
              <p className="text-gray-300 text-sm">Je réponds généralement sous 24h en semaine. Pour les urgences, n'hésitez pas à m'appeler directement.</p>
            </div>
            <div className="glass-effect p-6 rounded-xl">
              <h3 className="font-semibold mb-3">Proposez-vous de la maintenance ?</h3>
              <p className="text-gray-300 text-sm">Oui, je propose des contrats de maintenance pour assurer la pérennité et la sécurité de vos projets.</p>
            </div>
            <div className="glass-effect p-6 rounded-xl">
              <h3 className="font-semibold mb-3">Travaillez-vous en remote ?</h3>
              <p className="text-gray-300 text-sm">Absolument ! Je travaille avec des clients partout en France et à l'international en full remote.</p>
            </div>
            <div className="glass-effect p-6 rounded-xl">
              <h3 className="font-semibold mb-3">Quels sont vos tarifs ?</h3>
              <p className="text-gray-300 text-sm">Mes tarifs varient selon la complexité du projet. Je vous fournis toujours un devis détaillé avant de commencer.</p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};