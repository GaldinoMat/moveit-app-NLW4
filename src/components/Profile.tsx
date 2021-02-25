import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengeContext";
import styles from "../styles/components/Profile.module.css";

export function Profile() {
  const { level } = useContext(ChallengesContext);

  return (
    <div className={styles.profileContainer}>
      <img
        src="https://avatars.githubusercontent.com/u/51252943?s=460&v=4"
        alt="avatar"
        className={styles.avatarImg}
      />
      <div>
        <strong>Mateus Galdino</strong>
        <p>
          <img src="icons/level.svg" alt="level" className={styles.levelImg} />
          Level {level}
        </p>
      </div>
    </div>
  );
}
