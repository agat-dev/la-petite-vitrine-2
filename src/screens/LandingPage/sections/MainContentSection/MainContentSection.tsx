import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "../../../../components/ui/card";
import { AnimatedSection } from "../../../../components/ui/animated-section";
import { AnimatePresence, motion } from "framer-motion";
import { X, Play } from "lucide-react";
import StyledWrapper from "../../../../components/ui/button-ui";

export const MainContentSection = (): JSX.Element => {

  // Benefits list data
  const benefits = [
    "Site web professionnel responsive",
    "Pages de réseau sociaux professionnels",
    "Livraison en 5 jours ouvrés",
    "Résiliable à tout moment",
  ];

  const demoCards = [
    {
      image: "/artisan-renov.jpg",
      title: "Site d'artisan rénovateur",
      description: "OnePage vitrine pour artisans avec réalisations et témoignages",
      category: "Vitrine",
      url: "https://artisan-renov.lapetitevitrine.com",
    },
    {
      image: "/artisan-coiffeur.jpg",
      title: "Site d'artisan coiffeur",
      description:
        "OnePage vitrine pour coiffeurs avec formulaire de contact",
      category: "Vitrine",
      url: "https://artisan-coiffeur.lapetitevitrine.com",
    },
    {
      image: "/artisan-menuisier.jpg",
      title: "Site d'artisan menuisier",
      description: "OnePage vitrine pour menuisiers avec galerie de réalisations",
      category: "Vitrine",
      url: "https://artisan-menuisier.lapetitevitrine.com",
    },
  ];

  return (
    <section id="demos" className="flex flex-col items-start pt-16 md:pb-36 pb-36 relative self-stretch w-full">
      {/* Container pour centrer le contenu sur très grands écrans */}
      <div className="w-full max-w-[1600px] mx-auto">
        <AnimatedSection animation="scaleIn" className="w-full">
          <Card className="flex flex-col lg:flex-row min-h-[400px] lg:h-[496px] 3xl:h-[600px] 4xl:h-[700px] items-center gap-8 lg:gap-20 3xl:gap-24 4xl:gap-32 p-6 md:p-12 lg:p-20 3xl:p-24 4xl:p-32 relative self-stretch w-full rounded-[20px] lg:rounded-[30px] transition-all duration-500">
            <div className="flex flex-col items-start gap-6 relative w-full lg:w-auto">
              <AnimatedSection animation="slideRight" delay={200}>
                <div className="w-full lg:w-[520px] 3xl:w-[640px] 4xl:w-[800px] gap-6 flex flex-col items-start relative">
                  <div className="flex-col items-start gap-2 flex relative self-stretch w-full">
                    <h2 className="mt-[-1.00px] text-blue-gray900 relative self-stretch font-heading-2 md:font-medium font-bold text-4xl md:text-6xl 3xl:text-7xl 4xl:text-8xl tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
                      Voir <span className="pt-4 font-serif italic text-amber-800">les démos</span>
                    </h2>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="slideUp" delay={400}>
                <div className="flex flex-col items-start relative gap-2">
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center gap-2 relative group"
                      style={{ animationDelay: `${600 + index * 100}ms` }}
                    >
                      <CheckIcon className="w-6 h-6 text-green-600 transition-transform duration-300 group-hover:scale-110" />
                      <p className="relative w-fit mt-[-2.00px] font-body-XL font-[number:var(--body-XL-font-weight)] text-blue-gray900 text-base md:text-lg lg:text-[length:var(--body-XL-font-size)] tracking-[var(--body-XL-letter-spacing)] leading-[var(--body-XL-line-height)] [font-style:var(--body-XL-font-style)]">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection animation="slideUp" delay={800}>
                <a href="#products">
                  <StyledWrapper className="cursor-pointer">
                    Voir les tarifs
                  </StyledWrapper>
                </a>
              </AnimatedSection>
            </div>

            {/* Decorative shapes - hidden on mobile */}
            <div className="hidden lg:block absolute w-[500px] h-[600px] top-[-60px] right-[100px] overflow-hidden">
              <div className="relative h-[500px] w-full">
                <div className="absolute w-[500px] h-[500px] top-0 left-0">
                  <div className="absolute w-[400px] h-[150px] top-[150px] left-[20px] bg-amber-200 -rotate-45" />
                  <div className="absolute w-[60px] h-[60px] top-[350px] left-[300px] bg-fuchsia-700 rounded-[30px] opacity-75" />
                  <div className="w-[70px] h-[70px] top-[100px] left-[50px] bg-amber-700 absolute rounded-[30px] opacity-75" />
                  <div className="w-[150px] h-[150px] top-[280px] left-[320px] bg-pink-700 absolute rounded-[50px] opacity-75" />
                </div>
                <div className="w-[50px] h-[50px] top-[40px] left-[350px] bg-blue-light700 rounded-[50px] absolute opacity-75" />
              </div>
            </div>

            <AnimatedSection animation="slideLeft" delay={600}>
              <Card className="w-full flex items-center relative flex-1 grow mt-0 lg:mt-[-7.00px] mb-0 lg:mb-[-7.00px] rounded-[15px] lg:rounded-[20px] overflow-hidden border-[3px] lg:border-[3px] border-solid border-[#ffffff] hover:scale-105 transition-transform duration-500 z-20">
                <AnimatePresence>
                  <Card className="bg-amber-600 backdrop-blur-md">
                    <CardHeader className="relative p-4 pb-2 bg-gradient-to-r from-amber-50/80 to-blue-gray100/30 backdrop-blur-md rounded-t-[20px]">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-900 to-amber-800 rounded-full flex items-center justify-center shadow-lg">
                          <Play className="w-6 h-6 text-white ml-0.5" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-blue-gray100 font-heading-2">
                            Découvrez nos sites d'artisans
                          </h2>
                          <p className="text-blue-gray200 font-body-m text-sm">
                            Votre site web professionnel en 5 jours
                          </p>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-8">
                      <div className="space-y-4">
                        {/* Demo Cards - 2 colonnes */}
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                          {demoCards.map((card, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="group cursor-pointer"
                              onClick={() => window.open(card.url, "_blank")}
                            >
                              <Card className="overflow-hidden backdrop-blur-md bg-white/10 hover:bg-white/20 hover:backdrop-blur-lg transition-all duration-500 rounded-[12px] hover:scale-105 hover:border-white/40">
                                <div className="relative">
                                  <img
                                    src={card.image}
                                    alt={card.title}
                                    className="w-full h-32 object-cover scale-120 group-hover:scale-140 transition-transform duration-500"
                                  />
                                  <div className="absolute top-2 left-2">
                                    <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                                      {card.category}
                                    </span>
                                  </div>
                                  {/* Overlay qui apparaît au hover */}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                                    <div className="bg-white/30 backdrop-blur-md rounded-full p-2 border border-white/40 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                                      <Play className="w-4 h-4 text-white" />
                                    </div>
                                  </div>
                                </div>
                                <CardContent className="p-3 bg-white backdrop-blur-sm">
                                  <h4 className="text-sm font-bold text-blue-gray900 font-heading-6 mb-1 group-hover:text-amber-900 transition-colors duration-300">
                                    {card.title}
                                  </h4>
                                  <p className="text-blue-gray600 font-body-m text-xs leading-relaxed group-hover:text-blue-gray700 transition-colors duration-300">
                                    {card.description}
                                  </p>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatePresence>
              </Card>
            </AnimatedSection>
          </Card>
        </AnimatedSection>
        {/* Additional decorative shape - hidden on mobile */}
      </div>
    </section>
  );
};