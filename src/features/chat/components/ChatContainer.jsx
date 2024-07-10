/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";

let delaySendMessage = false;

export default function ChatContainer({
  chatWith = "Rider",
  messages,
  socket,
  chatId,
  closeChat,
  senderId,
  chatWithInfo = null
}) {
  const messagesEndRef = useRef(null);
  const [wasTyping, setWasTyping] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (message && !wasTyping) {
      socket.emit("typing", { chatId, role: "USER" });
      setWasTyping(true);
    } else if (!message && wasTyping) {
      setWasTyping(false);
    }
  }, [message, wasTyping, chatId]);

  const sendMessage = () => {
    if (message.trim() && !delaySendMessage) {
      console.log("send");
      socket.emit("sendMessage", {
        chatId,
        senderId,
        content: message,
        senderRole: "USER",
      });
      setMessage("");
      delaySendMessage = true;
      setTimeout(() => {
        delaySendMessage = false;
      }, 1200);
    }
  };

  return (
    <div className="absolute pt-[70px] z-50 top-0  w-screen h-screen flex justify-center items-start">
      <div className="w-full bg-gradient-to-r from-[#516293] to-[#1D2B53] h-[85%] border-4 rounded-2xl flex flex-col justify-between items-center">
        <div className="w-full h-1/6 flex justify-between">
          <div className="h-full mx-2 aspect-[6/7] flex justify-center items-center">
            <div className="border-torchRed border-[3px] rounded-xl w-3/4 h-3/4">
              image
            </div>
          </div>
          <div className="flex-1 flex justify-center py-5">
            <h1 className="text-white text-3xl">{chatWithInfo? `${chatWithInfo.firstName} ${chatWithInfo.lastName}`  :null}</h1>
          </div>
          <div className="px-2 py-3 text-center">
            <h1
              onClick={closeChat}
              role="button"
              className="text-3xl text-torchRed font-extrabold"
            >
              &#10005;
            </h1>
          </div>
        </div>
        <div className="relative border-2 w-full flex-1 mb-5 p-2 overflow-y-scroll">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.senderRole === "USER" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.senderRole === "TYPING" ? (
                <div className="bg-white text-2xl p-4 m-3 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl flex gap-4">
                  <h1 className="text-[50px] text-black flex items-center px-2">
                    <span className="animate-wave-1 inline-block pr-1">.</span>
                    <span className="animate-wave-2 inline-block pr-1">.</span>
                    <span className="animate-wave-3 inline-block pr-1">.</span>
                  </h1>
                </div>
              ) : (
                <div
                  ref={messagesEndRef}
                  className={`bg-white text-2xl p-4 m-3 rounded-tl-2xl rounded-tr-2xl flex gap-4 ${
                    msg.senderRole === "USER"
                      ? "rounded-bl-2xl text-torchRed"
                      : "rounded-br-2xl"
                  }`}
                >
                  <h1>{msg.senderRole === "USER" ? "You:" : `${chatWith}:`}</h1>{" "}
                  {msg.content}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="h-16 w-full mb-5 px-5 flex gap-4">
          <div className="flex-1">
            <input
              className="h-full w-full px-5 rounded-xl text-2xl"
              placeholder="You:"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => (e.key === "Enter" ? sendMessage() : null)}
            />
          </div>
          <div
            onClick={sendMessage}
            className="flex justify-center h-full aspect-[5/4] rounded-xl items-center border-[3px] bg-white border-torchRed"
          >
            <h1 className="text-torchRed font-extrabold text-xl">Send</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
