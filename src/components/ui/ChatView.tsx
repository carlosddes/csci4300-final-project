"use client";
import MessageBubble from "./MessageBubble";
import { useState, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const ChatView = () => {

    const [messages, setMessages] = useState([{ sender: "ai", content: "Hello, I am your personal AI financial advisor. Please feel free to ask me about anything you would like."}]);
    const [currentMessage, setCurrentMessage] = useState("");

    useEffect(() => {

    }, [messages]);

    const sendMessage = async () => {
        clearComponent();
        setMessages(messages => [...messages, { sender: "user", content: currentMessage}]);
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: currentMessage 
        });
        setMessages(messages => [...messages, { sender: "ai", content: response.text!}]);
    }

    function clearComponent() {
        const form = document.querySelector("form");
        form?.reset();
    }
    
    return (
        <div className="flex flex-col justify-center gap-8">
            <div className="flex items-center justify-center">
                <div className="h-[70vh] w-[52vw] border-2 border-[#ECEFF2] shadow-[1px_2px_3px_1px_rgba(16,24,40,0.05)] rounded-xl p-6 overflow-y-auto">
                    {
                        messages.map((message, index) => {
                            return (<MessageBubble key={index} message={message}></MessageBubble>);
                        })
                    }
                </div>
            </div>
            <div>
                <form id="chatForm" className="flex flex-row gap-6 items-center justify-center" onSubmit={e => {e.preventDefault(); sendMessage();}}>
                    <textarea form="chatForm" id="questionBank" onChange={e => setCurrentMessage(e.target.value)} className="w-[85%] border rounded-xl overflow resize-none wrap overflow-y-auto p-2 bg-gray-100"></textarea>
                    <button type="submit" className="bg-green-200 hover:bg-green-400 rounded-lg w-[60px] h-[40px]">Send</button>
                </form>
            </div>
        </div>
    );
};

export default ChatView;