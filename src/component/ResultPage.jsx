import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Result.css";

function ResultPage(){

  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  if(!data){
    return <h2>no data found, Go to main page</h2>;
  }

  const {questions, answers, score,wrongAns} = data;
  const percentage = Math.round((score / questions.length) * 100);
  
  const getPerformanceMessage = () => {
    if (percentage >= 90) {
        return "You have become a Doctor , now refer others to become doctor";
    }
    if (percentage >= 75) {
        return "Talk to me when you are doctor";
    }
    if (percentage >= 50) {
        return "Good but not enough to become Doctor";
    }
    if (percentage >= 25) {
        return "Practice more";
    }
    return "You Are such a Waste for the Earth";
  };

  
  return (
    <div className="result-page">

      <h1>Quiz Result</h1>
      <div className="score-details">
          <p className="correct">Correct Answers: {score}</p>
          <p className="incorrect">Incorrect Answers: {wrongAns}</p>
          <p className="total">Total Questions: {questions.length}</p>
        </div>
      <h2>{score} / {questions.length}</h2>
      <h2>Percentage {percentage} %</h2>
      <h2> Message: {getPerformanceMessage()}</h2>
      <button className="restart-btn" onClick={()=>navigate("/")}>
        Restart Quiz
      </button>


     <div className="review-section">

        {questions.map((q, index) => {
          const correctEntry = Object.entries(q.correct_answers || {})
            .find(([k, v]) => v === "true");

          const correctKey = correctEntry
            ? correctEntry[0].replace("_correct", "")
            : null;
          const userAnswer = answers[index];
          return (
            <div key={index} className="review-card">

              <h3>Q{index + 1}. {q.question}</h3>

              {Object.entries(q.answers || {}).map(([key, value]) => {
                if (!value) return null;
                let className = "review-option";
                // to show answers in colors ----
                if (key === correctKey) {
                  className += " correct";
                }
                if (key === userAnswer && key !== correctKey) {
                  className += " wrong";
                }

                return (
                  <p key={key} className={className}>
                    {value}
                  </p>
                );
              })}

            </div>
          );
        })}

      </div>
      </div>
  );
}

export default ResultPage;