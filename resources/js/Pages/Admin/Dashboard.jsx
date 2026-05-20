import React, { useEffect, useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    FolderOpen,
    Settings,
    Users,
    Wrench,
    LogOut,
    Folder,
    Clock,
    CheckCircle2,
    Star,
    Eye,
    EyeOff,
    Activity,
    Layers3,
    TrendingUp,
    CalendarDays,
    Menu,
    X,
} from 'lucide-react';

export default function Dashboard({ stats = {}, projects = [] }) {
    const { auth } = usePage().props;

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    /*
    |--------------------------------------------------------------------------
    | REAL FRONTEND CONNECTED STATS (FIXED & ALIGNED)
    |--------------------------------------------------------------------------
    */
    
    // 1. Safely normalize to an array to completely bypass undefined method crashes
    const safeProjects = Array.isArray(projects) ? projects : [];

    // 2. Updated data references to perfectly match 'projects', 'services', and 'team' from AdminController
    const totalProjects = safeProjects.length || stats?.projects || 0;

    const ongoingProjects = safeProjects.filter(
        (project) => (project.status || '').toLowerCase() === 'ongoing'
    ).length;

    const completedProjects = safeProjects.filter(
        (project) => (project.status || '').toLowerCase() === 'completed'
    ).length;

    const plannedProjects = safeProjects.filter(
        (project) => (project.status || '').toLowerCase() === 'planned'
    ).length;

    const pausedProjects = safeProjects.filter(
        (project) => (project.status || '').toLowerCase() === 'paused'
    ).length;

    const featuredProjects = safeProjects.filter(
        (project) => project.featured
    ).length;

    const publishedProjects = safeProjects.filter(
        (project) => project.is_published
    ).length;

    const hiddenProjects = safeProjects.filter(
        (project) => !project.is_published
    ).length;

    const totalServices = stats?.services || 0;

    const totalTeam = stats?.team || 0;

    /*
    |--------------------------------------------------------------------------
    | RECENT PROJECTS
    |--------------------------------------------------------------------------
    */

    const recentProjects = [...safeProjects]
        .sort((a, b) => b.id - a.id)
        .slice(0, 5);

    return (
        <div className="flex min-h-screen bg-[#FDFBF7] font-sans selection:bg-[#E3C263]/30 text-gray-900">
            <Head title="Admin Dashboard | Glam Grandeur" />

            {/* SIDEBAR */}
            <aside
                className={`fixed inset-y-0 left-0 z-[70] w-72 bg-white border-r border-gray-100 flex flex-col p-8 transition-transform duration-300 lg:translate-x-0 ${
                    sidebarOpen
                        ? 'translate-x-0'
                        : '-translate-x-full'
                }`}
            >
                <div className="mb-16 flex justify-between items-center">
                    <img
                        src="/images/logos/logo.png"
                        alt="Glam Grandeur"
                        className="h-12"
                    />

                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-2 text-gray-400"
                    >
                        <X />
                    </button>
                </div>

                <nav className="flex-1 space-y-4">
                    <Link
                        href={route('admin.index')}
                        className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-sm transition-all ${
                            route().current('admin.index')
                                ? 'bg-[#E3C263] text-white shadow-xl shadow-[#E3C263]/20'
                                : 'text-gray-400 hover:text-[#E3C263]'
                        }`}
                    >
                        <LayoutDashboard size={20} />
                        <span className="font-medium">
                            Dashboard
                        </span>
                    </Link>

                    <Link
                        href={route('admin.projects.index')}
                        className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-sm transition-all ${
                            route().current(
                                'admin.projects.index'
                            )
                                ? 'bg-[#E3C263] text-white shadow-xl shadow-[#E3C263]/20'
                                : 'text-gray-400 hover:text-[#E3C263]'
                        }`}
                    >
                        <FolderOpen size={20} />
                        <span className="font-medium">
                            Projects
                        </span>
                    </Link>

                    <Link
                        href={route('admin.services.index')}
                        className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-sm transition-all ${
                            route().current(
                                'admin.services.index'
                            )
                                ? 'bg-[#E3C263] text-white shadow-xl shadow-[#E3C263]/20'
                                : 'text-gray-400 hover:text-[#E3C263]'
                        }`}
                    >
                        <Wrench size={20} />
                        <span className="font-medium">
                            Services
                        </span>
                    </Link>

                    <Link
                        href={route('admin.team.index')}
                        className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-sm transition-all ${
                            route().current('admin.team.index')
                                ? 'bg-[#E3C263] text-white shadow-xl shadow-[#E3C263]/20'
                                : 'text-gray-400 hover:text-[#E3C263]'
                        }`}
                    >
                        <Users size={20} />
                        <span className="font-medium">
                            Team
                        </span>
                    </Link>

                    <Link
                        href={route('admin.settings.index')}
                        className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-sm transition-all ${
                            route().current(
                                'admin.settings.index'
                            )
                                ? 'bg-[#E3C263] text-white shadow-xl shadow-[#E3C263]/20'
                                : 'text-gray-400 hover:text-[#E3C263]'
                        }`}
                    >
                        <Settings size={20} />
                        <span className="font-medium">
                            Settings
                        </span>
                    </Link>
                </nav>

                <div className="pt-8 border-t border-gray-50">
                    <Link
                        method="post"
                        as="button"
                        href={route('logout')}
                        className="flex items-center gap-4 text-red-400 hover:bg-red-50 w-full px-6 py-4 rounded-2xl text-sm font-bold group transition-all"
                    >
                        <LogOut
                            size={20}
                            className="group-hover:translate-x-1 transition-transform"
                        />

                        <span className="uppercase tracking-widest text-[10px]">
                            Logout
                        </span>
                    </Link>
                </div>
            </aside>

            {/* MAIN */}
            <main className="flex-1 lg:ml-72 p-4 lg:p-12">
                <div className="bg-white rounded-[45px] p-6 lg:p-12 shadow-[0_10px_60px_rgba(0,0,0,0.03)] border border-gray-50 min-h-[90vh] relative overflow-hidden">
                    {/* BACKGROUND EFFECT */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#E3C263]/5 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none"></div>

                    {/* HEADER */}
                    <header className="flex flex-col lg:flex-row justify-between lg:items-start gap-8 mb-14 relative z-10">
                        <div>
                            <button
                                onClick={() =>
                                    setSidebarOpen(true)
                                }
                                className="lg:hidden mb-6 p-3 bg-gray-50 rounded-xl text-[#E3C263]"
                            >
                                <Menu size={24} />
                            </button>

                            <h1 className="text-4xl lg:text-6xl font-rosica text-gray-900 tracking-tight leading-tight">
                                Hello,{' '}
                                {
                                    auth?.user?.name 
                                        ? auth.user.name.split(' ')[0] 
                                        : 'Admin'
                                }
                            </h1>

                            <div className="flex items-center gap-3 text-gray-400 text-[11px] mt-4 font-bold uppercase tracking-[0.2em]">
                                <CalendarDays
                                    size={12}
                                    className="text-[#E3C263]"
                                />

                                <span>
                                    {currentTime.toLocaleTimeString()}{' '}
                                    •{' '}
                                    {currentTime.toLocaleDateString(
                                        'en-GB',
                                        {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        }
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="hidden lg:block text-[10px] uppercase tracking-[0.4em] text-[#E3C263] font-black border-b-2 border-[#E3C263]/10 pb-2">
                            Live Frontend Statistics
                        </div>
                    </header>

                    {/* PRIMARY STATS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-14 relative z-10">
                        {/* TOTAL */}
                        <div className="group border border-gray-100 p-8 rounded-[35px] bg-white hover:border-[#E3C263]/30 hover:shadow-2xl transition-all duration-500">
                            <div className="flex items-center justify-between mb-8">
                                <div className="bg-gray-900 p-5 rounded-3xl text-white shadow-xl">
                                    <Folder size={28} />
                                </div>

                                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-300">
                                    Total
                                </span>
                            </div>

                            <h2 className="text-5xl lg:text-6xl font-rosica text-gray-900 leading-none">
                                {totalProjects}
                            </h2>

                            <p className="text-xs text-gray-400 mt-4 uppercase tracking-[0.2em] font-bold">
                                Portfolio Entries
                            </p>
                        </div>

                        {/* ONGOING */}
                        <div className="group border border-gray-100 p-8 rounded-[35px] bg-white hover:border-[#FCD34D]/30 hover:shadow-2xl transition-all duration-500">
                            <div className="flex items-center justify-between mb-8">
                                <div className="bg-[#FCD34D] p-5 rounded-3xl text-white shadow-xl">
                                    <Clock size={28} />
                                </div>

                                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-300">
                                    Ongoing
                                </span>
                            </div>

                            <h2 className="text-5xl lg:text-6xl font-rosica text-gray-900 leading-none">
                                {ongoingProjects}
                            </h2>

                            <p className="text-xs text-gray-400 mt-4 uppercase tracking-[0.2em] font-bold">
                                Active Projects
                            </p>
                        </div>

                        {/* COMPLETED */}
                        <div className="group border border-gray-100 p-8 rounded-[35px] bg-white hover:border-[#34D399]/30 hover:shadow-2xl transition-all duration-500">
                            <div className="flex items-center justify-between mb-8">
                                <div className="bg-[#34D399] p-5 rounded-3xl text-white shadow-xl">
                                    <CheckCircle2 size={28} />
                                </div>

                                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-300">
                                    Completed
                                </span>
                            </div>

                            <h2 className="text-5xl lg:text-6xl font-rosica text-gray-900 leading-none">
                                {completedProjects}
                            </h2>

                            <p className="text-xs text-gray-400 mt-4 uppercase tracking-[0.2em] font-bold">
                                Delivered Works
                            </p>
                        </div>

                        {/* FEATURED */}
                        <div className="group border border-gray-100 p-8 rounded-[35px] bg-white hover:border-[#E3C263]/30 hover:shadow-2xl transition-all duration-500">
                            <div className="flex items-center justify-between mb-8">
                                <div className="bg-[#E3C263] p-5 rounded-3xl text-white shadow-xl">
                                    <Star size={28} />
                                </div>

                                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-300">
                                    Featured
                                </span>
                            </div>

                            <h2 className="text-5xl lg:text-6xl font-rosica text-gray-900 leading-none">
                                {featuredProjects}
                            </h2>

                            <p className="text-xs text-gray-400 mt-4 uppercase tracking-[0.2em] font-bold">
                                Homepage Highlights
                            </p>
                        </div>
                    </div>

                    {/* SECONDARY STATS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-14 relative z-10">
                        {/* PUBLISHED */}
                        <div className="bg-[#FDFBF7] rounded-[30px] p-8 border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <Eye className="text-emerald-500" />

                                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-300">
                                    Published
                                </span>
                            </div>

                            <h3 className="text-4xl font-black text-gray-900">
                                {publishedProjects}
                            </h3>
                        </div>

                        {/* HIDDEN */}
                        <div className="bg-[#FDFBF7] rounded-[30px] p-8 border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <EyeOff className="text-red-400" />

                                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-300">
                                    Hidden
                                </span>
                            </div>

                            <h3 className="text-4xl font-black text-gray-900">
                                {hiddenProjects}
                            </h3>
                        </div>

                        {/* SERVICES */}
                        <div className="bg-[#FDFBF7] rounded-[30px] p-8 border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <Wrench className="text-indigo-500" />

                                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-300">
                                    Services
                                </span>
                            </div>

                            <h3 className="text-4xl font-black text-gray-900">
                                {totalServices}
                            </h3>
                        </div>

                        {/* TEAM */}
                        <div className="bg-[#FDFBF7] rounded-[30px] p-8 border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <Users className="text-[#E3C263]" />

                                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-300">
                                    Team
                                </span>
                            </div>

                            <h3 className="text-4xl font-black text-gray-900">
                                {totalTeam}
                            </h3>
                        </div>
                    </div>

                    {/* PROJECT STATUS BREAKDOWN */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-14 relative z-10">
                        <div className="xl:col-span-2 bg-[#FDFBF7] rounded-[35px] p-8 border border-gray-100">
                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h2 className="text-2xl font-rosica text-gray-900">
                                        Project Distribution
                                    </h2>

                                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-bold mt-2">
                                        Live status computation
                                    </p>
                                </div>

                                <TrendingUp className="text-[#E3C263]" />
                            </div>

                            <div className="space-y-8">
                                {[
                                    {
                                        label: 'Completed',
                                        value: completedProjects,
                                        color: 'bg-emerald-500',
                                    },
                                    {
                                        label: 'Ongoing',
                                        value: ongoingProjects,
                                        color: 'bg-amber-400',
                                    },
                                    {
                                        label: 'Planned',
                                        value: plannedProjects,
                                        color: 'bg-indigo-500',
                                    },
                                    {
                                        label: 'Paused',
                                        value: pausedProjects,
                                        color: 'bg-red-400',
                                    },
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="space-y-3"
                                    >
                                        <div className="flex justify-between text-sm font-semibold">
                                            <span className="text-gray-600">
                                                {item.label}
                                            </span>

                                            <span className="text-gray-900">
                                                {item.value}
                                            </span>
                                        </div>

                                        <div className="w-full h-3 bg-white rounded-full overflow-hidden shadow-inner">
                                            <div
                                                className={`${item.color} h-full rounded-full`}
                                                style={{
                                                    width: `${
                                                        totalProjects > 0
                                                            ? (item.value / totalProjects) * 100
                                                            : 0
                                                    }%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* QUICK OVERVIEW */}
                        <div className="bg-gray-900 rounded-[35px] p-8 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-52 h-52 bg-white/5 rounded-full blur-3xl"></div>

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-10">
                                    <h2 className="text-2xl font-rosica">
                                        System Overview
                                    </h2>

                                    <Activity className="text-[#E3C263]" />
                                </div>

                                <div className="space-y-8">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-black mb-3">
                                            Frontend Sync
                                        </p>

                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>

                                            <p className="font-semibold">
                                                Connected
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-black mb-3">
                                            Published Ratio
                                        </p>

                                        <p className="text-4xl font-black">
                                            {totalProjects > 0
                                                ? Math.round((publishedProjects / totalProjects) * 100)
                                                : 0}
                                            %
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-black mb-3">
                                            Portfolio Health
                                        </p>

                                        <p className="text-lg font-semibold text-emerald-400">
                                            Stable
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RECENT PROJECTS */}
                    <div className="bg-[#FDFBF7] rounded-[35px] p-8 border border-gray-100 relative z-10">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h2 className="text-3xl font-rosica text-gray-900">
                                    Recent Projects
                                </h2>

                                <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-bold mt-2">
                                    Latest frontend entries
                                </p>
                            </div>

                            <Layers3 className="text-[#E3C263]" />
                        </div>

                        <div className="space-y-5">
                            {recentProjects.length > 0 ? (
                                recentProjects.map(
                                    (project) => (
                                        <div
                                            key={project.id}
                                            className="bg-white rounded-[28px] p-6 border border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:shadow-xl transition-all"
                                        >
                                            <div className="flex items-center gap-5">
                                                <div className="w-20 h-20 rounded-[22px] overflow-hidden bg-gray-100 shrink-0">
                                                    <img
                                                        src={
                                                            project.image
                                                                ? project.image.startsWith('http')
                                                                    ? project.image
                                                                    : `/storage/${project.image}`
                                                                : '/images/projects/placeholder.jpg'
                                                        }
                                                        className="w-full h-full object-cover"
                                                        alt={project.title}
                                                    />
                                                </div>

                                                <div>
                                                    <h3 className="text-xl font-semibold text-gray-900">
                                                        {project.title}
                                                    </h3>

                                                    <div className="flex flex-wrap items-center gap-3 mt-2">
                                                        <span className="text-[10px] uppercase tracking-[0.2em] font-black text-[#E3C263]">
                                                            {project.category}
                                                        </span>

                                                        <span className="w-1 h-1 bg-gray-200 rounded-full"></span>

                                                        <span className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400">
                                                            {project.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                {project.featured && (
                                                    <div className="bg-[#E3C263]/10 text-[#E3C263] px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-black">
                                                        Featured
                                                    </div>
                                                )}

                                                {project.is_published ? (
                                                    <div className="bg-emerald-50 text-emerald-500 px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-black">
                                                        Published
                                                    </div>
                                                ) : (
                                                    <div className="bg-red-50 text-red-500 px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-black">
                                                        Hidden
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                )
                            ) : (
                                <div className="py-20 text-center">
                                    <FolderOpen
                                        size={52}
                                        className="mx-auto text-gray-200 mb-4"
                                    />

                                    <p className="text-2xl font-rosica text-gray-300">
                                        No Projects Yet
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}