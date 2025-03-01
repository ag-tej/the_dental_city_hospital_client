import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Career from "./pages/Career";
import SingleBlog from "./pages/SingleBlog";
import Contact from "./pages/Contact";
import Appointment from "./pages/Appointment";
import Footer from "./components/Footer";
import Chat from "./components/Chat";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <main className="h-screen flex flex-col">
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<Loading />}>
          <Navbar />
          <div className="w-full max-w-screen-2xl mx-auto">
            <Routes>
              <Route index path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/career" element={<Career />} />
              <Route path="/blog/:slug" element={<SingleBlog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/appointment" element={<Appointment />} />
            </Routes>
          </div>
          <Chat />
          <Footer />
        </Suspense>
      </BrowserRouter>
    </main>
  );
};

export default App;
