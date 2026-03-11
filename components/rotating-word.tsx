"use client"
import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"

const words = ["TERRITORIO", "BOSQUE", "FAUNA", "ECONOMÍA", "FUTURO", "PATAGONIA"]

export function RotatingWord() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="overflow-hidden h-[1.2em] flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="block text-green-400 font-bold"
          style={{ fontSize: "inherit", lineHeight: "1.2" }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
