"use client"

import { useChat } from "ai/react"
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react"
import { useRef, useEffect, useState } from "react"

interface Props {
  stateAbbreviation: string
  farmType: string
  farmName?: string
}

const SUGGESTED = [
  "What diseases must I report in my state within 24 hours?",
  "Do I need a pesticide applicator license to use restricted-use products?",
  "What records do I need to keep for USDA compliance?",
  "What are the withdrawal periods I need to track for treated animals?",
  "What biosecurity practices are required for my farm type?",
  "How do I create a nutrient management plan?",
]

export function AiChatClient({ stateAbbreviation, farmType, farmName }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)
  const [inputValue, setInputValue] = useState("")

  // AI SDK v6 useChat API
  const { messages, sendMessage, status, append } = useChat({
    api: "/api/chat",
    body: { stateAbbreviation, farmType, farmName },
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: `Hello! I'm your AgriGuard AI Compliance Assistant. I'm here to help you understand agricultural regulations${stateAbbreviation !== "US" ? ` specific to ${stateAbbreviation}` : ""} and best biosecurity practices${farmType !== "mixed" ? ` for ${farmType} operations` : ""}.\n\nWhat compliance question can I help you with today?`,
        parts: [{ type: "text" as const, text: `Hello! I'm your AgriGuard AI Compliance Assistant.` }],
      },
    ],
  })

  const isLoading = status === "streaming" || status === "submitted"

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  function handleSend() {
    if (!inputValue.trim() || isLoading) return
    sendMessage({ text: inputValue.trim() })
    setInputValue("")
  }

  function handleSuggestion(text: string) {
    sendMessage({ text })
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden" style={{ height: "calc(100vh - 220px)", minHeight: "500px" }}>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full gradient-farm flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="h-4 w-4 text-white" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-farm-700 text-white rounded-tr-sm"
                  : "bg-gray-50 text-gray-800 rounded-tl-sm border border-gray-100"
              }`}
            >
              {msg.parts?.map((part, i) =>
                part.type === "text" ? (
                  <p key={i} className="whitespace-pre-wrap">{part.text}</p>
                ) : null
              ) ?? <p className="whitespace-pre-wrap">{msg.content}</p>}
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0 mt-0.5">
                <User className="h-4 w-4 text-gray-600" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full gradient-farm flex items-center justify-center shrink-0">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
              <Loader2 className="h-4 w-4 animate-spin text-farm-600" />
            </div>
          </div>
        )}

        {/* Suggested questions (show only when just the welcome message) */}
        {messages.length === 1 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" /> Suggested questions
            </p>
            <div className="grid sm:grid-cols-2 gap-2">
              {SUGGESTED.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSuggestion(q)}
                  className="text-left text-xs bg-farm-50 border border-farm-100 text-farm-800 px-3 py-2.5 rounded-xl hover:bg-farm-100 transition-colors font-medium"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Disclaimer */}
      <div className="px-6 py-2 bg-amber-50 border-t border-amber-100">
        <p className="text-xs text-amber-700">
          AI responses are for informational purposes only. Always verify with your state Department of Agriculture.
        </p>
      </div>

      {/* Input */}
      <div className="flex gap-3 p-4 border-t border-gray-100">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about regulations, biosecurity, reportable diseases…"
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-farm-600 text-sm text-gray-900 placeholder-gray-400"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !inputValue.trim()}
          className="gradient-farm text-white p-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
