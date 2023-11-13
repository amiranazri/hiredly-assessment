import React, { useState } from "react";
import styles from "./WorkExperience.module.scss";
import Select from "react-select";

import occupationOptions from "../../data/occupations.json";
import industryOptions from "../../data/industries.json";

const WorkExperience = ({ onComplete }) => {
  const [formData, setFormData] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [enterKeyPressed, setEnterKeyPressed] = useState(false);

  const questions = [
    { text: `I am a`, key: "occupation" },
    { text: `working in the`, key: "industry" },
    { text: `specializing in`, key: "specialisation" },
  ];

  const handleInputChange = (e) => {
    const key = questions[currentQuestionIndex].key;
    const value = e.target.value.trim();

    setFormData({ ...formData, [key]: value });
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    const key = questions[currentQuestionIndex].key;
    setFormData({ ...formData, [key]: selectedOption });

    // Increment the currentQuestionIndex when an option is selected
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      setEnterKeyPressed(true);

      if (currentQuestionIndex < questions.length - 1) {
        setFormData({
          ...formData,
          [questions[currentQuestionIndex].key]: e.target.value.trim(),
        });

        // Increment the currentQuestionIndex when Enter is pressed
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        console.log("Form submitted:", formData);
        onComplete(formData);
      }
    }
  };

  const handleContinueClick = () => {
    onComplete(formData);
  };

  return (
    <div className={styles.container}>
      {questions.map((question, index) => (
        <div key={index} className={styles.questionContainer}>
          {index <= currentQuestionIndex && (
            <>
              <p>{question.text}</p>
              <div
                className={`${styles.inputRow} ${
                  index === 0 ? styles.firstRow : ""
                } ${enterKeyPressed ? styles.hideBorder : ""}`}
              >
                {index === currentQuestionIndex ? (
                  <Select
                    className={styles.inputField}
                    classNamePrefix="select"
                    value={formData[question.key] || ""}
                    onChange={handleSelectChange}
                    options={
                      question.key === "occupation"
                        ? occupationOptions
                        : industryOptions
                    }
                  />
                ) : (
                  <p>{formData[question.key]}</p>
                )}
              </div>
            </>
          )}
        </div>
      ))}
      {showContinueButton && (
        <div className={styles.buttonRow}>
          <button onClick={handleContinueClick}>Continue</button>
          <p className={styles.pressEnter}>or press Enter ↩</p>
        </div>
      )}
    </div>
  );
};

export default WorkExperience;
