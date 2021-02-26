import { createContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";

import challenges from "../../challenges.json";
import { LevelUpModal } from "../components/LevelUpModal";

interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface challengesContextData {
  level: number;
  currentExp: number;
  expToNextLevel: number;
  challengesCompleted: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  activeChallenge: Challenge;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeModal: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExp: number;
  challengesCompleted: number;
}

export const ChallengesContext = createContext({} as challengesContextData);

export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExp, setCurrentExp] = useState(rest.currentExp ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted ?? 0
  );

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setLevelUpModalOpen] = useState(false);

  const expToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set("level", String(level));
    Cookies.set("currentExp", String(currentExp));
    Cookies.set("challengesCompleted", String(challengesCompleted));
  }, [level, currentExp, challengesCompleted]);

  function levelUp() {
    setLevel(level + 1);
    setLevelUpModalOpen(true);
  }

  function closeModal() {
    setLevelUpModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    if (Notification.permission === "granted") {
      new Notification("Novo desafio!", {
        body: `Valendo ${challenge.amount} xp`,
      });
    }
    new Audio("/notification.mp3").play();
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;
    let finalExperience = currentExp + amount;

    if (finalExperience > expToNextLevel) {
      finalExperience = finalExperience - expToNextLevel;
      levelUp();
    }

    setCurrentExp(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExp,
        expToNextLevel,
        challengesCompleted,
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        completeChallenge,
        closeModal,
      }}
    >
      {children}

      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}
