<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/input', function () {
//     return Inertia::render('Form/index');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/qr', function() {
        return Inertia::render(('Form/qrscanner'));
    })->name('qr');

    Route::controller(App\Http\Controllers\BarangController::class)->group(function () {
        Route::prefix('items')->group(function () {
            Route::get('/input', 'input')->name('input');
            Route::get('/list', 'listData')->name('listData');
            Route::get('/getAllData', 'getAllData')->name('getAllData');
            Route::post('/getData', 'getData')->name('getData');
            Route::post('/store', 'store')->name('store');
        });
        
    });

    Route::controller(App\Http\Controllers\CategoryController::class)->group(function () {
        Route::prefix('category')->group(function () {
            Route::get('/list', 'index')->name('category');
            Route::get('/getAllData', 'getAllData')->name('CategoryGetAllData');
            Route::post('/update', 'update')->name('CategoryUpdate');
            Route::get('/form', 'form')->name('CategoryForm');
        });
    });
});

require __DIR__.'/auth.php';
