// src/components/pages/TracksPage.tsx
import React from 'react';


import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { BookOpen, ChevronRight, Code, TrendingUp, Users } from "lucide-react"

// Import track images
// import technicalImg from '../../assets/tracksImgs/tech.jpg'; // Adjust filename as needed
// import educationImg from '../../assets/tracksImgs/education.jpg'; // Adjust filename as needed
// import fundImg from '../../assets/tracksImgs/fund.jpg'; // Adjust filename as needed
// import managerialImg from '../../assets/tracksImgs/managerial.jpg'; // Adjust filename as needed

const TracksPage: React.FC = () => {
  const [activeTrack, setActiveTrack] = useState<string | null>(null)
  const trackRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const tracks = [
    {
      id: "technical",
      title: "Technical Track",
      
      icon: <Code className="w-6 h-6" />,
      color: "#31B4EF",
      description: `The technical track consists of hands-on software development experience. Members work on real projects for Israeli startups, gaining practical skills in programming, software architecture, and product development. Through collaborative coding sessions and mentorship from industry professionals, participants build a portfolio of work that demonstrates their abilities to future employers.`,
      features: [
        "Real-world coding projects",
        "Software development mentorship",
        "Technical portfolio building",
        "Startup collaboration",
      ],
    },
    {
      id: "education",
      title: "Education Track",

      icon: <BookOpen className="w-6 h-6" />,
      color: "#31B4EF",
      description: `The education track is the entry point for all club members. It is a comprehensive eight-week program designed to build a strong foundation in business, technology, & entrepreneurship. The track features presentations on core consulting & finance concepts, complemented by hands-on projects to reinforce key learnings through real-world application. Members gain in-depth insight into market trends, business strategies, and Israel’s unique innovation ecosystem.`,
      features: [
        "Expert-led workshops",
        "Business case analysis",
        "Market trend insights",
        "Innovation ecosystem study",
      ],
    },
    {
      id: "fund",
      title: "Fund Track",
    
      icon: <TrendingUp className="w-6 h-6" />,
      color: "#31B4EF",
      description: `The Investment Fund program provides students with the foundational tools necessary to navigate the investing world. Students conduct research on Israeli businesses that are undervalued and perform due diligence to estimate intrinsic value. The Fund program at TAMID consists of stock pitch competitions that directly contribute to a global portfolio, competitions to stay engaged with other chapters, and leadership opportunities.`,
      features: [
        "Startup valuation practice",
        "Investment portfolio management",
        "Financial modeling",
        "Venture capital processes",
      ],
    },
    {
      id: "managerial",
      title: "Managerial Track",
      
      icon: <Users className="w-6 h-6" />,
      color: "#31B4EF",
      description: `To help firms increase performance and efficiency, managerial consulting entails assessing business difficulties and making strategic solutions.  Small groups of three to five consultants work together at TAMID on a variety of projects, from operational improvements to market research.  These practical experiences equip students to use creativity and critical thinking to solve real-world business problems.`,
      features: ["Leadership development", "Project management", "Team coordination", "Strategic planning"],
    },
  ]

  const scrollToTrack = (id: string) => {
    if (trackRefs.current[id]) {
      trackRefs.current[id]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
      setActiveTrack(id)
    }
  }

  return (
    <>
     <div className="min-h-screen bg-white dark:bg-[#202020] text-gray-800 dark:text-white transition-colors duration-200">

      {/* Header */}
      <header className="bg-[#2A2A2A] shadow-md border-b border-[#333333]">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            {/* Logo removed */}
          </div>
          <nav className="hidden md:flex">
            {/* Navigation links removed */}
          </nav>
        </div>
      </header>

    

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[#31B4EF]/5" />
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#31B4EF]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#31B4EF]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold tracking-tight text-gray-800 dark:text-white transition-colors duration-200"
            >
              TAMID <span className="text-[#31B4EF]">Tracks</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-xl text-gray-600 dark:text-gray-300 transition-colors duration-200"
            >
              Discover your path to success with our specialized tracks designed to build your skills and prepare you
              for the future.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              {tracks.map((track) => (
                <button
                  key={track.id}
                  onClick={() => scrollToTrack(track.id)}
                  className="px-6 py-3 rounded-md bg-gray-200 dark:bg-[#58585A] text-gray-800 dark:text-white font-medium transition-all hover:bg-[#31B4EF] hover:text-white"
                >
                  {track.title}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tracks Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white transition-colors duration-200">Explore Our Tracks</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-200">
              Each track is designed to provide you with specialized skills and experiences that will help you excel in
              your future career.
            </p>
          </div>

          <div className="space-y-16">
            {tracks.map((track) => (
              <motion.div
                key={track.id}
                ref={(el) => { trackRefs.current[track.id] = el; }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`relative rounded-lg overflow-hidden border border-gray-200 dark:border-[#333333] bg-white dark:bg-[#2A2A2A] transition-colors duration-200 ${
                  activeTrack === track.id ? "ring-2 ring-[#31B4EF]" : ""
                }`}
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2">
                      <div className="flex items-center mb-6">
                        <div className="w-10 h-10 overflow-hidden rounded-md">
                          <div className="w-full h-full flex items-center justify-center">
                            {track.icon}
                          </div>
                        </div>
                        <h3 className="ml-4 text-2xl font-bold text-gray-800 dark:text-white transition-colors duration-200">{track.title}</h3>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-200">{track.description}</p>

                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                        {track.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="mr-2 mt-1 text-[#31B4EF]">
                              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <span className="text-gray-600 dark:text-gray-300 transition-colors duration-200">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <button className="inline-flex items-center px-4 py-2 rounded-md bg-[#31B4EF] text-white font-medium hover:bg-[#31B4EF]/90 transition-all group">
                        Learn More
                        <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>

                    <div className="md:w-1/2 flex items-center justify-center">
                      <div className="bg-gray-200 dark:bg-[#333333] rounded-lg overflow-hidden w-full aspect-square max-w-md transition-colors duration-200">
                        {/* <img 
                          src={track.image} 
                          alt={`${track.title}`}
                          className="w-full h-full object-cover"
                        /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-200 dark:bg-[#2A2A2A] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white transition-colors duration-200">What Our Members Say</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-200">
              Hear from students who have experienced our tracks and how it has impacted their careers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Alex Johnson",
                track: "Technical Track",
                quote:
                  "The technical track gave me real-world coding experience that I couldn't get in the classroom. I built a portfolio that helped me land my dream internship.",
              },
              {
                name: "Sarah Chen",
                track: "Education Track",
                quote:
                  "Through the education track, I gained insights into Israeli business culture and innovation that completely changed my perspective on global entrepreneurship.",
              },
              {
                name: "Michael Rodriguez",
                track: "Fund Track",
                quote:
                  "Analyzing startups and making investment recommendations in the fund track prepared me for my career in venture capital better than any class could have.",
              },
              {
                name: "Priya Patel",
                track: "Managerial Track",
                quote:
                  "The leadership skills I developed in the managerial track have been invaluable. I learned how to coordinate teams and execute projects in a real-world setting.",
              },
              {
                name: "David Kim",
                track: "Technical Track",
                quote:
                  "Working with Israeli startups exposed me to cutting-edge technologies and agile development practices that I now use every day in my software engineering role.",
              },
              {
                name: "Emma Wilson",
                track: "Fund Track",
                quote:
                  "The financial modeling and valuation skills I gained in the fund track gave me a competitive edge when interviewing for investment banking positions.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-200 dark:bg-[#333333] rounded-lg p-6 border border-gray-300 dark:border-[#444444] transition-colors duration-200"
              >
                <div className="h-1 w-16 bg-[#31B4EF] mb-4 rounded-full" />
                <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-200">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#58585A] flex items-center justify-center text-white font-medium">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-800 dark:text-white transition-colors duration-200">{testimonial.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">{testimonial.track}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#31B4EF]/10" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 -left-40 w-80 h-80 bg-[#31B4EF]/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -right-40 w-80 h-80 bg-[#31B4EF]/30 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6 transition-colors duration-200">Ready to Start Your Journey?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 transition-colors duration-200">
              Join TAMID and gain the skills, experience, and connections that will set you apart in today's competitive
              job market.
            </p>
            <button className="px-8 py-4 bg-[#31B4EF] text-white rounded-md font-medium text-lg hover:bg-[#31B4EF]/90 transition-all">
              Apply Now
            </button>
          </motion.div>
        </div>
      </section>

   
    </div>

    </>
  );
};

export default TracksPage;