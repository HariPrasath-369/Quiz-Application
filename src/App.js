import './App.css';
import QuizPage from './component/Quiz-page';
import FetchQuestion from './component/fetch-Questions';
import QuestionPage from './component/Question-page';
import ResultPage from './component/ResultPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QuizPage />} />
        <Route path="/loading" element={<FetchQuestion />} />
        <Route path="/quiz" element={<QuestionPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;