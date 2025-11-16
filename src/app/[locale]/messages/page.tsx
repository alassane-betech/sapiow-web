"use client";

import { withAuth } from "@/components/common/withAuth";
import { useConversationStore } from "@/store/useConversationStore";
import { useUserStore } from "@/store/useUser";
import { useEffect, useRef } from "react";
import { MessageClientPage } from "./MessageClientPage";
import { MessageProPage } from "./MessageProPage";

function Messages() {
  const { user } = useUserStore();
  const { setSelectedConversation, setSelectedProfessional } =
    useConversationStore();

  const prevTypeRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    const prevType = prevTypeRef.current;
    const currentType = user?.type;

    // Réinitialiser seulement quand le type d'utilisateur change (client ↔ expert)
    if (prevType && prevType !== currentType) {
      setSelectedConversation(null);
      setSelectedProfessional(null);
    }

    prevTypeRef.current = currentType;
  }, [user?.type, setSelectedConversation, setSelectedProfessional]);

  const pageKey = user?.type === "expert" ? "expert" : "client";

  if (user?.type === "expert") {
    return <MessageProPage key={pageKey} />;
  }

  return <MessageClientPage key={pageKey} />;
}

export default withAuth(Messages);
