import React from 'react';
import InfiniteScroll from './pages/InfiniteScroll';
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/scroll" element={<InfiniteScroll />} /> */}
        <Route path="/" element={<InfiniteScroll />} />
        {/* <Route path="/" element={<div>asdsa</div>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
