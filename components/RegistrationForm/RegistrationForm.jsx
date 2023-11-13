import React, { useState, useEffect } from "react";
import styles from "./RegistrationForm.module.scss";
import { fetchCountries } from "../../utils/nationalities";
import { fetchCities } from "../../utils/cities";
import Select from "react-select";
import { useRouter } from "next/router";
import Welcome from "../welcome/Welcome";

const RegistrationForm = ({ onComplete }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [countryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  const questions = [
    { text: `Hello! My name is `, key: "name" },
    { text: `My phone number is `, key: "phoneNumber" },
    { text: `I'm `, key: "nationality" },
    { text: ` and currently based in `, key: "city" },
  ];

  const handleInputChange = (e) => {
    const key = questions[currentQuestionIndex].key;
    const value =
      e.target.type === "select-one" ? e.target.value : e.target.value.trim();

    setFormData({ ...formData, [key]: value });
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      if (currentQuestionIndex < questions.length - 1) {
        // Check if the current question is "nationality" or "city"
        if (
          questions[currentQuestionIndex].key === "nationality" ||
          questions[currentQuestionIndex].key === "city"
        ) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          setFormData({
            ...formData,
            [questions[currentQuestionIndex].key]: e.target.value.trim(),
          });
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
      } else {
        console.log("Form submitted:", formData);
        // Add logic for form submission here
        onComplete(formData); // Pass the form data to the parent component
        setShowWelcome(true);
      }
    }
  };

  const handleNationalityChange = async (selectedOption) => {
    setFormData({ ...formData, nationality: selectedOption });
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleContinueClick = () => {
    store.dispatch(submitFormData(formData));
    onComplete(formData); // Pass the form data to the parent component
    setShowWelcome(true);
    router.push(`/welcome?name=${formData.name}`);
  };

  const handleCityChange = (selectedOption) => {
    if (selectedOption) {
      setFormData({ ...formData, city: selectedOption });
      setShowContinueButton(true);
    } else {
      setShowContinueButton(false);
    }
  };

  useEffect(() => {
    const fetchCountryOptions = async () => {
      const countries = await fetchCountries();
      setCountryOptions(countries);
    };

    const fetchCityOptions = async () => {
      const cities = await fetchCities();
      setCityOptions(cities);
    };

    fetchCountryOptions();
    fetchCityOptions();
  }, []);

  return (
    <div className={styles.container}>
      {questions.map((question, index) => (
        <div key={index} className={styles.questionContainer}>
          {index <= currentQuestionIndex && (
            <>
              <p style={{ marginRight: "16px" }}>{question.text}</p>
              <div className={styles.inputRow}>
                {index === currentQuestionIndex ? (
                  question.key === "nationality" ? (
                    <select
                      style={{ width: "45%" }}
                      className={styles.inputField}
                      value={formData[question.key]?.value || ""}
                      onChange={(e) => handleNationalityChange(e.target.value)}
                    >
                      <option value=""></option>
                      {countryOptions.map((country) => (
                        <option key={country.value} value={country.label}>
                          {country.label}
                        </option>
                      ))}
                    </select>
                  ) : question.key === "city" ? (
                    <Select
                      className={styles.inputField}
                      classNamePrefix="city-select"
                      value={formData[question.key] || ""}
                      onChange={handleCityChange}
                      options={cityOptions}
                      placeholder=""
                    />
                  ) : (
                    <input
                      type="text"
                      className={styles.inputField}
                      value={formData[question.key] || ""}
                      onChange={handleInputChange}
                      onKeyPress={handleEnterKey}
                      readOnly={index !== currentQuestionIndex}
                    />
                  )
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
          <button onClick={() => handleContinueClick()}>Continue</button>
          <p className={styles.pressEnter}>or press Enter ↩</p>
        </div>
      )}
      {showWelcome && (
        <Welcome
          userName={formData.name}
          onSelection={(option) => {
            console.log("Selected option:", option);
          }}
        />
      )}
    </div>
  );
};

export default RegistrationForm;
