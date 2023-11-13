import React, { useState } from "react";
import "../styles/globals.scss";
import RegistrationForm from "../components/RegistrationForm/RegistrationForm";
import Welcome from "../components/Welcome/Welcome";
import WorkExperience from "../components/WorkExperience/WorkExperience";
import Image from "next/image";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({
    name: "",
    phoneNumber: "",
    nationality: "",
    city: "",
    selection: "",
  });

  const handleRegistrationComplete = (data) => {
    setUserData(data);
    setCurrentStep(2);
  };

  const handleReturnToRegistration = () => {
    setCurrentStep(1);
  };

  const handleWelcomeSelection = (option) => {
    setUserData({ ...userData, selection: option });
    setCurrentStep(3);
  };

  return (
    <div>
      <div>
        <Image src="/images/logo.png" alt="Logo" width={150} height={55} />
      </div>

      <div>
        {currentStep === 1 && (
          <RegistrationForm
            initialData={userData}
            onComplete={handleRegistrationComplete}
          />
        )}

        {currentStep === 2 && (
          <Welcome
            userData={userData}
            onReturn={handleReturnToRegistration}
            onSelection={handleWelcomeSelection}
          />
        )}

        {currentStep === 3 && <WorkExperience />}
      </div>
    </div>
  );
}
