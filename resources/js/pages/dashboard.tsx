import { Form, Head, usePage } from '@inertiajs/react';
import DashboardController from '@/actions/App/Http/Controllers/DashboardController';
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
import { dashboard } from '@/routes';
import type { Academic, Auth, Profession } from '@/types';

type PageProps = {
    auth: Auth;
    academics: Academic[];
    professions: Profession[];
};

export default function Dashboard({
    academics,
    professions,
}: {
    academics: Academic[];
    professions: Profession[];
}) {
    const { auth } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-4">
                <Heading
                    variant="small"
                    title="Profile"
                    description="Complete your profile information"
                />

                <Card>
                    <CardHeader>
                        <CardTitle>Personal information</CardTitle>
                        <CardDescription>
                            Fill in these fields to build your CV.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Form
                            {...DashboardController.update.form()}
                            options={{ preserveScroll: true }}
                            className="space-y-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="first_name">
                                                First name
                                            </Label>

                                            <Input
                                                id="first_name"
                                                className="mt-1 block w-full"
                                                defaultValue={
                                                    auth.user.first_name ?? ''
                                                }
                                                name="first_name"
                                                autoComplete="given-name"
                                                placeholder="First name"
                                            />

                                            <InputError
                                                className="mt-2"
                                                message={errors.first_name}
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="last_name">
                                                Last name
                                            </Label>

                                            <Input
                                                id="last_name"
                                                className="mt-1 block w-full"
                                                defaultValue={
                                                    auth.user.last_name ?? ''
                                                }
                                                name="last_name"
                                                autoComplete="family-name"
                                                placeholder="Last name"
                                            />

                                            <InputError
                                                className="mt-2"
                                                message={errors.last_name}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="phone">Phone</Label>

                                            <Input
                                                id="phone"
                                                type="tel"
                                                className="mt-1 block w-full"
                                                defaultValue={
                                                    auth.user.phone ?? ''
                                                }
                                                name="phone"
                                                autoComplete="tel"
                                                placeholder="Phone number"
                                            />

                                            <InputError
                                                className="mt-2"
                                                message={errors.phone}
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="country">
                                                Country
                                            </Label>

                                            <Input
                                                id="country"
                                                className="mt-1 block w-full"
                                                defaultValue={
                                                    auth.user.country ?? ''
                                                }
                                                name="country"
                                                autoComplete="country-name"
                                                placeholder="Country"
                                            />

                                            <InputError
                                                className="mt-2"
                                                message={errors.country}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="city">City</Label>

                                            <Input
                                                id="city"
                                                className="mt-1 block w-full"
                                                defaultValue={
                                                    auth.user.city ?? ''
                                                }
                                                name="city"
                                                autoComplete="address-level2"
                                                placeholder="City"
                                            />

                                            <InputError
                                                className="mt-2"
                                                message={errors.city}
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="address">
                                                Address
                                            </Label>

                                            <Input
                                                id="address"
                                                className="mt-1 block w-full"
                                                defaultValue={
                                                    auth.user.address ?? ''
                                                }
                                                name="address"
                                                autoComplete="street-address"
                                                placeholder="Street address"
                                            />

                                            <InputError
                                                className="mt-2"
                                                message={errors.address}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <Button disabled={processing}>
                                            Save
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Academic experience</CardTitle>
                        <CardDescription>
                            Add your education and courses.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <AcademicForm academics={academics} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Professional experience</CardTitle>
                        <CardDescription>
                            Add your work history.
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

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
