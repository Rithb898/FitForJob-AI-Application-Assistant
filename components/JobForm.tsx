"use client";

import { useCallback } from "react";
import { useAppState } from "@/hooks/useAppState";
import { useResumeManager } from "@/hooks/useResumeManager";
import { useJobFormSubmit } from "@/hooks/useJobFormSubmit";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FileText,
  Briefcase,
  Code,
  Info,
  Loader2,
  History,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { Progress } from "./ui/progress";
import ResumeUploader from "./ResumeUploader";
import Link from "next/link";
import { motion } from "motion/react";

const formSchema = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company name is required"),
  techStack: z.string().min(1, "Tech stack is required"),
  description: z
    .string()
    .min(50, "Please provide a more detailed description (min 50 chars)"),
  companyDetails: z.string().optional(),
});

export default function JobForm() {
  const { appState, updateState } = useAppState();
  const {
    resume,
    setResume,
    parsedResume,
    setParsedResume,
    parseResume,
    clearResume,
  } = useResumeManager({ updateState });
  const handleParseResume = useCallback(parseResume, [parseResume]);
  const handleClearResume = useCallback(clearResume, [clearResume]);
  const { handleSubmit: handleFormSubmit } = useJobFormSubmit({
    updateState,
    parsedResume,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: "",
      company: "",
      techStack: "",
      description: "",
      companyDetails: "",
    },
  });

  const isProcessing =
    appState.status === "parsing" || appState.status === "generating";
  const isResumeReady = !!parsedResume && appState.status !== "parsing";
  const canSubmit = isResumeReady && !isProcessing;

  const StatusIndicator = () => {
    if (appState.status === "idle" && !isResumeReady && appState.progress === 0)
      return null;
    if (appState.status === "complete") return null;

    let icon = <Loader2 className='h-4 w-4 animate-spin text-blue-400' />;
    let colorClass = "text-blue-400";
    let bgColorClass = "bg-blue-900/30 border-blue-700";
    let progressColorVar = "hsl(221.2 83.2% 53.3%)";

    if (appState.status === "error") {
      icon = <AlertCircle className='h-4 w-4 text-red-400' />;
      colorClass = "text-red-400";
      bgColorClass = "bg-red-900/30 border-red-700";
      progressColorVar = "hsl(0 84.2% 60.2%)";
    } else if (isResumeReady && appState.status === "idle") {
      icon = <CheckCircle2 className='h-4 w-4 text-green-400' />;
      colorClass = "text-green-400";
      bgColorClass = "bg-green-900/30 border-green-700";
      progressColorVar = "hsl(142.1 76.2% 36.3%)";
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`w-full p-3 px-4 mt-6 mb-2 rounded-lg border ${bgColorClass}`}
        style={{ "--primary": progressColorVar } as React.CSSProperties}
      >
        <div className='flex justify-between items-center mb-1'>
          <span
            className={`text-sm font-medium flex items-center gap-2 ${colorClass}`}
          >
            {icon}
            {appState.stage ||
              (isResumeReady ? "Resume ready" : "Awaiting input")}
          </span>
          {(appState.status === "parsing" ||
            appState.status === "generating" ||
            (isResumeReady && appState.status === "idle")) && (
            <span className={`text-sm font-medium ${colorClass}`}>
              {appState.progress}%
            </span>
          )}
        </div>
        {(appState.status === "parsing" ||
          appState.status === "generating" ||
          (isResumeReady && appState.status === "idle")) && (
          <Progress value={appState.progress} className='h-1.5' />
        )}
        {appState.status === "error" && appState.error && (
          <p className='text-xs text-red-300/80 mt-1.5 pl-6'>
            {appState.error}
          </p>
        )}
      </motion.div>
    );
  };

  return (
    <main className='min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-slate-200'>
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute -top-40 -right-40 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px]'></div>
        <div className='absolute top-1/3 -left-60 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px]'></div>
      </div>

      <div className='relative max-w-7xl mx-auto px-4 py-12 md:py-10 z-10'>
        <motion.div
          className='flex flex-col sm:flex-row items-center justify-between mb-10'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div>
            <h1 className='text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 pb-1'>
              AI Application Assistant
            </h1>
            <p className='text-slate-400 mt-1 text-base font-light'>
              Generate tailored responses based on your resume and job details.
            </p>
          </div>
          <Link href='/history' className='mt-4 sm:mt-0'>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Button
                variant='outline'
                size='sm'
                className='gap-2 bg-slate-800/50 border-slate-700 hover:bg-slate-700/50 text-slate-300 hover:text-white'
              >
                <History className='h-4 w-4' />
                View History
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        <motion.div
          className='bg-slate-900/70 border border-slate-700/80 rounded-xl shadow-2xl shadow-indigo-950/30 backdrop-blur-lg overflow-hidden'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className='divide-y divide-slate-700/80'
            >
              <div className='p-6 space-y-5'>
                <h3 className='text-lg font-semibold text-slate-100 flex items-center gap-2'>
                  <Briefcase className='w-5 h-5 text-purple-400' />
                  Job Information
                </h3>
                <div className='grid md:grid-cols-2 gap-5'>
                  <FormField
                    control={form.control}
                    name='jobTitle'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-sm text-slate-400'>
                          Job Title
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='e.g., Software Engineer'
                            {...field}
                            disabled={isProcessing}
                            className='bg-slate-800 border-slate-600 focus:border-purple-500'
                          />
                        </FormControl>
                        <FormMessage className='text-red-400 text-xs' />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='company'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-sm text-slate-400'>
                          Company
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='e.g., Acme Corp'
                            {...field}
                            disabled={isProcessing}
                            className='bg-slate-800 border-slate-600 focus:border-purple-500'
                          />
                        </FormControl>
                        <FormMessage className='text-red-400 text-xs' />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name='techStack'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm text-slate-400 flex items-center gap-1.5'>
                        <Code className='w-4 h-4' /> Tech Stack / Keywords
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='e.g., React, Node.js, AWS, Python'
                          {...field}
                          disabled={isProcessing}
                          className='bg-slate-800 border-slate-600 focus:border-purple-500'
                        />
                      </FormControl>
                      <FormDescription className='text-xs text-slate-500'>
                        Comma-separated list of key technologies or skills.
                      </FormDescription>
                      <FormMessage className='text-red-400 text-xs' />
                    </FormItem>
                  )}
                />
              </div>

              <div className='p-6 space-y-4'>
                <h3 className='text-lg font-semibold text-slate-100 flex items-center gap-2'>
                  <FileText className='w-5 h-5 text-purple-400' />
                  Your Resume
                </h3>
                <ResumeUploader
                  resume={resume}
                  setResume={setResume}
                  parsedResume={parsedResume}
                  setParsedResume={setParsedResume}
                  appState={appState}
                  updateState={updateState}
                  clearResume={handleClearResume}
                  parseResume={handleParseResume}
                />
                {!isResumeReady && !isProcessing && (
                  <FormDescription className='text-xs text-center text-slate-500 pt-1'>
                    Your resume is parsed locally by AI and is required to
                    generate tailored responses.
                  </FormDescription>
                )}
              </div>

              <div className='p-6 space-y-5'>
                <h3 className='text-lg font-semibold text-slate-100 flex items-center gap-2'>
                  <Info className='w-5 h-5 text-purple-400' />
                  Additional Context
                </h3>
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm text-slate-400'>
                        Job Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Paste the full job description here...'
                          className='resize-none min-h-[150px] bg-slate-800 border-slate-600 focus:border-purple-500 text-sm'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className='text-red-400 text-xs' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='companyDetails'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm text-slate-400'>
                        Company Details (Optional)
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Any specific details about the company, its values, recent news, or the team?'
                          className='resize-none min-h-[150px] bg-slate-800 border-slate-600 focus:border-purple-500 text-sm'
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className='text-xs text-slate-500'>
                        Helps tailor the "Why this company?" answers.
                      </FormDescription>
                      <FormMessage className='text-red-400 text-xs' />
                    </FormItem>
                  )}
                />
              </div>

              <div className='p-6'>
                <StatusIndicator />

                <Button
                  type='submit'
                  className={`w-full py-3 text-base font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2
                    ${!canSubmit ? "bg-slate-700 text-slate-500 cursor-not-allowed" : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-purple-500"}
                  `}
                  disabled={!canSubmit}
                >
                  {appState.status === "generating" ? (
                    <>
                      <Loader2 className='h-5 w-5 animate-spin' />
                      Generating...
                    </>
                  ) : (
                    <>
                      Generate AI Responses
                      <Sparkles className='h-5 w-5 ml-1 opacity-80' />
                    </>
                  )}
                </Button>

                {!isResumeReady && appState.status !== "parsing" && (
                  <p className='text-xs text-center text-amber-400/80 mt-3'>
                    Please upload your resume before generating responses.
                  </p>
                )}
              </div>
            </form>
          </Form>
        </motion.div>
      </div>
    </main>
  );
}
