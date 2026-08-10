<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardProfileTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_cannot_update_profile_from_dashboard(): void
    {
        $this->patch(route('dashboard.update'), [
            'first_name' => 'Telmo',
        ])->assertRedirect(route('login'));
    }

    public function test_authenticated_users_can_update_their_profile_fields(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $this->patch(route('dashboard.update'), [
            'first_name' => 'Telmo',
            'last_name' => 'Ramirez',
            'phone' => '555-1234',
            'country' => 'Spain',
            'city' => 'Madrid',
            'address' => 'Calle Falsa 123',
        ])->assertRedirect();

        $user->refresh();

        $this->assertSame('Telmo', $user->first_name);
        $this->assertSame('Ramirez', $user->last_name);
        $this->assertSame('555-1234', $user->phone);
        $this->assertSame('Spain', $user->country);
        $this->assertSame('Madrid', $user->city);
        $this->assertSame('Calle Falsa 123', $user->address);
    }

    public function test_profile_fields_can_be_cleared(): void
    {
        $user = User::factory()->create([
            'first_name' => 'Telmo',
            'phone' => '555-1234',
        ]);
        $this->actingAs($user);

        $this->patch(route('dashboard.update'), [
            'first_name' => null,
            'phone' => null,
        ])->assertRedirect();

        $user->refresh();

        $this->assertNull($user->first_name);
        $this->assertNull($user->phone);
    }
}
