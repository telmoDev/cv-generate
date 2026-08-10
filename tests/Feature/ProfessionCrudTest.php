<?php

namespace Tests\Feature;

use App\Models\Profession;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProfessionCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_cannot_store_profession_records(): void
    {
        $this->post(route('professions.store'), [
            'title' => 'Developer',
        ])->assertRedirect(route('login'));
    }

    public function test_users_can_store_a_profession_record(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $this->post(route('professions.store'), [
            'company' => 'Acme Corp',
            'title' => 'Software Engineer',
            'detail' => 'Built the API.',
            'start_date' => '2020-01-15',
            'end_date' => '2023-12-31',
        ])->assertRedirect();

        $this->assertDatabaseHas('professions', [
            'user_id' => $user->id,
            'company' => 'Acme Corp',
            'title' => 'Software Engineer',
            'detail' => 'Built the API.',
            'start_date' => '2020-01-15',
            'end_date' => '2023-12-31',
        ]);
    }

    public function test_users_can_update_their_own_profession_record(): void
    {
        $user = User::factory()->create();
        $profession = Profession::factory()->for($user)->create();
        $this->actingAs($user);

        $this->patch(route('professions.update', $profession), [
            'company' => 'Updated Corp',
            'title' => $profession->title,
            'detail' => $profession->detail,
            'start_date' => $profession->start_date->format('Y-m-d'),
            'end_date' => null,
        ])->assertRedirect();

        $this->assertDatabaseHas('professions', [
            'id' => $profession->id,
            'company' => 'Updated Corp',
            'end_date' => null,
        ]);
    }

    public function test_users_cannot_update_another_users_profession_record(): void
    {
        $owner = User::factory()->create();
        $other = User::factory()->create();
        $profession = Profession::factory()->for($owner)->create();
        $this->actingAs($other);

        $this->patch(route('professions.update', $profession), [
            'company' => 'Hacked',
            'title' => $profession->title,
            'start_date' => $profession->start_date->format('Y-m-d'),
        ])->assertForbidden();
    }

    public function test_users_can_delete_their_own_profession_record(): void
    {
        $user = User::factory()->create();
        $profession = Profession::factory()->for($user)->create();
        $this->actingAs($user);

        $this->delete(route('professions.destroy', $profession))->assertRedirect();

        $this->assertDatabaseMissing('professions', ['id' => $profession->id]);
    }

    public function test_users_cannot_delete_another_users_profession_record(): void
    {
        $owner = User::factory()->create();
        $other = User::factory()->create();
        $profession = Profession::factory()->for($owner)->create();
        $this->actingAs($other);

        $this->delete(route('professions.destroy', $profession))->assertForbidden();

        $this->assertDatabaseHas('professions', ['id' => $profession->id]);
    }
}
