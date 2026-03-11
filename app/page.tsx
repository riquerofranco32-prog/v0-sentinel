import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Problem } from "@/components/problem"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { Stats } from "@/components/stats"
import { UseCases } from "@/components/use-cases"
import { Team } from "@/components/team"
import { Awards } from "@/components/awards"
import { FAQ } from "@/components/faq"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"
import { ScrollProgress } from "@/components/scroll-progress"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#151613]">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Problem />
      <Features />
      <HowItWorks />
      <Stats />
      <UseCases />
      <Team />
      <Awards />
      <FAQ />
      <CTA />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
