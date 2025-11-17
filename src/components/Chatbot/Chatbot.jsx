import React from "react";
import "./Chatbot.style.css";

const Chatbot = ({
  chat,
  setQuestion,
  setLevel,
  setSubject,
  submitQuestion,
  loading,
  level,
  subject,
  question,
}) => {
  // 난이도 설정
  const levelHandler = (e) => setLevel(e.target.dataset.level);
  // 과목 설정
  const subjectHandler = (e) => setSubject(e.target.dataset.subject);

  return (
    <div className="chatbot-container">
      <h2>Ai 면접 챗봇</h2>
      <div className="chat-box">
        <div className="chat ai">
          <p>AI 면접관</p>
          <p>안녕하세요, AI 면접 챗봇입니다.^^</p>
        </div>

        {chat.map((el, i) => (
          <div key={i} className={`chat ${el.role}`}>
            <p>{el.role === "ai" ? "AI 면접관" : "user"}</p>
            <p>{el.content}</p>
          </div>
        ))}

        {loading && (
          <div className="chat ai">
            <p>AI 면접관</p>
            <p>생성 중...</p>
          </div>
        )}
      </div>

      <div>
        <h4>난이도</h4>
        <p>
          {["상", "중", "하"].map((lv) => (
            <span
              key={lv}
              className={level === lv ? "el active" : "el"}
              data-level={lv}
              onClick={levelHandler}
            >
              {lv}
            </span>
          ))}
        </p>

        <h4>과목</h4>
        <p>
          {["HTML", "CSS", "JAVASCRIPT", "REACT"].map((sub) => (
            <span
              key={sub}
              className={subject === sub ? "el active" : "el"}
              data-subject={sub}
              onClick={subjectHandler}
            >
              {sub}
            </span>
          ))}
        </p>
      </div>

      <p className="question-area">
        <h4>채팅</h4>
        <textarea
          placeholder='옵션을 선택한 후 "면접 질문 주세요"를 입력하세요'
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submitQuestion()}
        />
        <button onClick={submitQuestion}>전송</button>
      </p>
    </div>
  );
};

export default Chatbot;
