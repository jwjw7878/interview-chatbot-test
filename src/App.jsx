import React from "react";
import { useState } from "react";
import "./App.css";
import Chatbot from "./components/Chatbot/Chatbot";
import DailyLearning from "./components/DailyLearning/DailyLearning";
const App = () => {
  // 질문칸
  const [question, setQuestion] = useState("");
  // 채팅 내역
  const [chat, setChat] = useState([]);
  // 로딩
  const [loading, setLoading] = useState(false);
  // 난이도 설정
  const [level, setLevel] = useState("");
  // 과목 설정
  const [subject, setSubject] = useState("");

  const submitQuestion = async () => {
    if (!question.trim()) return;

    const userMessage = { role: "user", content: question };
    setChat((prev) => [...prev, userMessage]);
    setLoading(true);
    const systemInstruction = `면접관 AI입니다. 면접 난이도는 "${
      level || "중"
    }"이고, 면접 과목은 "${
      subject || "REACT"
    }"입니다. 사용자의 질문에 '문제:' 형식으로 출제, 사용자가 답할시 정답이면 '정답'으로 알려주고 매응답마다 정답 오답 구분, 해설을 주세요. 다음 문제를 사용자가 질문하기전까지 내지 않는다`;
    const contents = [
      {
        role: "user",
        parts: [{ text: systemInstruction }],
      },
      {
        role: "user",
        parts: [{ text: userMessage.content }],
      },
    ];
    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: contents }),
    };
    try {
      const res = await fetch(import.meta.env.VITE_API_URL, requestOption);
      const data = await res.json();
      const aiText = data.candidates[0].content.parts[0].text;
      const aiMessage = { role: "ai", content: aiText };
      setChat((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      setChat((prev) => [
        ...prev,
        {
          role: "ai",
          content: "죄송합니다. 질문 처리 중 오류가 발생했습니다.",
        },
      ]);
    } finally {
      setLoading(false);
      setQuestion("");
      setLevel("");
      setSubject("");
    }
  };

  return (
    <div className="homepage-container">
      <Chatbot
        chat={chat}
        loading={loading}
        submitQuestion={submitQuestion}
        setLevel={setLevel}
        setSubject={setSubject}
        setQuestion={setQuestion}
        level={level}
        subject={subject}
        question={question}
      />
      <DailyLearning chat={chat} />
    </div>
  );
};

export default App;
