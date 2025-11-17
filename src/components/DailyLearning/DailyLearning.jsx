import React from "react";
import "./DailyLearning.style.css";

const DailyLearning = ({ chat }) => {
  const filteredQuestions = chat
    .filter((el) => el.role === "ai")
    .filter(
      (el) => el.content.includes("문제") && !el.content.includes("정답")
    );

  const aiQuestionArr = filteredQuestions.length >= 10 ? [] : filteredQuestions;
  return (
    <div className="daily-container">
      <h2>오늘 일일 할당량</h2>
      <div style={{ display: "flex", alignItems: "center", width: "90%" }}>
        <div className="answer-length">
          <div
            className="answer-graph"
            style={{
              height: "100%",
              width: `${aiQuestionArr.length * 10}%`,
            }}
          ></div>
        </div>
        <p>{aiQuestionArr.length * 10}%</p>
      </div>
      <div className="daily-box">
        <ul>
          {aiQuestionArr.map((q, i) => (
            <li key={i}>
              {q.content} <span style={{ color: "red" }}>북마크</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DailyLearning;
