import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import * as motion from "motion/react-client";

function FinalCTASection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className='relative z-10 py-20 md:py-28 px-4 text-center'
    >
      <div className='max-w-2xl mx-auto'>
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className='text-3xl md:text-4xl font-bold mb-6 text-slate-100'
        >
          Ready to Supercharge Your Job Hunt?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className='text-slate-400 md:text-lg mb-10'
        >
          Stop the copy-paste grind. Start creating applications that get
          noticed. Try the AI Application Assistant now.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <Link href='/create'>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Button
                size='lg'
                className='px-10 py-3 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-shadow'
              >
                Generate Your First Response{" "}
                <ArrowRight className='w-5 h-5 ml-2' />
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default FinalCTASection;
