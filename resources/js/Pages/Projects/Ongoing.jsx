import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowUpRight,
    MapPin,
    Send,
    X,
    ImageIcon,
    Info
} from "lucide-react";

export default function Ongoing({
    projects = [],
    settings = {}
}) {

    const [selectedProject, setSelectedProject] = useState(null);

    /* =========================================================================
       SETTINGS FROM BACKEND
       ========================================================================= */

    const siteName = settings?.site_name || "Glam Grandeur";

    const logo =
        settings?.logo
            ? `/storage/${settings.logo}`
            : "/images/logos/logo.png";

    const darkLogo =
        settings?.dark_logo
            ? `/storage/${settings.dark_logo}`
            : "/images/logos/logob.png";

    const ongoingHero =
        settings?.ongoing_projects_banner
            ? `/storage/${settings.ongoing_projects_banner}`
            : "/images/completedb.jpg";

    const footerDescription =
        settings?.footer_description ||
        "Redefining the boundaries of elegance and luxury through bespoke interior design solutions.";

    const instagram = settings?.instagram || "#";
    const facebook = settings?.facebook || "#";

    /* =========================================================================
       IMAGE LOGIC
       ========================================================================= */

    const getProjectImages = (project, fallbackNum) => {

        // Gallery array
        if (
            project.gallery &&
            Array.isArray(project.gallery) &&
            project.gallery.length > 0
        ) {
            return project.gallery.map((img) =>
                img.startsWith('http')
                    ? img
                    : `/storage/${img}`
            );
        }

        // Multiple images relation
        if (project.images && Array.isArray(project.images)) {
            return project.images.map((img) =>
                img.image_path
                    ? `/storage/${img.image_path}`
                    : `/storage/${img}`
            );
        }

        // Main image path
        if (project.image_path) {
            return [`/storage/${project.image_path}`];
        }

        // Alternate image field
        if (project.image) {
            return [`/storage/${project.image}`];
        }

        // Fallback image
        return [`/images/projects/Project-${fallbackNum}.jpg`];
    };

    /* =========================================================================
       ANIMATIONS
       ========================================================================= */

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 40
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="bg-white min-h-screen overflow-x-hidden relative font-sans selection:bg-amber-500 selection:text-white">

            <Head title={`Ongoing Projects | ${siteName}`} />

            {/* =========================================================================
               NAVIGATION
               ========================================================================= */}

            <nav className="absolute top-0 left-0 w-full z-50 px-6 md:px-12 py-8">

                <div className="max-w-7xl mx-auto flex items-center justify-between">

                    <Link href={route('home')}>
                        <img
                            src={logo}
                            alt={siteName}
                            className="h-10 w-auto"
                        />
                    </Link>

                    <div className="hidden lg:flex items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-10 py-4 gap-8 text-[10px] uppercase tracking-[0.25em] text-white font-semibold">

                        <Link
                            href={route('about')}
                            className="hover:text-amber-400 transition-all"
                        >
                            About
                        </Link>

                        <a
                            href="/#services"
                            className="hover:text-amber-400 transition-all"
                        >
                            Services
                        </a>

                        <Link
                            href={route('projects.completed')}
                            className="hover:text-amber-400 transition-all"
                        >
                            Projects
                        </Link>

                    </div>

                    <Link
                        href="/#contact"
                        className="hidden md:flex items-center bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-full text-[10px] uppercase tracking-[0.25em] text-white font-bold group"
                    >
                        Contact

                        <div className="ml-2 bg-white text-black rounded-full p-1 group-hover:rotate-45 transition-all">
                            <ArrowUpRight size={12} />
                        </div>
                    </Link>

                </div>

            </nav>

            {/* =========================================================================
               HERO SECTION
               ========================================================================= */}

            <section className="relative h-[70vh] bg-black flex items-center justify-center overflow-hidden">

                <img
                    src={ongoingHero}
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                    alt="Ongoing Projects"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 text-center px-6"
                >

                    <span className="text-amber-400 uppercase tracking-[0.5em] text-[11px] font-bold block mb-6">
                        In Progress
                    </span>

                    <h1 className="text-white text-5xl md:text-6xl lg:text-8xl font-serif leading-none">
                        Ongoing
                        <br />
                        Projects
                    </h1>

                    <p className="max-w-2xl mx-auto mt-8 text-gray-300 leading-relaxed text-base md:text-lg">
                        Discover our latest luxury developments currently being
                        designed, crafted, and transformed into timeless masterpieces.
                    </p>

                </motion.div>

            </section>

            {/* =========================================================================
               PROJECT STATUS BUTTONS
               ========================================================================= */}

            <div className="flex justify-center -mt-10 relative z-20 gap-4 px-6">

                <Link
                    href={route('projects.completed')}
                    className="px-10 md:px-16 py-5 bg-white text-black uppercase tracking-[0.3em] text-[10px] font-bold border border-gray-100 shadow-2xl hover:bg-amber-500 hover:text-white transition-all duration-300"
                >
                    Completed
                </Link>

                <Link
                    href={route('projects.ongoing')}
                    className="px-10 md:px-16 py-5 bg-amber-500 text-white uppercase tracking-[0.3em] text-[10px] font-bold shadow-2xl hover:bg-black transition-all duration-300"
                >
                    Ongoing
                </Link>

            </div>

            {/* =========================================================================
               PROJECTS GRID
               ========================================================================= */}

            <section className="py-24 md:py-32 px-6 md:px-12">

                <div className="max-w-7xl mx-auto">

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20"
                    >

                        {projects && projects.length > 0 ? (

                            projects.map((project, index) => {

                                const projectNumber = String(index + 1).padStart(2, '0');

                                const displayImage =
                                    project.image_path
                                        ? `/storage/${project.image_path}`
                                        : project.image
                                        ? `/storage/${project.image}`
                                        : `/images/projects/Project-${projectNumber}.jpg`;

                                const projectImages = getProjectImages(
                                    project,
                                    projectNumber
                                );

                                return (

                                    <motion.div
                                        key={project.id || index}
                                        variants={itemVariants}
                                        className="group cursor-pointer"
                                        onClick={() =>
                                            setSelectedProject({
                                                ...project,
                                                displayImage,
                                                imagesList: projectImages
                                            })
                                        }
                                    >

                                        <div className="relative aspect-[16/10] overflow-hidden mb-8 shadow-2xl rounded-[20px]">

                                            <img
                                                src={displayImage}
                                                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                                                alt={project.title}
                                                onError={(e) => {
                                                    e.target.src = `/images/projects/Project-01.jpg`;
                                                }}
                                            />

                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500" />

                                            <div className="absolute top-6 left-6">

                                                <span className="bg-amber-500 text-black px-4 py-2 rounded-full text-[9px] uppercase tracking-[0.25em] font-bold">

                                                    {project.category || 'Ongoing Construction'}

                                                </span>

                                            </div>

                                        </div>

                                        <div className="flex items-end justify-between gap-6">

                                            <div>

                                                <h3 className="text-3xl md:text-4xl font-serif mb-3">
                                                    {project.title || `Ongoing Development ${projectNumber}`}
                                                </h3>

                                                <div className="flex items-center text-gray-500 uppercase tracking-[0.2em] text-[10px]">

                                                    <MapPin
                                                        size={14}
                                                        className="mr-2 text-amber-500"
                                                    />

                                                    {project.location || 'Abuja, Nigeria'}

                                                </div>

                                            </div>

                                            <div className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">

                                                <ArrowUpRight size={20} />

                                            </div>

                                        </div>

                                    </motion.div>
                                );
                            })

                        ) : (

                            <div className="col-span-full text-center py-32 bg-gray-50 rounded-[40px] border border-dashed border-gray-200">

                                <p className="text-2xl font-serif text-gray-300 uppercase tracking-[0.3em]">
                                    Awaiting New Masterpieces
                                </p>

                            </div>

                        )}

                    </motion.div>

                </div>

            </section>

            {/* =========================================================================
               PROJECT DETAILS MODAL
               ========================================================================= */}

            <AnimatePresence>

                {selectedProject && (

                    <div className="fixed inset-0 z-[100] flex items-center justify-end bg-black/70 backdrop-blur-sm">

                        <div
                            className="absolute inset-0"
                            onClick={() => setSelectedProject(null)}
                        />

                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{
                                type: 'spring',
                                damping: 25,
                                stiffness: 120
                            }}
                            className="relative w-full max-w-2xl h-full bg-white overflow-y-auto shadow-2xl z-10"
                        >

                            {/* HEADER */}

                            <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-xl border-b border-gray-100 px-6 py-5 flex items-center justify-between">

                                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-[10px] font-bold text-amber-600">

                                    <Info size={14} />

                                    Project Overview

                                </div>

                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-all"
                                >
                                    <X size={20} />
                                </button>

                            </div>

                            {/* COVER */}

                            <div className="relative h-[45vh] bg-black overflow-hidden">

                                <img
                                    src={selectedProject.displayImage}
                                    className="w-full h-full object-cover"
                                    alt={selectedProject.title}
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                <div className="absolute bottom-8 left-8 text-white">

                                    <span className="bg-amber-500 text-black px-4 py-2 rounded-full text-[9px] uppercase tracking-[0.3em] font-bold inline-block mb-5">

                                        {selectedProject.category || 'Ongoing Construction'}

                                    </span>

                                    <h2 className="text-4xl md:text-5xl font-serif leading-tight">

                                        {selectedProject.title}

                                    </h2>

                                </div>

                            </div>

                            {/* CONTENT */}

                            <div className="p-8 space-y-10">

                                <div className="bg-gray-50 border border-gray-100 rounded-[20px] p-6">

                                    <div className="grid grid-cols-2 gap-6">

                                        <div>

                                            <span className="text-gray-400 uppercase text-[10px] tracking-[0.25em] block mb-2">
                                                Location
                                            </span>

                                            <div className="flex items-center gap-2 text-sm font-medium">

                                                <MapPin
                                                    size={14}
                                                    className="text-amber-500"
                                                />

                                                {selectedProject.location || 'Abuja, Nigeria'}

                                            </div>

                                        </div>

                                        <div>

                                            <span className="text-gray-400 uppercase text-[10px] tracking-[0.25em] block mb-2">
                                                Media
                                            </span>

                                            <div className="flex items-center gap-2 text-sm font-bold">

                                                <ImageIcon
                                                    size={14}
                                                    className="text-amber-500"
                                                />

                                                {selectedProject.imagesList?.length || 0} Photos

                                            </div>

                                        </div>

                                    </div>

                                </div>

                                <div>

                                    <h3 className="text-2xl font-serif mb-5">
                                        About This Project
                                    </h3>

                                    <p className="text-gray-600 leading-relaxed text-sm md:text-base font-light">
                                        {selectedProject.description ||
                                            "This luxury development represents the pinnacle of bespoke design and innovation."}
                                    </p>

                                </div>

                                {/* GALLERY */}

                                <div>

                                    <h3 className="text-2xl font-serif mb-6">
                                        Gallery Showcase
                                    </h3>

                                    <div className="grid grid-cols-2 gap-4">

                                        {selectedProject.imagesList?.map((imgSrc, idx) => (

                                            <div
                                                key={idx}
                                                className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-gray-100"
                                            >

                                                <img
                                                    src={imgSrc}
                                                    alt="Gallery"
                                                    className="w-full h-full object-cover hover:scale-105 transition-all duration-700"
                                                    onError={(e) => {
                                                        e.target.src =
                                                            selectedProject.displayImage;
                                                    }}
                                                />

                                            </div>

                                        ))}

                                    </div>

                                </div>

                            </div>

                        </motion.div>

                    </div>

                )}

            </AnimatePresence>

            {/* =========================================================================
               FOOTER
               ========================================================================= */}

            <footer className="bg-[#111111] text-white pt-28 pb-12 px-6 md:px-12 relative overflow-hidden">

                <div className="max-w-7xl mx-auto relative z-10">

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">

                        <div className="md:col-span-5">

                            <img
                                src={darkLogo}
                                className="h-10 w-auto mb-8"
                                alt={siteName}
                            />

                            <p className="max-w-sm text-gray-400 leading-relaxed text-lg font-light">
                                {footerDescription}
                            </p>

                            <div className="flex gap-4 mt-8">

                                <a
                                    href={instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                                >
                                    IG
                                </a>

                                <a
                                    href={facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                                >
                                    FB
                                </a>

                            </div>

                        </div>

                        <div className="md:col-span-3">

                            <h5 className="uppercase text-[11px] tracking-[0.3em] font-bold mb-8 text-amber-500">
                                Sitemap
                            </h5>

                            <ul className="space-y-4 text-gray-400 text-lg font-light">

                                <li>
                                    <Link
                                        href="/#projects"
                                        className="hover:text-white transition-all"
                                    >
                                        Projects
                                    </Link>
                                </li>

                                <li>
                                    <a
                                        href="/#services"
                                        className="hover:text-white transition-all"
                                    >
                                        Services
                                    </a>
                                </li>

                                <li>
                                    <Link
                                        href={route('about')}
                                        className="hover:text-white transition-all"
                                    >
                                        About
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/#contact"
                                        className="hover:text-white transition-all"
                                    >
                                        Contact
                                    </Link>
                                </li>

                            </ul>

                        </div>

                        <div className="md:col-span-4">

                            <h5 className="uppercase text-[11px] tracking-[0.3em] font-bold mb-8 text-amber-500">
                                Subscribe
                            </h5>

                            <div className="flex bg-white/5 border border-white/10 backdrop-blur-md p-1">

                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="bg-transparent border-none outline-none text-white text-sm w-full px-4"
                                />

                                <button className="bg-amber-500 p-4 hover:bg-amber-600 transition-all">

                                    <Send size={18} />

                                </button>

                            </div>

                        </div>

                    </div>

                    <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.35em] text-gray-600">

                        <p>
                            © {new Date().getFullYear()} {siteName}. All Rights Reserved.
                        </p>

                    </div>

                </div>

            </footer>

        </div>
    );
}