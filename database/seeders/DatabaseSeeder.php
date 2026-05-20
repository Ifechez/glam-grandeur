<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash; // Required for password hashing

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Creates the primary administrator account
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'ifechez11@gmail.com',
            'password' => Hash::make('password123'), // Securely hashes the password
        ]);
    }
}