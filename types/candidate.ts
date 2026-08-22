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
