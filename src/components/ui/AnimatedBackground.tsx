'use client'

import { motion } from 'framer-motion'

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Static gradient blurs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-[128px]" />
      <div className="absolute top-3/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-[100px]" />

      {/* Main morphing blob */}
      <motion.div
        className="absolute top-[20%] right-[10%] w-[500px] h-[500px] opacity-30"
        animate={{
          scale: [1, 1.2, 1.1, 1],
          rotate: [0, 90, 180, 270, 360],
          borderRadius: [
            "30% 70% 70% 30% / 30% 30% 70% 70%",
            "70% 30% 30% 70% / 70% 70% 30% 30%",
            "30% 70% 70% 30% / 70% 30% 70% 30%",
            "70% 30% 30% 70% / 30% 70% 30% 70%",
            "30% 70% 70% 30% / 30% 30% 70% 70%",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "linear-gradient(135deg, rgba(0, 246, 255, 0.4) 0%, rgba(0, 180, 200, 0.1) 50%, transparent 100%)",
          filter: "blur(60px)",
        }}
      />

      {/* Secondary morphing blob - middle of page */}
      <motion.div
        className="absolute top-[60%] left-[5%] w-[400px] h-[400px] opacity-20"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 80, 0],
          y: [0, -50, 0],
          borderRadius: [
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "30% 60% 70% 40% / 50% 60% 30% 60%",
            "60% 40% 30% 70% / 60% 30% 70% 40%",
          ],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "radial-gradient(circle, rgba(0, 246, 255, 0.5) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Third blob - bottom area */}
      <motion.div
        className="absolute top-[120%] right-[20%] w-[350px] h-[350px] opacity-25"
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, -45, 0],
          borderRadius: [
            "40% 60% 60% 40% / 40% 40% 60% 60%",
            "60% 40% 40% 60% / 60% 60% 40% 40%",
            "40% 60% 60% 40% / 40% 40% 60% 60%",
          ],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "linear-gradient(45deg, rgba(0, 246, 255, 0.3) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      {/* Orbiting ring */}
      <motion.div
        className="absolute top-[40%] left-1/2 w-[700px] h-[700px] -translate-x-1/2 rounded-full border border-accent/5 opacity-40"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <motion.div
          className="absolute -top-2 left-1/2 w-4 h-4 rounded-full bg-accent/50"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 -right-2 w-3 h-3 rounded-full bg-accent/40"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </motion.div>

      {/* Floating particles - reduced for less distraction */}
      <motion.div
        className="absolute top-[20%] right-[25%] w-3 h-3 rounded-full bg-accent/30"
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[65%] left-[20%] w-2 h-2 rounded-full bg-accent/25"
        animate={{ y: [0, 15, 0], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  )
}
