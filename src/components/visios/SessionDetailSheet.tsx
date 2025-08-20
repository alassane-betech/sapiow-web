"use client";
import {
  useSubmitAppointmentQuestion,
  useUpdateAppointmentQuestion,
  type AppointmentQuestion,
} from "@/api/appointments/useAppointments";
import BookedSessionCard from "@/components/common/BookedSessionCard";
import { Button as ButtonUI } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Send, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../common/Button";

interface SessionData {
  id: string;
  professionalName: string;
  professionalTitle: string;
  profileImage: string;
  sessionType: string;
  duration: string;
  date: string;
  time: string;
  status: string;
  price: number;
  appointment_questions?: AppointmentQuestion[];
}

interface SessionDetailSheetProps {
  session: SessionData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SessionDetailSheet({
  session,
  isOpen,
  onClose,
}: SessionDetailSheetProps) {
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [question, setQuestion] = useState("");
  const [localQuestions, setLocalQuestions] = useState<AppointmentQuestion[]>([]);

  const submitQuestionMutation = useSubmitAppointmentQuestion();

  // Mettre à jour les questions locales quand la session change
  const currentQuestions = session?.appointment_questions || [];
  const allQuestions = [...currentQuestions, ...localQuestions];

  const handleSubmitQuestion = async () => {
    if (!question.trim() || !session) return;

    try {
      await submitQuestionMutation.mutateAsync({
        appointmentId: session.id,
        question: question.trim(),
      });

      // Ajouter la nouvelle question localement pour affichage immédiat
      const newQuestion: AppointmentQuestion = {
        id: Date.now(), // ID temporaire
        question: question.trim(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        appointment_id: session.id,
      };
      
      setLocalQuestions(prev => [...prev, newQuestion]);
      setQuestion("");
      setShowQuestionForm(false);
    } catch (error) {
      console.error("Erreur lors de la soumission de la question:", error);
    }
  };

  const handleToggleQuestionForm = () => {
    setShowQuestionForm(!showQuestionForm);
    if (showQuestionForm) {
      setQuestion("");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[478px] p-0 !bg-white [&>button]:hidden border-l border-light-blue-gray shadow-none"
      >
        <SheetHeader className="p-6 pb-4 border-b border-light-blue-gray bg-white">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg font-semibold text-gray-900">
              Détails
            </SheetTitle>
            <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
              <X className="h-4 w-4 cursor-pointer" />
              <span className="sr-only">Close</span>
            </SheetClose>
          </div>
        </SheetHeader>

        {session && (
          <>
            <div className="px-6 space-y-6 bg-white min-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Card de session réservée */}
              <div>
                <BookedSessionCard
                  professionalName={session.professionalName}
                  professionalTitle={session.professionalTitle}
                  profileImage={session.profileImage}
                  sessionType={session.sessionType}
                  duration={session.duration}
                  date={session.date}
                  time={session.time}
                  className="max-w-[446px]"
                />
              </div>

              {/* Section questions */}
              <div>
                {/* Bloc d'invitation - affiché seulement s'il n'y a pas de questions */}
                {allQuestions.length === 0 && (
                  <div className="bg-[#E8F2FF] rounded-[8px] p-4">
                    <h1 className="text-exford-blue text-base font-bold font-figtree">
                      N'hésitez pas à poser vos questions avant la session
                    </h1>
                    <p className="text-sm text-exford-blue font-figtree font-normal leading-relaxed">
                      Vous avez la possibilité de soumettre vos questions à
                      l'avance afin que l'expert puisse mieux se préparer pour
                      vous.
                    </p>

                    {!showQuestionForm ? (
                      <Button
                        label="Soumettre mes questions"
                        className="h-[40px] w-full rounded-[8px] mt-2 text-base font-bold font-figtree"
                        onClick={handleToggleQuestionForm}
                      />
                    ) : (
                      <div className="mt-4 space-y-3">
                        <div className="relative">
                          <textarea
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Tapez votre question ici..."
                            className="w-full p-3 pr-12 border border-gray-200 rounded-[8px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={3}
                            disabled={submitQuestionMutation.isPending}
                          />
                          <button
                            onClick={handleSubmitQuestion}
                            disabled={
                              !question.trim() || submitQuestionMutation.isPending
                            }
                            className="absolute bottom-3 right-3 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <Send className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          onClick={handleToggleQuestionForm}
                          className="text-sm text-gray-500 hover:text-gray-700"
                          disabled={submitQuestionMutation.isPending}
                        >
                          Annuler
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Bouton pour ajouter une question si des questions existent déjà */}
                {allQuestions.length > 0 && (
                  <div className="mb-4">
                    {!showQuestionForm ? (
                      <Button
                        label="Ajouter une question"
                        className="h-[40px] w-full rounded-[8px] text-base font-bold font-figtree"
                        onClick={handleToggleQuestionForm}
                      />
                    ) : (
                      <div className="space-y-3">
                        <div className="relative">
                          <textarea
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Tapez votre question ici..."
                            className="w-full p-3 pr-12 border border-gray-200 rounded-[8px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={3}
                            disabled={submitQuestionMutation.isPending}
                          />
                          <button
                            onClick={handleSubmitQuestion}
                            disabled={
                              !question.trim() || submitQuestionMutation.isPending
                            }
                            className="absolute bottom-3 right-3 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <Send className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          onClick={handleToggleQuestionForm}
                          className="text-sm text-gray-500 hover:text-gray-700"
                          disabled={submitQuestionMutation.isPending}
                        >
                          Annuler
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Affichage des questions existantes */}
                {allQuestions.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                      Questions ou commentaires
                    </h3>
                    <div className="space-y-2">
                      {allQuestions.map((question) => (
                        <div
                          key={question.id}
                          className="bg-gray-50 p-3 rounded-[8px]"
                        >
                          <div className="flex items-start justify-between">
                            <p className="text-sm text-gray-700 flex-1">
                              {question.question}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action buttons - Fixed at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-none">
              <div className="flex flex-col space-y-3">
                <ButtonUI
                  variant="outline"
                  className="w-full text-gray-700 border-gray-300 hover:bg-gray-50 bg-transparent"
                  onClick={onClose}
                >
                  Ajouter au calendrier
                </ButtonUI>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
