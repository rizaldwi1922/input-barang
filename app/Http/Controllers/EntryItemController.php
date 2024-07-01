<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class EntryItemController extends Controller
{
    public function form(){
        return Inertia::render('EntryItem/form');
    }
}
