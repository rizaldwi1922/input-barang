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

    // Route::controller(App\Http\Controllers\BarangController::class)->group(function () {
    //     Route::prefix('items')->group(function () {
    //         Route::get('/input', 'input')->name('input');
    //         Route::get('/list', 'listData')->name('listData');
    //         Route::post('/getAllData', 'getAllData')->name('getAllData');
    //         Route::post('/getData', 'getData')->name('getData');
    //         Route::post('/store', 'store')->name('store');
    //     });
        
    // });

    Route::controller(App\Http\Controllers\CategoryController::class)->group(function () {
        Route::prefix('category')->group(function () {
            Route::get('/list', 'index')->name('category');
            Route::post('/getAllData', 'getAllData')->name('CategoryGetAllData');
            Route::get('/getAllRawData', 'getAllRawData')->name('CategoryGetAllRawData');
            Route::post('/update', 'update')->name('CategoryUpdate');
            Route::get('/add', 'form')->name('CategoryAdd');
            Route::get('/{id}/show', 'show')->name('CategoryShow');
            Route::post('/{id}/delete', 'destroy')->name('CategoryDelete');
        });
    });

    Route::controller(App\Http\Controllers\UomBigController::class)->group(function() {
        Route::prefix('satuan-besar')->group(function() {
            Route::get('/list', 'index')->name('UomBig');
            Route::post('/getAllData', 'getAllData')->name('UomBigGetAllData');
            Route::get('/getAllRawData', 'getAllRawData')->name('UomBigGetAllRawData');
            Route::post('/update', 'update')->name('UomBigUpdate');
            Route::get('/add', 'form')->name('UomBigAdd');
            Route::get('/{id}/show', 'show')->name('UomBigShow');
            Route::post('/{id}/delete', 'destroy')->name('UomBigDelete');
        });
    });

    Route::controller(App\Http\Controllers\UomSmallController::class)->group(function() {
        Route::prefix('satuan-kecil')->group(function() {
            Route::get('/list', 'index')->name('UomSmall');
            Route::post('/getAllData', 'getAllData')->name('UomSmallGetAllData');
            Route::get('/getAllRawData', 'getAllRawData')->name('UomSmallGetAllRawData');
            Route::post('/update', 'update')->name('UomSmallUpdate');
            Route::get('/add', 'form')->name('UomSmallAdd');
            Route::get('/{id}/show', 'show')->name('UomSmallShow');
            Route::post('/{id}/delete', 'destroy')->name('UomSmallDelete');
        });
    });

    Route::controller(App\Http\Controllers\ItemController::class)->group(function() {
        Route::prefix('items')->group(function() {
            Route::get('/list', 'index')->name('Item');
            Route::post('/getAllData', 'getAllData')->name('ItemGetAllData');
            Route::post('/update', 'update')->name('ItemUpdate');
            Route::get('/add', 'form')->name('ItemAdd');
            Route::get('/{id}/show', 'show')->name('ItemShow');
            Route::get('/{barcode}/getByBarcode', 'getItem')->name('ItemByBarcode');
            Route::post('/{id}/delete', 'destroy')->name('ItemDelete');
        });
    });

    Route::controller(App\Http\Controllers\EntryItemController::class)->group(function() {
        Route::prefix('entry-item')->group(function() {
            Route::get('/form', 'form')->name('EntryItemForm');
            Route::post('/insert', 'store')->name('EntryItemStore');
        });
    });
});

require __DIR__.'/auth.php';
