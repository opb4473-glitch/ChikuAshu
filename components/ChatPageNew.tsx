'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Airplay, Baby, ChessQueen, Gamepad2, Ghost, MessageCircleHeart, Trees, Send, ImageIcon, RefreshCw, LogOut, Sparkles } from 'lucide-react';

// ─── Default avatars ─────────────────────────────────────────────────────────
const HEADER_AVATAR_ASHU = '/boy.jpg';
const HEADER_AVATAR_CHIKU = '/girl.jpg';
const CHAT_AVATAR_ASHU = '/chat-ashu.jpg';
const CHAT_AVATAR_CHIKU = '/chat-chiku.jpg';

// ─── Horror ──────────────────────────────────────────────────────────────────
const HEADER_AVATAR_ASHU_HORROR = '/horrorcb.jpg';
const HEADER_AVATAR_CHIKU_HORROR = '/horrorcg.jpg';
const CHAT_AVATAR_ASHU_HORROR = '/horror2b.jpg';
const CHAT_AVATAR_CHIKU_HORROR = '/horror2g.jpg';

// ─── Forest ──────────────────────────────────────────────────────────────────
const HEADER_AVATAR_ASHU_FOREST = '/forestcb.jpg';
const HEADER_AVATAR_CHIKU_FOREST = '/forestcg.jpg';
const CHAT_AVATAR_ASHU_FOREST = '/foresthb.jpg';
const CHAT_AVATAR_CHIKU_FOREST = '/foresthg.jpg';

// ─── Royal ───────────────────────────────────────────────────────────────────
const HEADER_AVATAR_ASHU_ROYAL = '/royalhb.jpg';
const HEADER_AVATAR_CHIKU_ROYAL = '/royalhg.jpg';
const CHAT_AVATAR_ASHU_ROYAL = '/royalcb.jpg';
const CHAT_AVATAR_CHIKU_ROYAL = '/royalcg.jpg';

// ─── Kids ────────────────────────────────────────────────────────────────────
const HEADER_AVATAR_ASHU_KIDS = '/kidhb.jpg';
const HEADER_AVATAR_CHIKU_KIDS = '/kidhg.jpg';
const CHAT_AVATAR_ASHU_KIDS = '/kidcb.jpg';
const CHAT_AVATAR_CHIKU_KIDS = '/kidcg.jpg';

// ─── Game ────────────────────────────────────────────────────────────────────
const HEADER_AVATAR_ASHU_GAME = '/gamerhb.jpg';
const HEADER_AVATAR_CHIKU_GAME = '/gamerhg.jpg';
const CHAT_AVATAR_ASHU_GAME = '/gamercb.jpg';
const CHAT_AVATAR_CHIKU_GAME = '/gamercg.jpg';

// ─── Romantic ────────────────────────────────────────────────────────────────
const HEADER_AVATAR_ASHU_ROMANTIC = '/romantic-header-ashu.jpg';
const HEADER_AVATAR_CHIKU_ROMANTIC = '/romantic-header-chiku.jpg';
const CHAT_AVATAR_ASHU_ROMANTIC = '/romantic-chat-ashu.jpg';
const CHAT_AVATAR_CHIKU_ROMANTIC = '/romantic-chat-chiku.jpg';

// ─── Light ───────────────────────────────────────────────────────────────────
const HEADER_AVATAR_ASHU_LIGHT = '/light-header-ashu.jpg';
const HEADER_AVATAR_CHIKU_LIGHT = '/light-header-chiku.jpg';
const CHAT_AVATAR_ASHU_LIGHT = '/light-chat-ashu.jpg';
const CHAT_AVATAR_CHIKU_LIGHT = '/light-chat-chiku.jpg';

const getChatAvatarSet = (theme: ThemeId) => {
    switch (theme) {
        case 'horror':
            return {
                header: { ashu: HEADER_AVATAR_ASHU_HORROR, chiku: HEADER_AVATAR_CHIKU_HORROR },
                chat: { ashu: CHAT_AVATAR_ASHU_HORROR, chiku: CHAT_AVATAR_CHIKU_HORROR },
            };
        case 'forest':
            return {
                header: { ashu: HEADER_AVATAR_ASHU_FOREST, chiku: HEADER_AVATAR_CHIKU_FOREST },
                chat: { ashu: CHAT_AVATAR_ASHU_FOREST, chiku: CHAT_AVATAR_CHIKU_FOREST },
            };
        case 'royal':
            return {
                header: { ashu: HEADER_AVATAR_ASHU_ROYAL, chiku: HEADER_AVATAR_CHIKU_ROYAL },
                chat: { ashu: CHAT_AVATAR_ASHU_ROYAL, chiku: CHAT_AVATAR_CHIKU_ROYAL },
            };
        case 'kids':
            return {
                header: { ashu: HEADER_AVATAR_ASHU_KIDS, chiku: HEADER_AVATAR_CHIKU_KIDS },
                chat: { ashu: CHAT_AVATAR_ASHU_KIDS, chiku: CHAT_AVATAR_CHIKU_KIDS },
            };
        case 'game':
            return {
                header: { ashu: HEADER_AVATAR_ASHU_GAME, chiku: HEADER_AVATAR_CHIKU_GAME },
                chat: { ashu: CHAT_AVATAR_ASHU_GAME, chiku: CHAT_AVATAR_CHIKU_GAME },
            };
        case 'romantic':
            return {
                header: { ashu: HEADER_AVATAR_ASHU_ROMANTIC, chiku: HEADER_AVATAR_CHIKU_ROMANTIC },
                chat: { ashu: CHAT_AVATAR_ASHU_ROMANTIC, chiku: CHAT_AVATAR_CHIKU_ROMANTIC },
            };
        case 'light':
            return {
                header: { ashu: HEADER_AVATAR_ASHU_LIGHT, chiku: HEADER_AVATAR_CHIKU_LIGHT },
                chat: { ashu: CHAT_AVATAR_ASHU_LIGHT, chiku: CHAT_AVATAR_CHIKU_LIGHT },
            };
        default: // dark
            return {
                header: { ashu: HEADER_AVATAR_ASHU, chiku: HEADER_AVATAR_CHIKU },
                chat: { ashu: CHAT_AVATAR_ASHU, chiku: CHAT_AVATAR_CHIKU },
            };
    }
};

type ThemeId = 'dark' | 'horror' | 'forest' | 'royal' | 'kids' | 'game' | 'romantic' | 'light' | (string & {});

// Same couple image mapping as login page
const getChatCoupleSrc = (theme: ThemeId): string => {
    switch (theme) {
        case 'horror': return '/horror.jpg';
        case 'forest': return '/forest.jpg';
        case 'royal': return '/royal.jpg';
        case 'kids': return '/kids.jpg';
        case 'game': return '/gamer.jpg';
        default: return '/friends.avif';
    }
};

