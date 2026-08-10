<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAcademicRequest;
use App\Http\Requests\UpdateAcademicRequest;
use App\Models\Academic;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AcademicController extends Controller
{
    /**
     * Store a newly created academic record.
     */
    public function store(StoreAcademicRequest $request): RedirectResponse
    {
        $request->user()->academics()->create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Academic record created.')]);

        return back();
    }

    /**
     * Update the specified academic record.
     */
    public function update(UpdateAcademicRequest $request, Academic $academic): RedirectResponse
    {
        abort_unless($request->user()->id === $academic->user_id, 403);

        $academic->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Academic record updated.')]);

        return back();
    }

    /**
     * Delete the specified academic record.
     */
    public function destroy(Request $request, Academic $academic): RedirectResponse
    {
        abort_unless($request->user()->id === $academic->user_id, 403);

        $academic->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Academic record deleted.')]);

        return back();
    }
}
