"use client";

import { useState } from "react";
import { ArrowBigUp, ArrowBigDown, Loader2 } from "lucide-react";

interface BlogVotingProps {
  blogId: string;
  initialVotes: {
    upvotes: number;
    downvotes: number;
  };
}

export function BlogVoting({ blogId, initialVotes }: BlogVotingProps) {
  const [votes, setVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState(0);
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (vote: number) => {
    if (isVoting) return;

    const previousVotes = { ...votes };
    const previousUserVote = userVote;
    const newUserVote = userVote === vote ? 0 : vote;
    const voteChange = newUserVote - userVote;

    setUserVote(newUserVote);
    setVotes((prev) => ({
      upvotes: prev.upvotes + (vote === 1 ? voteChange : vote === 1 && userVote === -1 ? voteChange * 2 : 0),
      downvotes: prev.downvotes + (vote === -1 ? voteChange : vote === -1 && userVote === 1 ? voteChange * 2 : 0),
    }));

    setIsVoting(true);

    try {
      const res = await fetch("/api/user/blogs/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId, vote: newUserVote }),
      });

      if (!res.ok) throw new Error("Vote failed");
    } catch {
      setVotes(previousVotes);
      setUserVote(previousUserVote);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 py-4">
      <button
        onClick={() => handleVote(1)}
        disabled={isVoting}
        className={`flex items-center gap-2 rounded-full border-2 border-outline px-4 py-2 font-medium transition-all duration-200 ${
          userVote === 1
            ? "bg-rose text-white border-rose shadow-crystal"
            : "bg-white text-slate-700 hover:bg-rose-soft hover:border-rose/30"
        } ${isVoting ? "opacity-50" : ""}`}
      >
        {isVoting && userVote !== 1 ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <ArrowBigUp className={`h-5 w-5 transition-transform ${userVote === 1 ? "" : "hover:scale-125"}`} />
        )}
        <span className="min-w-[24px] text-center">{votes.upvotes}</span>
      </button>

      <button
        onClick={() => handleVote(-1)}
        disabled={isVoting}
        className={`flex items-center gap-2 rounded-full border-2 border-outline px-4 py-2 font-medium transition-all duration-200 ${
          userVote === -1
            ? "bg-sky text-white border-sky shadow-crystal"
            : "bg-white text-slate-700 hover:bg-sky-soft hover:border-sky/30"
        } ${isVoting ? "opacity-50" : ""}`}
      >
        {isVoting && userVote !== -1 ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <ArrowBigDown className={`h-5 w-5 transition-transform ${userVote === -1 ? "" : "hover:scale-125"}`} />
        )}
        <span className="min-w-[24px] text-center">{votes.downvotes}</span>
      </button>
    </div>
  );
}