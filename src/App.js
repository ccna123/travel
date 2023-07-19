import { Appbar } from "./components/Appbar";
import { BackToTopBtn } from "./components/BackToTopBtn";
import { DestinationSection } from "./components/DestinationSection";
import { Footer } from "./components/Footer";
import { Main } from "./components/Main";
import { TravelProvider } from "./context/TravelContext";

function App() {
  return (
    <div className="App">
      <Appbar />
      <div>
        <TravelProvider>
          <Main />
          <DestinationSection />
          <Footer />
          <BackToTopBtn />
        </TravelProvider>
      </div>
    </div>
  );
}

export default App;
