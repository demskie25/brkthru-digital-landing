import React, { useState } from 'react';
import { Star, CheckCircle2, TrendingUp, Users, ArrowRight, X } from 'lucide-react';
// Image Imports
import wccCover from './assets/wcc_cover.jpg';
import toolkitCover from './assets/toolkit_cover.jpg';
import davisImage from './assets/davis leonardo.jpg';
import blesildaImage from './assets/blesilda concepcion.jpg';
import louieImage from './assets/louie jomero.jpg';
import raphaelImage from './assets/raphael felix.jpeg';
import luzvimindaImage from './assets/luzviminda morales.jpg';
import angelaImage from './assets/angela valenzuela.jpg';
import marcImage from './assets/marc lopez.jpg';
import joyImage from './assets/joy cunita.jpeg';
import marceImage from './assets/marce combe.jpeg';
import danImage from './assets/dan gailo.jpeg';
import stephenImage from './assets/stephen thomas misa.jpg'; // Assuming extracted or generic naming
import romuloImage from './assets/romulo romero.jpg';
import ellenImage from './assets/ellen soriano.jpg'; // Need to check if this exists, user said "10+ leaders"
import lornaImage from './assets/lorna campos.jpeg';
import julesImage from './assets/jules ganera.png';

import virnaImage from './assets/virna.jpg';
import aldemImage from './assets/aldem.jpg';
import vanessaImage from './assets/vanessab.jpg';
import drHallImage from './assets/dr-hall.jpg';

// ... (existing imports)

// --- LEGACY HERO (Twin Key Bundle) ---
export const LegacyHero = ({ zone = 'zone2' }) => {
    const PRICING = {
        zone1: { price: '29', symbol: '$', link: 'https://hitpay.link/zone1-bundle' },
        zone2: { price: '599', symbol: '₱', link: 'https://hitpay.link/n6dx11' },
        zone3: { price: '12', symbol: '$', link: 'https://hitpay.link/zone3-bundle' },
    };

    const data = PRICING[zone] || PRICING.zone2;

    return (
        <section id="legacy-hero" className="relative py-10 text-center">
            <div className="mb-8">
                <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-50 border border-blue-100">
                    <span className="text-sm font-semibold text-blue-600 tracking-wide uppercase">New Release</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-heading font-bold text-slate-900 leading-tight mb-4">
                    Manage Your Energy and <br />
                    <span className="text-amber-600">Elevate Your Team's</span> <br />
                    Commitment.
                </h2>
                <p className="text-slate-600 mb-8 leading-relaxed max-w-xl mx-auto">
                    The definitive 10th Anniversary resources for strategically humane leaders. Get the foundational
                    book and the practical toolkit in one powerful bundle.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                    <a
                        href={data.link}
                        target="_blank"
                        className="inline-flex items-center justify-center px-6 py-3 text-base font-bold rounded-lg text-white bg-amber-500 hover:bg-amber-600 transition-all shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-1"
                    >
                        Get the Twin Pack Bundle - Only {data.symbol}
                        {data.price}
                    </a>
                </div>

                <p className="text-xs text-slate-500 flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Instant Digital Download
                </p>
            </div>

            {/* Visual (Centered) */}
            <div className="relative mx-auto w-full max-w-sm">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
                <div className="relative flex justify-center items-center gap-2">
                    {/* Book */}
                    <a
                        href="shop.html#focus-wcc"
                        className="bg-white rounded shadow-xl w-1/2 aspect-[2/3] overflow-hidden transform -rotate-3 hover:rotate-0 transition-transform duration-500 z-10 border border-slate-100 block"
                    >
                        <img src={wccCover} alt="World Class Coach Book" className="w-full h-full object-cover" />
                    </a>
                    {/* Toolkit */}
                    <a
                        href="shop.html#focus-toolkit"
                        className="bg-white rounded shadow-xl w-1/2 aspect-[3/4] overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500 z-20 mt-4 border border-slate-100 block"
                    >
                        <img src={toolkitCover} alt="Coaching Toolkit" className="w-full h-full object-cover" />
                    </a>
                </div>
            </div>
        </section>
    );
};