// const getChatAvatarSet = (theme: ThemeId) => {
//     const base = {
//         header: { ashu: HEADER_AVATAR_ASHU, chiku: HEADER_AVATAR_CHIKU },
//         chat: { ashu: CHAT_AVATAR_ASHU, chiku: CHAT_AVATAR_CHIKU },
//     };
//     switch (theme) {
//         case 'horror':
//             return {
//                 header: { ashu: HEADER_AVATAR_ASHU_HORROR, chiku: HEADER_AVATAR_CHIKU_HORROR },
//                 chat: { ashu: CHAT_AVATAR_ASHU_HORROR, chiku: CHAT_AVATAR_CHIKU_HORROR },
//             };
//         default:
//             return base;
//     }
// };

interface Message {
    _id: string;
    sender: string;
    content: string;
    image?: string;
    createdAt: string;
}

const THEMES = [
    { id: 'dark', name: 'Default', description: 'Classic theme', accent: '#c77dff' },
    { id: 'horror', name: 'Horror', description: 'Dark & dangerous', accent: '#cc0000' },
    { id: 'forest', name: 'Forest', description: 'Natural & calm', accent: '#44aa55' },
    { id: 'royal', name: 'Royal', description: 'Premium gold', accent: '#daa520' },
    { id: 'kids', name: 'Kids', description: 'Bright & playful', accent: '#ff6b9d' },
    { id: 'game', name: 'Game', description: 'Neon cyber', accent: '#00ffcc' },
    { id: 'romantic', name: 'Romantic', description: 'Soft & sweet', accent: '#ff6b9d' },
];

// Theme icon — geometric, no emoji (same approach as login page)
const ThemeIcon = ({ id, size = 14, color }: { id: string; size?: number; color: string }) => {
    const s = size;
    switch (id) {
        case 'dark':
            return <Airplay size={15} />;
        case 'horror':
            return <Ghost size={15} />;
        case 'forest':
            return <Trees size={15} />;
        case 'royal':
            return <ChessQueen size={15} />;
        case 'kids':
            return <Baby size={15} />;
        case 'game':
            return <Gamepad2 size={15} />;
        case 'romantic':
            return <MessageCircleHeart size={15} />;
        default:
            return <div style={{ width: s, height: s, borderRadius: '50%', background: color }} />;
    }
};

