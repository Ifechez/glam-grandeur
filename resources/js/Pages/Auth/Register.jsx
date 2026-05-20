import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Create Account | Glam Grandeur" />

            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900">Join the Grandeur</h2>
                <p className="text-sm text-gray-600">Create your admin account to manage your brand.</p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="name" value="Full Name" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full border-gray-300 focus:border-green-700 focus:ring-green-700 shadow-sm"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email Address" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full border-gray-300 focus:border-green-700 focus:ring-green-700 shadow-sm"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="password" value="Password" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full border-gray-300 focus:border-green-700 focus:ring-green-700 shadow-sm"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="password_confirmation" value="Confirm" />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full border-gray-300 focus:border-green-700 focus:ring-green-700 shadow-sm"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="mt-6 flex flex-col space-y-4 items-center justify-center">
                    <PrimaryButton 
                        className="w-full justify-center bg-green-800 hover:bg-green-900 py-3 text-lg tracking-widest transition-all" 
                        disabled={processing}
                    >
                        Create Account
                    </PrimaryButton>

                    <Link
                        href={route('login')}
                        className="text-sm text-gray-600 underline hover:text-green-800 transition-colors"
                    >
                        Already have an account? Log in
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}