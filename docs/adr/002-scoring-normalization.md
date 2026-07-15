# ADR 002: Within-city score normalization (not collaborative filtering)

## Status

Accepted

## Context

Neighborhood “expert” scores are hand-authored 1–10 intuitions. Absolute values are **not comparable across cities** (Tokyo transit 8 ≠ Beijing transit 8 in the same psychometric sense). A plain weighted average therefore over-claims precision.

Building true ML ranking (collaborative filtering / learning-to-rank) would require labeled user outcomes we do not have. Inventing an “AI recommender” narrative would fail under interview scrutiny.

## Decision

1. **Default ranking** min–max normalizes each dimension **within the selected city** to a 1–10 range, then applies the user’s 7 weights (`normalize: true`).
2. **Legacy snapshotted tests** keep `normalize: false` so the original v1 ordering stays locked for regressions.
3. Offline script `npm run test:ranking` prints Top-3 per persona for human/CI diffs.
4. UI explains matches via top contribution dimensions and whether café/transit/shopping used live POI vs static experts.

We explicitly **do not** ship collaborative filtering until we have preference outcome data.

## Consequences

**Positive**

- Honest story: relative within-city fit, not absolute “truth scores”
- Still simple enough to derive on a whiteboard
- Explainability + provenance (static vs POI) show product judgment

**Negative / trade-offs**

- Normalization can flatten cities with little score variance
- Cross-city “best neighborhood worldwide” remains invalid by design
- Expert scores still need curation; normalization does not fix bad labels
