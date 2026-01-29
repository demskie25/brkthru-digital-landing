import React, { useState, useEffect } from 'react';
import {
    Calendar,
    MapPin,
    Star,
    User,
    Clock,
    CheckCircle,
    ChevronRight,
    ArrowRight,
    Menu,
    X,
    Users,
    Brain,
    Heart,
    Briefcase,
    AlertCircle,
    ChevronDown,
    Shield,
    Target,
    MessageSquare,
    BookOpen,
    Layers,
    Zap,
    ExternalLink,
    TrendingUp,
    Search,
    Sliders,
    Activity,
    DollarSign,
    Compass,
    Home,
    Cpu,
    LifeBuoy,
    CheckSquare,
    Mail,
    Phone,
    Loader2,
    Play,
} from 'lucide-react';

/**
 * BRKTHRU MASTER PLATFORM v2026.TITANIUM_LOCKDOWN
 * MANDATE: ELIMINATE ALL API HANDSHAKES. NO DYNAMIC URL PARAMS.
 * RULE: THE SWITCHBOARD ENGINE.
 * VISUAL SOVEREIGNTY: MANUAL RE-ANCHORING OF ASSETS.
 * TYPOGRAPHY: STRICT SANS-SERIF FOR FUNCTIONAL/PRICES/LABELS.
 */

// --- 1. THE SWITCHBOARD ENGINE: DATA MATRICES ---

const PRICING_DATA = {
    'tfh-mnl': {
        local: [
            { label: 'Super Early Bird', price: 25000, deadline: '2026-03-31' },
            { label: 'Early Bird 2', price: 28250, deadline: '2026-05-31' },
            { label: 'Early Bird 3', price: 31500, deadline: '2026-07-31' },
            { label: 'Early Bird 4', price: 34750, deadline: '2026-08-30' },
            { label: 'Advance Rate', price: 36000, deadline: '2026-10-15' },
            { label: 'Walk-in Rate', price: 38545, deadline: '2026-12-31' },
        ],
        intl: [
            { label: 'Super Early Bird (USD)', price: 530, deadline: '2026-03-31' },
            { label: 'Walk-in Rate (USD)', price: 815, deadline: '2026-12-31' },
        ],
    },
    '5mm-mnl': {
        local: [
            { label: 'Super Early Bird', price: 44000, deadline: '2026-03-31' },
            { label: 'Regular Rate', price: 68000, deadline: '2026-12-31' },
        ],
    },
    'coaching-bcd': {
        local: [{ label: 'Flat Rate', price: 2000, deadline: '2026-12-31' }],
    },
    'parenting-mnl': {
        local: [
            { label: 'Super Early Bird', price: 1600, deadline: '2026-03-31' },
            { label: 'Regular Rate', price: 2500, deadline: '2026-12-31' },
        ],
    },
    'parenting-bcd': {
        local: [
            { label: 'Super Early Bird', price: 1000, deadline: '2026-03-31' },
            { label: 'Regular Rate', price: 1600, deadline: '2026-12-31' },
        ],
    },
};

const getComputedActiveRate = (workshopId, category = 'local') => {
    const tiers = PRICING_DATA?.[workshopId]?.[category] || [];
    if (tiers.length === 0) return { price: 0, label: 'TBD' };

    const today = new Date();
    const activeTier = tiers.find((tier) => {
        const deadline = new Date(tier?.deadline);
        deadline.setHours(23, 59, 59, 999);
        return today <= deadline;
    });
    return activeTier || tiers[tiers.length - 1];
};

const WORKSHOPS = [
    {
        id: 'tfh-mnl',
        title: 'Brain Camp: High-Performance Thinking',
        city: 'Manila',
        date: 'Nov 3-5, 2026',
        duration: '3 Days',
        icon: <Brain className="text-purple-500" />,
        image: 'thinking.jpg',
        hook: 'The Science of Error-Free Decision Making.',
        summary:
            "Most leaders operate on 'default mental software.' This 3-day Brain Camp identifies hidden thinking traps that cause decision fatigue and strategic blindspots. Upgrade your executive OS for the Meta-Revolution.",
        curriculum: [
            'Identifying the 14 Most Common Leadership Thinking Traps',
            'Managing Your Executive Focus in High-Stakes Situations',
            'The Meaning Detection Framework for Root Cause Analysis',
            'Closing the Gap between Strategic Plans and Daily Execution',
        ],
        phases: [
            { day: 'Day 1', focus: 'Mindset', topic: 'Debugging Default Thinking Traps & Biases' },
            { day: 'Day 2', focus: 'Framework', topic: 'Detecting the Meaning and Logic Behind Team Problems' },
            {
                day: 'Day 3',
                focus: 'Muscle',
                topic: 'Translating Intellectual Insights into Automatic Performance Habits',
            },
        ],
    },
    {
        id: '5mm-mnl',
        title: 'The 5-Minute Manager',
        city: 'Manila',
        date: 'Oct 26-29, 2026',
        duration: '4 Days',
        icon: <Briefcase className="text-emerald-600" />,
        image: '5mm.jpg',
        hook: 'Facilitating High-Quality Performance.',
        summary:
            'Stop micromanaging and start facilitating quality. This 4-day intensive equips you with specific conversational scripts to handle delegation, feedback, and accountability in 5 minutes or less.',
        curriculum: [
            'The 5 Levels of Practical Delegation',
            'The Feedback Quotient: Moving from Critique to Growth',
            'Handling Difficult Team Conversations with Surgical Precision',
            'The Accountability Formula for Remote and In-Office Teams',
        ],
    },
    {
        id: 'coaching-bcd',
        title: 'Executive Facilitation Overview',
        city: 'Bacolod',
        date: 'Oct 22, 2026',
        duration: '4 Hours (Dinner Session)',
        icon: <Target className="text-blue-500" />,
        image: 'thinking.jpg',
        hook: 'Mastering Breakthrough Conversations.',
        summary:
            "An introduction to advanced facilitation. Learn how the world's most effective managers unlock breakthroughs in their teams through precise behavioral coaching.",
    },
    {
        id: 'parenting-mnl',
        title: 'Impactful Parenting for Leaders',
        city: 'Manila',
        date: 'Oct 24, 2026',
        duration: '1 Day',
        icon: <Heart className="text-pink-500" />,
        image: 'parenting.jpg',
        summary:
            'Leadership starts at home. Learn the frameworks to raise independent, high-responsibility children while managing executive demands.',
    },
    {
        id: 'parenting-bcd',
        title: 'Impactful Parenting for Leaders',
        city: 'Bacolod',
        date: 'Nov 7, 2026',
        duration: '1 Day',
        icon: <Heart className="text-pink-600" />,
        image: 'parenting.jpg',
        summary:
            'A local intensive for Bacolod families focused on psychological safety and communication architecture.',
    },
];

