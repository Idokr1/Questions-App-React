import { useState } from "react";
import style from "./addQuestion.module.css";

function AddQuestion(props) {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [firstAnswer, setFirstAnswer] = useState();
  const [secondAnswer, setSecondAnswer] = useState();
  const [thirdAnswer, setThirdAnswer] = useState();
  const [fourthAnswer, setFourthAnswer] = useState();

  const [newId, setNewId] = useState(3);

  const [question, SetQuestion] = useState({
    id: newId,
    title: "",
    description: "",
    answers: [
      { id: 0, text: "", correctAnswer: false },
      { id: 1, text: "", correctAnswer: false },
      { id: 2, text: "", correctAnswer: false },
      { id: 3, text: "", correctAnswer: false },
    ],
    clicked: false,
  });

  const checkingCheckboxes = () => {
    let count = 0;
    if (firstIsTrue) {
      count++;
    }
    if (secondtIsTrue) {
      count++;
    }
    if (thirdIsTrue) {
      count++;
    }
    if (fourthIsTrue) {
      count++;
    }

    if (count > 1) {
      setFirstIsTrue(true);
      setSecondIsTrue(false);
      setThirdIsTrue(false);
      setFourthIsTrue(false);
      document.getElementById("answerOneIsCorrect").checked = true;
      document.getElementById("answerTwoIsCorrect").checked = false;
      document.getElementById("answerThreeIsCorrect").checked = false;
      document.getElementById("answerFourIsCorrect").checked = false;
    }
  };

  const [firstIsTrue, setFirstIsTrue] = useState(false);
  const [secondtIsTrue, setSecondIsTrue] = useState(false);
  const [thirdIsTrue, setThirdIsTrue] = useState(false);
  const [fourthIsTrue, setFourthIsTrue] = useState(false);

  const handleChangeFirst = (e) => {
    setFirstIsTrue((current) => !current);
  };
  const handleChangeSecond = (e) => {
    setSecondIsTrue((current) => !current);
  };
  const handleChangeThird = (e) => {
    setThirdIsTrue((current) => !current);
  };
  const handleChangeFourth = (e) => {
    setFourthIsTrue((current) => !current);
  };

  const onInputChange = (e) => {
    checkingCheckboxes();
    if (e.target.name === "title") {
      setTitle(e.target.value);
    }
    if (e.target.name === "description") {
      setDescription(e.target.value);
    }
    if (e.target.name === "firstAnswer") {
      setFirstAnswer(e.target.value);
    }
    if (e.target.name === "secondAnswer") {
      setSecondAnswer(e.target.value);
    }
    if (e.target.name === "thirdAnswer") {
      setThirdAnswer(e.target.value);
    }
    if (e.target.name === "fourthAnswer") {
      setFourthAnswer(e.target.value);
    }

    let updated = {
      ...question,
      id: newId,
      title: title,
      description: description,
      answers: {
        0: {
          id: 0,
          text: firstAnswer,
          correctAnswer: firstIsTrue,
        },
        1: {
          id: 1,
          text: secondAnswer,
          correctAnswer: secondtIsTrue,
        },
        2: {
          id: 2,
          text: thirdAnswer,
          correctAnswer: thirdIsTrue,
        },
        3: {
          id: 3,
          text: fourthAnswer,
          correctAnswer: fourthIsTrue,
        },
      },
    };
    setNewId(newId + 1);
    SetQuestion(updated);
  };

  return (
    <div className={style.newQuestionForm}>
      <h1>Add a New Question</h1>
      <label>
        Title:
        <br /> <input type="text" name="title" onInput={onInputChange} />
      </label>
      <label>
        Description: <br />
        <input type="text" name="description" onInput={onInputChange} />
      </label>
      <label>
        First Answer:
        <br />
        <input type="text" name="firstAnswer" onInput={onInputChange} />
      </label>
      <label>
        Second Answer:
        <br />
        <input type="text" name="secondAnswer" onInput={onInputChange} />
      </label>
      <label>
        Third Answer:
        <br />
        <input type="text" name="thirdAnswer" onInput={onInputChange} />
      </label>
      <label>
        Fourth Answer:
        <br />
        <input type="text" name="fourthAnswer" onInput={onInputChange} />
      </label>
      <h3>
        Which one is the correct answer? Choose only one - the default is Answer
        1
      </h3>
      <div>
        <label>
          Is answer 1 the correct answer?{" "}
          <input
            type="checkbox"
            id="answerOneIsCorrect"
            onInput={onInputChange}
            onChange={handleChangeFirst}
          />
        </label>
      </div>
      <div>
        <label>
          Is answer 2 the correct answer?{" "}
          <input
            type="checkbox"
            id="answerTwoIsCorrect"
            onInput={onInputChange}
            onChange={handleChangeSecond}
          />
        </label>
      </div>
      <div>
        <label>
          Is answer 3 the correct answer?{" "}
          <input
            type="checkbox"
            id="answerThreeIsCorrect"
            onInput={onInputChange}
            onChange={handleChangeThird}
          />
        </label>
      </div>
      <div>
        <label>
          Is answer 4 the correct answer?{" "}
          <input
            type="checkbox"
            id="answerFourIsCorrect"
            onInput={onInputChange}
            onChange={handleChangeFourth}
          />
        </label>
      </div>
      <div className={style.btnDiv}>
        <button
          className={style.newQuestionBtn}
          onClick={() => props.onAdd(question)}
        >
          Add New Question
        </button>
      </div>
    </div>
  );
}

export default AddQuestion;
