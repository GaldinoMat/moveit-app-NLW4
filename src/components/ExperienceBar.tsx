import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengeContext";
import styles from "../styles/components/ExperienceBar.module.css";

export function ExperienceBar() {
  const { currentExp, expToNextLevel } = useContext(ChallengesContext);

  const percentageToNextLevel = Math.round(currentExp * 100) / expToNextLevel;

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percentageToNextLevel}%` }} />
        <span
          className={styles.currentExperience}
          style={{ left: `${percentageToNextLevel}%` }}
        >
          {currentExp} xp
        </span>
      </div>
      <span>{expToNextLevel} xp</span>
    </header>
  );
}
