export type Academic = {
    id: number;
    user_id: number;
    title: string;
    institution: string;
    start_date: string;
    end_date: string | null;
    created_at: string;
    updated_at: string;
};

export type Profession = {
    id: number;
    user_id: number;
    company: string;
    title: string;
    detail: string | null;
    start_date: string;
    end_date: string | null;
    created_at: string;
    updated_at: string;
};
