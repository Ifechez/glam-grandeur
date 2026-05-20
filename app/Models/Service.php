<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    /**
     * Mass assignable fields
     */
    protected $fillable = [
        'title',
        'slug',
        'description',
        'icon_name',
        'featured',
        'order',
    ];

    /**
     * Attribute casting
     */
    protected $casts = [
        'featured' => 'boolean',
        'order' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Query scope for featured services
     */
    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }

    /**
     * Query scope for ordered services
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order');
    }
}