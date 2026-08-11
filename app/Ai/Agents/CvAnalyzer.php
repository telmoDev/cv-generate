<?php

namespace App\Ai\Agents;

use App\Models\User;
use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Ai\Attributes\Provider;
use Laravel\Ai\Contracts\Agent;
use Laravel\Ai\Contracts\HasStructuredOutput;
use Laravel\Ai\Enums\Lab;
use Laravel\Ai\Promptable;
use Stringable;

#[Provider(Lab::Gemini)]
class CvAnalyzer implements Agent, HasStructuredOutput
{
    use Promptable;

    public function __construct(public User $user) {}

    /**
     * Get the instructions that the agent should follow.
     */
    public function instructions(): Stringable|string
    {
        return <<<'PROMPT'
Eres un experto en optimización de CV para ATS (Applicant Tracking Systems) y en redacción de mensajes de presentación.

El usuario te envía un payload en JSON con sus datos personales, formación académica, experiencia profesional y el texto de una oferta de trabajo.

Analiza la oferta contra el perfil del usuario y devuelve EXCLUSIVAMENTE el structured output definido en tu esquema. No agregues texto, comentarios ni explicaciones fuera del esquema.

Reglas para el contenido:

- `job_title`: el título del puesto más probable de la oferta.
- `summary`: un resumen profesional breve (2-4 frases) optimizado para ATS, que integre las keywords y requisitos de la oferta con lo más relevante del perfil del usuario. Escrito en español.
- `key_skills`: las habilidades del perfil del usuario que hacen match con la oferta, expresadas con las mismas keywords/terminología que usa la oferta (para pasar filtros ATS).
- `experience`: reescribe las experiencias del usuario que aplican a la oferta. Para cada una, `title` y `company` originales y `bullet_points` (3-5) con verbos de acción y logros cuantificables cuando el detalle lo permita, integrando keywords de la oferta cuando sea honesto. Solo incluye experiencias relevantes; si ninguna aplica, devuelve un array vacío.
- `education`: la formación del usuario relevante para la oferta. Solo `title` e `institution`.
- `missing_skills`: habilidades pedidas en la oferta que el usuario no tiene, para que decida si las menciona. Si no hay carencias, array vacío.
- `email_message`: un mensaje de presentación en español, breve y profesional, para enviar por correo al reclutador junto con el CV. Dirigido a Recursos Humanos/Reclutamiento, menciona el puesto (`job_title`), destaca en 1-2 frases por qué el usuario encaja (sin inventar logros) y cierra con cortesía ofreciéndose para una entrevista. Sin saludo ni despedida personalizados (sin nombres), apto para copiar y pegar.

Sé honesto: nunca inventes experiencias, títulos ni logros que no estén en el perfil del usuario.
PROMPT;
    }

    /**
     * Get the agent's structured output schema definition.
     */
    public function schema(JsonSchema $schema): array
    {
        return [
            'job_title' => $schema->string()->required(),
            'summary' => $schema->string()->required(),
            'key_skills' => $schema->array()->items($schema->string())->required(),
            'experience' => $schema->array()->items(
                $schema->object(fn (JsonSchema $schema) => [
                    'title' => $schema->string()->required(),
                    'company' => $schema->string()->required(),
                    'bullet_points' => $schema->array()->items($schema->string())->required(),
                ])
            )->required(),
            'education' => $schema->array()->items(
                $schema->object(fn (JsonSchema $schema) => [
                    'title' => $schema->string()->required(),
                    'institution' => $schema->string()->required(),
                ])
            )->required(),
            'missing_skills' => $schema->array()->items($schema->string())->required(),
            'email_message' => $schema->string()->required(),
        ];
    }
}
