interface SectionTitleProps {
  children: React.ReactNode
  className?: string
}

export default function SectionTitle({ children, className = '' }: SectionTitleProps) {
  return (
    <div className={`mb-12 ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        {children}
      </h2>
      <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent-dark rounded-full" />
    </div>
  )
}
