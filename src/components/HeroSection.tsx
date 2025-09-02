import React from 'react';
import { HeartIcon, ShieldCheckIcon, HomeIcon, StarIcon } from '@heroicons/react/24/solid';

export const HeroSection: React.FC = () => {
  console.log('HeroSection rendered');

  const stats = [
    { icon: HeartIcon, number: "150+", label: "Gatitos Adoptados" },
    { icon: ShieldCheckIcon, number: "100%", label: "Vacunados" },
    { icon: HomeIcon, number: "8", label: "Razas Disponibles" },
    { icon: StarIcon, number: "4.9", label: "Calificación" }
  ];

  const testimonials = [
    {
      name: "María González",
      text: "Luna es perfecta para nuestra familia. ¡Gracias por ayudarnos a encontrarla!",
      rating: 5
    },
    {
      name: "Carlos Rodríguez",
      text: "El proceso fue muy fácil y profesional. Simba es increíble.",
      rating: 5
    }
  ];

  const scrollToCatalog = () => {
    const catalogSection = document.querySelector('.catalog-section');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl animate-bounce">🐱</div>
        <div className="absolute top-32 right-20 text-4xl animate-pulse">🐾</div>
        <div className="absolute bottom-20 left-1/4 text-5xl animate-bounce delay-300">😸</div>
        <div className="absolute bottom-32 right-10 text-3xl animate-pulse delay-500">💕</div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Encuentra tu
              <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Compañero Perfecto
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl mb-8 text-purple-100 leading-relaxed">
              Conectamos corazones con patitas. Todos nuestros gatitos están llenos de amor, 
              completamente vacunados y listos para formar parte de tu familia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <button
                onClick={scrollToCatalog}
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Ver Gatitos Disponibles 🐱
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-all duration-200">
                Cómo Adoptar 💕
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white/20 rounded-full p-3 w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                    <stat.icon className="h-8 w-8 text-yellow-300" />
                  </div>
                  <div className="text-2xl font-bold">{stat.number}</div>
                  <div className="text-sm text-purple-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image/Visual */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=400&fit=crop&crop=face"
                alt="Gatito adorable"
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
              
              {/* Floating testimonials */}
              <div className="absolute -top-4 -left-4 bg-white text-gray-800 p-4 rounded-2xl shadow-lg max-w-xs transform -rotate-3">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm font-medium">"{testimonials[0].text}"</p>
                <p className="text-xs text-gray-600 mt-1">- {testimonials[0].name}</p>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white text-gray-800 p-4 rounded-2xl shadow-lg max-w-xs transform rotate-3">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm font-medium">"{testimonials[1].text}"</p>
                <p className="text-xs text-gray-600 mt-1">- {testimonials[1].name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-current text-pink-50">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
};