<?php

namespace Tests\Feature;

use App\Models\Academic;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AcademicCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_cannot_store_academic_records(): void
    {
        $this->post(route('academics.store'), [
            'title' => 'Computer Science',
        ])->assertRedirect(route('login'));
    }

    public function test_users_can_store_an_academic_record(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $this->post(route('academics.store'), [
            'title' => 'Computer Science',
            'institution' => 'MIT',
            'start_date' => '2018-09-01',
            'end_date' => '2022-06-30',
        ])->assertRedirect();

        $this->assertDatabaseHas('academics', [
            'user_id' => $user->id,
            'title' => 'Computer Science',
            'institution' => 'MIT',
            'start_date' => '2018-09-01',
            'end_date' => '2022-06-30',
        ]);
    }

    public function test_users_can_update_their_own_academic_record(): void
    {
        $user = User::factory()->create();
        $academic = Academic::factory()->for($user)->create();
        $this->actingAs($user);

        $this->patch(route('academics.update', $academic), [
            'title' => 'Updated title',
            'institution' => $academic->institution,
            'start_date' => $academic->start_date->format('Y-m-d'),
            'end_date' => null,
        ])->assertRedirect();

        $this->assertDatabaseHas('academics', [
            'id' => $academic->id,
            'title' => 'Updated title',
            'end_date' => null,
        ]);
    }

    public function test_users_cannot_update_another_users_academic_record(): void
    {
        $owner = User::factory()->create();
        $other = User::factory()->create();
        $academic = Academic::factory()->for($owner)->create();
        $this->actingAs($other);

        $this->patch(route('academics.update', $academic), [
            'title' => 'Hacked',
            'institution' => $academic->institution,
            'start_date' => $academic->start_date->format('Y-m-d'),
        ])->assertForbidden();
    }

    public function test_users_can_delete_their_own_academic_record(): void
    {
        $user = User::factory()->create();
        $academic = Academic::factory()->for($user)->create();
        $this->actingAs($user);

        $this->delete(route('academics.destroy', $academic))->assertRedirect();

        $this->assertDatabaseMissing('academics', ['id' => $academic->id]);
    }

    public function test_users_cannot_delete_another_users_academic_record(): void
    {
        $owner = User::factory()->create();
        $other = User::factory()->create();
        $academic = Academic::factory()->for($owner)->create();
        $this->actingAs($other);

        $this->delete(route('academics.destroy', $academic))->assertForbidden();

        $this->assertDatabaseHas('academics', ['id' => $academic->id]);
    }
}
