import React, { useState } from 'react';
import { Bot, Send, Sparkles, Info } from 'lucide-react';
import { AppLayout } from '../../components/layout/AppLayout';
import { KNOWLEDGE_BASE } from '../../data/knowledge/knowledgeBase';
import { queryLocalCompanion } from '../../services/companionService';

interface ChatMessage {
  id: string;
  sender: 'user' | 'companion';
  text: string;
  actionTip?: string;
}

export const CompanionPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'companion',
      text: "Hello Explorer! I'm Verdantia's Local Eco-Guide. Ask me about tree planting, climate change, ocean pollution, wildlife protection, water conservation, renewable energy, or waste management!",
    },
  ]);

  const sendQuestion = (questionText: string) => {
    const trimmed = questionText.trim();
    if (!trimmed) return;

    const reply = queryLocalCompanion(trimmed);
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: trimmed,
    };
    const botMsg: ChatMessage = {
      id: `b-${Date.now() + 1}`,
      sender: 'companion',
      text: reply.answer,
      actionTip: reply.actionTip,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuestion(input);
  };

  return (
    <AppLayout>
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-sky-300">
              Offline Knowledge Companion
            </span>
            <h1 className="mt-1 font-display text-3xl font-bold text-white">
              Verdantia Local Eco-Guide
            </h1>
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl border border-sky-400/25 bg-sky-500/10 px-3 py-2 text-xs text-sky-200">
            <Info className="h-4 w-4 shrink-0" />
            <span>Rule-based local knowledge base • No external AI APIs</span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Chat Area */}
          <div className="glass-panel flex h-[520px] flex-col p-5 lg:col-span-8">
            <div className="flex-1 space-y-4 overflow-y-auto pr-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 font-medium text-slate-950'
                        : 'border border-emerald-400/20 bg-emerald-950/80 text-emerald-50'
                    }`}
                  >
                    {msg.sender === 'companion' && (
                      <div className="mb-1 flex items-center gap-1.5 text-xs font-bold text-teal-300">
                        <Bot className="h-3.5 w-3.5" />
                        <span>Eco-Guide</span>
                      </div>
                    )}
                    <p>{msg.text}</p>
                    {msg.actionTip && (
                      <p className="mt-2 rounded-xl bg-black/30 px-3 py-2 text-xs text-amber-200">
                        <Sparkles className="mr-1 inline h-3.5 w-3.5" />
                        {msg.actionTip}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="mt-4 flex gap-2 border-t border-white/10 pt-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about forests, coral reefs, solar power, water..."
                aria-label="Ask the Local Eco-Guide"
                className="flex-1 rounded-xl border border-emerald-400/25 bg-emerald-950/80 px-4 py-2.5 text-sm text-white placeholder-emerald-300/40 focus:border-emerald-400 focus:outline-none"
              />
              <button type="submit" className="btn-primary px-4">
                <Send className="h-4 w-4" />
                <span className="hidden sm:inline">Ask</span>
              </button>
            </form>
          </div>

          {/* Suggested Questions */}
          <div className="glass-panel p-5 lg:col-span-4">
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-emerald-300">
              Suggested Topics
            </h2>
            <p className="mt-1 text-xs text-emerald-100/70">
              Click any question to explore Verdantia&apos;s environmental guide:
            </p>
            <div className="mt-4 space-y-2.5">
              {KNOWLEDGE_BASE.map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => sendQuestion(topic.suggestedQuestion)}
                  className="w-full rounded-xl border border-emerald-400/20 bg-emerald-950/60 p-3 text-left text-xs text-emerald-100 transition hover:border-teal-400/50 hover:bg-emerald-900/50"
                >
                  <p className="font-display font-bold text-teal-300">{topic.title}</p>
                  <p className="mt-1 opacity-80">{topic.suggestedQuestion}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
