import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./Welcome.module.scss";

const Welcome = ({  onSelection }) => {
  const router = useRouter();
  const userName = router.query.name;
  const [selectedOption, setSelectedOption] = useState(null);
  const [hoveredOption, setHoveredOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onSelection(option);
  };

  const handleReturnButtonClick = () => {
    console.log("Return button clicked");
    router.back();
  };

  return (
    <div className={styles.welcomeContainer}>
      <div className={styles.centeredContent}>
        <h2>Welcome to Hiredly, {userName}!</h2>
        <p>Before we get started, help us find out why you're here.</p>
      </div>

      <div className={styles.buttonContainer}>
        <button
          className={`${styles.optionButton} ${
            selectedOption === "hasWorkExperience" && styles.selected
          }`}
          onClick={() => handleOptionSelect("hasWorkExperience")}
          onMouseEnter={() => setHoveredOption("hasWorkExperience")}
          onMouseLeave={() => setHoveredOption(null)}
        >
          <div className={styles.buttonImageContainer}>
            <Image
              src={
                hoveredOption === "hasWorkExperience"
                  ? "/images/work-white.png"
                  : "/images/work-filled.png"
              }
              alt="Work Experience"
              width={140}
              height={140}
            />
          </div>
          <h3>I Have Work Experience</h3>
          <p>
            I am looking for a new job in my field/open to explore different
            options.
          </p>
        </button>
        <button
          className={`${styles.optionButton} ${
            selectedOption === "freshGrad" && styles.selected
          }`}
          onClick={() => handleOptionSelect("freshGrad")}
          onMouseEnter={() => setHoveredOption("freshGrad")}
          onMouseLeave={() => setHoveredOption(null)}
        >
          <div className={styles.buttonImageContainer}>
            <Image
              src={
                hoveredOption === "freshGrad"
                  ? "/images/graduate-white.png"
                  : "/images/graduate-filled.png"
              }
              alt="Fresh Graduate"
              width={140}
              height={140}
            />
          </div>
          <h3>Recently Graduated</h3>
          <p>I am looking for my first internship or entry-level job.</p>
        </button>
      </div>
      <button className={styles.returnButton} onClick={handleReturnButtonClick}>
        Return
      </button>
    </div>
  );
};

export default Welcome;
