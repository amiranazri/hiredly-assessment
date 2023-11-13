import React from "react";
import Welcome from "../components/Welcome/Welcome";

const WelcomePage = () => {
  const userName = router.query.name || "";

  return (
    <Welcome
      userName={userName}
      onSelection={(option) => {
        console.log("Selected option:", option);
      }}
    />
  );
};

export default WelcomePage;
