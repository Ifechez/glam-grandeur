import React from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen bg-[#F3F4F6] flex flex-col items-center justify-center p-6">
            <Head title="Set New Password" />
            <div className="w-full max-w-md bg-white p-12 shadow-sm rounded-lg">
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">New Password</label>
                        <input
                            type="password"
                            className="w-full border-gray-200 bg-[#F9FAFB] focus:border-amber-400 focus:ring-0 py-3"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full border-gray-200 bg-[#F9FAFB] focus:border-amber-400 focus:ring-0 py-3"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                        />
                    </div>
                    <button className="w-full bg-[#E3C263] text-white py-4 uppercase text-[11px] font-bold tracking-widest">
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
}