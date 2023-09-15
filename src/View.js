import * as R from "ramda";
import hh from "hyperscript-helpers";
import { h } from "virtual-dom";

import {
  questionInputMsg,
  answerInputMsg,
  saveMsg,
  showAnswerMsg,
  scoreMsg,
  newCardMsg,
  editCardMsg,
  deleteCardMsg,
  SCORES,
} from "./Update";

const { div, a, button, span, textarea } = hh(h);
const btnStyle = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";

function gradeButtons(dispatch, card) {
  const { showAnswer } = card;
  return showAnswer
    ? div({ className: "mt-2 flex justify-between" }, [
        button(
          {
            className: `${btnStyle} bg-red-500`,
            onclick: () => dispatch(scoreMsg(card.id, SCORES.BAD)),
          },
          "Bad"
        ),
        button(
          {
            className: `${btnStyle} bg-blue-500`,
            onclick: () => dispatch(scoreMsg(card.id, SCORES.GOOD)),
          },
          "Good"
        ),
        button(
          {
            className: `${btnStyle} bg-green-500`,
            onclick: () => dispatch(scoreMsg(card.id, SCORES.GREAT)),
          },
          "Great"
        ),
      ])
    : null;
}

function question(dispatch, card) {
  return div({ className: "flex flex-col" }, [
    div({ className: "flex justify-between" }, [
      button({ name: "editCard", onclick: () => dispatch(editCardMsg(card.id)) }, "✏️"),
      span({ className: "font-bold" }, "Question"),
      button(
        {
          name: "deleteCard",
          onclick: () => dispatch(deleteCardMsg(card.id)),
        },
        "❌"
      ),
    ]),
    div(
      {
        className: "py-2",
      },
      card.question
    ),
  ]);
}

function editQuestion(dispatch, card) {
  return div({ className: "" }, [
    div({ className: "font-bold" }, "Question"),
    textarea({
      name: "question",
      className: "resize-none	w-full p-2 my-2",
      value: card.question,
      rows: 5,
      oninput: (e) => dispatch(questionInputMsg(card.id, e.target.value)),
    }),
  ]);
}

function answer(dispatch, card) {
  const { showAnswer } = card;
  return showAnswer
    ? div([div({ className: "font-bold" }, "Answer"), span({}, card.answer)])
    : div(
        a(
          {
            name: "showAnswer",
            className: "cursor-pointer",
            onclick: () => dispatch(showAnswerMsg(card.id)),
          },
          "👀 -> Show Answer"
        )
      );
}

function editAnswer(dispatch, card) {
  return div({ className: "" }, [
    div({ className: "font-bold" }, "Answer"),
    textarea({
      name: "answer",
      className: "resize-none	w-full p-2 my-2",
      value: card.answer,
      rows: 5,
      oninput: (e) => dispatch(answerInputMsg(card.id, e.target.value)),
    }),
  ]);
}

function viewCard(dispatch, card) {
  return div(
    { className: "w-100 h-100 bg-green-200 hover:bg-green-300" },
    div(
      {
        className: "p-4",
      },
      [question(dispatch, card), answer(dispatch, card), gradeButtons(dispatch, card)]
    )
  );
}

function editCard(dispatch, card) {
  return div(
    { className: "w-100 h-100 bg-green-200 hover:bg-green-300" },
    div({ className: "p-4" }, [
      editQuestion(dispatch, card),
      editAnswer(dispatch, card),
      button(
        {
          name: "cardSave",
          className: btnStyle,
          onclick: () => dispatch(saveMsg(card.id)),
        },
        "Save"
      ),
    ])
  );
}

const card = R.curry((dispatch, card) => {
  const { edit } = card;
  return edit ? editCard(dispatch, card) : viewCard(dispatch, card);
});

function view(dispatch, model) {
  const cards = R.map(card(dispatch), model.cards);
  return div({ className: "flex flex-col gap-4" }, [
    div(
      button(
        {
          name: "addCard",
          className: btnStyle,
          onclick: () => dispatch(newCardMsg),
        },
        "➕ Add Flashcard"
      )
    ),
    div({ id: "cardsContainer", className: "grid grid-cols-3 gap-4" }, cards),
  ]);
}

export default view;
