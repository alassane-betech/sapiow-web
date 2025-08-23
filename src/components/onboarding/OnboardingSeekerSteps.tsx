"use client";

import { useOnboardingSeeker } from "@/hooks/useOnboardingSeeker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const OnboardingSeekerSteps = () => {
  const {
    // State
    step,
    firstName,
    lastName,
    email,
    
    // Validations
    isFormValid,
    
    // Loading state
    isSubmitting,
    error,
    
    // Setters
    setFirstName,
    setLastName,
    setEmail,
    
    // Actions
    nextStep,
    prevStep,
    completeOnboarding,
  } = useOnboardingSeeker();

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="firstName">Prénom</Label>
                <Input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Votre prénom"
                />
              </div>
              
              <div>
                <Label htmlFor="lastName">Nom</Label>
                <Input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Votre nom"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre.email@exemple.com"
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={completeOnboarding}
                  disabled={!isFormValid || isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? "Création..." : "Terminer"}
                </Button>
              </div>
              
              {error && (
                <div className="text-red-500 text-sm mt-2">
                  Une erreur est survenue. Veuillez réessayer.
                </div>
              )}
            </CardContent>
          </Card>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Création de votre profil</h1>
          <p className="text-gray-600">
            Complétez vos informations pour commencer à utiliser Sapiow
          </p>
        </div>
        
        {renderStep()}
      </div>
    </div>
  );
};