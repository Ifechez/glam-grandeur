<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Service;
use App\Models\Setting;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
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
            'projects' => Project::latest()
                ->get()
                ->map(function ($project) {
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

                        // MAIN IMAGE
                        'image_path' => $project->image
                            ? asset('storage/' . $project->image)
                            : null,

                        // GALLERY IMAGES
                        'gallery_images' => collect($project->gallery_images ?? [])
                            ->map(fn($img) => asset('storage/' . $img))
                            ->values(),
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
            'status' => 'required|string|max:255',
            'progress' => 'nullable|integer',
            'featured' => 'nullable|boolean',
            'is_published' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
            'completed_at' => 'nullable|date',
            'short_description' => 'nullable|string',
            'description' => 'nullable|string',

            // MAIN IMAGE
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',

            // GALLERY IMAGES
            'gallery_images' => 'nullable|array',
            'gallery_images.*' => 'image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        /*
        |--------------------------------------------------------------------------
        | AUTO GENERATE SLUG
        |--------------------------------------------------------------------------
        */

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        /*
        |--------------------------------------------------------------------------
        | MAIN IMAGE UPLOAD
        |--------------------------------------------------------------------------
        */

        if ($request->hasFile('image')) {
            $validated['image'] = $request
                ->file('image')
                ->store('projects', 'public');
        }

        /*
        |--------------------------------------------------------------------------
        | GALLERY IMAGE UPLOADS
        |--------------------------------------------------------------------------
        */

        $galleryPaths = [];

        if ($request->hasFile('gallery_images')) {

            foreach ($request->file('gallery_images') as $file) {

                $galleryPaths[] = $file->store(
                    'projects/gallery',
                    'public'
                );
            }
        }

        $validated['gallery_images'] = $galleryPaths;

        /*
        |--------------------------------------------------------------------------
        | CREATE PROJECT
        |--------------------------------------------------------------------------
        */

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
            'status' => 'required|string|max:255',
            'progress' => 'nullable|integer',
            'featured' => 'nullable|boolean',
            'is_published' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
            'completed_at' => 'nullable|date',
            'short_description' => 'nullable|string',
            'description' => 'nullable|string',

            // MAIN IMAGE
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',

            // GALLERY IMAGES
            'gallery_images' => 'nullable|array',
            'gallery_images.*' => 'image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        /*
        |--------------------------------------------------------------------------
        | AUTO GENERATE SLUG
        |--------------------------------------------------------------------------
        */

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        /*
        |--------------------------------------------------------------------------
        | MAIN IMAGE UPDATE
        |--------------------------------------------------------------------------
        */

        if ($request->hasFile('image')) {

            // DELETE OLD IMAGE
            if ($project->image) {
                Storage::disk('public')->delete($project->image);
            }

            // STORE NEW IMAGE
            $validated['image'] = $request
                ->file('image')
                ->store('projects', 'public');
        }

        /*
        |--------------------------------------------------------------------------
        | KEEP EXISTING GALLERY
        |--------------------------------------------------------------------------
        */

        $gallery = $project->gallery_images ?? [];

        /*
        |--------------------------------------------------------------------------
        | ADD NEW GALLERY IMAGES
        |--------------------------------------------------------------------------
        */

        if ($request->hasFile('gallery_images')) {

            foreach ($request->file('gallery_images') as $file) {

                $gallery[] = $file->store(
                    'projects/gallery',
                    'public'
                );
            }
        }

        $validated['gallery_images'] = $gallery;

        /*
        |--------------------------------------------------------------------------
        | UPDATE PROJECT
        |--------------------------------------------------------------------------
        */

        $project->update($validated);

        return back()->with('success', 'Project updated successfully.');
    }

    public function deleteProject(Project $project)
    {
        /*
        |--------------------------------------------------------------------------
        | DELETE MAIN IMAGE
        |--------------------------------------------------------------------------
        */

        if ($project->image) {
            Storage::disk('public')->delete($project->image);
        }

        /*
        |--------------------------------------------------------------------------
        | DELETE GALLERY IMAGES
        |--------------------------------------------------------------------------
        */

        if ($project->gallery_images) {

            foreach ($project->gallery_images as $image) {

                Storage::disk('public')->delete($image);
            }
        }

        /*
        |--------------------------------------------------------------------------
        | DELETE PROJECT
        |--------------------------------------------------------------------------
        */

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

        return back()->with('success', 'Service created successfully.');
    }

    public function updateService(Request $request, Service $service)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon_name' => 'nullable|string|max:255',
        ]);

        $service->update($validated);

        return back()->with('success', 'Service updated successfully.');
    }

    public function deleteService(Service $service)
    {
        $service->delete();

        return back()->with('success', 'Service deleted successfully.');
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

            // IMAGE
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        if ($request->hasFile('image')) {

            $validated['image'] = $request
                ->file('image')
                ->store('team', 'public');
        }

        Team::create($validated);

        return back()->with('success', 'Team member created successfully.');
    }

    public function updateTeam(Request $request, Team $team)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'nullable|string|max:255',
            'bio' => 'nullable|string',

            // IMAGE
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        if ($request->hasFile('image')) {

            // DELETE OLD IMAGE
            if ($team->image) {
                Storage::disk('public')->delete($team->image);
            }

            // STORE NEW IMAGE
            $validated['image'] = $request
                ->file('image')
                ->store('team', 'public');
        }

        $team->update($validated);

        return back()->with('success', 'Team member updated successfully.');
    }

    public function deleteTeam(Team $team)
    {
        if ($team->image) {
            Storage::disk('public')->delete($team->image);
        }

        $team->delete();

        return back()->with('success', 'Team member deleted successfully.');
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
            'email' => 'nullable|email|max:255',
            'phone_1' => 'nullable|string|max:255',
            'phone_2' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'instagram_handle' => 'nullable|string|max:255',
        ]);

        Setting::updateOrCreate(
            ['id' => 1],
            $validated
        );

        return back()->with('success', 'Settings updated successfully.');
    }
}