const PRODUCTS = [
    {
        id: 'bundle-twinkey',
        title: 'The Twin Key Bundle',
        price: 649,
        img: 'twin.jpg',
        url: 'https://hitpay.link/n6dx11',
        explanation: 'Mindset (WCC) + Machinery (Toolkit). The most efficient path to absolute leadership mastery.',
        category: 'High Impact',
    },
    {
        id: 'wcc-10th',
        title: 'WCC 10th Anniversary',
        price: 399,
        img: 'wcc_cover.jpg',
        url: 'https://hitpay.link/mhy8sc',
        explanation:
            'Stop leading from fear. Learn the distinction between self-worth and self-confidence to lead with unshakeable authority.',
        category: 'Self-Mastery',
    },
    {
        id: 'toolkit',
        title: 'The LWCC Toolkit',
        price: 349,
        img: 'toolkit_cover.jpg',
        url: 'https://hitpay.link/9zlbvf',
        explanation: 'Tactical scripts and frameworks for behavioral precision. Stop having the same meeting twice.',
        category: 'Management',
    },
    {
        id: 'wcc-orig',
        title: 'WCC First Edition',
        price: 399,
        img: 'wcc_1st.jpg',
        url: 'https://hitpay.link/ppc7x6',
        explanation:
            'The original text that launched the Brkthru coaching methodology. A timeless guide to inner performance.',
        category: 'Classic',
    },
    {
        id: 'delegation',
        title: 'Delegation that Works',
        price: 199,
        img: 'delegation_main.jpg',
        url: 'https://hitpay.app/pay/brkthru',
        explanation:
            "Master the 5 specific levels of delegation and the 'Accountability Contract'. Stop micromanaging.",
        category: 'E-Books',
    },
    {
        id: 'feedback',
        title: 'The Feedback Quotient',
        price: 199,
        img: 'feedback_main.jpg',
        url: 'https://hitpay.app/pay/brkthru',
        explanation: 'Scripts for Corrective vs. Developmental feedback that trigger growth, not resentment.',
        category: 'E-Books',
    },
];

const TIMELINE_ERAS = [
    {
        year: '1997',
        tag: 'The Genesis',
        desc: 'Aldem Salvaña begins developing the personal leadership frameworks within community foundations.',
        image: 'timeline_genesis_1997.png',
        reverse: false,
    },
    {
        year: '1999',
        tag: 'The DNA Build',
        desc: 'SLTC Founding: Integrating the legacy of world-class management into a local executive standard.',
        image: 'timeline_dna_build_1999.png',
        reverse: true,
    },
    {
        year: '2014-2018',
        tag: 'The Integration Era',
        desc: 'A major certification leap, establishing the highest global standard for coaching in the region.',
        image: 'timeline_integration_2014_2018.png',
        reverse: false,
    },
    {
        year: '2020',
        tag: 'The Resilience Pivot',
        desc: 'Scaling High-Performance Thinking to digital landscapes during global market shifts.',
        image: 'timeline_resilience_2020_pivot.png',
        reverse: true,
    },
    {
        year: '2026',
        tag: 'The Transformation Tour',
        desc: 'Dr. L. Michael Hall joins for a 3-hub tour in Bacolod, Manila, and the Metaverse.',
        image: 'timeline_mountain_summit_2026.png',
        reverse: false,
    },
];

const LEAD_FACULTY = [
    {
        name: 'Aldem Salvaña',
        role: 'Managing Director & Lead Faculty',
        image: 'aldem.jpg',
        bio: 'One of the first Meta-Coaches and Neuro-Semantic Trainers in the country, bridging the gap between inspired knowing and sustainable doing.',
    },
    {
        name: 'Vanessa Salvaña',
        role: 'Strategic Director & Lead Faculty',
        image: 'vanessab.jpg',
        bio: "General Manager orchestrating the complex logistics and psychological safety of Brkthru's global training ecosystems.",
    },
    {
        name: 'Virna Villarosa',
        role: 'Director of Operations & Lead Faculty',
        image: 'virna.jpg',
        bio: 'Expert in emotional intelligence and high-stakes performance coaching for executives and clients worldwide.',
    },
];

// --- 2. THE UI ATOMS: STYLED COMPONENTS ---