// Theme style configs (same as before, unchanged)
const getThemeStyles = (theme: string) => {
    switch (theme) {
        case 'horror':
            return {
                background: 'linear-gradient(160deg, #0a0505 0%, #1a0808 45%, #0d0505 100%)',
                headerBg: 'rgba(15, 5, 5, 0.92)',
                headerBorder: 'rgba(120, 20, 20, 0.35)',
                headerShadow: '0 2px 24px rgba(100, 0, 0, 0.4)',
                titleGradient: 'linear-gradient(135deg, #ff3333 0%, #990000 45%, #ff0000 100%)',
                messageBgMe: 'linear-gradient(135deg, #8b0000 0%, #cc0000 55%, #990000 100%)',
                messageBgOther: 'rgba(25, 8, 8, 0.92)',
                messageBorder: 'rgba(120, 30, 30, 0.4)',
                messageShadowMe: 'rgba(150, 0, 0, 0.5)',
                messageShadowOther: 'rgba(0, 0, 0, 0.4)',
                inputBg: 'rgba(20, 5, 5, 0.85)',
                inputBorder: 'rgba(120, 30, 30, 0.45)',
                footerBg: 'linear-gradient(to top, rgba(12, 4, 4, 0.98), rgba(15, 5, 5, 0.8))',
                footerBorder: 'rgba(120, 20, 20, 0.3)',
                sendBtnGradient: 'linear-gradient(135deg, #8b0000, #cc0000)',
                sendBtnShadow: 'rgba(150, 0, 0, 0.6)',
                textPrimary: 'rgba(255, 200, 200, 0.95)',
                textSecondary: 'rgba(200, 100, 100, 0.7)',
                textMuted: 'rgba(180, 80, 80, 0.5)',
                accentColor: '#cc0000',
                blobColors: ['rgba(150, 20, 20, 0.18)', 'rgba(100, 0, 0, 0.12)', 'rgba(80, 10, 10, 0.1)'],
                sparkleColor: 'rgba(255, 50, 50, 0.6)',
                avatarBorder: 'rgba(150, 30, 30, 0.65)',
                scrollbarThumb: 'rgba(150, 30, 30, 0.4)',
                iconBtnBg: 'rgba(40, 10, 10, 0.7)',
                iconBtnBorder: 'rgba(120, 30, 30, 0.35)',
                iconBtnColor: 'rgba(255, 150, 150, 0.75)',
                flickerAnimation: true,
                pulseGlow: true,
                // Couple BG config
                coupleOpacity: 0.18,
                coupleFilter: 'grayscale(40%) sepia(30%) saturate(1.5) hue-rotate(320deg) contrast(1.1)',
                coupleMaskStrength: 'aggressive',
                bgAnimationType: 'flicker',
            };
        case 'forest':
            return {
                background: 'linear-gradient(160deg, #0a1a10 0%, #0f2518 45%, #0a1812 100%)',
                headerBg: 'rgba(8, 25, 15, 0.92)',
                headerBorder: 'rgba(60, 140, 80, 0.3)',
                headerShadow: '0 2px 24px rgba(30, 100, 50, 0.3)',
                titleGradient: 'linear-gradient(135deg, #66cc77 0%, #339944 45%, #55bb66 100%)',
                messageBgMe: 'linear-gradient(135deg, #228833 0%, #44aa55 55%, #339944 100%)',
                messageBgOther: 'rgba(12, 28, 18, 0.92)',
                messageBorder: 'rgba(60, 120, 70, 0.35)',
                messageShadowMe: 'rgba(40, 120, 60, 0.5)',
                messageShadowOther: 'rgba(0, 0, 0, 0.3)',
                inputBg: 'rgba(12, 30, 20, 0.8)',
                inputBorder: 'rgba(60, 120, 70, 0.4)',
                footerBg: 'linear-gradient(to top, rgba(8, 20, 12, 0.98), rgba(10, 25, 15, 0.8))',
                footerBorder: 'rgba(60, 120, 70, 0.25)',
                sendBtnGradient: 'linear-gradient(135deg, #228833, #44aa55)',
                sendBtnShadow: 'rgba(40, 120, 60, 0.5)',
                textPrimary: 'rgba(200, 255, 210, 0.95)',
                textSecondary: 'rgba(120, 180, 130, 0.7)',
                textMuted: 'rgba(100, 160, 110, 0.5)',
                accentColor: '#44aa55',
                blobColors: ['rgba(60, 140, 80, 0.18)', 'rgba(40, 100, 60, 0.12)', 'rgba(30, 80, 50, 0.1)'],
                sparkleColor: 'rgba(140, 220, 150, 0.6)',
                avatarBorder: 'rgba(80, 160, 100, 0.55)',
                scrollbarThumb: 'rgba(80, 160, 100, 0.35)',
                iconBtnBg: 'rgba(15, 35, 22, 0.7)',
                iconBtnBorder: 'rgba(60, 120, 70, 0.35)',
                iconBtnColor: 'rgba(140, 200, 150, 0.75)',
                flickerAnimation: false,
                pulseGlow: false,
                coupleOpacity: 0.14,
                coupleFilter: 'grayscale(20%) sepia(20%) saturate(1.4) hue-rotate(90deg)',
                coupleMaskStrength: 'soft',
                bgAnimationType: 'breathe',
            };
        case 'royal':
            return {
                background: 'linear-gradient(160deg, #1a1020 0%, #201530 45%, #181028 100%)',
                headerBg: 'rgba(25, 18, 38, 0.92)',
                headerBorder: 'rgba(200, 160, 80, 0.35)',
                headerShadow: '0 2px 24px rgba(180, 140, 60, 0.25)',
                titleGradient: 'linear-gradient(135deg, #ffd700 0%, #daa520 45%, #ffcc00 100%)',
                messageBgMe: 'linear-gradient(135deg, #b8860b 0%, #daa520 55%, #cd9f32 100%)',
                messageBgOther: 'rgba(28, 22, 42, 0.92)',
                messageBorder: 'rgba(180, 140, 80, 0.35)',
                messageShadowMe: 'rgba(180, 140, 60, 0.5)',
                messageShadowOther: 'rgba(0, 0, 0, 0.3)',
                inputBg: 'rgba(30, 22, 45, 0.8)',
                inputBorder: 'rgba(180, 140, 80, 0.4)',
                footerBg: 'linear-gradient(to top, rgba(18, 12, 28, 0.98), rgba(22, 16, 35, 0.8))',
                footerBorder: 'rgba(180, 140, 80, 0.25)',
                sendBtnGradient: 'linear-gradient(135deg, #b8860b, #daa520)',
                sendBtnShadow: 'rgba(180, 140, 60, 0.5)',
                textPrimary: 'rgba(255, 240, 200, 0.95)',
                textSecondary: 'rgba(200, 170, 120, 0.7)',
                textMuted: 'rgba(180, 150, 100, 0.5)',
                accentColor: '#daa520',
                blobColors: ['rgba(200, 160, 80, 0.12)', 'rgba(180, 140, 60, 0.1)', 'rgba(160, 120, 50, 0.08)'],
                sparkleColor: 'rgba(255, 215, 0, 0.7)',
                avatarBorder: 'rgba(220, 180, 100, 0.6)',
                scrollbarThumb: 'rgba(200, 160, 80, 0.35)',
                iconBtnBg: 'rgba(35, 25, 50, 0.7)',
                iconBtnBorder: 'rgba(180, 140, 80, 0.35)',
                iconBtnColor: 'rgba(220, 180, 120, 0.75)',
                flickerAnimation: false,
                pulseGlow: true,
                coupleOpacity: 0.16,
                coupleFilter: 'grayscale(10%) sepia(40%) saturate(1.2) brightness(0.85)',
                coupleMaskStrength: 'medium',
                bgAnimationType: 'shimmer',
            };
        case 'kids':
            return {
                background: 'linear-gradient(160deg, #fff5e6 0%, #ffe6f0 45%, #e6f5ff 100%)',
                headerBg: 'rgba(255, 255, 255, 0.92)',
                headerBorder: 'rgba(255, 150, 200, 0.45)',
                headerShadow: '0 2px 24px rgba(255, 100, 150, 0.2)',
                titleGradient: 'linear-gradient(135deg, #ff6b9d 0%, #ffa726 45%, #42a5f5 100%)',
                messageBgMe: 'linear-gradient(135deg, #ff6b9d 0%, #ffa726 55%, #42a5f5 100%)',
                messageBgOther: 'rgba(255, 255, 255, 0.95)',
                messageBorder: 'rgba(255, 150, 180, 0.45)',
                messageShadowMe: 'rgba(255, 100, 150, 0.4)',
                messageShadowOther: 'rgba(200, 150, 200, 0.2)',
                inputBg: 'rgba(255, 252, 248, 0.95)',
                inputBorder: 'rgba(255, 150, 180, 0.5)',
                footerBg: 'linear-gradient(to top, rgba(255, 248, 245, 0.98), rgba(255, 250, 248, 0.8))',
                footerBorder: 'rgba(255, 150, 180, 0.35)',
                sendBtnGradient: 'linear-gradient(135deg, #ff6b9d, #ffa726)',
                sendBtnShadow: 'rgba(255, 100, 150, 0.4)',
                textPrimary: 'rgba(80, 50, 90, 0.95)',
                textSecondary: 'rgba(150, 100, 160, 0.8)',
                textMuted: 'rgba(180, 140, 190, 0.6)',
                accentColor: '#ff6b9d',
                blobColors: ['rgba(255, 150, 200, 0.3)', 'rgba(150, 200, 255, 0.3)', 'rgba(255, 200, 150, 0.3)'],
                sparkleColor: 'rgba(255, 100, 180, 0.8)',
                avatarBorder: 'rgba(255, 150, 200, 0.75)',
                scrollbarThumb: 'rgba(255, 150, 200, 0.45)',
                iconBtnBg: 'rgba(255, 245, 250, 0.9)',
                iconBtnBorder: 'rgba(255, 150, 180, 0.45)',
                iconBtnColor: 'rgba(200, 100, 150, 0.8)',
                flickerAnimation: false,
                pulseGlow: false,
                coupleOpacity: 0.12,
                coupleFilter: 'grayscale(5%) saturate(1.3) brightness(1.1)',
                coupleMaskStrength: 'soft',
                bgAnimationType: 'bounce',
            };
        case 'game':
            return {
                background: 'linear-gradient(160deg, #0a0a15 0%, #0f1020 45%, #080815 100%)',
                headerBg: 'rgba(10, 12, 25, 0.92)',
                headerBorder: 'rgba(0, 255, 200, 0.25)',
                headerShadow: '0 2px 24px rgba(0, 255, 200, 0.15), 0 0 40px rgba(255, 0, 200, 0.08)',
                titleGradient: 'linear-gradient(135deg, #00ffcc 0%, #ff00cc 45%, #00ccff 100%)',
                messageBgMe: 'linear-gradient(135deg, #00ccaa 0%, #cc00aa 55%, #00aacc 100%)',
                messageBgOther: 'rgba(12, 15, 28, 0.92)',
                messageBorder: 'rgba(0, 200, 180, 0.35)',
                messageShadowMe: 'rgba(0, 255, 200, 0.4)',
                messageShadowOther: 'rgba(0, 0, 0, 0.35)',
                inputBg: 'rgba(12, 15, 30, 0.85)',
                inputBorder: 'rgba(0, 200, 180, 0.4)',
                footerBg: 'linear-gradient(to top, rgba(8, 10, 18, 0.98), rgba(10, 12, 22, 0.8))',
                footerBorder: 'rgba(0, 200, 180, 0.25)',
                sendBtnGradient: 'linear-gradient(135deg, #00ccaa, #cc00aa)',
                sendBtnShadow: 'rgba(0, 255, 200, 0.4)',
                textPrimary: 'rgba(200, 255, 250, 0.95)',
                textSecondary: 'rgba(100, 200, 180, 0.7)',
                textMuted: 'rgba(80, 180, 160, 0.5)',
                accentColor: '#00ffcc',
                blobColors: ['rgba(0, 255, 200, 0.12)', 'rgba(255, 0, 200, 0.08)', 'rgba(0, 200, 255, 0.1)'],
                sparkleColor: 'rgba(0, 255, 200, 0.8)',
                avatarBorder: 'rgba(0, 255, 200, 0.55)',
                scrollbarThumb: 'rgba(0, 255, 200, 0.3)',
                iconBtnBg: 'rgba(15, 18, 35, 0.7)',
                iconBtnBorder: 'rgba(0, 200, 180, 0.35)',
                iconBtnColor: 'rgba(100, 255, 220, 0.75)',
                flickerAnimation: false,
                pulseGlow: true,
                coupleOpacity: 0.13,
                coupleFilter: 'grayscale(60%) hue-rotate(155deg) saturate(2) brightness(0.9) contrast(1.2)',
                coupleMaskStrength: 'aggressive',
                bgAnimationType: 'scan',
            };
        case 'romantic':
            return {
                background: 'linear-gradient(160deg, #2a1520 0%, #301828 45%, #251520 100%)',
                headerBg: 'rgba(35, 18, 28, 0.92)',
                headerBorder: 'rgba(255, 150, 180, 0.3)',
                headerShadow: '0 2px 24px rgba(255, 100, 150, 0.25)',
                titleGradient: 'linear-gradient(135deg, #ff8fa3 0%, #ff6b9d 45%, #ffb3c6 100%)',
                messageBgMe: 'linear-gradient(135deg, #e05080 0%, #ff6b9d 55%, #d04070 100%)',
                messageBgOther: 'rgba(38, 20, 30, 0.92)',
                messageBorder: 'rgba(255, 140, 170, 0.35)',
                messageShadowMe: 'rgba(255, 100, 150, 0.5)',
                messageShadowOther: 'rgba(0, 0, 0, 0.3)',
                inputBg: 'rgba(40, 22, 32, 0.8)',
                inputBorder: 'rgba(255, 140, 170, 0.4)',
                footerBg: 'linear-gradient(to top, rgba(30, 15, 22, 0.98), rgba(35, 18, 28, 0.8))',
                footerBorder: 'rgba(255, 140, 170, 0.25)',
                sendBtnGradient: 'linear-gradient(135deg, #e05080, #ff6b9d)',
                sendBtnShadow: 'rgba(255, 100, 150, 0.5)',
                textPrimary: 'rgba(255, 230, 240, 0.95)',
                textSecondary: 'rgba(255, 180, 200, 0.7)',
                textMuted: 'rgba(230, 160, 180, 0.5)',
                accentColor: '#ff6b9d',
                blobColors: ['rgba(255, 150, 180, 0.18)', 'rgba(255, 100, 150, 0.12)', 'rgba(255, 180, 200, 0.1)'],
                sparkleColor: 'rgba(255, 180, 200, 0.7)',
                avatarBorder: 'rgba(255, 150, 180, 0.55)',
                scrollbarThumb: 'rgba(255, 150, 180, 0.35)',
                iconBtnBg: 'rgba(45, 22, 35, 0.7)',
                iconBtnBorder: 'rgba(255, 140, 170, 0.35)',
                iconBtnColor: 'rgba(255, 180, 200, 0.75)',
                flickerAnimation: false,
                pulseGlow: true,
                coupleOpacity: 0.18,
                coupleFilter: 'grayscale(10%) sepia(20%) saturate(1.3) hue-rotate(330deg)',
                coupleMaskStrength: 'medium',
                bgAnimationType: 'pulse',
            };
        case 'light':
            return {
                background: 'linear-gradient(160deg, #fdf0f8 0%, #f5e8ff 35%, #e8eeff 70%, #e8f5ff 100%)',
                headerBg: 'rgba(255, 255, 255, 0.72)',
                headerBorder: 'rgba(210, 175, 240, 0.45)',
                headerShadow: '0 2px 24px rgba(170, 140, 220, 0.1)',
                titleGradient: 'linear-gradient(135deg, #9b30c0 0%, #7c3aed 50%, #4a6fd6 100%)',
                messageBgMe: 'linear-gradient(135deg, #b06ad4 0%, #8b5cf6 55%, #6b9ff5 100%)',
                messageBgOther: 'rgba(255, 255, 255, 0.88)',
                messageBorder: 'rgba(200, 170, 230, 0.5)',
                messageShadowMe: 'rgba(140, 100, 240, 0.3)',
                messageShadowOther: 'rgba(180, 150, 220, 0.14)',
                inputBg: 'rgba(255, 255, 255, 0.82)',
                inputBorder: 'rgba(195, 160, 230, 0.5)',
                footerBg: 'linear-gradient(to top, rgba(248, 242, 255, 0.98), rgba(248, 242, 255, 0.6))',
                footerBorder: 'rgba(210, 175, 240, 0.4)',
                sendBtnGradient: 'linear-gradient(135deg, #b06ad4, #8b5cf6)',
                sendBtnShadow: 'rgba(140, 100, 240, 0.4)',
                textPrimary: 'rgba(55, 25, 85, 0.92)',
                textSecondary: 'rgba(140, 100, 180, 0.65)',
                textMuted: 'rgba(155, 125, 190, 0.55)',
                accentColor: '#8b5cf6',
                blobColors: ['rgba(220, 180, 255, 0.35)', 'rgba(180, 210, 255, 0.38)', 'rgba(255, 200, 220, 0.3)'],
                sparkleColor: 'rgba(160, 120, 200, 0.6)',
                avatarBorder: 'rgba(200, 150, 230, 0.85)',
                scrollbarThumb: 'rgba(190, 160, 230, 0.4)',
                iconBtnBg: 'rgba(248, 240, 255, 0.75)',
                iconBtnBorder: 'rgba(200, 170, 230, 0.5)',
                iconBtnColor: 'rgba(140, 100, 190, 0.8)',
                flickerAnimation: false,
                pulseGlow: false,
                coupleOpacity: 0.10,
                coupleFilter: 'grayscale(20%) saturate(0.9) brightness(1.05)',
                coupleMaskStrength: 'soft',
                bgAnimationType: 'breathe',
            };
        default: // dark
            return {
                background: 'linear-gradient(160deg, #150e24 0%, #1c1230 45%, #161628 100%)',
                headerBg: 'rgba(28, 18, 50, 0.82)',
                headerBorder: 'rgba(170, 130, 230, 0.18)',
                headerShadow: '0 2px 24px rgba(0, 0, 0, 0.3)',
                titleGradient: 'linear-gradient(135deg, #f2ccff 0%, #d8b8ff 45%, #b8d8ff 100%)',
                messageBgMe: 'linear-gradient(135deg, #9b5de5 0%, #c77dff 55%, #7b9ff5 100%)',
                messageBgOther: 'rgba(42, 24, 72, 0.88)',
                messageBorder: 'rgba(170, 130, 230, 0.25)',
                messageShadowMe: 'rgba(155, 93, 229, 0.4)',
                messageShadowOther: 'rgba(0, 0, 0, 0.25)',
                inputBg: 'rgba(42, 22, 75, 0.75)',
                inputBorder: 'rgba(155, 110, 220, 0.3)',
                footerBg: 'linear-gradient(to top, rgba(20, 12, 38, 0.96), rgba(20, 12, 38, 0.7))',
                footerBorder: 'rgba(170, 130, 230, 0.18)',
                sendBtnGradient: 'linear-gradient(135deg, #9b5de5, #c77dff)',
                sendBtnShadow: 'rgba(155, 93, 229, 0.5)',
                textPrimary: 'rgba(235, 220, 255, 0.95)',
                textSecondary: 'rgba(200, 170, 240, 0.5)',
                textMuted: 'rgba(180, 150, 220, 0.45)',
                accentColor: '#c77dff',
                blobColors: ['rgba(180, 120, 240, 0.15)', 'rgba(100, 160, 240, 0.12)', 'rgba(220, 140, 180, 0.1)'],
                sparkleColor: 'rgba(200, 170, 255, 0.6)',
                avatarBorder: 'rgba(180, 140, 230, 0.35)',
                scrollbarThumb: 'rgba(170, 130, 230, 0.3)',
                iconBtnBg: 'rgba(50, 28, 82, 0.6)',
                iconBtnBorder: 'rgba(170, 130, 230, 0.28)',
                iconBtnColor: 'rgba(200, 170, 250, 0.75)',
                flickerAnimation: false,
                pulseGlow: false,
                coupleOpacity: 0.12,
                coupleFilter: 'grayscale(30%) saturate(1.2)',
                coupleMaskStrength: 'medium',
                bgAnimationType: 'breathe',
            };
    }
};

