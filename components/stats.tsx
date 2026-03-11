"use client"

import { useEffect, useRef, useState } from "react"
import { Flame, Clock, Trees, Trophy } from "lucide-react"

const stats = [
  {
    icon: Flame,
    value: 95,
    suffix: "%",
    label: "Precisión en detección",
  },
  {
    icon: Clock,
    value: 60,
    suffix: "%",
    label: "Reducción en tiempo de respuesta",
  },
  {
    icon: Trees,
    value: 10000,
    suffix: " ha",
    label: "Cobertura por vuelo",
  },
  {
    icon: Trophy,
    value: 700,
    suffix: "+",
    label: "Propuestas superadas (BNA 2025)",
  },
]

function AnimatedCounter({
  value,
  suffix,
  isVisible,
}: {
  value: number
  suffix: string
  isVisible: boolean
}) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return
    hasAnimated.current = true

    const duration = 2000
    const startTime = Date.now()
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = Math.floor(value * easeOutQuart)
      
      setCount(currentValue)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(value)
      }
    }
    
    requestAnimationFrame(animate)
  }, [isVisible, value])

  return (
    <span>
      {count.toLocaleString("es-AR")}
      {suffix}
    </span>
  )
}

export function Stats() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const hasTriggered = useRef(false)

  useEffect(() => {
    const currentRef = sectionRef.current
    if (!currentRef) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggered.current) {
            hasTriggered.current = true
            setIsVisible(true)
          }
        })
      },
      { 
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
      }
    )

    observer.observe(currentRef)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-16 lg:py-24 bg-[#004f39]"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-[#FFFACA]/10 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-[#FFFACA]" />
                </div>
              </div>
              <div
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FFFACA] mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  isVisible={isVisible}
                />
              </div>
              <p className="text-[#FFFACA]/70 text-sm sm:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
