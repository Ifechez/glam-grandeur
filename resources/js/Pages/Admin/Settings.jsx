import React, { useEffect, useState } from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import {
    LayoutDashboard,
    FolderOpen,
    Wrench,
    Users,
    Settings as SettingsIcon,
    LogOut,
    Clock,
    CheckCircle2,
    AlertCircle,
} from 'lucide-react';

export default function Settings({ auth, settings }) {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        recentlySuccessful,
    } = useForm({
        email: settings?.email || '',
        phone_1: settings?.phone_1 || '',
        phone_2: settings?.phone_2 || '',
        address: settings?.address || '',
        instagram_handle: settings?.instagram_handle || '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('admin.settings.update'), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <div className="flex min-h-screen bg-[#FDFBF7] font-sans text-gray-900">
            <Head title="Settings | Glam Grandeur Admin" />

            {/* SIDEBAR */}
            <aside className="w-72 bg-white border-r border-gray-100 flex flex-col p-8 fixed h-full z-20">
                <div className="mb-16">
                    <img
                        src="/images/logos/logo.png"
                        className="h-12 mx-auto"
                        alt="Logo"
                    />
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
                        <span className="font-medium tracking-wide">
                            Dashboard
                        </span>
                    </Link>

                    <Link
                        href={route('admin.projects.index')}
                        className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-sm transition-all ${
                            route().current('admin.projects.index')
                                ? 'bg-[#E3C263] text-white shadow-xl shadow-[#E3C263]/20'
                                : 'text-gray-400 hover:text-[#E3C263]'
                        }`}
                    >
                        <FolderOpen size={20} />
                        <span className="font-medium tracking-wide">
                            Projects
                        </span>
                    </Link>

                    <Link
                        href={route('admin.services.index')}
                        className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-sm transition-all ${
                            route().current('admin.services.index')
                                ? 'bg-[#E3C263] text-white shadow-xl shadow-[#E3C263]/20'
                                : 'text-gray-400 hover:text-[#E3C263]'
                        }`}
                    >
                        <Wrench size={20} />
                        <span className="font-medium tracking-wide">
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
                        <span className="font-medium tracking-wide">
                            Team
                        </span>
                    </Link>

                    <Link
                        href={route('admin.settings.index')}
                        className="flex items-center gap-4 bg-[#E3C263] text-white px-6 py-4 rounded-xl text-sm shadow-xl shadow-[#E3C263]/20"
                    >
                        <SettingsIcon size={20} />
                        <span className="font-bold tracking-wide">
                            Settings
                        </span>
                    </Link>
                </nav>

                <Link
                    method="post"
                    as="button"
                    href={route('logout')}
                    className="flex items-center gap-4 text-red-400 hover:bg-red-50 px-6 py-4 rounded-2xl text-sm mt-auto transition-all"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </Link>
            </aside>

            {/* MAIN */}
            <main className="flex-1 ml-72 p-16">
                <div className="bg-white rounded-[50px] p-16 shadow-[0_20px_80px_rgba(0,0,0,0.03)] border border-gray-50/50 min-h-[85vh] relative overflow-hidden">
                    {/* Glow */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#E3C263]/5 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none"></div>

                    {/* HEADER */}
                    <header className="flex justify-between items-start mb-14 relative z-10">
                        <div>
                            <h1 className="text-5xl font-rosica text-gray-800 tracking-tight">
                                Settings
                            </h1>

                            <div className="flex items-center gap-3 text-gray-400 text-[11px] mt-3 font-bold uppercase tracking-[0.2em]">
                                <Clock
                                    size={12}
                                    className="text-[#E3C263]"
                                />

                                <span>
                                    {currentTime.toLocaleTimeString()} •{' '}
                                    {currentTime.toLocaleDateString('en-GB', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </span>
                            </div>
                        </div>

                        <div className="text-[10px] uppercase tracking-[0.4em] text-[#E3C263] font-black border-b-2 border-[#E3C263]/10 pb-2">
                            Frontend Synchronization
                        </div>
                    </header>

                    {/* FORM */}
                    <div className="max-w-5xl relative z-10">
                        <form
                            onSubmit={submit}
                            className="space-y-8"
                        >
                            {/* EMAIL */}
                            <div className="space-y-3">
                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-400 ml-4">
                                    Contact Email
                                </label>

                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    className="w-full bg-[#FDFBF7] border-none rounded-2xl p-6 text-sm shadow-inner focus:ring-2 focus:ring-[#E3C263]/20"
                                    placeholder="grandeurglam2022@gmail.com"
                                />

                                {errors.email && (
                                    <div className="flex items-center gap-2 text-red-500 text-xs ml-4">
                                        <AlertCircle size={14} />
                                        {errors.email}
                                    </div>
                                )}
                            </div>

                            {/* PHONES */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-400 ml-4">
                                        Primary Phone
                                    </label>

                                    <input
                                        type="text"
                                        value={data.phone_1}
                                        onChange={(e) =>
                                            setData(
                                                'phone_1',
                                                e.target.value
                                            )
                                        }
                                        className="w-full bg-[#FDFBF7] border-none rounded-2xl p-6 text-sm shadow-inner focus:ring-2 focus:ring-[#E3C263]/20"
                                    />

                                    {errors.phone_1 && (
                                        <div className="flex items-center gap-2 text-red-500 text-xs ml-4">
                                            <AlertCircle size={14} />
                                            {errors.phone_1}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-400 ml-4">
                                        Secondary Phone
                                    </label>

                                    <input
                                        type="text"
                                        value={data.phone_2}
                                        onChange={(e) =>
                                            setData(
                                                'phone_2',
                                                e.target.value
                                            )
                                        }
                                        className="w-full bg-[#FDFBF7] border-none rounded-2xl p-6 text-sm shadow-inner focus:ring-2 focus:ring-[#E3C263]/20"
                                    />
                                </div>
                            </div>

                            {/* ADDRESS */}
                            <div className="space-y-3">
                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-400 ml-4">
                                    Office Address
                                </label>

                                <input
                                    type="text"
                                    value={data.address}
                                    onChange={(e) =>
                                        setData('address', e.target.value)
                                    }
                                    className="w-full bg-[#FDFBF7] border-none rounded-2xl p-6 text-sm shadow-inner focus:ring-2 focus:ring-[#E3C263]/20"
                                />
                            </div>

                            {/* INSTAGRAM */}
                            <div className="space-y-3">
                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-400 ml-4">
                                    Instagram Handle
                                </label>

                                <input
                                    type="text"
                                    value={data.instagram_handle}
                                    onChange={(e) =>
                                        setData(
                                            'instagram_handle',
                                            e.target.value
                                        )
                                    }
                                    className="w-full bg-[#FDFBF7] border-none rounded-2xl p-6 text-sm shadow-inner focus:ring-2 focus:ring-[#E3C263]/20"
                                    placeholder="@glamgrandeur"
                                />
                            </div>

                            {/* SAVE BUTTON */}
                            <div className="pt-10 flex items-center gap-6">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-[#E3C263] text-white px-12 py-5 rounded-2xl flex items-center gap-3 text-[11px] font-black tracking-[0.25em] uppercase shadow-2xl shadow-[#E3C263]/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                                >
                                    {processing
                                        ? 'Saving...'
                                        : '+ Save Settings'}
                                </button>

                                {recentlySuccessful && (
                                    <div className="flex items-center gap-2 text-emerald-500 text-sm font-semibold animate-pulse">
                                        <CheckCircle2 size={18} />
                                        Settings updated successfully
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}