// ─── Couple Background Component ──────────────────────────────────────────────
// Shows the theme-specific couple image as a centered background in the chat area
// with theme-driven opacity, filter, fade mask, and CSS animation.
const CoupleChatBackground = ({
    theme,
    styles,
}: {
    theme: ThemeId;
    styles: ReturnType<typeof getThemeStyles>;
}) => {
    const src = getChatCoupleSrc(theme);
    const { coupleOpacity, coupleFilter, coupleMaskStrength, bgAnimationType } = styles as any;

    // Build the webkit-mask based on strength
    const getMask = (strength: string) => {
        switch (strength) {
            case 'aggressive':
                return `
                    linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%),
                    linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)
                `;
            case 'soft':
                return `
                    linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%),
                    linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)
                `;
            case 'medium':
            default:
                return `
                    linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%),
                    linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)
                `;
        }
    };

    const mask = getMask(coupleMaskStrength);

    // Choose animation class based on bgAnimationType
    const animClass = `couple-bg-anim-${bgAnimationType}`;

    return (
        <>
            <style>{`
                /* Base couple BG wrapper */
                .couple-chat-bg-wrap {
                    position: fixed;
                    inset: 0;
                    z-index: 0;
                    pointer-events: none;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    top: 100px;
                }

                .couple-chat-bg-img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    object-position: center center;
                    opacity: ${coupleOpacity};
                    filter: ${coupleFilter};
                    -webkit-mask-image: ${mask};
                    -webkit-mask-composite: intersect;
                    mask-image: ${mask};
                    mask-composite: intersect;
                    transform-origin: center center;
                    transition: opacity 0.8s ease, filter 0.8s ease;
                }

                /* Mobile: cover mode so it fills without gaps */
                @media (max-width: 767px) {
                    .couple-chat-bg-img {
                        object-fit: cover;
                        width: 100%;
                        height: 100%;
                        object-position: top center;
                    }
                }

                /* Laptop: contained + centered, max size */
                @media (min-width: 768px) {
                    .couple-chat-bg-img {
                        object-fit: contain;
                        max-width: 680px;
                        max-height: 90%;
                        width: auto;
                        height: auto;
                    }
                }

                /* ─── Animation: breathe (default/forest/light) ─── */
                @keyframes couple-breathe {
                    0%, 100% { transform: scale(1.00) translateY(0px);   opacity: ${coupleOpacity}; }
                    50%       { transform: scale(1.04) translateY(-6px);  opacity: ${coupleOpacity * 0.75}; }
                }
                .couple-bg-anim-breathe .couple-chat-bg-img {
                    animation: couple-breathe 9s ease-in-out infinite;
                }

                /* ─── Animation: flicker (horror) ─── */
                @keyframes couple-flicker {
                    0%,100% { opacity: ${coupleOpacity};       transform: scale(1.00); }
                    20%     { opacity: ${coupleOpacity * 0.4}; transform: scale(1.005); }
                    40%     { opacity: ${coupleOpacity * 0.9}; transform: scale(1.01); }
                    60%     { opacity: ${coupleOpacity * 0.3}; transform: scale(0.999); }
                    80%     { opacity: ${coupleOpacity * 0.8}; transform: scale(1.003); }
                }
                .couple-bg-anim-flicker .couple-chat-bg-img {
                    animation: couple-flicker 4s ease-in-out infinite;
                }

                /* ─── Animation: shimmer (royal) ─── */
                @keyframes couple-shimmer {
                    0%,100% { opacity: ${coupleOpacity};       filter: ${coupleFilter} brightness(1.0); transform: scale(1.01); }
                    50%     { opacity: ${coupleOpacity * 1.35}; filter: ${coupleFilter} brightness(1.25); transform: scale(1.04); }
                }
                .couple-bg-anim-shimmer .couple-chat-bg-img {
                    animation: couple-shimmer 6s ease-in-out infinite;
                }

                /* ─── Animation: bounce (kids) ─── */
                @keyframes couple-bounce {
                    0%,100% { transform: scale(1.00) translateY(0px); }
                    30%     { transform: scale(1.03) translateY(-10px); }
                    60%     { transform: scale(0.98) translateY(4px); }
                }
                .couple-bg-anim-bounce .couple-chat-bg-img {
                    animation: couple-bounce 5s cubic-bezier(0.34,1.56,0.64,1) infinite;
                }

                /* ─── Animation: scan (game/neon) ─── */
                @keyframes couple-scan {
                    0%     { transform: scale(1.00); filter: ${coupleFilter}; }
                    25%    { transform: scale(1.02); filter: ${coupleFilter} hue-rotate(20deg) brightness(1.15); }
                    50%    { transform: scale(1.01); filter: ${coupleFilter} hue-rotate(40deg) brightness(0.9); }
                    75%    { transform: scale(1.03); filter: ${coupleFilter} hue-rotate(-20deg) brightness(1.2); }
                    100%   { transform: scale(1.00); filter: ${coupleFilter}; }
                }
                .couple-bg-anim-scan .couple-chat-bg-img {
                    animation: couple-scan 6s linear infinite;
                }

                /* ─── Animation: pulse (romantic) ─── */
                @keyframes couple-pulse {
                    0%,100% { opacity: ${coupleOpacity};        transform: scale(1.00); filter: ${coupleFilter}; }
                    40%     { opacity: ${coupleOpacity * 1.4};  transform: scale(1.03); filter: ${coupleFilter} brightness(1.15) saturate(1.3); }
                    80%     { opacity: ${coupleOpacity * 0.8};  transform: scale(0.99); filter: ${coupleFilter} brightness(0.9); }
                }
                .couple-bg-anim-pulse .couple-chat-bg-img {
                    animation: couple-pulse 7s ease-in-out infinite;
                }
            `}</style>

            <div className={`couple-chat-bg-wrap ${animClass}`}>
                <img
                    src={src}
                    alt=""
                    aria-hidden="true"
                    className="couple-chat-bg-img"
                />
            </div>
        </>
    );
};

