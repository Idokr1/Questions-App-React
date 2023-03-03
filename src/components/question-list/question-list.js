import { useState, useEffect } from "react";
import AddQuestion from "../add-question/addQuestion";
import Question from "../question/question";
import style from "./question-list.module.css";

import QuestionService from "../../services/questions.service";

function QuestionList() {
  const service = new QuestionService();

  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);

  const getData = () => {
    service
      .get()
      .then((data) => {
        setQuestions(data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getData();
  }, []);

  const optionClickedHandler = (correctAnswer, answerID, id) => {
    let li_id = `li-${answerID}-${id}`;

    if (questions[id].clicked === false) {
      document.getElementById(li_id).style.borderColor = "black";
      if (correctAnswer) {
        setScore(score + 1);
        questions[id].clicked = true;
      } else {
        questions[id].clicked = true;
      }
    } else {
      alert("you have already answered this question");
    }
  };

  const deleteHandler = (id) => {
    service.delete(id).then((data) => {
      let updatedQuestionsList = [...questions];
      updatedQuestionsList = updatedQuestionsList.filter(
        (item) => item.id != id
      );
      setQuestions(updatedQuestionsList);
    });
  };

  const addHandler = (question) => {
    let newQuestion = { ...question, id: questions.length };
    service.post(newQuestion).then((data) => {
      let updatedQuestionsList = [...questions, data];
      setQuestions(updatedQuestionsList);
    });
  };

  const updateHandler = (question)=>{
    let updated = {...question, clicked: !question.clicked};
    service.put(updated).then(data=>{
        getData()
    })
}

  const onSubmitAnswers = () => {
    let count = 0;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].clicked === true) {
        count++;
      }
    }
    if (count === questions.length) {
      setShowResults(true);
      changeCorrectAnswersColor();
    } else {
      alert("You didn't answer all the questions");
    }
  };

  const changeCorrectAnswersColor = () => {
    for (let i = 0; i < questions.length; i++) {
      for (let x = 0; x < 4; x++) {
        if (questions[i].answers[x].correctAnswer === true) {
          let li_id = `li-${x}-${i}`;
          document.getElementById(li_id).style.backgroundColor = "green";
        }
      }
    }
  };

  return (
    <div>
      {questions.map((question, index) => (
        <div className={style.questionCard}>
          <Question
            question={question}
            key={index}
            optionClicked={optionClickedHandler}
            onDelete={deleteHandler}
            onToggle={updateHandler}
          />
        </div>
      ))}
      <div className={style.btnDiv}>
        <button className={style.submitButton} onClick={onSubmitAnswers}>
          Submit Answers
        </button>
      </div>
      {showResults ? (
        <div className={style.finalResults}>
          <h1>Results:</h1>
          <h2>
            {score} out of {questions.length} Correct
          </h2>
        </div>
      ) : (
        <div></div>
      )}
      <div>
        <AddQuestion onAdd={addHandler} />
      </div>
    </div>
  );
}

export default QuestionList;
