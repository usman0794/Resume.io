import React from "react";
import AboutHero from "./components/AboutHero";
import StatsBar from "./components/StatsBar";
import TeamStatsSection from "./components/TeamStatsSection";

const AboutPage: React.FC = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }

      body {
        font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        background: #fff;
        color: #111827;
        -webkit-font-smoothing: antialiased;
      }
    `}</style>

    <main style={{ minHeight: "100vh", background: "#fff" }}>
      <AboutHero />
      <StatsBar />
      <TeamStatsSection />
    </main>
  </>
);

export default AboutPage;
