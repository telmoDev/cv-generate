<?php

use App\Http\Controllers\AcademicController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PerfilController;
use App\Http\Controllers\ProfessionController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('perfil', [PerfilController::class, 'index'])->name('perfil');
    Route::patch('perfil', [PerfilController::class, 'update'])->name('perfil.update');

    Route::post('academics', [AcademicController::class, 'store'])->name('academics.store');
    Route::patch('academics/{academic}', [AcademicController::class, 'update'])->name('academics.update');
    Route::delete('academics/{academic}', [AcademicController::class, 'destroy'])->name('academics.destroy');

    Route::post('professions', [ProfessionController::class, 'store'])->name('professions.store');
    Route::patch('professions/{profession}', [ProfessionController::class, 'update'])->name('professions.update');
    Route::delete('professions/{profession}', [ProfessionController::class, 'destroy'])->name('professions.destroy');
});

require __DIR__.'/settings.php';
