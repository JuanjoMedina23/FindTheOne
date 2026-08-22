import { SearchResponse } from "../types/search";

export const mockResults: SearchResponse = {
  requirements: {
    required: ["Python", "AI experience", "Software development"],
    preferred: ["Leadership", "Teamwork"],
  },
  results: [
    {
      candidateId: 1,
      name: "Ana Torres",
      role: "Software Engineer",
      initials: "AT",
      match: "strong_match",
      confidence: "high",
      skills: ["Python", "Machine Learning", "React", "PostgreSQL"],
      experience: "Software Developer · Coral · 2 years",
      review:
        "Demonstrated strong leadership, delivered work on time, and collaborated effectively across the development team.",
      summary:
        "Ana has strong technical alignment with the position and verified employer evidence supporting leadership and teamwork.",
      requirements: [
        {
          name: "Python",
          status: "supported",
          evidence: "Python appears in documented technical skills and previous development work.",
          source: "Skills + work experience",
        },
        {
          name: "AI experience",
          status: "supported",
          evidence: "Machine Learning is listed in skills and supported by a previous project record.",
          source: "Skills + project history",
        },
        {
          name: "Software development",
          status: "supported",
          evidence: "Two years of documented software development experience at Coral.",
          source: "Work experience",
        },
        {
          name: "Leadership",
          status: "supported",
          evidence: "Employer review explicitly describes strong leadership during project delivery.",
          source: "Employer review",
          rating: 4,
        },
        {
          name: "Teamwork",
          status: "supported",
          evidence: "Employer evaluation reports highly effective collaboration with the development team.",
          source: "Employer rating",
          rating: 5,
        },
      ],
    },
    {
      candidateId: 2,
      name: "Carlos Mendoza",
      role: "Full Stack Developer",
      initials: "CM",
      match: "good_match",
      confidence: "medium",
      skills: ["Python", "Node.js", "React", "Docker"],
      experience: "Full Stack Developer · Nexo Labs · 3 years",
      review:
        "Consistently contributed reliable backend work and communicated clearly with the product team.",
      summary:
        "Carlos is a good technical fit, but available employer evidence for AI experience and leadership is limited.",
      requirements: [
        {
          name: "Python",
          status: "supported",
          evidence: "Python is present in technical skills and backend work history.",
          source: "Skills + work experience",
        },
        {
          name: "AI experience",
          status: "partial",
          evidence: "The candidate mentions AI interest, but no verified AI project record was found.",
          source: "Claim vs evidence",
        },
        {
          name: "Software development",
          status: "supported",
          evidence: "Three years of documented full stack development experience.",
          source: "Work experience",
        },
        {
          name: "Leadership",
          status: "partial",
          evidence: "Leadership is self-reported; employer evidence is limited.",
          source: "Claim vs evidence",
          rating: 3,
        },
        {
          name: "Teamwork",
          status: "supported",
          evidence: "Employer review supports clear collaboration and communication.",
          source: "Employer review",
          rating: 4,
        },
      ],
    },
    {
      candidateId: 3,
      name: "Sofía Ruiz",
      role: "Data Analyst",
      initials: "SR",
      match: "partial_match",
      confidence: "medium",
      skills: ["Python", "SQL", "Data Visualization", "Statistics"],
      experience: "Data Analyst · Andina Insights · 2 years",
      review:
        "Excellent analytical rigor and reliable documentation practices across cross-functional projects.",
      summary:
        "Sofía has verified Python and teamwork evidence, but does not show enough evidence for the requested software engineering scope.",
      requirements: [
        {
          name: "Python",
          status: "supported",
          evidence: "Python is documented in analytics workflows and technical skills.",
          source: "Skills + work experience",
        },
        {
          name: "AI experience",
          status: "partial",
          evidence: "Statistics work is documented, but no specific AI implementation evidence was found.",
          source: "Evidence review",
        },
        {
          name: "Software development",
          status: "not_found",
          evidence: "No verified software engineering role or project evidence was found.",
          source: "Evidence review",
        },
        {
          name: "Leadership",
          status: "partial",
          evidence: "No direct leadership evidence was found in available evaluations.",
          source: "Evidence review",
          rating: 3,
        },
        {
          name: "Teamwork",
          status: "supported",
          evidence: "Employer feedback supports cross-functional collaboration.",
          source: "Employer review",
          rating: 4,
        },
      ],
    },
  ],
};