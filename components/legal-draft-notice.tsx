export function LegalDraftNotice() {
  return (
    <div
      role="note"
      className="border-l-2 border-[#C9A227] bg-[#E8E5DC] p-6 text-sm leading-7 text-[#0B0E13]"
    >
      <strong className="block font-mono text-[11px] uppercase tracking-[.2em] text-[#8C6D14]">
        Draft — Not For Publication
      </strong>
      <p className="mt-2 text-[#4E5561]">
        This document is incomplete, contains items requiring confirmation and has not been represented as reviewed or approved by legal counsel. Obtain qualified professional review before publication.
      </p>
    </div>
  );
}
