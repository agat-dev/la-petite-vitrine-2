import { PlayIcon } from "lucide-react";
import { CheckIcon } from "lucide-react";
import React from "react";
import { Card } from "../../../../components/ui/card";
import { AnimatedSection } from "../../../../components/ui/animated-section";
import StyledButton from "../../../../components/ui/styled-button";
import StyledWrapper from "../../../../components/ui/button-ui";

export const AboutSection = (): JSX.Element => {
  return (
    <section className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-20 p-4 md:p-8 lg:p-20 relative self-stretch w-full">
      <AnimatedSection animation="slideRight" className="flex flex-col items-start gap-8 lg:gap-12 relative flex-1 w-full lg:w-auto">
        <div className="flex flex-col items-start gap-6 lg:gap-8 relative self-stretch w-full">
          <div className="flex flex-col items-start gap-2 relative self-stretch w-full">
            <h1 className="relative self-stretch mt-[-1.00px] font-heading-1-m md:font-[500] font-[600] text-blue-gray900 text-4xl md:text-6xl lg:text-6xl md:leading-[var(--heading-1-m-line-height)] [font-style:var(--heading-1-m-font-style)]">
              Site web et<br /> Réseaux sociaux<br /><div className="pt-2 font-serif italic text-amber-900">pour les artisans</div>
            </h1>
          </div>

          <p className="relative self-stretch font-body-l font-[number:var(--body-l-font-weight)] text-blue-gray900 text-base md:text-lg lg:text-[length:var(--body-l-font-size)] tracking-[var(--body-l-letter-spacing)] leading-[var(--body-l-line-height)] [font-style:var(--body-l-font-style)]">
            Votre présence digitale complète, clé en main en 5 jours<br /> et résiliable à tout moment<br />
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 relative w-full sm:w-auto">
            <a href="#products">
              <StyledWrapper>
              Voir l'offre
              </StyledWrapper>
            </a>
            {/*}
            <div className="w-full sm:w-auto flex items-center px-2 py-3 rounded-lg hover:bg-amber-50 transition-colors duration-300 cursor-pointer">
              <PlayIcon className="w-6 h-6 text-amber-900" />
              <span className="px-2 font-button-m font-[number:var(--button-m-font-weight)] text-amber-900 text-sm md:text-base lg:text-[length:var(--button-m-font-size)] tracking-[var(--button-m-letter-spacing)] leading-[var(--button-m-line-height)] whitespace-nowrap [font-style:var(--button-m-font-style)]">
                Voir une démo
              </span>
            </div>
            */}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection animation="slideLeft" delay={200} className="relative w-full max-w-[486px] h-[300px] md:h-[350px] lg:h-[423px] mt-20 md:mt-8 lg:mt-0">
        {/* Badge Satisfait ou remboursé en haut à gauche */}
        <div className="absolute top-[20%] -left-[8%] z-10 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg hover:scale-110 transition-transform duration-300 flex items-center gap-1">
          <CheckIcon className="w-4 h-4" />
          Satisfait ou remboursé
        </div>
        
        {/* Badge Livré en 5 jours en haut à droite */}
        <div className="absolute top-[5%] right-[5%] z-10 bg-black text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg hover:scale-110 transition-transform duration-300">
          Livré en 5 jours
        </div>
        
        {/* Badge Résiliable en bas à droite */}
        <div className="absolute bottom-[15%] md:-right-[12%] -right-[5%] z-10 bg-amber-900 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg hover:scale-110 transition-transform duration-300">
          Résiliable à tout moment
        </div>
        
        <Card className="relative w-full h-full border-none bg-transparent">
          <div className="relative h-full">            
            <div className="absolute right-[0%] -top-[14%] w-max p-8 rounded-[30px] bg-amber-600 text-center font-body-l font-[number:var(--body-l-font-weight)] text-white text-3xl md:text-4xl lg:text-5xl tracking-[var(--body-l-letter-spacing)] [font-style:var(--body-l-font-style)] z-50">
              <p>390€</p><p className="mt-2 md:text-3xl text-2xl italic">+ 9 ou 29€/mois</p>
            </div>
            <div className="absolute w-[75%] h-[85%] top-[12%] left-[12%] bg-amber-400 rounded-[30px] md:rounded-[40px] lg:rounded-[50px] transition-transform duration-700 hover:scale-105" />
            <img
              className="absolute w-[70%] h-[130%] top-[0%] -left-[0%] object-cover object-left-top transition-transform duration-700 hover:scale-105"
              alt="Collectible sneakers"
              src="/woman-mobile.png"
            />
          </div>
        </Card>
      </AnimatedSection>
    </section>
  );
};