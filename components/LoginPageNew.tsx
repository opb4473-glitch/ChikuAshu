'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Airplay, Baby, ChessQueen, ChevronDown, Gamepad2, Ghost, Heart, MessageCircleHeart, Palette, Trees } from 'lucide-react';

const AVATAR_ASHU = '/login-a.jpg';
const AVATAR_CHIKU = '/login-c.jpg';
const AVATAR_ASHU_HORROR = '/horror2b.jpg';
const AVATAR_CHIKU_HORROR = '/horror2g.jpg';
const AVATAR_ASHU_FOREST = '/forest1-boy.jpg';
const AVATAR_CHIKU_FOREST = '/forest1-girl.jpg';
const AVATAR_ASHU_ROYAL = '/royal1-boy.jpg';
const AVATAR_CHIKU_ROYAL = '/royal1-girl.jpg';

const AVATAR_ASHU_KIDS = '/kid1-boy.jpg';
const AVATAR_CHIKU_KIDS = '/kid1-girl.jpg';

const AVATAR_ASHU_GAME = '/gamer1-boy.jpg';
const AVATAR_CHIKU_GAME = '/gamer1-girl.jpg';

const AVATAR_ASHU_ROMANTIC = '/romantic-boy.jpg';
const AVATAR_CHIKU_ROMANTIC = '/romantic-girl.jpg';

const AVATAR_ASHU_SCARY = '/scary-boy.jpg';
const AVATAR_CHIKU_SCARY = '/scary-girl.jpg';

const AVATAR_ASHU_LIGHT = '/light-boy.jpg';
const AVATAR_CHIKU_LIGHT = '/light-girl.jpg';

type ThemeId = 'dark' | 'horror' | 'forest' | 'royal' | 'kids' | 'game' | 'romantic' | 'light' | (string & {});

const getLoginAvatarSet = (theme: ThemeId) => {
  const base = { ashu: AVATAR_ASHU, chiku: AVATAR_CHIKU };

  switch (theme) {
    case 'horror':
      return { ashu: AVATAR_ASHU_HORROR, chiku: AVATAR_CHIKU_HORROR };
    case 'forest':
      return { ashu: AVATAR_ASHU_FOREST, chiku: AVATAR_CHIKU_FOREST };
    case 'royal':
      return { ashu: AVATAR_ASHU_ROYAL, chiku: AVATAR_CHIKU_ROYAL };
    case 'kids':
      return { ashu: AVATAR_ASHU_KIDS, chiku: AVATAR_CHIKU_KIDS };
    case 'game':
      return { ashu: AVATAR_ASHU_GAME, chiku: AVATAR_CHIKU_GAME };
    default:
      return base;
  }
};

const getLoginCouple = (theme: ThemeId) => {
  switch (theme) {
    case 'horror': return '/horror.jpg'
    case 'forest': return '/forest.jpg'
    case 'royal': return '/royal.jpg'
    case 'kids': return '/kids.jpg'
    case 'game': return '/gamer.jpg'
    default:
      return '/friends.avif';
  }
};
// Theme configurations
const THEMES = [
  { id: 'dark', name: 'Default', description: 'Classic theme', accent: '#c77dff' },
  { id: 'horror', name: 'Horror', description: 'Dark & dangerous', accent: '#cc0000' },
  { id: 'forest', name: 'Forest', description: 'Natural & calm', accent: '#44aa55' },
  { id: 'royal', name: 'Royal', description: 'Premium gold', accent: '#daa520' },
  { id: 'kids', name: 'Kids', description: 'Bright & playful', accent: '#ff6b9d' },
  { id: 'game', name: 'Game', description: 'Neon cyber', accent: '#00ffcc' },
  { id: 'romantic', name: 'Romantic', description: 'Soft & sweet', accent: '#ff6b9d' },
];

// Minimal SVG icons per theme — no emoji, purely geometric
const ThemeIcon = ({ id, size = 14, color }: { id: string; size?: number; color: string }) => {
  const s = size;
  switch (id) {
    case 'dark':
      return (
        <Airplay size={15} />
      );
    case 'horror':
      return (
        <Ghost size={15} />
      );
    case 'forest':
      return (
        <Trees size={15} />
      );
    case 'royal':
      return (
        <ChessQueen size={15} />
      );
    case 'kids':
      return (
        <Baby size={15} />
      );
    case 'game':
      return (
        <Gamepad2 size={15} />
      );
    case 'romantic':
      return (
        <MessageCircleHeart size={15} />
      );
    default:
      return <div style={{ width: s, height: s, borderRadius: '50%', background: color }} />;
  }
};

