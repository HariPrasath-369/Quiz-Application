import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";


function FetchQuestion() {

const screenStreamRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  var[totalData,setTotalData]=useState([]);
  var api="S0BJAzgv5ayGEDFeYd7qXLgDfA8xJqAeszP78Qh1";

  useEffect(() => {

    if(!data){
      navigate("/");
      return;
    }

    async function loadQuestions(){
      try {
        console.log("Fetching from API...");

        const url = `https://quizapi.io/api/v1/questions?apiKey=${api}&category=${data.topic}&difficulty=${data.difficulty}&limit=${data.count}`;

        const res = await axios.get(url);
        setTotalData(res.data);
        if(!res.data){
          api="9VQMBP3HbiMSaqTaZjVu50J7V0XdtiMiLdPXp5gR";
          loadQuestions();
        }
        // navigate("/quiz", {
        //   state: {
        //     questions: res.data,
        //     config: data
        //   }
        // });

      } catch(err){
        console.log("API Error:", err);
      }
    }

    loadQuestions();
    

  }, []);

  async function enterFullScreen(){

  try {
    const elem = document.documentElement;

    if(elem.requestFullscreen){
      await elem.requestFullscreen();
    }

    navigate("/quiz", {
      state: {
        questions: totalData,
        config: data
      }
    });

  } catch(err){
    alert("Fullscreen permission denied.");
  }
}
  console.log(totalData);

  return (
    <div style={{textAlign:"center", marginTop:"100px"}}>
      <h1>Question got Fetched</h1>
      <p>{data?.topic} | {data?.difficulty} | {data?.count} Questions</p>
      <h2>Test is ready</h2>
      <button id="full" onClick={enterFullScreen}>Enter full Screen to take test</button>
    </div>
  );
}

export default FetchQuestion;