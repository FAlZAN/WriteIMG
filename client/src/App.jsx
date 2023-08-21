import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, Footer } from "./component/index";
import { Home, Post, Community } from "./pages/index";

import { CommunityContextProvider } from "./context/CommunityContext";

function App() {
  return (
    <CommunityContextProvider>
      <BrowserRouter basename="/">
        <div className="h-screen px-4 font-DMSans flex flex-col justify-between relative">
          <Header />
          <main className="mt-4 pt-[73px]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/post" element={<Post />} />
              <Route path="/community" element={<Community />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </CommunityContextProvider>
  );
}

export default App;
