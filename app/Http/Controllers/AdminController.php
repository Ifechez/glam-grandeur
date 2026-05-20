<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Service;
use App\Models\Setting;
use App\Models\Team;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | DASHBOARD
    |--------------------------------------------------------------------------
    */

    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'projects' => Project::count(),
                'services' => Service::count(),
                'team' => Team::count(),
            ],
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | PROJECTS
    |--------------------------------------------------------------------------
    */

    public function projectsIndex()
    {
        return Inertia::render('Admin/Projects', [
            'projects' => Project::latest()->get()->map(function ($project) {

                $formatPath = function ($path) {
                    if (!$path) return null;

                    if (str_starts_with($path, 'http')) {
                        return $path;
                    }

                    return asset('storage/' . $path);
                };

                return [
                    'id' => $project->id,
                    'title' => $project->title,
                    'slug' => $project->slug,
                    'client_name' => $project->client_name,
                    'location' => $project->location,
                    'category' => $project->category,
                    'status' => $project->status,
                    'progress' => $project->progress,
                    'featured' => $project->featured,
                    'is_published' => $project->is_published,
                    'sort_order' => $project->sort_order,
                    'completed_at' => $project->completed_at,
                    'short_description' => $project->short_description,
                    'description' => $project->description,
                    'image_path' => $formatPath($project->image),

                    'gallery_images' => $project->gallery_images
                        ? collect($project->gallery_images)->map(fn ($img) => $formatPath($img))
                        : [],
                ];
            }),
        ]);
    }

    public function storeProject(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'client_name' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'status' => 'required|string',
            'progress' => 'nullable|integer',
            'featured' => 'nullable|boolean',
            'is_published' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
            'completed_at' => 'nullable|string',
            'short_description' => 'nullable|string',
            'description' => 'nullable|string',
            // FIXED: Bypassed fileinfo module crash via explicit mimes rule
            'image' => 'nullable|mimes:jpeg,jpg,png,webp,gif|max:20480',
            'gallery_images.*' => 'nullable|mimes:jpeg,jpg,png,webp,gif|max:20480',
        ]);

        /*
        |--------------------------------------------------------------------------
        | MAIN IMAGE
        |--------------------------------------------------------------------------
        */

        if ($request->hasFile('image')) {

            $file = $request->file('image');

            $name = time() . '_' . str_replace(' ', '_', $file->getClientOriginalName());

            $file->move(public_path('storage/projects'), $name);

            $validated['image'] = 'projects/' . $name;
        }

        /*
        |--------------------------------------------------------------------------
        | GALLERY
        |--------------------------------------------------------------------------
        */

        $galleryPaths = [];

        if ($request->hasFile('gallery_images')) {

            foreach ($request->file('gallery_images') as $file) {

                $name = time() . '_' . str_replace(' ', '_', $file->getClientOriginalName());

                $file->move(public_path('storage/projects/gallery'), $name);

                $galleryPaths[] = 'projects/gallery/' . $name;
            }
        }

        $validated['gallery_images'] = $galleryPaths;

        Project::create($validated);

        return back()->with('success', 'Project created successfully.');
    }

    public function updateProject(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'client_name' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'status' => 'required|string',
            'progress' => 'nullable|integer',
            'featured' => 'nullable|boolean',
            'is_published' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
            'completed_at' => 'nullable|string',
            'short_description' => 'nullable|string',
            'description' => 'nullable|string',
            // FIXED: Bypassed fileinfo module crash via explicit mimes rule
            'image' => 'nullable|mimes:jpeg,jpg,png,webp,gif|max:20480',
            'gallery_images.*' => 'nullable|mimes:jpeg,jpg,png,webp,gif|max:20480',
        ]);

        /*
        |--------------------------------------------------------------------------
        | IMAGE UPDATE
        |--------------------------------------------------------------------------
        */

        if ($request->hasFile('image')) {

            if (
                $project->image &&
                file_exists(public_path('storage/' . $project->image))
            ) {
                unlink(public_path('storage/' . $project->image));
            }

            $file = $request->file('image');

            $name = time() . '_' . str_replace(' ', '_', $file->getClientOriginalName());

            $file->move(public_path('storage/projects'), $name);

            $validated['image'] = 'projects/' . $name;
        }

        /*
        |--------------------------------------------------------------------------
        | GALLERY UPDATE
        |--------------------------------------------------------------------------
        */

        if ($request->hasFile('gallery_images')) {

            $galleryPaths = [];

            foreach ($request->file('gallery_images') as $file) {

                $name = time() . '_' . str_replace(' ', '_', $file->getClientOriginalName());

                $file->move(public_path('storage/projects/gallery'), $name);

                $galleryPaths[] = 'projects/gallery/' . $name;
            }

            $validated['gallery_images'] = $galleryPaths;
        }

        $project->update($validated);

        return back()->with('success', 'Project updated successfully.');
    }

    public function deleteProject(Project $project)
    {
        if (
            $project->image &&
            file_exists(public_path('storage/' . $project->image))
        ) {
            unlink(public_path('storage/' . $project->image));
        }

        $project->delete();

        return back()->with('success', 'Project deleted successfully.');
    }

    /*
    |--------------------------------------------------------------------------
    | SERVICES
    |--------------------------------------------------------------------------
    */

    public function servicesIndex()
    {
        return Inertia::render('Admin/Services', [
            'services' => Service::latest()->get(),
        ]);
    }

    public function storeService(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon_name' => 'nullable|string|max:255',
        ]);

        Service::create($validated);

        return back()->with('success', 'Service created.');
    }

    public function updateService(Request $request, Service $service)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon_name' => 'nullable|string|max:255',
        ]);

        $service->update($validated);

        return back()->with('success', 'Service updated.');
    }

    public function deleteService(Service $service)
    {
        $service->delete();

        return back()->with('success', 'Service deleted.');
    }

    /*
    |--------------------------------------------------------------------------
    | TEAM
    |--------------------------------------------------------------------------
    */

    public function teamIndex()
    {
        return Inertia::render('Admin/Team', [
            'team' => Team::latest()->get(),
        ]);
    }

    public function storeTeam(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            // FIXED: Bypassed fileinfo module crash via explicit mimes rule
            'image' => 'nullable|mimes:jpeg,jpg,png,webp,gif|max:20480',
        ]);

        if ($request->hasFile('image')) {

            $file = $request->file('image');

            $name = time() . '_' . str_replace(' ', '_', $file->getClientOriginalName());

            $file->move(public_path('storage/team'), $name);

            $validated['image'] = 'team/' . $name;
        }

        Team::create($validated);

        return back()->with('success', 'Team member added.');
    }

    public function updateTeam(Request $request, Team $team)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            // FIXED: Bypassed fileinfo module crash via explicit mimes rule
            'image' => 'nullable|mimes:jpeg,jpg,png,webp,gif|max:20480',
        ]);

        if ($request->hasFile('image')) {

            if (
                $team->image &&
                file_exists(public_path('storage/' . $team->image))
            ) {
                unlink(public_path('storage/' . $team->image));
            }

            $file = $request->file('image');

            $name = time() . '_' . str_replace(' ', '_', $file->getClientOriginalName());

            $file->move(public_path('storage/team'), $name);

            $validated['image'] = 'team/' . $name;
        }

        $team->update($validated);

        return back()->with('success', 'Team member updated.');
    }

    public function deleteTeam(Team $team)
    {
        if (
            $team->image &&
            file_exists(public_path('storage/' . $team->image))
        ) {
            unlink(public_path('storage/' . $team->image));
        }

        $team->delete();

        return back()->with('success', 'Team member removed.');
    }

    /*
    |--------------------------------------------------------------------------
    | SETTINGS
    |--------------------------------------------------------------------------
    */

    public function settingsIndex()
    {
        return Inertia::render('Admin/Settings', [
            'settings' => Setting::first(),
        ]);
    }

    public function updateSettings(Request $request)
    {
        $validated = $request->validate([
            'email' => 'nullable|email',
            'phone_1' => 'nullable|string|max:255',
            'phone_2' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'instagram_handle' => 'nullable|string|max:255',
        ]);

        Setting::updateOrCreate(
            ['id' => 1],
            $validated
        );

        return back()->with('success', 'Settings updated.');
    }
}