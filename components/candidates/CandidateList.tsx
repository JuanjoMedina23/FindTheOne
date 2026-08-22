import { CandidateResult } from "../../types/search";
import { CandidateCard } from "./CandidateCard";

type Props = { candidates: CandidateResult[]; onSelect: (candidate: CandidateResult) => void };

export function CandidateList({ candidates, onSelect }: Props) {
  return (
    <>
      {candidates.map((candidate, index) => (
        <CandidateCard key={candidate.candidateId} candidate={candidate} index={index} onPress={() => onSelect(candidate)} />
      ))}
    </>
  );
}