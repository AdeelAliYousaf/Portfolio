import Hero from "@/components/Hero";
import Origin from "@/components/Origin";
import Powers from "@/components/Powers";
import Missions from "@/components/Missions";
import CaseFiles from "@/components/CaseFiles";
import Training from "@/components/Training";
import TeamUp from "@/components/TeamUp";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <div className="tornDivider" aria-hidden="true" />
      <Origin />
      <div className="tornDivider" aria-hidden="true" />
      <Powers />
      <div className="tornDivider" aria-hidden="true" />
      <Missions />
      <div className="tornDivider" aria-hidden="true" />
      <CaseFiles />
      <div className="tornDivider" aria-hidden="true" />
      <Training />
      <div className="tornDivider" aria-hidden="true" />
      <TeamUp />
    </main>
  );
}
