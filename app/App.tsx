"use client";

import BinomialChart from "@/components/charts/BinomialChart";
import ConvergenceChart from "@/components/charts/ConvergenceChart";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import SimulationInfo from "@/components/simulation/SimulationInfo";
import SimulationPanel from "@/components/simulation/SimulationPanel";
import { useSimulation } from "@/hooks/useSimulation";

export default function App() {
  const sim = useSimulation();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Mobile: título → moeda → controles → convergência → binomial → explicações */}
      <Header />

      <main className="mt-6 flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:items-start">
        <div className="min-w-0 lg:col-span-5">
          <SimulationPanel sim={sim} />
        </div>

        <div className="flex min-w-0 flex-col gap-6 lg:col-span-7">
          <ConvergenceChart
            data={sim.convergence}
            total={sim.total}
            heads={sim.heads}
            probability={sim.probability}
            logScale={sim.logScale}
            onToggleScale={sim.toggleLogScale}
          />
          <BinomialChart
            points={sim.binomial}
            total={sim.total}
            heads={sim.heads}
            probability={sim.probability}
          />
        </div>
      </main>

      <SimulationInfo
        total={sim.total}
        heads={sim.heads}
        tails={sim.tails}
        probability={sim.probability}
      />

      <Footer />
    </div>
  );
}