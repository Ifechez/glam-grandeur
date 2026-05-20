import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'flex items-center gap-4 px-4 py-3 rounded-xl text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 ' +
                (active
                    ? 'bg-[#D4AF37] text-white shadow-lg shadow-amber-200/50'
                    : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900') +
                ' ' + className
            }
        >
            {children}
        </Link>
    );
}