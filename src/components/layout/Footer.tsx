import GradientText from '../ui/GradientText'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary border-t border-white/5 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-2xl font-bold mb-2">
              <GradientText>KRY8</GradientText>
            </span>
            <p className="text-text-secondary text-sm">
              Développeur Web & SaaS
            </p>
          </div>

          <p className="text-text-muted text-sm">
            © {currentYear} Kry8. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
