'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

interface Message {
    _id: string;
    sender: string;
    content: string;
    image?: string;
    createdAt: string;
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentUser, setCurrentUser] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { theme, setTheme } = useTheme();

    const isDark = theme === 'dark';

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('/api/auth/check', { method: 'GET' });
                if (response.ok) {
                    const data = await response.json();
                    setCurrentUser(data.username);
                    await loadMessages();
                } else {
                    router.push('/');
                }
            } catch {
                router.push('/');
            }
        };
        checkAuth();
    }, [router]);

    const loadMessages = async () => {
        try {
            const response = await fetch('/api/messages');
            if (response.ok) {
                const data = await response.json();
                setMessages(data.messages || []);
                setTimeout(() => {
                    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        } catch (error) {
            console.error('Failed to load messages:', error);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() && !imagePreview) return;
        setLoading(true);
        try {
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: newMessage || '(Shared an image)',
                    image: imagePreview,
                }),
            });
            if (response.ok) {
                setNewMessage('');
                setImagePreview(null);
                await loadMessages();
            }
        } catch (error) {
            console.error('Failed to send message:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/');
    };

    if (!mounted) return null;

    const otherUser = currentUser === 'ashu' ? 'Chiku' : 'Ashu';
    const userEmoji = currentUser === 'ashu' ? '🌟' : '🌙';
    const otherEmoji = currentUser === 'ashu' ? '🌙' : '🌟';

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Pacifico&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .chat-root {
          height: 100vh;
          display: flex;
          flex-direction: column;
          font-family: 'Nunito', sans-serif;
          position: relative;
          overflow: hidden;
          background: ${isDark
                    ? 'linear-gradient(160deg, #1a1028 0%, #201530 40%, #1a1a2e 100%)'
                    : 'linear-gradient(160deg, #fdf0f8 0%, #fce8f5 30%, #ede8ff 65%, #e8f4ff 100%)'};
        }

        /* Blobs */
        .chat-blob {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          animation: floatBlob 9s ease-in-out infinite;
          z-index: 0;
        }
        .chat-blob-1 {
          width: 400px; height: 400px;
          top: -100px; right: -80px;
          background: ${isDark ? 'rgba(180,120,220,0.1)' : 'rgba(230,170,230,0.28)'};
          animation-delay: 0s;
        }
        .chat-blob-2 {
          width: 300px; height: 300px;
          bottom: -80px; left: -60px;
          background: ${isDark ? 'rgba(100,150,220,0.1)' : 'rgba(180,200,255,0.3)'};
          animation-delay: -4s;
        }
        @keyframes floatBlob {
          0%,100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.04); }
        }

        /* ── HEADER ── */
        .chat-header {
          position: relative;
          z-index: 10;
          background: ${isDark
                    ? 'rgba(35,25,55,0.85)'
                    : 'rgba(255,255,255,0.75)'};
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1.5px solid ${isDark ? 'rgba(180,140,220,0.2)' : 'rgba(210,180,240,0.5)'};
          padding: 0.85rem 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 2px 20px ${isDark ? 'rgba(0,0,0,0.3)' : 'rgba(180,150,220,0.12)'};
        }

        .header-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .header-hearts {
          display: flex;
          align-items: center;
          gap: 2px;
          animation: heartbeat 2.4s ease-in-out infinite;
        }
        @keyframes heartbeat {
          0%,100% { transform: scale(1); }
          14% { transform: scale(1.2); }
          28% { transform: scale(1); }
          42% { transform: scale(1.12); }
          56% { transform: scale(1); }
        }

        .header-title {
          font-family: 'Pacifico', cursive;
          font-size: 1.3rem;
          background: ${isDark
                    ? 'linear-gradient(135deg, #e8b4f8 0%, #c4a0f4 50%, #a0c4ff 100%)'
                    : 'linear-gradient(135deg, #c06ac0 0%, #9b6bda 50%, #6b9ff5 100%)'};
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }

        .header-sub {
          font-size: 0.72rem;
          font-weight: 700;
          color: ${isDark ? 'rgba(200,170,240,0.55)' : 'rgba(150,110,180,0.7)'};
          letter-spacing: 0.04em;
          margin-top: 1px;
        }

        .header-user-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          border-radius: 20px;
          background: ${isDark ? 'rgba(60,35,100,0.6)' : 'rgba(240,230,255,0.8)'};
          border: 1.5px solid ${isDark ? 'rgba(170,130,230,0.3)' : 'rgba(190,160,230,0.5)'};
          font-size: 0.82rem;
          font-weight: 700;
          color: ${isDark ? 'rgba(220,190,255,0.9)' : 'rgba(120,80,170,0.9)'};
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .icon-btn {
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 1.5px solid ${isDark ? 'rgba(170,130,230,0.3)' : 'rgba(200,170,230,0.55)'};
          background: ${isDark ? 'rgba(50,30,80,0.6)' : 'rgba(255,255,255,0.7)'};
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 15px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          backdrop-filter: blur(8px);
        }
        .icon-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 3px 12px ${isDark ? 'rgba(170,130,230,0.3)' : 'rgba(180,140,220,0.3)'};
        }
        .icon-btn.theme-btn:hover { transform: rotate(20deg) scale(1.1); }

        /* ── MESSAGES AREA ── */
        .messages-area {
          flex: 1;
          overflow-y: auto;
          position: relative;
          z-index: 1;
          padding: 1.25rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .messages-area::-webkit-scrollbar { width: 4px; }
        .messages-area::-webkit-scrollbar-track { background: transparent; }
        .messages-area::-webkit-scrollbar-thumb {
          background: ${isDark ? 'rgba(170,130,230,0.3)' : 'rgba(190,160,230,0.4)'};
          border-radius: 4px;
        }

        /* Empty state */
        .empty-state {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 4rem 2rem;
          animation: fadeIn 0.6s ease both;
        }
        .empty-icon {
          font-size: 4rem;
          animation: heartbeat 2.4s ease-in-out infinite;
          opacity: 0.4;
        }
        .empty-text {
          font-size: 1.05rem;
          font-weight: 700;
          color: ${isDark ? 'rgba(200,170,240,0.5)' : 'rgba(150,110,180,0.55)'};
        }
        .empty-sub {
          font-size: 0.82rem;
          font-weight: 600;
          color: ${isDark ? 'rgba(180,150,220,0.35)' : 'rgba(170,140,200,0.45)'};
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Message row */
        .msg-row {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          animation: msgPop 0.3s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        .msg-row.mine { justify-content: flex-end; }
        .msg-row.theirs { justify-content: flex-start; }
        @keyframes msgPop {
          from { opacity: 0; transform: scale(0.92) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* Avatar */
        .avatar {
          width: 30px; height: 30px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px;
          flex-shrink: 0;
          border: 1.5px solid ${isDark ? 'rgba(170,130,230,0.3)' : 'rgba(200,170,230,0.5)'};
          background: ${isDark ? 'rgba(60,35,100,0.6)' : 'rgba(245,235,255,0.9)'};
        }

        /* Bubble */
        .bubble {
          max-width: min(72%, 380px);
          padding: 0.65rem 0.95rem;
          border-radius: 20px;
          position: relative;
          word-break: break-word;
        }
        .bubble.mine {
          background: ${isDark
                    ? 'linear-gradient(135deg, #9b5de5 0%, #c77dff 60%, #7b9ff5 100%)'
                    : 'linear-gradient(135deg, #b06ad4 0%, #8b5cf6 55%, #6b9ff5 100%)'};
          border-bottom-right-radius: 6px;
          box-shadow: 0 4px 14px ${isDark ? 'rgba(155,93,229,0.4)' : 'rgba(140,100,240,0.3)'};
        }
        .bubble.theirs {
          background: ${isDark ? 'rgba(45,28,75,0.85)' : 'rgba(255,255,255,0.9)'};
          border: 1.5px solid ${isDark ? 'rgba(170,130,230,0.25)' : 'rgba(200,170,230,0.55)'};
          border-bottom-left-radius: 6px;
          box-shadow: 0 3px 12px ${isDark ? 'rgba(0,0,0,0.25)' : 'rgba(180,150,220,0.15)'};
        }

        .bubble-sender {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.03em;
          margin-bottom: 3px;
          color: ${isDark ? 'rgba(200,170,255,0.75)' : 'rgba(140,100,190,0.85)'};
          text-transform: uppercase;
        }

        .bubble-text {
          font-size: 0.9rem;
          font-weight: 600;
          line-height: 1.45;
          color: ${isDark ? 'rgba(240,230,255,0.95)' : 'rgba(60,30,90,0.9)'};
        }
        .bubble.mine .bubble-text { color: rgba(255,255,255,0.97); }

        .bubble-img {
          max-width: 100%;
          max-height: 220px;
          object-fit: cover;
          border-radius: 12px;
          margin-bottom: 6px;
          display: block;
        }

        .bubble-time {
          font-size: 0.67rem;
          font-weight: 700;
          margin-top: 5px;
          letter-spacing: 0.02em;
        }
        .bubble.mine .bubble-time { color: rgba(255,255,255,0.55); text-align: right; }
        .bubble.theirs .bubble-time { color: ${isDark ? 'rgba(180,150,220,0.5)' : 'rgba(160,130,190,0.6)'}; }

        /* Date divider */
        .date-divider {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0.5rem 0;
        }
        .date-line {
          flex: 1;
          height: 1px;
          background: ${isDark ? 'rgba(170,130,230,0.15)' : 'rgba(200,170,230,0.3)'};
        }
        .date-label {
          font-size: 0.7rem;
          font-weight: 800;
          color: ${isDark ? 'rgba(180,150,220,0.45)' : 'rgba(160,130,190,0.55)'};
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* ── INPUT AREA ── */
        .input-area {
          position: relative;
          z-index: 10;
          background: ${isDark
                    ? 'rgba(30,20,50,0.9)'
                    : 'rgba(255,255,255,0.82)'};
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top: 1.5px solid ${isDark ? 'rgba(180,140,220,0.2)' : 'rgba(210,180,240,0.5)'};
          padding: 0.85rem 1rem;
          box-shadow: 0 -4px 20px ${isDark ? 'rgba(0,0,0,0.25)' : 'rgba(180,150,220,0.1)'};
        }

        .image-preview-wrap {
          position: relative;
          display: inline-block;
          margin-bottom: 10px;
        }
        .image-preview-wrap img {
          max-height: 90px;
          border-radius: 12px;
          display: block;
          border: 2px solid ${isDark ? 'rgba(170,130,230,0.4)' : 'rgba(190,150,230,0.5)'};
        }
        .remove-img-btn {
          position: absolute;
          top: -8px; right: -8px;
          width: 22px; height: 22px;
          border-radius: 50%;
          background: ${isDark
                    ? 'linear-gradient(135deg,#9b5de5,#c77dff)'
                    : 'linear-gradient(135deg,#b06ad4,#8b5cf6)'};
          border: none;
          color: white;
          font-size: 11px;
          font-weight: 800;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.2s ease;
        }
        .remove-img-btn:hover { transform: scale(1.15) rotate(10deg); }

        .input-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .attach-btn {
          width: 42px; height: 42px;
          border-radius: 50%;
          border: 2px solid ${isDark ? 'rgba(170,130,230,0.35)' : 'rgba(195,160,230,0.6)'};
          background: ${isDark ? 'rgba(55,30,90,0.6)' : 'rgba(245,235,255,0.8)'};
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 17px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          flex-shrink: 0;
        }
        .attach-btn:hover:not(:disabled) {
          transform: scale(1.1) rotate(-8deg);
          box-shadow: 0 4px 14px ${isDark ? 'rgba(155,93,229,0.35)' : 'rgba(140,100,240,0.28)'};
        }
        .attach-btn:disabled { opacity: 0.45; cursor: not-allowed; }

        .msg-input {
          flex: 1;
          padding: 0.65rem 1.1rem;
          border-radius: 22px;
          border: 2px solid ${isDark ? 'rgba(150,110,200,0.3)' : 'rgba(200,170,230,0.5)'};
          background: ${isDark ? 'rgba(50,28,82,0.55)' : 'rgba(248,242,255,0.85)'};
          color: ${isDark ? '#f0e6ff' : '#4a2d6e'};
          font-family: 'Nunito', sans-serif;
          font-size: 0.92rem;
          font-weight: 600;
          outline: none;
          transition: all 0.25s ease;
          min-width: 0;
        }
        .msg-input::placeholder {
          color: ${isDark ? 'rgba(180,150,220,0.4)' : 'rgba(170,140,200,0.55)'};
          font-weight: 500;
        }
        .msg-input:focus {
          border-color: ${isDark ? 'rgba(200,160,255,0.65)' : 'rgba(160,110,220,0.7)'};
          background: ${isDark ? 'rgba(60,35,95,0.7)' : 'rgba(255,250,255,0.97)'};
          box-shadow: 0 0 0 4px ${isDark ? 'rgba(180,140,255,0.1)' : 'rgba(190,150,240,0.12)'};
        }
        .msg-input:disabled { opacity: 0.55; }

        .send-btn {
          height: 42px;
          padding: 0 1.2rem;
          border: none;
          border-radius: 22px;
          cursor: pointer;
          font-family: 'Nunito', sans-serif;
          font-size: 0.88rem;
          font-weight: 800;
          letter-spacing: 0.02em;
          color: #fff;
          background: ${isDark
                    ? 'linear-gradient(135deg, #9b5de5 0%, #c77dff 55%, #7b9ff5 100%)'
                    : 'linear-gradient(135deg, #b06ad4 0%, #8b5cf6 55%, #6b9ff5 100%)'};
          transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
        }
        .send-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .send-btn:hover:not(:disabled) {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 6px 20px ${isDark ? 'rgba(155,93,229,0.5)' : 'rgba(140,100,240,0.4)'};
        }
        .send-btn:hover:not(:disabled)::before { opacity: 1; }
        .send-btn:active:not(:disabled) { transform: scale(0.97); }
        .send-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        /* Loading dots */
        .loading-dots { display: inline-flex; align-items: center; gap: 3px; }
        .loading-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: rgba(255,255,255,0.9);
          animation: dotBounce 1s ease-in-out infinite;
        }
        .loading-dot:nth-child(2) { animation-delay: 0.15s; }
        .loading-dot:nth-child(3) { animation-delay: 0.3s; }
        @keyframes dotBounce {
          0%,60%,100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }

        /* Sparkles */
        .sparkle {
          position: fixed;
          pointer-events: none;
          font-size: 14px;
          animation: twinkle 3.5s ease-in-out infinite;
          opacity: 0.45;
          z-index: 0;
          user-select: none;
        }
        @keyframes twinkle {
          0%,100% { opacity: 0.15; transform: scale(0.8); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }

        @media (max-width: 480px) {
          .header-user-pill span.pill-label { display: none; }
          .bubble { max-width: 85%; }
          .send-btn { padding: 0 0.9rem; font-size: 0.82rem; }
        }
      `}</style>

            <div className="chat-root">
                {/* Blobs */}
                <div className="chat-blob chat-blob-1" />
                <div className="chat-blob chat-blob-2" />

                {/* Sparkles */}
                <span className="sparkle" style={{ top: '15%', right: '4%', animationDelay: '0s' }}>✦</span>
                <span className="sparkle" style={{ top: '40%', left: '2%', animationDelay: '-1.4s' }}>✧</span>
                <span className="sparkle" style={{ bottom: '30%', right: '3%', animationDelay: '-2.6s' }}>✦</span>

                {/* ── HEADER ── */}
                <header className="chat-header">
                    <div className="header-brand">
                        {/* <div className="header-hearts">
                            <span style={{ fontSize: '20px' }}>🌸</span>
                            <span style={{ fontSize: '18px' }}>💕</span>
                            <span style={{ fontSize: '20px' }}>🌸</span>
                        </div> */}
                        <div>
                            <div className="header-title">Ashu & Chiku</div>
                            <div className="header-sub">✨ our little space ✨</div>
                        </div>
                    </div>

                    <div className="header-actions">
                        {currentUser && (
                            <div className="header-user-pill">
                                <span>{userEmoji}</span>
                                <span className="pill-label">{currentUser === 'ashu' ? 'Ashu' : 'Chiku'}</span>
                            </div>
                        )}
                        <button
                            className="icon-btn"
                            onClick={loadMessages}
                            title="Refresh"
                            aria-label="Refresh messages"
                        >
                            🔄
                        </button>
                        <button
                            className="icon-btn theme-btn"
                            onClick={() => setTheme(isDark ? 'light' : 'dark')}
                            aria-label="Toggle theme"
                        >
                            {isDark ? '☀️' : '🌙'}
                        </button>
                        <button
                            className="icon-btn"
                            onClick={handleLogout}
                            title="Logout"
                            aria-label="Logout"
                        >
                            🚪
                        </button>
                    </div>
                </header>

                {/* ── MESSAGES ── */}
                <div className="messages-area">
                    {messages.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">💕</div>
                            <p className="empty-text">No messages yet...</p>
                            <p className="empty-sub">Say something sweet 🌸</p>
                        </div>
                    ) : (
                        messages.map((message, index) => {
                            const isMe = message.sender === currentUser;
                            const senderLabel = message.sender === 'ashu' ? 'Ashu' : 'Chiku';
                            const senderEmoji = message.sender === 'ashu' ? '🌟' : '🌙';

                            // Date divider logic
                            const msgDate = new Date(message.createdAt).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
                            const prevDate = index > 0
                                ? new Date(messages[index - 1].createdAt).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })
                                : null;
                            const showDateDivider = msgDate !== prevDate;

                            return (
                                <div key={message._id}>
                                    {showDateDivider && (
                                        <div className="date-divider">
                                            <div className="date-line" />
                                            <span className="date-label">{msgDate}</span>
                                            <div className="date-line" />
                                        </div>
                                    )}
                                    <div className={`msg-row ${isMe ? 'mine' : 'theirs'}`} style={{ animationDelay: `${Math.min(index * 0.04, 0.3)}s` }}>
                                        {!isMe && (
                                            <div className="avatar">{senderEmoji}</div>
                                        )}
                                        <div className={`bubble ${isMe ? 'mine' : 'theirs'}`}>
                                            {!isMe && (
                                                <div className="bubble-sender">{senderLabel}</div>
                                            )}
                                            {message.image && (
                                                <img src={message.image} alt="Shared" className="bubble-img" />
                                            )}
                                            {message.content && message.content !== '(Shared an image)' && (
                                                <div className="bubble-text">{message.content}</div>
                                            )}
                                            <div className="bubble-time">
                                                {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                        {isMe && (
                                            <div className="avatar">{userEmoji}</div>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* ── INPUT AREA ── */}
                <div className="input-area">
                    {imagePreview && (
                        <div className="image-preview-wrap">
                            <img src={imagePreview} alt="Preview" />
                            <button className="remove-img-btn" onClick={() => setImagePreview(null)}>✕</button>
                        </div>
                    )}

                    <form onSubmit={handleSendMessage} className="input-row">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            accept="image/*,video/*,.gif"
                            style={{ display: 'none' }}
                        />

                        <button
                            type="button"
                            className="attach-btn"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={loading}
                            aria-label="Attach image"
                        >
                            📸
                        </button>

                        <input
                            type="text"
                            className="msg-input"
                            placeholder={`Message ${currentUser === 'ashu' ? 'Chiku' : 'Ashu'}... 💌`}
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            disabled={loading}
                            autoComplete="off"
                        />

                        <button
                            type="submit"
                            className="send-btn"
                            disabled={loading || (!newMessage.trim() && !imagePreview)}
                        >
                            {loading ? (
                                <span className="loading-dots">
                                    <span className="loading-dot" />
                                    <span className="loading-dot" />
                                    <span className="loading-dot" />
                                </span>
                            ) : (
                                '💌 Send'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}