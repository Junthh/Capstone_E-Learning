import { Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="
        border-t border-stone-200 bg-white text-stone-700
        dark:bg-stone-900 dark:border-stone-800 dark:text-stone-300
        pt-3 pb-3 md:pt-4 md:pb-4 lg:pt-5 lg:pb-5
        px-3 sm:px-4 md:px-6
        [padding-bottom:calc(env(safe-area-inset-bottom,0)+0.5rem)]
      "
    >
      <div
        className="
          mx-auto max-w-screen-xl
          flex flex-col md:flex-row items-center md:items-center
          justify-center md:justify-between
          gap-3 sm:gap-4 md:gap-6
        "
      >
        {/* Left: copy */}
        <div className="text-center md:text-left">
          <p className="text-xs sm:text-sm leading-relaxed">
            © {currentYear}, made with{" "}
            <Heart
              className="inline-block align-[-2px] w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-500 fill-current"
              aria-hidden="true"
            />{" "}
            by{" "}
            <a
              href="#"
              className="font-semibold text-stone-900 hover:text-stone-700 dark:text-stone-100 dark:hover:text-stone-200 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Creative Tim
            </a>{" "}
            for a better web.
          </p>
        </div>

        {/* Right: links */}
        <nav
          aria-label="Footer links"
          className="
            flex flex-wrap items-center justify-center
            gap-x-4 gap-y-2 sm:gap-x-6
          "
        >
          <a
            href="#"
            className="text-xs sm:text-sm hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Creative Tim
          </a>
          <a
            href="#"
            className="text-xs sm:text-sm hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            About Us
          </a>
          <a
            href="#"
            className="text-xs sm:text-sm hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Blog
          </a>
          <a
            href="#"
            className="text-xs sm:text-sm hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
        </nav>
      </div>
    </footer>
  );
}
