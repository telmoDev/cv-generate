<?php

namespace App\Http\Controllers;

use App\Ai\Agents\CvAnalyzer;
use App\Http\Requests\AnalyzeJobOfferRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Ai\Responses\StructuredAgentResponse;
use RuntimeException;
use Throwable;

class GenerarCvController extends Controller
{
    /**
     * Show the CV generation page.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('generar-cv', [
            'analysis' => $request->session()->get('analysis'),
        ]);
    }

    /**
     * Analyze the job offer against the user's profile.
     */
    public function analyze(AnalyzeJobOfferRequest $request): RedirectResponse
    {
        try {
            $response = (new CvAnalyzer($request->user()))->prompt($this->buildPromptPayload($request));

            if (! $response instanceof StructuredAgentResponse) {
                throw new RuntimeException('Unexpected agent response type.');
            }

            return redirect()
                ->back()
                ->with('analysis', $response->toArray())
                ->with('toast', ['type' => 'success', 'message' => __('CV generado correctamente.')]);
        } catch (Throwable $e) {
            Log::error('Failed to analyze job offer', [
                'user_id' => $request->user()?->getKey(),
                'error' => $e->getMessage(),
            ]);

            return redirect()
                ->back()
                ->with('toast', ['type' => 'error', 'message' => __('No se pudo analizar la oferta. Inténtalo de nuevo.')]);
        }
    }

    /**
     * Build the JSON payload sent to the agent.
     */
    private function buildPromptPayload(AnalyzeJobOfferRequest $request): string
    {
        $user = $request->user();

        $payload = json_encode([
            'user' => $user->only(['first_name', 'last_name', 'phone', 'country', 'city', 'address']),
            'academics' => $user->academics()->orderByDesc('start_date')->get(['title', 'institution', 'start_date', 'end_date']),
            'professions' => $user->professions()->orderByDesc('start_date')->get(['company', 'title', 'detail', 'start_date', 'end_date']),
            'job_offer' => $request->validated('job_offer'),
        ], JSON_UNESCAPED_UNICODE);

        if ($payload === false) {
            throw new RuntimeException('No se pudo construir el payload de la oferta.');
        }

        return $payload;
    }
}
