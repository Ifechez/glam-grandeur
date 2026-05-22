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
    Upload,
    Image as ImageIcon,
    Eye,
    FileText,
    Layers,
    Calendar,
    Activity,
    CheckCircle2,
} from 'lucide-react';

export default function Projects({ auth, projects = [] }) {
    const [activeTab, setActiveTab] = useState('completed');
    const [modalMode, setModalMode] = useState(null); // create | edit | view
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [successMessage, setSuccessMessage] = useState(null);

    // Main image preview
    const [imagePreview, setImagePreview] = useState(null);

    // Gallery previews (existing + new)
    const [galleryPreviews, setGalleryPreviews] = useState([]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const filteredProjects = projects.filter(
        (project) => project.status?.toLowerCase() === activeTab
    );

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
        title: '',
        category: '',
        status: 'completed',
        description: '',
        image: null,
        gallery_images: [],
        _method: 'POST',
    });

    // =========================
    // OPEN MODAL
    // =========================
    const openModal = (mode, project = null) => {
        clearErrors();
        setModalMode(mode);

        if (project) {
            setSelectedProject(project);

            // MAIN IMAGE
            const mainImage = project.image_path
                ? project.image_path.startsWith('http')
                    ? project.image_path
                    : `/storage/${project.image_path}`
                : null;

            setImagePreview(mainImage);

            // GALLERY IMAGES
            let existingGallery = [];

            if (
                project.gallery_images &&
                Array.isArray(project.gallery_images)
            ) {
                existingGallery = project.gallery_images.map((img) =>
                    img.startsWith('http')
                        ? img
                        : `/storage/${img}`
                );
            }

            setGalleryPreviews(existingGallery);

            if (mode === 'edit') {
                setData({
                    title: project.title || '',
                    category: project.category || '',
                    status: project.status || 'completed',
                    description: project.description || '',
                    image: null,
                    gallery_images: [],
                    _method: 'PATCH',
                });
            }
        } else {
            setSelectedProject(null);

            reset();

            setImagePreview(null);
            setGalleryPreviews([]);

            setData({
                title: '',
                category: '',
                status: activeTab,
                description: '',
                image: null,
                gallery_images: [],
                _method: 'POST',
            });
        }
    };

    // =========================
    // CLOSE MODAL
    // =========================
    const closeModal = () => {
        setModalMode(null);
        setSelectedProject(null);

        setImagePreview(null);
        setGalleryPreviews([]);

        reset();
    };

    // =========================
    // MAIN IMAGE CHANGE
    // =========================
    const handleMainImageChange = (e) => {
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

    // =========================
    // MULTIPLE GALLERY IMAGES
    // =========================
    const handleMultipleImagesChange = (e) => {
        const files = Array.from(e.target.files);

        // APPEND NEW FILES
        setData('gallery_images', [
            ...data.gallery_images,
            ...files,
        ]);

        // CREATE PREVIEWS
        files.forEach((file) => {
            const reader = new FileReader();

            reader.onloadend = () => {
                setGalleryPreviews((prev) => [
                    ...prev,
                    reader.result,
                ]);
            };

            reader.readAsDataURL(file);
        });
    };

    // =========================
    // REMOVE GALLERY IMAGE
    // =========================
    const removeGalleryItem = (indexToRemove) => {
        setGalleryPreviews((prev) =>
            prev.filter((_, index) => index !== indexToRemove)
        );

        // ONLY remove from uploaded files
        if (indexToRemove < data.gallery_images.length) {
            setData(
                'gallery_images',
                data.gallery_images.filter(
                    (_, index) => index !== indexToRemove
                )
            );
        }
    };

    // =========================
    // SUBMIT
    // =========================
    const submit = (e) => {
        e.preventDefault();

        const url =
            modalMode === 'create'
                ? route('admin.projects.store')
                : route('admin.projects.update', selectedProject.id);

        post(url, {
            forceFormData: true,
            preserveScroll: true,

            onSuccess: () => {
                closeModal();

                setSuccessMessage(
                    modalMode === 'create'
                        ? 'Project created successfully!'
                        : 'Project updated successfully!'
                );

                setTimeout(() => {
                    setSuccessMessage(null);
                }, 4000);
            },
        });
    };

    return (
        <div className="flex min-h-screen bg-[#FDFBF7] font-sans text-gray-900">
            <Head title="Projects Administration | Glam Grandeur" />

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
                                ? 'bg-[#E3C263] text-white shadow-xl'
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
                        className="flex items-center gap-4 bg-[#E3C263] text-white px-6 py-4 rounded-xl text-sm shadow-xl shadow-[#E3C263]/20"
                    >
                        <FolderOpen size={20} />
                        <span className="font-bold tracking-wide">
                            Projects
                        </span>
                    </Link>

                    <Link
                        href={route('admin.services.index')}
                        className="flex items-center gap-4 px-6 py-4 rounded-2xl text-sm text-gray-400 hover:text-[#E3C263]"
                    >
                        <Wrench size={20} />
                        <span className="font-medium tracking-wide">
                            Services
                        </span>
                    </Link>

                    <Link
                        href={route('admin.team.index')}
                        className="flex items-center gap-4 px-6 py-4 rounded-2xl text-sm text-gray-400 hover:text-[#E3C263]"
                    >
                        <Users size={20} />
                        <span className="font-medium tracking-wide">
                            Team
                        </span>
                    </Link>

                    <Link
                        href={route('admin.settings.index')}
                        className="flex items-center gap-4 px-6 py-4 rounded-2xl text-sm text-gray-400 hover:text-[#E3C263]"
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
                    className="flex items-center gap-4 text-red-400 hover:bg-red-50 px-6 py-4 rounded-2xl text-sm mt-auto transition-all w-full text-left"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </Link>
            </aside>

            {/* MAIN */}
            <main className="flex-1 ml-72 p-16">
                <div className="bg-white rounded-[50px] p-16 shadow-[0_20px_80px_rgba(0,0,0,0.02)] border border-gray-50/50 min-h-[85vh] relative overflow-hidden">
                    {/* HEADER */}
                    <header className="flex justify-between items-start mb-10">
                        <div>
                            <h1 className="text-4xl font-light font-serif text-gray-800 tracking-tight">
                                Projects
                            </h1>

                            <div className="flex items-center gap-2 text-gray-400 text-xs mt-2 tracking-wide font-light">
                                <span>
                                    {currentTime.toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </span>

                                <span>•</span>

                                <span>
                                    {currentTime.toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </span>
                            </div>
                        </div>
                    </header>

                    {/* TABS */}
                    <div className="border-b border-gray-100 pb-3 flex gap-8 mb-12 text-xs uppercase tracking-widest font-bold">
                        <button
                            onClick={() => setActiveTab('completed')}
                            className={`pb-3 transition-all ${
                                activeTab === 'completed'
                                    ? 'text-gray-900 border-b-2 border-gray-900'
                                    : 'text-gray-300 hover:text-gray-500'
                            }`}
                        >
                            Completed
                        </button>

                        <button
                            onClick={() => setActiveTab('ongoing')}
                            className={`pb-3 transition-all ${
                                activeTab === 'ongoing'
                                    ? 'text-gray-900 border-b-2 border-gray-900'
                                    : 'text-gray-300 hover:text-gray-500'
                            }`}
                        >
                            Ongoing
                        </button>
                    </div>

                    {/* ACTION BAR */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-2xl font-serif text-gray-800 capitalize">
                                {activeTab} Projects
                            </h2>

                            <p className="text-xs text-gray-400 mt-1 font-light">
                                {filteredProjects.length} listings
                            </p>
                        </div>

                        <button
                            onClick={() => openModal('create')}
                            className="bg-[#E3C263] text-white px-6 py-3 rounded text-xs uppercase tracking-widest font-semibold flex items-center gap-2 hover:bg-[#d4b356]"
                        >
                            <Plus size={14} />
                            <span>Add Project</span>
                        </button>
                    </div>

                    {/* PROJECTS */}
                    <div className="space-y-6">
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((project) => (
                                <div
                                    key={project.id}
                                    className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto">
                                        <div className="w-44 h-28 rounded overflow-hidden bg-gray-50 shrink-0 border border-gray-100 shadow-sm">
                                            <img
                                                src={
                                                    project.image_path
                                                        ? project.image_path.startsWith(
                                                              'http'
                                                          )
                                                            ? project.image_path
                                                            : `/storage/${project.image_path}`
                                                        : '/images/projects/placeholder.jpg'
                                                }
                                                className="w-full h-full object-cover"
                                                alt={project.title}
                                            />
                                        </div>

                                        <div className="text-center sm:text-left">
                                            <h3 className="text-xl font-serif text-gray-800 tracking-wide">
                                                {project.title}
                                            </h3>

                                            <p className="text-xs text-gray-400 mt-1 font-light capitalize">
                                                {project.category} ·{' '}
                                                {project.status}
                                            </p>

                                            {/* GALLERY PREVIEW */}
                                            {project.gallery_images &&
                                                project.gallery_images.length >
                                                    0 && (
                                                    <div className="flex gap-2 mt-3 flex-wrap">
                                                        {project.gallery_images
                                                            .slice(0, 4)
                                                            .map(
                                                                (
                                                                    image,
                                                                    index
                                                                ) => (
                                                                    <img
                                                                        key={
                                                                            index
                                                                        }
                                                                        src={
                                                                            image.startsWith(
                                                                                'http'
                                                                            )
                                                                                ? image
                                                                                : `/storage/${image}`
                                                                        }
                                                                        alt=""
                                                                        className="w-12 h-12 rounded-lg object-cover border border-gray-100"
                                                                    />
                                                                )
                                                            )}
                                                    </div>
                                                )}
                                        </div>
                                    </div>

                                    {/* ACTIONS */}
                                    <div className="flex gap-3 shrink-0">
                                        <button
                                            onClick={() =>
                                                openModal('view', project)
                                            }
                                            className="w-10 h-10 border border-indigo-100 text-indigo-500 rounded flex items-center justify-center bg-indigo-50/20"
                                        >
                                            <Eye size={18} />
                                        </button>

                                        <button
                                            onClick={() =>
                                                openModal('edit', project)
                                            }
                                            className="w-10 h-10 border border-amber-100 text-amber-500 rounded flex items-center justify-center bg-amber-50/20"
                                        >
                                            <Edit3 size={18} />
                                        </button>

                                        <button
                                            onClick={() => {
                                                if (
                                                    confirm(
                                                        'Delete this project permanently?'
                                                    )
                                                ) {
                                                    destroy(
                                                        route(
                                                            'admin.projects.destroy',
                                                            project.id
                                                        ),
                                                        {
                                                            preserveScroll:
                                                                true,

                                                            onSuccess: () => {
                                                                setSuccessMessage(
                                                                    'Project deleted successfully'
                                                                );

                                                                setTimeout(() => {
                                                                    setSuccessMessage(
                                                                        null
                                                                    );
                                                                }, 4000);
                                                            },
                                                        }
                                                    );
                                                }
                                            }}
                                            className="w-10 h-10 border border-red-100 text-red-400 rounded flex items-center justify-center bg-red-50/20"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-24 border border-dashed border-gray-200 rounded-2xl bg-[#FDFBF7]/50">
                                <FolderOpen
                                    size={44}
                                    className="text-gray-200 mb-3"
                                />

                                <p className="text-gray-400 font-serif italic text-lg">
                                    No Listings Present
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* SUCCESS MESSAGE */}
            {successMessage && (
                <div className="fixed bottom-10 right-10 z-[999]">
                    <div className="bg-neutral-900 text-white px-8 py-5 rounded-2xl shadow-2xl flex items-center gap-5 min-w-[380px]">
                        <div className="w-11 h-11 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
                            <CheckCircle2 size={22} />
                        </div>

                        <div className="flex-1">
                            <p className="text-[10px] uppercase tracking-[0.2em] font-black text-[#E3C263]">
                                System Notification
                            </p>

                            <p className="text-sm font-light tracking-wide text-gray-200 mt-0.5">
                                {successMessage}
                            </p>
                        </div>

                        <button
                            onClick={() => setSuccessMessage(null)}
                            className="text-gray-500 hover:text-white"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>
            )}

            {/* MODAL */}
            {modalMode && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 lg:p-10">
                    <div className="bg-white rounded-[40px] w-full max-w-5xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl relative border border-gray-100">
                        <button
                            onClick={closeModal}
                            className="absolute top-8 right-8 p-2 rounded-full text-gray-400 hover:text-black hover:bg-gray-50 z-50"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex-1 overflow-y-auto p-10 lg:p-14">
                            {/* VIEW MODE */}
                            {modalMode === 'view' ? (
                                <div className="space-y-10">
                                    <div className="relative rounded-3xl overflow-hidden aspect-[21/9] w-full bg-gray-900 border border-gray-100 shadow-xl">
                                        <img
                                            src={
                                                imagePreview ||
                                                '/images/projects/placeholder.jpg'
                                            }
                                            className="w-full h-full object-cover object-center opacity-85"
                                            alt="Project"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8 lg:p-12">
                                            <div>
                                                <span className="px-4 py-1.5 bg-[#E3C263] text-neutral-900 rounded-full text-[10px] tracking-widest uppercase font-black">
                                                    {selectedProject?.category}
                                                </span>

                                                <h2 className="text-4xl lg:text-5xl font-serif text-white mt-4 tracking-wide">
                                                    {selectedProject?.title}
                                                </h2>
                                            </div>
                                        </div>
                                    </div>

                                    {/* INFO */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-gray-100 flex items-center gap-4">
                                            <div className="w-12 h-12 bg-[#E3C263]/10 rounded-xl flex items-center justify-center text-[#E3C263]">
                                                <Layers size={20} />
                                            </div>

                                            <div>
                                                <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">
                                                    Category
                                                </p>

                                                <p className="text-sm font-semibold capitalize mt-0.5 text-gray-800">
                                                    {selectedProject?.category}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-gray-100 flex items-center gap-4">
                                            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-600">
                                                <Activity size={20} />
                                            </div>

                                            <div>
                                                <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">
                                                    Status
                                                </p>

                                                <p className="text-sm font-semibold capitalize mt-0.5 text-emerald-600">
                                                    {selectedProject?.status}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-gray-100 flex items-center gap-4">
                                            <div className="w-12 h-12 bg-indigo-50/80 rounded-xl flex items-center justify-center text-indigo-500">
                                                <Calendar size={20} />
                                            </div>

                                            <div>
                                                <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">
                                                    Timeline
                                                </p>

                                                <p className="text-sm font-medium mt-0.5 text-gray-500">
                                                    Active
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* DESCRIPTION */}
                                    <div className="space-y-3">
                                        <h4 className="text-xs uppercase tracking-widest font-black text-gray-400 flex items-center gap-2">
                                            <FileText
                                                size={14}
                                                className="text-[#E3C263]"
                                            />

                                            <span>Description</span>
                                        </h4>

                                        <div className="p-8 rounded-3xl bg-neutral-50/50 border border-neutral-100/80 text-gray-600 text-sm leading-relaxed whitespace-pre-line font-light">
                                            {selectedProject?.description ||
                                                'No description available.'}
                                        </div>
                                    </div>

                                    {/* GALLERY */}
                                    <div className="space-y-4">
                                        <h4 className="text-xs uppercase tracking-widest font-black text-gray-400">
                                            Gallery (
                                            {galleryPreviews.length})
                                        </h4>

                                        {galleryPreviews.length > 0 ? (
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                                {galleryPreviews.map(
                                                    (src, index) => (
                                                        <div
                                                            key={index}
                                                            className="aspect-video rounded-xl overflow-hidden border border-gray-100 bg-gray-50 shadow-sm"
                                                        >
                                                            <img
                                                                src={src}
                                                                className="w-full h-full object-cover"
                                                                alt={`Gallery ${index}`}
                                                            />
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        ) : (
                                            <p className="text-xs text-gray-300 italic">
                                                No gallery images found.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                /* CREATE / EDIT FORM */
                                <form
                                    onSubmit={submit}
                                    className="space-y-8"
                                >
                                    <header>
                                        <h2 className="text-3xl font-serif text-gray-900">
                                            {modalMode === 'create'
                                                ? 'Publish Project Entry'
                                                : 'Modify Project Registry'}
                                        </h2>

                                        <p className="text-gray-400 text-xs mt-1 font-light tracking-wide">
                                            Manage frontend project portfolio.
                                        </p>
                                    </header>

                                    {/* TITLE + CATEGORY */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block ml-1">
                                                Project Title
                                            </label>

                                            <input
                                                value={data.title}
                                                onChange={(e) =>
                                                    setData(
                                                        'title',
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full bg-[#FDFBF7] rounded-xl p-4 text-sm border border-gray-100 focus:outline-none focus:border-[#E3C263]"
                                                placeholder="Project title"
                                            />

                                            {errors.title && (
                                                <p className="text-red-500 text-[10px] font-bold tracking-wide">
                                                    {errors.title}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block ml-1">
                                                Category
                                            </label>

                                            <input
                                                value={data.category}
                                                onChange={(e) =>
                                                    setData(
                                                        'category',
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full bg-[#FDFBF7] rounded-xl p-4 text-sm border border-gray-100 focus:outline-none focus:border-[#E3C263]"
                                                placeholder="Residential"
                                            />
                                        </div>
                                    </div>

                                    {/* STATUS */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block ml-1">
                                            Status
                                        </label>

                                        <div className="flex gap-4">
                                            {['completed', 'ongoing'].map(
                                                (opt) => (
                                                    <button
                                                        key={opt}
                                                        type="button"
                                                        onClick={() =>
                                                            setData(
                                                                'status',
                                                                opt
                                                            )
                                                        }
                                                        className={`px-6 py-3 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all ${
                                                            data.status === opt
                                                                ? 'bg-gray-900 border-gray-900 text-white shadow-md'
                                                                : 'bg-white border-gray-100 text-gray-400'
                                                        }`}
                                                    >
                                                        {opt}
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    {/* DESCRIPTION */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block ml-1">
                                            Description
                                        </label>

                                        <textarea
                                            rows="4"
                                            value={data.description}
                                            onChange={(e) =>
                                                setData(
                                                    'description',
                                                    e.target.value
                                                )
                                            }
                                            className="w-full bg-[#FDFBF7] rounded-2xl p-5 text-sm border border-gray-100 focus:outline-none focus:border-[#E3C263] resize-none leading-relaxed"
                                            placeholder="Project description..."
                                        />
                                    </div>

                                    {/* MAIN IMAGE */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block ml-1">
                                            Cover Image
                                        </label>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-[#FDFBF7] p-6 rounded-2xl border border-gray-100">
                                            <div className="aspect-[16/9] rounded-xl overflow-hidden bg-white border border-gray-100 flex items-center justify-center relative shadow-inner">
                                                {imagePreview ? (
                                                    <img
                                                        src={imagePreview}
                                                        className="w-full h-full object-cover"
                                                        alt="Preview"
                                                    />
                                                ) : (
                                                    <div className="text-center text-gray-300">
                                                        <ImageIcon
                                                            size={32}
                                                        />

                                                        <span className="text-[9px] uppercase tracking-widest block mt-1">
                                                            No Selection
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            <label className="cursor-pointer border-2 border-dashed border-gray-200 hover:border-[#E3C263] rounded-xl p-8 text-center bg-white flex flex-col items-center justify-center h-full">
                                                <Upload
                                                    size={28}
                                                    className="text-gray-300 mb-1"
                                                />

                                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                                    Upload Cover
                                                </p>

                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={
                                                        handleMainImageChange
                                                    }
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                    </div>

                                    {/* GALLERY */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block ml-1">
                                            Gallery Images
                                        </label>

                                        <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-gray-100 space-y-4">
                                            <label className="cursor-pointer bg-white border-2 border-dashed border-gray-200 hover:border-[#E3C263] p-6 rounded-xl flex items-center justify-center gap-3 transition-colors">
                                                <Plus
                                                    size={18}
                                                    className="text-[#E3C263]"
                                                />

                                                <span className="text-xs uppercase tracking-wider font-bold text-gray-600">
                                                    Choose Multiple Images
                                                </span>

                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={
                                                        handleMultipleImagesChange
                                                    }
                                                    className="hidden"
                                                />
                                            </label>

                                            {galleryPreviews.length > 0 && (
                                                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                                                    {galleryPreviews.map(
                                                        (
                                                            src,
                                                            index
                                                        ) => (
                                                            <div
                                                                key={index}
                                                                className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 shadow-sm group bg-white"
                                                            >
                                                                <img
                                                                    src={src}
                                                                    className="w-full h-full object-cover"
                                                                    alt="Gallery Preview"
                                                                />

                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        removeGalleryItem(
                                                                            index
                                                                        )
                                                                    }
                                                                    className="absolute top-1.5 right-1.5 bg-black/70 hover:bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                                >
                                                                    <X
                                                                        size={
                                                                            12
                                                                        }
                                                                    />
                                                                </button>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* BUTTONS */}
                                    <div className="flex gap-4 pt-4 border-t border-gray-50">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="flex-1 bg-[#E3C263] text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#d4b356] transition-all disabled:opacity-50"
                                        >
                                            {modalMode === 'create'
                                                ? 'Publish Listing'
                                                : 'Commit Changes'}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="px-8 py-4 rounded-xl border border-gray-200 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-gray-700"
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