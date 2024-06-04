<?php

namespace App\Http\Controllers;
use Inertia\Inertia;

use Illuminate\Http\Request;

class WelcomeController extends Controller
{
    public function show()
    {
        return Inertia::render('index', [
          'user' => 'Rizal'
        ]);
    }
}
