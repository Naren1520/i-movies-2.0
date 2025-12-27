import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Github, Linkedin, Mail, Globe, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const AboutDeveloper: React.FC = () => {
  const skills = [
    'HTML',
    'CSS',
    'Tailwind CSS',
    'JavaScript',
    'TypeScript',
    'React.js',
    'Next.js',
    'Node.js',
    'Express.js',
    'Java',
    'Python',
    'Figma',
    'Git',
    'Supabase',
    'Kali Linux',
    'FatRat',
  ];

  const experience = [
    {
      title: 'Web Development Lead',
      company: 'ISDC',
    },
    {
      title: 'Core Team Member',
      company: 'Challengers (Cybersecurity Domain)',
    },
    {
      title: 'Developer Intern',
      company: 'Sahynex Tech Solutions',
    },
    {
      title: 'Member',
      company: 'IEEE',
    },
  ];

  const contactLinks = [
    {
      icon: MessageCircle,
      label: 'WhatsApp Me',
      href: 'https://wa.me/918296833381?text=Hi%20Naren%2C%20I%20would%20like%20to%20connect%20with%20you',
      color: 'hover:bg-green-100 dark:hover:bg-green-900/30',
    },
    {
      icon: Github,
      label: 'View GitHub',
      href: 'https://github.com/Naren1520',
      color: 'hover:bg-gray-200 dark:hover:bg-gray-800',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/narensj20/',
      color: 'hover:bg-blue-100 dark:hover:bg-blue-900/30',
    },
    {
      icon: Mail,
      label: 'Email Me',
      href: 'mailto:narensonu1520@gmail.com',
      color: 'hover:bg-red-100 dark:hover:bg-red-900/30',
    },
    {
      icon: Globe,
      label: 'Portfolio',
      href: 'https://narensj20.netlify.app',
      color: 'hover:bg-purple-100 dark:hover:bg-purple-900/30',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 transition-colors pt-6 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg font-semibold mb-8 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </motion.button>
        </Link>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <img
              src="/assets/NarenSJ.jpg"
              alt="Naren S J Profile"
              className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-2xl object-cover border-4 border-blue-500 shadow-2xl dark:border-purple-500"
            />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-4">
            About the Developer
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-semibold mb-4">
            Full Stack Developer & Cybersecurity Enthusiast
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-semibold">
              Full Stack Development
            </span>
            <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full font-semibold">
              Cybersecurity
            </span>
          </div>
        </motion.div>

        {/* My Story Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">My Story</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            <p>
              Welcome! I'm the developer behind this project, driven by my passion for creating secure,
              scalable, and efficient web applications. As a full stack developer with a deep interest in
              cybersecurity, I bring a unique perspective to building applications that are not only functional
              but also secure by design.
            </p>
            <p>
              My journey in technology has led me to master both frontend and backend development while
              maintaining a strong focus on security best practices. This project represents the culmination
              of my expertise, built with modern technologies and a security-first mindset.
            </p>
          </div>
        </motion.section>

        {/* Technical Skills Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Technical Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 text-center font-semibold text-gray-800 dark:text-gray-200 shadow-md hover:shadow-lg transition-all"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Experience</h2>
          <div className="space-y-4">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border-l-4 border-blue-500 dark:border-blue-400 pl-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-r-lg transition-colors"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{exp.company}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Achievements Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Achievements</h2>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl p-8 text-white shadow-lg"
          >
            <div className="text-5xl font-bold mb-2">10+</div>
            <div className="text-xl font-semibold">Hackathons Finalist</div>
          </motion.div>
        </motion.section>

        {/* Get In Touch Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Get In Touch</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg text-center mb-8">
            Interested in collaborating or have questions? I'd love to hear from you!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {contactLinks.map(({ icon: Icon, label, href, color }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center gap-3 p-4 rounded-xl transition-all ${color} border border-gray-200 dark:border-gray-700`}
              >
                <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <span className="font-semibold text-gray-800 dark:text-gray-200 text-center text-sm">
                  {label}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};