// Theme-specific styles
const getThemeStyles = (theme: string) => {
  switch (theme) {
    case 'horror':
      return {
        background: 'linear-gradient(135deg, #0a0505 0%, #1a0808 40%, #0d0505 100%)',
        cardBg: 'rgba(20, 5, 5, 0.92)',
        cardBorder: 'rgba(120, 20, 20, 0.4)',
        cardShadow: '0 8px 40px rgba(120, 0, 0, 0.4), inset 0 1px 0 rgba(255,50,50,0.06)',
        titleGradient: 'linear-gradient(135deg, #ff3333 0%, #990000 50%, #ff0000 100%)',
        inputBg: 'rgba(30, 5, 5, 0.8)',
        inputBorder: 'rgba(120, 30, 30, 0.5)',
        inputFocusBorder: 'rgba(200, 50, 50, 0.8)',
        buttonGradient: 'linear-gradient(135deg, #8b0000 0%, #cc0000 50%, #990000 100%)',
        buttonShadow: 'rgba(150, 0, 0, 0.6)',
        textPrimary: 'rgba(255, 200, 200, 0.95)',
        textSecondary: 'rgba(200, 100, 100, 0.7)',
        accentColor: '#cc0000',
        blobColors: ['rgba(150, 20, 20, 0.2)', 'rgba(100, 0, 0, 0.15)', 'rgba(80, 10, 10, 0.12)'],
        sparkleColor: 'rgba(255, 50, 50, 0.6)',
        avatarBorder: 'rgba(150, 30, 30, 0.7)',
        avatarShadow: 'rgba(150, 0, 0, 0.5)',
        flickerAnimation: true,
        pulseGlow: true,
        imageSrc: { AVATAR_ASHU_HORROR, AVATAR_CHIKU_HORROR }
      };
      // case 'scary':
      return {
        background: 'linear-gradient(135deg, #0a0515 0%, #150825 40%, #0a0a1a 100%)',
        cardBg: 'rgba(15, 10, 30, 0.9)',
        cardBorder: 'rgba(100, 60, 150, 0.35)',
        cardShadow: '0 8px 40px rgba(80, 40, 120, 0.35)',
        titleGradient: 'linear-gradient(135deg, #9966ff 0%, #6633cc 50%, #9933ff 100%)',
        inputBg: 'rgba(20, 10, 40, 0.7)',
        inputBorder: 'rgba(100, 60, 150, 0.4)',
        inputFocusBorder: 'rgba(150, 100, 200, 0.7)',
        buttonGradient: 'linear-gradient(135deg, #6633cc 0%, #9933ff 50%, #7744dd 100%)',
        buttonShadow: 'rgba(100, 50, 150, 0.5)',
        textPrimary: 'rgba(220, 200, 255, 0.95)',
        textSecondary: 'rgba(150, 120, 200, 0.7)',
        accentColor: '#9933ff',
        blobColors: ['rgba(100, 60, 150, 0.2)', 'rgba(80, 40, 120, 0.15)', 'rgba(60, 30, 100, 0.12)'],
        sparkleColor: 'rgba(180, 140, 255, 0.6)',
        avatarBorder: 'rgba(150, 100, 200, 0.6)',
        avatarShadow: 'rgba(100, 50, 150, 0.4)',
        flickerAnimation: true,
        pulseGlow: false,
      };
    case 'forest':
      return {
        background: 'linear-gradient(135deg, #0a1a10 0%, #0f2518 40%, #0a1812 100%)',
        cardBg: 'rgba(10, 30, 20, 0.88)',
        cardBorder: 'rgba(60, 140, 80, 0.35)',
        cardShadow: '0 8px 40px rgba(30, 100, 50, 0.3)',
        titleGradient: 'linear-gradient(135deg, #66cc77 0%, #339944 50%, #55bb66 100%)',
        inputBg: 'rgba(15, 35, 25, 0.7)',
        inputBorder: 'rgba(60, 120, 70, 0.4)',
        inputFocusBorder: 'rgba(100, 180, 110, 0.7)',
        buttonGradient: 'linear-gradient(135deg, #228833 0%, #44aa55 50%, #339944 100%)',
        buttonShadow: 'rgba(40, 120, 60, 0.5)',
        textPrimary: 'rgba(200, 255, 210, 0.95)',
        textSecondary: 'rgba(120, 180, 130, 0.7)',
        accentColor: '#44aa55',
        blobColors: ['rgba(60, 140, 80, 0.2)', 'rgba(40, 100, 60, 0.15)', 'rgba(30, 80, 50, 0.12)'],
        sparkleColor: 'rgba(140, 220, 150, 0.6)',
        avatarBorder: 'rgba(80, 160, 100, 0.6)',
        avatarShadow: 'rgba(40, 100, 60, 0.4)',
        flickerAnimation: false,
        pulseGlow: false,
      };
    case 'royal':
      return {
        background: 'linear-gradient(135deg, #1a1020 0%, #201530 40%, #181028 100%)',
        cardBg: 'rgba(30, 20, 45, 0.9)',
        cardBorder: 'rgba(200, 160, 80, 0.4)',
        cardShadow: '0 8px 40px rgba(180, 140, 60, 0.25)',
        titleGradient: 'linear-gradient(135deg, #ffd700 0%, #daa520 50%, #ffcc00 100%)',
        inputBg: 'rgba(35, 25, 50, 0.7)',
        inputBorder: 'rgba(180, 140, 80, 0.4)',
        inputFocusBorder: 'rgba(220, 180, 100, 0.7)',
        buttonGradient: 'linear-gradient(135deg, #b8860b 0%, #daa520 50%, #cd9f32 100%)',
        buttonShadow: 'rgba(180, 140, 60, 0.5)',
        textPrimary: 'rgba(255, 240, 200, 0.95)',
        textSecondary: 'rgba(200, 170, 120, 0.7)',
        accentColor: '#daa520',
        blobColors: ['rgba(200, 160, 80, 0.15)', 'rgba(180, 140, 60, 0.12)', 'rgba(160, 120, 50, 0.1)'],
        sparkleColor: 'rgba(255, 215, 0, 0.7)',
        avatarBorder: 'rgba(220, 180, 100, 0.7)',
        avatarShadow: 'rgba(180, 140, 60, 0.4)',
        flickerAnimation: false,
        pulseGlow: true,
      };
    case 'kids':
      return {
        background: 'linear-gradient(135deg, #fff5e6 0%, #ffe6f0 40%, #e6f5ff 100%)',
        cardBg: 'rgba(255, 255, 255, 0.92)',
        cardBorder: 'rgba(255, 150, 200, 0.5)',
        cardShadow: '0 8px 40px rgba(255, 100, 150, 0.2)',
        titleGradient: 'linear-gradient(135deg, #ff6b9d 0%, #ffa726 50%, #42a5f5 100%)',
        inputBg: 'rgba(255, 250, 245, 0.9)',
        inputBorder: 'rgba(255, 150, 180, 0.5)',
        inputFocusBorder: 'rgba(255, 100, 150, 0.7)',
        buttonGradient: 'linear-gradient(135deg, #ff6b9d 0%, #ffa726 50%, #42a5f5 100%)',
        buttonShadow: 'rgba(255, 100, 150, 0.4)',
        textPrimary: 'rgba(80, 50, 90, 0.95)',
        textSecondary: 'rgba(150, 100, 160, 0.8)',
        accentColor: '#ff6b9d',
        blobColors: ['rgba(255, 150, 200, 0.35)', 'rgba(150, 200, 255, 0.35)', 'rgba(255, 200, 150, 0.35)'],
        sparkleColor: 'rgba(255, 100, 180, 0.8)',
        avatarBorder: 'rgba(255, 150, 200, 0.8)',
        avatarShadow: 'rgba(255, 100, 150, 0.3)',
        flickerAnimation: false,
        pulseGlow: false,
      };
    case 'game':
      return {
        background: 'linear-gradient(135deg, #0a0a15 0%, #0f1020 40%, #080815 100%)',
        cardBg: 'rgba(10, 15, 30, 0.92)',
        cardBorder: 'rgba(0, 255, 200, 0.3)',
        cardShadow: '0 8px 40px rgba(0, 255, 200, 0.15), 0 0 60px rgba(255, 0, 200, 0.1)',
        titleGradient: 'linear-gradient(135deg, #00ffcc 0%, #ff00cc 50%, #00ccff 100%)',
        inputBg: 'rgba(15, 20, 35, 0.8)',
        inputBorder: 'rgba(0, 200, 180, 0.4)',
        inputFocusBorder: 'rgba(0, 255, 200, 0.7)',
        buttonGradient: 'linear-gradient(135deg, #00ccaa 0%, #cc00aa 50%, #00aacc 100%)',
        buttonShadow: 'rgba(0, 255, 200, 0.4)',
        textPrimary: 'rgba(200, 255, 250, 0.95)',
        textSecondary: 'rgba(100, 200, 180, 0.7)',
        accentColor: '#00ffcc',
        blobColors: ['rgba(0, 255, 200, 0.15)', 'rgba(255, 0, 200, 0.1)', 'rgba(0, 200, 255, 0.12)'],
        sparkleColor: 'rgba(0, 255, 200, 0.8)',
        avatarBorder: 'rgba(0, 255, 200, 0.6)',
        avatarShadow: 'rgba(0, 200, 180, 0.4)',
        flickerAnimation: false,
        pulseGlow: true,
      };
    case 'romantic':
      return {
        background: 'linear-gradient(135deg, #2a1520 0%, #301828 40%, #251520 100%)',
        cardBg: 'rgba(40, 20, 30, 0.9)',
        cardBorder: 'rgba(255, 150, 180, 0.35)',
        cardShadow: '0 8px 40px rgba(255, 100, 150, 0.25)',
        titleGradient: 'linear-gradient(135deg, #ff8fa3 0%, #ff6b9d 50%, #ffb3c6 100%)',
        inputBg: 'rgba(45, 25, 35, 0.7)',
        inputBorder: 'rgba(255, 140, 170, 0.4)',
        inputFocusBorder: 'rgba(255, 180, 200, 0.7)',
        buttonGradient: 'linear-gradient(135deg, #e05080 0%, #ff6b9d 50%, #d04070 100%)',
        buttonShadow: 'rgba(255, 100, 150, 0.5)',
        textPrimary: 'rgba(255, 230, 240, 0.95)',
        textSecondary: 'rgba(255, 180, 200, 0.7)',
        accentColor: '#ff6b9d',
        blobColors: ['rgba(255, 150, 180, 0.2)', 'rgba(255, 100, 150, 0.15)', 'rgba(255, 180, 200, 0.12)'],
        sparkleColor: 'rgba(255, 180, 200, 0.7)',
        avatarBorder: 'rgba(255, 150, 180, 0.6)',
        avatarShadow: 'rgba(255, 100, 150, 0.4)',
        flickerAnimation: false,
        pulseGlow: true,
      };
    case 'light':
      return {
        background: 'linear-gradient(135deg, #fdf0f8 0%, #fce8f5 30%, #ede8ff 65%, #e8f4ff 100%)',
        cardBg: 'rgba(255, 255, 255, 0.78)',
        cardBorder: 'rgba(210, 180, 240, 0.6)',
        cardShadow: '0 8px 40px rgba(180, 150, 220, 0.18), 0 2px 8px rgba(180, 150, 220, 0.12)',
        titleGradient: 'linear-gradient(135deg, #9b30c0 0%, #7c3aed 50%, #4a6fd6 100%)',
        inputBg: 'rgba(250, 245, 255, 0.8)',
        inputBorder: 'rgba(200, 170, 230, 0.5)',
        inputFocusBorder: 'rgba(170, 120, 220, 0.8)',
        buttonGradient: 'linear-gradient(135deg, #b06ad4 0%, #8b5cf6 50%, #6b9ff5 100%)',
        buttonShadow: 'rgba(140, 100, 240, 0.4)',
        textPrimary: 'rgba(74, 45, 110, 0.95)',
        textSecondary: 'rgba(150, 110, 180, 0.8)',
        accentColor: '#8b5cf6',
        blobColors: ['rgba(230, 170, 230, 0.35)', 'rgba(180, 200, 255, 0.4)', 'rgba(255, 200, 200, 0.3)'],
        sparkleColor: 'rgba(160, 120, 200, 0.6)',
        avatarBorder: 'rgba(200, 170, 240, 0.8)',
        avatarShadow: 'rgba(180, 140, 240, 0.28)',
        flickerAnimation: false,
        pulseGlow: false,
      };
    default: // dark (default)
      return {
        background: 'linear-gradient(135deg, #1a1028 0%, #201530 40%, #1a1a2e 100%)',
        cardBg: 'rgba(35, 25, 55, 0.85)',
        cardBorder: 'rgba(180, 140, 220, 0.25)',
        cardShadow: '0 8px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
        titleGradient: 'linear-gradient(135deg, #f2ccff 0%, #d8b8ff 50%, #b8d8ff 100%)',
        inputBg: 'rgba(50, 30, 80, 0.5)',
        inputBorder: 'rgba(150, 110, 200, 0.3)',
        inputFocusBorder: 'rgba(200, 160, 255, 0.7)',
        buttonGradient: 'linear-gradient(135deg, #9b5de5 0%, #c77dff 50%, #7b9ff5 100%)',
        buttonShadow: 'rgba(155, 93, 229, 0.5)',
        textPrimary: 'rgba(240, 230, 255, 0.95)',
        textSecondary: 'rgba(200, 170, 240, 0.7)',
        accentColor: '#c77dff',
        blobColors: ['rgba(180, 120, 220, 0.12)', 'rgba(100, 150, 220, 0.12)', 'rgba(220, 150, 120, 0.08)'],
        sparkleColor: 'rgba(200, 170, 255, 0.6)',
        avatarBorder: 'rgba(200, 160, 255, 0.5)',
        avatarShadow: 'rgba(155, 93, 229, 0.35)',
        flickerAnimation: false,
        pulseGlow: false,
      };
  }
};

