export type RatingKey = "leadership" | "teamwork" | "communication";

export interface DirectoryCandidate {
  id: number;
  name: string;
  role: string;
  initials: string;
  category: string;
  skills: string[];
  experience: string;
  company: string;
  ratings: Record<RatingKey, number>;
  review: string;
  verifiedSignals: number;
}