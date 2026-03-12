'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2, Bot, ChevronDown } from 'lucide-react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const INITIAL_MESSAGE: Message = {
    role: 'assistant',
    content: "Hello! I'm **SIDA**, the SIDOSEA Logistics AI Assistant. I can help you with information about our crude oil supply services, compliance framework, and engagement process.\n\nHow can I assist you today?"
};

function formatMessage(text: string) {
    // Basic markdown: bold and line breaks
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n\n/g, '</p><p class="mt-2">')
        .replace(/\n/g, '<br />');
}

export default function ChatAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
            inputRef.current?.focus();
        }
    }, [isOpen, messages]);

    const handleSend = async () => {
        const trimmed = input.trim();
        if (!trimmed || loading) return;

        const userMessage: Message = { role: 'user', content: trimmed };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: updatedMessages }),
            });
            const data = await res.json();
            setMessages([...updatedMessages, {
                role: 'assistant',
                content: data.content || data.error || 'Sorry, I could not process your request.'
            }]);
        } catch {
            setMessages([...updatedMessages, {
                role: 'assistant',
                content: 'I\'m having trouble connecting right now. Please try again shortly.'
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const SUGGESTED = ["What services do you offer?", "How do I request crude supply?", "Where are your offices?"];

    return (
        <>
            {/* Floating Action Button */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="bg-brand-navy/90 text-white text-xs px-3 py-1.5 rounded-full font-medium tracking-wide shadow-lg backdrop-blur-sm border border-white/10"
                        >
                            Ask SIDA
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative w-14 h-14 rounded-full bg-brand-orange shadow-2xl shadow-brand-orange/40 flex items-center justify-center text-white transition-all"
                    aria-label="Open AI Assistant"
                >
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                <X size={22} />
                            </motion.div>
                        ) : (
                            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                <Bot size={22} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {/* Pulse ring */}
                    {!isOpen && (
                        <span className="absolute inset-0 rounded-full animate-ping bg-brand-orange/30" />
                    )}
                </motion.button>
            </div>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[390px] max-h-[75vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                        style={{ background: 'rgba(10, 25, 60, 0.95)', backdropFilter: 'blur(20px)' }}
                    >
                        {/* Header */}
                        <div className="flex items-center gap-3 p-4 border-b border-white/10 flex-shrink-0">
                            <div className="w-9 h-9 rounded-full bg-brand-orange/20 border border-brand-orange/40 flex items-center justify-center">
                                <Bot size={18} className="text-brand-orange" />
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm tracking-wide">SIDA</p>
                                <p className="text-white/40 text-[10px] uppercase tracking-widest">SIDOSEA AI Assistant</p>
                            </div>
                            <div className="ml-auto flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                <span className="text-green-400 text-[10px] font-medium">Online</span>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                                >
                                    {msg.role === 'assistant' && (
                                        <div className="w-7 h-7 rounded-full bg-brand-orange/20 border border-brand-orange/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Bot size={13} className="text-brand-orange" />
                                        </div>
                                    )}
                                    <div
                                        className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                                            msg.role === 'user'
                                                ? 'bg-brand-orange text-white rounded-tr-sm'
                                                : 'bg-white/10 text-white/90 rounded-tl-sm'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: `<p>${formatMessage(msg.content)}</p>` }}
                                    />
                                </motion.div>
                            ))}

                            {loading && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2.5">
                                    <div className="w-7 h-7 rounded-full bg-brand-orange/20 border border-brand-orange/30 flex items-center justify-center flex-shrink-0">
                                        <Bot size={13} className="text-brand-orange" />
                                    </div>
                                    <div className="bg-white/10 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </motion.div>
                            )}

                            {/* Suggested questions (only at start) */}
                            {messages.length === 1 && !loading && (
                                <div className="pt-2 flex flex-col gap-2">
                                    {SUGGESTED.map((q) => (
                                        <button
                                            key={q}
                                            onClick={() => { setInput(q); inputRef.current?.focus(); }}
                                            className="text-left text-[11px] text-white/60 bg-white/5 px-3 py-2 rounded-xl border border-white/10 hover:border-brand-orange/50 hover:text-white/90 hover:bg-brand-orange/10 transition-all"
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-3 border-t border-white/10 flex items-end gap-2 flex-shrink-0">
                            <textarea
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask about SIDOSEA services..."
                                rows={1}
                                disabled={loading}
                                className="flex-1 bg-white/10 text-white placeholder-white/30 text-xs rounded-xl px-3 py-2.5 resize-none outline-none border border-white/10 focus:border-brand-orange/60 transition-colors max-h-24 leading-relaxed"
                                style={{ minHeight: '40px' }}
                            />
                            <motion.button
                                onClick={handleSend}
                                disabled={!input.trim() || loading}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-10 h-10 bg-brand-orange rounded-xl flex items-center justify-center flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity shadow-lg shadow-brand-orange/30"
                            >
                                <Send size={15} className="text-white" />
                            </motion.button>
                        </div>
                        <p className="text-center text-white/20 text-[9px] pb-2.5 tracking-wider font-medium">Powered by SIDOSEA AI · Confidential</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
