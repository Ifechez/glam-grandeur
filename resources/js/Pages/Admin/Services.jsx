import React, { useState, useEffect } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    FolderOpen,
    Wrench,
    Users,
    Settings,
    LogOut,
    Plus,
    Eye,
    Edit3,
    Trash2,
    X,
    Clock,
    Layout,
    Home,
    PenTool,
    ClipboardCheck,
    Layers,
    Info,
    CheckCircle2,
    AlertCircle,
    Menu,
    Star,
    EyeOff,
    Upload,
    Image as ImageIcon,
    BadgeCheck,
} from 'lucide-react';

export default function Services({ services = [] }) {
    const { props } = usePage();
    const flash = props.flash || {};

    const [modalMode, setModalMode] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    /*
    |--------------------------------------------------------------------------
    | ICON SYSTEM
    |--------------------------------------------------------------------------
    */

    const iconOptions = [
        { name: 'Layout', icon: Layout },
        { name: 'Wrench', icon: Wrench },
        { name: 'Home', icon: Home },
        { name: 'PenTool', icon: PenTool },
        { name: 'ClipboardCheck', icon: ClipboardCheck },
        { name: 'Layers', icon: Layers },
    ];

    const iconMap = {
        Layout,
        Wrench,
        Home,
        PenTool,
        ClipboardCheck,
        Layers,
    };

    /*
    |--------------------------------------------------------------------------
    | CLOCK
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    /*
    |--------------------------------------------------------------------------
    | SUCCESS FLASH
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (flash?.success || flash?.message) {
            setSuccessMessage(
                flash.success || flash.message
            );

            const timer = setTimeout(() => {
                setSuccessMessage(null);
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [flash]);

    /*
    |--------------------------------------------------------------------------
    | FORM INITIALIZATION
    |--------------------------------------------------------------------------
    */

    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        title: '',
        description: '',
        short_description: '',
        icon_name: 'Layers',
        image: null,

        // FRONTEND CONNECTION
        featured: false,
        is_active: true,
        show_on_homepage: true,
        order: 0,

        _method: 'POST',
    });

    /*
    |--------------------------------------------------------------------------
    | OPEN MODAL
    |--------------------------------------------------------------------------
    */

    const openModal = (mode, service = null) => {
        clearErrors();
        setModalMode(mode);

        if (service) {
            setSelectedService(service);

            setData({
                title: service.title || '',
                description:
                    service.description || '',
                short_description:
                    service.short_description || '',
                icon_name:
                    service.icon_name || 'Layers',
                image: null,

                // FRONTEND DATA
                featured:
                    Boolean(service.featured),
                is_active:
                    service.is_active !== false,
                show_on_homepage:
                    service.show_on_homepage !== false,
                order: service.order || 0,

                _method: 'PATCH',
            });

            if (service.image_path) {
                setImagePreview(
                    service.image_path.startsWith(
                        'http'
                    )
                        ? service.image_path
                        : `/storage/${service.image_path}`
                );
            }
        } else {
            reset();

            setData({
                title: '',
                description: '',
                short_description: '',
                icon_name: 'Layers',
                image: null,
                featured: false,
                is_active: true,
                show_on_homepage: true,
                order: 0,
                _method: 'POST',
            });

            setImagePreview(null);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | CLOSE MODAL
    |--------------------------------------------------------------------------
    */

    const closeModal = () => {
        setModalMode(null);
        setSelectedService(null);
        setImagePreview(null);
        reset();
    };

    /*
    |--------------------------------------------------------------------------
    | IMAGE PREVIEW
    |--------------------------------------------------------------------------
    */

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

    /*
    |--------------------------------------------------------------------------
    | SUBMIT HANDLER
    |--------------------------------------------------------------------------
    */

    const submit = (e) => {
        e.preventDefault();

        // When creating, perform a straight POST.
        // When updating with multi-part files, use a POST route but tell Laravel via _method it's a PATCH.
        const url =
            modalMode === 'create'
                ? route('admin.services.store')
                : route(
                      'admin.services.update',
                      selectedService.id
                  );

        post(url, {
            forceFormData: true,
            preserveScroll: true,

            onSuccess: () => {
                closeModal();

                setSuccessMessage(
                    modalMode === 'create'
                        ? 'Service created successfully'
                        : 'Service updated successfully'
                );
            },
        });
    };

    return (
        <div className="flex min-h-screen bg-[#FDFBF7] font-sans text-gray-900">
            <Head title="Service Management | Glam Grandeur" />

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
                        className="h-12"
                        alt="Glam Grandeur"
                    />

                    <button
                        onClick={() =>
                            setSidebarOpen(false)
                        }
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
                        href={route(
                            'admin.projects.index'
                        )}
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
                        href={route(
                            'admin.services.index'
                        )}
                        className="flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-bold bg-[#E3C263] text-white shadow-xl shadow-[#E3C263]/20"
                    >
                        <Wrench size={20} />

                        <span className="tracking-widest uppercase text-[10px]">
                            Services
                        </span>
                    </Link>

                    <Link
                        href={route('admin.team.index')}
                        className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-sm transition-all ${
                            route().current(
                                'admin.team.index'
                            )
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
                        href={route(
                            'admin.settings.index'
                        )}
                        className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-sm transition-all border-t border-gray-50 pt-8 ${
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
                        <LogOut size={20} />

                        <span className="uppercase tracking-widest text-[10px]">
                            Logout
                        </span>
                    </Link>
                </div>
            </aside>

            {/* MAIN COMPONENT FRAME */}
            <main className="flex-1 lg:ml-72 p-4 lg:p-16">
                <div className="bg-white rounded-[50px] p-8 lg:p-16 shadow-[0_20px_80px_rgba(0,0,0,0.03)] border border-gray-50/50 min-h-[85vh] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#E3C263]/5 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none"></div>

                    {/* HEADER */}
                    <header className="flex justify-between items-start mb-16 relative z-10">
                        <div>
                            <button
                                onClick={() =>
                                    setSidebarOpen(true)
                                }
                                className="lg:hidden mb-4 p-3 bg-gray-50 rounded-xl text-[#E3C263]"
                            >
                                <Menu size={24} />
                            </button>

                            <h1 className="text-4xl lg:text-5xl font-rosica text-gray-800 tracking-tight">
                                Services
                            </h1>

                            <div className="flex items-center gap-3 text-gray-400 text-[11px] mt-3 font-bold uppercase tracking-[0.2em]">
                                <Clock
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
                    </header>

                   {/* ACTION */}
                    <div className="flex justify-between items-center mb-12">
                        <div className="text-[11px] font-black uppercase tracking-[0.25em] border-b border-gray-100 pb-5">
                            Live Service Content
                        </div>

                        <button
                            onClick={() =>
                                openModal('create')
                            }
                            className="bg-[#E3C263] text-white px-10 py-5 rounded-xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-[#E3C263]/30"
                        >
                            <Plus size={18} />

                            <span className="text-[11px] font-black tracking-[0.2em] uppercase">
                                Add Service
                            </span>
                        </button>
                    </div>

                    {/* SERVICES */}
                    <div className="space-y-6 relative z-10">
                        {services.length > 0 ? (
                            services.map((service) => {
                                const ListIcon =
                                    iconMap[
                                        service.icon_name
                                    ] || Layers;

                                return (
                                    <div
                                        key={service.id}
                                        className="group bg-white border border-gray-100 rounded-[35px] p-8 flex flex-col xl:flex-row xl:items-center justify-between gap-8 hover:shadow-[0_30px_100px_rgba(227,194,99,0.12)] transition-all duration-500"
                                    >
                                        <div className="flex items-center gap-8 max-w-4xl">
                                            {/* IMAGE */}
                                            <div className="w-28 h-28 rounded-[28px] overflow-hidden bg-gray-100 shrink-0 relative">
                                                {service.image_path ? (
                                                    <img
                                                        src={
                                                            service.image_path.startsWith(
                                                                'http'
                                                            )
                                                                ? service.image_path
                                                                : `/storage/${service.image_path}`
                                                        }
                                                        className="w-full h-full object-cover"
                                                        alt={
                                                            service.title
                                                        }
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-[#E3C263] bg-[#FDFBF7]">
                                                        <ListIcon
                                                            size={
                                                                38
                                                            }
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            {/* CONTENT */}
                                            <div>
                                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                                    {service.featured && (
                                                        <div className="bg-[#E3C263]/10 text-[#E3C263] px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-black">
                                                            Featured
                                                        </div>
                                                    )}

                                                    {service.show_on_homepage && (
                                                        <div className="bg-emerald-50 text-emerald-500 px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-black">
                                                            Homepage
                                                        </div>
                                                    )}

                                                    {service.is_active ? (
                                                        <div className="bg-indigo-50 text-indigo-500 px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-black">
                                                            Active
                                                        </div>
                                                    ) : (
                                                        <div className="bg-red-50 text-red-500 px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-black">
                                                            Hidden
                                                        </div>
                                                    )}
                                                </div>

                                                <h3 className="text-3xl font-rosica text-gray-800 mb-3 group-hover:text-[#E3C263] transition-colors">
                                                    {
                                                        service.title
                                                    }
                                                </h3>

                                                <p className="text-gray-500 font-light italic leading-relaxed">
                                                    {service.short_description ||
                                                        service.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* ACTIONS */}
                                        <div className="flex gap-4 opacity-100 xl:opacity-40 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() =>
                                                    openModal(
                                                        'view',
                                                        service
                                                    )
                                                }
                                                className="p-4 text-indigo-400 hover:bg-indigo-50 rounded-2xl transition-all"
                                            >
                                                <Eye
                                                    size={22}
                                                />
                                            </button>

                                            <button
                                                onClick={() =>
                                                    openModal(
                                                        'edit',
                                                        service
                                                    )
                                                }
                                                className="p-4 text-amber-400 hover:bg-amber-50 rounded-2xl transition-all"
                                            >
                                                <Edit3
                                                    size={22}
                                                />
                                            </button>

                                            <button
                                                onClick={() => {
                                                    if (
                                                        confirm(
                                                            'Delete this service permanently?'
                                                        )
                                                    ) {
                                                        destroy(
                                                            route(
                                                                'admin.services.destroy',
                                                                service.id
                                                            ),
                                                            {
                                                                preserveScroll:
                                                                    true,

                                                                onSuccess:
                                                                    () => {
                                                                        setSuccessMessage(
                                                                            'Service deleted successfully'
                                                                        );
                                                                    },
                                                            }
                                                        );
                                                    }
                                                }}
                                                className="p-4 text-red-400 hover:bg-red-50 rounded-2xl transition-all"
                                            >
                                                <Trash2
                                                    size={22}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="flex flex-col items-center justify-center py-32 bg-[#FDFBF7] rounded-[40px] border-2 border-dashed border-gray-100 text-center">
                                <AlertCircle
                                    size={48}
                                    className="text-gray-200 mb-4"
                                />

                                <p className="font-rosica text-2xl text-gray-300 italic uppercase tracking-widest">
                                    No Services Added
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* SUCCESS TOAST */}
            {successMessage && (
                <div className="fixed top-8 right-8 z-[300]">
                    <div className="bg-emerald-500 text-white px-8 py-5 rounded-[24px] shadow-[0_20px_60px_rgba(16,185,129,0.35)] flex items-center gap-4 min-w-[320px]">
                        <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
                            <CheckCircle2
                                size={24}
                            />
                        </div>

                        <div className="flex-1">
                            <p className="text-[10px] uppercase tracking-[0.3em] font-black text-emerald-100">
                                Success
                            </p>

                            <p className="text-sm font-semibold mt-1">
                                {successMessage}
                            </p>
                        </div>

                        <button
                            onClick={() =>
                                setSuccessMessage(null)
                            }
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>
            )}

            {/* MODAL */}
            {modalMode && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[100] flex items-center justify-center p-4 lg:p-8">
                    <div className="bg-white rounded-[55px] w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative border border-white/20">
                        <button
                            onClick={closeModal}
                            className="absolute top-6 right-6 lg:top-10 lg:right-10 z-50 p-2 bg-black text-white rounded-lg hover:scale-110 transition-all"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex-1 overflow-y-auto p-8 lg:p-16">
                            {modalMode === 'view' ? (
                                <div className="space-y-10">
                                    <div className="flex items-center gap-4 text-[#E3C263] uppercase tracking-widest text-[10px] font-bold">
                                        <Info size={14} />

                                        Service Details
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                        {/* IMAGE */}
                                        <div className="rounded-[40px] overflow-hidden bg-[#FDFBF7] aspect-square border border-gray-100">
                                            {selectedService?.image_path ? (
                                                <img
                                                    src={
                                                        selectedService.image_path.startsWith(
                                                            'http'
                                                        )
                                                            ? selectedService.image_path
                                                            : `/storage/${selectedService.image_path}`
                                                    }
                                                    className="w-full h-full object-cover"
                                                    alt={
                                                        selectedService.title
                                                    }
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[#E3C263]">
                                                    {React.createElement(
                                                        iconMap[
                                                            selectedService?.icon_name
                                                        ] ||
                                                            Layers,
                                                        {
                                                            size: 70,
                                                        }
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* CONTENT */}
                                        <div className="space-y-8">
                                            <div>
                                                <h2 className="text-4xl lg:text-5xl font-rosica text-gray-900 mb-4">
                                                    {
                                                        selectedService?.title
                                                    }
                                                </h2>

                                                <p className="text-gray-500 italic leading-relaxed text-lg">
                                                    {
                                                        selectedService?.description
                                                    }
                                                </p>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex items-center gap-4">
                                                    <BadgeCheck
                                                        className="text-[#E3C263]"
                                                        size={
                                                            18
                                                        }
                                                    />

                                                    <span className="text-sm font-semibold">
                                                        Homepage
                                                        Visibility:{' '}
                                                        {selectedService?.show_on_homepage
                                                            ? 'Enabled'
                                                            : 'Disabled'}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    <Star
                                                        className="text-[#E3C263]"
                                                        size={
                                                            18
                                                        }
                                                    />

                                                    <span className="text-sm font-semibold">
                                                        Featured:{' '}
                                                        {selectedService?.featured
                                                            ? 'Yes'
                                                            : 'No'}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    <EyeOff
                                                        className="text-[#E3C263]"
                                                        size={
                                                            18
                                                        }
                                                    />

                                                    <span className="text-sm font-semibold">
                                                        Status:{' '}
                                                        {selectedService?.is_active
                                                            ? 'Active'
                                                            : 'Hidden'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <form
                                    onSubmit={submit}
                                    className="space-y-10"
                                >
                                    <header>
                                        <h2 className="text-4xl lg:text-5xl font-rosica text-gray-900">
                                            {modalMode ===
                                            'create'
                                                ? 'New Service'
                                                : 'Edit Service'}
                                        </h2>

                                        <p className="text-gray-400 text-sm mt-3 italic font-medium uppercase tracking-widest">
                                            Frontend
                                            Service Entry
                                        </p>
                                    </header>

                                    {/* ICONS */}
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">
                                            Identity Icon
                                        </label>

                                        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 p-4 bg-[#FDFBF7] rounded-3xl border border-gray-100">
                                            {iconOptions.map(
                                                (item) => (
                                                    <button
                                                        key={
                                                            item.name
                                                        }
                                                        type="button"
                                                        onClick={() =>
                                                            setData(
                                                                'icon_name',
                                                                item.name
                                                            )
                                                        }
                                                        className={`flex flex-col items-center justify-center p-5 rounded-2xl transition-all ${
                                                            data.icon_name ===
                                                            item.name
                                                                ? 'bg-white shadow-xl border-2 border-[#E3C263] scale-105'
                                                                : 'border-2 border-transparent opacity-50 hover:opacity-100'
                                                        }`}
                                                    >
                                                        <item.icon
                                                            size={
                                                                24
                                                            }
                                                            className={
                                                                data.icon_name ===
                                                                item.name
                                                                    ? 'text-[#E3C263]'
                                                                    : 'text-gray-400'
                                                            }
                                                        />

                                                        <span className="text-[8px] mt-2 font-bold uppercase tracking-widest">
                                                            {
                                                                item.name
                                                            }
                                                        </span>
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    {/* TITLE */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">
                                            Service Title
                                        </label>

                                        <input
                                            value={
                                                data.title
                                            }
                                            onChange={(
                                                e
                                            ) =>
                                                setData(
                                                    'title',
                                                    e
                                                        .target
                                                        .value
                                                )
                                            }
                                            className="w-full bg-[#FDFBF7] rounded-2xl p-6 text-sm border-none shadow-inner"
                                            placeholder="Luxury Interior Design"
                                        />

                                        {errors.title && (
                                            <p className="text-red-500 text-[10px] uppercase font-bold">
                                                {
                                                    errors.title
                                                }
                                            </p>
                                        )}
                                    </div>

                                    {/* SHORT */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">
                                            Frontend Hook
                                        </label>

                                        <input
                                            value={
                                                data.short_description
                                            }
                                            onChange={(
                                                e
                                            ) =>
                                                setData(
                                                    'short_description',
                                                    e
                                                        .target
                                                        .value
                                                )
                                            }
                                            className="w-full bg-[#FDFBF7] rounded-2xl p-6 text-sm border-none shadow-inner"
                                            placeholder="Elegant solutions for luxury spaces"
                                        />
                                    </div>

                                    {/* DESCRIPTION */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">
                                            Full Description
                                        </label>

                                        <textarea
                                            rows="5"
                                            value={
                                                data.description
                                            }
                                            onChange={(
                                                e
                                            ) =>
                                                setData(
                                                    'description',
                                                    e
                                                        .target
                                                        .value
                                                )
                                            }
                                            className="w-full bg-[#FDFBF7] rounded-[35px] p-8 text-sm leading-relaxed italic border-none shadow-inner"
                                            placeholder="Describe the luxury experience..."
                                        />
                                    </div>

                                    {/* IMAGE */}
                                    <div className="space-y-4">
                                        <label className="block text-[11px] uppercase font-black tracking-[0.3em] text-[#E3C263]">
                                            Service Banner
                                        </label>

                                        <div className="w-full aspect-video rounded-[35px] bg-[#FDFBF7] border-2 border-dashed border-gray-200 overflow-hidden relative group hover:border-[#E3C263] transition-all shadow-inner">
                                            {imagePreview ? (
                                                <img
                                                    src={
                                                        imagePreview
                                                    }
                                                    className="w-full h-full object-cover"
                                                    alt="Preview"
                                                />
                                            ) : (
                                                <div className="flex flex-col items-center justify-center h-full text-gray-300">
                                                    <ImageIcon
                                                        size={
                                                            48
                                                        }
                                                    />

                                                    <p className="text-[10px] mt-3 font-bold uppercase tracking-widest">
                                                        Upload
                                                        Cover
                                                    </p>
                                                </div>
                                            )}

                                            <input
                                                type="file"
                                                onChange={
                                                    handleImageChange
                                                }
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                accept="image/*"
                                            />
                                        </div>
                                    </div>

                                    {/* FRONTEND OPTIONS */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <label className="flex items-center gap-4 bg-[#FDFBF7] rounded-2xl p-6 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    data.featured
                                                }
                                                onChange={(
                                                    e
                                                ) =>
                                                    setData(
                                                        'featured',
                                                        e
                                                            .target
                                                            .checked
                                                    )
                                                }
                                                className="w-5 h-5 accent-[#E3C263]"
                                            />

                                            <span className="text-sm font-semibold">
                                                Featured
                                                Service
                                            </span>
                                        </label>

                                        <label className="flex items-center gap-4 bg-[#FDFBF7] rounded-2xl p-6 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    data.show_on_homepage
                                                }
                                                onChange={(
                                                    e
                                                ) =>
                                                    setData(
                                                        'show_on_homepage',
                                                        e
                                                            .target
                                                            .checked
                                                    )
                                                }
                                                className="w-5 h-5 accent-[#E3C263]"
                                            />

                                            <span className="text-sm font-semibold">
                                                Show On
                                                Homepage
                                            </span>
                                        </label>

                                        <label className="flex items-center gap-4 bg-[#FDFBF7] rounded-2xl p-6 cursor-pointer md:col-span-2">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    data.is_active
                                                }
                                                onChange={(
                                                    e
                                                ) =>
                                                    setData(
                                                        'is_active',
                                                        e
                                                            .target
                                                            .checked
                                                    )
                                                }
                                                className="w-5 h-5 accent-[#E3C263]"
                                            />

                                            <span className="text-sm font-semibold">
                                                Active
                                                Service
                                            </span>
                                        </label>
                                    </div>

                                    {/* BUTTONS */}
                                    <div className="flex gap-6 pt-8">
                                        <button
                                            type="submit"
                                            disabled={
                                                processing
                                            }
                                            className="flex-1 bg-[#E3C263] text-white py-6 rounded-2xl font-black text-[12px] uppercase tracking-[0.4em] shadow-2xl hover:scale-105 transition-all disabled:opacity-50"
                                        >
                                            {modalMode ===
                                            'create'
                                                ? '+ Create Service'
                                                : '✓ Save Changes'}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={
                                                closeModal
                                            }
                                            className="px-12 py-6 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] text-gray-400 hover:text-gray-900 transition-all"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}