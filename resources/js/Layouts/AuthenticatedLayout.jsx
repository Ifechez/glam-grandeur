import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children, auth }) {
    const user = auth?.user || usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const today = new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    const NavLinks = () => (
        <>
            <NavLink href={route('admin.index')} active={route().current?.('admin.index')}>
                <span className="text-lg">⊞</span>
                <span className="ml-3 uppercase tracking-widest text-[10px]">Dashboard</span>
            </NavLink>
            <NavLink href={route('admin.projects.index')} active={route().current?.('admin.projects.*')}>
                <span className="text-lg">📁</span>
                <span className="ml-3 uppercase tracking-widest text-[10px]">Projects</span>
            </NavLink>
            <NavLink href={route('admin.services.index')} active={route().current?.('admin.services.*')}>
                <span className="text-lg">✦</span>
                <span className="ml-3 uppercase tracking-widest text-[10px]">Services</span>
            </NavLink>
            <NavLink href={route('admin.team.index')} active={route().current?.('admin.team.*')}>
                <span className="text-lg">👥</span>
                <span className="ml-3 uppercase tracking-widest text-[10px]">Our Team</span>
            </NavLink>
        </>
    );

    return (
        <div className="min-h-screen bg-[#FDFBF7] flex flex-col md:flex-row font-sans text-gray-900">
            {/* --- SIDEBAR (DESKTOP) --- */}
            <aside className={`${isSidebarOpen ? 'w-72' : 'w-20'} hidden md:flex flex-col bg-white border-r border-gray-100 transition-all duration-500 h-screen sticky top-0 z-50`}>
                <div className="p-8 mb-6 flex flex-col items-center">
                    <Link href="/">
                        <img src="/images/logos/logo.png" alt="Glam Grandeur" className={`${isSidebarOpen ? 'h-20' : 'h-10'} transition-all duration-500 object-contain`} />
                    </Link>
                </div>
                <nav className="flex-1 px-4 space-y-3 overflow-y-auto">
                    <NavLinks />
                    <div className="pt-6 border-t border-gray-50 mt-6">
                        <NavLink href={route('admin.settings.index')} active={route().current?.('admin.settings.*')}>
                            <span className="text-lg">⚙</span>
                            <span className="ml-3 uppercase tracking-widest text-[10px]">Settings</span>
                        </NavLink>
                    </div>
                </nav>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <main className="flex-1 flex flex-col relative overflow-x-hidden min-h-screen">
                
                {/* --- MOBILE NAV --- */}
                <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-100 sticky top-0 z-50">
                    <button onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)} className="text-gray-500">
                        ☰
                    </button>
                    <div className="text-[10px] uppercase font-black tracking-widest">Admin Panel</div>
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-[10px] font-bold">{user?.name?.charAt(0)}</div>
                </header>

                {/* Mobile Dropdown */}
                {showingNavigationDropdown && (
                    <div className="md:hidden bg-white p-4 border-b border-gray-100">
                        <div className="space-y-3">
                            <ResponsiveNavLink href={route('admin.index')}>Dashboard</ResponsiveNavLink>
                            <ResponsiveNavLink href={route('admin.projects.index')}>Projects</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">Logout</ResponsiveNavLink>
                        </div>
                    </div>
                )}

                {/* --- DESKTOP HEADER --- */}
                <header className="h-20 hidden md:flex items-center justify-between px-12 bg-white/50 backdrop-blur-md border-b border-gray-50 sticky top-0 z-40">
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-400 text-[10px] uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full">
                        {isSidebarOpen ? '⟵ Collapse' : 'Expand ⟶'}
                    </button>
                    <div className="flex items-center gap-8">
                        <div className="text-right border-r border-gray-200 pr-8">
                            <p className="text-[10px] font-black uppercase text-gray-400">Current Session</p>
                            <p className="text-[11px] mt-1 uppercase tracking-widest">{today}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-bold">{user?.name}</p>
                            <p className="text-[10px] text-amber-600 uppercase tracking-widest">Administrator</p>
                        </div>
                    </div>
                </header>

                <div className="p-4 md:p-12 flex-1">
                    {header && <div className="mb-10">{header}</div>}
                    <div className="max-w-[1600px] mx-auto">
                        {children}
                    </div>
                </div>

                <footer className="p-12 text-[10px] text-gray-400 uppercase tracking-[0.4em] text-center border-t border-gray-50 bg-white/30">
                    © 2026 Glam Grandeur Interior
                </footer>
            </main>
        </div>
    );
}