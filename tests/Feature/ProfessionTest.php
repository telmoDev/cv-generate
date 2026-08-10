<?php

namespace Tests\Feature;

use App\Models\Profession;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProfessionTest extends TestCase
{
    use RefreshDatabase;

    public function test_a_profession_record_belongs_to_a_user(): void
    {
        $user = User::factory()->create();
        $profession = Profession::factory()->for($user)->create();

        $this->assertTrue($profession->user->is($user));
        $this->assertTrue($user->professions->contains($profession));
    }

    public function test_deleting_a_user_deletes_their_profession_records(): void
    {
        $user = User::factory()->create();
        $profession = Profession::factory()->for($user)->create();

        $user->delete();

        $this->assertDatabaseMissing('professions', ['id' => $profession->id]);
    }

    public function test_end_date_and_detail_are_nullable(): void
    {
        $profession = Profession::factory()->create([
            'end_date' => null,
            'detail' => null,
        ]);

        $this->assertNull($profession->end_date);
        $this->assertNull($profession->detail);
    }
}