// ─── Theme Selector ────────────────────────────────────────────────────────────
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
                whileHover={{ scale: 1.04, backgroundColor: `${styles.accentColor}14` }}
                whileTap={{ scale: 0.96 }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    gap: 10,
                    padding: '11px 14px',
                    borderRadius: 0,
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: styles.textPrimary,
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                }}
            >

                <ThemeIcon id={currentTheme} size={6} color={styles.textSecondary} />
                <span style={{
                    color: styles.textPrimary,
                    flex: 1,
                    minWidth: 0,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}>
                    {currentThemeData.name}
                </span>

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
                            top: '100%',
                            marginTop: 6,
                            right: 0,
                            background: styles.iconBtnBg,
                            backdropFilter: 'blur(24px)',
                            WebkitBackdropFilter: 'blur(24px)',
                            border: `1.5px solid ${styles.iconBtnBorder}`,
                            borderRadius: 16,
                            boxShadow: styles.headerShadow,
                            overflow: 'hidden',
                            minWidth: 200,
                            zIndex: 100,
                            padding: '6px 0',
                        }}
                    >
                        <div style={{
                            padding: '8px 14px 6px',
                            fontSize: 9,
                            fontWeight: 800,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: styles.textSecondary,
                            borderBottom: `1px solid ${styles.iconBtnBorder}`,
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
                                        borderLeft: isActive ? `2.5px solid ${styles.accentColor}` : `2.5px solid transparent`,
                                        cursor: isDisabled ? 'not-allowed' : 'pointer',
                                        color: isDisabled ? styles.textSecondary : styles.textPrimary,
                                        fontFamily: "'Nunito', sans-serif",
                                        fontSize: 12.5,
                                        fontWeight: isActive ? 800 : 600,
                                        textAlign: 'left',
                                        opacity: isDisabled ? 0.4 : 1,
                                    }}
                                >
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
                                            width="12"
                                            height="12"
                                            viewBox="0 0 12 12"
                                            fill="none"
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

