export interface Experience {
  readonly company: string;
  readonly role: string;
  readonly startYear: number;
  readonly endYear?: number;
  readonly highlights: readonly string[];
}

export interface Project {
  readonly name: string;
  readonly description: string;
  readonly technologies: readonly string[];
}

export interface Ratings {
  readonly technical: number;
  readonly communication: number;
  readonly teamwork: number;
  readonly leadership: number;
}

export interface Candidate {
  readonly id: number;
  readonly name: string;
  readonly role: string;
  readonly skills: readonly string[];
  readonly tags: readonly string[];
  readonly experience: readonly Experience[];
  readonly projects?: readonly Project[];
  readonly ratings: Ratings;
  readonly reviews: readonly string[];
}
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
