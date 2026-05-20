<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    /**
     * Mass assignable fields
     */
    protected $fillable = [
        'site_name',
        'email',
        'phone_1',
        'phone_2',
        'address',
        'instagram_handle',
        'facebook_url',
        'twitter_url',
        'linkedin_url',
        'youtube_url',
        'whatsapp',
        'hero_title',
        'hero_subtitle',
        'footer_text',
        'about_company',
        'logo',
        'favicon',
    ];

    /**
     * Auto append URLs
     */
    protected $appends = [
        'logo_url',
        'favicon_url',
    ];

    /**
     * Get logo URL
     */
    public function getLogoUrlAttribute()
    {
        if (!$this->logo) {
            return asset('images/logos/logo.png');
        }

        if (str_starts_with($this->logo, 'http')) {
            return $this->logo;
        }

        return asset('storage/' . $this->logo);
    }

    /**
     * Get favicon URL
     */
    public function getFaviconUrlAttribute()
    {
        if (!$this->favicon) {
            return asset('favicon.ico');
        }

        if (str_starts_with($this->favicon, 'http')) {
            return $this->favicon;
        }

        return asset('storage/' . $this->favicon);
    }
}