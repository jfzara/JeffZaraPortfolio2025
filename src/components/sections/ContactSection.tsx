// Modifié le 2025-05-23 12:18 - Ajout de la section contact avec formulaire
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { SocialIcon } from '../ui/SocialIcon';
import { socialLinks } from '../../data/socialLinks';
import { ContactFormData } from '../../types';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      // Pas besoin d'utiliser la variable error dans cette simulation
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
      href: 'mailto:votre.email@example.com'
    },
    {
      icon: Phone,
      label: 'Téléphone',
      value: '+33 1 23 45 67 89',
      href: 'tel:+33123456789'
    },
    {
      icon: MapPin,
      label: 'Localisation',
      value: 'Paris, France',
      href: 'https://maps.google.com/?q=Paris,France'
    }
  ];

  return (
    <section className="py-20 bg-darkgray" id="contact">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Travaillons <span className="text-neon glow-text">Ensemble</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Vous avez un projet en tête ? N'hésitez pas à me contacter pour discuter 
            de vos besoins et voir comment je peux vous aider.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Informations de contact */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-heading font-semibold mb-6">
                Restons en contact
              </h3>
              <p className="text-gray-300 mb-8">
                Je suis toujours ouvert à de nouvelles opportunités et collaborations. 
                Que ce soit pour un projet freelance, un poste permanent ou simplement 
                pour échanger sur le développement web.
              </p>
            </div>

            {/* Informations de contact */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 p-4 glass-effect rounded-lg hover:glow-box transition-all duration-300 group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-neon bg-opacity-20 rounded-full flex items-center justify-center group-hover:bg-opacity-30 transition-colors">
                      <IconComponent className="w-6 h-6 text-neon" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{info.label}</p>
                      <p className="text-white font-medium">{info.value}</p>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Réseaux sociaux */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Suivez-moi</h4>
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
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="glass-effect p-8 rounded-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Nom complet
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
                    Email
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

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Sujet
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
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-lightgray border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon focus:border-transparent text-white placeholder-gray-400 resize-none"
                  placeholder="Décrivez votre projet ou votre demande..."
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
                      ? 'Message envoyé avec succès ! Je vous répondrai bientôt.'
                      : 'Erreur lors de l\'envoi. Veuillez réessayer.'
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
  );
};