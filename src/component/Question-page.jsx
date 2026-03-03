import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Questionpage.css";

function QuestionPage() {
const screenStreamRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState("");
  const [showModal, setShowModal] = useState(false);

//   useEffect(()=>{
//   // const handleBlur = () => {
//   //   alert("You try to switch tabs");
//   //   navigate("/");
//   // };

//   window.addEventListener("blur", handleBlur);
//   return () => window.removeEventListener("blur", handleBlur);
// },[navigate]);


  useEffect(() => {
    if (!data || !data.questions) navigate("/");
  }, [data, navigate]);

  if (!data || !data.questions) return null;
  

  const questions = data.questions;
  const question = questions?.[currentQ];

   if(!questions || questions.length === 0){
  return <h2>Preparing exam...</h2>;
}


  function selectQuestion(index) {
    setCurrentQ(index);
    setSelectedOption(answers[index] || "");
  }

 
  function handleAnswer(e) {
    setSelectedOption(e.target.value);
  }

 
  function saveCurrentAnswer() {
    return { ...answers,[currentQ]: selectedOption 

    };
  }

  
  function nextQuestion() {
    const updatedAnswers = saveCurrentAnswer();
    setAnswers(updatedAnswers);

    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelectedOption(updatedAnswers[currentQ + 1] || "");
    } else {
      openSubmitModal(updatedAnswers);
    }
  }

  
  function prevQuestion() {
    const updatedAnswers = saveCurrentAnswer();
    setAnswers(updatedAnswers);

    if (currentQ > 0) {
      setCurrentQ(prev => prev - 1);
      setSelectedOption(updatedAnswers[currentQ - 1] || "");
    }
  }

  
  function openSubmitModal(updatedAnswers = answers) {
  setAnswers(updatedAnswers);
  setShowModal(true);
}

  
  function finishQuiz(finalAnswers) {

    let score = 0;
    let wrongAns=0;

    questions.forEach((q, index) => {
      const correctKey = Object.entries(q.correct_answers)
        .find(([k, v]) => v === "true")[0]
        .replace("_correct", "");

      if (finalAnswers[index] === correctKey) {
        score++;
      }
      else{
        wrongAns++;
      }
    });

    const elem=document.documentElement;
    if(document.fullscreenElement){
      document.exitFullscreen();
    }
     if(screenStreamRef.current){
    screenStreamRef.current.getTracks().forEach(track => track.stop());
  }
    

    navigate("/result", {
      state: {
        questions,
        answers: finalAnswers,
        score,
        wrongAns
      }
    });
  }

  
  const answeredCount = Object.keys(answers).filter(
    key => answers[key] !== ""
  ).length;

  const unansweredCount = questions.length - answeredCount;
if(!question) return <h2>Loading question...</h2>;
  const options = Object.entries(question.answers)
    .filter(([k, v]) => v !== null);

  return (
    <div className="quiz-layout">

      <div className="sidebar">
        <h3>Questions</h3>

        {questions.map((q, index) => (
          <button
            key={index}
            onClick={() => selectQuestion(index)}
            className={`nav-btn 
              ${currentQ === index ? "active" : ""}
              ${answers[index] ? "answered" : ""}`}
          >
            {index + 1}
          </button>
        ))}

        <button className="finish-btn" onClick={() => openSubmitModal()}>
          Submit Quiz
        </button>
      </div>

     
      <div className="quiz-container">

        <h2>Question {currentQ + 1}</h2>
        <p className="quiz-question">{question.question}</p>

        <div className="answers-container">
          
          {options.map(([key, value]) => (
            <label key={key} className="answer-option">
              <input
                type="radio"
                name="answer"
                value={key}
                checked={selectedOption === key}
                onChange={handleAnswer}
              />
              {value}
            </label>
          ))}
        </div>

        <div className="nav-buttons">
          <button disabled={currentQ === 0} onClick={prevQuestion}>
            Previous
          </button>

          <button onClick={nextQuestion}>
            {currentQ === questions.length - 1 ? "Submit" : "Next"}
          </button>
        </div>

      </div>

     
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Submit Quiz?</h2>

            <p>Total Questions: {questions.length}</p>
            <p>Answered: {answeredCount}</p>
            <p>Unanswered: {unansweredCount}</p>

            <div className="modal-buttons">
              <button onClick={() => finishQuiz(answers)}>
                Confirm Submit
              </button>

              <button onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default QuestionPage;