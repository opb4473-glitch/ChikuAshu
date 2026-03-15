'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ImageIcon, RefreshCw, LogOut, Sparkles } from 'lucide-react';

// Header avatars (DPs) – use your original images
const HEADER_AVATAR_ASHU = '/boy.jpg';
const HEADER_AVATAR_CHIKU = '/girl.jpg';

// Chat-side avatars – use the "-chat" variants
const CHAT_AVATAR_ASHU = '/chat-ashu.jpg';
const CHAT_AVATAR_CHIKU = '/chat-chiku.jpg';

interface Message {
    _id: string;
    sender: string;
    content: string;
    image?: string;
    createdAt: string;
}

// ─────────────────────────────────────────────
// FloatingShapes — ambient background blobs
// ─────────────────────────────────────────────
const FloatingShapes = ({ isDark }: { isDark: boolean }) => (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <motion.div
            animate={{ y: [0, -22, 0], opacity: [0.3, 0.55, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
                position: 'absolute', top: '8%', left: '8%',
                width: 220, height: 220, borderRadius: '50%',
                background: isDark ? 'rgba(180,120,240,0.15)' : 'rgba(220,180,255,0.35)',
                filter: 'blur(55px)',
            }}
        />
        <motion.div
            animate={{ y: [0, 18, 0], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            style={{
                position: 'absolute', bottom: '12%', right: '10%',
                width: 280, height: 280, borderRadius: '50%',
                background: isDark ? 'rgba(100,160,240,0.12)' : 'rgba(180,210,255,0.38)',
                filter: 'blur(60px)',
            }}
        />
        <motion.div
            animate={{ y: [0, -12, 0], x: [0, 10, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            style={{
                position: 'absolute', top: '45%', right: '28%',
                width: 160, height: 160, borderRadius: '50%',
                background: isDark ? 'rgba(220,140,180,0.1)' : 'rgba(255,200,220,0.3)',
                filter: 'blur(40px)',
            }}
        />
        {[
            { top: '12%', left: '4%', delay: 0 },
            { top: '35%', right: '4%', delay: 1.3 },
            { bottom: '28%', left: '3%', delay: 2.1 },
        ].map((pos, i) => (
            <motion.span
                key={i}
                animate={{ opacity: [0.15, 0.7, 0.15], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: pos.delay }}
                style={{ position: 'absolute', fontSize: 14, color: isDark ? 'rgba(200,170,255,0.6)' : 'rgba(160,120,200,0.6)', userSelect: 'none', ...pos } as React.CSSProperties}
            >
                ✦
            </motion.span>
        ))}
    </div>
);

// ─────────────────────────────────────────────
// Avatar — real image with emoji fallback
// ─────────────────────────────────────────────
const Avatar = ({ user, size = 36, isDark }: { user: string; size?: number; isDark: boolean }) => {
    const [imgError, setImgError] = useState(false);
    // This Avatar is used for chat bubbles → use chat-specific avatars
    const src = user === 'ashu' ? CHAT_AVATAR_ASHU : CHAT_AVATAR_CHIKU;
    const fallback = user === 'ashu' ? '🌟' : '🌙';

    return (
        <div style={{
            width: size, height: size, borderRadius: '50%',
            overflow: 'hidden', flexShrink: 0,
            border: `2px solid ${isDark ? 'rgba(180,140,230,0.35)' : 'rgba(200,170,240,0.6)'}`,
            background: isDark ? 'rgba(55,30,90,0.7)' : 'rgba(240,230,255,0.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 2px 10px ${isDark ? 'rgba(0,0,0,0.35)' : 'rgba(180,150,220,0.2)'}`,
        }}>
            {!imgError ? (
                <img
                    src={src}
                    alt={user}
                    onError={() => setImgError(true)}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            ) : (
                <span style={{ fontSize: size * 0.44 }}>{fallback}</span>
            )}
        </div>
    );
};

// ─────────────────────────────────────────────
// ChatBubble — avatar always shown AFTER bubble
// "mine"  → bubble LEFT of avatar (avatar on right)
// "theirs"→ avatar LEFT of bubble
// ─────────────────────────────────────────────
const ChatBubble = ({ msg, isMe, isDark }: { msg: Message; isMe: boolean; isDark: boolean }) => {
    const senderLabel = msg.sender === 'ashu' ? 'Ashu' : 'Chiku';

    return (
        <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ type: 'spring', stiffness: 380, damping: 26 }}
            style={{
                display: 'flex',
                justifyContent: isMe ? 'flex-end' : 'flex-start',
                width: '100%',
                marginBottom: 14,
            }}
        >
            <div style={{
                display: 'flex',
                flexDirection: isMe ? 'row-reverse' : 'row',
                alignItems: 'flex-end',
                gap: 8,
                maxWidth: '78%',
            }}>
                {/* Avatar — always on the OUTER side (after bubble for me, before for them) */}
                <Avatar user={msg.sender} isDark={isDark} />

                {/* Column: sender label + bubble + timestamp */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start' }}>
                    <span style={{
                        fontSize: 10, fontWeight: 800, letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: isDark ? 'rgba(200,170,255,0.6)' : 'rgba(125,85,165,0.7)',
                        marginBottom: 4,
                        paddingLeft: isMe ? 0 : 4,
                        paddingRight: isMe ? 4 : 0,
                    }}>
                        {senderLabel}
                    </span>

                    <div style={{
                        padding: msg.image ? '6px' : '10px 16px',
                        borderRadius: 22,
                        borderBottomRightRadius: isMe ? 6 : 22,
                        borderBottomLeftRadius: isMe ? 22 : 6,
                        background: isMe
                            ? (isDark
                                ? 'linear-gradient(135deg, #9b5de5 0%, #c77dff 55%, #7b9ff5 100%)'
                                : 'linear-gradient(135deg, #b06ad4 0%, #8b5cf6 55%, #6b9ff5 100%)')
                            : (isDark ? 'rgba(42,24,72,0.88)' : 'rgba(255,255,255,0.88)'),
                        border: isMe ? 'none' : `1.5px solid ${isDark ? 'rgba(170,130,230,0.25)' : 'rgba(200,170,230,0.5)'}`,
                        boxShadow: isMe
                            ? `0 4px 18px ${isDark ? 'rgba(155,93,229,0.4)' : 'rgba(140,100,240,0.3)'}`
                            : `0 3px 12px ${isDark ? 'rgba(0,0,0,0.25)' : 'rgba(180,150,220,0.14)'}`,
                        backdropFilter: 'blur(12px)',
                        maxWidth: '100%',
                    }}>
                        {msg.image && (
                            <img
                                src={msg.image}
                                alt="Shared"
                                style={{ maxWidth: '100%', maxHeight: 240, borderRadius: 16, display: 'block' }}
                            />
                        )}
                        {msg.content && msg.content !== '(Shared an image)' && (
                            <p style={{
                                fontSize: 15, fontWeight: 600, lineHeight: 1.5, margin: 0,
                                color: isMe ? 'rgba(255,255,255,0.97)' : (isDark ? 'rgba(235,220,255,0.95)' : 'rgba(55,25,85,0.92)'),
                            }}>
                                {msg.content}
                            </p>
                        )}
                    </div>

                    <span style={{
                        fontSize: 9.5, fontWeight: 700, marginTop: 4,
                        color: isDark ? 'rgba(180,150,220,0.45)' : 'rgba(155,125,190,0.55)',
                        paddingLeft: isMe ? 0 : 4,
                        paddingRight: isMe ? 4 : 0,
                    }}>
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

// ─────────────────────────────────────────────
// Main Chat Page
// ─────────────────────────────────────────────
export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentUser, setCurrentUser] = useState('');
    const [input, setInput] = useState('');
    const [sending, setSending] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const isDark = theme === 'dark';

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('/api/auth/check');
                if (res.ok) {
                    const data = await res.json();
                    setCurrentUser(data.username);
                    await loadMessages();
                } else {
                    router.push('/');
                }
            } catch {
                router.push('/');
            } finally {
                setPageLoading(false);
            }
        };

        checkAuth();
    }, [router]);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const loadMessages = async () => {
        try {
            const res = await fetch('/api/messages');
            if (res.ok) {
                const data = await res.json();
                setMessages(data.messages || []);
            }
        } catch (e) { console.error(e); }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await loadMessages();
        setTimeout(() => setRefreshing(false), 600);
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() && !imagePreview) return;
        setSending(true);
        try {
            const res = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: input || '(Shared an image)', image: imagePreview }),
            });
            if (res.ok) { setInput(''); setImagePreview(null); await loadMessages(); }
        } catch (e) { console.error(e); }
        finally { setSending(false); }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result as string);
        reader.readAsDataURL(file);
    };

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/');
    };

    const otherUser = currentUser === 'ashu' ? 'Chiku' : 'Ashu';

    if (!mounted) return null;

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Pacifico&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .chat-root {
          height: 100svh; display: flex; flex-direction: column;
          font-family: 'Nunito', sans-serif; overflow: hidden;
          background: ${isDark
                    ? 'linear-gradient(160deg, #150e24 0%, #1c1230 45%, #161628 100%)'
                    : 'linear-gradient(160deg, #fdf0f8 0%, #f5e8ff 35%, #e8eeff 70%, #e8f5ff 100%)'};
        }
        .messages-scroll {
          flex: 1; overflow-y: auto;
          padding: 1.1rem 1rem; position: relative; z-index: 1;
        }
        .messages-scroll::-webkit-scrollbar { width: 3px; }
        .messages-scroll::-webkit-scrollbar-thumb {
          background: ${isDark ? 'rgba(170,130,230,0.3)' : 'rgba(190,160,230,0.4)'};
          border-radius: 3px;
        }
        .msg-input {
          flex: 1; background: transparent; border: none; outline: none;
          font-family: 'Nunito', sans-serif; font-size: 15px; font-weight: 600;
          color: ${isDark ? '#f0e6ff' : '#3d1f60'}; min-width: 0;
        }
        .msg-input::placeholder { color: ${isDark ? 'rgba(180,150,220,0.38)' : 'rgba(170,140,200,0.5)'}; font-weight: 500; }
        .icon-btn {
          width: 38px; height: 38px; border-radius: 50%;
          border: 1.5px solid ${isDark ? 'rgba(170,130,230,0.28)' : 'rgba(200,170,230,0.5)'};
          background: ${isDark ? 'rgba(50,28,82,0.6)' : 'rgba(248,240,255,0.75)'};
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          color: ${isDark ? 'rgba(200,170,250,0.75)' : 'rgba(140,100,190,0.8)'}; flex-shrink: 0;
        }
        .send-btn {
          width: 42px; height: 42px; border-radius: 50%; border: none; cursor: pointer;
          background: ${isDark
                    ? 'linear-gradient(135deg, #9b5de5, #c77dff)'
                    : 'linear-gradient(135deg, #b06ad4, #8b5cf6)'};
          display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0;
          box-shadow: 0 4px 16px ${isDark ? 'rgba(155,93,229,0.5)' : 'rgba(140,100,240,0.4)'};
        }
        .send-btn:disabled { opacity: 0.45; cursor: not-allowed; }
      `}</style>

            <div className="chat-root">
                <FloatingShapes isDark={isDark} />

                {/* ── HEADER ── */}
                <motion.header
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        position: 'relative', zIndex: 10,
                        padding: '0.85rem 1.1rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        background: isDark ? 'rgba(28,18,50,0.82)' : 'rgba(255,255,255,0.72)',
                        backdropFilter: 'blur(24px)',
                        borderBottom: `1.5px solid ${isDark ? 'rgba(170,130,230,0.18)' : 'rgba(210,175,240,0.45)'}`,
                        boxShadow: `0 2px 24px ${isDark ? 'rgba(0,0,0,0.3)' : 'rgba(170,140,220,0.1)'}`,
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        {/* Stacked avatars in header – use header DPs */}
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ zIndex: 2, position: 'relative' }}>
                                <img
                                    src={HEADER_AVATAR_CHIKU}
                                    alt="Chiku"
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        border: `3px solid ${isDark ? 'rgba(200,170,255,0.6)' : 'rgba(200,150,230,0.85)'}`,
                                        boxShadow: isDark
                                            ? '0 4px 18px rgba(0,0,0,0.55)'
                                            : '0 4px 18px rgba(160,130,210,0.65)',
                                    }}
                                />
                            </div>
                            <div style={{ marginLeft: -10, zIndex: 1, position: 'relative' }}>
                                <img
                                    src={HEADER_AVATAR_ASHU}
                                    alt="Ashu"
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        border: `3px solid ${isDark ? 'rgba(200,170,255,0.45)' : 'rgba(195,155,225,0.8)'}`,
                                        boxShadow: isDark
                                            ? '0 4px 16px rgba(0,0,0,0.5)'
                                            : '0 4px 16px rgba(160,130,210,0.55)',
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <div
                                key={isDark ? 'dark' : 'light'} // forces React to recreate the div
                                style={{
                                    fontFamily: "'Pacifico', cursive",
                                    fontSize: '1.22rem',
                                    lineHeight: 1,
                                    display: 'inline-block',
                                    background: isDark
                                        ? 'linear-gradient(135deg, #f2ccff 0%, #d8b8ff 45%, #b8d8ff 100%)'
                                        : 'linear-gradient(135deg, #9b30c0 0%, #7c3aed 50%, #4a6fd6 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}
                            >
                                Our Space
                            </div>
                            <div style={{
                                fontSize: 11, fontWeight: 700, marginTop: 2,
                                color: isDark ? 'rgba(200,170,240,0.5)' : 'rgba(140,100,180,0.65)',
                                letterSpacing: '0.03em',
                            }}>
                                Chatting as{' '}
                                <span style={{ color: isDark ? 'rgba(210,180,255,0.9)' : 'rgba(125,75,175,0.9)' }}>
                                    {currentUser === 'ashu' ? 'Ashu' : 'Chiku'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <motion.button className="icon-btn" onClick={handleRefresh} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} aria-label="Refresh">
                            <RefreshCw size={15} style={{ animation: refreshing ? 'spin 0.5s linear' : 'none' }} />
                        </motion.button>
                        <motion.button className="icon-btn" onClick={() => setTheme(isDark ? 'light' : 'dark')} whileHover={{ rotate: 20, scale: 1.1 }} whileTap={{ scale: 0.9 }} aria-label="Toggle theme" style={{ fontSize: 15, border: 'none' }}>
                            {isDark ? '☀️' : '🌙'}
                        </motion.button>
                        <motion.button className="icon-btn" onClick={handleLogout} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} aria-label="Logout">
                            <LogOut size={14} />
                        </motion.button>
                    </div>
                </motion.header>

                {/* ── MESSAGES ── */}
                <div className="messages-scroll">
                    {pageLoading ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 10 }}>
                            <motion.div animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 1.4, repeat: Infinity }}>
                                <Sparkles size={28} style={{ color: isDark ? 'rgba(200,160,255,0.5)' : 'rgba(160,110,220,0.5)' }} />
                            </motion.div>
                            <span style={{ fontSize: 14, fontWeight: 600, color: isDark ? 'rgba(200,170,240,0.5)' : 'rgba(140,100,180,0.55)' }}>
                                Fetching our memories...
                            </span>
                        </div>
                    ) : messages.length === 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 12, padding: '4rem 2rem' }}>
                            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                                <span style={{ fontSize: 52, opacity: 0.35 }}>💕</span>
                            </motion.div>
                            <p style={{ fontFamily: "'Pacifico', cursive", fontSize: 20, color: isDark ? 'rgba(200,170,240,0.5)' : 'rgba(140,100,180,0.55)' }}>
                                Say something sweet...
                            </p>
                            <p style={{ fontSize: 13, fontWeight: 600, color: isDark ? 'rgba(180,150,220,0.38)' : 'rgba(160,130,190,0.5)' }}>
                                Start your conversation with {otherUser} ✨
                            </p>
                        </div>
                    ) : (
                        <AnimatePresence>
                            {messages.map((msg) => (
                                <ChatBubble key={msg._id} msg={msg} isMe={msg.sender === currentUser} isDark={isDark} />
                            ))}
                        </AnimatePresence>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* ── INPUT AREA ── */}
                <motion.footer
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    style={{
                        position: 'relative', zIndex: 10,
                        padding: '0.8rem 1rem',
                        background: isDark
                            ? 'linear-gradient(to top, rgba(20,12,38,0.96), rgba(20,12,38,0.7))'
                            : 'linear-gradient(to top, rgba(248,242,255,0.98), rgba(248,242,255,0.6))',
                        borderTop: `1.5px solid ${isDark ? 'rgba(170,130,230,0.18)' : 'rgba(210,175,240,0.4)'}`,
                    }}
                >
                    <AnimatePresence>
                        {imagePreview && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                style={{ marginBottom: 10, position: 'relative', display: 'inline-block' }}
                            >
                                <img src={imagePreview} alt="Preview" style={{
                                    maxHeight: 88, borderRadius: 14, display: 'block',
                                    border: `2px solid ${isDark ? 'rgba(170,130,230,0.4)' : 'rgba(190,150,230,0.5)'}`,
                                }} />
                                <motion.button
                                    whileHover={{ scale: 1.15, rotate: 10 }}
                                    onClick={() => setImagePreview(null)}
                                    style={{
                                        position: 'absolute', top: -8, right: -8,
                                        width: 22, height: 22, borderRadius: '50%',
                                        background: isDark ? 'linear-gradient(135deg,#9b5de5,#c77dff)' : 'linear-gradient(135deg,#b06ad4,#8b5cf6)',
                                        border: 'none', color: 'white', fontSize: 10, fontWeight: 900,
                                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}
                                >✕</motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form
                        onSubmit={handleSend}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            padding: '8px 10px',
                            background: isDark ? 'rgba(42,22,75,0.75)' : 'rgba(255,255,255,0.82)',
                            backdropFilter: 'blur(16px)', borderRadius: 28,
                            border: `1.5px solid ${isDark ? 'rgba(155,110,220,0.3)' : 'rgba(195,160,230,0.5)'}`,
                            boxShadow: `0 4px 20px ${isDark ? 'rgba(0,0,0,0.25)' : 'rgba(180,150,220,0.15)'}`,
                        }}
                    >
                        <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*,.gif" style={{ display: 'none' }} />

                        <motion.button
                            type="button"
                            className="icon-btn"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={sending}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            style={{ border: 'none', background: 'transparent', width: 36, height: 36 }}
                        >
                            <ImageIcon size={18} />
                        </motion.button>

                        <input
                            type="text"
                            className="msg-input"
                            placeholder={`Write to ${otherUser}... 💌`}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={sending}
                            autoComplete="off"
                        />

                        <motion.button
                            type="submit"
                            className="send-btn"
                            disabled={sending || (!input.trim() && !imagePreview)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.94 }}
                        >
                            {sending ? (
                                <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                                    {[0, 1, 2].map(i => (
                                        <motion.div
                                            key={i}
                                            animate={{ y: [0, -4, 0] }}
                                            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                                            style={{ width: 4, height: 4, borderRadius: '50%', background: 'white' }}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <Send size={16} />
                            )}
                        </motion.button>
                    </form>
                </motion.footer>
            </div>

            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </>
    );
}