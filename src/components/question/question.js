import style from "./question.module.css";

function Question(props) {
  let first_li_id = `li-0-${props.question.id}`;
  let second_li_id = `li-1-${props.question.id}`;
  let third_li_id = `li-2-${props.question.id}`;
  let fourth_li_id = `li-3-${props.question.id}`;

  return (
    <div>
      <h2>{props.question.title}</h2>
      <h2 className={style.questionText}>{props.question.description}</h2>
      <div>
        <ul>
          <li
            id={first_li_id}
            onClick={() =>
              props.optionClicked(
                props.question.answers[0].correctAnswer,
                props.question.answers[0].id,
                props.question.id
              )
            }
          >
            {props.question.answers[0].text}
          </li>
          <li
            id={second_li_id}
            onClick={() =>
              props.optionClicked(
                props.question.answers[1].correctAnswer,
                props.question.answers[1].id,
                props.question.id
              )
            }
          >
            {props.question.answers[1].text}
          </li>
          <li
            id={third_li_id}
            onClick={() =>
              props.optionClicked(
                props.question.answers[2].correctAnswer,
                props.question.answers[2].id,
                props.question.id
              )
            }
          >
            {props.question.answers[2].text}
          </li>
          <li
            id={fourth_li_id}
            onClick={() =>
              props.optionClicked(
                props.question.answers[3].correctAnswer,
                props.question.answers[3].id,
                props.question.id
              )
            }
          >
            {props.question.answers[3].text}
          </li>
        </ul>
      </div>
      <div className={style.btnDiv}>
        <button
          className={style.deleteBtn}
          onClick={() => props.onDelete(props.question.id)}
        >
          Delete Question
        </button>
        <button
          className={style.toggleeBtn}
          onClick={() => props.onToggle(props.question)}
        >
          Toggle Clicked
        </button>
      </div>
    </div>
  );
}

export default Question;

Question.defaultProps = {
  question: {
    id: 0,
    title: "Question 1",
    description: "What is the capital of Israel?",
    answers: [
      { id: 0, text: "Jerusalem", correctAnswer: true },
      { id: 1, text: "Tel Aviv", correctAnswer: false },
      { id: 2, text: "Haifa", correctAnswer: false },
      { id: 3, text: "Kfar Saba", correctAnswer: false },
    ],
    clicked: false,
  },
};
