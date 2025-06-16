"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Button } from "./ui/button";
import { Check, Copy, Loader2, RefreshCw, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Define props interface separately for better readability
interface ResponseSectionProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  gradientFrom?: string;
  gradientTo?: string;
  onRegenerate?: () => void; // Keep optional
  isRegenerating?: boolean; // Keep optional
  regenerationDisabled?: boolean; // <<< ADDED: Explicitly disable regeneration (e.g., missing data)
  regenerationTooltip?: string; // <<< ADDED: Tooltip message for why it's disabled
  // Optional: Add onCopy prop if you want to track copies
  // onCopy?: (content: string) => void;
}

const ResponseSection = React.memo(function ResponseSection({
  icon,
  title,
  content,
  gradientFrom = "from-purple-500",
  gradientTo = "to-blue-500",
  onRegenerate,
  isRegenerating = false,
  regenerationDisabled = false,
  regenerationTooltip,
}: ResponseSectionProps) {
  const [copied, setCopied] = useState(false);

  // Memoize copy function to prevent unnecessary re-renders
  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
      // Fallback for older browsers or when clipboard API fails
      const textArea = document.createElement("textarea");
      textArea.value = content;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [content]);

  // Memoize computed states to prevent unnecessary re-renders
  const { isButtonDisabled, showTooltip, buttonConfig } = useMemo(() => {
    const disabled = isRegenerating || regenerationDisabled;
    const tooltip =
      regenerationDisabled && !isRegenerating && regenerationTooltip;

    return {
      isButtonDisabled: disabled,
      showTooltip: tooltip,
      buttonConfig: {
        variant: "outline" as const,
        size: "sm" as const,
        className: cn(
          "gap-1.5 h-8 px-3 rounded-md text-xs transition-all duration-200",
          "bg-slate-800/60 border-slate-700 text-purple-300",
          "hover:bg-purple-900/50 hover:border-purple-700/70 hover:text-purple-200",
          "disabled:opacity-60 disabled:cursor-not-allowed",
          "focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-1 focus:ring-offset-slate-900"
        ),
      },
    };
  }, [isRegenerating, regenerationDisabled, regenerationTooltip]);

  // Memoize RegenerateButton to prevent unnecessary re-renders
  const RegenerateButton = useMemo(
    () => (
      <Button
        {...buttonConfig}
        onClick={onRegenerate}
        disabled={isButtonDisabled}
        aria-label={
          isRegenerating ? "Regenerating content..." : "Regenerate content"
        }
      >
        {isRegenerating ? (
          <>
            <Loader2 className='w-3.5 h-3.5 animate-spin' aria-hidden='true' />
            Generating...
          </>
        ) : (
          <>
            <RefreshCw className='w-3.5 h-3.5' aria-hidden='true' />
            Regenerate
            {regenerationDisabled && (
              <HelpCircle
                className='w-3.5 h-3.5 ml-1 text-slate-500'
                aria-hidden='true'
              />
            )}
          </>
        )}
      </Button>
    ),
    [
      buttonConfig,
      onRegenerate,
      isButtonDisabled,
      isRegenerating,
      regenerationDisabled,
    ]
  );

  return (
    <article
      className='mb-5 bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700/60 shadow-lg backdrop-blur-sm'
      aria-labelledby={`section-title-${title.replace(/\s+/g, "-").toLowerCase()}`}
    >
      <header
        className={`flex items-center gap-3 p-4 bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white`}
      >
        <div
          className='w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0'
          aria-hidden='true'
        >
          {icon}
        </div>
        <h2
          id={`section-title-${title.replace(/\s+/g, "-").toLowerCase()}`}
          className='text-base md:text-lg font-semibold line-clamp-1'
        >
          {title}
        </h2>
      </header>
      <div
        className='p-4 md:p-5 text-sm text-slate-300 leading-relaxed whitespace-pre-wrap'
        role='region'
        aria-label={`${title} content`}
      >
        {content}
      </div>
      <div className='flex justify-end p-3 gap-2 border-t border-slate-700/40 bg-slate-900/40'>
        {/* Copy Button */}
        <Button
          variant='ghost'
          size='sm'
          onClick={copyToClipboard}
          aria-label={
            copied ? "Content copied to clipboard" : "Copy content to clipboard"
          }
          className={cn(
            "gap-1.5 h-8 px-3 rounded-md text-xs transition-all duration-200",
            "focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-1 focus:ring-offset-slate-900",
            copied
              ? "bg-green-900/30 text-green-400 border-green-800/0 hover:bg-green-900/40"
              : "bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-700/80 hover:text-slate-100"
          )}
        >
          {copied ? (
            <>
              <Check className='w-3.5 h-3.5' aria-hidden='true' />
              Copied!
            </>
          ) : (
            <>
              <Copy className='w-3.5 h-3.5' aria-hidden='true' />
              Copy
            </>
          )}
        </Button>

        {/* Regenerate Button (conditionally wrapped with Tooltip) */}
        {onRegenerate &&
          (showTooltip ? (
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>{RegenerateButton}</TooltipTrigger>
                <TooltipContent className='bg-slate-950 border-slate-700 text-slate-200 text-xs'>
                  <p>{regenerationTooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            // Render button directly if tooltip isn't needed
            RegenerateButton
          ))}
      </div>
    </article>
  );
});

export default ResponseSection;
