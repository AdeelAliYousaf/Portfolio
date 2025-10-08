"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from 'react';


import { VolumeX } from "lucide-react";
function speakText(text) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new window.SpeechSynthesisUtterance(text);
  utter.rate = 1;
  utter.pitch = 1;
  function setVoiceAndSpeak() {
    const voices = window.speechSynthesis.getVoices();
    const ukVoice = voices.find(v => v.name === 'Google UK English Female' || v.name === 'Google UK English Male');
    if (ukVoice) {
      utter.voice = ukVoice;
      utter.lang = ukVoice.lang;
    } else {
      utter.lang = 'en-GB';
    }
    window.speechSynthesis.speak(utter);
  }
  if (window.speechSynthesis.getVoices().length === 0) {
    // Voices not loaded yet, wait for them
    window.speechSynthesis.onvoiceschanged = function handler() {
      setVoiceAndSpeak();
      window.speechSynthesis.onvoiceschanged = null;
    };
  } else {
    setVoiceAndSpeak();
  }
}
function renderMessageWithLinks(text) {
  if (!text && text !== 0) return <span>&nbsp;</span>;
  const urlRegex = /(https?:\/\/[\w\-._~:/?#[\]@!$&'()*+,;=%]+)|(www\.[\w\-._~:/?#[\]@!$&'()*+,;=%]+)/gi;
  const parts = String(text).split(urlRegex);
  return parts.map((part, i) => {
    if (!part && part !== 0) return <span key={i}>&nbsp;</span>;
    if (urlRegex.test(part)) {
      let url = part;
      if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
      return (
        <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline break-all hover:text-blue-300">{part}</a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}
function stopSpeaking() {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}
import { Send, MessageCircle, X, User } from 'lucide-react';

async function fetchAnswer(question) {
  const res = await fetch("/api/chatbot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question })
  });
  if (!res.ok) return { answer: "Sorry, something went wrong. Probably the load to server causing me to halt. Please try to reach me later or contact Adeel to get information. here is his email: adeelaliyousaf.dev@gmail.com" };
  const data = await res.json();
  return data;
}


export default function ModernChatbot() {
  // Hide chat button for 9 seconds after mount
  const [showChatButton, setShowChatButton] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowChatButton(true), 7000);
    return () => clearTimeout(timer);
  }, []);

  const [messages, setMessages] = useState([
    { 
      id: 1,
      from: "bot", 
      text: "👋 Hello! My name is JARVIS an AI Assistant trained by Adeel Ali Yousaf to answer about his portfolio on his behalf. How can I help you?", 
      timestamp: new Date() 
    }
  ]);
  // Hydration fix: control chatbot-anim-wrap className on client
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
    const wrap = document.getElementById('chatbot-anim-wrap');
    if (wrap) {
      wrap.className = hydrated
        ? 'transition-opacity duration-700 delay-100 opacity-100'
        : 'opacity-0 pointer-events-none transition-opacity duration-700 delay-100';
    }
    // On unmount, reset
    return () => {
      if (wrap) wrap.className = 'opacity-0 pointer-events-none transition-opacity duration-700 delay-100';
    };
  }, [hydrated]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [pendingCV, setPendingCV] = useState(null); // { answer, cvLink }
  const [pendingLink, setPendingLink] = useState(null); // { linkType, linkUrl }
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const lastSpokenId = useRef(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Only speak new bot messages if chat is open, message is new, and user has interacted
  useEffect(() => {
    if (!messages.length || !isOpen || !hasInteracted) return;
    const last = messages[messages.length - 1];
    // Do not speak the predefined first message (match both old and new variants)
    const isDefaultWelcome = last.id === 1 && last.text && (
      last.text.includes("JARVIS an AI Assistant trained by Adeel Ali Yousaf")
    );
    if (last.from === 'bot' && last.text && last.id !== lastSpokenId.current && !isDefaultWelcome) {
      speakText(last.text);
      lastSpokenId.current = last.id;
    }
    // If user sends a message, cancel any ongoing speech
    if (last.from === 'user') {
      stopSpeaking();
    }
  }, [messages, isOpen, hasInteracted]);

  // Stop speaking when chat is closed
  useEffect(() => {
    if (!isOpen) {
      stopSpeaking();
    }
  }, [isOpen]);



  const sendMessage = async (overrideInput) => {
    const messageText = overrideInput !== undefined ? overrideInput : input;
    if (!messageText.trim()) return;
    const userMessage = {
      id: Date.now(),
      from: "user",
      text: messageText,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setPendingCV(null);
    setPendingLink(null);
    try {
      const data = await fetchAnswer(messageText);
      if (data.cvLink) {
        // Special CV download flow
        setPendingCV({ answer: data.answer, cvLink: data.cvLink });
        const botMessage = {
          id: Date.now() + 1,
          from: "bot",
          text: data.answer + "\nReply with Yes or No.",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } else if (data.linkType && data.linkUrl) {
        // Project/certification link confirmation flow
        setPendingLink({ linkType: data.linkType, linkUrl: data.linkUrl });
        const botMessage = {
          id: Date.now() + 1,
          from: "bot",
          text: data.answer,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } else if (data.redirect) {
        // Redirect user to the link
        window.open(data.redirect, '_blank');
        const botMessage = {
          id: Date.now() + 1,
          from: "bot",
          text: data.answer,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        const botMessage = {
          id: Date.now() + 1,
          from: "bot",
          text: data.answer,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      const botMessage = {
        id: Date.now() + 1,
        from: "bot",
        text: "Sorry, I couldn't answer your question right now. Please try again later.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // If pendingCV, handle yes/no
      if (pendingCV) {
        handleCVConfirm(input.trim().toLowerCase());
      } else if (pendingLink) {
        handleLinkConfirm(input.trim().toLowerCase());
      } else {
        sendMessage();
      }
    }
  };

  // Handle user confirmation for project/certification link
  const handleLinkConfirm = (response) => {
    if (!pendingLink) return;
    const userMessage = {
      id: Date.now(),
      from: "user",
      text: response,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setTimeout(async () => {
      if (["yes", "y", "sure", "ok", "please", "redirect", "open", "go"].includes(response)) {
        // Call API with confirm true
        const res = await fetch("/api/chatbot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: "", confirm: true, linkType: pendingLink.linkType, linkUrl: pendingLink.linkUrl })
        });
        const data = await res.json();
        if (data.redirect) {
          window.open(data.redirect, '_blank');
        }
        const botMessage = {
          id: Date.now() + 1,
          from: "bot",
          text: data.answer,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        // Call API with confirm false
        const res = await fetch("/api/chatbot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: "", confirm: false, linkType: pendingLink.linkType, linkUrl: pendingLink.linkUrl })
        });
        const data = await res.json();
        const botMessage = {
          id: Date.now() + 1,
          from: "bot",
          text: data.answer,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      }
      setIsTyping(false);
      setPendingLink(null);
    }, 800);
  };

  // Handle user confirmation for CV download
  const handleCVConfirm = (response) => {
    if (!pendingCV) return;
    const userMessage = {
      id: Date.now(),
      from: "user",
      text: response,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      if (["yes", "y", "sure", "ok", "please", "download"].includes(response)) {
        // Trigger download
        const link = document.createElement('a');
        link.href = pendingCV.cvLink;
        link.download = '';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        const botMessage = {
          id: Date.now() + 1,
          from: "bot",
          text: "✅ CV download started. Let me know if you need anything else!",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        const botMessage = {
          id: Date.now() + 1,
          from: "bot",
          text: "No problem! If you change your mind, just ask for Adeel's CV anytime.",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      }
      setIsTyping(false);
      setPendingCV(null);
    }, 800);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Simple Modern Rectangle Button (hidden for 9s after mount) */}
      {!isOpen && showChatButton && (
        <div
          className="fixed z-[9999] chatbot-launcher flex items-center justify-center chatbot-launcher-animate"
          style={{
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            margin: 0,
            borderRadius: '1.5rem 0 0 1.5rem',
          }}
        >
          <button
            onClick={() => setIsOpen(true)}
            className="group relative text-white rounded-l-2xl shadow-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500/50 active:scale-95 px-2 py-4 opacity-80 hover:opacity-100 w-10 min-w-[40px] max-w-[44px] h-20 sm:h-16 md:h-24 lg:h-28 flex items-center justify-center liquid-glass-chatbot overflow-hidden"
            style={{ 
              borderTopRightRadius: 0, 
              borderBottomRightRadius: 0,
              background: 'linear-gradient(135deg, rgba(255,100,50,0.15), rgba(150,50,200,0.1)), rgba(255,255,255,0.08)',
              backdropFilter: 'blur(60px) saturate(180%)',
              WebkitBackdropFilter: 'blur(60px) saturate(180%)',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -1px 1px rgba(0,0,0,0.1), 0 20px 40px rgba(0,0,0,0.3)'
            }}
            aria-label="Open Chatbot"
          >
            <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          </button>
        </div>
      )}
  {/* Notification indicator and tooltip are removed for minimalism and clarity */}

      {/* Chat Window */}
      <div
        className={`fixed z-[9998] transition-all duration-500 ease-in-out chatbot-window ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} right-0 bottom-0 w-full max-w-[400px] h-[600px] max-h-[90vh] rounded-tl-3xl md:rounded-tl-2xl md:w-[400px] md:h-[600px] md:max-h-[90vh]`}
        style={{
          borderTopLeftRadius: '1.5rem',
          borderBottomLeftRadius: '1.5rem',
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        <div className={`bg-gray-900/95 backdrop-blur-xl rounded-l-2xl shadow-2xl border-l border-t border-b border-gray-700/50 overflow-hidden transition-all duration-300 h-full ${isOpen ? 'mobile-chat' : ''}`}> 
          {/* Header - sticky for mobile visibility */}
          <div className="flex items-center justify-between p-4 text-white sticky top-0 z-20 bg-gray-900/95 backdrop-blur-xl" style={{ minHeight: '64px' }}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center overflow-hidden">
                <Image src="/Logo.png" alt="AI Logo" width={28} height={28} className="w-7 h-7 object-contain" />
              </div>
              <div>
                <h3 className="font-bold text-base">JARVIS</h3>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-sm"></div>
                  <span className="text-xs opacity-90 font-medium">Online</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 hover:scale-105"
                title="Close Chatbot"
              >
                {/* Stop icon (Speaker with X) */}
                <X className="w-5 h-5"/>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="overflow-y-auto py-12 p-4 space-y-4 bg-gradient-to-b from-gray-800/50 to-gray-900/50" 
            style={{ height: '440px' }}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                <div className={`flex items-start space-x-3 max-w-[320px] ${message.from === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
                    message.from === 'user' 
                      ? 'bg-gradient-to-br from-orange-500 via-red-600 to-purple-700 text-white' 
                      : 'bg-gradient-to-br from-gray-700 to-gray-800 text-gray-300 border border-gray-600/50'
                  }`}>
                    {message.from === 'user' ? <User className="w-4 h-4" /> : <Image src="/Logo.png" alt="AI Logo" width={24} height={24} className="w-6 h-6 object-contain" />}
                  </div>
                  {/* Message bubble */}
                  <div className="flex flex-col">
                    <div className={`px-4 py-3 rounded-2xl transition-all duration-200 hover:scale-[1.02] ${
                      message.from === 'user'
                        ? 'bg-gradient-to-br from-orange-500 via-red-600 to-purple-700 text-white rounded-br-md shadow-lg'
                        : 'bg-gray-800 shadow-lg border border-gray-700/50 text-gray-100 rounded-bl-md'
                    }`}>
                      <p className="text-sm leading-relaxed">
                        {message.from === 'bot' 
                          ? renderMessageWithLinks(message.text)
                          : message.text}
                      </p>
                    </div>

                    <span className={`text-xs text-gray-400 mt-2 ${
                      message.from === 'user' ? 'text-right' : 'text-left'
                    }`}>
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start animate-fadeIn">
                <div className="flex items-start space-x-3 max-w-[320px]">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 text-gray-300 border border-gray-600/50 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Image src="/Logo.png" alt="AI Logo" width={20} height={20} className="w-5 h-5 object-contain" />
                  </div>
                  <div className="bg-gray-800 shadow-lg border border-gray-700/50 px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          {/* Input - sticky for mobile visibility */}
          <div className="p-4 bg-gray-800/80 backdrop-blur border-t border-gray-700/50 sticky bottom-0 z-20" style={{ minHeight: '72px' }}>
            <div className="flex items-center gap-2 md:gap-3 w-full">
              <div className="flex-1 flex items-center relative min-h-[44px]">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={e => {
                    setInput(e.target.value);
                    if (!hasInteracted) setHasInteracted(true);
                  }}
                  onKeyPress={e => {
                    handleKeyPress(e);
                    if (!hasInteracted) setHasInteracted(true);
                  }}
                  onClick={() => { if (!hasInteracted) setHasInteracted(true); }}
                  placeholder={isTyping ? "JARVIS is typing..." : "Type your message..."}
                  disabled={isTyping}
                  rows="1"
                  className={`w-full px-4 py-3 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 resize-none text-sm text-gray-100 placeholder-gray-400 transition-all duration-200 backdrop-blur ${
                    isTyping 
                      ? 'bg-gray-700/50 cursor-not-allowed opacity-75' 
                      : 'bg-gray-700/80 hover:bg-gray-700/90'
                  }`}
                  style={{ minHeight: '44px', maxHeight: '120px' }}
                />
                {/* Disabled overlay when typing */}
                {isTyping && (
                  <div className="absolute inset-0 bg-gray-800/20 rounded-xl flex items-center justify-center">
                    <div className="flex space-x-1">
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2 md:flex-row md:gap-2 items-center justify-center h-full">
                <button
                  onClick={() => {
                    if (pendingCV) {
                      handleCVConfirm(input.trim().toLowerCase());
                    } else {
                      sendMessage();
                    }
                  }}
                  disabled={!input.trim() || isTyping}
                  className={`p-3 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all duration-200 shadow-lg ${
                    !input.trim() || isTyping
                      ? 'bg-gray-600/50 cursor-not-allowed opacity-50'
                      : 'bg-gradient-to-br from-orange-500 via-red-600 to-purple-700 hover:from-orange-600 hover:via-red-700 hover:to-purple-800 hover:scale-105 active:scale-95'
                  }`}
                  style={{ minWidth: '44px' }}
                >
                  {isTyping ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={stopSpeaking}
                  className="p-3 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all duration-200 shadow-lg bg-gray-700 hover:bg-gray-600 active:scale-95"
                  style={{ minWidth: '44px' }}
                  title="Stop Speaking"
                >
                  {/* Stop icon (Speaker with X) */}
                   <VolumeX className="w-4 h-4 text-white/60" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

  <style jsx>{`
        @keyframes chatbotLauncherIn {
          from { opacity: 0; transform: translateY(-50%) translateX(60px); }
          to { opacity: 1; transform: translateY(-50%) translateX(0); }
        }
        .chatbot-launcher-animate {
          animation: chatbotLauncherIn 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        
        .liquid-glass-chatbot {
          position: relative;
          overflow: hidden;
        }
        
        .liquid-glass-chatbot::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          right: -50%;
          bottom: -50%;
          background: conic-gradient(from 0deg at 50% 50%, 
            rgba(255,150,100,0.4) 0deg, 
            rgba(255,100,150,0.2) 90deg, 
            rgba(200,100,255,0.5) 180deg, 
            rgba(255,50,100,0.1) 270deg, 
            rgba(255,150,100,0.4) 360deg);
          border-radius: inherit;
          z-index: -1;
          animation: liquidRotateChatbot 8s linear infinite, liquidPulseChatbot 4s ease-in-out infinite alternate;
        }
        
        .liquid-glass-chatbot::after {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse 180% 120% at 20% 10%, rgba(255,200,100,0.3) 0%, transparent 45%),
            radial-gradient(ellipse 140% 90% at 80% 80%, rgba(255,100,200,0.25) 0%, transparent 55%),
            linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 35%, rgba(255,150,100,0.1) 100%);
          border-radius: inherit;
          pointer-events: none;
          animation: liquidWaveChatbot 5s ease-in-out infinite, liquidFlowChatbot 10s ease-in-out infinite;
        }
        
        @keyframes liquidRotateChatbot {
          0% { transform: rotate(0deg) scale(1); }
          100% { transform: rotate(360deg) scale(1); }
        }
        
        @keyframes liquidPulseChatbot {
          0% { opacity: 0.7; }
          100% { opacity: 1; }
        }
        
        @keyframes liquidWaveChatbot {
          0%, 100% { 
            background: 
              radial-gradient(ellipse 180% 120% at 20% 10%, rgba(255,200,100,0.3) 0%, transparent 45%),
              radial-gradient(ellipse 140% 90% at 80% 80%, rgba(255,100,200,0.25) 0%, transparent 55%),
              linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 35%, rgba(255,150,100,0.1) 100%);
          }
          33% { 
            background: 
              radial-gradient(ellipse 200% 100% at 70% 20%, rgba(255,150,200,0.35) 0%, transparent 50%),
              radial-gradient(ellipse 120% 100% at 30% 70%, rgba(200,100,255,0.3) 0%, transparent 60%),
              linear-gradient(45deg, rgba(255,255,255,0.18) 0%, transparent 30%, rgba(255,100,150,0.08) 100%);
          }
          66% { 
            background: 
              radial-gradient(ellipse 160% 140% at 90% 30%, rgba(255,100,100,0.28) 0%, transparent 55%),
              radial-gradient(ellipse 180% 80% at 10% 60%, rgba(255,200,150,0.22) 0%, transparent 50%),
              linear-gradient(225deg, rgba(255,255,255,0.12) 0%, transparent 40%, rgba(200,150,255,0.15) 100%);
          }
        }
        
        @keyframes liquidFlowChatbot {
          0%, 100% { transform: translateX(0) translateY(0) scale(1); }
          25% { transform: translateX(1px) translateY(-2px) scale(1.03); }
          50% { transform: translateX(-2px) translateY(1px) scale(0.97); }
          75% { transform: translateX(-1px) translateY(-1px) scale(1.02); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
        
        /* Custom dark scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.3);
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(107, 114, 128, 0.6);
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.8);

        /* Mobile responsiveness */
        @media (max-width: 640px) {
          .chatbot-window {
            width: 100vw !important;
            height: 100vh !important;
            max-width: 100vw !important;
            max-height: 100vh !important;
            border-radius: 0 !important;
            right: 0 !important;
            left: 0 !important;
            top: 0 !important;
            bottom: 0 !important;
            margin: 0 !important;
            z-index: 9998 !important;
          }
          .chatbot-launcher {
            right: 0 !important;
            left: auto !important;
            top: 50% !important;
            bottom: auto !important;
            transform: translateY(-50%) !important;
            margin: 0 !important;
            border-radius: 1.5rem 0 0 1.5rem !important;
            z-index: 9999 !important;
            width: 40px !important;
            min-width: 36px !important;
            max-width: 44px !important;
            height: 64px !important;
            opacity: 0.5 !important;
          }
        }

        /* Smooth transitions for all states */
        * {
          box-sizing: border-box;
        }
        
        /* Ensure no overflow */
        body {
          overflow-x: hidden;
        }
      `}</style>
    </>
  );
}