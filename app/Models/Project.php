<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Project extends Model
{
    use HasFactory;

    /**
     * Mass assignable fields
     */
    protected $fillable = [
        'title',
        'slug',
        'location',
        'category',
        'status',
        'short_description',
        'description',
        'image',
        'gallery_images',
        'featured',
    ];

    /**
     * Attribute casting
     */
    protected $casts = [
        'gallery_images' => 'array',
        'featured' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Auto append attributes
     */
    protected $appends = [
        'image_url',
        'gallery_urls',
    ];

    /**
     * Main image URL
     */
    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return asset('images/projects/placeholder.jpg');
        }

        if (str_starts_with($this->image, 'http')) {
            return $this->image;
        }

        return asset('storage/' . $this->image);
    }

    /**
     * Gallery image URLs
     */
    public function getGalleryUrlsAttribute()
    {
        if (!$this->gallery_images) {
            return [];
        }

        return collect($this->gallery_images)->map(function ($image) {
            if (str_starts_with($image, 'http')) {
                return $image;
            }

            return asset('storage/' . $image);
        });
    }

    /**
     * Scope: completed projects
     */
    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    /**
     * Scope: ongoing projects
     */
    public function scopeOngoing($query)
    {
        return $query->where('status', 'ongoing');
    }

    /**
     * Scope: featured projects
     */
    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }
}