import { Header } from "@/components/Header";
import { CompareEmpty, CompareVisual } from "@/components/CompareVisual";
import { getNeighborhoodsByIds } from "@/lib/data";
import { rankNeighborhoods } from "@/lib/recommendation/engine";
import { DEFAULT_WEIGHTS } from "@/lib/recommendation/presets";

interface ComparePageProps {
  searchParams: Promise<{ ids?: string }>;
}

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const { ids } = await searchParams;
  const idList = ids?.split(",").filter(Boolean) ?? [];

  const neighborhoods = idList.length
    ? await getNeighborhoodsByIds(idList)
    : [];

  const ranked = rankNeighborhoods(neighborhoods, DEFAULT_WEIGHTS);

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <Header />

      <h2 className="mb-8 font-display text-3xl font-semibold tracking-tight text-apple-text">
        街区对比
      </h2>

      {ranked.length === 0 ? (
        <CompareEmpty />
      ) : (
        <CompareVisual neighborhoods={ranked} />
      )}
    </main>
  );
}
