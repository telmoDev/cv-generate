import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';
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

export default function GenerarCv() {
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

                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="job_offer">Oferta de trabajo</Label>

                            <textarea
                                id="job_offer"
                                name="job_offer"
                                className="flex min-h-[200px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                placeholder="Pega aquí la descripción de la oferta de trabajo..."
                            />
                        </div>

                        <Button type="button">Generar CV</Button>
                    </CardContent>
                </Card>
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
