import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowUpRight,
    Send,
    Mail,
    Phone,
    MapPin,
    ChevronLeft,
    ChevronRight,
    X
} from "lucide-react";

import {
    Wrench,
    Layout,
    Home,
    PenTool,
    ClipboardCheck,
    Layers
} from 'lucide-react';

import { toast, Toaster } from 'react-hot-toast';

// --- ROBUST SVG ICONS ---
const InstagramIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
);

const PARTNER_LOGOS = [
    { src: '/images/logos/logo1.png', alt: 'Partner 1' },
    { src: '/images/logos/logo2.png', alt: 'Partner 2' },
    { src: '/images/logos/logo3.jpg', alt: 'Partner 3' },
    { src: '/images/logos/logo4.jpg', alt: 'Partner 4' },
    { src: '/images/logos/logo5.png', alt: 'Partner 5' },
    { src: '/images/logos/logo6.jpg', alt: 'Partner 6' },
    { src: '/images/logos/logo8.jpg', alt: 'Partner 2' },
    { src: '/images/logos/logo9.png', alt: 'Partner 3' },
    { src: '/images/logos/logo10.jpg', alt: 'Partner 4' },
    { src: '/images/logos/logo11.png', alt: 'Partner 5' },
    { src: '/images/logos/logo7.png', alt: 'Partner 5' },

];

const FacebookIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
);

const XIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4l11.733 16h4.267l-11.733-16zM4 20l6.768-6.768m2.464-2.464L20 4"/>
    </svg>
);

