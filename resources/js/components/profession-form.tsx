import { Form, router } from '@inertiajs/react';
import { useState } from 'react';
import ProfessionController from '@/actions/App/Http/Controllers/ProfessionController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Profession } from '@/types';

function formatDate(value: string | null): string {
    return value?.slice(0, 10) ?? 'Present';
}

export default function ProfessionForm({
    professions,
}: {
    professions: Profession[];
}) {
    const [editing, setEditing] = useState<Profession | null>(null);

    const formProps = editing
        ? ProfessionController.update.form(editing.id)
        : ProfessionController.store.form();

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
                            <Label htmlFor="company">Company</Label>

                            <Input
                                id="company"
                                className="mt-1 block w-full"
                                name="company"
                                defaultValue={editing?.company ?? ''}
                                required
                                placeholder="Company name"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.company}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>

                            <Input
                                id="title"
                                className="mt-1 block w-full"
                                name="title"
                                defaultValue={editing?.title ?? ''}
                                required
                                placeholder="Job title"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.title}
                            />
                        </div>

                        <div className="grid gap-2 sm:col-span-2">
                            <Label htmlFor="detail">Detail</Label>

                            <textarea
                                id="detail"
                                name="detail"
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                defaultValue={editing?.detail ?? ''}
                                placeholder="Describe your responsibilities and achievements"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.detail}
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

            {professions.length > 0 && (
                <ul className="divide-y rounded-lg border border-sidebar-border/70 dark:border-sidebar-border">
                    {professions.map((profession) => (
                        <li
                            key={profession.id}
                            className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div>
                                <p className="font-medium">
                                    {profession.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {profession.company}
                                </p>
                                {profession.detail && (
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {profession.detail}
                                    </p>
                                )}
                                <p className="text-sm text-muted-foreground">
                                    {formatDate(profession.start_date)} -{' '}
                                    {formatDate(profession.end_date)}
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setEditing(profession)}
                                >
                                    Edit
                                </Button>

                                <Button
                                    variant="ghost"
                                    onClick={() =>
                                        router.delete(
                                            ProfessionController.destroy(
                                                profession.id,
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
