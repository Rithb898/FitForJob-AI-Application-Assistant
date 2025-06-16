import React from "react";
import * as motion from "motion/react-client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SparklesIcon } from "lucide-react";

function HeroSection() {
  return (
    <section className='relative z-10 pt-20 pb-24 md:pt-28 md:pb-32 text-center px-4'>
      <div className='max-w-3xl mx-auto'>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className='text-4xl md:text-6xl font-extrabold tracking-tight mb-6'
        >
          <span className='block'>Stop Writing Generic</span>
          <span className='block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 mt-1 md:mt-2'>
            Job Applications.
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className='text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10'
        >
          Leverage AI and your resume to instantly craft personalized cover
          letters, answer screening questions, and prepare for interviews –
          tailored to every job.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className='flex flex-col sm:flex-row justify-center items-center gap-4'
        >
          <Link href='/create'>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Button
                size='lg'
                className='w-full sm:w-auto px-8 py-3 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer'
              >
                Get Started Now <SparklesIcon className='w-5 h-5 ml-2' />
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
