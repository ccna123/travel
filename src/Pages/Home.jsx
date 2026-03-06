import React from "react";
import { Main } from "../components/Main";
import { DestinationSection } from "../components/DestinationSection";
import { Footer } from "../components/Footer";
import { BackToTopBtn } from "../components/BackToTopBtn";
import { ChatBot } from "../components/Chatbot";

export const Home = () => {
  return (
    <>
      <Main />
      <DestinationSection />
      <Footer />
      <BackToTopBtn />
      <ChatBot />
    </>
  );
};
