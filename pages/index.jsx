import React, { useState } from "react";
import "../styles/globals.scss";
import RegistrationForm from "../components/RegistrationForm/RegistrationForm";
import Welcome from "../components/welcome/Welcome";
import Image from "next/image";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState(null);

  const handleRegistrationComplete = (data) => {
    setUserData(data);
    setCurrentStep(2); // Move to the next step/screen
  };

  return (
    <div>
      <div>
        <Image src="/images/logo.png" alt="Logo" width={150} height={55} />
      </div>

      <div>
        {currentStep === 1 && (
          <RegistrationForm onComplete={handleRegistrationComplete} />
        )}

        {currentStep === 2 && <Welcome userData={userData} />}
      </div>
    </div>
  );
}