const Button = ({ children, variant = 'primary', className = '', onClick, disabled }) => {
    const base =
        'px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 active:scale-95 shadow-sm font-sans disabled:opacity-50';
    const styles = {
        primary: 'bg-slate-900 text-white hover:bg-slate-800',
        accent: 'bg-amber-500 text-slate-900 hover:bg-amber-600 shadow-xl shadow-amber-200/50',
        outline: 'border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white',
        ghost: 'text-slate-400 hover:text-slate-900',
    };
    return (
        <button disabled={disabled} onClick={onClick} className={`${base} ${styles[variant]} ${className}`}>
            {children}
        </button>
    );
};

// --- 3. THE STRATEGIC CONFIRMATION MODAL ---

const ConfirmationModal = ({ isOpen, onClose, workshop, activeTier, onProceed }) => {
    if (!isOpen || !workshop) return null;

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 animate-in fade-in duration-300">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md" onClick={onClose} />

            {/* Modal Container */}
            <div className="relative bg-white rounded-[4rem] p-16 max-w-3xl w-full shadow-2xl border-8 border-slate-900 animate-in zoom-in duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors z-10"
                >
                    <X size={20} className="text-slate-600" />
                </button>

                {/* Content */}
                <div className="space-y-12 font-sans text-center relative z-10">
                    <div className="space-y-6">
                        <div className="inline-block px-6 py-2 bg-amber-500/10 text-amber-600 text-xs font-bold uppercase tracking-[0.5em] rounded-full border border-amber-500/20 font-sans">
                            Strategic Confirmation
                        </div>
                        <h2 className="text-5xl font-serif font-bold text-slate-900 leading-tight">
                            {workshop?.title}
                        </h2>
                        <div className="flex items-center justify-center gap-8 text-sm text-slate-500 font-sans font-bold">
                            <span className="flex items-center gap-2">
                                <MapPin size={16} className="text-amber-500" /> {workshop?.city}
                            </span>
                            <span className="flex items-center gap-2">
                                <Calendar size={16} className="text-amber-500" /> {workshop?.date}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock size={16} className="text-amber-500" /> {workshop?.duration}
                            </span>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-[4rem] p-12 space-y-8 border-2 border-slate-100">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest font-sans">
                            Computed Investment
                        </div>
                        <div className="space-y-4">
                            <div className="text-8xl font-bold text-slate-900 tracking-tighter font-sans">
                                ₱{(activeTier?.price || 0).toLocaleString()}
                            </div>
                            <div className="inline-block px-6 py-2 rounded-full bg-amber-500/10 text-amber-600 text-xs font-bold tracking-widest border border-amber-500/20 font-sans">
                                {activeTier?.label}
                            </div>
                        </div>
                        <p className="text-slate-500 text-sm font-sans leading-relaxed px-12">
                            This rate is verified based on today's date. Click below to proceed to our secure static
                            gateway.
                        </p>
                    </div>

                    <div className="flex gap-6 pt-6 font-sans">
                        <Button variant="outline" className="flex-1 py-8 text-[12px]" onClick={onClose}>
                            Review Details
                        </Button>
                        <Button variant="accent" className="flex-1 py-8 text-[12px]" onClick={onProceed}>
                            Secure Gateway <ArrowRight size={16} />
                        </Button>
                    </div>

                    <div className="flex items-center justify-center gap-3 text-xs text-slate-400 font-sans font-bold uppercase tracking-widest pt-4">
                        <Shield size={14} className="text-emerald-500" />
                        <span>Secured by HitPay • No Tracking • Static Direct</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- 4. THE TEMPLATES: VIEWS ---

const DashboardView = ({ navigate }) => {
    const [videoPlaying, setVideoPlaying] = React.useState(false);
    return (
        <div className="max-w-7xl mx-auto px-6 space-y-32 font-sans animate-in fade-in duration-1000">
            {/* TITANIUM HERO SECTION */}
            <div className="grid grid-cols-1">
                <div className="bg-slate-900 text-white rounded-[5rem] p-16 md:p-24 relative overflow-hidden shadow-2xl group min-h-[85vh] flex items-center">
                    <div className="absolute inset-0 z-0 opacity-20">
                        <img
                            src="hall_sketch.jpg"
                            alt="The Silhouette"
                            className="w-full h-full object-cover grayscale brightness-50"
                        />
                    </div>
                    <div className="absolute top-0 right-0 w-[60rem] h-[60rem] bg-amber-500/10 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10 space-y-12 max-w-5xl pr-12">
                        <div className="flex items-center gap-6 text-amber-500">
                            <Activity size={20} />
                            <span className="text-[12px] font-bold uppercase tracking-[0.6em] font-sans">
                                The 2026 Transformation Tour
                            </span>
                        </div>
                        <h1 className="text-6xl md:text-9xl font-serif font-bold leading-[0.85] pr-12">
                            Visual <br /> <span className="text-amber-500 italic">Sovereignty.</span>
                        </h1>
                        <p className="text-slate-300 text-2xl md:text-3xl font-serif italic pr-24 leading-relaxed max-w-4xl">
                            "Engineering executive breakthroughs by eliminating the thinking traps that sabotage
                            decision-making. Pure performance. Zero noise."
                        </p>
                        <div className="flex flex-wrap gap-8 pt-10 font-sans">
                            <Button
                                variant="accent"
                                className="px-16 py-8 text-[13px]"
                                onClick={() => navigate('workshop-tfh-mnl')}
                            >
                                Explore Brain Camp
                            </Button>
                            <Button
                                variant="outline"
                                className="text-white border-white/20 hover:bg-white/10 px-16 py-8 text-[13px]"
                                onClick={() => navigate('shop')}
                            >
                                Digital Shop
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* RESTORED VIDEO FEATURE: EPISODE 3 */}
            <div className="grid lg:grid-cols-12 gap-20 items-center">
                <div className="lg:col-span-12 space-y-16">
                    <div className="text-center space-y-8">
                        <div className="inline-block px-6 py-2 bg-slate-50 text-slate-400 text-xs font-bold uppercase tracking-[0.5em] rounded-full border border-slate-100 font-sans">
                            Masterclass Series
                        </div>
                        <h2 className="text-6xl md:text-8xl font-serif font-bold text-slate-900 leading-tight">
                            What Great Managers <br /> <span className="text-amber-500 italic">Do Differently</span>
                        </h2>
                        <div className="w-32 h-2.5 bg-amber-500 mx-auto rounded-full" />
                        <p className="max-w-4xl mx-auto text-2xl text-slate-400 font-serif italic leading-relaxed pt-6">
                            "The distinction between management and facilitation is the core of executive breakthrough.
                            Watch Episode 3: The Facilitation Archetype."
                        </p>
                    </div>
                    <div
                        className="relative aspect-video rounded-[6rem] overflow-hidden shadow-2xl border-[12px] border-slate-50 group bg-slate-900 cursor-pointer"
                        onClick={() => !videoPlaying && setVideoPlaying(true)}
                    >
                        {!videoPlaying ? (
                            <>
                                <img
                                    src="https://img.youtube.com/vi/MHRCXxq0Zmg/maxresdefault.jpg"
                                    alt="Thumbnail"
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors" />
                                <div className="absolute bottom-16 left-16 right-16 flex justify-between items-end z-20">
                                    <div className="space-y-4">
                                        <div className="text-[12px] font-bold text-amber-500 uppercase tracking-widest font-sans">
                                            LWCC Masterclass • Episode 3
                                        </div>
                                        <div className="text-4xl text-white font-serif font-bold">
                                            The Facilitation Archetype
                                        </div>
                                    </div>
                                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-3xl transform group-hover:scale-110 transition-transform">
                                        <Play size={32} fill="currentColor" />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <iframe
                                className="w-full h-full object-cover"
                                src="https://www.youtube.com/embed/MHRCXxq0Zmg?autoplay=1&controls=1"
                                title="What Great Managers Do Differently"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* WORKSHOP GRID: QUICK LINKS */}
            <div className="space-y-16">
                <div className="flex justify-between items-end border-b border-slate-100 pb-12">
                    <div className="space-y-4">
                        <h2 className="text-5xl font-serif font-bold text-slate-900">Tour Itinerary 2026</h2>
                        <p className="text-slate-400 font-sans font-bold uppercase tracking-widest text-xs">
                            Direct static mapping • Zero redirection errors
                        </p>
                    </div>
                    <Button variant="ghost" className="text-amber-600 font-bold" onClick={() => navigate('about')}>
                        View Full Story <ArrowRight size={14} />
                    </Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {WORKSHOPS.map((w) => (
                        <div
                            key={w.id}
                            onClick={() => navigate(`workshop-${w.id}`)}
                            className="bg-white rounded-[4rem] overflow-hidden border border-slate-100 shadow-xl hover:shadow-2xl transition-all group cursor-pointer flex flex-col h-full"
                        >
                            <div className="aspect-[4/5] relative overflow-hidden">
                                <img
                                    src={w.image}
                                    alt={w.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent text-white">
                                    <div className="text-xs font-bold uppercase tracking-[0.3em] font-sans text-amber-500 mb-2">
                                        {w.city} • {w.date}
                                    </div>
                                    <h3 className="text-3xl font-serif font-bold leading-tight group-hover:text-amber-500 transition-colors">
                                        {w.title.split(':')[0]}
                                    </h3>
                                </div>
                            </div>
                            <div className="p-10 space-y-8 flex-grow flex flex-col justify-between font-sans">
                                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">{w.summary}</p>
                                <div className="pt-6 border-t border-slate-50 flex justify-between items-center font-sans">
                                    <div className="text-2xl font-bold text-slate-900 tracking-tighter">
                                        ₱{(getComputedActiveRate(w.id)?.price || 0).toLocaleString()}
                                    </div>
                                    <div className="text-amber-500 group-hover:translate-x-3 transition-transform">
                                        <ArrowRight size={24} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const AboutView = ({ navigate }) => (
    <div className="max-w-7xl mx-auto px-6 space-y-60 font-sans animate-in fade-in duration-1000">
        {/* ABOUT HERO */}
        <div className="grid lg:grid-cols-2 gap-24 items-center pt-20">
            <div className="space-y-12">
                <div className="inline-block px-8 py-3 bg-amber-500/10 text-amber-600 text-xs font-bold uppercase tracking-[0.6em] rounded-full border border-amber-500/20 font-sans">
                    The Brkthru Odyssey
                </div>
                <h1 className="text-7xl md:text-9xl font-serif font-bold text-slate-900 leading-[0.9]">
                    The Brkthru <br /> <span className="text-amber-500 italic">Legacy.</span>
                </h1>
                <p className="text-3xl text-slate-400 font-serif italic leading-relaxed pr-16">
                    "Since 1997, we have been engineering the inner machinery of executive performance. A journey from
                    community foundations to global boardroom breakthroughs."
                </p>
                <div className="flex gap-12 text-[12px] font-bold text-slate-400 uppercase tracking-widest font-sans pt-6">
                    <div className="space-y-2">
                        <div className="text-slate-900 text-6xl font-black font-sans tracking-tighter">29</div>
                        <div>Years of Impact</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-slate-900 text-6xl font-black font-sans tracking-tighter">500+</div>
                        <div>Organizations</div>
                    </div>
                </div>
            </div>
            <div className="relative aspect-square rounded-[6rem] overflow-hidden shadow-3xl border-[16px] border-slate-50 group">
                <img
                    src="brkthru-origins-main.png"
                    alt="Origins"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors" />
            </div>
        </div>

        {/* ODYSSEY TIMELINE */}
        <div className="space-y-40">
            <div className="text-center space-y-8">
                <h2 className="text-6xl md:text-8xl font-serif font-bold text-slate-900">
                    The Core <span className="text-amber-500 italic">Timeline</span>
                </h2>
                <div className="w-32 h-2.5 bg-amber-500 mx-auto rounded-full" />
            </div>

            <div className="grid gap-60 relative">
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-100 hidden lg:block" />

                {TIMELINE_ERAS.map((m, i) => (
                    <div
                        key={i}
                        className={`grid lg:grid-cols-2 gap-24 items-center relative z-10 ${m.reverse ? 'lg:flex-row-reverse' : ''}`}
                    >
                        <div className="relative group rounded-[5rem] overflow-hidden shadow-2xl border-8 border-slate-50 aspect-video bg-slate-100">
                            <img
                                src={m.image}
                                alt={m.tag}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                            />
                            <div
                                className={`absolute top-12 ${m.reverse ? 'right-12' : 'left-12'} px-10 py-4 bg-slate-900 text-white rounded-[2rem] font-black text-4xl font-sans shadow-2xl z-20`}
                            >
                                {m.year}
                            </div>
                        </div>
                        <div className={`space-y-10 ${m.reverse ? 'lg:text-right px-20' : 'px-20'}`}>
                            <div className="inline-block px-6 py-2 bg-slate-100 text-slate-400 text-xs font-bold uppercase tracking-[0.5em] rounded-full font-sans">
                                Milestone {i + 1}
                            </div>
                            <h3 className="text-6xl font-serif font-bold text-slate-900">{m.tag}</h3>
                            <p className="text-2xl text-slate-500 font-serif italic leading-relaxed">{m.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* LEAD FACULTY SECTION */}
        <div className="space-y-32">
            <div className="text-center space-y-8">
                <h2 className="text-6xl md:text-8xl font-serif font-bold text-slate-900">
                    The <span className="text-amber-500 italic">Architects</span>
                </h2>
                <div className="w-32 h-2.5 bg-amber-500 mx-auto rounded-full" />
            </div>

            <div className="grid md:grid-cols-3 gap-16">
                {LEAD_FACULTY.map((f, i) => (
                    <div key={i} className="text-center space-y-10 group">
                        <div className="aspect-square relative rounded-full overflow-hidden border-8 border-slate-50 shadow-2xl group-hover:border-amber-500 transition-colors duration-500">
                            <img
                                src={f.image}
                                alt={f.name}
                                className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors" />
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-4xl font-serif font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                                {f.name}
                            </h3>
                            <div className="text-amber-500 font-bold uppercase tracking-[0.4em] text-xs font-sans">
                                {f.role}
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed px-10 italic font-serif">"{f.bio}"</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const ShopView = ({ handleCheckout }) => (
    <div className="max-w-7xl mx-auto px-6 space-y-40 font-sans animate-in fade-in duration-1000 pt-20">
        <div className="text-center space-y-8">
            <h1 className="text-8xl md:text-9xl font-serif font-bold text-slate-900 leading-[0.9]">
                Digital <span className="text-amber-500 italic">Shop.</span>
            </h1>
            <p className="text-slate-400 font-bold uppercase tracking-[0.8em] text-[12px] font-sans max-w-2xl mx-auto pt-6">
                Static Verified Links • Zero API Failures • Instant Access
            </p>
            <div className="w-32 h-2.5 bg-amber-500 mx-auto rounded-full mt-12" />
        </div>

        {/* PRIMARY BUNDLE FEATURE */}
        {(() => {
            const bundle = PRODUCTS.find((p) => p.id === 'bundle-twinkey');
            return (
                <div
                    onClick={() => handleCheckout(bundle)}
                    className="bg-slate-900 text-white rounded-[6rem] p-16 md:p-32 grid lg:grid-cols-2 gap-24 items-center shadow-3xl cursor-pointer hover:shadow-amber-500/10 transition-all border-8 border-slate-900 relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-amber-500/5 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2" />
                    <div className="space-y-12">
                        <div className="inline-block px-8 py-3 bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-[0.6em] rounded-full border border-amber-500/20 font-sans">
                            Executive Recommendation
                        </div>
                        <h2 className="text-6xl md:text-8xl font-serif font-bold leading-tight">
                            The Twin Key <br /> <span className="text-amber-500">Bundle.</span>
                        </h2>
                        <p className="text-2xl text-slate-400 font-serif italic leading-relaxed pr-12">
                            "{bundle?.explanation}"
                        </p>
                        <div className="flex items-center gap-8 font-sans">
                            <div className="text-8xl font-bold text-amber-500 tracking-tighter">
                                ₱{(bundle?.price || 0).toLocaleString()}
                            </div>
                            <div className="text-slate-500 font-bold uppercase tracking-[0.4em] text-xs">
                                Full Ecosystem <br /> Access
                            </div>
                        </div>
                        <Button
                            variant="accent"
                            className="w-full py-10 text-2xl group-hover:scale-105 transition-transform"
                        >
                            Initiate Checkout <ArrowRight size={28} />
                        </Button>
                    </div>
                    <div className="relative aspect-[3/4] rounded-[4rem] overflow-hidden shadow-2xl border-4 border-white/10 group-hover:rotate-1 transition-transform duration-700">
                        <img
                            src={bundle?.img}
                            alt="Bundle"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                    </div>
                </div>
            );
        })()}

        {/* SECONDARY PRODUCTS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 pt-20">
            {PRODUCTS.filter((p) => p.id !== 'bundle-twinkey').map((p) => (
                <div
                    key={p.id}
                    onClick={() => handleCheckout(p)}
                    className="bg-white p-14 rounded-[5rem] border border-slate-50 shadow-xl hover:shadow-2xl transition-all cursor-pointer group flex flex-col justify-between text-center space-y-12 h-full"
                >
                    <div className="space-y-10 text-center flex flex-col items-center">
                        <div className="w-60 h-80 shadow-3xl rounded-[3rem] overflow-hidden group-hover:scale-105 transition-all border border-slate-50 relative">
                            <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors" />
                        </div>
                        <div className="space-y-6">
                            <div className="text-xs font-bold text-slate-300 uppercase tracking-[0.5em] font-sans">
                                {p.category}
                            </div>
                            <h3 className="text-4xl font-serif font-bold text-slate-900 leading-tight">{p.title}</h3>
                            <p className="text-sm text-slate-500 leading-relaxed px-6 font-serif italic">
                                "{p.explanation}"
                            </p>
                            <div className="text-5xl font-bold text-slate-900 tracking-tighter font-sans">
                                ₱{(p?.price || 0).toLocaleString()}
                            </div>
                        </div>
                    </div>
                    <Button
                        variant="accent"
                        className="w-full py-8 text-[12px] font-sans group-hover:scale-105 transition-transform shadow-lg shadow-amber-500/10"
                    >
                        Secure Purchase <ArrowRight size={18} />
                    </Button>
                </div>
            ))}
        </div>
    </div>
);

// --- 5. THE CORE ENGINE: SWITCHBOARD & NAVIGATION ---

export default function App() {
    const [currentView, setCurrentView] = useState('home');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [modalState, setModalState] = useState({ isOpen: false, workshop: null, activeTier: null });

    useEffect(() => {
        // PARSE URL PARAMS - BUT ONLY FOR INTERNAL ROUTING (NO API TRIPPING)
        const params = new URLSearchParams(window?.location?.search);
        const wId = params.get('workshop');
        if (wId) {
            const exists = WORKSHOPS.some((w) => w.id === wId);
            if (exists) setCurrentView(`workshop-${wId}`);
        }
        window?.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentView]);

    const navigate = (v) => {
        setCurrentView(v);
        setDropdownOpen(false);
        const url = v?.startsWith('workshop-') ? `?workshop=${v.replace('workshop-', '')}` : '/';
        window?.history?.pushState({}, '', url);
    };

    const handleCheckout = (target, isWorkshop = false) => {
        // 1. SHOP PRODUCTS: DIRECT STATIC LINK MAPPING
        const staticLinks = ['bundle-twinkey', 'wcc-10th', 'toolkit', 'wcc-orig'];
        if (staticLinks.includes(target?.id) && target?.url) {
            window?.open(target.url, '_blank');
            return;
        }

        // 2. WORKSHOPS: THE SECURE GATEWAY MODAL
        if (isWorkshop) {
            const activeTier = getComputedActiveRate(target?.id);
            setModalState({ isOpen: true, workshop: target, activeTier });
            return;
        }

        // 3. SECONDARY ASSETS: DIRECT GATEWAY
        if (target?.url) {
            window?.open(target.url, '_blank');
        }
    };

    const handleModalProceed = () => {
        setModalState({ isOpen: false, workshop: null, activeTier: null });
        window?.open('https://hitpay.app/pay/brkthru', '_blank');
    };

    const handleModalClose = () => {
        setModalState({ isOpen: false, workshop: null, activeTier: null });
    };

    const renderWorkshopDetail = (id) => {
        const w = WORKSHOPS.find((item) => item?.id === id);
        if (!w) return <div className="p-40 text-center font-serif text-3xl">Asset Redirection Failure.</div>;

        const activeTier = getComputedActiveRate(id);
        const tiers = PRICING_DATA?.[id]?.local || [];

        return (
            <div className="max-w-7xl mx-auto px-6 py-20 animate-in fade-in transition-all font-sans">
                <Button variant="ghost" onClick={() => navigate('home')} className="mb-16 font-sans">
                    <ArrowRight className="rotate-180" /> Back to Hub
                </Button>

                <div className="grid lg:grid-cols-12 gap-32">
                    {/* LEFT COLUMN: INTEL */}
                    <div className="lg:col-span-8 space-y-32">
                        <div className="space-y-16">
                            <div className="inline-block px-8 py-3 bg-amber-500/10 text-amber-600 text-xs font-bold uppercase tracking-[0.6em] rounded-full border border-amber-500/20 font-sans">
                                Professional Training
                            </div>
                            <h1 className="text-7xl md:text-9xl font-serif font-bold text-slate-900 leading-[0.9]">
                                {w?.title}
                            </h1>
                            <p className="text-3xl italic text-slate-400 font-serif leading-relaxed pr-24">
                                "{w?.hook}"
                            </p>

                            <div className="grid grid-cols-3 border-y border-slate-50 py-16 text-amber-600 font-bold uppercase text-[12px] tracking-widest text-center font-sans">
                                <div className="space-y-4 border-r border-slate-100">
                                    <MapPin size={32} className="mx-auto" />
                                    <span>{w?.city}</span>
                                </div>
                                <div className="space-y-4 border-r border-slate-100">
                                    <Calendar size={32} className="mx-auto" />
                                    <span>{w?.date}</span>
                                </div>
                                <div className="space-y-4">
                                    <Clock size={32} className="mx-auto" />
                                    <span>{w?.duration}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-24">
                            <div className="space-y-10">
                                <h3 className="text-5xl font-serif font-bold text-slate-900">Strategic Overview</h3>
                                <p className="text-2xl text-slate-500 font-serif italic leading-relaxed">
                                    {w?.summary}
                                </p>
                            </div>

                            {/* CURRICULUM GRID */}
                            <div className="space-y-12">
                                <h4 className="text-[12px] font-bold uppercase tracking-[0.6em] text-amber-500 border-b pb-6 font-sans">
                                    Executive Skillset Matrix
                                </h4>
                                <div className="grid sm:grid-cols-2 gap-10 font-sans">
                                    {w?.curriculum?.map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex gap-8 items-start p-10 bg-slate-50 rounded-[3rem] border border-slate-100 group hover:border-amber-500/30 transition-colors"
                                        >
                                            <CheckCircle size={32} className="text-emerald-500 flex-shrink-0" />
                                            <span className="text-xl font-bold text-slate-800 leading-snug">
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* PHASES - IF EXISTS */}
                            {w?.phases && (
                                <div className="space-y-12 pt-10">
                                    <h4 className="text-sm font-bold uppercase tracking-[0.6em] text-purple-600 border-b pb-6 font-sans">
                                        The 3-Day Shift Timeline
                                    </h4>
                                    <div className="grid gap-10">
                                        {w?.phases?.map((p, i) => (
                                            <div
                                                key={i}
                                                className="bg-slate-900 text-white p-12 rounded-[4rem] shadow-2xl flex items-center justify-between group hover:bg-slate-800 transition-colors"
                                            >
                                                <div className="space-y-4">
                                                    <div className="text-xs font-black uppercase tracking-[0.4em] text-amber-500 font-sans">
                                                        {p?.day} • {p?.focus}
                                                    </div>
                                                    <div className="text-3xl font-serif font-bold text-white group-hover:text-amber-500 transition-colors">
                                                        {p?.topic}
                                                    </div>
                                                </div>
                                                <ChevronRight
                                                    size={48}
                                                    className="text-slate-700 group-hover:text-white transition-colors"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: INVESTMENT STICKY */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-40 space-y-16">
                            <div className="bg-slate-900 text-white p-16 rounded-[6rem] shadow-3xl text-center space-y-16 border-8 border-slate-900 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                                <div className="space-y-6">
                                    <span className="text-xs font-bold uppercase text-slate-500 tracking-[0.5em] font-sans">
                                        Current Verified Rate
                                    </span>
                                    <div className="text-8xl font-bold text-amber-500 tracking-tighter font-sans">
                                        ₱{(activeTier?.price || 0).toLocaleString()}
                                    </div>
                                    <div className="inline-block px-8 py-3 rounded-full bg-amber-500/10 text-amber-500 text-sm font-bold tracking-[0.4em] border border-amber-500/20 font-sans">
                                        {activeTier?.label}
                                    </div>
                                </div>
                                <Button
                                    variant="accent"
                                    className="w-full py-12 text-2xl shadow-3xl shadow-amber-500/20 group-hover:scale-105 transition-transform"
                                    onClick={() => handleCheckout(w, true)}
                                >
                                    Secure My Seat <ArrowRight size={28} />
                                </Button>
                            </div>

                            {/* FULL INVESTMENT SCHEDULE */}
                            <div className="bg-white p-16 rounded-[6rem] border-2 border-slate-50 shadow-xl space-y-12">
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-[0.5em] border-b border-slate-50 pb-10 font-sans text-center">
                                    Investment Schedule
                                </h4>
                                <div className="space-y-10">
                                    {tiers?.map((t, i) => {
                                        const isExpired = new Date(t?.deadline) < new Date();
                                        return (
                                            <div
                                                key={i}
                                                className={`flex justify-between items-end border-b border-slate-50 pb-10 last:border-0 transition-opacity ${isExpired ? 'opacity-10 grayscale pointer-events-none' : ''}`}
                                            >
                                                <div className="space-y-2 text-left">
                                                    <div className="font-bold text-slate-900 text-sm tracking-widest uppercase font-sans">
                                                        {t?.label}
                                                    </div>
                                                    {t?.deadline && (
                                                        <div className="text-xs text-slate-400 uppercase tracking-[0.2em] font-sans font-bold">
                                                            Until {new Date(t?.deadline).toLocaleDateString()}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="text-4xl font-bold text-slate-900 tracking-tighter font-sans">
                                                    ₱{(t?.price || 0).toLocaleString()}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900 antialiased selection:bg-amber-100 selection:text-amber-900">
            {/* NAVIGATION HUB */}
            <nav className="fixed top-0 left-0 right-0 h-32 bg-white/80 backdrop-blur-3xl z-[200] border-b border-slate-100 flex items-center shadow-sm px-12">
                <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
                    <div className="flex items-center gap-8 cursor-pointer group" onClick={() => navigate('home')}>
                        <img
                            src="images/brkthru-logo.png"
                            alt="Logo"
                            className="h-10 md:h-14 w-auto group-hover:scale-110 transition-transform"
                        />
                        <div className="hidden lg:block h-10 w-px bg-slate-200" />
                        <span className="hidden lg:block text-sm font-black text-slate-400 tracking-[0.5em] uppercase font-sans">
                            Executive Intelligence
                        </span>
                    </div>

                    <div className="hidden lg:flex items-center gap-16 font-sans font-bold uppercase text-sm tracking-[0.3em]">
                        {['home', 'about', 'shop'].map((v) => (
                            <button
                                key={v}
                                onClick={() => navigate(v)}
                                className={`transition-all hover:text-amber-600 ${currentView === v ? 'text-amber-600' : 'text-slate-400'}`}
                            >
                                {v}
                            </button>
                        ))}
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className={`flex items-center gap-4 transition-all hover:text-amber-600 ${currentView?.includes('workshop') ? 'text-amber-600' : 'text-slate-400'}`}
                            >
                                Tour 2026 <ChevronDown size={14} />
                            </button>
                            {dropdownOpen && (
                                <div className="absolute top-full right-0 w-96 bg-white shadow-3xl rounded-[4rem] p-10 mt-8 border border-slate-100 animate-in fade-in zoom-in duration-200 z-[300]">
                                    <div className="space-y-4">
                                        <div className="text-xs font-black text-slate-300 uppercase tracking-widest border-b pb-4 mb-4">
                                            Select Hub
                                        </div>
                                        {WORKSHOPS.map((w) => (
                                            <button
                                                key={w.id}
                                                onClick={() => navigate(`workshop-${w.id}`)}
                                                className="w-full text-left p-6 hover:bg-slate-50 rounded-[2rem] text-xs font-bold text-slate-600 hover:text-amber-600 transition-all uppercase tracking-widest border border-transparent hover:border-slate-100"
                                            >
                                                {w?.city}: {w?.title?.split(':')[0]}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <Button
                        variant="primary"
                        className="hidden lg:flex px-12 py-6 text-xs"
                        onClick={() => navigate('shop')}
                    >
                        Secure Access
                    </Button>

                    <button className="lg:hidden p-4 text-slate-900">
                        <Menu size={32} />
                    </button>
                </div>
            </nav>

            {/* CONFIRMATION FLOW */}
            <ConfirmationModal
                isOpen={modalState.isOpen}
                workshop={modalState.workshop}
                activeTier={modalState.activeTier}
                onClose={handleModalClose}
                onProceed={handleModalProceed}
            />

            {/* MAIN CONTENT ENGINE */}
            <main className="pt-48 pb-60">
                {currentView === 'home' && <DashboardView navigate={navigate} />}
                {currentView === 'about' && <AboutView navigate={navigate} />}
                {currentView === 'shop' && <ShopView handleCheckout={handleCheckout} />}
                {currentView?.startsWith('workshop-') && renderWorkshopDetail(currentView.replace('workshop-', ''))}
            </main>

            {/* TITANIUM FOOTER */}
            <footer className="bg-slate-900 text-white pt-60 pb-24 px-12 rounded-t-[12rem] relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80rem] h-[30rem] bg-amber-500/5 rounded-full blur-[160px] -translate-y-1/2" />

                <div className="max-w-7xl mx-auto space-y-40 relative z-10">
                    <div className="grid lg:grid-cols-12 gap-24 items-start border-b border-white/5 pb-40">
                        <div className="lg:col-span-6 space-y-16">
                            <div className="flex flex-col items-start gap-1">
                                <img src="images/brkthru-logo.png" alt="Logo" className="h-14 invert opacity-90" />
                                <span className="text-white text-xs md:text-xs font-black tracking-[0.8em] uppercase opacity-90 ml-1">
                                    DIGITAL
                                </span>
                            </div>
                            <p className="text-slate-400 text-3xl font-serif italic leading-relaxed pr-32">
                                "Providing the inner machinery for the executive game. Engineering human breakthroughs
                                since 1997."
                            </p>
                            <div className="flex gap-10 pt-8">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-amber-500/20 transition-colors cursor-pointer">
                                    <Activity size={24} className="text-amber-500" />
                                </div>
                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-amber-500/20 transition-colors cursor-pointer">
                                    <MessageSquare size={24} className="text-amber-500" />
                                </div>
                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-amber-500/20 transition-colors cursor-pointer">
                                    <Users size={24} className="text-amber-500" />
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-6 grid grid-cols-2 gap-20">
                            <div className="space-y-10">
                                <h4 className="text-sm font-black uppercase tracking-[0.5em] text-white">Ecosystem</h4>
                                <div className="flex flex-col gap-6 text-slate-500 font-bold uppercase text-sm tracking-[0.3em] font-sans">
                                    <button onClick={() => navigate('home')} className="hover:text-amber-500 text-left">
                                        The Hub
                                    </button>
                                    <button
                                        onClick={() => navigate('about')}
                                        className="hover:text-amber-500 text-left"
                                    >
                                        The Odyssey
                                    </button>
                                    <button onClick={() => navigate('shop')} className="hover:text-amber-500 text-left">
                                        Digital Shop
                                    </button>
                                    <button onClick={() => navigate('home')} className="hover:text-amber-500 text-left">
                                        Tour 2026
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-10">
                                <h4 className="text-sm font-black uppercase tracking-[0.5em] text-white">Contact</h4>
                                <div className="flex flex-col gap-6 text-slate-500 font-bold uppercase text-sm tracking-[0.3em] font-sans">
                                    <a href="mailto:brkthruworkshops@gmail.com" className="hover:text-amber-500">
                                        brkthruworkshops@gmail.com
                                    </a>
                                    <a href="tel:+639158766595" className="hover:text-amber-500">
                                        +63915 876 6595
                                    </a>
                                    <a href="https://facebook.com/brkthrucentre" target="_blank" className="hover:text-amber-500 flex items-center gap-2">
                                        fb/brkthrucentre
                                    </a>
                                    <span className="text-slate-700">Bacolod Hub</span>
                                    <span className="text-slate-700">Manila Hub</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-10 text-xs font-black uppercase tracking-[0.4em] text-slate-600 font-sans">
                        <div>© 2026 BRKTHRU CO coaching & Consulting</div>
                        <div className="flex gap-12">
                            <span>Privacy Policy</span>
                            <span>Direct Secure Gateway</span>
                        </div>
                        <div className="text-amber-500/50">Designed for Visual Sovereignty</div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
