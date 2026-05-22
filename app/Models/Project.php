<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Project extends Model
{
    use HasFactory;

    /*
    |--------------------------------------------------------------------------
    | MASS ASSIGNABLE
    |--------------------------------------------------------------------------
    */

    protected $fillable = [
        'title',
        'slug',
        'client_name',
        'location',
        'category',
        'status',
        'progress',
        'featured',
        'is_published',
        'sort_order',
        'completed_at',
        'short_description',
        'description',
        'image',
        'gallery_images',
    ];

    /*
    |--------------------------------------------------------------------------
    | ATTRIBUTE CASTING
    |--------------------------------------------------------------------------
    */

    protected $casts = [
        'gallery_images' => 'array',
        'featured' => 'boolean',
        'is_published' => 'boolean',
        'progress' => 'integer',
        'sort_order' => 'integer',
        'completed_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /*
    |--------------------------------------------------------------------------
    | AUTO APPENDED ATTRIBUTES
    |--------------------------------------------------------------------------
    */

    protected $appends = [
        'image_url',
        'gallery_urls',
    ];

    /*
    |--------------------------------------------------------------------------
    | MAIN IMAGE URL
    |--------------------------------------------------------------------------
    */

    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return asset('images/projects/placeholder.jpg');
        }

        // ALREADY FULL URL
        if (str_starts_with($this->image, 'http')) {
            return $this->image;
        }

        return asset('storage/' . $this->image);
    }

    /*
    |--------------------------------------------------------------------------
    | GALLERY IMAGE URLS
    |--------------------------------------------------------------------------
    */

    public function getGalleryUrlsAttribute()
    {
        if (!$this->gallery_images || !is_array($this->gallery_images)) {
            return [];
        }

        return collect($this->gallery_images)
            ->map(function ($image) {

                // ALREADY FULL URL
                if (str_starts_with($image, 'http')) {
                    return $image;
                }

                return asset('storage/' . $image);
            })
            ->values()
            ->toArray();
    }

    /*
    |--------------------------------------------------------------------------
    | SCOPES
    |--------------------------------------------------------------------------
    */

public function scopeCompleted(Builder $query)
{
    return $query->where('status', 'completed');
}

public function scopeOngoing(Builder $query)
{
    return $query->where('status', 'ongoing');
}

public function scopeFeatured(Builder $query)
{
    return $query->where('featured', true);
}

public function scopePublished(Builder $query)
{
    return $query->where('is_published', true);
}
}