// ─── Header Menu ───────────────────────────────────────────────────────────────
const HeaderMenu = ({
    styles, refreshing, onRefresh, onLogout, currentTheme, onThemeChange,
}: {
    styles: ReturnType<typeof getThemeStyles>;
    refreshing: boolean;
    onRefresh: () => void;
    onLogout: () => void;
    currentTheme: string;
    onThemeChange: (theme: string) => void;
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

    const handleThemeChange = (nextTheme: string) => {
        onThemeChange(nextTheme);
        setOpen(false); // close the "⋮" menu after selecting a theme
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <motion.button
                className="icon-btn"
                onClick={onRefresh}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Refresh"
                style={{
                    width: 36, height: 36, borderRadius: '50%',
                    border: `1.5px solid ${styles.iconBtnBorder}`,
                    background: styles.iconBtnBg, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: styles.iconBtnColor,
                }}
            >
                <RefreshCw size={14} style={{ animation: refreshing ? 'spin 0.5s linear infinite' : 'none' }} />
            </motion.button>

            <div ref={ref} style={{ position: 'relative' }}>
                <motion.button
                    className="icon-btn"
                    onClick={() => setOpen(o => !o)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="More options"
                    style={{
                        width: 36, height: 36, borderRadius: '50%',
                        border: `1.5px solid ${styles.iconBtnBorder}`,
                        background: styles.iconBtnBg, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: styles.iconBtnColor, fontWeight: 900, fontSize: 16,
                    }}
                >
                    ⋮
                </motion.button>

                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.88, y: -6 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.88, y: -6 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                            style={{
                                position: 'absolute', top: 44, right: 0,
                                background: styles.headerBg, backdropFilter: 'blur(20px)',
                                border: `1.5px solid ${styles.headerBorder}`,
                                borderRadius: 14, boxShadow: styles.headerShadow,
                                overflow: 'visible', minWidth: 130, zIndex: 50,
                            }}
                        >
                            <div >
                                <ThemeSelector currentTheme={currentTheme} onThemeChange={handleThemeChange} styles={styles} />
                            </div>
                            <motion.button
                                onClick={() => { onLogout(); setOpen(false); }}
                                whileHover={{ background: 'rgba(220, 80, 80, 0.12)' }}
                                style={{
                                    width: '100%', padding: '11px 14px',
                                    display: 'flex', alignItems: 'center', gap: 10,
                                    background: 'transparent', border: 'none', cursor: 'pointer',
                                    color: 'rgba(255, 140, 140, 0.85)',
                                    fontFamily: "'Nunito', sans-serif", fontSize: 12, fontWeight: 700,
                                }}
                            >
                                <LogOut size={13} />
                                Logout
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

// ─── Floating Shapes ────────────────────────────────────────────────────────────
const FloatingShapes = ({ styles }: { styles: ReturnType<typeof getThemeStyles> }) => (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <motion.div
            animate={{
                y: [0, -22, 0],
                opacity: styles.flickerAnimation ? [0.3, 0.6, 0.2, 0.5, 0.3] : [0.3, 0.55, 0.3],
            }}
            transition={{ duration: styles.flickerAnimation ? 3 : 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
                position: 'absolute', top: '8%', left: '8%',
                width: 220, height: 220, borderRadius: '50%',
                background: styles.blobColors[0], filter: 'blur(55px)',
            }}
        />
        <motion.div
            animate={{
                y: [0, 18, 0],
                opacity: styles.flickerAnimation ? [0.2, 0.5, 0.15, 0.4, 0.2] : [0.2, 0.4, 0.2],
            }}
            transition={{ duration: styles.flickerAnimation ? 4 : 7, repeat: Infinity, ease: 'easeInOut' }}
            style={{
                position: 'absolute', bottom: '12%', right: '10%',
                width: 280, height: 280, borderRadius: '50%',
                background: styles.blobColors[1], filter: 'blur(60px)',
            }}
        />
        <motion.div
            animate={{ y: [0, -12, 0], x: [0, 10, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            style={{
                position: 'absolute', top: '45%', right: '28%',
                width: 160, height: 160, borderRadius: '50%',
                background: styles.blobColors[2], filter: 'blur(40px)',
            }}
        />
        {[
            { top: '12%', left: '4%', delay: 0 },
            { top: '35%', right: '4%', delay: 1.3 },
            { bottom: '28%', left: '3%', delay: 2.1 },
        ].map((pos, i) => (
            <motion.span
                key={i}
                animate={{
                    opacity: styles.flickerAnimation ? [0.15, 0.8, 0.1, 0.6, 0.15] : [0.15, 0.7, 0.15],
                    scale: [0.8, 1.2, 0.8],
                }}
                transition={{ duration: styles.flickerAnimation ? 2 : 3.5, repeat: Infinity, delay: pos.delay }}
                style={{ position: 'absolute', fontSize: 14, color: styles.sparkleColor, userSelect: 'none', ...pos } as React.CSSProperties}
            >
                ✦
            </motion.span>
        ))}
    </div>
);

// ─── Horror Effects ─────────────────────────────────────────────────────────────
const HorrorEffects = ({ isHorror }: { isHorror: boolean }) => {
    if (!isHorror) return null;
    return (
        <>
            {[...Array(4)].map((_, i) => (
                <motion.div
                    key={`drip-${i}`}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: ['0%', '100%'], opacity: [0, 0.5, 0.5, 0] }}
                    transition={{ duration: 10 + Math.random() * 5, repeat: Infinity, delay: i * 3, ease: 'linear' }}
                    style={{
                        position: 'fixed', top: 0, left: `${15 + i * 25}%`,
                        width: 2, height: 50,
                        background: 'linear-gradient(to bottom, transparent, rgba(150, 0, 0, 0.4), transparent)',
                        borderRadius: 2, pointerEvents: 'none', zIndex: 0,
                    }}
                />
            ))}
            <div style={{
                position: 'fixed', inset: 0,
                background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.5) 100%)',
                pointerEvents: 'none', zIndex: 0,
            }} />
            <motion.div
                animate={{ opacity: [0.03, 0.1, 0.03] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                    position: 'fixed', inset: 0,
                    background: 'radial-gradient(ellipse at center, rgba(150, 0, 0, 0.15), transparent 70%)',
                    pointerEvents: 'none', zIndex: 0,
                }}
            />
        </>
    );
};

// ─── Avatar ─────────────────────────────────────────────────────────────────────
const Avatar = ({ user, size = 36, styles, src }: {
    user: string; size?: number; styles: ReturnType<typeof getThemeStyles>; src: string;
}) => {
    const [imgError, setImgError] = useState(false);
    const fallback = user === 'ashu' ? '🌟' : '🌙';

    return (
        <div style={{
            width: size, height: size, borderRadius: '50%',
            overflow: 'hidden', flexShrink: 0,
            border: `2px solid ${styles.avatarBorder}`,
            background: styles.inputBg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 2px 10px ${styles.messageShadowOther}`,
        }}>
            {!imgError ? (
                <img src={src} alt={user} onError={() => setImgError(true)}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
                <span style={{ fontSize: size * 0.44 }}>{fallback}</span>
            )}
        </div>
    );
};

// ─── Chat Bubble ─────────────────────────────────────────────────────────────────
const ChatBubble = ({ msg, isMe, styles, isHorror, avatarSet }: {
    msg: Message; isMe: boolean; styles: ReturnType<typeof getThemeStyles>;
    isHorror: boolean; avatarSet: ReturnType<typeof getChatAvatarSet>;
}) => {
    const senderLabel = msg.sender === 'ashu' ? 'Ashu' : 'Chiku';
    const avatarSrc = msg.sender === 'ashu' ? avatarSet.chat.ashu : avatarSet.chat.chiku;

    return (
        <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ type: 'spring', stiffness: 380, damping: 26 }}
            style={{ display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start', width: '100%', marginBottom: 14 }}
        >
            <div style={{ display: 'flex', flexDirection: isMe ? 'row-reverse' : 'row', alignItems: 'flex-end', gap: 8, maxWidth: '78%' }}>
                <Avatar user={msg.sender} styles={styles} src={avatarSrc} />

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start' }}>
                    <span style={{
                        fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase',
                        color: styles.textSecondary, marginBottom: 4,
                        paddingLeft: isMe ? 0 : 4, paddingRight: isMe ? 4 : 0,
                    }}>
                        {senderLabel}
                    </span>

                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        style={{
                            padding: msg.image ? '6px' : '10px 16px',
                            borderRadius: 22,
                            borderBottomRightRadius: isMe ? 6 : 22,
                            borderBottomLeftRadius: isMe ? 22 : 6,
                            background: isMe ? styles.messageBgMe : styles.messageBgOther,
                            border: isMe ? 'none' : `1.5px solid ${styles.messageBorder}`,
                            boxShadow: isMe ? `0 4px 18px ${styles.messageShadowMe}` : `0 3px 12px ${styles.messageShadowOther}`,
                            backdropFilter: 'blur(12px)',
                            maxWidth: '100%',
                            ...(isHorror && !isMe ? { animation: 'subtlePulse 4s ease-in-out infinite' } : {}),
                        }}
                    >
                        {msg.image && (
                            <img src={msg.image} alt="Shared"
                                style={{ maxWidth: '100%', maxHeight: 240, borderRadius: 16, display: 'block' }} />
                        )}
                        {msg.content && msg.content !== '(Shared an image)' && (
                            <p style={{
                                fontSize: 15, fontWeight: 600, lineHeight: 1.5, margin: 0,
                                color: isMe ? 'rgba(255, 255, 255, 0.97)' : styles.textPrimary,
                            }}>
                                {msg.content}
                            </p>
                        )}
                    </motion.div>

                    <span style={{
                        fontSize: 9.5, fontWeight: 700, marginTop: 4,
                        color: styles.textMuted, paddingLeft: isMe ? 0 : 4, paddingRight: isMe ? 4 : 0,
                    }}>
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

// ─── Main Chat Page ────────────────────────────────────────────────────────────
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
    const { theme, resolvedTheme, setTheme } = useTheme();

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


    const currentTheme = resolvedTheme || theme || 'dark';
    const styles = getThemeStyles(currentTheme);
    const isHorror = currentTheme === 'horror';
    const avatarSet = getChatAvatarSet(currentTheme);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Pacifico&family=Creepster&display=swap');
                * { box-sizing: border-box; margin: 0; padding: 0; }

                .chat-root {
                    height: 100svh;
                    display: flex;
                    flex-direction: column;
                    font-family: 'Nunito', sans-serif;
                    overflow: hidden;
                    background: ${styles.background};
                    transition: background 0.5s ease;
                }

                ${isHorror ? `
                    .chat-root::before {
                        content: '';
                        position: fixed;
                        inset: 0;
                        background: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
                        opacity: 0.03;
                        pointer-events: none;
                        z-index: 0;
                    }

                    @keyframes subtlePulse {
                        0%, 100% { box-shadow: 0 3px 12px rgba(0, 0, 0, 0.4); }
                        50% { box-shadow: 0 3px 16px rgba(100, 0, 0, 0.3); }
                    }
                ` : ''}

                /* Messages scroll area — relative so the bg image sits inside it */
                .messages-scroll {
                    flex: 1;
                    overflow-y: auto;
                    padding: 1.1rem 1rem;
                    position: relative;
                    z-index: 1;
                }

                .messages-scroll::-webkit-scrollbar { width: 3px; }
                .messages-scroll::-webkit-scrollbar-thumb {
                    background: ${styles.scrollbarThumb};
                    border-radius: 3px;
                }

                /* Messages sit above the background image */
                .messages-content {
                    position: relative;
                    z-index: 2;
                }

                .msg-input {
                    flex: 1;
                    background: transparent;
                    border: none;
                    outline: none;
                    font-family: 'Nunito', sans-serif;
                    font-size: 15px;
                    font-weight: 600;
                    color: ${styles.textPrimary};
                    min-width: 0;
                }

                .msg-input::placeholder {
                    color: ${styles.textMuted};
                    font-weight: 500;
                }

                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @keyframes horrorFlicker {
                    0%, 100% { opacity: 1; }
                    92% { opacity: 1; }
                    93% { opacity: 0.7; }
                    94% { opacity: 1; }
                    96% { opacity: 0.85; }
                    97% { opacity: 1; }
                }
            `}</style>

            <div className="chat-root">
                <FloatingShapes styles={styles} />
                <HorrorEffects isHorror={isHorror} />

                {/* Header */}
                <motion.header
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        position: 'relative', zIndex: 10,
                        padding: '0.85rem 1.1rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        background: styles.headerBg, backdropFilter: 'blur(24px)',
                        borderBottom: `1.5px solid ${styles.headerBorder}`,
                        boxShadow: styles.headerShadow,
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <motion.div style={{ zIndex: 2, position: 'relative' }} whileHover={{ scale: 1.05 }}>
                                <img src={avatarSet.header.chiku} alt="Chiku" style={{
                                    width: 72, height: 72, borderRadius: '50%', objectFit: 'cover',
                                    border: `3px solid ${styles.avatarBorder}`,
                                    boxShadow: `0 4px 18px ${styles.messageShadowOther}`,
                                }} />
                            </motion.div>
                            <motion.div style={{ marginLeft: -12, zIndex: 1, position: 'relative' }} whileHover={{ scale: 1.05 }}>
                                <img src={avatarSet.header.ashu} alt="Ashu" style={{
                                    width: 72, height: 72, borderRadius: '50%', objectFit: 'cover',
                                    border: `3px solid ${styles.avatarBorder}`,
                                    boxShadow: `0 4px 16px ${styles.messageShadowOther}`,
                                }} />
                            </motion.div>
                        </div>
                        <div>
                            <motion.div
                                key={currentTheme}
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{
                                    fontFamily: isHorror ? "'Creepster', cursive" : "'Pacifico', cursive",
                                    fontSize: isHorror ? '1.35rem' : '1.22rem',
                                    lineHeight: 1, display: 'inline-block',
                                    background: styles.titleGradient,
                                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                                    ...(isHorror ? { animation: 'horrorFlicker 4s ease-in-out infinite' } : {}),
                                }}
                            >
                                {isHorror ? 'The Darkness' : 'Our Space'}
                            </motion.div>
                            <div style={{ fontSize: 11, fontWeight: 700, marginTop: 2, color: styles.textSecondary, letterSpacing: '0.03em' }}>
                                Chatting as{' '}
                                <span style={{ color: styles.textPrimary }}>
                                    {currentUser === 'ashu' ? 'Ashu' : 'Chiku'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <HeaderMenu
                        styles={styles} refreshing={refreshing}
                        onRefresh={handleRefresh} onLogout={handleLogout}
                        currentTheme={currentTheme} onThemeChange={setTheme}
                    />
                </motion.header>

                {/* Messages — contains the couple BG inside */}
                <div className="messages-scroll">
                    {/* ── Couple Background Image ── */}
                    <CoupleChatBackground key={currentTheme} theme={currentTheme as ThemeId} styles={styles} />

                    {/* ── Messages content sits above the BG ── */}
                    <div className="messages-content">
                        {pageLoading ? (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: 10 }}>
                                <motion.div animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 1.4, repeat: Infinity }}>
                                    <Sparkles size={28} style={{ color: styles.accentColor }} />
                                </motion.div>
                                <span style={{ fontSize: 14, fontWeight: 600, color: styles.textSecondary }}>
                                    {isHorror ? 'Summoning the darkness...' : 'Fetching our memories...'}
                                </span>
                            </div>
                        ) : messages.length === 0 ? (
                            <div style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center',
                                justifyContent: 'center', height: '60vh', gap: 12, padding: '4rem 2rem',
                            }}>
                                <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                                    <span style={{ fontSize: 52, opacity: 0.35 }}>{isHorror ? '💀' : '💕'}</span>
                                </motion.div>
                                <p style={{
                                    fontFamily: isHorror ? "'Creepster', cursive" : "'Pacifico', cursive",
                                    fontSize: 20, color: styles.textSecondary,
                                }}>
                                    {isHorror ? 'Whisper into the void...' : 'Say something sweet...'}
                                </p>
                                <p style={{ fontSize: 13, fontWeight: 600, color: styles.textMuted }}>
                                    Start your conversation with {otherUser} {isHorror ? '🩸' : '✨'}
                                </p>
                            </div>
                        ) : (
                            <AnimatePresence>
                                {messages.map((msg) => (
                                    <ChatBubble
                                        key={msg._id} msg={msg}
                                        isMe={msg.sender === currentUser}
                                        styles={styles} isHorror={isHorror}
                                        avatarSet={avatarSet}
                                    />
                                ))}
                            </AnimatePresence>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input Area */}
                <motion.footer
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    style={{
                        position: 'relative', zIndex: 10,
                        padding: '0.8rem 1rem',
                        background: styles.footerBg,
                        borderTop: `1.5px solid ${styles.footerBorder}`,
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
                                    border: `2px solid ${styles.messageBorder}`,
                                }} />
                                <motion.button
                                    whileHover={{ scale: 1.15, rotate: 10 }}
                                    onClick={() => setImagePreview(null)}
                                    style={{
                                        position: 'absolute', top: -8, right: -8,
                                        width: 22, height: 22, borderRadius: '50%',
                                        background: styles.sendBtnGradient, border: 'none',
                                        color: 'white', fontSize: 10, fontWeight: 900,
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
                            background: styles.inputBg, backdropFilter: 'blur(16px)',
                            borderRadius: 28, border: `1.5px solid ${styles.inputBorder}`,
                            boxShadow: `0 4px 20px ${styles.messageShadowOther}`,
                        }}
                    >
                        <input type="file" ref={fileInputRef} onChange={handleImageUpload}
                            accept="image/*,.gif" style={{ display: 'none' }} />

                        <motion.button
                            type="button" onClick={() => fileInputRef.current?.click()}
                            disabled={sending} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                            style={{
                                width: 36, height: 36, borderRadius: '50%',
                                border: 'none', background: 'transparent',
                                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: styles.iconBtnColor,
                            }}
                        >
                            <ImageIcon size={18} />
                        </motion.button>

                        <input
                            type="text" className="msg-input"
                            placeholder={isHorror ? `Summon ${otherUser}... 🩸` : `Write to ${otherUser}... 💌`}
                            value={input} onChange={(e) => setInput(e.target.value)}
                            disabled={sending} autoComplete="off"
                        />

                        <motion.button
                            type="submit"
                            disabled={sending || (!input.trim() && !imagePreview)}
                            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.94 }}
                            style={{
                                width: 42, height: 42, borderRadius: '50%',
                                border: 'none', cursor: 'pointer',
                                background: styles.sendBtnGradient,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'white', boxShadow: `0 4px 16px ${styles.sendBtnShadow}`,
                                opacity: sending || (!input.trim() && !imagePreview) ? 0.45 : 1,
                            }}
                        >
                            {sending ? (
                                <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                                    {[0, 1, 2].map((i) => (
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
        </>
    );
}