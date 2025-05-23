// Modifié le 2025-05-23 16:09 - Ajout du composant SkillBar pour les compétences
import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../../types';

interface SkillBarProps {
  skill: Skill;
  index: number;
}

export const SkillBar: React.FC<SkillBarProps> = ({ skill, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{skill.icon}</span>
          <span className="font-medium text-white">{skill.name}</span>
        </div>
        <span className="text-sm text-gray-300 font-semibold">{skill.level}%</span>
      </div>
      
      <div className="relative h-3 bg-lightgray rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-neon to-green-400 rounded-full glow-box"
        />
        
        {/* Indicateur de progression animé */}
        <motion.div
          initial={{ x: '-100%', opacity: 0 }}
          whileInView={{ x: `${skill.level * 4.5}px`, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="absolute top-1/2 transform -translate-y-1/2 w-1 h-5 bg-white rounded-full shadow-lg"
        />
      </div>
    </motion.div>
  );
};