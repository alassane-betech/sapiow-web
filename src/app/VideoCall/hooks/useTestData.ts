import { useCallStore } from "@/store/useCall";
import { useEffect } from "react";

// Hook pour initialiser les données de test
export const useTestData = (enableTestMode: boolean = true) => {
  const { setCallData, callData } = useCallStore();

  useEffect(() => {
    // Initialiser les données de test seulement si :
    // 1. Le mode test est activé
    // 2. Il n'y a pas déjà de données dans le store
    if (
      enableTestMode &&
      !callData?.proStreamUser &&
      !callData?.patientStreamUser
    ) {
      console.log("🧪 Initialisation des données de test Stream");

      setCallData({
        proStreamUser: {
          user: {
            id: "doc_test_123",
            name: "Dr. Sarah Martin",
          },
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZG9jX3Rlc3RfMTIzIiwiaXNzIjoiaHR0cHM6Ly9wcm9udG8uZ2V0c3RyZWFtLmlvIiwic3ViIjoidXNlci9kb2NfdGVzdF8xMjMiLCJpYXQiOjE3MzQ5NjQ4MDAsImV4cCI6MTczNTU2OTYwMH0.mock_token",
          appointmentId: "test_call_123",
        },
      });
    }
  }, [enableTestMode, callData, setCallData]);

  return {
    isTestMode: enableTestMode,
    hasData: !!(callData?.proStreamUser || callData?.patientStreamUser),
  };
};
