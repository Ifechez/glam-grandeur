import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center p-6">
            <Head title="Admin Login | Glam Grandeur" />
            
            <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] p-12 text-center border border-gray-100">
                {/* Branding */}
                <div className="mb-10">
                    <img src="/images/logos/logo.png" alt="Glam Grandeur" className="h-20 mx-auto mb-6" />
                    <h1 className="text-[#9CA3AF] font-light tracking-[0.4em] text-[10px] uppercase">Management Suite</h1>
                </div>

                {status && <div className="mb-6 font-medium text-xs text-green-600 bg-green-50 py-2 rounded">{status}</div>}

                <form onSubmit={submit} className="space-y-6 text-left">
                    <div>
                        <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2 font-semibold">Email Address</label>
                        <input
                            type="email"
                            value={data.email}
                            className="w-full border-gray-100 bg-[#F9FAFB] focus:border-[#E3C263] focus:bg-white focus:ring-0 py-4 px-5 transition-all rounded-lg text-sm"
                            placeholder="e.g. admin@glamgrandeur.com"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        {errors.email && <p className="text-red-500 text-[10px] mt-2 font-medium uppercase tracking-wider">{errors.email}</p>}
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold">Security Key</label>
                            {/* Recovery / Forgot Password Link */}
                            {/* {canResetPassword && (
                                <Link 
                                    href={route('password.request')} 
                                    className="text-[9px] uppercase tracking-widest text-[#E3C263] hover:text-black transition-colors"
                                >
                                    Recovery?
                                </Link>
                            )} */}
                        </div>
                        <input
                            type="password"
                            value={data.password}
                            className="w-full border-gray-100 bg-[#F9FAFB] focus:border-[#E3C263] focus:bg-white focus:ring-0 py-4 px-5 transition-all rounded-lg text-sm"
                            placeholder="••••••••"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                    </div>

                    <button
                        className="w-full bg-[#111827] text-white py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-[#E3C263] transition-all duration-700 disabled:opacity-50 rounded-lg shadow-lg shadow-gray-200"
                        disabled={processing}
                    >
                        Enter Dashboard
                    </button>
                </form>

                {/* Registration Link Section - Commented Out */}
                <div className="mt-10 pt-8 border-t border-gray-50">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-3">New Administrator?</p>
                    <Link
                        href={route('register')}
                        className="inline-block text-[#E3C263] font-bold text-xs uppercase tracking-[0.15em] border-b border-[#E3C263] hover:text-black hover:border-black transition-all pb-1"
                    >
                        Create Your Account
                    </Link>
                </div> 
            
            </div>
            
            <p className="mt-8 text-[9px] text-gray-400 uppercase tracking-[0.5em]">© 2026 Glam Grandeur Interior</p>
        </div>
    );
}