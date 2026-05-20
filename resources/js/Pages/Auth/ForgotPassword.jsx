import React from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="min-h-screen bg-[#F3F4F6] flex flex-col items-center justify-center p-6">
            <Head title="Forgot Password | Glam Grandeur" />
            
            <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="mb-8">
                    <img src="/images/logos/logo.png" alt="Glam Grandeur" className="h-12 mx-auto mb-4" />
                    <h1 className="text-[#6B7280] font-light tracking-widest text-sm uppercase">Reset Password</h1>
                </div>

                <p className="text-[11px] text-gray-500 mb-8 leading-relaxed text-left">
                    Forgot your password? No problem. Enter your email address and we'll send you a link to choose a new one.
                </p>

                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                <form onSubmit={submit} className="space-y-6 text-left">
                    <div>
                        <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2">Email Address</label>
                        <input
                            type="email"
                            value={data.email}
                            className="w-full border-gray-200 bg-[#F9FAFB] focus:border-amber-400 focus:ring-0 py-3 px-4 transition-all"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email}</p>}
                    </div>

                    <button
                        className="w-full bg-[#E3C263] text-white py-4 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-black transition-all duration-500 disabled:opacity-50"
                        disabled={processing}
                    >
                        {processing ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>
            </div>
        </div>
    );
}