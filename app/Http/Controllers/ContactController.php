<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    /**
     * Handle public contact form submissions
     */
    public function handleSubmission(Request $request)
    {
        /*
        |--------------------------------------------------------------------------
        | VALIDATION
        |--------------------------------------------------------------------------
        */

        $validated = $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'email'     => ['required', 'email', 'max:255'],
            'phone'     => ['nullable', 'string', 'max:255'],
            'message'   => ['required', 'string', 'min:10'],
        ]);

        try {

            /*
            |--------------------------------------------------------------------------
            | EMAIL BODY
            |--------------------------------------------------------------------------
            */

            $body = "
New Contact Request

Name: {$validated['full_name']}
Email: {$validated['email']}
Phone: " . ($validated['phone'] ?? 'N/A') . "

Message:
{$validated['message']}
";

            /*
            |--------------------------------------------------------------------------
            | SEND EMAIL
            |--------------------------------------------------------------------------
            */

            Mail::raw($body, function ($message) use ($validated) {

                $message->to('grandeurglam2022@gmail.com')
                    ->subject(
                        'New Contact Form Submission - ' .
                        $validated['full_name']
                    );
            });

            /*
            |--------------------------------------------------------------------------
            | SUCCESS RESPONSE
            |--------------------------------------------------------------------------
            */

            return back()->with(
                'message',
                'Thank you! Your message has been sent successfully.'
            );

        } catch (\Exception $e) {

            /*
            |--------------------------------------------------------------------------
            | LOG ERROR
            |--------------------------------------------------------------------------
            */

            Log::error('CONTACT FORM ERROR: ' . $e->getMessage());

            /*
            |--------------------------------------------------------------------------
            | ERROR RESPONSE
            |--------------------------------------------------------------------------
            */

            return back()->with(
                'message',
                'Your message was received, but email delivery failed.'
            );
        }
    }
}