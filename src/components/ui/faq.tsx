import { motion } from "framer-motion";
import { Card, CardContent } from "./card";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export type { FAQItem };

interface FAQProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
  className?: string;
  maxWidth?: string;
}

export const FAQ = ({ 
  title = "Foire aux Questions",
  subtitle = "Retrouvez les réponses aux questions les plus fréquentes",
  items,
  className = "",
}: FAQProps): JSX.Element => {
  return (
    <section className={`bg-amber-50 flex flex-col items-center justify-center gap-12 md:gap-16 lg:gap-20 p-6 md:p-12 lg:p-20 3xl:p-24 4xl:p-32 relative overflow-hidden ${className}`}>
      {/* Éléments décoratifs cohérents avec le reste du site */}
      <div className="absolute mt-28 inset-0 overflow-hidden pointer-events-none">
        
        {/* Formes géométriques principales - style AboutSection */}
        <div className="absolute w-[85px] h-[86px] top-[100px] left-[200px] bg-green-700 rounded-[50px] opacity-75" />
        <div className="absolute w-[150px] h-[150px] top-[300px] right-[150px] bg-fuchsia-700 rounded-[30px] opacity-75" />
        <div className="absolute w-[100px] h-[100px] top-[500px] left-[100px] bg-amber-700 rounded-[30px] opacity-75" />
        <div className="absolute w-[120px] h-[120px] top-[50px] right-[300px] bg-blue-light700 rounded-[50px] opacity-75" />
        <div className="absolute w-[200px] h-[200px] bottom-[100px] left-[50px] bg-pink-700 rounded-[50px] opacity-75" />
        
        {/* Cercles décoratifs - style ProductsSection */}
        <div className="absolute w-[60px] h-[60px] top-[150px] right-[100px] bg-blue-gray400 rounded-full opacity-60" />
        <div className="absolute w-[80px] h-[80px] top-[400px] left-[300px] bg-amber-600 rounded-full opacity-50" />
        <div className="absolute w-[40px] h-[40px] bottom-[200px] right-[200px] bg-green-600 rounded-full opacity-70" />
        
        {/* Rectangles arrondis - style CallToActionSection */}
        <div className="absolute w-[180px] h-[60px] top-[200px] left-[50%] transform -translate-x-1/2 bg-amber-400 rounded-[30px] opacity-30" />
        <div className="absolute w-[120px] h-[40px] bottom-[300px] right-[100px] bg-blue-gray300 rounded-[20px] opacity-40" />
        
        {/* Losanges - style HeroSection */}
        <div className="absolute w-[70px] h-[70px] top-[350px] right-[50px] bg-amber-500 rounded-[15px] transform rotate-45 opacity-60" />
        <div className="absolute w-[90px] h-[90px] bottom-[150px] left-[200px] bg-blue-light600 rounded-[20px] transform rotate-12 opacity-50" />
        
        {/* Formes organiques - style MainContentSection */}
        <div className="absolute w-[300px] h-[200px] top-[250px] left-[60%] bg-gradient-to-br from-amber-200/20 to-amber-400/10 rounded-[50px] transform rotate-6 opacity-70" />
        <div className="absolute w-[250px] h-[150px] bottom-[200px] right-[20%] bg-gradient-to-tl from-blue-gray200/20 to-blue-light400/10 rounded-[40px] transform -rotate-3 opacity-60" />
        
        {/* Éléments plus petits pour remplir l'espace */}
        <div className="absolute w-[30px] h-[30px] top-[120px] left-[80%] bg-fuchsia-600 rounded-[10px] opacity-50" />
        <div className="absolute w-[25px] h-[25px] top-[450px] left-[20%] bg-green-500 rounded-full opacity-60" />
        <div className="absolute w-[35px] h-[35px] bottom-[350px] left-[70%] bg-amber-600 rounded-[15px] transform rotate-30 opacity-55" />
        
        {/* Lignes décoratives subtiles */}
        <div className="absolute w-[2px] h-[100px] top-[180px] left-[40%] bg-gradient-to-b from-amber-400/30 to-transparent rounded-full" />
        <div className="absolute w-[2px] h-[80px] bottom-[250px] right-[40%] bg-gradient-to-b from-blue-gray400/30 to-transparent rounded-full" />
        
        {/* Points lumineux - style moderne */}
        <div className="absolute w-[4px] h-[4px] top-[100px] left-[30%] bg-amber-500 rounded-full opacity-80 animate-pulse" />
        <div className="absolute w-[3px] h-[3px] top-[300px] right-[30%] bg-blue-light600 rounded-full opacity-70 animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute w-[5px] h-[5px] bottom-[180px] left-[25%] bg-green-500 rounded-full opacity-75 animate-pulse" style={{animationDelay: '2s'}} />
        
        {/* Overlay de cohérence - unifie tous les éléments */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-transparent to-blue-gray50/20 mix-blend-overlay" />
        
        {/* Vagues décoratives subtiles - style waves.png */}
        <div className="absolute bottom-0 left-0 w-full h-[200px] bg-gradient-to-t from-amber-100/20 via-amber-50/10 to-transparent" />
        <div className="absolute top-0 right-0 w-full h-[150px] bg-gradient-to-b from-blue-gray100/15 via-amber-50/5 to-transparent" />
      </div>

      {/* Container pour centrer le contenu sur très grands écrans */}
      <div className="w-full max-w-[1600px] mx-auto relative z-10">
        {/* Section header avec design sophistiqué */}
        <header className="flex flex-col items-center gap-6 md:gap-8 relative w-full text-center mb-12 md:mb-16">
          <div className="md:pt-0 pt-8 flex flex-col items-center gap-6">
            {/* Titre */}
            <div className="flex flex-col items-start gap-2 relative self-stretch w-full">
              <h2 className="mt-[-1.00px] text-blue-gray900 relative self-stretch md:font-medium font-bold text-4xl lg:text-[length:var(--heading-2-font-size)] tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)] text-center">
                {title.split(' ').slice(0, -1).join(' ')}{" "}
                <span className="font-serif italic text-amber-900">
                  {title.split(' ').slice(-1)[0]}
                </span>
              </h2>
            </div>
            
            {/* Sous-titre */}
            <div className="relative">
              <span className="absolute inset-0 bg-gradient-to-r from-amber-50/30 via-transparent to-amber-50/30 rounded-2xl blur-sm -z-10"></span>
              <p className="text-blue-gray700 font-body-l text-sm md:text-base lg:text-[length:var(--body-l-font-size)] tracking-[var(--body-l-letter-spacing)] leading-[var(--body-l-line-height)] [font-style:var(--body-l-font-style)] mb-2">
                {subtitle}
              </p>
            </div>
          </div>
        </header>

        {/* FAQ items */}
        <div className={`w-full max-w-[1400px] mx-auto relative`}>
          
          {/* Layout mobile - Cards simples empilées */}
          <div className="block md:hidden space-y-4">
            {items.map((faq, index) => {
              // Même logique de couleurs que desktop
              const bentoPatterns = [
                { type: 'hero' },
                { type: 'tall' },
                { type: 'wide' },
                { type: 'square' },
                { type: 'medium' },
                { type: 'mini' },
                { type: 'flat' },
                { type: 'large' },
              ];
              
              const pattern = bentoPatterns[index % bentoPatterns.length];
              
              // Styles spécifiques selon le type de compartiment Bento
              const getBentoStyle = (type: string) => {
                const baseStyles = 'transition-all duration-300 hover:shadow-lg';
                switch(type) {
                  case 'hero':
                    return `bg-green-100 shadow-md ${baseStyles}`;
                  case 'tall':
                    return `bg-indigo-100 shadow-md ${baseStyles}`;
                  case 'wide':
                    return `bg-pink-100 shadow-md ${baseStyles}`;
                  case 'square':
                    return `bg-blue-gray200 shadow-md ${baseStyles}`;
                  case 'large':
                    return `bg-green-100 shadow-md ${baseStyles}`;
                  case 'medium':
                    return `bg-green-100 shadow-md ${baseStyles}`;
                  case 'mini':
                    return `bg-blue-gray200 shadow-sm ${baseStyles}`;
                  case 'flat':
                    return `bg-blue-gray200 shadow-sm ${baseStyles}`;
                  default:
                    return `bg-white shadow-md ${baseStyles}`;
                }
              };
              
              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  className="w-full"
                >
                  <Card className={`w-full ${getBentoStyle(pattern.type)} rounded-2xl`}>
                    <CardContent className="p-4">
                      <div className="flex flex-col gap-3">
                        {/* Question */}
                        <h3 className="font-subtitle-XL font-[number:var(--subtitle-XL-font-weight)] text-amber-900 tracking-[var(--subtitle-XL-letter-spacing)] leading-tight [font-style:var(--subtitle-XL-font-style)] text-base">
                          {faq.question}
                        </h3>
                        
                        {/* Réponse */}
                        <p className="font-body-l font-[number:var(--body-l-font-weight)] text-blue-gray900 tracking-[var(--body-l-letter-spacing)] leading-relaxed [font-style:var(--body-l-font-style)] text-sm">
                          {faq.answer}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Layout desktop - Grille Bento */}
          <div 
            className="hidden md:grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4 md:gap-6"
            style={{
              gridAutoRows: '80px',
              gridAutoFlow: 'dense',
            }}
          >
            {items.map((faq, index) => {
              // Vrais patterns Bento asymétriques - tailles très variées comme des compartiments bento
              const bentoPatterns = [
                { cols: 'col-span-2 sm:col-span-4 md:col-span-4 lg:col-span-5', rows: 'row-span-4 md:row-span-3', size: 'hero', type: 'hero' },        // Héro - très grande
                { cols: 'col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-3', rows: 'row-span-5 md:row-span-4', size: 'tall', type: 'tall' },       // Haute et étroite
                { cols: 'col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-3', rows: 'row-span-3 md:row-span-3', size: 'wide', type: 'wide' },       // Large et basse
                { cols: 'col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2', rows: 'row-span-3 md:row-span-4', size: 'square', type: 'square' },   // Carrée
                { cols: 'col-span-2 sm:col-span-4 md:col-span-3 lg:col-span-3', rows: 'row-span-4 md:row-span-3', size: 'medium', type: 'medium' },   // Moyenne
                { cols: 'col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-1', rows: 'row-span-4 md:row-span-3', size: 'mini', type: 'mini' },       // Mini haute
                { cols: 'col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2', rows: 'row-span-2 md:row-span-1', size: 'flat', type: 'flat' },       // Très plate
                { cols: 'col-span-2 sm:col-span-4 md:col-span-3 lg:col-span-3', rows: 'row-span-4 md:row-span-4', size: 'large', type: 'large' },     // Grande
              ];
              
              const pattern = bentoPatterns[index % bentoPatterns.length];
              
              // Variations de contenu selon la taille Bento
              const isHero = pattern.type === 'hero';
              const isTall = pattern.type === 'tall' || pattern.type === 'mini';
              const isLarge = pattern.type === 'large' || pattern.type === 'medium';
              
              // Styles spécifiques selon le type de compartiment Bento
              const getBentoStyle = (type: string) => {
                const baseStyles = 'transition-all duration-700';
                switch(type) {
                  case 'hero':
                    return `bg-yellow-100 shadow-lg ${baseStyles}`;
                  case 'tall':
                    return `bg-indigo-100 shadow-md ${baseStyles}`;
                  case 'wide':
                    return `bg-pink-100 shadow-md ${baseStyles}`;
                  case 'square':
                    return `bg-yellow-100 shadow-md ${baseStyles}`;
                  case 'large':
                    return `bg-green-100 shadow-lg ${baseStyles}`;
                  case 'medium':
                    return `bg-green-100 shadow-md ${baseStyles}`;
                  case 'mini':
                    return `bg-blue-gray200 shadow-sm ${baseStyles}`;
                  case 'flat':
                    return `bg-blue-gray200 shadow-sm ${baseStyles}`;
                  default:
                    return `bg-white shadow-md ${baseStyles}`;
                }
              };
              
              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 0, scale: 1 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1,
                    ease: "easeOut",
                    type: "spring",
                    stiffness: 80,
                    damping: 20
                  }}
                  className={`relative group w-full ${pattern.cols} ${pattern.rows} rounded-3xl overflow-hidden`}
                >
                  <Card className={`w-full h-full ${getBentoStyle(pattern.type)} rounded-3xl transition-all duration-700 relative overflow-hidden`}>
                    <CardContent className={`relative h-full flex flex-col ${isHero ? 'p-4 sm:p-6 md:p-8 lg:p-12' : isTall ? 'p-2 sm:p-3 md:p-4 lg:p-6' : isLarge ? 'p-3 sm:p-4 md:p-6 lg:p-8' : 'p-2 sm:p-3 md:p-4 lg:p-6'}`}>
                      
                      {/* Contenu adapté à la taille du compartiment */}
                      <div className="flex flex-col gap-3 md:gap-4 relative z-10 h-full">
                        
                        {/* Question - taille adaptée selon le type de compartiment */}
                        <div className="flex flex-col gap-2 flex-shrink-0">
                          <h3 className={`font-subtitle-XL font-[number:var(--subtitle-XL-font-weight)] text-amber-900 tracking-[var(--subtitle-XL-letter-spacing)] leading-tight [font-style:var(--subtitle-XL-font-style)] group-hover:text-amber-800 transition-colors duration-300 ${
                            isHero ? 'text-lg sm:text-xl md:text-2xl lg:text-2xl' : 
                            isTall ? 'text-xs sm:text-sm md:text-2xl lg:text-2xl' : 
                            isLarge ? 'text-sm sm:text-base md:text-lg lg:text-xl' : 
                            'text-xs sm:text-sm md:text-base lg:text-lg'
                          }`}>
                            {faq.question}
                          </h3>
                        </div>
                        
                        {/* Réponse - adaptée selon l'espace disponible */}
                        <div className="flex-1 overflow-hidden">
                          <p className={`font-body-l font-[number:var(--body-l-font-weight)] text-blue-gray900 tracking-[var(--body-l-letter-spacing)] leading-relaxed [font-style:var(--body-l-font-style)] group-hover:text-blue-gray800 transition-colors duration-300 ${
                            isHero ? 'text-sm sm:text-base md:text-lg lg:text-lg' : 
                            isTall ? 'text-xs sm:text-xs md:text-lg' : 
                            isLarge ? 'text-xs sm:text-sm md:text-base' : 
                            'text-xs sm:text-xs md:text-base'
                          }`}>
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// Composant par défaut pour test et compatibilité
export default function FAQDemo() {
  const sophisticatedFAQItems: FAQItem[] = [
    {
      id: 1,
      question: "Comment nos services peuvent-ils transformer votre entreprise ?",
      answer: "Nos solutions sur mesure s'adaptent parfaitement à vos besoins spécifiques. Grâce à notre expertise technique et notre approche personnalisée, nous optimisons vos processus métier pour une efficacité maximale. Nos clients constatent généralement une amélioration de 40% de leur productivité dans les 3 premiers mois."
    },
    {
      id: 2,
      question: "Quels sont les délais moyens pour un projet personnalisé ?", 
      answer: "Chaque projet étant unique, nos délais varient selon la complexité et l'étendue des fonctionnalités demandées. En moyenne, un projet standard prend entre 4 à 8 semaines, tandis qu'un projet complexe peut nécessiter 12 à 16 semaines. Nous établissons toujours un planning détaillé avec des jalons clairs dès le début de notre collaboration."
    },
    {
      id: 3,
      question: "Proposez-vous un accompagnement après la livraison ?",
      answer: "Absolument ! Notre engagement ne s'arrête pas à la livraison. Nous offrons un support technique complet incluant la maintenance, les mises à jour, la formation de vos équipes et l'évolution de votre solution. Notre équipe dédiée reste à votre disposition pour garantir le succès à long terme de votre projet."
    },
    {
      id: 4,
      question: "Comment garantissez-vous la sécurité de nos données ?",
      answer: "La sécurité est notre priorité absolue. Nous appliquons les dernières normes de sécurité (ISO 27001, RGPD) et utilisons des protocoles de chiffrement avancés. Nos serveurs sont hébergés dans des centres de données certifiés avec des sauvegardes automatiques quotidiennes. De plus, nous réalisons des audits de sécurité réguliers pour maintenir le plus haut niveau de protection."
    },
    {
      id: 5,
      question: "Quels sont vos tarifs et modalités de paiement ?",
      answer: "Nos tarifs sont adaptés à la complexité et à la valeur ajoutée de chaque projet. Nous proposons plusieurs modalités : forfait global, paiement échelonné selon les livrables, ou abonnement mensuel pour les services récurrents. Un devis détaillé vous sera fourni après analyse de vos besoins spécifiques. Nous acceptons tous les modes de paiement professionnels."
    },
    {
      id: 6,
      question: "Quelles technologies utilisez-vous ?",
      answer: "Nous maîtrisons les dernières technologies : React, Vue.js, Node.js, Python, AWS, Docker, Kubernetes. Notre stack technologique évolue constamment pour rester à la pointe de l'innovation."
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-white">
      <FAQ 
        title="Questions Fréquentes"
        subtitle="Découvrez tout ce que vous devez savoir sur nos services premium"
        items={sophisticatedFAQItems}
        className=""
        maxWidth="6xl"
      />
    </div>
  );
}