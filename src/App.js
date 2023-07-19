import { Appbar } from "./components/Appbar";
import { TravelProvider } from "./context/TravelContext";
import { Booking } from './components/Booking';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
function App() {
  return (
    <div className="App flex flex-col h-[100vh] w-full">
      <Appbar />
      <div>
        <BrowserRouter>
          <TravelProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/booking/:id" element={<Booking />} />
            </Routes>
          </TravelProvider>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
