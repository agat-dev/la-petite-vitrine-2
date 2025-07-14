import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { StaggeredContainer } from "../../../../components/ui/staggered-container";

export const SidebarSection = (): JSX.Element => {
  // Feature card data for mapping
  const featureCards = [
    {
      id: 1,
      icon: "/icon---iconoir---trophy.svg",
      iconAlt: "Icon iconoir trophy",
      title: "Votre site web",
      description:
        "Une vitrine One Page pour présenter vos services, vous contacter et donner toutes les informations pratiques à vos clients.",
      decoration: {
        src: "/rectangle-25.svg",
        alt: "Rectangle",
        className: "absolute w-[85px] h-[85px] top-[-42px] left-12 z-50",
      },
    },
    {
      id: 2,
      icon: "/icon---iconoir---tunnel.svg",
      iconAlt: "Icon iconoir tunnel",
      title: "Vos Réseaux Sociaux",
      description:
        "Votre fiche Google My Business et vos pages Facebook et Instagram pour être visible partout où vos clients vous cherchent.",
      decoration: {
        src: "/rectangle-26.svg",
        alt: "Rectangle",
        className: "absolute w-[53px] h-[53px] top-[-15px] left-12 z-50",
      },
    },
    {
      id: 3,
      icon: "/icon---iconoir---tunnel.svg",
      iconAlt: "Icon iconoir tunnel",
      title: "Satisfait ou remboursé",
      description:
        "Si à la livraison, le site ne correspond pas à vos attentes, vous pouvez être remboursé sous 48h sur simple message.",
      decoration: {
        isDiv: true,
        className: "absolute w-[70px] h-[70px] top-[-25px] right-8 z-50 bg-pink-500 rounded-[20px] transform rotate-12 shadow-lg",
      },
    },
  ];

  return (
    <section id="offre" className="max-w-[1400px] mx-auto md:mt-8 mt-36 flex flex-col items-center justify-center gap-12 md:gap-16 lg:gap-20 p-4 md:p-8 lg:p-20 relative w-full">
      <StaggeredContainer 
        className="flex flex-col md:flex-row w-full max-w-[1280px] items-start gap-8 md:gap-12 lg:gap-20 relative z-40"
        staggerDelay={150}
        animation="slideUp"
      >
        {featureCards.map((card) => (
          <div
            key={card.id}
            className="flex flex-col items-center gap-2.5 relative flex-1 group w-full md:w-auto"
          >
            {card.decoration.isDiv ? (
              <div className={card.decoration.className} />
            ) : (
              <img
                className={card.decoration.className}
                alt={card.decoration.alt}
                src={card.decoration.src}
              />
            )}

            <Card className="md:w-[80%] w-full pb-8 px-8 bg-white border-none transition-transform duration-300 group-hover:scale-105">
              <CardContent className="p-0">
                <div className="flex flex-col items-start gap-4 relative w-full">
                  {/*<div className="inline-flex justify-center items-center transition-transform duration-300 group-hover:scale-110">
                    <img
                      className="relative w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
                      alt={card.iconAlt}
                      src={card.icon}
                    />
                  </div>*/}

                  <div className="mt-16 flex flex-col items-start gap-1 relative w-full">
                    <div className="flex items-center gap-2 relative w-full">
                      <h3 className="relative flex-1 mt-[-1.00px] font-subtitle-XL font-bold text-amber-900 text-2xl md:text-3xl lg:text-4xl tracking-[var(--subtitle-XL-letter-spacing)] leading-[var(--subtitle-XL-line-height)] [font-style:var(--subtitle-XL-font-style)]">
                        {card.title}
                      </h3>
                    </div>
                  </div>

                  <p className="relative self-stretch font-body-l font-[number:var(--body-l-font-weight)] text-blue-gray900 text-sm md:text-base lg:text-[length:var(--body-l-font-size)] tracking-[var(--body-l-letter-spacing)] leading-[var(--body-l-line-height)] [font-style:var(--body-l-font-style)]">
                    {card.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </StaggeredContainer>
    </section>
  );
};