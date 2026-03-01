'use client';

import { createContext, useContext, useState, useCallback, useRef } from 'react';

type Message = { role: 'user' | 'assistant'; content: string };

interface AdvisorState {
  messages: Message[];
  isOpen: boolean;
  isMinimized: boolean;
  loading: boolean;
  hasNew: boolean;
  open: () => void;
  close: () => void;
  minimize: () => void;
  expand: () => void;
  send: (text: string) => Promise<void>;
  clearNew: () => void;
}

const AdvisorContext = createContext<AdvisorState | null>(null);

export function useAdvisor() {
  const ctx = useContext(AdvisorContext);
  if (!ctx) throw new Error('useAdvisor must be used inside AdvisorProvider');
  return ctx;
}

export function AdvisorProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Welcome to the Archevia™ Research Advisor. I can help you explore our formulations, understand ingredients and pathways, or build a personalised suggestion based on your health goals.\n\nWhat would you like to know?",
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasNew, setHasNew] = useState(false);
  const messagesRef = useRef(messages);
  messagesRef.current = messages;
  const minimizedRef = useRef(isMinimized);
  minimizedRef.current = isMinimized;

  const open = useCallback(() => {
    setIsOpen(true);
    setIsMinimized(false);
    setHasNew(false);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setIsMinimized(false);
  }, []);

  const minimize = useCallback(() => {
    setIsMinimized(true);
  }, []);

  const expand = useCallback(() => {
    setIsMinimized(false);
    setHasNew(false);
  }, []);

  const clearNew = useCallback(() => setHasNew(false), []);

  const send = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: text.trim() };
    const updated = [...messagesRef.current, userMsg];
    setMessages(updated);
    setLoading(true);

    try {
      const res = await fetch('/api/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updated.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.reply ?? 'I apologise — please try again.';
      const clean = reply.replace(/```cart\n?[\s\S]*?\n?```/g, '').trim();
      setMessages((prev) => [...prev, { role: 'assistant', content: clean }]);
      if (minimizedRef.current) setHasNew(true);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Connection error — please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  return (
    <AdvisorContext.Provider
      value={{ messages, isOpen, isMinimized, loading, hasNew, open, close, minimize, expand, send, clearNew }}
    >
      {children}
    </AdvisorContext.Provider>
  );
}
