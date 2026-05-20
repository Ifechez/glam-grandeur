import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowUpRight,
    Send,
    ChevronLeft,
    ChevronRight,
    Quote,
    Sparkles,
} from 'lucide-react';

/* =========================================================================
   CUSTOM SOCIAL ICONS
   ========================================================================= */

const InstagramIcon = () => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
);

const FacebookIcon = () => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
);

/* =========================================================================
   MAIN COMPONENT
   ========================================================================= */

export default function About({ team = [], settings }) {

    /* =========================================================================
       DYNAMIC TEAM FROM BACKEND
       ========================================================================= */

    const displayTeam = (team || []).map((member) => ({
        ...member,

        image_path: member.image
            ? `/storage/${member.image}`
            : '/images/default-team.jpg',

        is_ceo:
            member.position?.toLowerCase().includes('ceo') ||
            member.is_ceo,
    }));

    const ceo =
        displayTeam.find((member) => member.is_ceo) ||
        displayTeam[0] ||
        null;

    const staff = displayTeam.filter(
        (member) => member.id !== ceo?.id
    );

    /* =========================================================================
       TEAM SLIDER
       ========================================================================= */

    const [activeMember, setActiveMember] = useState(0);

    const nextMember = () => {
        if (staff.length <= 1) return;

        setActiveMember((prev) =>
            prev === staff.length - 1 ? 0 : prev + 1
        );
    };

    const prevMember = () => {
        if (staff.length <= 1) return;

        setActiveMember((prev) =>
            prev === 0 ? staff.length - 1 : prev - 1
        );
    };

    useEffect(() => {
        if (staff.length <= 1) return;

        const interval = setInterval(() => {
            nextMember();
        }, 5000);

        return () => clearInterval(interval);
    }, [activeMember, staff.length]);

    return (
        <div className="min-h-screen bg-[#FAF8F4] text-black overflow-x-hidden selection:bg-[#E3C263] selection:text-black">

            <Head title="About Us | Glam Grandeur" />

            {/* =========================================================================
               NAVIGATION
               ========================================================================= */}

            <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-6 backdrop-blur-xl bg-black/20 border-b border-white/10">

                <div className="max-w-7xl mx-auto flex items-center justify-between">

                    <Link href="/">
                        <img
                            src="/images/logos/logo.png"
                            alt="Glam Grandeur"
                            className="h-10 md:h-12"
                        />
                    </Link>

                    <div className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.35em] text-white font-semibold">

                        <Link
                            href="/"
                            className="hover:text-[#E3C263] transition-all"
                        >
                            Home
                        </Link>

                        <Link
                            href="/about"
                            className="text-[#E3C263]"
                        >
                            About
                        </Link>

                        <a
                            href="/#services"
                            className="hover:text-[#E3C263] transition-all"
                        >
                            Services
                        </a>

                        <a
                            href="/#projects"
                            className="hover:text-[#E3C263] transition-all"
                        >
                            Projects
                        </a>

                    </div>

                    <Link
                        href="/#contact"
                        className="hidden md:flex items-center bg-white text-black px-6 py-3 rounded-full uppercase text-[10px] tracking-[0.25em] font-bold group"
                    >
                        Contact

                        <div className="ml-2 group-hover:rotate-45 transition-all">
                            <ArrowUpRight size={14} />
                        </div>

                    </Link>

                </div>

            </nav>

            {/* =========================================================================
               CLEAN HERO SECTION
               ========================================================================= */}

            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">

                <img
                    src="/images/about1.jpg"
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                    alt="hero"
                />

                <div className="absolute inset-0 bg-black/50" />

                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">

                    <span className="text-[#E3C263] uppercase tracking-[0.5em] text-[10px] font-bold block mb-8">
                        About Glam Grandeur
                    </span>

                    <h1 className="text-white text-5xl md:text-7xl lg:text-[100px] leading-[1] font-serif">
                        Designing
                        <br />
                        Elegant Spaces
                    </h1>

                    <p className="max-w-2xl mx-auto mt-8 text-gray-300 text-base md:text-lg leading-relaxed font-light">
                        We create sophisticated interiors that blend timeless luxury,
                        comfort, and modern functionality.
                    </p>

                    <div className="mt-12 flex flex-wrap justify-center gap-4">

                        <a
                            href="#story"
                            className="bg-[#E3C263] text-black px-10 py-5 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-white transition-all"
                        >
                            Explore More
                        </a>

                        <a
                            href="#team"
                            className="border border-white/20 text-white px-10 py-5 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-white hover:text-black transition-all"
                        >
                            Meet Team
                        </a>

                    </div>

                </div>

                <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#FAF8F4] to-transparent" />

            </section>

            {/* =========================================================================
               STORY SECTION
               ========================================================================= */}

            <section
                id="story"
                className="relative py-32 md:py-40 px-6 md:px-12 overflow-hidden"
            >

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -80 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >

                        <div className="overflow-hidden rounded-[40px] shadow-2xl">
                            <img
                                src="/images/image15.jpg"
                                className="w-full aspect-[4/5] object-cover hover:scale-105 transition-all duration-1000"
                                alt="story"
                            />
                        </div>

                        <div className="absolute -bottom-12 -right-10 w-52 md:w-72 overflow-hidden rounded-[30px] border-[12px] border-[#FAF8F4] shadow-2xl">

                            <img
                                src="/images/about3.jpg"
                                className="w-full aspect-square object-cover"
                                alt="detail"
                            />

                        </div>

                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 80 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                    >

                        <span className="text-[#E3C263] uppercase tracking-[0.4em] text-[10px] font-bold">
                            Our Philosophy
                        </span>

                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif mt-8 leading-tight">
                            Spaces That
                            <br />
                            Tell Stories
                        </h2>

                        <p className="mt-10 text-2xl italic leading-relaxed text-gray-700 font-light">
                            “Luxury is not about excess — it is about emotion,
                            balance, elegance, and timeless identity.”
                        </p>

                        <p className="mt-10 text-gray-500 text-lg leading-[2] font-light">

                            Glam Grandeur was founded with a vision to transform
                            environments into immersive experiences.

                            Every texture, light source, and architectural detail
                            is intentionally curated to create harmony between
                            beauty and functionality.

                        </p>

                        <div className="mt-14 flex items-center gap-5">

                            <Sparkles className="text-[#E3C263]" />

                            <span className="uppercase tracking-[0.35em] text-[11px] font-bold text-gray-500">
                                Bespoke • Elegant • Modern
                            </span>

                        </div>

                    </motion.div>

                </div>

            </section>

            {/* =========================================================================
               CEO SECTION
               ========================================================================= */}

            {ceo && (
                <section className="py-32 md:py-40 bg-[#111] text-white relative overflow-hidden">

                    <div className="absolute inset-0 opacity-10">

                        <img
                            src="/images/about2.jpg"
                            className="w-full h-full object-cover"
                            alt=""
                        />

                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                        <motion.div
                            initial={{ opacity: 0, y: 80 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                        >

                            <div className="overflow-hidden rounded-[50px] shadow-[0_40px_120px_rgba(0,0,0,0.5)]">

                                <img
                                    src={ceo?.image_path || '/images/default-team.jpg'}
                                    className="w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                                    alt={ceo?.name}
                                />

                            </div>

                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 80 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            viewport={{ once: true }}
                        >

                            <span className="text-[#E3C263] uppercase tracking-[0.4em] text-[10px] font-bold">
                                Leadership
                            </span>

                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif mt-8 leading-tight">
                                {ceo?.name}
                            </h2>

                            <p className="mt-6 uppercase tracking-[0.35em] text-[10px] text-gray-400 font-bold">
                                {ceo?.position}
                            </p>

                            <div className="mt-12 relative">

                                <Quote className="absolute -top-6 left-0 text-[#E3C263]/20 w-20 h-20" />

                                <p className="text-gray-300 leading-[2] text-lg md:text-xl font-light relative z-10">
                                    {ceo?.bio}
                                </p>

                            </div>

                        </motion.div>

                    </div>

                </section>
            )}

           {/* =========================================================================
   TEAM SECTION
   ========================================================================= */}

<section
    id="team"
    className="py-24 md:py-32 px-6 md:px-12 bg-white relative overflow-hidden"
>

    <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-20">

            <div>

                <span className="text-[#E3C263] uppercase tracking-[0.45em] text-[10px] font-bold">
                    Creative Professionals
                </span>

                <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-gray-900 mt-6 leading-none">
                    Meet Our
                    <br />
                    Team
                </h2>

            </div>

            {/* Navigation */}
            {staff.length > 1 && (
                <div className="flex items-center gap-4">

                    <button
                        onClick={prevMember}
                        className="w-14 h-14 rounded-full border border-gray-200 hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <button
                        onClick={nextMember}
                        className="w-14 h-14 rounded-full bg-black text-white hover:bg-[#E3C263] hover:text-black transition-all duration-300 flex items-center justify-center"
                    >
                        <ChevronRight size={20} />
                    </button>

                </div>
            )}

        </div>

        {/* Dynamic Team Content */}
        {staff.length > 0 ? (

            <AnimatePresence mode="wait">

                <motion.div
                    key={activeMember}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center"
                >

                    {/* Image */}
                    <div className="relative group">

                        <div className="absolute inset-0 bg-[#E3C263]/10 rounded-[35px] blur-3xl opacity-40 group-hover:opacity-70 transition-all duration-700" />

                        <div className="relative overflow-hidden rounded-[35px] shadow-[0_20px_80px_rgba(0,0,0,0.08)] bg-gray-100">

                            <img
                                src={staff[activeMember]?.image_path}
                                alt={staff[activeMember]?.name}
                                className="w-full aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-105"
                                onError={(e) => {
                                    e.target.src = '/images/placeholder-team.jpg';
                                }}
                            />

                        </div>

                    </div>

                    {/* Content */}
                    <div>

                        <div className="flex items-center gap-4 mb-8">

                            <div className="w-14 h-[1px] bg-[#E3C263]" />

                            <span className="text-[#E3C263] uppercase tracking-[0.35em] text-[10px] font-bold">
                                Team Member
                            </span>

                        </div>

                        <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 leading-tight">
                            {staff[activeMember]?.name}
                        </h3>

                        <p className="mt-5 uppercase tracking-[0.35em] text-[10px] font-bold text-gray-400">
                            {staff[activeMember]?.position}
                        </p>

                        <div className="mt-10 w-16 h-[2px] bg-[#E3C263]" />

                        <p className="mt-10 text-gray-600 text-lg leading-[2] font-light">
                            {staff[activeMember]?.bio}
                        </p>

                        {/* Indicators */}
                        {staff.length > 1 && (
                            <div className="mt-14 flex items-center gap-3">

                                {staff.map((_, index) => (

                                    <button
                                        key={index}
                                        onClick={() => setActiveMember(index)}
                                        className={`h-1 rounded-full transition-all duration-500 ${
                                            activeMember === index
                                                ? 'w-20 bg-[#E3C263]'
                                                : 'w-10 bg-gray-200 hover:bg-gray-300'
                                        }`}
                                    />

                                ))}

                            </div>
                        )}

                    </div>

                </motion.div>

            </AnimatePresence>

        ) : (

            <div className="py-24 text-center border border-dashed border-gray-200 rounded-[30px]">

                <p className="text-gray-400 uppercase tracking-[0.3em] text-[11px] font-bold">
                    Team information will appear here
                </p>

            </div>

        )}

    </div>

</section>

{/* =========================================================================
   FOOTER
   ========================================================================= */}

<footer className="bg-[#0B0B0B] text-white pt-24 md:pt-28 pb-10 px-6 md:px-12 relative overflow-hidden">

    {/* Background Texture */}
    <div className="absolute inset-0 opacity-[0.03]">
        <img
            src="/images/footer-bg.jpg"
            alt=""
            className="w-full h-full object-cover"
        />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto">

        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 pb-14 border-b border-white/10">

            {/* Brand */}
            <div className="lg:col-span-2">

                <img
                    src="/images/logos/logo.png"
                    className="h-12 mb-8"
                    alt="logo"
                />

                <p className="max-w-md text-gray-400 leading-[2] text-sm font-light">
                    {settings?.site_description ||
                        'Transforming spaces with elegance, sophistication, and timeless luxury. We craft interiors that inspire modern living.'}
                </p>

                {/* Socials */}
                <div className="flex gap-4 mt-10">

                    {/* Instagram */}
                    <a
                        href={
                            settings?.instagram_handle
                                ? `https://instagram.com/${settings.instagram_handle}`
                                : '#'
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#E3C263] hover:text-black transition-all duration-300"
                    >
                        <InstagramIcon />
                    </a>

                    {/* Facebook */}
                    <a
                        href={settings?.facebook_url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#E3C263] hover:text-black transition-all duration-300"
                    >
                        <FacebookIcon />
                    </a>

                </div>

            </div>

            {/* Quick Links */}
            <div>

                <h4 className="uppercase tracking-[0.35em] text-[10px] text-white font-bold mb-8">
                    Quick Links
                </h4>

                <div className="flex flex-col gap-5 text-sm text-gray-400">

                    <Link
                        href="/"
                        className="hover:text-[#E3C263] transition-all"
                    >
                        Home
                    </Link>

                    <Link
                        href="/about"
                        className="hover:text-[#E3C263] transition-all"
                    >
                        About
                    </Link>

                    <Link
                        href="/#projects"
                        className="hover:text-[#E3C263] transition-all"
                    >
                        Projects
                    </Link>

                    <a
                        href="/#services"
                        className="hover:text-[#E3C263] transition-all"
                    >
                        Services
                    </a>

                    <a
                        href="/#contact"
                        className="hover:text-[#E3C263] transition-all"
                    >
                        Contact
                    </a>

                </div>

            </div>

            {/* Newsletter */}
            <div>

                <h4 className="uppercase tracking-[0.35em] text-[10px] text-white font-bold mb-8">
                    Subscribe
                </h4>

                <div className="bg-white rounded-full overflow-hidden flex shadow-lg">

                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full px-5 py-4 bg-transparent text-black outline-none text-sm placeholder:text-gray-400"
                    />

                    <button className="bg-[#E3C263] px-5 hover:bg-black hover:text-white transition-all duration-300">
                        <Send size={18} />
                    </button>

                </div>

                <p className="text-gray-500 text-[11px] leading-relaxed mt-5">
                    By subscribing, you agree to receive updates and design inspiration from Glam Grandeur.
                </p>

                {/* Contact Info */}
                <div className="mt-8 space-y-3 text-sm text-gray-400">

                    {settings?.email && (
                        <p>{settings.email}</p>
                    )}

                    {settings?.phone_1 && (
                        <p>{settings.phone_1}</p>
                    )}

                </div>

            </div>

        </div>

        {/* Bottom Footer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-5 text-gray-500 text-sm">

            <p>
                © {new Date().getFullYear()} Glam Grandeur. All Rights Reserved.
            </p>

            <div className="flex items-center gap-6">

                <a
                    href="#"
                    className="hover:text-white transition-all"
                >
                    Terms & Conditions
                </a>

                <a
                    href="#"
                    className="hover:text-white transition-all"
                >
                    Privacy Policy
                </a>

            </div>

        </div>

    </div>

</footer>

</div>
);
}