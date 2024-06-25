import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:8888";
let delaySendMessage = false



export default function ChatContainer({chatWith = 'Rider'}) {

  const socket = useRef(null); // ใช้ useRef แทนการสร้าง socket ใหม่ในทุกครั้งที่เรนเดอร์
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [wasTyping, setWasTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatId = 1;

  
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages,isTyping]);

  useEffect(() => {
    if (!socket.current) {
      socket.current = socketIOClient(ENDPOINT);
      socket.current.emit("joinChat", { chatId });
      socket.current.on("chatHistory", (messages) => {
        setMessages(messages);
      });
      socket.current.on("newMessage", (message) => {
        console.log(message)
        setIsTyping(false);
        setMessages((messages) => [...messages, message]);
      });
      
      socket.current.on("typing", ({ role }) => {
        if (role !== "USER") {
          console.log('typing')
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
          }, 5000);
        }
      });
    }
    
    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (message && !wasTyping) {
      socket.current.emit("typing", { chatId, role: "USER" });
      setWasTyping(true);
    } else if (!message && wasTyping) {
      setWasTyping(false);
    }
  }, [message, wasTyping, chatId]);

  const sendMessage = () => {
    if (message.trim() && !delaySendMessage) {

      console.log('send');
      socket.current.emit("sendMessage", {
        chatId,
        senderId: 1,
        content: message,
        senderRole: "USER",
      });
      setMessage("");
       delaySendMessage = true
      setTimeout(() => {
        delaySendMessage = false
      }, 1200);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-start pt-[70px] ">
      <div className="w-full h-4/5 border-4 rounded-2xl flex flex-col justify-between items-center">
        <div className=" w-full h-1/6 flex justify-between">
          <div className="h-full mx-2 aspect-[6/7]  flex justify-center items-center">
            <div className="border-torchRed border-[3px] rounded-xl w-3/4 h-3/4">
              image
            </div>
          </div>
          <div className="flex-1 flex justify-center py-5">
            <h1 className="text-white text-3xl">John Wick</h1>
          </div>
          <div className="px-2 py-3 text-center">
            <h1 role="button" className="text-3xl text-torchRed font-extrabold">
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
              <div
                ref={messagesEndRef}
                className={`bg-white text-2xl p-4 m-3 rounded-tl-2xl  rounded-tr-2xl flex gap-4  ${
                  msg.senderRole === "USER"
                    ? "rounded-bl-2xl text-torchRed"
                    : "rounded-br-2xl"
                } `}
              >
                <h1>{msg.senderRole === "USER" ? "You:" : `${chatWith}:`}</h1>{" "}
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && <div className="h-14"></div>}
        </div>
        <div className="relative w-full ">
          {isTyping && (
            <div className="absolute -top-[110px] left-7 ">
              <h1 className="text-[50px] text-white flex ">
                <span className="animate-wave-1 inline-block pr-1">.</span>
                <span className="animate-wave-2 inline-block pr-1">.</span>
                <span className="animate-wave-3 inline-block pr-1">.</span>
              </h1>
            </div>
          )}
        </div>
        <div className=" h-16 w-full mb-5 px-5 flex gap-4 ">
          <div className=" flex-1">
            <input
              className="h-full w-full px-5 rounded-xl text-2xl"
              placeholder="You:"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => (e.key === "Enter" ? sendMessage() : null)}
            />
          </div>
          <div className="  flex justify-center h-full aspect-[5/4] rounded-xl items-center border-[3px] bg-white  border-torchRed">
            <h1 className="text-torchRed font-extrabold text-xl ">Send</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
