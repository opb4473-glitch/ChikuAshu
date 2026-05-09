'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const RomanticPage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [autoPlay, setAutoPlay] = useState(false);
    const [hearts, setHearts] = useState<{ left: number; x: number; duration: number; delay: number }[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setHearts(
            Array.from({ length: 12 }).map((_, i) => ({
                left: Math.random() * 100,
                x: Math.random() * 200 - 100,
                duration: 6 + Math.random() * 4,
                delay: i * 0.5,
            }))
        );
    }, []);

    const dailyRoutine = [
        {
            time: '🌅 Morning',
            desc: 'Subah uthte hi aapko apni baahon mein lekar ek pyaara sa hug aur forehead kiss deta…',
            images: ['/daily/cuddle-1.jpg', '/daily/cuddle-2.jpg', '/daily/forehead.gif'],
        },
        {
            time: '☕ Breakfast',
            desc: 'Aapke liye breakfast banata… aur aapko khilata.',
            images: ['/daily/bf-2.webp', '/daily/bf-1.jpg'],
        },
        {
            time: '',
            desc: 'Fir aap jab naha ke aate tab me aapke hair dry karke unhe set karke deta.',
            images: ['/daily/dry.webp', '/daily/dry-2.jpg', '/daily/hair.jpg'],
        },
        {
            time: '',
            desc: 'Fir office jane se pehle aapko ek pyaara sa hug karta',
            images: ['/daily/hug.png', '/daily/hug-2.jpg'],
        },
        {
            time: '🌆 Evening',
            desc: 'Aise hi haath pakad ke walk pe park le jaata…',
            images: ['/daily/walk-2.jpg', '/daily/park.jpg', '/daily/park-1.jpg'],
        },
        {
            time: '🌙 Night',
            desc: 'Raat ko bas aapko baaho me lekar pyaar se sulata…',
            images: ['/daily/night.jpg'],
        },
        {
            time: '🌙 Baad me :)',
            desc: 'Aur bhi bohut sari chize hai... Wo me baadme bataunga... Filhal ke liye Lots of HUGS... I miss you a lot',
            images: ['/daily/hugx.jpg', '/daily/hug2.jpg', '/daily/hug3.jpg', '/daily/hug4.webp', '/daily/hugg.gif'],
        },
    ];

    useEffect(() => {
        if (!autoPlay) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % dailyRoutine.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [autoPlay, dailyRoutine.length]);

    const nextSlide = () => {
        setAutoPlay(false);
        setCurrentSlide((prev) => (prev + 1) % dailyRoutine.length);
    };

    const prevSlide = () => {
        setAutoPlay(false);
        setCurrentSlide((prev) => (prev - 1 + dailyRoutine.length) % dailyRoutine.length);
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
                    from {opacity: 0; transform: translateY(14px); }
                to   {opacity: 1; transform: translateY(0px); }
                }
                .fu {animation: fadeUp 0.75s ease forwards; }
                .fu.d1 {animation - delay: 0.05s; }
                .fu.d2 {animation - delay: 0.2s;  }
                .fu.d3 {animation - delay: 0.35s; }
                .fu.d4 {animation - delay: 0.5s;  }
                .fu.d5 {animation - delay: 0.65s; }
                .fu.d6 {animation - delay: 0.8s;  }

                @keyframes pulseGlow {
                    0 %, 100 % { text- shadow: 0 0 20px rgba(255,105,180,0.4); }
                50%       {text - shadow: 0 0 40px rgba(255,20,147,0.9); }
                }
                @keyframes heartbeat {
                    0 %, 100 % { transform: scale(1); }
                    50%       {transform: scale(1.08); }
                }
                .hero-heart {
                    display: inline-block;
                animation: heartbeat 3s ease-in-out infinite, pulseGlow 3s ease-in-out infinite;
                }

                @keyframes bounceDown {
                    0 %, 100 % { transform: translateY(0); }
                    50%       {transform: translateY(8px); }
                }
                .bounce-down {animation: bounceDown 2s ease-in-out infinite; }

                @keyframes floatUp {
                    0 % { opacity: 0; transform: translateY(0); }
                    10%  {opacity: 0.6; }
                90%  {opacity: 0.5; }
                100% {opacity: 0;   transform: translateY(-100vh); }
                }

                @keyframes softPulse {
                    0 %, 100 % { opacity: 0.6; }
                    50%       {opacity: 1;   }
                }
                .soft-pulse {animation: softPulse 3s ease-in-out infinite; }

                .carousel-container {perspective: 1000px; }
                .carousel-slide {
                    backdrop - filter: blur(10px);
                background: linear-gradient(135deg,rgba(255,20,147,0.1),rgba(255,105,180,0.05));
                border: 1px solid rgba(255,105,180,0.2);
                }
            `}</style>

            {/* Floating hearts — CSS only after mount */}
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

            {/* Nav */}
            <div className="fixed top-0 left-0 right-0 z-40 bg-black/30 backdrop-blur-md border-b border-pink-500/20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex items-center justify-between">
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors text-sm sm:text-base"
                    >
                        <ChevronLeft size={20} />
                        <span>Back</span>
                    </button>
                    <span className="text-lg sm:text-xl md:text-2xl font-light tracking-widest text-gradient">
                        For You
                    </span>
                    <div className="w-12" />
                </div>
            </div>

            {/* ── Hero ──
                Every element uses the .fu CSS class for fade-in.
                No framer-motion initial/animate here — pure CSS guarantees
                content is visible on first paint regardless of hydration timing.
            */}
            <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 pt-20">
                <div className="max-w-2xl text-center space-y-6 sm:space-y-8">

                    <div className="fu d1 text-4xl sm:text-5xl md:text-6xl">
                        <span className="hero-heart">♥</span>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                        <p className="fu d2 text-pink-300 text-sm sm:text-base md:text-lg font-light leading-relaxed">
                            Chiku... apna khayal rakhna.
                        </p>
                        <p className="fu d3 text-pink-200/80 text-xs sm:text-sm md:text-base font-light leading-relaxed">
                            Chiku, aap meri life ka woh hissa ho jise main ignore nahi kar sakta.
                            Isliye please apna dhyaan rakhna... Time se khana, rest lena, aur khud ko thoda sa sambhal ke rakhna… kyunki aap sirf apne nahi, mere bhi ho.
                        </p>
                        <p className="fu d4 text-pink-200/80 text-xs sm:text-sm md:text-base font-light leading-relaxed">
                            Yeh ek hafta door rehna aasaan nahi hoga,
                            Main roz aapko message nahi kar paunga, par iska matlab yeh nahi ki main aapko yaad nahi karunga… sach toh yeh hai ki har din, har chhoti baat par aap yaad aaoge.
                        </p>
                        <p className="fu d5 text-pink-200/80 text-xs sm:text-sm md:text-base font-light leading-relaxed">
                            Main yahan nahi hoon, par har chhoti cheez mein aapka khayal rakhta rahunga.
                            Subah se raat tak, sirf aapki hi soch mein khoya rahunga.
                        </p>
                        <p className="fu d6 text-pink-100/60 text-xs sm:text-sm md:text-base font-light italic">
                            Door rehkar bhi sirf tum ho meri khayal mein...
                        </p>
                    </div>

                    <div className="bounce-down pt-4 text-pink-400 text-xl sm:text-2xl">↓</div>
                </div>
            </section>

            {/* Carousel */}
            <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
                <div className="max-w-3xl mx-auto">
                    <h2 className="soft-pulse text-center text-xl sm:text-2xl md:text-3xl font-light text-gradient mb-8 sm:mb-12 md:mb-16">
                        Pura Din Tumhare Saath
                    </h2>

                    <div className="carousel-container relative mb-6 sm:mb-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="carousel-slide rounded-2xl p-6 sm:p-8 md:p-12 text-center min-h-[250px] sm:min-h-[300px] md:min-h-[350px] flex flex-col items-center justify-center"
                            >
                                <div className="w-full mb-6 overflow-x-hidden flex-wrap flex gap-2 justify-center pb-2">
                                    {dailyRoutine[currentSlide].images.map((img, i) => (
                                        <div key={i} className="min-w-[200px] h-[260px] rounded-xl overflow-hidden relative flex-shrink-0">
                                            <img src={img} alt="moment" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/30" />
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-3 sm:space-y-4">
                                    <h3 className="text-lg sm:text-xl md:text-2xl font-light text-pink-300">
                                        {dailyRoutine[currentSlide].time.split(' ').slice(1).join(' ')}
                                    </h3>
                                    <p className="text-pink-200/80 text-sm sm:text-base md:text-lg font-light">
                                        {dailyRoutine[currentSlide].desc}
                                    </p>
                                </div>
                                <div className="mt-6 sm:mt-8 text-pink-400/60 text-xs sm:text-sm">
                                    {currentSlide + 1} / {dailyRoutine.length}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        <motion.button
                            onClick={prevSlide}
                            whileHover={{ scale: 1.1, x: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-8 md:-translate-x-12 text-pink-400 hover:text-pink-300 z-10"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft size={28} />
                        </motion.button>

                        <motion.button
                            onClick={nextSlide}
                            whileHover={{ scale: 1.1, x: 2 }}
                            whileTap={{ scale: 0.95 }}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-8 md:translate-x-12 text-pink-400 hover:text-pink-300 z-10"
                            aria-label="Next slide"
                        >
                            <ChevronRight size={28} />
                        </motion.button>
                    </div>

                    <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
                        {dailyRoutine.map((_, idx) => (
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

            {/* Care */}
            <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
                <div className="max-w-2xl mx-auto text-center space-y-6 sm:space-y-8">
                    <h2 className="soft-pulse text-2xl sm:text-3xl md:text-4xl font-light text-gradient">
                        Aap… bas apna khayal rakhna
                    </h2>
                    <p className="text-pink-200/70 text-xs sm:text-sm md:text-base font-light leading-relaxed">
                        Yeh sab sirf tasveerein nahi hain. Yeh mera care hai jo main aap tak pahunchana chahta hoon.
                        Main paas nahi hoon, par har pal aap mere khayalon mein ho.
                    </p>
                    <p className="text-pink-100/60 text-xs sm:text-sm md:text-base font-light italic">
                        Bas apna dhyaan rakhna… kyunki aap mere liye bahut important ho.
                    </p>
                </div>
            </section>

            {/* ── Morning Love Section ── */}
<section className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 overflow-hidden">
    
    {/* Background Blur Orbs */}
    <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/10 blur-3xl rounded-full" />
    <div className="absolute bottom-10 right-10 w-72 h-72 bg-rose-400/10 blur-3xl rounded-full" />

    <div className="relative max-w-5xl mx-auto">

        <div className="text-center mb-14 sm:mb-20">
            <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6"
            >
                <div className="text-5xl sm:text-6xl md:text-7xl">
                    🌻
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gradient leading-tight">
                    Aur pata hai aaj kya hua?
                </h2>

                <p className="text-pink-200/70 text-sm sm:text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed">
                    Aaj subah meri duniya thodi aur khoobsurat lag rahi thi...
                    Kyuki meri saari soch sirf meri Chiku ke around ghoom rahi thi 🤍
                </p>
            </motion.div>
        </div>

        <div className="space-y-10">

            {/* Card 1 */}
            <motion.div
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="backdrop-blur-xl bg-white/[0.03] border border-pink-400/10 rounded-[2rem] overflow-hidden"
            >
                <div className="grid md:grid-cols-2 gap-0">

                    <div className="relative h-[320px] sm:h-[400px]">
                        <img
                            src="/daily/sunflower.jpg"
                            alt="sunflower"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f18] via-transparent to-transparent" />
                    </div>

                    <div className="p-8 sm:p-10 md:p-14 flex flex-col justify-center">
                        <div className="text-pink-300 text-2xl mb-5">🌅</div>

                        <h3 className="text-2xl sm:text-3xl font-light text-pink-200 mb-6">
                            Meri Chiku ko manane ke liye...😊
                        </h3>

                        <p className="text-pink-100/70 leading-relaxed text-sm sm:text-base md:text-lg font-light">
                            Mai subah jaldi uth gaya… Baju me dekha to meri cute baby abhi so rahi hai, Me pyaar se unko blanket odhaya aur aawaz kiye bina room se bahar chala gaya 
                            <br />
                            muje aaj sirf apni Chiku ko manana hai… 👉 👈
                            <br /><br />
                            Subah subah thodi thandi hawa chal rahi thi…
                            aur mai seedha gaya aapke liye ek chota sa sunflower lene 🌻🤏
                            <br /><br />
                            Kyuki mujhe pata hai meri bachhi ko bright bright cheeze pasand hai…
                            bilkul uski smile ki tarah ✨
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="backdrop-blur-xl bg-white/[0.03] border border-pink-400/10 rounded-[2rem] overflow-hidden"
            >
                <div className="grid md:grid-cols-2 gap-0">

                    <div className="order-2 md:order-1 p-8 sm:p-10 md:p-14 flex flex-col justify-center">
                        <div className="text-pink-300 text-2xl mb-5">🤍</div>

                        <h3 className="text-2xl sm:text-3xl font-light text-pink-200 mb-6">
                            Forehead Kiss & Warm Hugs
                        </h3>

                        <p className="text-pink-100/70 leading-relaxed text-sm sm:text-base md:text-lg font-light">
                            Fir me room me aaya tab dekha meri cutiepie abhi tak so rahi hai...

                            <br /><br />
                            Me aawaz kiye bina bed ke pass aaya aur bed ke niche meri princess ke samne beith gaya aur unki aakhe khulne ka intezar karne laga tab tak pyaar se bass meri princu ko hi niharne laga
                            <br /><br />
aur jese hi meri raajkumari ki aakh khuli
                            <br /><br />
                            Toh pehle unka face dono haathon se pakada… aur ek soft hug ke sath
                            forehead pe ek pyaari si kiss ki 😚🤍🤗
                            <br /><br />
                            Aur bola...
                            <br />
                            <span className="italic text-pink-200">
                                “Pagal bachha… itna guilty feel nahi karte… mai kahi nahi ja raha…”
                            </span>
                        </p>
                    </div>

                    <div className="order-1 md:order-2 relative h-[320px] sm:h-[400px] flex flex-col gap-2">
                        <img
                            src="/daily/d825cbf297883fcfd05cbd4bba04f4cf.jpg"
                            alt="forehead kiss"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f18] via-transparent to-transparent" />
                    </div>
                </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="backdrop-blur-xl bg-white/[0.03] border border-pink-400/10 rounded-[2rem] overflow-hidden"
            >
                <div className="grid md:grid-cols-2 gap-0">

                    <div className="relative h-[320px] sm:h-[400px] flex flex-col gap-2">
                        <img 
                            src="/daily/side-walk.jpg"
                            alt="hug"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f18] via-transparent to-transparent" />
                    </div>

                    <div className="p-8 sm:p-10 md:
                        p-14 flex flex-col justify-center">
                        <div className="text-pink-300 text-2xl mb-5">🫂</div>

                        <h3 className="text-2xl sm:text-3xl font-light text-pink-200 mb-6">
                            Bas Tum Aur Main
                        </h3>

                        <p className="text-pink-100/70 leading-relaxed text-sm sm:text-base md:text-lg font-light">
                            Fir aapko apni hoodie pehna deta kyuki subah thodi thand thi 😭
                            <br /><br />
                            Aur aapko side hug karke walk pe le jaata…
                            while listening to your nonstop cute bakbak...🤍
                            <br /><br />
                            Aur jab bhi aap “sorry” bolte…
                            mai bas aapke lips pe finger rakh ke bolta...
                            <br /><br />
                            <span className="italic text-pink-200">
                                “Bas… meri Chiku ko itna udaas rehna allowed nahi hai…” 🌸
                            </span>
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Final Emotional Section */}
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative text-center py-16 sm:py-20 px-6 rounded-[2.5rem] overflow-hidden border border-pink-500/10 bg-gradient-to-br from-pink-500/[0.08] to-transparent"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,105,180,0.12),transparent_70%)]" />

                <div className="relative space-y-6 max-w-3xl mx-auto">
                    <div className="text-5xl">✨</div>

                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-light text-gradient">
                        Aap Special Ho My Baby...
                    </h3>

                    <p className="text-pink-100/70 leading-relaxed text-sm sm:text-base md:text-lg font-light">
                        Ek late night…
                        Ek missed moment…
                        Ya ek choti si misunderstanding…
                        <br /><br />
                        Ye sab milke bhi meri feelings ko kabhi kam nahi kar sakta 🌻
                    </p>

                    <div className="space-y-2 pt-4">
                        <p className="text-pink-200 text-lg sm:text-xl italic">
                            “Aap meri ho…”
                        </p>

                        <p className="text-pink-200 text-lg sm:text-xl italic">
                            “Meri comfort ho…”
                        </p>
                        <p className="text-pink-200 text-lg sm:text-xl italic">
                            “Aap Special ho...”
                        </p>

        
                    </div>
                </div>
            </motion.div>
        </div>
    </div>
</section>

            {/* Footer */}
            <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
                <div className="max-w-2xl mx-auto text-center space-y-4 sm:space-y-6">
                    <div className="text-3xl sm:text-4xl md:text-5xl">
                        <span className="hero-heart">♥</span>
                    </div>
                    <p className="soft-pulse text-pink-300 text-xs sm:text-sm md:text-base font-light">
                        Made with ❤️ for Chiku
                    </p>
                </div>
            </section>

            <div className="h-12 sm:h-16 md:h-20" />
        </div>
    );
};

export default RomanticPage;