// --- PROJECT MODAL COMPONENT ---
const ProjectModal = ({ project, onClose }) => {

    const [currentImg, setCurrentImg] = useState(0);

    const images =
        project.gallery && Array.isArray(project.gallery) && project.gallery.length
            ? project.gallery.map(img =>
                  img.startsWith('http') ? img : `/storage/${img}`
              )
            : [
                  project.image
                      ? `/storage/${project.image}`
                      : '/images/projects/Project-01.jpg'
              ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-sm"
            onClick={onClose}
        >
            <button
                onClick={onClose}
                className="absolute top-6 right-6 md:top-8 md:right-8 text-white hover:rotate-90 transition-transform duration-300 z-[110]"
            >
                <X size={40} strokeWidth={1} />
            </button>

            <div
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col lg:flex-row w-full h-full max-w-7xl overflow-hidden bg-white shadow-2xl rounded-sm"
            >

                {/* IMAGE */}
                <div className="relative w-full lg:w-2/3 h-1/2 lg:h-full bg-black flex items-center justify-center group">

                    <img
                        src={images[currentImg]}
                        className="w-full h-full object-cover transition-all duration-500"
                        alt={project.title}
                        onError={(e) => {
                            e.target.src = '/images/projects/Project-01.jpg';
                        }}
                    />

                    {images.length > 1 && (
                        <>
                            <button
                                onClick={() =>
                                    setCurrentImg(prev =>
                                        prev === 0 ? images.length - 1 : prev - 1
                                    )
                                }
                                className="absolute left-4 p-4 text-white hover:bg-white/10 rounded-full transition-all opacity-0 group-hover:opacity-100"
                            >
                                <ChevronLeft size={32} />
                            </button>

                            <button
                                onClick={() =>
                                    setCurrentImg(prev =>
                                        prev === images.length - 1 ? 0 : prev + 1
                                    )
                                }
                                className="absolute right-4 p-4 text-white hover:bg-white/10 rounded-full transition-all opacity-0 group-hover:opacity-100"
                            >
                                <ChevronRight size={32} />
                            </button>
                        </>
                    )}
                </div>

                {/* CONTENT */}
                <div className="w-full lg:w-1/3 h-1/2 lg:h-full p-8 md:p-12 overflow-y-auto flex flex-col bg-white">

                    <span className="text-amber-600 text-[10px] font-bold uppercase tracking-[0.4em] mb-4">
                        {project.category || 'Luxury Blueprint'}
                    </span>

                    <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight text-gray-900">
                        {project.title}
                    </h2>

                    <div className="flex items-center text-gray-400 text-[10px] tracking-widest uppercase mb-8 pb-8 border-b">
                        <MapPin size={16} className="mr-2 text-amber-600" />

                        {project.location || 'Nigeria'}
                    </div>

                    <p className="text-gray-600 leading-relaxed text-md mb-8 font-light">
                        {project.description}
                    </p>

                    {/* THUMBNAILS */}
                    <div className="grid grid-cols-4 gap-3 mt-auto pt-8">

                        {images.slice(0, 4).map((img, i) => (
                            <div
                                key={i}
                                className="relative aspect-square overflow-hidden rounded-sm bg-gray-100"
                            >
                                <img
                                    src={img}
                                    onClick={() => setCurrentImg(i)}
                                    className={`w-full h-full object-cover cursor-pointer hover:opacity-80 transition-all border-2 ${
                                        currentImg === i
                                            ? 'border-amber-600 scale-105'
                                            : 'border-transparent'
                                    }`}
                                    alt={`Thumbnail ${i + 1}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default function Welcome({
    auth,
    settings,
    services,
    projects,
}) {

    const [selectedProject, setSelectedProject] = useState(null);

    const [activeTab, setActiveTab] = useState('completed');

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'auto';
    }, [mobileMenuOpen]);

    // --- ICON MAP ---
    const iconMap = {
        layout: Layout,
        wrench: Wrench,
        home: Home,
        pen: PenTool,
        clipboard: ClipboardCheck,
        layers: Layers,
    };

    // --- CONTACT FORM ---
    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors
    } = useForm({
        full_name: '',
        email: '',
        phone: '',
        message: ''
    });

    // --- SUBMIT ---
    const submit = (e) => {

        e.preventDefault();

        post(route('contact.submit'), {

            preserveScroll: true,

            onSuccess: () => {

                toast.success('Message sent successfully');

                reset();
            },

            onError: () => {

                toast.error('Failed to send message');
            }
        });
    };

    // --- SETTINGS ---
    const companyName =
        settings?.company_name || 'Glam Grandeur';

    const companyEmail =
        settings?.email || 'info@glamgrandeur.com';

    const companyPhone =
        settings?.phone || '+234 000 000 0000';

    const companyAddress =
        settings?.address || 'Abuja, Nigeria';

    const heroTitle =
        settings?.hero_title || 'Where Elegance Meets Design';

    const heroSubtitle =
        settings?.hero_subtitle ||
        'Glam Grandeur is a premier interior design brand specializing in refined interiors that harmoniously blend aesthetics and functionality.';

    // --- PROJECTS ---
    const completedProjects =
        projects?.filter(
            (project) =>
                project.status?.toLowerCase() === 'completed'
        ) || [];

    const doubledLogos = [...PARTNER_LOGOS, ...PARTNER_LOGOS];

    const ongoingProjects =
        projects?.filter(
            (project) =>
                project.status?.toLowerCase() === 'ongoing'
        ) || [];

    const displayedProjects =
        activeTab === 'completed'
            ? completedProjects
            : ongoingProjects;

    return (
        <div className="min-h-screen bg-white overflow-x-hidden text-black selection:bg-amber-500 font-sans antialiased scroll-smooth">

            <Head title={companyName} />

            {/* TOASTER */}
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        background: '#111',
                        color: '#fff',
                        border: '1px solid #f59e0b'
                    }
                }}
            />

            {/* HEADER */}
            <header className="relative min-h-screen w-full bg-black overflow-hidden">

                {/* BACKGROUND */}
                <img
                    src={
                        settings?.hero_image
                            ? `/storage/${settings.hero_image}`
                            : '/images/header.png'
                    }
                    alt="Luxury Interior"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />

                <div className="absolute inset-0 bg-black/40 z-10"></div>

                {/* NAVBAR */}
                <nav className="absolute top-0 left-0 w-full z-50">

                    <div className="flex items-center justify-between px-5 md:px-10 py-6">

                        {/* LOGO */}
                        <Link href="/" className="relative z-50">

                            <img
                                src={
                                    settings?.logo
                                        ? `/storage/${settings.logo}`
                                        : '/images/logos/logo.png'
                                }
                                alt={companyName}
                                className="h-10 md:h-12 w-auto"
                            />
                        </Link>

                        {/* DESKTOP NAV */}
                        <div className="hidden lg:flex items-center gap-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-8 py-3 text-white text-[10px] uppercase tracking-[0.25em]">

                            <Link
                                href="/"
                                className="hover:text-[#E3C263] transition-colors"
                            >
                                Home
                            </Link>

                            <Link
                                href={route('about')}
                                className="hover:text-[#E3C263] transition-colors"
                            >
                                About
                            </Link>

                            <a
                                href="#services"
                                className="hover:text-[#E3C263] transition-colors"
                            >
                                Services
                            </a>

                            <a
                                href="#projects"
                                className="hover:text-[#E3C263] transition-colors"
                            >
                                Projects
                            </a>

                            <a
                                href="#contact"
                                className="hover:text-[#E3C263] transition-colors"
                            >
                                Contact
                            </a>
                        </div>

                        {/* CTA */}
                        <a
                            href="#contact"
                            className="hidden lg:flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-[10px] uppercase tracking-[0.25em] font-bold hover:bg-[#E3C263] transition-all"
                        >
                            Contact Us

                            <ArrowUpRight size={14} />
                        </a>

                        {/* MOBILE */}
                        <button
                            onClick={() =>
                                setMobileMenuOpen(!mobileMenuOpen)
                            }
                            className="lg:hidden relative z-50 text-white"
                        >
                            <div className="space-y-1">

                                <span className={`block h-[2px] w-7 bg-white transition-all ${
                                    mobileMenuOpen
                                        ? 'rotate-45 translate-y-[6px]'
                                        : ''
                                }`} />

                                <span className={`block h-[2px] w-7 bg-white transition-all ${
                                    mobileMenuOpen ? 'opacity-0' : ''
                                }`} />

                                <span className={`block h-[2px] w-7 bg-white transition-all ${
                                    mobileMenuOpen
                                        ? '-rotate-45 -translate-y-[6px]'
                                        : ''
                                }`} />
                            </div>
                        </button>
                    </div>

                    {/* MOBILE MENU */}
                    <AnimatePresence>

                        {mobileMenuOpen && (

                            <motion.div
                                initial={{ opacity: 0, y: -30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-10 text-white"
                            >

                                <Link
                                    href="/"
                                    onClick={() =>
                                        setMobileMenuOpen(false)
                                    }
                                    className="text-2xl uppercase tracking-[0.3em]"
                                >
                                    Home
                                </Link>

                                <Link
                                    href={route('about')}
                                    onClick={() =>
                                        setMobileMenuOpen(false)
                                    }
                                    className="text-2xl uppercase tracking-[0.3em]"
                                >
                                    About
                                </Link>

                                <a
                                    href="#services"
                                    onClick={() =>
                                        setMobileMenuOpen(false)
                                    }
                                    className="text-2xl uppercase tracking-[0.3em]"
                                >
                                    Services
                                </a>

                                <a
                                    href="#projects"
                                    onClick={() =>
                                        setMobileMenuOpen(false)
                                    }
                                    className="text-2xl uppercase tracking-[0.3em]"
                                >
                                    Projects
                                </a>

                                <a
                                    href="#contact"
                                    onClick={() =>
                                        setMobileMenuOpen(false)
                                    }
                                    className="text-2xl uppercase tracking-[0.3em]"
                                >
                                    Contact
                                </a>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </nav>

                {/* HERO */}
                <div className="relative z-20 flex flex-col items-center justify-center text-center min-h-screen px-6 pt-32 pb-20">

                    <p className="text-[#E3C263] text-[10px] md:text-xs uppercase tracking-[0.5em] font-bold mb-6">
                        PREMIUM INTERIOR DESIGN
                    </p>

                    <h1 className="text-[42px] sm:text-6xl md:text-4xl lg:text-7xl lg:text-[110px] leading-[1.05] font-serif text-white max-w-6xl">

                        {heroTitle}
                    </h1>

                    <p className="mt-8 max-w-2xl text-sm md:text-base text-gray-300 leading-relaxed font-light">
                        {heroSubtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto">

                        <a
                            href="#projects"
                            className="bg-[#E3C263] text-black px-10 py-5 uppercase tracking-[0.25em] text-[10px] font-bold hover:bg-white transition-all"
                        >
                            View Portfolio
                        </a>

                        <a
                            href="#contact"
                            className="border border-white/30 text-white px-10 py-5 uppercase tracking-[0.25em] text-[10px] font-bold hover:bg-white hover:text-black transition-all"
                        >
                            Get In Touch
                        </a>
                    </div>
                </div>

                {/* BOTTOM FADE */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
            </header>

            {/* LOGO TICKER */}
            <div className="py-20 border-b border-gray-100 overflow-hidden bg-white">
            <div className="flex w-max animate-scroll whitespace-nowrap">
                {doubledLogos.map((logo, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-center mx-12 md:mx-16 shrink-0"
                    >
                        <img
                            src={logo.src}
                            alt={logo.alt}
                            className="h-16 md:h-24 w-auto object-contain"
                        />
                    </div>
                ))}
            </div>
        </div>


            {/* ABOUT */}
            <section
                id="about-section"
                className="py-20 md:py-32 px-6 bg-white overflow-hidden"
            >

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* IMAGES */}
                    <div className="relative h-[500px] md:h-[650px] w-full">

                        <div className="absolute top-0 left-0 w-[75%] h-[70%] overflow-hidden shadow-lg border border-gray-100">

                            <img
                                src={
                                    settings?.about_image_1
                                        ? `/storage/${settings.about_image_1}`
                                        : '/images/about1.jpg'
                                }
                                className="w-full h-full object-cover"
                                alt="Luxury Interior"
                            />
                        </div>

                        <div className="absolute bottom-0 right-0 w-[75%] h-[70%] shadow-2xl z-10 border-[8px] md:border-[12px] border-white">

                            <img
                                src={
                                    settings?.about_image_2
                                        ? `/storage/${settings.about_image_2}`
                                        : '/images/about2.jpg'
                                }
                                className="w-full h-full object-cover"
                                alt="Modern Office"
                            />
                        </div>
                    </div>

                    {/* TEXT */}
                    <div className="space-y-8">

                        <div className="space-y-4">

                            <span className="text-[#f59e0b] text-xs uppercase tracking-[0.4em] font-bold block">
                                ABOUT US
                            </span>

                            <h2 className="text-4xl md:text-6xl font-serif text-black leading-tight">

                                {settings?.about_title ||
                                    'Redefining Glam Grandeur'}
                            </h2>
                        </div>

                        <div className="text-gray-700 text-base md:text-lg font-light leading-relaxed space-y-6">

                            <p>
                                {settings?.about_description ||
                                    'Glam Grandeur is an interior design brand that transforms spaces with elegance and sophistication.'}
                            </p>
                        </div>

                        <div>

                            <Link
                                href={route('about')}
                                className="inline-block bg-[#f59e0b] text-white px-10 py-4 text-[10px] font-bold tracking-widest hover:bg-black transition-all"
                            >
                                READ MORE —
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        
{/* --- 4. SERVICES SECTION --- */}
{/* =========================================================================
    SERVICES SECTION (FULLY BACKEND CONNECTED)
=========================================================================== */}
<section
    id="services"
    className="py-20 md:py-32 px-6 md:px-20 bg-white"
>

    <div className="text-center mb-16 md:mb-24">

        <span className="text-[#E3C263] text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold">
            What We Do
        </span>

        <h2 className="text-4xl md:text-6xl font-serif mt-4 text-gray-900 tracking-tight">
            {settings?.service_section_title || 'Our Services'}
        </h2>
    </div>

    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 border-t border-l border-gray-100">

        {services && services.length > 0 ? (

            services.map((service, i) => {

                const IconComponent =
                    iconMap[
                        service.icon?.toLowerCase()
                    ] || Layout;

                return (
                    <motion.div
                        key={service.id || i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="p-12 md:p-20 border-r border-b border-gray-100 group hover:bg-[#FDFBF7] transition-all duration-500 ease-in-out relative overflow-hidden"
                    >

                        {/* GHOST NUMBER */}
                        <span className="absolute -bottom-4 -right-2 text-4xl md:text-6xl lg:text-7xl font-serif text-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none select-none">
                            0{i + 1}
                        </span>

                        {/* ICON */}
                        <div className="w-16 h-16 bg-[#E3C263]/10 text-[#E3C263] flex items-center justify-center mb-10 rounded-2xl group-hover:bg-[#E3C263] group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-sm shadow-[#E3C263]/5">

                            <IconComponent
                                size={28}
                                strokeWidth={1.2}
                            />
                        </div>

                        {/* TITLE */}
                        <h3 className="text-xl font-serif text-gray-900 mb-6 uppercase tracking-widest leading-tight">

                            {service.title}
                        </h3>

                        {/* DESCRIPTION */}
                        <p className="text-gray-400 text-[11px] leading-relaxed uppercase tracking-[0.2em] font-medium max-w-xs">

                            {service.description}
                        </p>

                        {/* LINE */}
                        <div className="mt-10 h-[1px] w-0 bg-[#E3C263] group-hover:w-12 transition-all duration-700 ease-out"></div>
                    </motion.div>
                );
            })

        ) : (

            <div className="col-span-full py-40 text-center">

                <div className="animate-pulse text-gray-200 text-[10px] uppercase tracking-[0.5em] font-bold">

                    Refining Signature Offerings...
                </div>
            </div>
        )}
    </div>
</section>

{/* =========================================================================
    PROJECTS SECTION (FULLY BACKEND CONNECTED)
=========================================================================== */}
<section
    id="projects"
    className="py-24 px-6 md:px-12 max-w-7xl mx-auto"
>

    <div className="text-center mb-16">

        <p className="text-[#E3C263] text-[10px] uppercase tracking-[0.3em] font-bold">
            Our Work
        </p>

        <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif mt-4 text-gray-900">
            Projects
        </h2>

        {/* TABS */}
        <div className="flex flex-wrap justify-center mt-12 gap-3">

            <button
                onClick={() => setActiveTab('completed')}
                className={`px-12 py-4 text-[10px] uppercase font-bold tracking-widest border transition-all ${
                    activeTab === 'completed'
                        ? 'bg-[#E3C263] text-white border-[#E3C263]'
                        : 'border-gray-100 text-black hover:bg-[#E3C263] hover:text-white'
                }`}
            >
                Completed
            </button>

            <button
                onClick={() => setActiveTab('ongoing')}
                className={`px-12 py-4 text-[10px] uppercase font-bold tracking-widest border transition-all ${
                    activeTab === 'ongoing'
                        ? 'bg-[#E3C263] text-white border-[#E3C263]'
                        : 'border-gray-100 text-black hover:bg-[#E3C263] hover:text-white'
                }`}
            >
                Ongoing
            </button>
        </div>
    </div>

    {/* PROJECT GRID */}
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">

        {displayedProjects &&
        displayedProjects.length > 0 ? (

            displayedProjects.map((project, index) => {

                const projectNumber = String(
                    index + 1
                ).padStart(2, '0');

                const displayImage =
                    project.image
                        ? `/storage/${project.image}`
                        : '/images/projects/Project-01.jpg';

                return (

                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            delay: index * 0.05
                        }}
                        className="group relative aspect-[4/5] overflow-hidden rounded-[30px] md:rounded-[45px] cursor-pointer shadow-xl bg-gray-50"
                        onClick={() =>
                            setSelectedProject(project)
                        }
                    >

                        {/* IMAGE */}
                        <img
                            src={displayImage}
                            className="w-full h-full object-cover transition-all duration-1000 transform group-hover:scale-110"
                            alt={project.title}
                            onError={(e) => {
                                e.target.src =
                                    '/images/projects/Project-01.jpg';
                            }}
                        />

                        {/* OVERLAY */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                        {/* CONTENT */}
                        <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 text-white translate-y-4 group-hover:translate-y-0 transition-all duration-500 pr-10">

                            <span className="text-4xl opacity-40 block mb-2 font-serif">
                                {projectNumber}
                            </span>

                            <p className="text-[#E3C263] text-[9px] uppercase font-bold tracking-[0.3em] mb-2">

                                {project.category}
                            </p>

                            <h3 className="text-2xl mb-6 leading-tight font-serif">

                                {project.title}
                            </h3>

                            <button className="bg-[#E3C263] text-black px-8 py-4 text-[9px] uppercase font-bold tracking-[0.2em] hover:bg-white transition-all">

                                View Project —
                            </button>
                        </div>
                    </motion.div>
                );
            })

        ) : (

            <div className="col-span-full py-32 text-center">

                <p className="text-gray-400 uppercase tracking-[0.3em] text-xs">

                    No projects available
                </p>
            </div>
        )}
    </div>
</section>

{/* =========================================================================
    PROJECT MODAL
=========================================================================== */}
<AnimatePresence>

    {selectedProject && (

        <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
        />
    )}
</AnimatePresence>

{/* =========================================================================
    FEED & TESTIMONIALS
=========================================================================== */}
<section className="py-20 md:py-32 px-6 md:px-20 bg-gray-50 overflow-hidden">

    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-end mb-16">

        <div className="w-full lg:w-auto text-center lg:text-left">

            <span className="text-[#E3C263] text-[10px] uppercase tracking-widest font-bold">
                Latest Inspiration
            </span>

            <h2 className="text-4xl md:text-6xl font-serif mt-4">
                Our Feed
            </h2>
        </div>
    </div>

    {/* FEED */}
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 md:mb-32">

        {/* FEATURED */}
        <div className="lg:col-span-7 bg-white p-4 md:p-6 shadow-sm group">

            <div className="relative aspect-video overflow-hidden mb-8">

                <img
                    src={
                        settings?.featured_feed_image
                            ? `/storage/${settings.featured_feed_image}`
                            : '/images/image15.jpg'
                    }
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    alt="Featured Post"
                />

                <div className="absolute inset-0 flex items-center justify-center">

                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 cursor-pointer hover:bg-white/40 transition-colors">

                        ▶
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-start">

                <div className="space-y-3">

                    <p className="text-gray-400 text-[10px] uppercase font-bold">

                        {settings?.feed_date ||
                            'Glam Grandeur • 9th March, 2026'}
                    </p>

                    <h3 className="text-xl md:text-2xl font-bold">

                        {settings?.featured_feed_title ||
                            'Henry Apartment Interior Design'}
                    </h3>

                    <p className="text-gray-500 text-xs md:text-sm font-light max-w-lg">

                        {settings?.featured_feed_description ||
                            'Specializing in modern, functional, and elegant interior designs.'}
                    </p>
                </div>

                <ArrowUpRight className="text-gray-300 hidden md:block" />
            </div>
        </div>

        {/* SIDEBAR */}
        <div className="lg:col-span-5 space-y-6">

            {[1, 2, 3].map((i) => (

                <div
                    key={i}
                    className="bg-white p-4 md:p-6 flex gap-4 md:gap-6 hover:shadow-lg transition-shadow cursor-pointer border border-transparent hover:border-gray-100 group"
                >

                    <div className="w-24 h-24 md:w-40 md:h-40 flex-shrink-0 overflow-hidden">

                        <img
                            src={`/images/feed-${i}.png`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            alt="Post"
                        />
                    </div>

                    <div className="space-y-2 relative pr-6 md:pr-8">

                        <p className="text-gray-400 text-[9px] uppercase font-bold">

                            Glam Grandeur • Instagram
                        </p>

                        <h4 className="font-bold text-xs md:text-sm">

                            Interior Design Inspiration
                        </h4>

                        <p className="text-gray-500 text-[10px] md:text-[11px] font-light leading-snug line-clamp-2">

                            Elegant and timeless luxury interiors.
                        </p>

                        <ArrowUpRight className="absolute top-0 right-0 w-4 h-4 text-gray-300" />
                    </div>
                </div>
            ))}
        </div>
    </div>
    </section>

{/* =========================================================================
    CONTACT SECTION
=========================================================================== */}
<section
    id="contact"
    className="relative bg-black py-20 md:py-32 px-6 md:px-20 overflow-hidden"
>

    <img
        src={
            settings?.footer_background
                ? `/storage/${settings.footer_background}`
                : '/images/footer-bg.jpg'
        }
        className="absolute inset-0 w-full h-full object-cover opacity-10"
        alt="background"
    />

    <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32">

        {/* LEFT */}
        <div className="text-white">

            <span className="text-[#E3C263] text-[10px] uppercase tracking-widest font-bold">
                Reach Out
            </span>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif mt-8 mb-10 md:mb-16 leading-tight">
                Contact Us
            </h2>

            <div className="space-y-8 md:space-y-12">

                {/* PHONE */}
                <div className="flex gap-6 md:gap-8 items-center">

                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0">

                        <Phone
                            size={18}
                            className="text-[#E3C263]"
                        />
                    </div>

                    <div>

                        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">
                            Phone
                        </p>

                        <p className="text-base md:text-lg font-light">
                            {companyPhone}
                        </p>
                    </div>
                </div>

                {/* EMAIL */}
                <div className="flex gap-6 md:gap-8 items-center">

                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0">

                        <Mail
                            size={18}
                            className="text-[#E3C263]"
                        />
                    </div>

                    <div>

                        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">
                            Email
                        </p>

                        <p className="text-base md:text-lg font-light break-all">
                            {companyEmail}
                        </p>
                    </div>
                </div>

                {/* ADDRESS */}
                <div className="flex gap-6 md:gap-8 items-center">

                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0">

                        <MapPin
                            size={18}
                            className="text-[#E3C263]"
                        />
                    </div>

                    <div>

                        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">
                            Office
                        </p>

                        <p className="text-base md:text-lg font-light max-w-sm">
                            {companyAddress}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* FORM */}
        <div className="flex flex-col gap-6">

            <form
                onSubmit={submit}
                className="flex flex-col gap-6 bg-white/5 backdrop-blur-3xl p-6 md:p-10 border border-white/10 rounded-[30px]"
            >

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <input
                        type="text"
                        placeholder="Full Name"
                        value={data.full_name}
                        onChange={(e) =>
                            setData('full_name', e.target.value)
                        }
                        required
                        className="bg-white/10 border border-white/10 p-5 rounded-xl text-white outline-none"
                    />

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={data.email}
                        onChange={(e) =>
                            setData('email', e.target.value)
                        }
                        required
                        className="bg-white/10 border border-white/10 p-5 rounded-xl text-white outline-none"
                    />
                </div>

                <input
                    type="tel"
                    placeholder="Phone Number"
                    value={data.phone}
                    onChange={(e) =>
                        setData('phone', e.target.value)
                    }
                    className="bg-white/10 border border-white/10 p-5 rounded-xl text-white outline-none"
                />

                <textarea
                    placeholder="Message"
                    value={data.message}
                    onChange={(e) =>
                        setData('message', e.target.value)
                    }
                    required
                    className="bg-white/10 border border-white/10 p-5 h-32 md:h-44 rounded-xl resize-none text-white outline-none"
                />

                <button
                    type="submit"
                    disabled={processing}
                    className="bg-[#E3C263] text-black font-black py-5 md:py-6 rounded-xl uppercase tracking-[0.3em] text-[10px] hover:bg-white transition-all disabled:opacity-50"
                >

                    {processing
                        ? 'Sending...'
                        : 'Send Message'}
                </button>
            </form>
        </div>
    </div>

    {/* FOOTER */}
    <div className="relative z-10 max-w-7xl mx-auto pt-12 md:pt-16 mt-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">

            {/* BRAND */}
            <div className="lg:col-span-2 space-y-6 text-center md:text-left">

                <img
                    src={
                        settings?.logo
                            ? `/storage/${settings.logo}`
                            : '/images/logos/logo.png'
                    }
                    className="h-10 md:h-12 mx-auto md:mx-0"
                    alt="Logo"
                />

                <p className="text-gray-200 text-sm md:text-base font-normal leading-relaxed max-w-md mx-auto md:mx-0">

                    {settings?.footer_text ||
                        'Transforming spaces with elegance and sophistication.'}
                </p>
            </div>

            {/* LINKS */}
            <div className="text-center md:text-left">

                <h4 className="text-white font-semibold uppercase tracking-wider text-sm mb-5">
                    Quick Links
                </h4>

                <div className="flex flex-col gap-3 text-gray-300 text-sm font-medium">

                    <a
                        href="#projects"
                        className="hover:text-[#E3C263] transition-colors"
                    >
                        Projects
                    </a>

                    <a
                        href="#services"
                        className="hover:text-[#E3C263] transition-colors"
                    >
                        Services
                    </a>

                    <Link
                        href={route('about')}
                        className="hover:text-[#E3C263] transition-colors"
                    >
                        About
                    </Link>

                    <a
                        href="#contact"
                        className="hover:text-[#E3C263] transition-colors"
                    >
                        Contact
                    </a>
                </div>
            </div>

            {/* SOCIAL */}
            <div className="text-center md:text-left">

                <h4 className="text-white font-semibold uppercase tracking-wider text-sm mb-5">
                    Follow Us
                </h4>

                <div className="flex justify-center md:justify-start gap-3">

                    <a
                        href={settings?.instagram_url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                    >
                        <InstagramIcon />
                    </a>

                    <a
                        href={settings?.facebook_url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                    >
                        <FacebookIcon />
                    </a>

                    <a
                        href={settings?.x_url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                    >
                        <XIcon />
                    </a>
                </div>
            </div>
        </div>

        {/* COPYRIGHT */}
        <div className="py-5 flex flex-col md:flex-row justify-between items-center text-gray-300 text-sm font-normal text-center gap-4">

            <p>
                © {new Date().getFullYear()} {companyName}. All Rights Reserved.
            </p>

            <div className="flex gap-6">

                <a
                    href="#"
                    className="hover:text-white transition-colors"
                >
                    Terms
                </a>

                <a
                    href="#"
                    className="hover:text-white transition-colors"
                >
                    Privacy
                </a>
            </div>
        </div>
    </div>
</section>
</div>
);
}