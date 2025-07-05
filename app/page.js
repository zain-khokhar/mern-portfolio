"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { FaGithub, FaCode, FaLinkedin, FaEnvelope, FaServer, FaDatabase } from 'react-icons/fa';

// --- Theme Logic ---
const themes = {
  light: { 
    name: "Light",
    bg: "bg-white",
    text: "text-gray-800",
    accent: "text-blue-700",
    sectionBg: "bg-gray-50",
    cardBg: "bg-white",
    button: "bg-blue-700 hover:bg-blue-800 text-white",
    border: "border-gray-200",
    progress: "bg-blue-600",
  },
  dark: {
    name: "Dark",
    bg: "bg-gray-900",
    text: "text-gray-100",
    accent: "text-blue-400",
    sectionBg: "bg-gray-800",
    cardBg: "bg-gray-800",
    button: "bg-blue-500 hover:bg-blue-600 text-white",
    border: "border-gray-700",
    progress: "bg-blue-500",
  },
  ocean: {
    name: "Ocean",
    bg: "bg-blue-50",
    text: "text-blue-900",
    accent: "text-teal-600",
    sectionBg: "bg-teal-50",
    cardBg: "bg-white",
    button: "bg-teal-600 hover:bg-teal-700 text-white",
    border: "border-teal-200",
    progress: "bg-teal-600",
  },
  forest: {
    name: "Forest",
    bg: "bg-green-50",
    text: "text-green-900",
    accent: "text-emerald-700",
    sectionBg: "bg-emerald-50",
    cardBg: "bg-white",
    button: "bg-emerald-700 hover:bg-emerald-800 text-white",
    border: "border-emerald-200",
    progress: "bg-emerald-700",
  },
};

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [mounted, setMounted] = useState(false);
  const [themeKey, setThemeKey] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && themes[savedTheme]) {
      setThemeKey(savedTheme);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme', themeKey);
    }
  }, [themeKey, mounted]);

  const theme = themes[themeKey];

  return (
    <ThemeContext.Provider value={{ theme, themeKey, setThemeKey }}>
      <div className={`${theme.bg} min-h-screen transition-colors duration-300`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

function useTheme() {
  return useContext(ThemeContext);
}

// Skills data
const skills = [
  {
    name: "Frontend",
    icon: <FaCode />,
    items: ["React", "Redux", "Next.js", "HTML", "CSS", "JavaScript"],
  },
  {
    name: "Backend",
    icon: <FaServer />,
    items: ["Node.js", "Express", "REST APIs", "GraphQL"],
  },
  {
    name: "Database",
    icon: <FaDatabase />,
    items: ["MongoDB", "Mongoose"],
  },
  {
    name: "Tools & Technologies",
    icon: <FaCode />,
    items: ["Postman", "Firebase", "JWT", "OAuth", "Git", "Vercel"],
  },
];

// Projects data
const projects = [
  {
    id: 1,
    title: "LEARNX LMS",
    description: "AI-powered Learning Management System with real-time collaboration.",
    image: "/LMS.PNG",
    imageAlt: "LMS Project Screenshot",
    link: "https://learn-x-lms-ai.vercel.app/",
    technologies: ["Next js", "Node.js", "MongoDB" , "socket.io" ,"AI-powered", "DSA"],
  },
  {
    id: 2,
    title: "AI Tech Blog",
    description: "Explore the frontiers of Artificial Intelligence. News, blogs, and resources on AI innovation.",
    image: "/techblog.png",
    imageAlt: "AI Tech Blog Screenshot",
    link: "#",
    technologies: ["Next.js", "Tailwind CSS","Node js", "React"],
  },
  {
    id: 3,
    title: "Courier Management System",
    description: "Admin dashboard for managing courier branches, staff, parcels, and logistics.",
    image: "/courier.png",
    imageAlt: "Courier Management System Screenshot",
    link: "#",
    technologies: ["Next js", "Node.js", "MongoDB"],
  },
];

// Achievements data
const achievements = [
  {
    id: 1,
    title: "1.5 Years of Self-Learning",
    stat: "1.5 Years",
    description: "Self-employed developer actively learning and building real-world projects for the past 1.5 years, focusing on modern full-stack development."
  },
  {
    id: 2,
    title: "150+ LeetCode Problems Solved",
    stat: "150+",
    description: "Gained problem-solving skills and algorithmic thinking by solving a wide range of coding challenges."
  },
  {
    id: 3,
    title: "6+ Projects",
    stat: "6+",
    description: "Developed and deployed various projects."
  }
];

function PortfolioContent() {
  const { theme, themeKey, setThemeKey } = useTheme();
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, submitted: false, error: '' });

    // Simulate form submission
    setTimeout(() => {
      setFormStatus({ submitting: false, submitted: true, error: '' });
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  // Resume download logic
  const handleDownloadResume = () => {
    // You should place your resume file in the public/ directory, e.g., public/resume.pdf
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Zain_Khokhar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* Theme Switcher */}
      <div className={`${theme.cardBg} fixed top-20 right-4 z-50 border ${theme.border} rounded-md shadow-md`}>
        <select
          value={themeKey}
          onChange={e => setThemeKey(e.target.value)}
          className={`px-3 py-2 rounded-md border ${theme.border} focus:outline-none ${theme.cardBg} ${theme.text}`}
        >
          {Object.entries(themes).map(([key, t]) => (
            <option key={key} value={key}>{t.name}</option>
          ))}
        </select>
      </div>

      {/* Header */}
      <header className={`${theme.cardBg} shadow-sm py-4 w-full sticky top-0 z-40`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className={`text-xl font-bold ${theme.text}`}>ZAIN KHOKHAR</h1>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setShowMobileNav(!showMobileNav)}
            className="md:hidden text-2xl focus:outline-none"
            aria-label="Toggle navigation"
          >
            <svg className={`w-7 h-7 ${theme.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map(item => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className={`${theme.text} hover:${theme.accent} font-medium transition-colors`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        {/* Mobile Navigation */}
        {showMobileNav && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg">
            <ul className="py-2">
              {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map(item => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className={`block py-3 px-4 ${theme.text} hover:bg-gray-100`}
                    onClick={() => setShowMobileNav(false)}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className={`py-55 ${theme.sectionBg}`}>
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className={`text-4xl md:text-5xl font-bold ${theme.text} mb-4`}>
              MERN Stack Developer
            </h1>
            <p className={`text-xl ${theme.text} opacity-80 mb-8`}>
              Building scalable full-stack applications with JavaScript ecosystem
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="#projects" 
                className={`${theme.button} px-6 py-3 rounded-md font-medium transition-colors`}
              >
                View Projects
              </a>
              <a 
                href="#contact" 
                className={`border ${theme.accent} ${theme.text} px-6 py-3 rounded-md font-medium`}
                style={{ borderColor: "currentColor" }}
              >
                Contact Me
              </a>
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={handleDownloadResume}
                className={`${theme.button} w-full max-w-2xl py-2 rounded-md font-medium transition-colors text-lg tracking-wide`}
                style={{ minWidth: '320px', maxWidth: '600px', height: '2.25rem', fontSize: '1.1rem', paddingTop: '0.25rem', paddingBottom: '0.25rem' }}
                type="button"
              >
                Download Resume
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-30 ${theme.cardBg}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-3xl font-bold text-center ${theme.text} mb-12`}>About Me</h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3 flex justify-center">
                <div className="w-64 h-64 rounded-xl overflow-hidden border-2 border-gray-300">
                  <img 
                    src="/logo.png" 
                    alt="Zain Khokhar"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                <p className={`${theme.text} opacity-80 mb-4`}>
                  Hello! I'm Zain, a professional MERN stack developer with 1+ years of experience 
                  building robust web applications.
                </p>
                <p className={`${theme.text} opacity-80 mb-4`}>
                  I specialize in creating efficient, maintainable solutions using MongoDB, Express, 
                  React, and Node.js. My focus is on clean architecture, performance optimization, 
                  and seamless user experiences.
                </p>
                <p className={`${theme.text} opacity-80`}>
                  When not coding, I contribute to open-source projects and write technical articles 
                  about modern JavaScript development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-50 ${theme.sectionBg}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl font-bold text-center ${theme.text} mb-12`}>Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill) => (
              <div key={skill.name} className={`${theme.cardBg} border ${theme.border} p-6 rounded-lg shadow-sm`}>
                <div className={`${theme.accent} mb-4 text-xl`}>{skill.icon}</div>
                <h3 className={`text-xl font-semibold ${theme.text} mb-4`}>{skill.name}</h3>
                <ul className="space-y-2">
                  {skill.items.map((item) => (
                    <li key={item} className={`${theme.text} opacity-80`}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-30 ${theme.cardBg}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl font-bold text-center ${theme.text} mb-12`}>Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className={`border ${theme.border} rounded-lg overflow-hidden shadow-sm`}>
                <div className="w-full h-48 relative">
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-semibold ${theme.text} mb-2`}>{project.title}</h3>
                  <p className={`${theme.text} opacity-80 mb-4`}>
                    {project.link ? (
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {project.description}
                      </a>
                    ) : project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech} 
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience & Achievements Section */}
      <section id="experience" className={`py-36 ${theme.sectionBg}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className={`text-3xl font-bold ${theme.text} mb-4`}>
                Experience & Achievements
              </h2>
              <div className={`w-20 h-1 ${theme.accent} bg-current mx-auto rounded-full`}></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {achievements.map((item) => (
                <div 
                  key={item.id}
                  className={`${theme.cardBg} border ${theme.border} rounded-xl p-6 shadow-sm`}
                >
                  <div className={`text-4xl font-bold ${theme.accent} mb-3`}>{item.stat}</div>
                  <h3 className={`text-xl font-semibold ${theme.text} mb-3`}>{item.title}</h3>
                  <p className={`${theme.text} opacity-90`}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-30 ${theme.cardBg}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-3xl font-bold text-center ${theme.text} mb-12`}>Get In Touch</h2>
            <div className={`${theme.sectionBg} border ${theme.border} p-8 rounded-lg shadow-sm`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className={`text-xl font-semibold ${theme.text} mb-4`}>Contact Information</h3>
                  <div className="space-y-4">
                    <p className={`${theme.text} flex items-center`}>
                      <FaEnvelope className={`mr-3 ${theme.accent}`} />
                      zaink334705@gmail.com
                    </p>
                    <a
                      href="https://www.linkedin.com/in/zain-khokhar-55876832a/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${theme.text} flex items-center hover:${theme.accent} transition-colors`}
                    >
                      <FaLinkedin className={`mr-3 ${theme.accent}`} />
                      linkedin.com/zain-khokhar
                    </a>
                    <a
                      href="https://github.com/zain-khokhar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${theme.text} flex items-center hover:${theme.accent} transition-colors`}
                    >
                      <FaGithub className={`mr-3 ${theme.accent}`} />
                      github.com/zain-khokhar
                    </a>
                    <a
                      href="https://leetcode.com/u/nfQA0hEV3z/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${theme.text} flex items-center hover:${theme.accent} transition-colors`}
                    >
                      <FaCode className={`mr-3 ${theme.accent}`} />
                      leetcode.com/zain-khokhar
                    </a>
                  </div>
                </div>
                <div>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="name" className={`${theme.text} block mb-2`}>Name</label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className={`${theme.text} block mb-2`}>Email</label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className={`${theme.text} block mb-2`}>Message</label>
                      <textarea
                        id="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
                        required
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className={`${theme.button} px-6 py-3 rounded-md font-medium w-full flex justify-center items-center`}
                      disabled={formStatus.submitting}
                    >
                      {formStatus.submitting ? 'Sending...' : 'Send Message'}
                    </button>
                    
                    {formStatus.submitted && (
                      <div className={`p-4 rounded-md bg-green-100 text-green-700 ${theme.text}`}>
                        Message sent successfully!
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${theme.cardBg} border-t ${theme.border} py-8`}>
        <div className="container mx-auto px-4 text-center">
          <p className={`${theme.text} opacity-80`}>&copy; {new Date().getFullYear()} Zain Khokhar. All rights reserved.</p>
          <p className={`mt-2 ${theme.text} opacity-60`}>MERN Stack Developer Portfolio</p>
        </div>
      </footer>
    </>
  );
}

export default function Portfolio() {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  );
}