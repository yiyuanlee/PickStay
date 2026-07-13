import Link from "next/link";
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { getNeighborhoodsByIds } from "@/lib/data";
import { rankNeighborhoods } from "@/lib/recommendation/engine";
import { DEFAULT_WEIGHTS } from "@/lib/recommendation/presets";
import { DIMENSION_KEYS } from "@/lib/recommendation/types";

const DIM_LABELS: Record<string, string> = {
  budget: "💰 预算",
  safety: "🛡️ 安全",
  transit: "🚇 交通",
  shopping: "🛍️ 购物",
  nightlife: "✨ 夜生活",
  quiet: "🤫 安静",
  cafe: "☕ 咖啡",
};

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
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <Header />

      <h2 className="mb-6 text-2xl font-bold text-slate-800">街区对比</h2>

      {ranked.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-slate-500">
            <p className="mb-4">请先选择 2-3 个街区进行对比</p>
            <Link href="/explore/tokyo" className="text-teal-600 hover:underline">
              前往探索 →
            </Link>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="overflow-x-auto p-6">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-b border-black/5">
                  <th className="py-3 text-left text-slate-500">维度</th>
                  {ranked.map((n) => (
                    <th key={n.id} className="px-4 py-3 text-left font-bold text-slate-800">
                      {n.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-black/5 bg-teal-50/50">
                  <td className="py-3 font-medium">契合度 (默认权重)</td>
                  {ranked.map((n) => (
                    <td key={n.id} className="px-4 py-3 font-bold text-teal-700">
                      {n.matchScore}%
                    </td>
                  ))}
                </tr>
                {DIMENSION_KEYS.map((key) => (
                  <tr key={key} className="border-b border-black/5">
                    <td className="py-3 text-slate-600">{DIM_LABELS[key]}</td>
                    {ranked.map((n) => (
                      <td key={n.id} className="px-4 py-3">
                        {n.computedScores[key]}/10
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="py-3 text-slate-600">价位</td>
                  {ranked.map((n) => (
                    <td key={n.id} className="px-4 py-3 text-slate-600">
                      {n.priceLevel}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
