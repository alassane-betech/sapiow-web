"use client";
import Accordion from "@/components/common/Accordion";
import BookedSessionCard from "@/components/common/BookedSessionCard";
import { Button } from "@/components/common/Button";
import HowItWorksCard from "@/components/common/HowItWorksCard";
import VisioPlanningCalendar from "@/components/common/VisioPlanningCalendar";
import { HeaderClient } from "@/components/layout/header/HeaderClient";
import { AppSidebar } from "@/components/layout/Sidebare";
import { Badge } from "@/components/ui/badge";
import { Button as ButtonUI } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePayStore } from "@/store/usePay";
import { usePlaningStore } from "@/store/usePlaning";
import { ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import OfferSelection from "../home/OfferSelection";
import ProfessionalCard from "../home/ProfessionalCard";

import { Professional } from "@/types/professional";

// Données des professionnels (à déplacer dans un contexte ou API plus tard)
const professionalsSimilar = [
  {
    id: 1,
    name: "Jean-Pierre Fauch",
    price: "199.00 €",
    image: "/assets/icons/pro1.png",
    verified: true,
    category: "business",
    linkedin: "https://www.linkedin.com/in/jean-pierre-fauch/",
  },
  {
    id: 2,
    name: "Dr Amandine Bergère",
    price: "120.00 €",
    image: "/assets/icons/pro2.png",
    verified: true,
    category: "business",
  },
  {
    id: 3,
    name: "Jean-Pierre Fauch",
    price: "199.00 €",
    image: "/assets/icons/pro1.png",
    verified: true,
    category: "business",
  },
  {
    id: 4,
    name: "Dr Amandine Bergère",
    price: "120.00 €",
    image: "/assets/icons/pro2.png",
    verified: true,
    category: "business",
  },
  {
    id: 5,
    name: "Jean-Pierre Fauch",
    price: "199.00 €",
    image: "/assets/icons/pro1.png",
    verified: true,
    category: "business",
  },
  {
    id: 6,
    name: "Dr Amandine Bergère",
    price: "120.00 €",
    image: "/assets/icons/pro1.png",
    verified: true,
    category: "business",
  },
];
const professionals = [
  {
    id: 1,
    name: "Jean-Pierre Fauch",
    image: "/assets/icons/pro2.png",
    verified: false,
    topExpertise: true,
    category: "business",
    description: "Dermatologue chez L'Oréal",
    linkedin: "https://www.linkedin.com/in/jean-pierre-fauch/",
  },
  {
    id: 2,
    name: "Dr Amandine Bergère",
    image: "/assets/icons/pro2.png",
    verified: true,
    topExpertise: false,
    category: "glow",
    description:
      "Dermatologue chez L'Oréal, Autrice, Investisseuse. 40 Forbes women",
  },
  {
    id: 3,
    name: "Jean-Pierre Fauch",
    price: "199.00 €",
    image: "/assets/icons/pro1.png",
    verified: true,
    category: "media",
  },
  {
    id: 4,
    name: "Dr Amandine Bergère",
    price: "120.00 €",
    image: "/assets/icons/pro2.png",
    verified: true,
    category: "culture",
  },
  {
    id: 5,
    name: "Jean-Pierre Fauch",
    price: "199.00 €",
    image: "/assets/icons/pro1.png",
    verified: true,
    category: "sport",
  },
  {
    id: 6,
    name: "Dr Amandine Bergère",
    price: "120.00 €",
    image: "/assets/icons/pro1.png",
    verified: true,
    category: "maison",
  },
];

export default function ProfessionalDetail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [likedProfs, setLikedProfs] = useState<Record<number, boolean>>({});
  const { isPaid } = usePayStore();
  const { isPlaning } = usePlaningStore();

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      const prof = professionals.find((p) => p.id === parseInt(id));
      if (prof) {
        setProfessional(prof);
      } else {
        // Rediriger vers la page d'accueil si le professionnel n'est pas trouvé
        router.push("/home");
      }
    } else {
      // Rediriger vers la page d'accueil si aucun ID n'est fourni
      router.push("/home");
    }
  }, [searchParams, router]);

  const toggleLike = (profId: number) => {
    setLikedProfs((prev) => ({
      ...prev,
      [profId]: !prev[profId],
    }));
  };

  if (!professional) {
    return <div>Chargement...</div>;
  }

  const expertise = [
    "Transition de carrière",
    "Création de CV",
    "Leadership",
    "Négociation salariale",
  ];

  const isLiked = likedProfs[professional.id] || false;
  return (
    <div className="flex">
      <AppSidebar />
      <div className="w-full flex-1">
        <HeaderClient isBack />
        {/* <Expert /> */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_386px] gap-6 pl-5 container">
          <div className="">
            <div className="flex flex-col md:flex-row gap-6 mt-3">
              <div className="relative">
                <ProfessionalCard
                  professional={professional}
                  isLiked={isLiked}
                  onToggleLike={() => toggleLike(professional.id)}
                  imageWidth={303}
                  imageHeight={378}
                  maxWidth="max-w-[303px]"
                />
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-base font-bold mb-1 font-figtree mt-3">
                    À propos
                  </h2>
                  <p className="text-gray-700 leading-relaxed font-figtree text-base">
                    Dermatologue chez L'Oréal, passionné par l'innovation en
                    soins de la peau. Avec une expertise de plus de 10 ans, je
                    me consacre à la recherche et au développement de produits
                    qui améliorent la santé cutanée. Mon parcours inclut des
                    collaborations avec des équipes scientifiques pour créer des
                    solutions adaptées aux besoins des consommateurs.
                  </p>
                  <ButtonUI
                    variant="link"
                    className="text-sm font-bold p-0 h-auto text-cobalt-blue underline font-inter cursor-pointer"
                  >
                    Voir plus <ChevronDown className="h-4 w-4 ml-1" />
                  </ButtonUI>
                </div>

                <div>
                  <h3 className="text-sm text-[#374151] font-semibold mb-3">
                    Domaines d'expertise
                  </h3>
                  <div className="max-w-[400px] flex gap-2 flex-wrap">
                    {expertise.map((expertise) => (
                      <Badge
                        className="p-2 text-xs text-[#1F2937] font-medium bg-[#F3F4F6] hover:bg-[#F3F4F6] max-w-fit font-inter mb-2"
                        variant="secondary"
                      >
                        {expertise}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Card className="bg-ice-blue border-ice-blue shadow-none h-[72px] p-0">
                  <CardContent className="p-4 text-center">
                    <p className="text-base text-gray-700 font-figtree font-normal">
                      La totalité des revenus sera destinée à <br />
                      <span className="text-base font-bold font-figtree">
                        760 fondations.
                      </span>
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Questions and Expectations */}
            <div className="grid md:grid-cols-2 gap-8 mt-7.5 mb-15">
              <div className="bg-soft-ice-gray px-1 py-0.5 rounded-[8px] border border-soft-ice-gray">
                <h2 className="text-base font-bold mb-4 px-4 pt-3 font-figtree">
                  Questions à poser
                </h2>
                <ul className="space-y-3 text-gray-700 pl-6 pb-4 text-base font-figtree">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-700 mt-1">•</span>
                    <span>
                      Je pense à créer une entreprise. Quelles sont les
                      prochaines choses sur lesquelles je devrais me concentrer
                      ?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-700 mt-1">•</span>
                    <span>
                      Comment savoir si mon idée d'entreprise va fonctionner ?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-700 mt-1">•</span>
                    <span>
                      Comment aborder vous la croissance de mon entreprise ?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-700 mt-1">•</span>
                    <span>
                      Quels indicateurs clés devrais-je viser à différentes
                      étapes pour être une entreprise de premier plan ?
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-soft-ice-gray px-1 py-0.5 rounded-[8px] border border-soft-ice-gray">
                <h2 className="text-base font-bold mb-4 pl-6 pt-3">Attentes</h2>
                <div className="space-y-4 text-base">
                  <div className="pl-6">
                    <h3 className="text-base font-normal">Visio 15mn</h3>
                    <ul className="mt-2 space-y-2 text-gray-700 pl-2 font-figtree">
                      <li className="flex items-start gap-2">
                        <span className="text-gray-700 mt-1">•</span>
                        <span>Posez trois questions ou plus</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-700 mt-1">•</span>
                        <span>
                          Conseils pour démarrer une entreprise prospère
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-700 mt-1">•</span>
                        <span>
                          Conseils pour obtenir vos 10 000 premiers clients
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-700 mt-1">•</span>
                        <span>
                          Astuces de croissance et démarrage de la croissance
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* How it works */}
            <div>
              <h2 className="text-lg font-bold mb-2.5 text-charcoal-blue font-inter">
                Comment ça marche ?
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <HowItWorksCard
                  iconSrc="/assets/icons/magnifer.svg"
                  iconAlt="magnifer"
                  title="Trouvez un expert"
                  description="Découvrez et choisissez parmi notre liste des experts les plus recherchés au monde"
                />

                <HowItWorksCard
                  iconSrc="/assets/icons/calendar1.svg"
                  iconAlt="calendar"
                  title="Réservez ou abonnez-vous"
                  description="Réservez un appel vidéo unique ou choisissez un plan pour accéder à votre expert de manière continue"
                />

                <HowItWorksCard
                  iconSrc="/assets/icons/videocameraRecord.svg"
                  iconAlt="videocameraRecord"
                  title="Consultation virtuelle"
                  description="Rejoignez l'appel vidéo ou le chat, posez des questions et obtenez des conseils d'expert"
                />
              </div>
            </div>

            {/* Similar Experts */}
            <div>
              <div>
                <div className="flex items-center justify-between mb-6 mt-3">
                  <h2 className="text-xl font-bold font-inter">
                    Experts similaires
                  </h2>
                  <ButtonUI variant="link" className="text-blue-600">
                    Tout voir <ChevronRight className="h-4 w-4 ml-1" />
                  </ButtonUI>
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(175px,1fr))] gap-1">
                  {professionalsSimilar.map((professional) => (
                    <ProfessionalCard
                      key={professional.id}
                      professional={professional}
                      isLiked={likedProfs[professional.id] || false}
                      onToggleLike={() => toggleLike(professional.id)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-xl font-bold mb-6 font-inter">
                Questions fréquentes
              </h2>
              <Accordion
                items={[
                  {
                    question: "Qu'est-ce que Sapiow ?",
                    answer:
                      "Sapiow est une plateforme en ligne qui permet de réserver des experts pour des consultations vidéo, offrant aux utilisateurs un accès direct à des professionnels qualifiés dans divers domaines.",
                    defaultOpen: true,
                  },
                  {
                    question:
                      "Quels sont les avantages d'utiliser Sapiow pour les utilisateurs ?",
                    answer:
                      "Sapiow offre un accès direct à des experts qualifiés, des consultations flexibles, et une plateforme sécurisée pour obtenir des conseils professionnels dans de nombreux domaines.",
                  },
                  {
                    question:
                      "Quels types d'experts puis-je réserver sur Sapiow ?",
                    answer:
                      "Vous pouvez réserver des experts dans de nombreux domaines : business, santé, technologie, développement personnel, et bien d'autres spécialités.",
                  },
                  {
                    question:
                      "Comment Sapiow garantit-elle la qualité des experts disponibles ?",
                    answer:
                      "Tous nos experts sont vérifiés et sélectionnés selon des critères stricts d'expertise, d'expérience et de qualifications professionnelles.",
                  },
                  {
                    question:
                      "Quels sont les frais associés à l'utilisation de Sapiow ?",
                    answer:
                      "Les tarifs varient selon l'expert et le type de consultation. Vous pouvez choisir entre des sessions uniques ou des abonnements mensuels.",
                  },
                ]}
              />
            </div>
          </div>
          <div className="lg:border-l lg:border-gray-200">
            {isPaid ? (
              <aside className="w-full">
                <Image
                  src="/assets/icons/congruation.svg"
                  alt="congruatopn"
                  width={421}
                  height={381}
                  className="-mt-29"
                />
                <div className="flex flex-col items-center justify-center gap-4 mt-7">
                  <h2 className="text-[28px] font-bold text-charcoal-blue">
                    Félicitations !
                  </h2>
                  <p className="text-xl text-black text-center font-medium mb-6">
                    Votre session a été réservée <br /> avec succès !
                  </p>
                </div>
                <div className="w-full max-w-[358px] mx-auto">
                  <BookedSessionCard
                    date="Lundi, 26 juillet 2025"
                    time="9h - 15h"
                    duration="60 minutes"
                    sessionType="Session rapide visio"
                    professionalName="Dr. Mohamed Musad"
                    professionalTitle="Expert en nutrition"
                    profileImage="/assets/icons/pro2.png"
                  />
                </div>
                <Button
                  label="Ajouter au calendrier"
                  className="mt-6 h-[56px] w-[90%] mx-auto text-base text-exford-blue font-bold bg-white hover:bg-white/20 border border-light-blue-gray shadow-none"
                  icon="/assets/icons/calendar.svg"
                />
              </aside>
            ) : (
              <>
                {!isPlaning && <OfferSelection />}
                {isPlaning && <VisioPlanningCalendar />}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
