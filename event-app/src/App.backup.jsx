import React, { useState, useEffect, useMemo } from 'react';
import {
    Calendar,
    MapPin,
    Clock,
    ChevronRight,
    ArrowRight,
    Users,
    Star,
    BookOpen,
    CheckCircle2,
    Zap,
    ShieldCheck,
    Globe,
    Library,
    MessageSquare,
    Sparkles,
    Download,
    Mail,
    Instagram,
    Facebook,
    Linkedin,
    Search,
    Menu,
    X,
    CreditCard,
    ExternalLink,
    Loader2,
    TrendingUp,
    Award,
    Target,
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * UTILITIES
 */
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const HITPAY_API_KEY = 'live_a100d3b939e8aa5517ff5ea077e6051e397f1d889ee417589b4e757e5a2ca5a1';
const SYSTEM_DATE = new Date('2026-01-13');

/**
 * THE DEFINITIVE 5-TIER PRICING MATRIX
 */
const PRICING_MATRIX = {
    'tfh-mnl': {
        local: {
            currency: 'PHP',
            tiers: [
                { price: 25000, deadline: '2026-03-31', label: 'Mar 31' },
                { price: 28250, deadline: '2026-05-31', label: 'May 31' },
                { price: 31500, deadline: '2026-07-31', label: 'Jul 31' },
                { price: 34750, deadline: '2026-08-30', label: 'Aug 30' },
                { price: 36000, deadline: '2026-10-15', label: 'Oct 15' },
            ],
            walkIn: 38545,
        },
        international: {
            currency: 'USD',
            tiers: [
                { price: 530, deadline: '2026-03-31', label: 'Mar 31' },
                { price: 600, deadline: '2026-05-31', label: 'May 31' },
                { price: 665, deadline: '2026-07-31', label: 'Jul 31' },
                { price: 735, deadline: '2026-08-30', label: 'Aug 30' },
                { price: 760, deadline: '2026-10-15', label: 'Oct 15' },
            ],
            walkIn: 815,
        },
        ns: {
            currency: 'PHP',
            registered: 18000,
            nonRegistered: 20000,
        },
    },
    '5mm-mnl': {
        local: {
            currency: 'PHP',
            tiers: [
                { price: 44000, deadline: '2026-03-31', label: 'Mar 31' },
                { price: 49900, deadline: '2026-05-31', label: 'May 31' },
                { price: 55500, deadline: '2026-07-31', label: 'Jul 31' },
                { price: 61250, deadline: '2026-08-30', label: 'Aug 30' },
                { price: 63500, deadline: '2026-10-15', label: 'Oct 15' },
            ],
            walkIn: 68000,
        },
        international: {
            currency: 'USD',
            tiers: [
                { price: 790, deadline: '2026-03-31', label: 'Mar 31' },
                { price: 890, deadline: '2026-05-31', label: 'May 31' },
                { price: 990, deadline: '2026-07-31', label: 'Jul 31' },
                { price: 1090, deadline: '2026-08-30', label: 'Aug 30' },
                { price: 1135, deadline: '2026-10-15', label: 'Oct 15' },
            ],
            walkIn: 1215,
        },
    },
    'parenting-mnl': {
        local: {
            currency: 'PHP',
            tiers: [
                { price: 1600, deadline: '2026-03-31', label: 'Mar 31' },
                { price: 1800, deadline: '2026-05-31', label: 'May 31' },
                { price: 2000, deadline: '2026-07-31', label: 'Jul 31' },
                { price: 2300, deadline: '2026-09-15', label: 'Sep 15' },
                { price: 2500, deadline: '2026-10-24', label: 'Oct 24' },
            ],
            walkIn: 2800,
        },
    },
    'parenting-bcd': {
        local: {
            currency: 'PHP',
            tiers: [
                { price: 1000, deadline: '2026-03-31', label: 'Mar 31' },
                { price: 1150, deadline: '2026-05-31', label: 'May 31' },
                { price: 1300, deadline: '2026-07-31', label: 'Jul 31' },
                { price: 1450, deadline: '2026-09-15', label: 'Sep 15' },
                { price: 1600, deadline: '2026-11-07', label: 'Nov 07' },
            ],
            walkIn: 2000,
        },
    },
};

const WORKSHOPS = [
    {
        id: 'tfh-mnl',
        title: 'Brain Camp (Thinking for Humans)',
        date: 'OCTOBER 28-31, 2026',
        location: 'BGC, MANILA',
        type: 'Certification',
        img: 'braincamp_hero.png',
        description:
            'Master the 15 Executive Skills of the self-actualizing brain. A 4-day immersion into the latest Meta-NLP cognitive engineering.',
    },
    {
        id: '5mm-mnl',
        title: 'The 5-Minute Manager',
        date: 'NOVEMBER 3-5, 2026',
        location: 'MAKATI, MANILA',
        type: 'Leadership',
        img: '5mm_hero.png',
        description:
            'High-speed coaching and management tools for senior executives. Learn to lead at the speed of Meta-NLP thought.',
    },
    {
        id: 'parenting-mnl',
        title: 'Impactful Parenting (Manila)',
        date: 'OCTOBER 24, 2026',
        location: 'QUEZON CITY',
        type: 'Family',
        img: 'parenting_hero.png',
        description:
            'Building deep connection and emotional intelligence in the next generation using Meta-NLP principles.',
    },
    {
        id: 'parenting-bcd',
        title: 'Impactful Parenting (Bacolod)',
        date: 'NOVEMBER 7, 2026',
        location: 'BACOLOD CITY',
        type: 'Family',
        img: 'parenting_hero_bcd.png',
        description: 'Empowering parents with psychological tools for legacy building and conscious child-rearing.',
    },
];

const FACULTY = [
    {
        name: 'Vanessa Salvaña',
        role: 'Founding CEO',
        img: 'vanessa.jpg',
        bio: 'Leading expert in Meta-NLP and organizational actualization for high-growth sectors.',
    },
    {
        name: 'Virna Villarosa',
        role: 'International Coach',
        img: 'virna.jpg',
        bio: 'Global trainer specializing in the psychology of parenting and mastery coaching.',
    },
    {
        name: 'Aldem Salvaña',
        role: 'Chief Learning Head',
        img: 'aldem.jpg',
        bio: 'Master Practitioner specialized in corporate transformation and executive coaching.',
    },
];

/**
 * COMPONENTS
 */

const PaymentBridge = ({ workshop, currentPrice, activeCategory, isRegistered, onClose }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        const handleHitPay = async () => {
            const purpose = `${workshop.title} - ${activeCategory.toUpperCase()} ${activeCategory === 'ns' ? (isRegistered ? 'Reg' : 'Non-Reg') : currentPrice.label}`;

            try {
                const response = await fetch('https://api.hitpayapp.com/v1/payment-requests', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-BUSINESS-API-KEY': HITPAY_API_KEY,
                    },
                    body: new URLSearchParams({
                        amount: currentPrice.price.toString(),
                        currency: currentPrice.currency,
                        reference_number: `BRK-${workshop.id}-${Date.now()}`,
                        title: workshop.title,
                        purpose: purpose,
                        redirect_url: window.location.href,
                        allow_repeated_payments: 'false',
                    }),
                });

                const data = await response.json();
                if (data.url) {
                    setUrl(data.url);
                    window.open(data.url, '_blank');
                } else {
                    throw new Error('API Error');
                }
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        handleHitPay();
    }, []);

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl">
            <div className="bg-slate-900 border border-white/10 rounded-[2.5rem] p-12 max-w-md w-full shadow-2xl text-center relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                    <div
                        className="h-full bg-amber-500 animate-[loading_2s_infinite_linear]"
                        style={{ width: '40%' }}
                    ></div>
                </div>

                {loading ? (
                    <div className="space-y-6">
                        <Loader2 className="w-12 h-12 text-amber-500 animate-spin mx-auto" />
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
                            Redirecting to Secure Gateway...
                        </h3>
                        <p className="text-white/40 text-sm font-light">
                            We are calculating your investment and generating a secure payment bridge. Please wait.
                        </p>
                    </div>
                ) : error ? (
                    <div className="space-y-8">
                        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
                            <ShieldCheck className="w-8 h-8 text-red-500" />
                        </div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
                            Manual Proceed Required
                        </h3>
                        <p className="text-white/40 text-sm font-light leading-relaxed">
                            The automatic redirect was blocked by your browser security settings or a network error.
                            Click the button below to continue manually.
                        </p>
                        <a
                            href={`https://hitpayapp.com/gateway?api_key=${HITPAY_API_KEY}`}
                            target="_blank"
                            className="block w-full py-5 bg-amber-500 text-slate-900 font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-white transition-all shadow-xl shadow-amber-500/20"
                        >
                            Manual Proceed
                        </a>
                    </div>
                ) : (
                    <div className="space-y-8">
                        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle2 className="w-8 h-8 text-green-500" />
                        </div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
                            Gateway Initialized
                        </h3>
                        <p className="text-white/40 text-sm font-light">
                            Your secure transaction is ready in a new window. If it didn't open, click below.
                        </p>
                        <a
                            href={url}
                            target="_blank"
                            className="block w-full py-5 bg-amber-500 text-slate-900 font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-white transition-all shadow-xl shadow-amber-500/20"
                        >
                            Open Secure Tab
                        </a>
                    </div>
                )}

                <button
                    onClick={onClose}
                    className="mt-8 text-[10px] font-black uppercase tracking-[0.4em] text-white/20 hover:text-white transition-colors"
                >
                    Cancel and Return
                </button>
            </div>
        </div>
    );
};

