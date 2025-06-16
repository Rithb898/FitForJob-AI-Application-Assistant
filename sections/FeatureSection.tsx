import React from "react";
import * as motion from "motion/react-client";
import { Brain, CheckCircle, Clock, FileText } from "lucide-react";

function FeatureSection() {
  return (
    <motion.section
      id="features"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-10 py-20 md:py-28 px-4"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-medium text-purple-300 bg-purple-900/50 rounded-full mb-3">
            Key Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-100">
            Everything You Need to Apply Smarter
          </h2>
          <p className="text-slate-400 md:text-lg max-w-xl mx-auto">
            Go beyond generic templates and create applications that truly stand
            out.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Feature Item 1 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex items-start gap-4 p-5 rounded-lg bg-slate-900/50 border border-slate-800/60"
          >
            <div className="mt-1 flex-shrink-0 p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-md text-white">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-1 text-slate-100">
                Tailored Application Answers
              </h4>
              <p className="text-slate-400 text-sm">
                Generate unique responses for "Why this company?", "Why are you
                a good fit?", value proposition, and short form answers based on
                the job and your resume.
              </p>
            </div>
          </motion.div>

          {/* Feature Item 2 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="flex items-start gap-4 p-5 rounded-lg bg-slate-900/50 border border-slate-800/60"
          >
            <div className="mt-1 flex-shrink-0 p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-md text-white">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-1 text-slate-100">
                Intelligent Resume Parsing
              </h4>
              <p className="text-slate-400 text-sm">
                Upload your resume once. Our AI understands your background to
                personalize every generated response. Stays securely in your
                browser.
              </p>
            </div>
          </motion.div>

          {/* Feature Item 3 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex items-start gap-4 p-5 rounded-lg bg-slate-900/50 border border-slate-800/60"
          >
            <div className="mt-1 flex-shrink-0 p-2 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-md text-white">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-1 text-slate-100">
                Interview Question Prep
              </h4>
              <p className="text-slate-400 text-sm">
                Get a list of potential interview questions tailored to the
                specific job description, helping you prepare effectively.
              </p>
            </div>
          </motion.div>

          {/* Feature Item 4 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            className="flex items-start gap-4 p-5 rounded-lg bg-slate-900/50 border border-slate-800/60"
          >
            <div className="mt-1 flex-shrink-0 p-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-md text-white">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-1 text-slate-100">
                Save Time & Stay Organized
              </h4>
              <p className="text-slate-400 text-sm">
                Drastically reduce application time. Keep all your generated
                responses neatly organized in your application history.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default FeatureSection;
