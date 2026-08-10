import { Form, Head, usePage } from '@inertiajs/react';
import PerfilController from '@/actions/App/Http/Controllers/PerfilController';
import AcademicForm from '@/components/academic-form';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import ProfessionForm from '@/components/profession-form';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { perfil } from '@/routes';
import type { Academic, Auth, Profession } from '@/types';

type PageProps = {
    auth: Auth;
};

export default function Perfil({
    academics,
    professions,
}: {
    academics: Academic[];
    professions: Profession[];
}) {
    const { auth } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Perfil" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-4">
                <Heading
                    variant="small"
                    title="Perfil"
                    description="Completa la información de tu perfil"
                />

                <Card>
                    <CardHeader>
                        <CardTitle>Información personal</CardTitle>
                        <CardDescription>
                            Rellena estos campos para construir tu CV.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Form
                            {...PerfilController.update.form()}
                            options={{ preserveScroll: true }}
                            className="space-y-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="first_name">
                                                Nombre
                                            </Label>

                                            <Input
                                                id="first_name"
                                                className="mt-1 block w-full"
                                                defaultValue={
                                                    auth.user.first_name ?? ''
                                                }
                                                name="first_name"
                                                autoComplete="given-name"
                                                placeholder="Nombre"
                                            />

                                            <InputError
                                                className="mt-2"
                                                message={errors.first_name}
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="last_name">
                                                Apellido
                                            </Label>

                                            <Input
                                                id="last_name"
                                                className="mt-1 block w-full"
                                                defaultValue={
                                                    auth.user.last_name ?? ''
                                                }
                                                name="last_name"
                                                autoComplete="family-name"
                                                placeholder="Apellido"
                                            />

                                            <InputError
                                                className="mt-2"
                                                message={errors.last_name}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="phone">
                                                Teléfono
                                            </Label>

                                            <Input
                                                id="phone"
                                                type="tel"
                                                className="mt-1 block w-full"
                                                defaultValue={
                                                    auth.user.phone ?? ''
                                                }
                                                name="phone"
                                                autoComplete="tel"
                                                placeholder="Teléfono"
                                            />

                                            <InputError
                                                className="mt-2"
                                                message={errors.phone}
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="country">
                                                País
                                            </Label>

                                            <Input
                                                id="country"
                                                className="mt-1 block w-full"
                                                defaultValue={
                                                    auth.user.country ?? ''
                                                }
                                                name="country"
                                                autoComplete="country-name"
                                                placeholder="País"
                                            />

                                            <InputError
                                                className="mt-2"
                                                message={errors.country}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="city">Ciudad</Label>

                                            <Input
                                                id="city"
                                                className="mt-1 block w-full"
                                                defaultValue={
                                                    auth.user.city ?? ''
                                                }
                                                name="city"
                                                autoComplete="address-level2"
                                                placeholder="Ciudad"
                                            />

                                            <InputError
                                                className="mt-2"
                                                message={errors.city}
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="address">
                                                Dirección
                                            </Label>

                                            <Input
                                                id="address"
                                                className="mt-1 block w-full"
                                                defaultValue={
                                                    auth.user.address ?? ''
                                                }
                                                name="address"
                                                autoComplete="street-address"
                                                placeholder="Dirección"
                                            />

                                            <InputError
                                                className="mt-2"
                                                message={errors.address}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <Button disabled={processing}>
                                            Guardar
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Formación académica</CardTitle>
                        <CardDescription>
                            Agrega tus estudios y cursos.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <AcademicForm academics={academics} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Experiencia profesional</CardTitle>
                        <CardDescription>
                            Agrega tu historial laboral.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <ProfessionForm professions={professions} />
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Perfil.layout = {
    breadcrumbs: [
        {
            title: 'Perfil',
            href: perfil(),
        },
    ],
};
