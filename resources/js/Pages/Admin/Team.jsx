import React, { useEffect, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    LayoutDashboard,
    FolderOpen,
    Wrench,
    Users,
    Settings as SettingsIcon,
    LogOut,
    Plus,
    Edit3,
    Trash2,
    X,
    Clock,
    CheckCircle2,
    AlertCircle,
    Upload,
    Image as ImageIcon,
} from 'lucide-react';

export default function Team({ auth, team = [] }) {
    const [modalMode, setModalMode] = useState(null);
    const [selectedMember, setSelectedMember] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [successMessage, setSuccessMessage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

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
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        name: '',
        position: '',
        bio: '',
        image: null,
        _method: 'POST',
    });

    const openModal = (mode, member = null) => {
        clearErrors();
        setModalMode(mode);

        if (member) {
            setSelectedMember(member);

            setData({
                name: member.name || '',
                position: member.position || '',
                bio: member.bio || '',
                image: null,
                _method: 'PATCH',
            });

            if (member.image) {
                setImagePreview(`/storage/${member.image}`);
            }
        } else {
            reset();
            setImagePreview(null);

            setData({
                name: '',
                position: '',
                bio: '',
                image: null,
                _method: 'POST',
            });
        }
    };

    const closeModal = () => {
        setModalMode(null);
        setSelectedMember(null);
        setImagePreview(null);
        reset();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        setData('image', file);

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setImagePreview(reader.result);
            };

            reader.readAsDataURL(file);
        }
    };

    const submit = (e) => {
        e.preventDefault();

        const url =
            modalMode === 'create'
                ? route('admin.team.store')
                : route('admin.team.update', selectedMember.id);

        // Submitting with post() ensures multipart/form-data works with file uploads
        // The embedded data._method ('PATCH') manages the Laravel route handling spoofing
        post(url, {
            data: data,
            forceFormData: true,
            preserveScroll: true,

            onSuccess: () => {
                closeModal();

                setSuccessMessage(
                    modalMode === 'create'
                        ? 'Team member added successfully'
                        : 'Team member updated successfully'
                );

                setTimeout(() => {
                    setSuccessMessage(null);
                }, 4000);
            },
        });
    };

    return (
        <div className="flex min-h-screen bg-[#FDFBF7] font-sans text-gray-900">
            <Head title="Team Management | Glam Grandeur Admin" />

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
                        className="flex items-center gap-4 bg-[#E3C263] text-white px-6 py-4 rounded-xl text-sm shadow-xl shadow-[#E3C263]/20"
                    >
                        <Users size={20} />
                        <span className="font-bold tracking-wide">
                            Team
                        </span>
                    </Link>

                    <Link
                        href={route('admin.settings.index')}
                        className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-sm transition-all ${
                            route().current('admin.settings.index')
                                ? 'bg-[#E3C263] text-white shadow-xl shadow-[#E3C263]/20'
                                : 'text-gray-400 hover:text-[#E3C263]'
                        }`}
                    >
                        <SettingsIcon size={20} />
                        <span className="font-medium tracking-wide">
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
                                Team
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

                        <button
                            onClick={() => openModal('create')}
                            className="bg-[#E3C263] text-white px-10 py-5 rounded-2xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-[#E3C263]/20"
                        >
                            <Plus size={18} />

                            <span className="text-[11px] uppercase tracking-[0.3em] font-black">
                                Add Member
                            </span>
                        </button>
                    </header>

                    {/* TEAM LIST */}
                    <div className="space-y-8 relative z-10">
                        {team.length > 0 ? (
                            team.map((member) => (
                                <div
                                    key={member.id}
                                    className="group bg-white border border-gray-100 rounded-[35px] p-8 flex items-center justify-between hover:shadow-[0_30px_100px_rgba(227,194,99,0.1)] transition-all duration-500"
                                >
                                    <div className="flex items-center gap-8">
                                        <div className="relative">
                                            <img
                                                src={
                                                    member.image
                                                        ? `/storage/${member.image}`
                                                        : '/images/ceo.jpg'
                                                }
                                                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-xl"
                                                alt={member.name}
                                                onError={(e) => {
                                                    e.target.src =
                                                        '/images/ceo.jpg';
                                                }}
                                            />

                                            <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 rounded-full border-4 border-white"></div>
                                        </div>

                                        <div>
                                            <h3 className="text-3xl font-rosica text-gray-800">
                                                {member.name}
                                            </h3>

                                            <p className="text-[10px] uppercase tracking-[0.3em] text-[#E3C263] font-black mt-2">
                                                {member.position}
                                            </p>

                                            <p className="text-gray-400 italic mt-4 max-w-2xl leading-relaxed">
                                                {member.bio}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            onClick={() =>
                                                openModal('edit', member)
                                            }
                                            className="p-4 text-indigo-500 hover:bg-indigo-50 rounded-2xl transition-all"
                                        >
                                            <Edit3 size={22} />
                                        </button>

                                        <button
                                            onClick={() => {
                                                if (
                                                    confirm(
                                                        'Delete this team member permanently?'
                                                    )
                                                ) {
                                                    destroy(
                                                        route(
                                                            'admin.team.destroy',
                                                            member.id
                                                        ),
                                                        {
                                                            preserveScroll:
                                                                true,

                                                            onSuccess: () => {
                                                                setSuccessMessage(
                                                                    'Team member removed successfully'
                                                                );

                                                                setTimeout(
                                                                    () => {
                                                                        setSuccessMessage(
                                                                            null
                                                                        );
                                                                    },
                                                                    4000
                                                                );
                                                            },
                                                        }
                                                    );
                                                }
                                            }}
                                            className="p-4 text-red-400 hover:bg-red-50 rounded-2xl transition-all"
                                        >
                                            <Trash2 size={22} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-28 border-2 border-dashed border-gray-100 rounded-[40px] bg-[#FDFBF7]">
                                <Users
                                    size={50}
                                    className="text-gray-200 mb-4"
                                />

                                <p className="text-gray-300 uppercase tracking-[0.3em] text-xs font-bold">
                                    No Team Members Yet
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* SUCCESS TOAST */}
            {successMessage && (
                <div className="fixed top-8 right-8 z-[300]">
                    <div className="bg-emerald-500 text-white px-8 py-5 rounded-[24px] shadow-2xl flex items-center gap-4 min-w-[320px]">
                        <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
                            <CheckCircle2 size={22} />
                        </div>

                        <div className="flex-1">
                            <p className="text-[10px] uppercase tracking-[0.3em] font-black">
                                Success
                            </p>

                            <p className="text-sm font-semibold mt-1">
                                {successMessage}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL */}
            {modalMode && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[100] flex items-center justify-center p-6">
                    <form
                        onSubmit={submit}
                        className="bg-white rounded-[50px] w-full max-w-5xl p-10 lg:p-16 shadow-2xl relative border border-white/20 overflow-y-auto max-h-[92vh]"
                    >
                        <button
                            type="button"
                            onClick={closeModal}
                            className="absolute top-8 right-8 text-gray-400 hover:text-black transition-all"
                        >
                            <X size={28} />
                        </button>

                        <h2 className="text-5xl font-rosica text-gray-900 mb-12">
                            {modalMode === 'create'
                                ? 'New Team Member'
                                : 'Edit Team Member'}
                        </h2>

                        <div className="space-y-10">
                            {/* NAME + POSITION */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-400 ml-2">
                                        Full Name
                                    </label>

                                    <input
                                        value={data.name}
                                        onChange={(e) =>
                                            setData(
                                                'name',
                                                e.target.value
                                            )
                                        }
                                        placeholder="Jane Doe"
                                        className="w-full bg-[#FDFBF7] rounded-2xl p-6 border-none shadow-inner"
                                    />

                                    {errors.name && (
                                        <div className="flex items-center gap-2 text-red-500 text-xs ml-2">
                                            <AlertCircle size={14} />
                                            {errors.name}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-400 ml-2">
                                        Position
                                    </label>

                                    <input
                                        value={data.position}
                                        onChange={(e) =>
                                            setData(
                                                'position',
                                                e.target.value
                                            )
                                        }
                                        placeholder="Lead Architect"
                                        className="w-full bg-[#FDFBF7] rounded-2xl p-6 border-none shadow-inner"
                                    />
                                </div>
                            </div>

                            {/* BIO */}
                            <div className="space-y-3">
                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-400 ml-2">
                                    Biography
                                </label>

                                <textarea
                                    value={data.bio}
                                    onChange={(e) =>
                                        setData('bio', e.target.value)
                                    }
                                    rows="6"
                                    placeholder="Professional summary..."
                                    className="w-full bg-[#FDFBF7] rounded-[30px] p-8 border-none shadow-inner resize-none"
                                />
                            </div>

                            {/* IMAGE */}
                            <div className="bg-[#FDFBF7] p-8 rounded-[35px] border border-gray-100">
                                <label className="block text-[10px] uppercase tracking-[0.3em] font-black text-[#E3C263] mb-5">
                                    Profile Image
                                </label>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                                    <div className="aspect-square rounded-[30px] overflow-hidden bg-white border-2 border-dashed border-gray-200 shadow-inner">
                                        {imagePreview ? (
                                            <img
                                                src={imagePreview}
                                                className="w-full h-full object-cover"
                                                alt="Preview"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                                                <ImageIcon
                                                    size={50}
                                                />

                                                <p className="text-[10px] uppercase tracking-[0.3em] font-bold mt-3">
                                                    Preview
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <label className="cursor-pointer bg-white border border-dashed border-gray-200 rounded-[30px] p-12 text-center hover:border-[#E3C263] transition-all">
                                        <Upload
                                            size={40}
                                            className="mx-auto text-gray-300 mb-4"
                                        />

                                        <p className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-500">
                                            Upload Portrait
                                        </p>

                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* BUTTONS */}
                            <div className="flex gap-6 pt-6">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-[#E3C263] text-white px-12 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] shadow-2xl hover:scale-105 transition-all disabled:opacity-50"
                                >
                                    {processing
                                        ? 'Processing...'
                                        : modalMode === 'create'
                                        ? '+ Add Member'
                                        : '+ Save Changes'}
                                </button>

                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="border border-gray-200 px-12 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] text-gray-400 hover:bg-gray-50 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}