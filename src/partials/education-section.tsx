import { motion } from "framer-motion";
import { MagneticText } from "../components/magnetic-text";
import { portfolioData } from "../data/portfolio-data";
import { cn } from "../lib/utils";

const { education } = portfolioData;

const cardVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -10 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: "spring", stiffness: 80, damping: 20, delay: 0.15 },
  },
};

export const EducationSection = () => {
  return (
    <section className="border-b-4 border-black bg-graph-paper relative overflow-hidden">
      <span className="absolute top-4 left-6 font-mono text-xs text-border-dark/30 select-none pointer-events-none">
        &lt;section class="education"&gt;
      </span>
      <span className="absolute bottom-4 right-6 font-mono text-xs text-border-dark/30 select-none pointer-events-none">
        &lt;/section&gt;
      </span>

      <div className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-12">
            <MagneticText text="Education" as="h2" className="font-heading text-fluid-h2 font-bold inline-block" />
            <p className="font-body text-fluid-body text-border-dark/50 mt-2">
              Academic background & qualifications
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            className={cn(
              "relative max-w-2xl mx-auto",
              "border-4 border-black",
              "bg-primary shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]",
              "p-8 md:p-10",
            )}
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-black text-primary font-heading font-bold text-3xl w-14 h-14 border-4 border-black bg-bg-base flex items-center justify-center shrink-0">
                {education.university.charAt(0)}
              </div>
              <div>
                <h3 className="font-heading text-xl md:text-2xl font-bold leading-tight">
                  {education.university}
                </h3>
                <p className="font-mono text-sm mt-1 text-black/60">{education.location}</p>
              </div>
            </div>

            <div className="border-t-4 border-black pt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-4 border-black bg-bg-base p-4">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-border-dark/50 mb-1">
                    Degree
                  </p>
                  <p className="font-heading font-bold text-sm">{education.degree}</p>
                </div>
                <div className="border-4 border-black bg-bg-base p-4">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-border-dark/50 mb-1">
                    Period
                  </p>
                  <p className="font-heading font-bold text-sm">{education.period}</p>
                </div>
              </div>

              {education.gpa && (
                <div className="border-4 border-black bg-secondary p-4 flex items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider shrink-0">
                    GPA
                  </span>
                  <span className="font-heading text-2xl font-bold">{education.gpa}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
