<?php

namespace Tests\Feature;

use App\Models\Academic;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AcademicTest extends TestCase
{
    use RefreshDatabase;

    public function test_an_academic_record_belongs_to_a_user(): void
    {
        $user = User::factory()->create();
        $academic = Academic::factory()->for($user)->create();

        $this->assertTrue($academic->user->is($user));
        $this->assertTrue($user->academics->contains($academic));
    }

    public function test_deleting_a_user_deletes_their_academic_records(): void
    {
        $user = User::factory()->create();
        $academic = Academic::factory()->for($user)->create();

        $user->delete();

        $this->assertDatabaseMissing('academics', ['id' => $academic->id]);
    }

    public function test_end_date_is_nullable(): void
    {
        $academic = Academic::factory()->create(['end_date' => null]);

        $this->assertNull($academic->end_date);
    }
}
