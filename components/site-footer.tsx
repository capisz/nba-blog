import Link from "next/link"

const footerLinks = ["About", "Contact", "Community Guidelines", "Privacy"]

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t-4 border-[#111111] bg-white">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 text-sm md:grid-cols-[1fr_1.2fr] md:px-6">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#006bb6]">
            Concrete Jungle Sports
          </p>
          <p className="mt-3 max-w-md text-2xl font-black uppercase leading-none tracking-tight text-[#111111]">
            Knicks news, analysis, game threads, and fan noise from New York.
          </p>
        </div>

        <div className="space-y-4 md:text-right">
          <div className="flex flex-wrap gap-x-5 gap-y-2 md:justify-end">
            {footerLinks.map((link) => (
              <Link
                key={link}
                href="#"
                className="font-black uppercase tracking-[0.1em] text-neutral-700 hover:text-[#f58426]"
              >
                {link}
              </Link>
            ))}
          </div>
          <p className="text-xs leading-6 text-neutral-500">
            Concrete Jungle Sports is an independent fan publication and is not
            affiliated with, sponsored by, or endorsed by the New York Knicks, the
            NBA, or Madison Square Garden. Copyright {currentYear}.
          </p>
        </div>
      </div>
    </footer>
  )
}
