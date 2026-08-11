<?php

namespace Tests\Feature;

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
}
