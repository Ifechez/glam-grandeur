import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children, auth }) {
    // FAIL-SAFE: Check props first, then fall back to the global usePage props
    const user = auth?.user || usePage().props.auth.user;
    
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const today = new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="min-h-screen bg-[#FDFBF7] flex flex-col md:flex-row font-sans text-gray-900">
            {/* --- SIDEBAR SECTION --- */}
            <aside 
                className={`${
                    isSidebarOpen ? 'w-72' : 'w-20'
                } hidden md:flex flex-col bg-white border-r border-gray-100 transition-all duration-500 ease-in-out h-screen sticky top-0 z-50`}
            >
                <div className="p-8 mb-6 flex flex-col items-center">
                    <Link href="/">
                        <img 
                            src="/images/logos/logo.png" 
                            alt="Glam Grandeur" 
                            className={`${isSidebarOpen ? 'h-20' : 'h-10'} transition-all duration-500 object-contain`} 
                        />
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-3 overflow-y-auto">
                    <div className="mb-4">
                        <p className={`text-[9px] uppercase tracking-[0.3em] text-gray-400 font-black px-4 mb-4 ${!isSidebarOpen && 'text-center'}`}>
                            {isSidebarOpen ? 'Main Menu' : '•••'}
                        </p>
                        
                        {/* CORRECTED: Updated route to admin.index to match your web.php dashboard configuration */}
                        <NavLink href={route('admin.index')} active={route().current?.('admin.index')}>
                            <span className="text-lg">⊞</span>
                            {isSidebarOpen && <span className="ml-3 uppercase tracking-widest text-[10px]">Dashboard</span>}
                        </NavLink>

                        <NavLink href={route('admin.projects.index')} active={route().current?.('admin.projects.*')}>
                            <span className="text-lg">📁</span>
                            {isSidebarOpen && <span className="ml-3 uppercase tracking-widest text-[10px]">Projects</span>}
                        </NavLink>

                        <NavLink href={route('admin.services.index')} active={route().current?.('admin.services.*')}>
                            <span className="text-lg">✦</span>
                            {isSidebarOpen && <span className="ml-3 uppercase tracking-widest text-[10px]">Services</span>}
                        </NavLink>

                        <NavLink href={route('admin.team.index')} active={route().current?.('admin.team.*')}>
                            <span className="text-lg">👥</span>
                            {isSidebarOpen && <span className="ml-3 uppercase tracking-widest text-[10px]">Our Team</span>}
                        </NavLink>
                    </div>

                    <div className="pt-6 border-t border-gray-50">
                        <p className={`text-[9px] uppercase tracking-[0.3em] text-gray-400 font-black px-4 mb-4 ${!isSidebarOpen && 'text-center'}`}>
                            {isSidebarOpen ? 'System' : '•••'}
                        </p>
                        
                        <NavLink href={route('admin.settings.index')} active={route().current?.('admin.settings.*')}>
                            <span className="text-lg">⚙</span>
                            {isSidebarOpen && <span className="ml-3 uppercase tracking-widest text-[10px]">Settings</span>}
                        </NavLink>
                    </div>
                </nav>

                <div className="p-6 border-t border-gray-50">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="flex items-center w-full px-4 py-3 text-red-400 hover:text-red-600 transition-colors group"
                    >
                        <span className="text-lg group-hover:rotate-12 transition-transform">⏻</span>
                        {isSidebarOpen && <span className="ml-4 uppercase tracking-[0.2em] text-[10px] font-bold">Logout</span>}
                    </Link>
                </div>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <main className="flex-1 flex flex-col relative overflow-x-hidden min-h-screen">
                <header className="h-20 hidden md:flex items-center justify-between px-12 bg-white/50 backdrop-blur-md border-b border-gray-50 sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="text-gray-400 hover:text-amber-600 transition-colors font-medium text-[10px] uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full"
                        >
                            {isSidebarOpen ? '⟵ Collapse' : 'Expand ⟶'}
                        </button>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="text-right border-r border-gray-200 pr-8">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Current Session</p>
                            <p className="text-[11px] text-gray-900 mt-1 uppercase tracking-widest">{today}</p>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-xs font-bold text-gray-900">{user?.name || 'Admin'}</p>
                                <p className="text-[10px] text-amber-600 font-medium tracking-widest uppercase">Administrator</p>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-amber-50 border-2 border-white shadow-sm flex items-center justify-center text-amber-700 font-bold text-sm ring-1 ring-amber-100 uppercase">
                                {user?.name?.charAt(0) || 'A'}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-4 md:p-12 flex-1">
                    {header && <div className="mb-10">{header}</div>}
                    <div className="max-w-[1600px] mx-auto">
                        {children}
                    </div>
                </div>

                <footer className="p-12 text-[10px] text-gray-400 uppercase tracking-[0.4em] text-center border-t border-gray-50 bg-white/30 backdrop-blur-sm">
                    © 2026 Glam Grandeur Interior • Abuja, Nigeria
                </footer>
            </main>
        </div>
    );
}