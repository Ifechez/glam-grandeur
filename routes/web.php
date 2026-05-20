<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

use App\Models\Service;
use App\Models\Project;
use App\Models\Team;
use App\Models\Setting;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| 1. Public Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    try {
        return Inertia::render('Welcome', [
            'settings' => Setting::first(),
            'services' => Service::all(),
            'projects' => Project::latest()->take(6)->get(),
            'team' => Team::latest()->get(),
            'canLogin' => Route::has('login'),
        ]);
    } catch (\Exception $e) {
        return Inertia::render('Welcome', [
            'settings' => null,
            'services' => [],
            'projects' => [],
            'team' => [],
            'canLogin' => Route::has('login'),
        ]);
    }
})->name('home');

Route::get('/about', function () {
    try {
        return Inertia::render('About', [
            'team' => Team::latest()->get(),
            'settings' => Setting::first(),
        ]);
    } catch (\Exception $e) {
        return Inertia::render('About', [
            'team' => [],
            'settings' => null,
        ]);
    }
})->name('about');

/*
|--------------------------------------------------------------------------
| Projects
|--------------------------------------------------------------------------
*/

Route::prefix('projects')->name('projects.')->group(function () {

    Route::get('/completed', function () {
        return Inertia::render('Projects/Completed', [
            'projects' => Project::where('status', 'completed')
                ->latest()
                ->get(),
        ]);
    })->name('completed');

    Route::get('/ongoing', function () {
        return Inertia::render('Projects/Ongoing', [
            'projects' => Project::where('status', 'ongoing')
                ->latest()
                ->get(),
        ]);
    })->name('ongoing');

    Route::get('/view/{project}', function (Project $project) {
        return Inertia::render('Projects/Show', [
            'project' => $project,
        ]);
    })->name('show');
});

/*
|--------------------------------------------------------------------------
| Contact
|--------------------------------------------------------------------------
*/

Route::post('/contact', [
    ContactController::class,
    'handleSubmission'
])->name('contact.submit');

/*
|--------------------------------------------------------------------------
| 2. Authenticated Admin Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', function () {
        return redirect()->route('admin.index');
    })->name('dashboard');

    Route::prefix('admin')->name('admin.')->group(function () {

        /*
        |--------------------------------------------------------------------------
        | Dashboard
        |--------------------------------------------------------------------------
        */

        Route::get('/', [
            AdminController::class,
            'index'
        ])->name('index');

        /*
        |--------------------------------------------------------------------------
        | Projects
        |--------------------------------------------------------------------------
        */

        Route::get('/projects', [
            AdminController::class,
            'projectsIndex'
        ])->name('projects.index');

        Route::post('/projects', [
            AdminController::class,
            'storeProject'
        ])->name('projects.store');

        // FIXED: Swapped from POST to PATCH to accurately handle update payloads with file uploads
        Route::patch('/projects/{project}', [
            AdminController::class,
            'updateProject'
        ])->name('projects.update');

        Route::delete('/projects/{project}', [
            AdminController::class,
            'deleteProject'
        ])->name('projects.destroy');

        /*
        |--------------------------------------------------------------------------
        | Services
        |--------------------------------------------------------------------------
        */

        Route::get('/services', [
            AdminController::class,
            'servicesIndex'
        ])->name('services.index');

        Route::post('/services', [
            AdminController::class,
            'storeService'
        ])->name('services.store');

        // FIXED: Swapped from POST to PATCH to ensure form changes persist reliably
        Route::patch('/services/{service}', [
            AdminController::class,
            'updateService'
        ])->name('services.update');

        Route::delete('/services/{service}', [
            AdminController::class,
            'deleteService'
        ])->name('services.destroy');

        /*
        |--------------------------------------------------------------------------
        | Team
        |--------------------------------------------------------------------------
        */

        Route::get('/team', [
            AdminController::class,
            'teamIndex'
        ])->name('team.index');

        Route::post('/team', [
            AdminController::class,
            'storeTeam'
        ])->name('team.store');

        // FIXED: Swapped route definition to PATCH to intercept Inertia's update method spoofing safely
        Route::patch('/team/{team}', [
            AdminController::class,
            'updateTeam'
        ])->name('team.update');

        Route::delete('/team/{team}', [
            AdminController::class,
            'deleteTeam'
        ])->name('team.destroy');

        /*
        |--------------------------------------------------------------------------
        | Settings
        |--------------------------------------------------------------------------
        */

        Route::get('/settings', [
            AdminController::class,
            'settingsIndex'
        ])->name('settings.index');

        Route::post('/settings', [
            AdminController::class,
            'updateSettings'
        ])->name('settings.update');
    });

    /*
    |--------------------------------------------------------------------------
    | Profile
    |--------------------------------------------------------------------------
    */

    Route::get('/profile', [
        ProfileController::class,
        'edit'
    ])->name('profile.edit');

    Route::patch('/profile', [
        ProfileController::class,
        'update'
    ])->name('profile.update');

    Route::delete('/profile', [
        ProfileController::class,
        'destroy'
    ])->name('profile.destroy');

    /*
    |--------------------------------------------------------------------------
    | 3. Development Utilities (SECURED)
    |--------------------------------------------------------------------------
    */

    Route::get('/super-migrate', function () {
        try {
            Artisan::call('migrate:fresh', [
                '--force' => true
            ]);

            User::create([
                'name' => 'Admin',
                'email' => 'admin@glamgrandeur.ng',
                'password' => Hash::make('password123'),
            ]);

            return "SUCCESS: Database rebuilt and admin created.";
        } catch (\Exception $e) {
            return "ERROR: " . $e->getMessage();
        }
    });

    Route::get('/run-link', function () {
        try {
            Artisan::call('storage:link');
            return "SUCCESS: Storage link created.";
        } catch (\Exception $e) {
            return "ERROR: " . $e->getMessage();
        }
    });

    Route::get('/clear-all', function () {
        Artisan::call('cache:clear');
        Artisan::call('config:clear');
        Artisan::call('route:clear');
        Artisan::call('view:clear');

        return "SUCCESS: All caches cleared.";
    });
});

/*
|--------------------------------------------------------------------------
| Auth Routes
|--------------------------------------------------------------------------
*/

require __DIR__ . '/auth.php';