const PricingMatrixUI = ({ workshopId, workshopName }) => {
    const [activeCategory, setActiveCategory] = useState('local');
    const [isRegistered, setIsRegistered] = useState(true);
    const [showBridge, setShowBridge] = useState(false);

    const workshopPricing = PRICING_MATRIX[workshopId];
    const hasMultipleCategories = !!workshopPricing?.international;
    const hasNSCategory = !!workshopPricing?.ns;

    const currentPriceData = useMemo(() => {
        if (!workshopPricing) return null;
        const cat = activeCategory === 'ns' ? 'local' : activeCategory;
        const data = workshopPricing[cat];
        if (!data) return null;

        if (activeCategory === 'ns') {
            return {
                price: isRegistered ? workshopPricing.ns.registered : workshopPricing.ns.nonRegistered,
                currency: 'PHP',
                label: isRegistered ? 'NS Registered 2026' : 'NS Non-Registered',
            };
        }

        const today = SYSTEM_DATE;
        const activeTier = data.tiers.find((t) => new Date(t.deadline) >= today);

        return activeTier
            ? { ...activeTier, currency: data.currency }
            : { price: data.walkIn, currency: data.currency, label: 'Walk-in Rate' };
    }, [workshopId, activeCategory, isRegistered]);

    if (!workshopPricing) return null;

    return (
        <>
            <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-[3rem] p-10 shadow-2xl relative">
                <div className="flex bg-black/40 p-1.5 rounded-2xl mb-12 border border-white/5">
                    <button
                        onClick={() => setActiveCategory('local')}
                        className={cn(
                            'flex-1 py-4 px-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all',
                            activeCategory === 'local'
                                ? 'bg-amber-500 text-slate-900 shadow-lg'
                                : 'text-white/40 hover:text-white'
                        )}
                    >
                        Professional
                    </button>
                    {hasMultipleCategories && (
                        <button
                            onClick={() => setActiveCategory('international')}
                            className={cn(
                                'flex-1 py-4 px-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all',
                                activeCategory === 'international'
                                    ? 'bg-amber-500 text-slate-900 shadow-lg'
                                    : 'text-white/40 hover:text-white'
                            )}
                        >
                            International
                        </button>
                    )}
                    {hasNSCategory && (
                        <button
                            onClick={() => setActiveCategory('ns')}
                            className={cn(
                                'flex-1 py-4 px-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all',
                                activeCategory === 'ns'
                                    ? 'bg-amber-500 text-slate-900 shadow-lg'
                                    : 'text-white/40 hover:text-white'
                            )}
                        >
                            NS Community
                        </button>
                    )}
                </div>

                <div className="space-y-10">
                    {activeCategory === 'ns' && (
                        <div className="flex items-center justify-between border border-white/5 bg-slate-950/40 p-6 rounded-[2rem]">
                            <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">
                                Eligibility Status
                            </span>
                            <button
                                onClick={() => setIsRegistered(!isRegistered)}
                                className="flex items-center gap-4 bg-slate-800 px-6 py-3 rounded-full border border-white/10"
                            >
                                <div
                                    className={cn(
                                        'w-2 h-2 rounded-full',
                                        isRegistered ? 'bg-amber-500' : 'bg-slate-500'
                                    )}
                                ></div>
                                <span className="text-[10px] font-black text-white uppercase">
                                    {isRegistered ? 'Registered 2026' : 'Non-Registered'}
                                </span>
                            </button>
                        </div>
                    )}

                    <div className="text-center py-10 scale-110">
                        <p className="text-amber-500/50 text-[10px] font-black uppercase tracking-[0.6em] mb-4 italic">
                            {currentPriceData.label}
                        </p>
                        <h4 className="text-8xl font-black text-white tracking-tighter flex items-center justify-center gap-3">
                            <span className="text-3xl text-amber-500 leading-none">
                                {currentPriceData.currency === 'PHP' ? '₱' : '$'}
                            </span>
                            {currentPriceData.price.toLocaleString()}
                        </h4>
                    </div>

                    <button
                        onClick={() => setShowBridge(true)}
                        className="w-full py-8 bg-amber-500 hover:bg-white text-slate-900 font-black uppercase tracking-[0.4em] text-[11px] rounded-[2rem] transition-all shadow-2xl shadow-amber-500/10 active:scale-95 flex items-center justify-center gap-4"
                    >
                        <ShieldCheck className="w-6 h-6" />
                        Book Your Seat
                    </button>
                </div>
            </div>

            {showBridge && (
                <PaymentBridge
                    workshop={{ id: workshopId, title: workshopName }}
                    currentPrice={currentPriceData}
                    activeCategory={activeCategory}
                    isRegistered={isRegistered}
                    onClose={() => setShowBridge(false)}
                />
            )}
        </>
    );
};

