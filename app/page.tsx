import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Problem } from "@/components/problem";
import { Features } from "@/components/features";
import { Capabilities } from "@/components/capabilities";
import { HowItWorks } from "@/components/how-it-works";
import { Stats } from "@/components/stats";
import { FireRiskIndex } from "@/components/fire-risk-index";
import { ActiveFires } from "@/components/active-fires";
import { FireImpactStats } from "@/components/fire-impact-stats";
import { WildfireNews } from "@/components/wildfire-news";
import { Team } from "@/components/team";
import { Awards } from "@/components/awards";
import { Press } from "@/components/press";
import { Partners } from "@/components/partners";
import { InstagramFeed } from "@/components/instagram";
import { BlogTeaser } from "@/components/blog-teaser";
import { FAQ } from "@/components/faq";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { SectionDots } from "@/components/ui/section-dots";
import { WhatsAppButton } from "@/components/whatsapp-button";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0c0b09]">
      <ScrollProgress />
      <SectionDots />
      <Navbar />
      <Hero />
      <Problem />
      <Features />
      <Capabilities />
      <HowItWorks />
      <Stats />
      <FireRiskIndex />
      <ActiveFires />
      <FireImpactStats />
      <WildfireNews />
      <Team />
      <Awards />
      <Press />
      <Partners />
      <InstagramFeed />
      <BlogTeaser />
      <FAQ />
      <CTA />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
