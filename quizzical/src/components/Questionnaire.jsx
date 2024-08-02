import { nanoid } from "nanoid";
import {decode} from 'html-entities';

export default function Questionnaire(props) {
  const questionnairesElement = (props.questionnaires || []).map(questionnaire => { 
    const answersArray = [questionnaire.correct_answer, ...questionnaire.incorrect_answers];

    return (
      <div key={nanoid()} className="flex justify-center items-center">
        <div className="title">{decode(questionnaire.question)}</div>
        <div className="choices">{decode(answersArray)}</div>
      </div>
    )
  })


  return (
    <div className="questionnaire">
        {questionnairesElement}
    </div>
  )
}
