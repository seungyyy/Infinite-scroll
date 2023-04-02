import React from 'react';
import InfiniteScroll from './pages/InfiniteScroll';
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/scroll' element={<InfiniteScroll />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
