import React from "react";
import { Main } from "../components/Main";
import { DestinationSection } from "../components/DestinationSection";
import { Footer } from "../components/Footer";
import { BackToTopBtn } from "../components/BackToTopBtn";

export const Home = () => {
  return (
    <>
      <Main />
      <DestinationSection />
      <Footer />
      <BackToTopBtn />
    </>
  );
};
