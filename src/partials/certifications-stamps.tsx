import { motion } from "framer-motion";
import { MagneticText } from "../components/magnetic-text";
import { portfolioData } from "../data/portfolio-data";
import { cn } from "../lib/utils";

const { certifications } = portfolioData;

const STAMP_COLORS = [
  "bg-primary",
  "bg-secondary",
  "bg-accent",
  "bg-bg-base",
  "bg-primary",
  "bg-secondary",
  "bg-accent",
  "bg-bg-base",
  "bg-primary",
  "bg-secondary",
  "bg-accent",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const stampVariants = {
  hidden: { opacity: 0, scale: 0.3, rotate: -15 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
      mass: 0.8,
    },
  },
};

export const CertificationsStamps = () => {
  return (
    <section className="border-b-4 border-black bg-diagonal-stripes relative overflow-hidden">
      <span className="absolute top-4 left-6 font-mono text-xs text-border-dark/30 select-none pointer-events-none">
        &lt;section class="certifications"&gt;
      </span>
      <span className="absolute bottom-4 right-6 font-mono text-xs text-border-dark/30 select-none pointer-events-none">
        &lt;/section&gt;
      </span>

      <div className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-12">
            <MagneticText text="Certifications" as="h2" className="font-heading text-fluid-h2 font-bold inline-block" />
            <p className="font-body text-fluid-body text-border-dark/50 mt-2">
              Professional credentials & achievements
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
          >
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.id}
                variants={stampVariants}
                className={cn(
                  "relative border-4 border-black p-5 pt-14 flex flex-col text-left",
                  "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
                  "hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]",
                  "active:shadow-none active:translate-x-[4px] active:translate-y-[4px]",
                  "transition-all duration-100",
                  STAMP_COLORS[i % STAMP_COLORS.length],
                )}
              >
                <div className="absolute top-0 left-0 w-10 h-10 border-b-4 border-r-4 border-black bg-black flex items-center justify-center">
                  <span className="text-white font-heading font-bold text-sm">{i + 1}</span>
                </div>

                <h3 className="font-heading font-bold text-sm leading-snug mb-1">{cert.title}</h3>

                <p className="font-mono text-[10px] uppercase tracking-wider text-border-dark/50 mb-2">
                  {cert.issuer}
                </p>

                {cert.date && (
                  <p className="font-mono text-[10px] text-border-dark/40 mb-2">{cert.date}</p>
                )}

                <p className="font-mono text-[11px] leading-relaxed text-border-dark/60 mb-3 line-clamp-3">
                  {cert.summary}
                </p>

                {cert.credentialLink && (
                  <a
                    href={cert.credentialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "mt-auto self-start inline-flex items-center gap-1 px-3 py-1.5",
                      "font-mono text-[10px] font-bold border-2 border-black",
                      "bg-black text-white",
                      "hover:bg-primary hover:text-black hover:border-black",
                      "transition-colors duration-100",
                    )}
                  >
                    View →
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-12 font-mono text-xs text-center text-border-dark/30">
            {certifications.length} certifications
          </div>
        </div>
      </div>
    </section>
  );
};