// --- LEGACY AUTHORITY NETWORK ---
export const LegacyAuthority = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Top 18
    const visibleClients = [
        'Amazon Web Services',
        'Ateneo de Manila',
        'Citibank',
        'DHL',
        'DTI',
        'Fujitsu',
        'HP',
        'Jollibee',
        "L'Oréal",
        'Maersk',
        'Metrobank',
        'Microsoft',
        'Nestlé',
        'Pfizer',
        'Shell',
        'SM',
        'Toyota',
        'Unilever',
        'Wyeth',
    ];

    // Full List (Simulated with a few more for the modal)
    const allClients = [
        ...visibleClients,
        'Coca-Cola',
        'PepsiCo',
        'San Miguel Corp',
        'Globe Telecom',
        'Smart',
        'BDO',
        'BPI',
        'Unionbank',
        'Ayala Land',
        'Megaworld',
        'Robinsons Land',
        'Shangri-La',
        'Marriott',
        'Accenture',
        'IBM',
        'Oracle',
        'SAP',
        'Salesforce',
        'Google Philippines',
        'Meta',
        'Grab',
        'Lazada',
        'Shopee',
        'Zalora',
        'AirAsia',
        'Cebu Pacific',
        'PAL',
        'Meralco',
        'Maynilad',
        'Petron',
    ].sort();

    return (
        <section className="py-12 bg-slate-50 rounded-2xl border border-slate-100 p-6">
            <div className="text-center mb-8">
                <Star className="w-10 h-10 text-amber-500 mx-auto mb-4" />
                <h2 className="font-heading text-2xl font-bold text-slate-900 mb-2">Our Authority Network</h2>
                <p className="text-sm text-slate-500">Trusted by over 50+ leading organizations for two decades.</p>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
                {visibleClients.map((client) => (
                    <span
                        key={client}
                        className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-600 shadow-sm"
                    >
                        {client}
                    </span>
                ))}
            </div>
            <div className="mt-4 text-center">
                <button
                    onClick={() => setIsOpen(true)}
                    className="text-xs text-amber-600 font-bold hover:underline cursor-pointer italic"
                >
                    ...and hundreds more.
                </button>
            </div>

            {/* POPUP MODAL */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h3 className="font-heading text-xl font-bold text-slate-900">Our Trusted Partners</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-200 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-8 overflow-y-auto">
                            <div className="flex flex-wrap gap-3 justify-center">
                                {allClients.map((client) => (
                                    <span
                                        key={client}
                                        className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs font-bold text-slate-700"
                                    >
                                        {client}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="p-4 border-t border-slate-100 text-center bg-slate-50 text-xs text-slate-400">
                            Listing a selection of our valued corporate partners.
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

// --- LEGACY TESTIMONIALS ---
export const LegacyTestimonials = () => {
    const [isOpen, setIsOpen] = useState(false);

    const testimonials = [
        {
            name: 'Davis Leonardo',
            role: 'SVP for HR, Consistent Group',
            quote: 'Brkthru delivers expert-led, deeply customized leadership transformation... They are our provider of choice for building a coaching culture.',
            image: davisImage,
        },
        {
            name: 'Dr. Blesilda Concepcion',
            role: 'VP, The Medical City',
            quote: 'Coaching is a critical leadership competency... this book provides leaders with the requisite tools to bring their teams to the highest level.',
            image: blesildaImage,
        },
        {
            name: 'Louie Jomero',
            role: 'HR Head',
            quote: 'Brkthru transformed our company culture through structured, functional tools that not only scaled our productivity but deeply enriched our people.',
            image: louieImage,
        },
        {
            name: 'Raphael Felix',
            role: 'President & CEO, Phinma Properties',
            quote: "Brkthru's coaching and trainings helped our top and middle leaders adapt to change, navigate COVID-19, and balance growth. Shifted from individual to holistic/collaborative mindset. Avoided 'one-size-fits-all' by considering individual states of mind. Expanded development beyond upper management. Early progress in alignment and collaboration. Valued the focus on 'state of mind' before goals. Prepared the company for uncertainty.",
            image: raphaelImage,
        },
    ];

    const moreTestimonials = [
        {
            name: 'Luzviminda Morales',
            role: 'HR Account Management, OD and Learning Talent Management',
            quote: "Today's managers who deal with digital natives and X-Z Gen teams scramble for answers on performance management and succession planning issues. Aldem proposes Meta-Coaching as one of the effective and breakthrough interventions. Leaders, be ready for transformation that will benefit you and your team! From mental maps to practical how to's, Aldem packed them all in this first book!",
            image: luzvimindaImage,
        },
        {
            name: 'Angela Valenzuela',
            role: 'Talent and Acquisition Manager, Petron Corporation',
            quote: 'A great tool that develops bigger leaders and transforms organizations to reach their potentials. Congratulations, Aldem! It is a pleasure partnering with you and your team in strengthening our leadership pipeline!',
            image: angelaImage,
        },
        {
            name: 'Marc V. Lopez',
            role: 'Vice President, University of Asia and the Pacific',
            quote: 'The world class coaching book of Aldem is so simple and practical - but powerful! We use it to coach both our elementary and high school students and share it with our home schooling parents as well!',
            image: marcImage,
        },
        {
            name: 'Marce Combe',
            role: 'HR Director, Manufacturing Corp',
            quote: 'Since we engaged Brkthru’s services we gained a business partner! ... Personally I am forever grateful I met Coach Aldem, Ms Vanessa and Ms. Virna - my life is so much better because of the things I learned from them.',
            image: marceImage,
        },
        {
            name: 'Dan Gailo',
            role: 'National Sales Director, Distribution',
            quote: 'I would definitely highly recommend Brkthru because the discipline they adhere to is very structured and relevant.. They equip you with tools to deal with your daily real life challenges...',
            image: danImage,
        },
        {
            name: 'Joy Cunita',
            role: "SVP, Gov't Sector",
            quote: 'Brkthru coaches are experts and show utmost love and passion for transforming organizations by creating breakthrough results.',
            image: joyImage,
        },
        {
            name: 'Jules Ganera',
            role: 'Client Partner',
            quote: "Brkthru goes out of its way to understand the org first... after hearing out the client, they align and collaborate - 'SUGGEST and RECOMMEND' as opposed to FORCING / SELLING. They are very flexible and easy to deal with.",
            image: julesImage,
        },
        {
            name: 'Lorna Campos',
            role: 'Executive Director, Youth Organization',
            quote: 'We have seen how Meta-Coaching has helped young people reflect on their purpose and meaning... The skills we learned... have equipped us to listen more... Meta-Coaching facilitates changed lives.',
            image: lornaImage,
        },
        {
            name: 'Stephen Thomas Misa',
            role: 'Country Manager, Amazon Web Services Philippines',
            quote: 'This book is a must-read for both aspiring and seasoned leaders! Add great coaching skills in your arsenal and you increase your chances of winning in this game called life.',
            image: stephenImage,
        },
        {
            name: 'Romulo S. Romero',
            role: 'CEO and Principal Consultant of OTi Philippines',
            quote: "Finally, Aldem's book on coaching. I've had the distinct privilege of being coached by Aldem whenever we would travel together to client engagements. Aldem's platform of Meta-Coaching effectively surfaces practical steps to bring out excellence in people.",
            image: romuloImage,
        },
        {
            name: 'Ellen Soriano',
            role: 'Director',
            quote: "This book will help you bring out and enhance your coaching skills to become an exceptional leader. It's a great addition to the coaching literature with very practical applications and examples.",
            image: ellenImage,
        },
    ];

    return (
        <section className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="font-heading text-2xl font-bold text-slate-900">Trusted By Leaders</h2>
            </div>
            <div className="space-y-6">
                {testimonials.map((t, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 relative">
                        {/* Quote Icon */}
                        <div className="absolute top-6 right-6 text-slate-100">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M14.017 21L14.017 18C14.017 16.896 14.325 16.053 14.941 15.471C15.558 14.89 16.502 14.599 17.773 14.599V11.898C16.941 11.826 16.353 11.552 16.009 11.077C15.665 10.602 15.493 9.775 15.493 8.596V4H21V12H19.006C18.531 12 18.293 12.119 18.293 12.357C18.293 12.641 18.507 12.783 18.935 12.783H19.006C20.334 12.783 20.998 13.971 20.998 16.347V21H14.017ZM8.006 21H8.006V18C8.006 16.896 8.314 16.053 8.93 15.471C9.547 14.89 10.491 14.599 11.762 14.599V11.898C10.93 11.826 10.342 11.552 9.998 11.077C9.654 10.602 9.482 9.775 9.482 8.596V4H15V12H12.995C12.52 12 12.282 12.119 12.282 12.357C12.282 12.641 12.496 12.783 12.924 12.783H12.995C14.323 12.783 14.987 13.971 14.987 16.347V21H8.006Z" />
                            </svg>
                        </div>

                        <p className="text-slate-600 italic text-sm mb-6 relative z-10 leading-relaxed">"{t.quote}"</p>
                        <div className="flex items-center gap-4">
                            <img
                                src={t.image}
                                alt={t.name}
                                className="w-12 h-12 rounded-full object-cover border-2 border-slate-100"
                            />
                            <div>
                                <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                                <div className="text-xs text-amber-600 font-bold uppercase tracking-wider max-w-[200px] leading-tight mt-0.5">
                                    {t.role}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center border-t border-slate-100 pt-6">
                <button
                    onClick={() => setIsOpen(true)}
                    className="group inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-amber-600 transition-colors uppercase tracking-widest"
                >
                    More Leaders
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
            </div>

            {/* TESTIMONIAL MODAL */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h3 className="font-heading text-xl font-bold text-slate-900">What Leaders Are Saying</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-200 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-8 overflow-y-auto space-y-6">
                            {moreTestimonials.map((t, i) => (
                                <div
                                    key={i}
                                    className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex flex-col gap-4"
                                >
                                    <p className="text-slate-600 italic text-sm leading-relaxed">"{t.quote}"</p>
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={t.image}
                                            alt={t.name}
                                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0"
                                        />
                                        <div>
                                            <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                                            <div className="text-xs text-amber-600 font-bold uppercase tracking-wider leading-tight">
                                                {t.role}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

// --- LEGACY ARCHITECTS ---
export const LegacyArchitects = () => {
    const [selectedArchi, setSelectedArchi] = useState(null);

    const architects = [
        {
            name: 'Aldem Salvaña',
            role: 'Managing Director & Lead Faculty',
            image: aldemImage,
            bio: 'One of the first Meta-Coaches and Neuro-Semantic Trainers in the country, bridging the gap between inspired knowing and sustainable doing.',
        },
        {
            name: 'Vanessa Salvaña',
            role: 'Strategic Director & Lead Faculty',
            image: vanessaImage,
            bio: "General Manager orchestrating the complex logistics and psychological safety of Brkthru's global training ecosystems.",
        },
        {
            name: 'Virna Villarosa',
            role: 'Director of Operations & Lead Faculty',
            image: virnaImage,
            bio: 'Expert in emotional intelligence and high-stakes performance coaching for executives and clients worldwide.',
        },
    ];

    return (
        <section className="bg-slate-900 rounded-2xl p-8 text-white relative border border-slate-800 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

            <h2 className="font-heading text-2xl font-bold mb-8 text-center text-amber-500 uppercase tracking-widest">
                Lead Faculty
            </h2>

            <div className="space-y-6">
                {architects.map((archi, i) => (
                    <div
                        key={i}
                        onClick={() => setSelectedArchi(archi)}
                        className="flex items-center gap-6 group cursor-pointer hover:bg-white/5 p-4 rounded-xl transition-all border border-transparent hover:border-slate-800"
                    >
                        <div className="relative">
                            <img
                                src={archi.image}
                                alt={archi.name}
                                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover object-top border-2 border-amber-500/30 group-hover:border-amber-500 transition-colors shadow-lg"
                            />
                            <div className="absolute inset-0 rounded-full ring-4 ring-amber-500/0 group-hover:ring-amber-500/20 transition-all"></div>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg md:text-xl group-hover:text-amber-500 transition-colors">
                                {archi.name}
                            </h3>
                            <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em]">
                                {archi.role}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ARCHITECT POPUP */}
            {selectedArchi && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white text-slate-900 rounded-2xl shadow-2xl w-full max-w-lg p-8 relative animate-in zoom-in-95 duration-200 border border-slate-100">
                        <button
                            onClick={() => setSelectedArchi(null)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 p-2 hover:bg-slate-100 rounded-full transition-all"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <div className="flex flex-col items-center text-center mb-6">
                            <img
                                src={selectedArchi.image}
                                alt={selectedArchi.name}
                                className="w-32 h-32 rounded-full object-cover object-top border-4 border-amber-500 mb-4 shadow-xl"
                            />
                            <h3 className="font-heading text-3xl font-bold text-slate-900">{selectedArchi.name}</h3>
                            <p className="text-amber-600 font-bold uppercase tracking-widest text-sm mt-1">
                                {selectedArchi.role}
                            </p>
                            <div className="w-12 h-1 bg-amber-500/20 rounded-full mt-4"></div>
                        </div>
                        <p className="text-slate-600 leading-relaxed text-base italic text-center px-4">
                            "{selectedArchi.bio}"
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
};
