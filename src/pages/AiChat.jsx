import { useEffect, useRef, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { sendChatMessage } from "../services/openaiService";

const PROMPT_TEMPLATES = [
  { id: 1, label: "Coding Help", prompt: "Explain this JavaScript code snippet:" },
  { id: 2, label: "Writing Help", prompt: "Help me improve this paragraph:" },
  { id: 3, label: "General Q&A", prompt: "" },
];

export default function AiChat() {
  const [messages, setMessages] = useState([
    { id: 0, from: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(PROMPT_TEMPLATES[2].id);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const fetchBotResponse = async (fullPrompt) => {
    try {
      const apiMessages = [
        ...messages.map((m) => ({
          role: m.from === "user" ? "user" : "assistant",
          content: m.text,
        })),
        { role: "user", content: fullPrompt },
      ];

      console.log("Sending prompt:", fullPrompt);
      console.log("Messages sent to API:", apiMessages);

      const botReply = await sendChatMessage(apiMessages);
      return botReply || "Sorry, no response.";
    } catch (err) {
      console.error("Fetch error:", err);
      return "Oops! Something went wrong. Please try again.";
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const template = PROMPT_TEMPLATES.find((t) => t.id === selectedTemplate);
    const fullPrompt = template.prompt ? `${template.prompt} ${input.trim()}` : input.trim();

    setMessages((msgs) => [...msgs, { id: msgs.length, from: "user", text: input.trim() }]);
    setInput("");
    setIsTyping(true);

    const botReply = await fetchBotResponse(fullPrompt);

    setIsTyping(false);
    setMessages((msgs) => [...msgs, { id: msgs.length, from: "bot", text: botReply }]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="container mt-4">
      <h2>🤖 AI Chat Assistant</h2>

      <div className="mb-3">
        <label htmlFor="templateSelect" className="form-label">
          Select Prompt Template:
        </label>
        <select
          id="templateSelect"
          className="form-select"
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(Number(e.target.value))}
        >
          {PROMPT_TEMPLATES.map((template) => (
            <option key={template.id} value={template.id}>
              {template.label}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          height: "300px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "1rem",
          borderRadius: "5px",
          backgroundColor: "#f8f9fa",
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 d-flex ${msg.from === "user" ? "justify-content-end" : "justify-content-start"}`}
          >
            <div
              style={{
                maxWidth: "70%",
                padding: "0.5rem 1rem",
                borderRadius: "15px",
                backgroundColor: msg.from === "user" ? "#0d6efd" : "#e9ecef",
                color: msg.from === "user" ? "white" : "black",
                whiteSpace: "pre-wrap",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="d-flex justify-content-start">
            <div
              style={{
                maxWidth: "70%",
                padding: "0.5rem 1rem",
                borderRadius: "15px",
                backgroundColor: "#e9ecef",
                color: "black",
                fontStyle: "italic",
              }}
            >
              <Typewriter
                words={["Hi! How can I help?", "Ask me anything..."]}
                loop
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <textarea
        className="form-control mt-3"
        rows={3}
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isTyping}
      />

      <button className="btn btn-primary mt-2" onClick={handleSend} disabled={isTyping}>
        Send
      </button>
    </div>
  );
}
