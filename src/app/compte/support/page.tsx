"use client";

import { FormField } from "@/components/common/FormField";
import { Minus, Plus, Search } from "lucide-react";
import { useState } from "react";
import AccountLayout from "../AccountLayout";

const faqData = [
  {
    id: 1,
    question: "Comment créer un compte ?",
    answer:
      "Ouvrez l'application Tradebase pour commencer et suivez les étapes. Tradebase ne facture pas de frais pour créer ou maintenir votre compte Tradebase.",
  },
  {
    id: 2,
    question: "Comment ajouter un moyen de paiement via cette application ?",
    answer:
      "Pour ajouter un moyen de paiement, rendez-vous dans les paramètres de votre compte, sélectionnez 'Moyens de paiement' et suivez les instructions pour ajouter votre carte bancaire ou compte PayPal.",
  },
  {
    id: 3,
    question: "Question 3",
    answer:
      "Réponse à la question 3. Vous pouvez ajouter ici toutes les informations pertinentes pour aider vos utilisateurs.",
  },
  {
    id: 4,
    question: "Question 4",
    answer:
      "Réponse à la question 4. Cette section peut contenir des détails techniques ou des instructions étape par étape.",
  },
];

export default function Support() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState<number[]>([1]); // Premier item ouvert par défaut

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFAQ = faqData.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AccountLayout>
      <div className="min-h-screen p-4">
        <div className="max-w-2xl mx-auto">
          {/* Titre principal */}
          <h1 className="text-2xl font-semibold text-center text-gray-900 mb-8">
            Comment pouvons-nous vous aider ?
          </h1>

          {/* Barre de recherche */}
          <div className="relative mb-8 h-[56px] w-[343px] mx-auto">
            <FormField
              type="text"
              placeholder="Entrez votre mot-clé"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-5 h-5 text-gray-400" />}
              className="bg-gray-100 border-0 rounded-[8px] text-gray-700 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-blue-500 h-[42px]"
            />
          </div>

          {/* Liste des FAQ */}
          <div className="space-y-4">
            {filteredFAQ.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg border border-[#D9D9D9] overflow-hidden transition-all duration-200 hover:shadow-sm"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">
                    {item.question}
                  </span>
                  {openItems.includes(item.id) ? (
                    <Minus className="w-5 h-5 text-red-500 flex-shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-red-500 flex-shrink-0" />
                  )}
                </button>

                {openItems.includes(item.id) && (
                  <div className="px-6 pb-4 pt-0">
                    <div className="text-gray-500 leading-relaxed">
                      {item.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFAQ.length === 0 && searchTerm && (
            <div className="text-center py-8 text-gray-500">
              Aucun résultat trouvé pour "{searchTerm}"
            </div>
          )}
        </div>
      </div>
    </AccountLayout>
  );
}
