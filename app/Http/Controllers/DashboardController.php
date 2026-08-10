<?php

namespace App\Http\Controllers;

use App\Http\Requests\DashboardProfileUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Show the user's dashboard.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('dashboard', [
            'academics' => $request->user()->academics()->orderByDesc('start_date')->get(),
            'professions' => $request->user()->professions()->orderByDesc('start_date')->get(),
        ]);
    }

    /**
     * Update the user's profile information from the dashboard.
     */
    public function update(DashboardProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated())->save();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Profile updated.')]);

        return back();
    }
}
