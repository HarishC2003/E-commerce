import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Sprout, Smartphone, Cog } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function CategoryCards() {
  const navigate = useNavigate();

  const getIcon = (id) => {
    switch (id) {
      case 'agriculture':
        return <Sprout className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#2C4A28]" />;
      case 'electronics':
        return <Smartphone className="w-3.5 h-3.5 md:w-4 md:h-4 text-neutral-800" />;
      case 'automotive':
        return <Cog className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#C23631]" />;
      default:
        return null;
    }
  };

  const handleCardClick = (cardId) => {
    if (cardId === 'agriculture') {
      navigate('/agriculture');
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 w-full pointer-events-auto">
      {/* Responsive layout: smooth horizontal scroll on mobile, 3-column desktop grid */}
      <div className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-3 md:pb-0 gap-3 sm:gap-3.5 lg:gap-4 no-scrollbar">
        {CATEGORIES.map((card) => {
          const isAgri = card.id === 'agriculture';

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`min-w-[270px] sm:min-w-[320px] md:min-w-0 flex-1 shrink-0 snap-center rounded-[22px] sm:rounded-[26px] md:rounded-[28px] overflow-hidden p-4 sm:p-5 md:p-6 lg:p-7 relative h-[185px] sm:h-[210px] md:h-[245px] lg:h-[255px] flex flex-col justify-between shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.1)] transition-all duration-300 group select-none ${
                isAgri ? 'cursor-pointer hover:-translate-y-0.5' : ''
              }`}
              style={{ backgroundColor: card.bgColor }}
            >
              {/* Left Content Area: Badge, Title, Subtitle, Description */}
              <div className="relative z-10 max-w-[50%] sm:max-w-[48%] flex flex-col items-start">
                {/* Circular Icon Badge */}
                <div 
                  className="w-7 h-7 sm:w-7.5 sm:h-7.5 md:w-8 md:h-8 rounded-full flex items-center justify-center mb-2 sm:mb-2.5 md:mb-3.5 transition-transform group-hover:scale-105 duration-200"
                  style={{ backgroundColor: card.iconBg }}
                >
                  {getIcon(card.id)}
                </div>

                {/* Title */}
                <h3 
                  className="text-[17px] sm:text-[19px] md:text-[21px] lg:text-[22px] font-extrabold tracking-tight leading-none"
                  style={{ 
                    color: card.id === 'automotive' ? '#A82420' : card.id === 'agriculture' ? '#0A3325' : '#141414',
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
                  }}
                >
                  {card.title}
                </h3>
                
                {/* Subtitle */}
                <p 
                  className="text-[8.5px] sm:text-[9.5px] md:text-[10px] font-bold tracking-[0.12em] sm:tracking-[0.14em] uppercase mt-0.5 sm:mt-1 mb-1.5 sm:mb-2.5 md:mb-3"
                  style={{ 
                    color: card.id === 'automotive' ? '#D6534E' : card.id === 'agriculture' ? '#5E7A5A' : '#737373' 
                  }}
                >
                  {card.subtitle}
                </p>

                {/* Description */}
                <p 
                  className="text-[11.5px] sm:text-[12.5px] md:text-[13.5px] font-bold leading-[1.25] text-neutral-800"
                >
                  {card.headingLine1}
                  <br />
                  {card.headingLine2}
                </p>
              </div>

              {/* Bottom CTA Button */}
              <div className="relative z-10 mt-2 sm:mt-3 md:mt-4">
                {isAgri ? (
                  <Link
                    to="/agriculture"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="inline-flex items-center gap-1.5 sm:gap-2 group/btn cursor-pointer select-none"
                  >
                    <span 
                      className="w-6 h-6 sm:w-6.5 sm:h-6.5 md:w-7 md:h-7 rounded-full flex items-center justify-center text-white transition-transform duration-200 group-hover/btn:translate-x-0.5 shrink-0"
                      style={{ backgroundColor: card.accentColor }}
                    >
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.2]" />
                    </span>
                    <span 
                      className="text-[11px] sm:text-[11.5px] md:text-[12.5px] font-bold tracking-tight transition-opacity hover:opacity-85 whitespace-nowrap"
                      style={{ color: '#0A3325' }}
                    >
                      {card.cta}
                    </span>
                  </Link>
                ) : (
                  <a
                    href={`#${card.id}`}
                    className="inline-flex items-center gap-1.5 sm:gap-2 group/btn cursor-pointer select-none"
                  >
                    <span 
                      className="w-6 h-6 sm:w-6.5 sm:h-6.5 md:w-7 md:h-7 rounded-full flex items-center justify-center text-white transition-transform duration-200 group-hover/btn:translate-x-0.5 shrink-0"
                      style={{ backgroundColor: card.accentColor }}
                    >
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.2]" />
                    </span>
                    <span 
                      className="text-[11px] sm:text-[11.5px] md:text-[12.5px] font-bold tracking-tight transition-opacity hover:opacity-85 whitespace-nowrap"
                      style={{ color: card.id === 'automotive' ? '#A82420' : '#141414' }}
                    >
                      {card.cta}
                    </span>
                  </a>
                )}
              </div>

              {/* Right Product Imagery with seamless left alpha gradient mask */}
              <div 
                className="absolute right-0 bottom-0 top-0 w-[48%] sm:w-[50%] md:w-[54%] pointer-events-none flex items-end justify-end overflow-hidden"
                style={{
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 22%, black 100%)',
                  maskImage: 'linear-gradient(to right, transparent 0%, black 22%, black 100%)',
                }}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-contain object-right-bottom group-hover:scale-[1.02] transition-transform duration-300"
                  style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.05))' }}
                  loading="eager"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
