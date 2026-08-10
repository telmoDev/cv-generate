import { Form, router } from '@inertiajs/react';
import { useState } from 'react';
import AcademicController from '@/actions/App/Http/Controllers/AcademicController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Academic } from '@/types';

function formatDate(value: string | null): string {
    return value?.slice(0, 10) ?? 'Present';
}

export default function AcademicForm({ academics }: { academics: Academic[] }) {
    const [editing, setEditing] = useState<Academic | null>(null);

    const formProps = editing
        ? AcademicController.update.form(editing.id)
        : AcademicController.store.form();

    return (
        <div className="space-y-6">
            <Form
                key={editing?.id ?? 'create'}
                {...formProps}
                options={{ preserveScroll: true }}
                className="grid gap-4 sm:grid-cols-2"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>

                            <Input
                                id="title"
                                className="mt-1 block w-full"
                                name="title"
                                defaultValue={editing?.title ?? ''}
                                required
                                placeholder="Degree or course"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.title}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="institution">Institution</Label>

                            <Input
                                id="institution"
                                className="mt-1 block w-full"
                                name="institution"
                                defaultValue={editing?.institution ?? ''}
                                required
                                placeholder="University or school"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.institution}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="start_date">Start date</Label>

                            <Input
                                id="start_date"
                                type="date"
                                className="mt-1 block w-full"
                                name="start_date"
                                defaultValue={
                                    editing?.start_date.slice(0, 10) ?? ''
                                }
                                required
                            />

                            <InputError
                                className="mt-2"
                                message={errors.start_date}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="end_date">End date</Label>

                            <Input
                                id="end_date"
                                type="date"
                                className="mt-1 block w-full"
                                name="end_date"
                                defaultValue={
                                    editing?.end_date?.slice(0, 10) ?? ''
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors.end_date}
                            />
                        </div>

                        <div className="flex items-center gap-4 sm:col-span-2">
                            <Button disabled={processing}>
                                {editing ? 'Update' : 'Add'}
                            </Button>

                            {editing && (
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => setEditing(null)}
                                >
                                    Cancel
                                </Button>
                            )}
                        </div>
                    </>
                )}
            </Form>

            {academics.length > 0 && (
                <ul className="divide-y rounded-lg border border-sidebar-border/70 dark:border-sidebar-border">
                    {academics.map((academic) => (
                        <li
                            key={academic.id}
                            className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div>
                                <p className="font-medium">{academic.title}</p>
                                <p className="text-sm text-muted-foreground">
                                    {academic.institution}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {formatDate(academic.start_date)} -{' '}
                                    {formatDate(academic.end_date)}
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setEditing(academic)}
                                >
                                    Edit
                                </Button>

                                <Button
                                    variant="ghost"
                                    onClick={() =>
                                        router.delete(
                                            AcademicController.destroy(
                                                academic.id,
                                            ).url,
                                            { preserveScroll: true },
                                        )
                                    }
                                >
                                    Delete
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
