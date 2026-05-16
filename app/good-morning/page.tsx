'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Music } from 'lucide-react';

const GoodMorningPage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [autoPlay, setAutoPlay] = useState(false);
    const [hearts, setHearts] = useState<{ left: number; x: number; duration: number; delay: number }[]>([]);
    const [mounted, setMounted] = useState(false);
    const [petals, setPetals] = useState<{ left: number; duration: number; delay: number }[]>([]);

    useEffect(() => {
        setMounted(true);
        setHearts(
            Array.from({ length: 15 }).map((_, i) => ({
                left: Math.random() * 100,
                x: Math.random() * 200 - 100,
                duration: 6 + Math.random() * 4,
                delay: i * 0.3,
            }))
        );
        setPetals(
            Array.from({ length: 8 }).map((_, i) => ({
                left: Math.random() * 100,
                duration: 8 + Math.random() * 5,
                delay: i * 0.6,
            }))
        );
    }, []);

    // Midnight Confession Section
    const confessionContent = {
        title: "Aapko laga main so gya...",
        subtitle: "par main jaag raha tha.",
        messages: [
            "I am Sorry bas reply thoda late hua… par dil poori raat aapke saath hi tha.",
            "Aap naraz hokar so gaye… aur main aapko haste hue uthana chahta tha.",
            "Isliye maine puri neend nahi li… maine yeh raat aapke liye bana di.",
        ]
    };

    // While You Were Sleeping Carousel
    const whileYouSleptSlides = [
        {
            title: "Meri imaginary duniya meri duniya ke sath...",
            desc: "Ye surpise banate waqt bas aapko hi soch raha tha, Jese ki aap meri lap me beithe ho, aur me ye bana raha.",
            images: ['/daily/GM/coding-1.jpg', '/daily/GM/coding-2.jpg'],
        },
        {
            title: "Aapke pyare msgs...",
            desc: "Aapka pyaare messages dekhe... aur smile karne laga. Sone se pehle bhi aap hi ho.",
            images: ['/daily/GM/smile.jpg'],
        },
        {
            title: "Imagining You",
            desc: "Socha raha hoon ke agar main paas hota toh abhi aapko apni baahon mein leta.",
            images: ['/daily/GM/cuddle.jpg'],
        },
        // {
        //     title: "Coffee & Coding",
        //     desc: "Subah 3 baje coffee banaya... thandi ho gayi bas aapko dekhe bina.",
        //     images: ['/daily/GM/coffee-night.jpg'],
        // },
        {
            title: "While You Were Sleeping",
            desc: "Aap chain se so rahe the... aur main bas dheere se aapke forehead pe kiss karke aapko apni baahon me aur paas kheench leta.",
            images: ['/daily/GM/forehead.jpg', '/daily/GM/cuddle-2.jpg'],
        },
    ];

    // Good Morning Section - Romantic Morning Routine
    const goodMorningMoments = [
        {
            // emoji: "😴",
            title: "Sleepy Cuddles",
            desc: "Subah aankh khulte hi... aapko aur paas kheench lena, bas kuch aur der aise hi baahon mein rehna.",
            hinglish: "Subah ki pehli cheez jo main mehsoos karna chahta hoon… woh aap ho.",
            images: ['/daily/GM/morning-cuddle-1.jpg', '/daily/GM/morning-cuddle-2.jpg'],
        },
        {
            // emoji: "💋",
            title: "Forehead & Cheek Kisses",
            desc: "Aap abhi aadhi neend mein ho... aur main dheere se aapke forehead pe kiss karke, phir cheek pe ek pyaara sa kiss deta.",
            hinglish: "Aapko uthana bhi ho… toh sirf pyaar se.",
            images: ['/daily/GM/forehead-2.jpg', '/daily/GM/cheek.jpg'],
        },
        {
            // emoji: "🤗",
            title: "5 Minutes More",
            desc: "Aap bolte ho ‘bas 5 minute aur’... aur main haste hue bas aapko hug karke wahi ruk jaata hoon.",
            hinglish: "Ye extra 5 minute hi toh meri favorite subah hoti.",
            images: ['/daily/GM/couple-cuddle.jpg', '/daily/GM/cuddle-3.jpg'],
        },
        {
            // emoji: "☕",
            title: "Coffee for Chiku",
            desc: "Aapko sleepy ankhon se dekhte hue... coffee banata hoon, Imagine karke ki aap yahi ho, par coffee thandi ho jaati hai bas aapko dekhte dekhte.",
            hinglish: "Coffee thandi ho jaati… par aapko dekhte rehne ka mann nahi.",
            images: ['/daily/GM/coffee2.jpg', '/daily/GM/coffee.jpg'],
        },
        {
            // emoji: "💆",
            title: "Hair Drying & Little Talks to chiku",
            desc: "Aap Naha ke aate ho toh aapke baal dry karke set karta... aur aapki choti choti baatein sunta rehta.",
            hinglish: "Aapki har choti baat... subah aur pyaari bana deti hai.",
            images: ['/daily/GM/dry.jpg', , '/daily/GM/hairs.jpg'],
        },
        {
            // emoji: "🍳",
            title: "Brekfast for my pyaali chiku... ",
            desc: "Breakfast banate hue aap peeche se hug karte ho...aur ek cheek kiss karte ho... aur main sab kuch bhool jaata hoon.",
            hinglish: "Aapke paas kitchen mein… breakfast se zyada aap important lagte ho.",
            images: ['/daily/GM/bf.jpg', '/daily/GM/bf2.jpg'],
        },
        {
            // emoji: "💃",
            title: "Dance with my baby in the Kitchen",
            desc: "Oversized hoodie mein, dim si morning light mein... bina music ke bas dheere dheere dance karte hain aur shayad breakfast gira dete 🤭.",
            hinglish: "Aapke saath hoon toh kisi gaane ki zarurat nahi.",
            images: ['/daily/GM/kitchen.mp4', '/daily/GM/kitchen.gif'],
        },
        {
            // emoji: "🌅",
            title: "Sunrise with my sunshine",
            desc: "Haath pakad ke balcony mein jaate hain...Aapka hand hold karke aur aapko apni baaho me rakh ke sunrise ke saath bas aapko dekhta rehta hoon.",
            hinglish: "Sunrise khoobsurat hai… par aapse zyada nahi.",
            images: ['/daily/GM/sunrise.jpg', '/daily/GM/sunrise2.jpg'],
        },
        {
            // emoji: "❤️",
            title: "Before The Day Begins",
            desc: "Office jane se pehle... ek tight hug, cheek pe kiss, aur dheere se ‘I love you’ kehna.",
            hinglish: "Bas aise hi har subah aapke saath shuru ho… toh din perfect ho.",
            images: ['/daily/GM/bye.jpg', '/daily/GM/bye2.jpg'],
        },
    ];

    // Real Reason Section
    const realReasonMessages = [
        "Late aaya tha… par aapse door nahi tha kabhi.",
        "Har second bas aapko hi soch raha tha.",
        "Aap so gaye… par meri raat tab shuru hui.",
        "Main bas aapko special feel karwana chahta tha.",
        "Yeh sab sirf sorry bolne ke liye nahi…",
        "Yeh mera bas ek chhota sa pyaar dikhane ki koshish hai jo maine raat bhar ki."
    ];

    // Carousel management
    useEffect(() => {
        if (!autoPlay) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % whileYouSleptSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [autoPlay]);

    const nextSlide = () => {
        setAutoPlay(false);
        setCurrentSlide((prev) => (prev + 1) % whileYouSleptSlides.length);
    };

    const prevSlide = () => {
        setAutoPlay(false);
        setCurrentSlide((prev) => (prev - 1 + whileYouSleptSlides.length) % whileYouSleptSlides.length);
    };

    const goToSlide = (index: number) => {
        setAutoPlay(false);
        setCurrentSlide(index);
    };

    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-[linear-gradient(135deg,#1a0f18_0%,#2d1528_35%,#3d1a2f_70%,#1f0e1a_100%)] text-white">
            <style>{`
        * { scroll-behavior: smooth; }

        .text-gradient {
          background: linear-gradient(135deg, #ff69b4 0%, #ff1493 50%, #ff69b4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0px); }
        }
        .fu { animation: fadeUp 0.75s ease forwards; }
        .fu.d1 { animation-delay: 0.05s; }
        .fu.d2 { animation-delay: 0.2s; }
        .fu.d3 { animation-delay: 0.35s; }
        .fu.d4 { animation-delay: 0.5s; }
        .fu.d5 { animation-delay: 0.65s; }
        .fu.d6 { animation-delay: 0.8s; }

        @keyframes pulseGlow {
          0%, 100% { text-shadow: 0 0 20px rgba(255,105,180,0.4); }
          50% { text-shadow: 0 0 40px rgba(255,20,147,0.9); }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        .hero-heart {
          display: inline-block;
          animation: heartbeat 3s ease-in-out infinite, pulseGlow 3s ease-in-out infinite;
        }

        @keyframes bounceDown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        .bounce-down { animation: bounceDown 2s ease-in-out infinite; }

        @keyframes floatUp {
          0% { opacity: 0; transform: translateY(0); }
          10% { opacity: 0.6; }
          90% { opacity: 0.5; }
          100% { opacity: 0; transform: translateY(-100vh); }
        }

        @keyframes floatPetal {
          0% { opacity: 0; transform: translateY(0) rotateZ(0deg); }
          10% { opacity: 0.7; }
          90% { opacity: 0.3; }
          100% { opacity: 0; transform: translateY(-100vh) rotateZ(360deg); }
        }

        @keyframes softPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .soft-pulse { animation: softPulse 3s ease-in-out infinite; }

        .carousel-container { perspective: 1000px; }
        .carousel-slide {
          backdrop-filter: blur(10px);
          background: linear-gradient(135deg, rgba(255,20,147,0.1), rgba(255,105,180,0.05));
          border: 1px solid rgba(255,105,180,0.2);
        }

        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .moment-card {
          animation: slideInLeft 0.6s ease forwards;
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255,105,180,0.3), inset 0 0 20px rgba(255,105,180,0.1); }
          50% { box-shadow: 0 0 40px rgba(255,20,147,0.6), inset 0 0 30px rgba(255,20,147,0.2); }
        }
        .glow-card { animation: glow 3s ease-in-out infinite; }

        @keyframes shimmer {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .shimmer { animation: shimmer 2s ease-in-out infinite; }

        @keyframes blinkingStar {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0; }
        }
        .blinking-star { animation: blinkingStar 3s ease-in-out infinite; }

        @keyframes sleepyHeart {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.4; }
          50% { transform: translateY(-10px) scale(1.1); opacity: 0.8; }
        }
        .sleepy-heart { animation: sleepyHeart 4s ease-in-out infinite; }

        @keyframes typingCursor {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .typing-cursor { animation: typingCursor 1s step-start infinite; }

        @keyframes softYawn {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.15); }
        }
        .soft-yawn { animation: softYawn 2s ease-in-out infinite; }

        .cozy-glow {
          box-shadow: 0 0 60px rgba(255, 107, 107, 0.3), 
                      inset 0 0 40px rgba(255, 20, 147, 0.15),
                      0 0 100px rgba(255, 69, 0, 0.2);
        }
      `}</style>

            {/* Floating Hearts */}
            {mounted && hearts.map((h, i) => (
                <div
                    key={i}
                    className="fixed pointer-events-none text-pink-400 z-0"
                    style={{
                        left: `${h.left}%`,
                        bottom: '0px',
                        fontSize: '20px',
                        animation: `floatUp ${h.duration}s linear ${h.delay}s infinite`,
                    }}
                >
                    ♥
                </div>
            ))}

            {/* Floating Petals */}
            {mounted && petals.map((p, i) => (
                <div
                    key={i}
                    className="fixed pointer-events-none text-pink-300 z-0 text-2xl opacity-40"
                    style={{
                        left: `${p.left}%`,
                        bottom: '0px',
                        animation: `floatPetal ${p.duration}s linear ${p.delay}s infinite`,
                    }}
                >
                    ✿
                </div>
            ))}

            {/* Navigation */}
            <div className="fixed top-0 left-0 right-0 z-40 bg-black/30 backdrop-blur-md border-b border-pink-500/20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex items-center justify-between">
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors text-sm sm:text-base"
                    >
                        <ChevronLeft size={20} />
                        <span>Back</span>
                    </button>
                    <span className="text-md sm:text-md md:text-2xl font-light tracking-widest text-gradient">
                        Good Morning Chiku ❤️
                    </span>
                    <div className="w-12" />
                </div>
            </div>

            {/* SECTION 1: Midnight Confession Hero */}
            <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 pt-20">
                <div className="max-w-2xl text-center space-y-6 sm:space-y-8">
                    <div className="fu d1 text-4xl sm:text-5xl md:text-6xl">
                        <span className="hero-heart">♥</span>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                        <h1 className="fu d2 text-3xl sm:text-4xl md:text-5xl font-light text-gradient">
                            {confessionContent.title}
                        </h1>
                        <p className="fu d3 text-pink-300 text-sm sm:text-base md:text-lg font-light leading-relaxed">
                            {confessionContent.subtitle}
                        </p>

                        <div className="space-y-4 pt-4">
                            {confessionContent.messages.map((msg, idx) => (
                                <p key={idx} className={`fu d${idx + 4} text-pink-200/80 text-xs sm:text-sm md:text-base font-light leading-relaxed`}>
                                    {msg}
                                </p>
                            ))}
                        </div>

                        <p className="fu d6 text-pink-100/60 text-xs sm:text-sm md:text-base font-light italic pt-6">
                            "Aapke liye raat bhar, sirf aapke khayalon mein… ❤️"
                        </p>
                    </div>

                    <div className="bounce-down pt-8 text-pink-400 text-xl sm:text-2xl">↓</div>
                </div>
            </section>

            {/* SECTION 2: While You Were Sleeping Carousel */}
            <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
                <div className="max-w-3xl mx-auto">
                    <h2 className="soft-pulse text-center text-xl sm:text-2xl md:text-3xl font-light text-gradient mb-8 sm:mb-12 md:mb-16">
                        While You Were Sleeping...
                    </h2>

                    <div className="carousel-container relative mb-8 sm:mb-12">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.5 }}
                                className="carousel-slide rounded-2xl p-6 sm:p-8 md:p-12 text-center min-h-[300px] sm:min-h-[350px] md:min-h-[400px] flex flex-col items-center justify-center"
                            >
                                <div className="w-full mb-6 overflow-x-auto flex gap-2 justify-center pb-2">
                                    {whileYouSleptSlides[currentSlide].images.map((img, i) => (
                                        <div key={i} className="min-w-[200px] h-[260px] rounded-xl overflow-hidden relative flex-shrink-0 hover:scale-105 transition-transform">
                                            <img src={img} alt="moment" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/20" />
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-3 sm:space-y-4">
                                    <h3 className="text-lg sm:text-xl md:text-2xl font-light text-pink-300">
                                        {whileYouSleptSlides[currentSlide].title}
                                    </h3>
                                    <p className="text-pink-200/80 text-sm sm:text-base md:text-lg font-light">
                                        {whileYouSleptSlides[currentSlide].desc}
                                    </p>
                                </div>
                                <div className="mt-6 sm:mt-8 text-pink-400/60 text-xs sm:text-sm">
                                    {currentSlide + 1} / {whileYouSleptSlides.length}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        <motion.button
                            onClick={prevSlide}
                            whileHover={{ scale: 1.1, x: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-8 md:-translate-x-12 text-pink-400 hover:text-pink-300 z-10"
                        >
                            <ChevronLeft size={28} />
                        </motion.button>

                        <motion.button
                            onClick={nextSlide}
                            whileHover={{ scale: 1.1, x: 2 }}
                            whileTap={{ scale: 0.95 }}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-8 md:translate-x-12 text-pink-400 hover:text-pink-300 z-10"
                        >
                            <ChevronRight size={28} />
                        </motion.button>
                    </div>

                    <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
                        {whileYouSleptSlides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => goToSlide(idx)}
                                className={`rounded-full transition-all duration-300 ${idx === currentSlide
                                    ? 'bg-pink-500 w-8 sm:w-10 h-2.5 sm:h-3'
                                    : 'bg-pink-300/30 w-2.5 sm:w-3 h-2.5 sm:h-3 hover:bg-pink-400/50'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 3: Good Morning - Roleplay Moments */}
            <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="soft-pulse text-center text-2xl sm:text-3xl md:text-4xl font-light text-gradient mb-12 sm:mb-16 md:mb-20">
                        Good Morning With You
                    </h2>

                    <div className="space-y-8 sm:space-y-12">
                        {goodMorningMoments.map((moment, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className="moment-card"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
                                    {/* Images */}
                                    <div className={`flex gap-3 flex-wrap md:flex-nowrap`}>
                                        {moment.images.map((img, i) => {
                                            const isVideo = img?.endsWith('.mp4');


                                            return (
                                                <div
                                                    key={i}
                                                    className="w-full md:w-1/2 h-[250px] sm:h-[280px] rounded-xl overflow-hidden relative hover:scale-105 transition-transform duration-300"
                                                >
                                                    {isVideo ? (
                                                        <video
                                                            src={img}
                                                            autoPlay
                                                            muted
                                                            loop
                                                            playsInline
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <img
                                                            src={img}
                                                            alt={moment.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    )}

                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                                </div>
                                            );
                                        })}

                                    </div>

                                    {/* Content */}
                                    <div className="space-y-4 border-b pb-2 border-pink-400/20">
                                        {/* <div className="text-4xl sm:text-5xl">{moment.emoji}</div> */}
                                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-pink-300">
                                            {moment.title}
                                        </h3>
                                        <p className="text-pink-200/80 text-sm sm:text-base font-light leading-relaxed">
                                            {moment.desc}
                                        </p>
                                        <p className="text-pink-100/70 text-xs sm:text-sm font-light italic">
                                            "{moment.hinglish}"
                                        </p>


                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 4: The Real Reason */}
            <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
                <div className="max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="glow-card backdrop-filter backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-pink-500/20 space-y-6"
                    >

                        <div className="space-y-4 sm:space-y-6">
                            {realReasonMessages.map((msg, idx) => (
                                <motion.p
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="text-pink-200/80 text-sm sm:text-base md:text-lg font-light leading-relaxed"
                                >
                                    ✨ {msg}
                                </motion.p>
                            ))}
                        </div>

                        <div className="text-center pt-4">
                            <p className="text-pink-100/60 text-xs sm:text-sm font-light italic">
                                Main nahi chahta aap naraz uthho. Bas ek smile chahiye. 💕
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 5: Sunrise Ending */}
            <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 bg-gradient-to-b from-transparent via-orange-900/20 to-transparent">
                <div className="max-w-2xl text-center space-y-6 sm:space-y-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl sm:text-6xl md:text-7xl"
                    >
                        🌅
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-4 sm:space-y-6"
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gradient">
                            Good Morning Chiku ❤️
                        </h2>
                        <p className="text-pink-300 text-sm sm:text-base md:text-lg font-light leading-relaxed">
                            Aaj subah jab aap uthoge… tab meri puri raat aapke saamne hogi.
                        </p>
                        <p className="text-pink-200/80 text-sm sm:text-base md:text-lg font-light leading-relaxed">
                            Main nahi chahta aap naraz uthho… sirf ek smile chahiye jab aap mujhe dekho.
                        </p>
                        <p className="text-pink-100/60 text-xs sm:text-sm md:text-base font-light italic">
                            "Bas aise hi har subah aapke saath shuru ho… duniya bhool jaaye."
                        </p>
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="pt-12 flex justify-center gap-2"
                    >
                        <span className="text-3xl">♥</span>
                        <span className="text-3xl shimmer">♥</span>
                        <span className="text-3xl">♥</span>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 6: Sach Bataun? - The Truth Section */}
            <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 bg-gradient-to-b from-transparent via-red-950/10 to-transparent">
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="cozy-glow backdrop-filter backdrop-blur-lg rounded-3xl p-8 sm:p-10 md:p-16 border border-red-500/20 space-y-8 sm:space-y-10"
                    >
                        {/* Sleepy Decorative Elements */}
                        <div className="absolute top-6 right-6 text-2xl blinking-star opacity-60">✨</div>
                        <div className="absolute bottom-8 left-4 text-xl sleepy-heart">♥</div>
                        <div className="absolute top-1/4 left-8 text-lg blinking-star opacity-40">⭐</div>


                        {/* Main Content */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="space-y-6 sm:space-y-8"
                        >
                            {/* Opening Line */}
                            <p className="text-base sm:text-lg md:text-xl font-light text-pink-200/90 leading-relaxed">
                                <span className="text-pink-300">Aur ek baat bataun…</span>
                            </p>

                            {/* Main Story
                            <div className="space-y-4 sm:space-y-5 pl-4 border-l-2 border-pink-500/40">
                                <p className="text-sm sm:text-base md:text-lg text-pink-100/80 font-light leading-relaxed">
                                    Main poori raat jaagne ki koshish kar raha tha. 11 PM se shuru kiya tha - chai banai, snacks rakh di, laptop khol di.
                                </p>

                                <p className="text-sm sm:text-base md:text-lg text-pink-100/80 font-light leading-relaxed">
                                    Midnight aate aate… first section likha. Soch raha tha ki kaise aapko sabse special feel ho, kaise meri raat aapke thoughts se bhar jaaye. Har line likha pyaar se. Har animation check kiya.
                                </p>

                                <p className="text-sm sm:text-base md:text-lg text-pink-100/80 font-light leading-relaxed">
                                    1 AM - carousel banaya. Aapke liye 5 cinematic moments soche the… coding karte karte, code debug karte karte, chai sipping karte karte. Har frame mein aap the. Har detail mein aap the.
                                </p>

                                <p className="text-sm sm:text-base md:text-lg text-pink-100/80 font-light leading-relaxed">
                                    2-3 AM - styling shuru ki. Colors match karne the, fonts perfect karne the. Aapka favorite aesthetic dhundha tha… warm, cozy, romantic. Colors ek baar, phir ek baar, phir ek baar badla.
                                </p>

                                <p className="text-sm sm:text-base md:text-lg text-pink-100/80 font-light leading-relaxed">
                                    4 AM - effects add kiye. Floating hearts, rose petals, glowing cards. Sab kuch aapke liye beautiful banana tha. Coffee ki 3rd cup… eyes heavy ho rahi thi par mann nahi mana raha tha.
                                </p>

                                <p className="text-sm sm:text-base md:text-lg text-pink-100/80 font-light leading-relaxed">
                                    5 AM - almost ho gaya tha. Bas final touches… content review, animations timing, responsiveness check. Phone mein aapke screenshots dekhe… think about what makes you smile.
                                </p>

                                <p className="text-sm sm:text-base md:text-lg text-pink-100/80 font-light leading-relaxed">
                                    Phir… bed bohot comfortable lag gaya. Bas 20 minutes… par neend aa gayi. <span className="text-red-300">😭</span>
                                </p>
                            </div> */}

                            {/* The Sweet Admission */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="bg-gradient-to-r from-pink-900/30 to-red-900/20 rounded-xl p-6 sm:p-8 border border-pink-500/30 space-y-4"
                            >
                                <p className="text-sm sm:text-base md:text-lg text-pink-100/90 font-light leading-relaxed">
                                    Me raat ko ek moment pe bohut emotional ho gaya tha aapko miss karte hue, Fir mene pillow ko as my chiku imagine karke cuddle kiya aur rote hue pata nahi kab so gaya. Lekin uthte hi... sabse pehle firse isi surprise pe kaam kiya.
                                </p>
                                <p className="text-sm sm:text-base md:text-lg text-pink-100/90 font-light leading-relaxed">
                                    Kyuki main nahi chahta tha ki aap udaas uthho.
                                </p>
                                <p className="text-sm sm:text-base md:text-lg text-pink-100/90 font-light leading-relaxed italic">
                                    Aapke liye banate banate hi meri puri raat nikal gayi.
                                </p>
                            </motion.div>

                            {/* The Final Truth */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                                className="space-y-4 text-center"
                            >
                                <p className="text-base sm:text-lg md:text-xl text-pink-300 font-light">
                                    To technically…
                                </p>
                                <p className="text-lg sm:text-xl md:text-2xl font-light text-gradient">
                                    Maine raat aapke saath hi spend ki. <span className="text-red-300">❤️</span>
                                </p>
                                <p className="text-xs sm:text-sm md:text-base text-pink-100/60 font-light pt-4">
                                    Thoda so gaya tha… par aapse door nahi gaya tha.
                                </p>
                            </motion.div>
                        </motion.div>



                        {/* Closing Emotional Note */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1.1 }}
                            className="text-center pt-6 border-t border-pink-500/20"
                        >
                            <p className="text-pink-100/70 text-xs sm:text-sm md:text-base font-light italic leading-relaxed">
                                Not perfect… par deeply genuine. <span className="text-pink-400">❤️</span>
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Typing Cursor Animation */}
                    <div className="text-center mt-8 text-pink-400/60">
                        <span className="typing-cursor text-lg">|</span>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 text-center">
                <div className="max-w-2xl mx-auto space-y-6">
                    <div className="text-4xl sm:text-5xl md:text-6xl">
                        <span className="hero-heart">♥</span>
                    </div>
                    <p className="soft-pulse text-pink-300 text-xs sm:text-sm md:text-base font-light">
                        Made overnight with love ❤️ for Chiku
                    </p>
                    <p className="text-pink-200/60 text-xs sm:text-sm font-light">
                        "Kyunki aap mere liye bahut special ho... aur har raat, har subah aap hi meri soch mein ho."
                    </p>
                </div>
            </section>

            <div className="h-12 sm:h-16 md:h-20" />
        </div>
    );
};

export default GoodMorningPage;
