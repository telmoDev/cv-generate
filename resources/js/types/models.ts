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

export type CvAnalysis = {
    job_title: string;
    summary: string;
    key_skills: string[];
    experience: {
        title: string;
        company: string;
        bullet_points: string[];
    }[];
    education: {
        title: string;
        institution: string;
    }[];
    missing_skills: string[];
    email_message: string;
};
