<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProfessionRequest;
use App\Http\Requests\UpdateProfessionRequest;
use App\Models\Profession;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfessionController extends Controller
{
    /**
     * Store a newly created profession record.
     */
    public function store(StoreProfessionRequest $request): RedirectResponse
    {
        $request->user()->professions()->create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Profession record created.')]);

        return back();
    }

    /**
     * Update the specified profession record.
     */
    public function update(UpdateProfessionRequest $request, Profession $profession): RedirectResponse
    {
        abort_unless($request->user()->id === $profession->user_id, 403);

        $profession->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Profession record updated.')]);

        return back();
    }

    /**
     * Delete the specified profession record.
     */
    public function destroy(Request $request, Profession $profession): RedirectResponse
    {
        abort_unless($request->user()->id === $profession->user_id, 403);

        $profession->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Profession record deleted.')]);

        return back();
    }
}