export default function App() {
    const [currentView, setCurrentView] = useState('home'); // 'home' or 'workshop-[ID]'
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // THE 404-KILLER RED-LINE FIX
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const workshopId = params.get('workshop');
        if (workshopId) {
            // Force state match immediately
            setCurrentView(`workshop-${workshopId}`);
            // Clear URL for clean branding
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []);

    const activeWorkshop = useMemo(() => {
        if (currentView.startsWith('workshop-')) {
            const id = currentView.split('workshop-')[1];
            return WORKSHOPS.find((w) => w.id === id);
        }
        return null;
    }, [currentView]);

    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-amber-500 selection:text-slate-900 font-sans antialiased">
            {/* HEADER */}
            <header className="fixed top-0 left-0 w-full z-[100] bg-[#020617]/80 backdrop-blur-3xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
                    <div className="flex items-center gap-6 cursor-pointer" onClick={() => setCurrentView('home')}>
                        <img src="brkthru logo.png" alt="Brkthru" className="h-10 w-auto" />
                        <div className="h-8 w-px bg-white/10 hidden sm:block"></div>
                        <span className="text-[11px] font-black uppercase tracking-[0.5em] text-amber-500 hidden sm:block">
                            Tour 2026
                        </span>
                    </div>

                    <nav className="hidden lg:flex items-center gap-14">
                        <a
                            href="about.html"
                            className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-amber-500 transition-all"
                        >
                            The Narrative
                        </a>
                        <a
                            href="corporate.html"
                            className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-amber-500 transition-all"
                        >
                            Corporate
                        </a>
                        <a
                            href="shop.html"
                            className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-amber-500 transition-all"
                        >
                            Digital Shop
                        </a>

                        <div className="relative" onMouseLeave={() => setDropdownOpen(false)}>
                            <button
                                onMouseEnter={() => setDropdownOpen(true)}
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="bg-amber-500 text-slate-900 px-10 py-3.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all flex items-center gap-2 shadow-2xl shadow-amber-500/10"
                            >
                                Tour Schedule
                                <ChevronRight
                                    className={cn('w-3.5 h-3.5 transition-transform', dropdownOpen && 'rotate-90')}
                                />
                            </button>

                            {dropdownOpen && (
                                <div className="absolute top-full right-0 mt-6 w-80 bg-slate-900 border border-white/10 rounded-[2.5rem] p-4 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-500">
                                    {WORKSHOPS.map((w) => (
                                        <button
                                            key={w.id}
                                            onClick={() => {
                                                setCurrentView(`workshop-${w.id}`);
                                                setDropdownOpen(false);
                                            }}
                                            className="w-full text-left p-4 rounded-2xl hover:bg-amber-500 hover:text-slate-900 text-[10px] font-black uppercase tracking-widest text-white/60 transition-all mb-1 last:mb-0"
                                        >
                                            {w.title}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </nav>

                    <button className="lg:hidden p-3 bg-white/5 rounded-full border border-white/10">
                        <Menu className="w-6 h-6 text-amber-500" />
                    </button>
                </div>
            </header>

            <main className="pt-24">
                {currentView === 'home' ? (
                    <>
                        {/* HERO */}
                        <section className="relative py-52 overflow-hidden text-center px-8 border-b border-white/5">
                            <div className="absolute inset-0 z-0">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.12)_0%,transparent_70%)] blur-[120px]"></div>
                            </div>

                            <div className="relative z-10 max-w-6xl mx-auto">
                                <div className="flex justify-center mb-16">
                                    <div className="inline-flex items-center gap-4 px-10 py-4 rounded-full bg-slate-900 border border-white/10 backdrop-blur-3xl shadow-2xl">
                                        <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.8em] text-amber-500">
                                            Dr. Michael Hall • Philippine 2026 Tour
                                        </span>
                                    </div>
                                </div>

                                <h1 className="text-8xl md:text-[13rem] font-black tracking-tighter mb-20 uppercase leading-[0.75] pr-10">
                                    The 2026 <br />
                                    <span className="bg-gradient-to-r from-amber-400 via-white to-amber-600 bg-clip-text text-transparent italic leading-[1.1] pr-10">
                                        MasterClass
                                    </span>
                                </h1>

                                <p className="max-w-3xl mx-auto text-white/50 text-2xl md:text-3xl font-light leading-relaxed mb-24 pr-10">
                                    Master the frameworks of{' '}
                                    <span className="text-white italic font-bold">Meta-NLP</span>. Experience the
                                    pinnacle of high-performance modeling with the cognitive original.
                                </p>

                                <div className="flex justify-center">
                                    <a
                                        href="#itinerary"
                                        className="group px-16 py-8 bg-white text-slate-950 rounded-full font-black uppercase tracking-[0.4em] text-xs hover:bg-amber-500 hover:scale-105 transition-all flex items-center gap-5 shadow-2xl shadow-white/5"
                                    >
                                        The Itinerary
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-3 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </section>

                        {/* ITINERARY */}
                        <section id="itinerary" className="py-48 max-w-7xl mx-auto px-8">
                            <div className="flex flex-col md:flex-row items-end justify-between mb-32 gap-10">
                                <div className="max-w-2xl">
                                    <h2 className="text-7xl font-black tracking-tighter mb-8 uppercase pr-10">
                                        Select Track
                                    </h2>
                                    <p className="text-white/30 text-xl font-light leading-relaxed">
                                        Engage with a specific masterclass track to unlock localized tier pricing and
                                        dynamic booking portals.
                                    </p>
                                </div>
                                <div className="hidden md:block h-px flex-1 bg-white/5 mb-10 mx-16"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {WORKSHOPS.map((ws) => (
                                    <div
                                        key={ws.id}
                                        onClick={() => setCurrentView(`workshop-${ws.id}`)}
                                        className="group relative bg-slate-900 border border-white/5 rounded-[4rem] overflow-hidden cursor-pointer hover:border-amber-500 transition-all duration-1000 shadow-2xl"
                                    >
                                        <div className="aspect-[16/9] overflow-hidden relative">
                                            <img
                                                src={ws.img}
                                                alt={ws.title}
                                                className="w-full h-full object-cover transition-transform duration-[4000ms] group-hover:scale-110 grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100"
                                                onError={(e) => {
                                                    e.target.src = `https://via.placeholder.com/800x1000?text=${ws.title}`;
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-100"></div>
                                            <div className="absolute top-12 left-12">
                                                <span className="px-8 py-3 bg-amber-500/20 backdrop-blur-2xl rounded-full text-[10px] font-black text-amber-500 uppercase tracking-widest border border-amber-500/20">
                                                    {ws.type}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-12">
                                            <h3 className="text-4xl font-black tracking-tight text-white mb-8 uppercase leading-none pr-10 group-hover:text-amber-500 transition-colors uppercase">
                                                {ws.title}
                                            </h3>
                                            <div className="flex flex-wrap gap-10 text-[11px] font-black text-white/30 uppercase tracking-[0.3em]">
                                                <span className="flex items-center gap-3">
                                                    <Calendar className="w-4 h-4 text-amber-500" /> {ws.date}
                                                </span>
                                                <span className="flex items-center gap-3">
                                                    <MapPin className="w-4 h-4 text-amber-500" /> {ws.location}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* STRATEGIC MILESTONES (NAVY/GOLD) */}
                        <section className="py-48 bg-slate-900 relative">
                            <div className="max-w-7xl mx-auto px-8 relative z-10">
                                <div className="text-center mb-32">
                                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-10 uppercase pr-10">
                                        Strategic Milestones
                                    </h2>
                                    <p className="text-amber-500 font-black text-xl italic uppercase tracking-[0.4em]">
                                        Propelling Human Evolution
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                                    {[
                                        {
                                            icon: <TrendingUp className="w-12 h-12" />,
                                            title: 'Market Authority',
                                            desc: "Gain the executive skills used by the world's leading CEOs and influencers.",
                                        },
                                        {
                                            icon: <Award className="w-12 h-12" />,
                                            title: 'Global Validation',
                                            desc: 'Verified certification under the International Society of Neuro-Semantics.',
                                        },
                                        {
                                            icon: <Target className="w-12 h-12" />,
                                            title: 'Precision Models',
                                            desc: 'Neuro-cognitive engineering designed for surgical performance accuracy.',
                                        },
                                    ].map((m, i) => (
                                        <div
                                            key={i}
                                            className="group p-12 bg-slate-950 border border-white/5 rounded-[3rem] hover:border-amber-500 transition-all"
                                        >
                                            <div className="text-amber-500 mb-8 group-hover:scale-110 transition-transform">
                                                {m.icon}
                                            </div>
                                            <h4 className="text-2xl font-black text-white mb-6 uppercase tracking-tighter">
                                                {m.title}
                                            </h4>
                                            <p className="text-white/40 text-lg font-light leading-relaxed">{m.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </>
                ) : activeWorkshop ? (
                    /* WORKSHOP VIEW */
                    <section className="py-32 max-w-7xl mx-auto px-8 animate-in slide-in-from-bottom-8 duration-700">
                        <button
                            onClick={() => setCurrentView('home')}
                            className="group flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.5em] text-white/20 hover:text-amber-500 transition-all mb-20"
                        >
                            <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-3 transition-transform" />
                            Network Map
                        </button>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
                            <div className="space-y-16">
                                <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-slate-900 border border-white/10 shadow-xl">
                                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">
                                        Elite Session
                                    </span>
                                </div>

                                <h2 className="text-8xl md:text-11xl font-black tracking-tighter leading-[0.75] uppercase pr-10">
                                    {activeWorkshop.title.split(' (')[0]}
                                    <br />
                                    <span className="text-white/20 italic font-black uppercase pr-10">
                                        {activeWorkshop.title.includes('(')
                                            ? `(${activeWorkshop.title.split('(')[1]}`
                                            : ''}
                                    </span>
                                </h2>

                                <div className="flex flex-wrap gap-8">
                                    <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] flex-1">
                                        <p className="text-amber-500/30 text-[10px] font-black uppercase tracking-[0.5em] mb-4 italic">
                                            Session Window
                                        </p>
                                        <p className="text-2xl font-black uppercase pr-10">{activeWorkshop.date}</p>
                                    </div>
                                    <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] flex-1">
                                        <p className="text-amber-500/30 text-[10px] font-black uppercase tracking-[0.5em] mb-4 italic">
                                            Deployment Area
                                        </p>
                                        <p className="text-2xl font-black uppercase pr-10">{activeWorkshop.location}</p>
                                    </div>
                                </div>

                                <div className="prose prose-invert prose-2xl text-white/40 font-light leading-relaxed pr-10">
                                    <p>{activeWorkshop.description}</p>
                                    <p className="mt-8">
                                        Unlock the core operating system of human performance with{' '}
                                        <span className="text-white italic font-black uppercase">Meta-NLP</span>. An
                                        advanced immersion certified by the International Society of Neuro-Semantics.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                    {[
                                        {
                                            icon: <Zap className="w-8 h-8" />,
                                            title: 'Precision Gear',
                                            desc: 'Advanced neuro-cognitive tools',
                                        },
                                        {
                                            icon: <Users className="w-8 h-8" />,
                                            title: 'Impact Flow',
                                            desc: 'Leading with surgical intent',
                                        },
                                        {
                                            icon: <CheckCircle2 className="w-8 h-8" />,
                                            title: 'ISNS Accredited',
                                            desc: 'Global mastery standards',
                                        },
                                        {
                                            icon: <Globe className="w-8 h-8" />,
                                            title: 'Regional Elite',
                                            desc: 'Exclusive 2026 Engagement',
                                        },
                                    ].map((feat, i) => (
                                        <div
                                            key={i}
                                            className="flex gap-8 p-10 rounded-[3rem] border border-white/5 bg-slate-900/40"
                                        >
                                            <div className="mt-1 text-amber-500">{feat.icon}</div>
                                            <div>
                                                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white mb-2">
                                                    {feat.title}
                                                </h4>
                                                <p className="text-sm text-white/20 font-medium leading-relaxed">
                                                    {feat.desc}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="sticky top-40">
                                <PricingMatrixUI workshopId={activeWorkshop.id} workshopName={activeWorkshop.title} />

                                <div className="mt-16 text-center">
                                    <div className="inline-flex items-center gap-10 border border-white/5 bg-slate-900 px-14 py-8 rounded-[3rem]">
                                        <div>
                                            <p className="text-[10px] font-black text-amber-500/30 uppercase tracking-widest mb-2">
                                                Inventory
                                            </p>
                                            <p className="text-xl font-black text-amber-500 leading-none">SCARCE</p>
                                        </div>
                                        <div className="w-px h-10 bg-white/10"></div>
                                        <div>
                                            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-2">
                                                Authority
                                            </p>
                                            <p className="text-xl font-black text-white leading-none">PREMIUM</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ) : null}

                {/* LEAD FACULTY OVERLAY */}
                {currentView === 'home' && (
                    <section className="py-60 bg-[#010411]">
                        <div className="max-w-7xl mx-auto px-8 text-center">
                            <div className="mb-48">
                                <h2 className="text-8xl md:text-10xl font-black tracking-tighter mb-10 uppercase pr-10">
                                    Expert Faculty
                                </h2>
                                <p className="text-amber-500/50 text-2xl italic font-light max-w-2xl mx-auto">
                                    Mentors specialized in Meta-NLP and the science of human actualization.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
                                {FACULTY.map((f, idx) => (
                                    <div key={idx} className="group flex flex-col items-center">
                                        <div className="aspect-[4/6] w-full rounded-[4rem] overflow-hidden border border-white/5 mb-12 grayscale group-hover:grayscale-0 transition-all duration-1000 relative bg-slate-900 shadow-2xl">
                                            <img
                                                src={f.img}
                                                alt={f.name}
                                                className="w-full h-full object-cover object-top transition-transform duration-[3000ms] group-hover:scale-105"
                                                onError={(e) => {
                                                    e.target.src = `https://via.placeholder.com/800x1000?text=${f.name}`;
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-slate-950/40 group-hover:opacity-0 transition-opacity"></div>
                                        </div>
                                        <h4 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter group-hover:text-amber-500 transition-colors pr-10">
                                            {f.name}
                                        </h4>
                                        <p className="text-[11px] font-black text-amber-500 uppercase tracking-[0.5em] mb-6 italic">
                                            {f.role}
                                        </p>
                                        <p className="text-lg text-white/40 leading-relaxed font-light max-w-xs">
                                            {f.bio}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>

            {/* FOOTER - TITANIUM ANCHOR (NAVY/GOLD) */}
            <footer className="py-48 border-t border-white/5 bg-slate-950">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-24 mb-48">
                        <div className="md:col-span-1">
                            <img src="brkthru logo.png" alt="Brkthru" className="h-12 w-auto mb-12" />
                            <p className="text-xl text-white/30 leading-relaxed font-light pr-10">
                                Engineering high-performance using{' '}
                                <span className="text-amber-500 font-black italic uppercase">Meta-NLP</span> and the
                                mastery of mind.
                            </p>
                        </div>

                        <div className="space-y-12">
                            <h5 className="text-[11px] font-black text-amber-500 uppercase tracking-[0.6em]">
                                The Ecosystem
                            </h5>
                            <ul className="space-y-8">
                                <li>
                                    <a
                                        href="#"
                                        className="text-sm font-black text-white/20 hover:text-white transition-all uppercase tracking-[0.3em]"
                                    >
                                        MasterClass Library
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-sm font-black text-white/20 hover:text-white transition-all uppercase tracking-[0.3em]"
                                    >
                                        Elite Coaching
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-sm font-black text-white/20 hover:text-white transition-all uppercase tracking-[0.3em]"
                                    >
                                        Digital Tools
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-12">
                            <h5 className="text-[11px] font-black text-amber-500 uppercase tracking-[0.6em]">
                                Navigation
                            </h5>
                            <ul className="space-y-8">
                                <li>
                                    <a
                                        href="about.html"
                                        className="text-sm font-black text-white/20 hover:text-white transition-all uppercase tracking-[0.3em]"
                                    >
                                        Our Narrative
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="corporate.html"
                                        className="text-sm font-black text-white/20 hover:text-white transition-all uppercase tracking-[0.3em]"
                                    >
                                        Corporate Elite
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="shop.html"
                                        className="text-sm font-black text-white/20 hover:text-white transition-all uppercase tracking-[0.3em]"
                                    >
                                        Online Shop
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-12">
                            <h5 className="text-[11px] font-black text-amber-500 uppercase tracking-[0.6em]">
                                Social Connect
                            </h5>
                            <div className="flex gap-8">
                                <a
                                    href="#"
                                    className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/20 hover:border-amber-500 hover:text-amber-500 hover:scale-110 transition-all bg-white/[0.05] shadow-2xl"
                                >
                                    <Facebook className="w-6 h-6" />
                                </a>
                                <a
                                    href="#"
                                    className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/20 hover:border-amber-500 hover:text-amber-500 hover:scale-110 transition-all bg-white/[0.05] shadow-2xl"
                                >
                                    <Instagram className="w-6 h-6" />
                                </a>
                                <a
                                    href="#"
                                    className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/20 hover:border-amber-500 hover:text-amber-500 hover:scale-110 transition-all bg-white/[0.05] shadow-2xl"
                                >
                                    <Linkedin className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="pt-20 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-16">
                        <div className="flex items-center gap-12">
                            <p className="text-[11px] font-black text-white/10 uppercase tracking-[0.6em]">
                                © 2026 Brkthru Ventures Inc.
                            </p>
                            <div className="hidden lg:block h-6 w-px bg-white/5"></div>
                            <p className="text-[10px] font-black text-white/5 uppercase tracking-[0.8em]">
                                Cognitive Mastery Systems
                            </p>
                        </div>

                        <div className="flex gap-20">
                            <a
                                href="#"
                                className="text-[10px] font-black text-white/10 uppercase tracking-[0.6em] hover:text-amber-500 transition-colors"
                            >
                                Privacy Charter
                            </a>
                            <a
                                href="#"
                                className="text-[10px] font-black text-white/10 uppercase tracking-[0.6em] hover:text-amber-500 transition-colors"
                            >
                                Protocol / Terms
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