// Theme Selector Dropdown
const ThemeSelector = ({ currentTheme, onThemeChange, styles }: {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
  styles: ReturnType<typeof getThemeStyles>;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const currentThemeData = THEMES.find(t => t.id === currentTheme) || THEMES[0];

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '7px 13px 7px 10px',
          borderRadius: 12,
          border: `1.5px solid ${styles.cardBorder}`,
          background: styles.cardBg,
          backdropFilter: 'blur(16px)',
          cursor: 'pointer',
          color: styles.textPrimary,
          fontFamily: "'Nunito', sans-serif",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          gap: 7,
        }}
      >

        <ThemeIcon id={currentTheme} size={6} color={styles.textSecondary} />

        <span style={{ color: styles.textPrimary }}>{currentThemeData.name}</span>

        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ display: 'flex', alignItems: 'center' }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 3.5L5 6.5L8 3.5" stroke={styles.textSecondary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -8 }}
            transition={{ type: 'spring', stiffness: 420, damping: 28 }}
            style={{
              position: 'absolute',
              top: 44,
              right: 0,
              background: styles.cardBg,
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: `1.5px solid ${styles.cardBorder}`,
              borderRadius: 16,
              boxShadow: styles.cardShadow,
              overflow: 'hidden',
              minWidth: 200,
              zIndex: 100,
              padding: '6px 0',
            }}
          >
            {/* Header label */}
            <div style={{
              padding: '8px 14px 6px',
              fontSize: 9,
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: styles.textSecondary,
              borderBottom: `1px solid ${styles.cardBorder}`,
              marginBottom: 4,
              fontFamily: "'Nunito', sans-serif",
            }}>
              Select Theme
            </div>

            {THEMES.map((t, index) => {
              const isActive = currentTheme === t.id;
              const isDisabled = t.id === 'romantic';

              return (
                <motion.button
                  key={t.id}
                  onClick={() => { if (!isDisabled) { onThemeChange(t.id); setOpen(false); } }}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.025 }}
                  whileHover={!isDisabled ? { x: 3, backgroundColor: `${styles.accentColor}12` } : {}}
                  style={{
                    width: '100%',
                    padding: '9px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    background: isActive ? `${styles.accentColor}14` : 'transparent',
                    border: 'none',
                    borderLeft: isActive ? `2.5px solid ${styles.accentColor}` : '2.5px solid transparent',
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                    color: isDisabled ? styles.textSecondary : styles.textPrimary,
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: 12.5,
                    fontWeight: isActive ? 800 : 600,
                    textAlign: 'left',
                    opacity: isDisabled ? 0.4 : 1,
                  }}
                >
                  {/* Geometric icon */}
                  <ThemeIcon id={t.id} size={14} color={isActive ? t.accent : styles.textSecondary} />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ letterSpacing: '0.03em' }}>{t.name}</div>
                    <div style={{
                      fontSize: 10,
                      color: styles.textSecondary,
                      fontWeight: 500,
                      marginTop: 1,
                    }}>
                      {isDisabled ? 'Coming soon' : t.description}
                    </div>
                  </div>

                  {isActive && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      width="12" height="12" viewBox="0 0 12 12" fill="none"
                    >
                      <path d="M2 6L5 9L10 3" stroke={styles.accentColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Floating Blobs with theme-specific colors
const FloatingBlobs = ({ styles }: { styles: ReturnType<typeof getThemeStyles> }) => (
  <>
    <motion.div
      className="blob blob-1"
      animate={{
        y: [0, -18, 0],
        scale: [1, 1.04, 0.97, 1],
        opacity: styles.flickerAnimation ? [0.8, 0.3, 0.9, 0.5, 0.8] : [1, 1, 1],
      }}
      transition={{
        duration: styles.flickerAnimation ? 3 : 8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{
        position: 'absolute',
        width: 340,
        height: 340,
        top: -80,
        right: -60,
        borderRadius: '50%',
        background: styles.blobColors[0],
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }}
    />
    <motion.div
      className="blob blob-2"
      animate={{
        y: [0, 18, 0],
        scale: [1, 0.97, 1.04, 1],
        opacity: styles.flickerAnimation ? [0.6, 0.9, 0.4, 0.7, 0.6] : [1, 1, 1],
      }}
      transition={{
        duration: styles.flickerAnimation ? 4 : 8,
        delay: 1,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{
        position: 'absolute',
        width: 260,
        height: 260,
        bottom: -50,
        left: -50,
        borderRadius: '50%',
        background: styles.blobColors[1],
        filter: 'blur(55px)',
        pointerEvents: 'none',
      }}
    />
    <motion.div
      className="blob blob-3"
      animate={{
        y: [0, -12, 0],
        x: [0, 10, 0],
        opacity: styles.flickerAnimation ? [0.5, 0.8, 0.3, 0.6, 0.5] : [1, 1, 1],
      }}
      transition={{
        duration: styles.flickerAnimation ? 2.5 : 9,
        delay: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{
        position: 'absolute',
        width: 180,
        height: 180,
        top: '40%',
        left: '5%',
        borderRadius: '50%',
        background: styles.blobColors[2],
        filter: 'blur(45px)',
        pointerEvents: 'none',
      }}
    />
  </>
);

// Animated Sparkles
const Sparkles = ({ styles }: { styles: ReturnType<typeof getThemeStyles> }) => {
  const sparklePositions = [
    { top: '12%', left: '8%', delay: 0 },
    { top: '20%', right: '12%', delay: 1.2 },
    { bottom: '25%', right: '8%', delay: 2.1 },
    { bottom: '15%', left: '15%', delay: 0.7 },
    { top: '50%', left: '3%', delay: 1.8 },
  ];

  return (
    <>
      {sparklePositions.map((pos, i) => (
        <motion.span
          key={i}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.2, 0.8],
            rotate: [-10, 10, -10],
          }}
          transition={{
            duration: styles.flickerAnimation ? 1.5 : 3,
            repeat: Infinity,
            delay: pos.delay,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            fontSize: i === 4 ? 12 : 18,
            color: styles.sparkleColor,
            userSelect: 'none',
            pointerEvents: 'none',
            ...pos,
          } as React.CSSProperties}
        >
          {i % 2 === 0 ? '✦' : '✧'}
        </motion.span>
      ))}
    </>
  );
};

// Horror-specific effects
const HorrorEffects = ({ isHorror }: { isHorror: boolean }) => {
  if (!isHorror) return null;

  return (
    <>
      {/* Blood drip effects */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`drip-${i}`}
          initial={{ y: -20, opacity: 0 }}
          animate={{
            y: ['0%', '100%'],
            opacity: [0, 0.6, 0.6, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 2,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: `${10 + i * 20}%`,
            width: 2,
            height: 60,
            background: 'linear-gradient(to bottom, transparent, rgba(150, 0, 0, 0.4), transparent)',
            borderRadius: 2,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Vignette overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.5) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Subtle red glow pulse */}
      <motion.div
        animate={{
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(150, 0, 0, 0.2), transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
    </>
  );
};

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
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

  const currentTheme = theme || 'dark';
  const styles = getThemeStyles(currentTheme);
  const isHorror = currentTheme === 'horror';
  const avatarSet = getLoginAvatarSet(currentTheme);
  const coupleSrc = getLoginCouple(currentTheme);
  console.log(coupleSrc, '---')
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Pacifico&family=Creepster&display=swap');

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
          background: ${styles.background};
          transition: background 0.5s ease;
        }

        ${isHorror ? `
          .login-root::before {
            content: '';
            position: absolute;
            inset: 0;
            background: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
            opacity: 0.03;
            pointer-events: none;
            z-index: 0;
          }
        ` : ''}

        .card {
          position: relative;
          width: 100%;
          max-width: 420px;
          background: ${styles.cardBg};
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 28px;
          padding: 2.5rem 2.2rem 2.2rem;
          border: 1.5px solid ${styles.cardBorder};
          box-shadow: ${styles.cardShadow};
          animation: cardEntrance 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          z-index: 10;
          overflow: hidden;
        }

        ${isHorror ? `
          .card::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 28px;
            background: linear-gradient(135deg, transparent 0%, rgba(150, 0, 0, 0.05) 50%, transparent 100%);
            animation: cardPulse 4s ease-in-out infinite;
            pointer-events: none;
          }
          @keyframes cardPulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.8; }
          }
        ` : ''}

        ${styles.pulseGlow ? `
          .card::after {
            content: '';
            position: absolute;
            inset: -2px;
            border-radius: 30px;
            background: ${styles.buttonGradient};
            opacity: 0;
            animation: glowPulse 3s ease-in-out infinite;
            z-index: -1;
            filter: blur(15px);
          }
          @keyframes glowPulse {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.3; }
          }
        ` : ''}

        @keyframes cardEntrance {
          from { opacity: 0; transform: translateY(28px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .avatar-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin-bottom: 1.1rem;
          position: relative;
          z-index: 1;
          animation: iconBounce 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both;
        }

        .avatar-img {
          width: 76px;
          height: 76px;
          border-radius: 50%;
          object-fit: cover;
          border: 2.5px solid ${styles.avatarBorder};
          box-shadow: 0 4px 18px ${styles.avatarShadow};
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          background: ${styles.inputBg};
        }

        .avatar-img:hover {
          transform: scale(1.1) rotate(-4deg);
        }

        .avatar-img.right:hover {
          transform: scale(1.1) rotate(4deg);
        }

        @keyframes iconBounce {
          from { opacity: 0; transform: scale(0.4) translateY(-10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .title {
          font-family: ${isHorror ? "'Creepster', cursive" : "'Pacifico', cursive"};
          font-size: ${isHorror ? '2rem' : '1.75rem'};
          text-align: center;
          display: inline-block;
          width: 100%;
          background: ${styles.titleGradient};
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.35rem;
          line-height: 1.2;
          animation: titleSlide 0.7s ease 0.1s both;
          position: relative;
          z-index: 1;
          ${isHorror ? `
            text-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
            animation: titleSlide 0.7s ease 0.1s both, horrorFlicker 4s ease-in-out infinite 1s;
          ` : ''}
        }

        ${isHorror ? `
          @keyframes horrorFlicker {
            0%, 100% { opacity: 1; }
            92% { opacity: 1; }
            93% { opacity: 0.8; }
            94% { opacity: 1; }
            96% { opacity: 0.9; }
            97% { opacity: 1; }
          }
        ` : ''}

        @keyframes titleSlide {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .subtitle {
          text-align: center;
          font-size: 0.85rem;
          font-weight: 600;
          color: ${styles.textSecondary};
          margin-bottom: 2rem;
          letter-spacing: 0.03em;
          animation: titleSlide 0.7s ease 0.2s both;
          position: relative;
          z-index: 1;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 1.5rem;
          position: relative;
          z-index: 1;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: ${styles.cardBorder};
        }

        .divider-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: ${styles.accentColor};
          ${styles.pulseGlow || isHorror ? `
            animation: dotGlow 2s ease-in-out infinite;
          ` : ''}
        }

        @keyframes dotGlow {
          0%, 100% { box-shadow: 0 0 5px ${styles.accentColor}50; }
          50% { box-shadow: 0 0 15px ${styles.accentColor}80; }
        }

        .form-group {
          margin-bottom: 1.1rem;
          animation: fieldSlide 0.6s ease both;
          position: relative;
          z-index: 1;
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
          color: ${styles.textPrimary};
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
          border: 2px solid ${styles.inputBorder};
          background: ${styles.inputBg};
          color: ${styles.textPrimary};
          font-family: 'Nunito', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          outline: none;
          transition: all 0.25s ease;
        }

        .field-input::placeholder {
          color: ${styles.textSecondary};
          font-weight: 400;
        }

        .field-input:focus {
          border-color: ${styles.inputFocusBorder};
          box-shadow: 0 0 0 4px ${styles.accentColor}20
          transform: translateY(-1px);
        }

        .error-box {
          margin-bottom: 1rem;
          padding: 0.75rem 1rem;
          border-radius: 14px;
          background: ${isHorror ? 'rgba(80, 0, 0, 0.3)' : 'rgba(220, 80, 100, 0.15)'};
          border: 1.5px solid ${isHorror ? 'rgba(150, 0, 0, 0.5)' : 'rgba(220, 80, 100, 0.35)'};
          color: ${isHorror ? '#ff6666' : '#ffb3be'};
          font-size: 0.85rem;
          font-weight: 600;
          animation: shake 0.4s ease;
          position: relative;
          z-index: 1;
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

        .login-btn {
          position: relative;
          z-index: 1;
          width: 100%;
          padding: 0.85rem 1rem;
          border: none;
          border-radius: 16px;
          cursor: pointer;
          font-family: ${isHorror ? "'Creepster', cursive" : "'Nunito', sans-serif"};
          font-size: ${isHorror ? '1.1rem' : '1rem'};
          font-weight: 800;
          letter-spacing: ${isHorror ? '0.08em' : '0.03em'};
          color: #fff;
          background: ${styles.buttonGradient};
          background-size: 200% 200%;
          animation: btnSlide 0.6s ease 0.5s both;
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease, opacity 0.2s ease;
          overflow: hidden;
          margin-top: 0.4rem;
        }

        ${isHorror ? `
          .login-btn::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            transform: translateX(-100%);
            animation: btnShine 3s ease-in-out infinite;
          }
          @keyframes btnShine {
            0%, 100% { transform: translateX(-100%); }
            50% { transform: translateX(100%); }
          }
        ` : `
          .login-btn::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 60%);
            opacity: 0;
            transition: opacity 0.2s ease;
          }
        `}

        @keyframes btnSlide {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .login-btn:hover:not(:disabled) {
          transform: translateY(-2px) scale(1.01);
          box-shadow: 0 8px 24px ${styles.buttonShadow};
        }

        .login-btn:hover:not(:disabled)::before {
          opacity: 1;
        }

        .login-btn:active:not(:disabled) {
          transform: scale(0.98) translateY(0);
          box-shadow: 0 3px 10px ${styles.buttonShadow};
        }

        .login-btn:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

         .couple-bg {
          position: absolute;
          inset: 0;
          z-index: 100;
          pointer-events: none;
          overflow: hidden;
          border-radius: inherit;
        }
          .couple-bg img {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 65%;
  height: 80%;
  object-fit: cover;
  object-position: top center;

  opacity: ${'0.3'};
  filter: ${'grayscale(25%) blur(0.4px)'};

  /* multi-direction fade */
  -webkit-mask-image:
    linear-gradient(to bottom, transparent 0%, black 25%, black 100%),   /* strong top fade */
    linear-gradient(to top, transparent 0%, black 15%, black 100%),      /* light bottom fade */
    linear-gradient(to right, transparent 0%, black 20%, black 100%),    /* left fade */
    linear-gradient(to left, transparent 0%, black 20%, black 100%);     /* right fade */

  -webkit-mask-composite: intersect;
  mask-composite: intersect;
}

        .loading-dots {
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .loading-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          animation: dotBounce 1s ease-in-out infinite;
        }

        .loading-dot:nth-child(2) { animation-delay: 0.15s; }
        .loading-dot:nth-child(3) { animation-delay: 0.3s; }

        @keyframes dotBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }

        .footer {
          margin-top: 1.5rem;
          text-align: center;
          font-size: 0.78rem;
          font-weight: 700;
          color: ${styles.textSecondary};
          letter-spacing: 0.02em;
          animation: fadeUp 0.6s ease 0.7s both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 480px) {
          .card { padding: 2rem 1.5rem 1.8rem; border-radius: 24px; }
          .title { font-size: ${isHorror ? '1.75rem' : '1.5rem'}; }
        }
      `}</style>

      <div className="login-root">
        <FloatingBlobs styles={styles} />
        <Sparkles styles={styles} />
        <HorrorEffects isHorror={isHorror} />

        <div style={{ position: 'relative', width: '100%', maxWidth: 420, zIndex: 10 }}>
          {/* Theme selector */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              position: 'absolute',
              top: -50,
              right: 0,
              zIndex: 100,
            }}
          >
            <ThemeSelector
              currentTheme={currentTheme}
              onThemeChange={setTheme}
              styles={styles}
            />
          </motion.div>

          {/* Card */}
          <div className="card">
            <div className="couple-bg">
              <img src={coupleSrc} alt="" aria-hidden="true" />
            </div>
            {/* Avatar row */}
            <div className="avatar-row">
              <motion.img
                src={avatarSet.ashu}
                alt="Ashu"
                className="avatar-img"
                whileHover={{ scale: 1.1, rotate: -4 }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              {/* <motion.span
                className="avatar-heart"
                animate={isHorror ? {
                  scale: [1, 1.3, 1],
                  opacity: [0.8, 1, 0.8],
                } : {
                  scale: [1, 1.22, 1, 1.15, 1],
                }}
                transition={{
                  duration: isHorror ? 1.5 : 2.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ fontSize: 22 }}
              >
                {isHorror ? '🖤' : ''}
              </motion.span> */}
              <motion.img
                src={avatarSet.chiku}
                alt="Chiku"
                className="avatar-img right"
                whileHover={{ scale: 1.1, rotate: 4 }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>

            {/* Title */}
            <h1 className="title">Ashu & Chiku</h1>
            <p className="subtitle">
              {isHorror ? '🩸 Enter if you dare 🩸' : '✨ Our little chat space ✨'}
            </p>

            <div className="divider">
              <div className="divider-line" />
              <motion.div
                className="divider-dot"
                animate={isHorror ? { scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="divider-dot"
                animate={isHorror ? { scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              />
              <motion.div
                className="divider-dot"
                animate={isHorror ? { scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              />
              <div className="divider-line" />
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} noValidate>
              <motion.div
                className="form-group"
                whileHover={{ x: 2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <label className="field-label" htmlFor="username">Username</label>
                <div className="input-wrapper">
                  <span className="input-icon" style={{ color: styles.textSecondary }}>
                    {username === 'ashu' ? '🌟' : username === 'chiku' ? '🌙' : (isHorror ? '💀' : '👤')}
                  </span>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={isHorror ? "Reveal your identity..." : "Who are you? (Ashu or Chiku)"}
                    disabled={loading}
                    className="field-input"
                    autoComplete="username"
                  />
                </div>
              </motion.div>

              <motion.div
                className="form-group"
                whileHover={{ x: 2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <label className="field-label" htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <span className="input-icon" style={{ color: styles.textSecondary }}>
                    {isHorror ? '🗝️' : '🔑'}
                  </span>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    disabled={loading}
                    className="field-input"
                    autoComplete="current-password"
                  />
                </div>
              </motion.div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="error-box"
                  >
                    {error.includes('MONGODB_URI') ? (
                      <div>
                        <p style={{ marginBottom: '6px' }}>⚙️ Setup needed — add MONGODB_URI in Vercel Vars, then refresh!</p>
                      </div>
                    ) : (
                      <p>{isHorror ? `☠️ ${error}` : error}</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={loading || !username || !password}
                className="login-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <span className="loading-dots">
                    <span className="loading-dot" />
                    <span className="loading-dot" />
                    <span className="loading-dot" />
                  </span>
                ) : (
                  isHorror ? '🩸 Enter The Darkness' : '💌 Enter Our Space'
                )}
              </motion.button>
            </form>
          </div>

          {/* Footer */}
          <motion.p
            className="footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {isHorror ? 'made with 🖤 for the two of us' : 'made with 💜 for the two of us'}
          </motion.p>
        </div>
      </div>
    </>
  );
}
