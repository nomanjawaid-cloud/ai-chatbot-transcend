"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { CiChat1 } from "react-icons/ci";

import { Bot, User, Send } from "lucide-react";

export const Icons = {
  bot: Bot,
  user: User,
  send: Send,
};
import { queryBlueprints } from "@/src/lib/api";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  isError?: boolean;
  isStreaming?: boolean;
}

interface ChatBotProps {
  userName?: string;
}

export default function ChatBot({ userName = "User" }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: `Hello ${userName}! I'm your AI assistant for blueprint management.\n\nYou can ask me things like:\n• "show my blueprints"\n• "search blueprints for mathematics"\n• "show my template blueprints"\n• "show public blueprints"\n• "describe blueprint structure"\n\nWhat would you like to know?`,
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(
    null,
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const streamingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Cleanup streaming interval on unmount
  useEffect(() => {
    return () => {
      if (streamingIntervalRef.current) {
        clearInterval(streamingIntervalRef.current);
      }
    };
  }, []);

  // Streaming effect function
  const streamMessage = (
    fullText: string,
    messageId: string,
    isError: boolean = false,
  ) => {
    let currentIndex = 0;
    const chunkSize = 2; // Characters to add per interval
    const intervalTime = 20; // Milliseconds between chunks (faster = 20ms, slower = 50ms)

    // Create initial empty message
    const initialMessage: Message = {
      id: messageId,
      text: "",
      sender: "bot",
      timestamp: new Date(),
      isError,
      isStreaming: true,
    };

    setMessages((prev) => [...prev, initialMessage]);
    setStreamingMessageId(messageId);

    // Clear any existing interval
    if (streamingIntervalRef.current) {
      clearInterval(streamingIntervalRef.current);
    }

    // Stream the text character by character
    streamingIntervalRef.current = setInterval(() => {
      currentIndex += chunkSize;

      if (currentIndex >= fullText.length) {
        // Streaming complete
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId
              ? { ...msg, text: fullText, isStreaming: false }
              : msg,
          ),
        );
        setStreamingMessageId(null);
        if (streamingIntervalRef.current) {
          clearInterval(streamingIntervalRef.current);
          streamingIntervalRef.current = null;
        }
      } else {
        // Update message with more text
        const currentText = fullText.substring(0, currentIndex);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId ? { ...msg, text: currentText } : msg,
          ),
        );
      }
    }, intervalTime);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim() || streamingMessageId) return; // Prevent sending while streaming

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userQuery = inputValue;
    setInputValue("");
    setIsTyping(true);

    try {
      // Call the blueprint query API
      const response = await queryBlueprints({ prompt: userQuery });
      setIsTyping(false);

      const messageId = (Date.now() + 1).toString();
      const responseText = response.response || "No results found.";

      // Start streaming the response
      streamMessage(responseText, messageId, false);
    } catch (error) {
      setIsTyping(false);

      // Stream error message
      const messageId = (Date.now() + 1).toString();
      const errorText =
        error instanceof Error
          ? error.message
          : "Failed to process your query. Please try again.";
      streamMessage(errorText, messageId, true);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="bg-blue-900 px-6 py-4 flex items-center gap-3">
        <div className="w-12 h-10 rounded-full overflow-hidden flex items-center justify-center">
          <CiChat1 className="w-8 h-8 object-cover text-white" />
        </div>
        <div>
          <h2 className="text-white font-semibold text-lg">Transcend</h2>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 dark:bg-gray-800">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.sender === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === "user" ? "bg-red-600" : "bg-white"
              }`}
            >
              {message.sender === "user" ? (
                <User className="w-5 h-5 text-white" />
              ) : (
                <img
                  src="/logo pic.png"
                  alt="Bot Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              )}
            </div>
            <div
              className={`flex flex-col max-w-[70%] ${
                message.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`px-4 py-3 rounded-2xl ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white rounded-tr-sm"
                    : message.isError
                      ? "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded-tl-sm shadow-md border border-red-200 dark:border-red-800"
                      : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-tl-sm shadow-md"
                }`}
              >
                <div className="text-sm leading-relaxed prose prose-sm max-w-none dark:prose-invert">
                  <ReactMarkdown>{message.text}</ReactMarkdown>
                </div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-2">
                {formatTime(message.timestamp)}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img
                src="/logo pic.png"
                alt="Bot Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-white dark:bg-gray-700 px-4 py-3 rounded-2xl rounded-tl-sm shadow-md">
              <div className="flex gap-1">
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSendMessage} className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 font-medium"
          >
            <Send className="w-5 h-5" />
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
