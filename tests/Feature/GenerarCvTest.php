<?php

namespace Tests\Feature;

use App\Ai\Agents\CvAnalyzer;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GenerarCvTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page()
    {
        $response = $this->get(route('generar-cv'));
        $response->assertRedirect(route('login'));
    }

    public function test_authenticated_users_can_visit_the_generar_cv_page()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->get(route('generar-cv'));
        $response->assertOk();
    }

    public function test_job_offer_is_required()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->post(route('generar-cv.analyze'), [
            'job_offer' => '',
        ]);

        $response->assertSessionHasErrors('job_offer');
        CvAnalyzer::assertNeverPrompted();
    }

    public function test_job_offer_is_analyzed_and_returns_structured_data()
    {
        CvAnalyzer::fake([
            [
                'job_title' => 'Desarrollador Laravel',
                'summary' => 'Resumen profesional optimizado para ATS.',
                'key_skills' => ['Laravel', 'PHP', 'APIs REST'],
                'experience' => [
                    [
                        'title' => 'Backend Developer',
                        'company' => 'Acme Inc.',
                        'bullet_points' => ['Construí APIs REST con Laravel.'],
                    ],
                ],
                'education' => [
                    [
                        'title' => 'Ingeniería Informática',
                        'institution' => 'Universidad Nacional',
                    ],
                ],
                'missing_skills' => ['Docker'],
                'email_message' => 'Estimado equipo de reclutamiento, me interesa el puesto de Desarrollador Laravel.',
            ],
        ]);

        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->post(route('generar-cv.analyze'), [
            'job_offer' => 'Buscamos un Desarrollador Laravel con experiencia en PHP, APIs REST y bases de datos.',
        ]);

        $response->assertRedirect();

        $response->assertSessionHas('analysis', [
            'job_title' => 'Desarrollador Laravel',
            'summary' => 'Resumen profesional optimizado para ATS.',
            'key_skills' => ['Laravel', 'PHP', 'APIs REST'],
            'experience' => [
                [
                    'title' => 'Backend Developer',
                    'company' => 'Acme Inc.',
                    'bullet_points' => ['Construí APIs REST con Laravel.'],
                ],
            ],
            'education' => [
                [
                    'title' => 'Ingeniería Informática',
                    'institution' => 'Universidad Nacional',
                ],
            ],
            'missing_skills' => ['Docker'],
            'email_message' => 'Estimado equipo de reclutamiento, me interesa el puesto de Desarrollador Laravel.',
        ]);

        CvAnalyzer::assertPrompted(fn ($prompt) => str_contains($prompt->prompt, 'Buscamos un Desarrollador Laravel'));
    }

    public function test_agent_failure_redirects_back_with_an_error_toast()
    {
        CvAnalyzer::fake(function (): never {
            throw new \RuntimeException('AI provider unavailable');
        });

        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->post(route('generar-cv.analyze'), [
            'job_offer' => 'Oferta de trabajo suficientemente larga para pasar la validación.',
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('toast', fn ($toast) => $toast['type'] === 'error');
    }
}
