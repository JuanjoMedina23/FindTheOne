export interface CandidateExperience {
    company: string;
    role: string;
    years: number;
}

export interface CandidateRatings {
    leadership: number;
    teamwork: number;
    communication: number;
    responsibility: number;
}

export interface Candidate {
    id: number;
    name: string;
    role: string;
    skills: string[];
    tags: string[];
    experience: CandidateExperience[];
    ratings: CandidateRatings;
    reviews: string[];
}