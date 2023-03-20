import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Auth from './pages/Auth';
import CategoryArticle from './pages/CategoryArticle';
import Homepage from './pages/Homepage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/category/:categoryName" element={<CategoryArticle />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
