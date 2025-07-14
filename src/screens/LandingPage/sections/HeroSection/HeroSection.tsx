import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../../../components/ui/card";
import { AnimatedSection } from "../../../../components/ui/animated-section";
import { StaggeredContainer } from "../../../../components/ui/staggered-container";
import StyledButton from "../../../../components/ui/styled-button";
import StyledWrapper from "../../../../components/ui/button-ui";
import { useState } from "react";
import { DemoPopup } from "../../../../components/ui/demo-popup";

export const HeroSection = (): JSX.Element => {

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Card data for mapping
  const cards = [
    {
      image: "..//sans-engagement.png",
      title: "Sans engagement",
      description:
        "Vous pouvez résilier à tout moment votre abonnement mensuel. Votre investissement initial de 290€ est sans engagement.",
    },
    {
      image: "..//keys.png",
      title: "Clé en main",
      description:
        "Nous nous occupons de tout : création complète du site, réseaux sociaux, textes, visuels et optimisation SEO.",
    },
    {
      image: "..//time.png",
      title: "Sous 5 jours",
      description:
        "Vous avez un site web et des réseaux sociaux opérationnels en 5 jours ouvrés. Pas de perte de temps, tout est prêt.",
    },
  ];

  // Background shapes data
  const shapes = [
    {
      className:
        "w-[232px] h-[232px] top-16 left-[1126px] bg-green-700 absolute rounded-[50px] opacity-75",
    },
    {
      className:
        "w-[202px] h-[202px] top-[325px] left-[1017px] bg-fuchsia-700 rounded-[30px] absolute opacity-75",
    },
    {
      className:
        "w-[130px] h-[130px] top-[325px] left-[756px] bg-amber-700 absolute rounded-[30px] opacity-75",
    },
    {
      className:
        "w-[161px] h-[161px] top-0 left-[457px] bg-blue-light700 rounded-[50px] absolute opacity-75",
    },
    {
      className:
        "w-[271px] h-[271px] top-[207px] left-0 bg-pink-700 absolute rounded-[50px] opacity-75",
    },
  ];

  return (
    <section className="-mt-[12%] flex flex-col items-start justify-center gap-12 md:gap-16 lg:gap-20 p-4 md:p-8 lg:p-20 3xl:p-24 4xl:p-32 relative w-full bg-blue-gray900 border-t [border-top-style:solid] border-b [border-bottom-style:solid] border-slate-200 overflow-hidden z-10">
      {/* Container pour centrer le contenu sur très grands écrans */}
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="pt-[18%] flex flex-col md:flex-row items-start gap-8 md:gap-12 lg:gap-20 3xl:gap-24 4xl:gap-32 relative w-full">
          <AnimatedSection
            animation="slideRight"
            className="flex-1 flex flex-col items-start gap-8 md:mb-8 mb-0 md:mt-0 mt-8"
          >
            <div className="flex flex-col items-start gap-2 w-full">
              <h2 className="w-full mt-[-1.00px] md:mb-8 mb-0 font-heading-2 font-medium text-white text-4xl md:text-4xl lg:text-[length:var(--heading-2-font-size)] 3xl:text-7xl 4xl:text-8xl tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
                Simple et sans risque
              </h2>
            </div>
        </AnimatedSection>

        <AnimatedSection animation="slideLeft" delay={200}>
          <button onClick={() => setIsPopupOpen(true)} className="cursor-pointer mb-12">
            <StyledWrapper>Voir une démo</StyledWrapper>
          </button>
        </AnimatedSection>
      </div>

      <div className="flex items-start gap-6 md:gap-8 lg:gap-12 relative w-full overflow-hidden">
        <div className="absolute w-full h-[400px] top-[-31px] left-0 overflow-hidden">
          {shapes.map((shape, index) => (
            <div key={`shape-${index}`} className={shape.className} />
          ))}
        </div>

        <StaggeredContainer
          className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12 relative w-full"
          staggerDelay={200}
          animation="slideUp"
        >
          {cards.map((card, index) => (
            <Card
              key={`card-${index}`}
              className="w-full bg-blue-gray900 rounded-[10px] border border-solid border-slate-900 overflow-hidden group hover:scale-105 transition-all duration-500"
            >
              <div
                className="w-full h-[180px] md:h-[200px] lg:h-[220px] bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${card.image})` }}
              />

              <CardHeader className="pt-4 md:pt-6 lg:pt-8 pb-3 px-4 md:px-6 lg:px-8">
                <h3 className="mt-[-1.00px] font-heading-6 font-[number:var(--heading-6-font-weight)] text-white text-lg md:text-xl lg:text-[length:var(--heading-6-font-size)] tracking-[var(--heading-6-letter-spacing)] leading-[var(--heading-6-line-height)] [font-style:var(--heading-6-font-style)]">
                  {card.title}
                </h3>
              </CardHeader>

              <CardContent className="px-4 md:px-6 lg:px-8 pb-0">
                <p className="text-white text-sm md:text-base lg:text-[length:var(--body-l-font-size)] leading-[var(--body-l-line-height)] font-body-l font-[number:var(--body-l-font-weight)] tracking-[var(--body-l-letter-spacing)] [font-style:var(--body-l-font-style)]">
                  {card.description}
                </p>
              </CardContent>

              <CardFooter className="p-4 md:p-6 lg:p-8">

              </CardFooter>
            </Card>
          ))}
        </StaggeredContainer>
        </div>
        <div className="w-64 mx-auto md:mb-0 mb-8">
            <a href="#products" className="w-full flex items-center justify-center">
              <StyledButton className="w-full flex items-center justify-center">
                <span className="ml-2">Voir les offres</span>
              </StyledButton>
            </a>
            </div>
      </div>
            {/* Demo Popup */}
      <DemoPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </section>
  );
};