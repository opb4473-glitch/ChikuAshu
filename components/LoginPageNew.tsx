'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

const AVATAR_ASHU = '/login-a.jpg';
const AVATAR_CHIKU = '/login-c.jpg';

export default function LoginPageNew() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Login failed');
        setLoading(false);
        return;
      }

      router.push('/chat');
    } catch {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Pacifico&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .login-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          font-family: 'Nunito', sans-serif;
          position: relative;
          overflow: hidden;
          background: ${isDark
          ? 'linear-gradient(135deg, #1a1028 0%, #201530 40%, #1a1a2e 100%)'
          : 'linear-gradient(135deg, #fdf0f8 0%, #fce8f5 30%, #ede8ff 65%, #e8f4ff 100%)'};
          transition: background 0.4s ease;
        }

        /* Floating blobs */
        .blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: floatBlob 8s ease-in-out infinite;
        }
        .blob-1 {
          width: 340px; height: 340px;
          top: -80px; right: -60px;
          background: ${isDark ? 'rgba(180,120,220,0.12)' : 'rgba(230,170,230,0.35)'};
          animation-delay: 0s;
        }
        .blob-2 {
          width: 260px; height: 260px;
          bottom: -50px; left: -50px;
          background: ${isDark ? 'rgba(100,150,220,0.12)' : 'rgba(180,200,255,0.4)'};
          animation-delay: -3s;
        }
        .blob-3 {
          width: 180px; height: 180px;
          top: 40%; left: 5%;
          background: ${isDark ? 'rgba(220,150,120,0.08)' : 'rgba(255,200,200,0.3)'};
          animation-delay: -5s;
        }
        @keyframes floatBlob {
          0%, 100% { transform: translateY(0px) scale(1); }
          33% { transform: translateY(-18px) scale(1.04); }
          66% { transform: translateY(10px) scale(0.97); }
        }

        /* Sparkles */
        .sparkle {
          position: absolute;
          pointer-events: none;
          font-size: 18px;
          animation: twinkle 3s ease-in-out infinite;
          opacity: 0.6;
          user-select: none;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8) rotate(-10deg); }
          50% { opacity: 0.8; transform: scale(1.2) rotate(10deg); }
        }

        /* Card */
        .card {
          position: relative;
          width: 100%;
          max-width: 420px;
          background: ${isDark
          ? 'rgba(35, 25, 55, 0.85)'
          : 'rgba(255, 255, 255, 0.78)'};
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 28px;
          padding: 2.5rem 2.2rem 2.2rem;
          border: 1.5px solid ${isDark ? 'rgba(180,140,220,0.25)' : 'rgba(210,180,240,0.6)'};
          box-shadow: ${isDark
          ? '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)'
          : '0 8px 40px rgba(180,150,220,0.18), 0 2px 8px rgba(180,150,220,0.12), inset 0 1px 0 rgba(255,255,255,0.9)'};
          animation: cardEntrance 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        @keyframes cardEntrance {
          from { opacity: 0; transform: translateY(28px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .theme-btn {
  position: absolute;
  top: -46px;
  right: 4px;
  border: 1px solid ${isDark
          ? 'rgba(180,140,220,0.18)'
          : 'rgba(200,170,230,0.35)'};
  width: 34px;
  height: 34px;

  border-radius: 50%;

  backdrop-filter: blur(6px);

  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 14px;
  opacity: 0.75;

  transition: transform 0.18s ease, opacity 0.18s ease, background 0.18s ease;
}

.theme-btn:hover {
  opacity: 1;
  transform: scale(1.05);
  background: ${isDark
          ? 'rgba(60,35,95,0.5)'
          : 'rgba(255,255,255,0.65)'};
}

        .couple-bg {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          overflow: hidden;
          border-radius: inherit;
          z-index: 0;
        }
          .couple-bg img {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 65%;
  height: 80%;
  object-fit: cover;
  object-position: top center;

  opacity: ${isDark ? '0.09' : '0.2'};
  filter: ${isDark ? 'grayscale(25%) blur(0.4px)' : 'grayscale(15%) blur(0.3px)'};

  /* multi-direction fade */
  -webkit-mask-image:
    linear-gradient(to bottom, transparent 0%, black 25%, black 100%),   /* strong top fade */
    linear-gradient(to top, transparent 0%, black 15%, black 100%),      /* light bottom fade */
    linear-gradient(to right, transparent 0%, black 20%, black 100%),    /* left fade */
    linear-gradient(to left, transparent 0%, black 20%, black 100%);     /* right fade */

  -webkit-mask-composite: intersect;
  mask-composite: intersect;
}
        /* Avatar row */
        .avatar-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin-bottom: 1.1rem;
          position: relative; z-index: 1;
          animation: iconBounce 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both;
        }
        .avatar-img {
          width: 64px; height: 64px;
          border-radius: 50%;
          object-fit: cover;
          border: 2.5px solid ${isDark ? 'rgba(200,160,255,0.5)' : 'rgba(200,170,240,0.8)'};
          box-shadow: 0 4px 18px ${isDark ? 'rgba(155,93,229,0.35)' : 'rgba(180,140,240,0.28)'};
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
          background: ${isDark ? 'rgba(55,30,90,0.7)' : 'rgba(240,230,255,0.9)'};
        }
        .avatar-img:hover { transform: scale(1.1) rotate(-4deg); }
        .avatar-img.right:hover { transform: scale(1.1) rotate(4deg); }
        .avatar-heart {
          font-size: 22px;
          animation: heartbeat 2.4s ease-in-out infinite;
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          14% { transform: scale(1.22); }
          28% { transform: scale(1); }
          42% { transform: scale(1.15); }
          56% { transform: scale(1); }
        }
        @keyframes iconBounce {
          from { opacity: 0; transform: scale(0.4) translateY(-10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* Title */
        .title {
          font-family: 'Pacifico', cursive;
          font-size: 1.75rem;
          text-align: center;
          display: inline-block;
          width: 100%;
          background: ${isDark
          ? 'linear-gradient(135deg, #f2ccff 0%, #d8b8ff 50%, #b8d8ff 100%)'
          : 'linear-gradient(135deg, #9b30c0 0%, #7c3aed 50%, #4a6fd6 100%)'};
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: ${isDark ? '#d8b8ff' : '#7c3aed'};
          margin-bottom: 0.35rem;
          line-height: 1.2;
          animation: titleSlide 0.7s ease 0.1s both;
          position: relative; z-index: 1;
        }
        @keyframes titleSlide {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .subtitle {
          text-align: center;
          font-size: 0.85rem;
          font-weight: 600;
          color: ${isDark ? 'rgba(200,170,240,0.7)' : 'rgba(150,110,180,0.8)'};
          margin-bottom: 2rem;
          letter-spacing: 0.03em;
          animation: titleSlide 0.7s ease 0.2s both;
          position: relative; z-index: 1;
        }

        /* Divider */
        .divider {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 1.5rem;
          position: relative; z-index: 1;
        }
        .divider-line {
          flex: 1;
          height: 1px;
          background: ${isDark ? 'rgba(180,140,220,0.2)' : 'rgba(200,170,230,0.4)'};
        }
        .divider-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: ${isDark ? 'rgba(180,140,220,0.4)' : 'rgba(190,150,220,0.5)'};
        }

        /* Form group */
        .form-group {
          margin-bottom: 1.1rem;
          animation: fieldSlide 0.6s ease both;
          position: relative; z-index: 1;
        }
        .form-group:nth-child(1) { animation-delay: 0.3s; }
        .form-group:nth-child(2) { animation-delay: 0.4s; }
        @keyframes fieldSlide {
          from { opacity: 0; transform: translateX(-12px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .field-label {
          display: block;
          font-size: 0.8rem;
          font-weight: 700;
          color: ${isDark ? 'rgba(210,180,250,0.9)' : 'rgba(130,90,170,0.9)'};
          margin-bottom: 0.45rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 14px;
          font-size: 15px;
          pointer-events: none;
          transition: transform 0.2s ease;
        }

        .field-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.6rem;
          border-radius: 16px;
          border: 2px solid ${isDark ? 'rgba(150,110,200,0.3)' : 'rgba(200,170,230,0.5)'};
          background: ${isDark ? 'rgba(50,30,80,0.5)' : 'rgba(250,245,255,0.8)'};
          color: ${isDark ? '#f0e6ff' : '#4a2d6e'};
          font-family: 'Nunito', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          outline: none;
          transition: all 0.25s ease;
        }
        .field-input::placeholder {
          color: ${isDark ? 'rgba(180,150,220,0.4)' : 'rgba(170,140,200,0.6)'};
          font-weight: 400;
        }
        .field-input:focus {
          border-color: ${isDark ? 'rgba(200,160,255,0.7)' : 'rgba(170,120,220,0.8)'};
          background: ${isDark ? 'rgba(60,35,95,0.7)' : 'rgba(255,250,255,0.95)'};
          box-shadow: 0 0 0 4px ${isDark ? 'rgba(180,140,255,0.12)' : 'rgba(190,150,240,0.14)'};
          transform: translateY(-1px);
        }

        /* Error */
        .error-box {
          margin-bottom: 1rem;
          padding: 0.75rem 1rem;
          border-radius: 14px;
          background: ${isDark ? 'rgba(220,80,100,0.15)' : 'rgba(255,100,120,0.08)'};
          border: 1.5px solid ${isDark ? 'rgba(220,80,100,0.35)' : 'rgba(220,100,120,0.3)'};
          color: ${isDark ? '#ffb3be' : '#c0354d'};
          font-size: 0.85rem;
          font-weight: 600;
          animation: shake 0.4s ease;
          position: relative; z-index: 1;
          display: flex;
          justify-content: center;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }

        /* Login button */
        .login-btn {
        position: relative;
        z-index: 1;
          width: 100%;
          padding: 0.85rem 1rem;
          border: none;
          border-radius: 16px;
          cursor: pointer;
          font-family: 'Nunito', sans-serif;
          font-size: 1rem;
          font-weight: 800;
          letter-spacing: 0.03em;
          color: #fff;
          background: ${isDark
          ? 'linear-gradient(135deg, #9b5de5 0%, #c77dff 50%, #7b9ff5 100%)'
          : 'linear-gradient(135deg, #b06ad4 0%, #8b5cf6 50%, #6b9ff5 100%)'};
          background-size: 200% 200%;
          animation: btnSlide 0.6s ease 0.5s both;
          transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease, opacity 0.2s ease;
          position: relative;
          overflow: hidden;
          margin-top: 0.4rem;
        }
        @keyframes btnSlide {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .login-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .login-btn:hover:not(:disabled) {
          transform: translateY(-2px) scale(1.01);
          box-shadow: 0 8px 24px ${isDark ? 'rgba(155,93,229,0.5)' : 'rgba(140,100,240,0.4)'};
        }
        .login-btn:hover:not(:disabled)::before { opacity: 1; }
        .login-btn:active:not(:disabled) {
          transform: scale(0.98) translateY(0);
          box-shadow: 0 3px 10px rgba(140,100,240,0.3);
        }
        .login-btn:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        /* Loading dots */
        .loading-dots {
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .loading-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: rgba(255,255,255,0.9);
          animation: dotBounce 1s ease-in-out infinite;
        }
        .loading-dot:nth-child(2) { animation-delay: 0.15s; }
        .loading-dot:nth-child(3) { animation-delay: 0.3s; }
        @keyframes dotBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }

        /* Footer */
        .footer {
          margin-top: 1.5rem;
          text-align: center;
          font-size: 0.78rem;
          font-weight: 700;
          color: ${isDark ? 'rgba(180,150,220,0.5)' : 'rgba(160,120,200,0.65)'};
          letter-spacing: 0.02em;
          animation: fadeUp 0.6s ease 0.7s both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Responsive */
        @media (max-width: 480px) {
          .card { padding: 2rem 1.5rem 1.8rem; border-radius: 24px; }
          .title { font-size: 1.5rem; }
        }
      `}</style>

      <div className="login-root">
        {/* Background blobs */}
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />

        {/* Sparkles */}
        <span className="sparkle" style={{ top: '12%', left: '8%', animationDelay: '0s' }}>✦</span>
        <span className="sparkle" style={{ top: '20%', right: '12%', animationDelay: '-1.2s' }}>✧</span>
        <span className="sparkle" style={{ bottom: '25%', right: '8%', animationDelay: '-2.1s' }}>✦</span>
        <span className="sparkle" style={{ bottom: '15%', left: '15%', animationDelay: '-0.7s' }}>✧</span>
        <span className="sparkle" style={{ top: '50%', left: '3%', animationDelay: '-1.8s', fontSize: '12px' }}>✦</span>

        <div style={{ position: 'relative', width: '100%', maxWidth: '420px' }}>
          {/* Theme toggle */}
          <button
            className="theme-btn"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {isDark ? '🌙' : '☀️'}
          </button>

          {/* Card */}
          <div className="card">
            {/* Low-opacity couple image inside card */}
            <div className="couple-bg">
              <img src="/friends.avif" alt="" aria-hidden="true" />
            </div>

            {/* Real avatars */}
            <div className="avatar-row">
              <img
                src={AVATAR_ASHU}
                alt="Ashu"
                className="avatar-img"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              {/* <span className="avatar-heart">💕</span> */}
              <img
                src={AVATAR_CHIKU}
                alt="Chiku"
                className="avatar-img right"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>

            {/* Title */}
            <h1 className="title">Ashu & Chiku</h1>
            <p className="subtitle">✨ Our little chat space ✨</p>

            <div className="divider">
              <div className="divider-line" />
              <div className="divider-dot" />
              <div className="divider-dot" />
              <div className="divider-dot" />
              <div className="divider-line" />
            </div>



            {/* Form */}
            <form onSubmit={handleLogin} noValidate>
              <div className="form-group" style={{ animationDelay: '0.3s' }}>
                <label className="field-label" htmlFor="username">Username</label>
                <div className="input-wrapper">
                  <span className="input-icon" style={{ color: isDark ? 'rgba(200,170,250,0.6)' : 'rgba(160,120,200,0.7)' }}>
                    {username === 'ashu' ? '🌟' : username === 'chiku' ? '🌙' : '👤'}
                  </span>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={() => setFocusedField('username')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Who are you? (Ashu or Chiku)"
                    disabled={loading}
                    className="field-input"
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="form-group" style={{ animationDelay: '0.4s' }}>
                <label className="field-label" htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <span className="input-icon" style={{ color: isDark ? 'rgba(200,170,250,0.6)' : 'rgba(160,120,200,0.7)' }}>
                    🔑
                  </span>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="••••••••"
                    disabled={loading}
                    className="field-input"
                    autoComplete="current-password"
                  />
                </div>
              </div>
              {/* Error */}
              {error && (
                <div className="error-box">
                  {error.includes('MONGODB_URI') ? (
                    <div>
                      <p style={{ marginBottom: '6px' }}>⚙️ Setup needed — add MONGODB_URI in Vercel Vars, then refresh!</p>
                    </div>
                  ) : (
                    <p> {error}</p>
                  )}
                </div>
              )}
              <button
                type="submit"
                disabled={loading || !username || !password}
                className="login-btn"
              >
                {loading ? (
                  <span className="loading-dots">
                    <span className="loading-dot" />
                    <span className="loading-dot" />
                    <span className="loading-dot" />
                  </span>
                ) : (
                  '💌 Enter Our Space'
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <p className="footer">
            made with 💜 for the two of us
          </p>
        </div>
      </div>
    </>
  );
}