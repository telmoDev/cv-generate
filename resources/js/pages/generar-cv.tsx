import { Head, useForm } from '@inertiajs/react';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { generarCv } from '@/routes';
import { analyze } from '@/routes/generar-cv';
import type { CvAnalysis } from '@/types';

const textareaClass =
    'flex min-h-[200px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm';

export default function GenerarCv({
    analysis,
}: {
    analysis?: CvAnalysis | null;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        job_offer: '',
    });

    const [copied, setCopied] = useState(false);

    function submit(e: React.FormEvent) {
        e.preventDefault();

        post(analyze.url(), {
            onSuccess: () => reset('job_offer'),
        });
    }

    async function copyMessage() {
        if (!analysis) {
            return;
        }

        await navigator.clipboard.writeText(analysis.email_message);
        setCopied(true);
        toast.success('Mensaje copiado al portapapeles');
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <>
            <Head title="Generar CV" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-4">
                <Heading
                    variant="small"
                    title="Generar CV"
                    description="Pega la oferta de trabajo para personalizar tu CV."
                />

                <Card>
                    <CardHeader>
                        <CardTitle>Oferta de trabajo</CardTitle>
                        <CardDescription>
                            Copia y pega la descripción de la oferta a la que
                            quieres postularte.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="job_offer">
                                    Oferta de trabajo
                                </Label>

                                <textarea
                                    id="job_offer"
                                    name="job_offer"
                                    className={textareaClass}
                                    value={data.job_offer}
                                    onChange={(e) =>
                                        setData('job_offer', e.target.value)
                                    }
                                    placeholder="Pega aquí la descripción de la oferta de trabajo..."
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.job_offer}
                                />
                            </div>

                            <Button disabled={processing}>
                                {processing ? 'Analizando...' : 'Generar CV'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {analysis && (
                    <>
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    {analysis.job_title || 'Resumen del puesto'}
                                </CardTitle>
                                <CardDescription>
                                    Resumen profesional optimizado para ATS.
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <p className="text-sm leading-relaxed text-foreground">
                                    {analysis.summary}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Habilidades clave</CardTitle>
                                <CardDescription>
                                    Habilidades de tu perfil que hacen match con
                                    la oferta.
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="flex flex-wrap gap-2">
                                {analysis.key_skills.map((skill) => (
                                    <Badge key={skill} variant="secondary">
                                        {skill}
                                    </Badge>
                                ))}
                            </CardContent>
                        </Card>

                        {analysis.experience.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Experiencia</CardTitle>
                                    <CardDescription>
                                        Experiencias reescritas para la oferta.
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-6">
                                    {analysis.experience.map((exp) => (
                                        <div
                                            key={`${exp.company}-${exp.title}`}
                                        >
                                            <p className="font-medium">
                                                {exp.title}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {exp.company}
                                            </p>
                                            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                                                {exp.bullet_points.map(
                                                    (point) => (
                                                        <li key={point}>
                                                            {point}
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        )}

                        {analysis.education.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Formación</CardTitle>
                                </CardHeader>

                                <CardContent className="space-y-2">
                                    {analysis.education.map((edu) => (
                                        <div
                                            key={`${edu.institution}-${edu.title}`}
                                        >
                                            <p className="font-medium">
                                                {edu.title}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {edu.institution}
                                            </p>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        )}

                        {analysis.missing_skills.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Habilidades faltantes</CardTitle>
                                    <CardDescription>
                                        Requisitos de la oferta que no están en
                                        tu perfil.
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="flex flex-wrap gap-2">
                                    {analysis.missing_skills.map((skill) => (
                                        <Badge key={skill} variant="outline">
                                            {skill}
                                        </Badge>
                                    ))}
                                </CardContent>
                            </Card>
                        )}

                        <Card>
                            <CardHeader>
                                <CardTitle>Mensaje para el correo</CardTitle>
                                <CardDescription>
                                    Copia este mensaje y pégalo en el correo que
                                    envíes con tu CV.
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <textarea
                                    readOnly
                                    className={`${textareaClass} min-h-[120px]`}
                                    value={analysis.email_message}
                                />

                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={copyMessage}
                                >
                                    {copied ? (
                                        <Check className="size-4" />
                                    ) : (
                                        <Copy className="size-4" />
                                    )}
                                    {copied ? 'Copiado' : 'Copiar'}
                                </Button>
                            </CardContent>
                        </Card>
                    </>
                )}
            </div>
        </>
    );
}

GenerarCv.layout = {
    breadcrumbs: [
        {
            title: 'Generar CV',
            href: generarCv(),
        },
    ],
};
