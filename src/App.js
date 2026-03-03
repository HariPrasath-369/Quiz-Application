import './App.css';
import QuizPage from './component/Quiz-page';
import FetchQuestion from './component/fetch-Questions';
import QuestionPage from './component/Question-page';
import ResultPage from './component/ResultPage';
import { Routes, Route, HashRouter } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<QuizPage />} />
        <Route path="/loading" element={<FetchQuestion />} />
        <Route path="/quiz" element={<QuestionPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;