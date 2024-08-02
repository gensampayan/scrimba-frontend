import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import {decode} from 'html-entities';
import Start from "./components/Start";
import Questionnaire from "./components/Questionnaire";

export default function App() {
  const [start, setStart] = useState(false);
  const [numberOfPlays, setNumberOfPlays] = useState(0);
  const [questionnaires, setQuestionnaires] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://opentdb.com/api.php?amount=5&type=multiple`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setQuestionnaires(data.results);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
  
    fetchData();
  }, []);  

  function handleStart() {
    setStart(prevStart => !prevStart);
    console.log("start")
  }

  return (
    <>
      {}
      <Questionnaire 
        questionnaires={questionnaires}
      />
    </>
  )
}