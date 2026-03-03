import React from "react";
import FetchQuestion from "./fetch-Questions";
import { useState } from "react";
import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import "./Quizpage.css";
function QuizPage() {
    const navigate = useNavigate();
    const [selectedTopic, setSelectedTopic] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] =useState('');
    const [questionCount, setQuestionCount] = useState(5);
    const topics = [
 'Linux',
'Bash',
'Uncategorized',
'DevOps',
'React',
'Laravel',
'Postgres',
'Django',
'CPaneel',
'NodeJs',
'WordPress',
'Next.Js',
'VueJS',
'Apache Kafka',
'HTML',
'Docker',
'Code',
'SQL',
'CMS'
];
const difficulty=[
    'Easy', 'Medium','Hard'
]
const Questioncounts=[1,2,3,4,5,10,15,20,25];

function StartQuestions(){
    console.log('start of questions',selectedTopic,selectedDifficulty,questionCount);
    navigate('/loading',{
        state:{
            topic:selectedTopic,
            difficulty:selectedDifficulty,
            count:questionCount
        }
    }
    );

}



    return (
        <div className="pagediv">
            <h1>Quiz Page</h1>
            <h2>Select topics to begin Test</h2>
            <div className="topics">
                {topics.map(topic=>(
                    <button className={`topic-btn ${selectedTopic==topic ? 'selected' : ''}`} key={topic} onClick={()=>setSelectedTopic(topic)}>{topic}</button>
                ))}
            </div>
            <h3>Select Difficulty</h3>
            <div className="difficulty">
                {difficulty.map(diff=>(
                    <button className={`diff-btn ${selectedDifficulty==diff ? 'selected' : ''}`} key={diff} onClick={()=>setSelectedDifficulty(diff)}>{diff}</button>
                ))}
            </div>

            <div className="noofquestions">
        <h3>Number of Questions</h3>
        <select onChange={(e)=>setQuestionCount(e.target.value)} className="question-select">
            {Questioncounts.map(count=>(
                <option key={count} value={count}>{count} Questions</option>
            ))}
        </select>
      </div>

      <div className="submitbtn">
        <button className="start-btn" onClick={() => StartQuestions()}>Start Quiz</button>
      </div>

        </div>
           
    )
}
export default QuizPage;


