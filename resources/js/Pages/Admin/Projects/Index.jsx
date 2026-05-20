import React from 'react';
import { Head } from '@inertiajs/react';

export default function Index({ projects }) {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <Head title="Projects Management" />
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Glam Grandeur Projects</h1>
            
            <div className="bg-white rounded-xl shadow-md p-6">
                <p className="text-green-600 font-medium">Structure Fixed! The dashboard is now active.</p>
                <div className="mt-6">
                    {projects && projects.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {projects.map(project => (
                                <li key={project.id} className="py-4 font-semibold text-gray-700">
                                    {project.title}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 italic">No projects found in the database.</p>
                    )}
                </div>
            </div>
        </div>
    );
}