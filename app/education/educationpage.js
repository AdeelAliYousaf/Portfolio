"use client";
import React, { useState, useEffect } from 'react';
import { Award, MapPin, Clock } from 'lucide-react';
import ZoomImage from './ZoomImage';
import { portfolio } from '../data/portfolio';

const EducationTimeline = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [mounted, setMounted] = useState(false);
  const educationData = portfolio.education;

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      educationData.forEach((_, index) => {
        setTimeout(() => {
          setVisibleItems(prev => new Set([...prev, index]));
        }, index * 200);
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [educationData]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'text-green-400 bg-green-400/20';
      case 'ongoing': return 'text-blue-400 bg-blue-400/20';
      case 'upcoming': return 'text-purple-400 bg-purple-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white/50"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center text-white">
  <div className="mb-16 py-6 px-4 sm:px-6 lg:px-8 relative overflow-hidden w-full">
  <div className="max-w-4xl mx-auto relative z-10 rounded-2xl p-4 sm:p-8">
          
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold">
              Educational Journey
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              A comprehensive overview of my academic achievements and continuous learning path
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 opacity-50" />

            <div className="space-y-12">
              {educationData.map((education, index) => (
                <div
                  key={education.id}
                  className={`relative transform transition-all duration-700 ${
                    visibleItems.has(index)
                      ? 'translate-x-0 opacity-100'
                      : 'translate-x-4 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="absolute left-2 sm:left-6 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-4 border-black/50 backdrop-blur-sm shadow-lg shadow-blue-500/30 animate-pulse" />

                  <div className="pl-10 sm:pl-16">
                    <div className="group relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-md bg-white/5 hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20">
                      
                      <div className={`absolute inset-0 bg-gradient-to-r ${education.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                      
                      <div className="p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-100 transition-colors">
                                {education.degree}
                              </h3>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(education.status)}`}>
                                {education.status}
                              </span>
                            </div>
                            
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center text-blue-200 font-medium">
                                <Award className="w-4 h-4 mr-2" />
                                {education.institution}
                              </div>
                              
                              <div className="flex items-center text-white/60">
                                <MapPin className="w-4 h-4 mr-2" />
                                {education.location}
                              </div>
                              
                              <div className="flex items-center text-white/60">
                                <Clock className="w-4 h-4 mr-2" />
                                {education.duration}
                              </div>
                            </div>
                          </div>

                        </div>

                        {/* Specialization */}
                        <div className="mb-6 p-3 bg-white/5 rounded-xl border border-white/10">
                          <h4 className="text-purple-300 font-semibold mb-2 text-sm sm:text-base">Specialization</h4>
                          <p className="text-white/80 text-sm">{education.specialization}</p>
                        </div>

                        {/* Achievements */}
                        <div className="mb-6">
                          <h4 className="text-green-300 font-semibold mb-3 flex items-center text-sm sm:text-base">
                            <Award className="w-4 h-4 mr-2" />
                            Key Achievements
                          </h4>
                          <ul className="space-y-2">
                            {education.achievements.map((achievement, idx) => (
                              <li
                                key={idx}
                                className="flex items-start text-white/70 text-xs sm:text-sm"
                              >
                                <div className="w-2 h-2 bg-green-400 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Skills */}
                        <div>
                          <h4 className="text-blue-300 font-semibold mb-3 text-sm sm:text-base">Core Skills Acquired</h4>
                          <div className="flex flex-wrap gap-2">
                            {education.skills.map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/80 text-xs sm:text-sm hover:bg-white/20 hover:scale-105 transition-all duration-200 cursor-default"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Degree image for Associate Degree with ZoomImage client component */}
                        {education.id === 2 && (
                          <div className="mt-8 flex justify-center">
                            <ZoomImage
                              src="/ADPDegree.webp"
                              alt="Associate Degree Certificate"
                              className="rounded-xl shadow-lg max-w-xs sm:max-w-sm md:max-w-md w-full border border-white/10 bg-white/10"
                            />
                          </div>
                        )}
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-1 gap-6">
            <div className="text-center p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300">
              <div className="text-3xl font-bold text-purple-400 mb-2">16</div>
              <div className="text-white/60">Years of Study</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationTimeline;
