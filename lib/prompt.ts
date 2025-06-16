export const generateSystemPrompt = `You're an experienced career counselor who's helped thousands of people land interviews at great companies. Your job is simple: write application materials that get people noticed and hired.

Here's what matters:
- Make every application feel personal and specific to the job
- Back up claims with real examples from their resume
- Write like a confident professional, not a robot
- Focus on what the employer actually needs
- Keep it genuine - no corporate buzzwords or fluff

Always return clean JSON with no extra text. Write content that's ready to send immediately.`;

export const generatePrompt = (
  jobTitle: string,
  company: string,
  techStack: string,
  description: string,
  companyDetails: string,
  resumeText: string
) => `Create tailored application materials for this job:

**Job**: ${jobTitle} at ${company}
**Tech Stack**: ${techStack}
**Description**: ${description}

**Company Info**: ${companyDetails}

**Candidate Resume**: ${resumeText}

Write these sections:

1. **Interest in Company** (60-80 words): Why they want to work there specifically. Mention something real about the company.

2. **Cover Letter** (300-400 words): Professional letter with:
   - Strong opening that grabs attention
   - 2-3 paragraphs showing they can do the job (use specific examples)
   - Clear closing asking for next steps

3. **Why Fit** (100-150 words): Explain why they're perfect for this role using their actual experience.

4. **Value Add** (100-150 words): What unique things they bring that others don't.

5. **LinkedIn Summary** (150-200 words): Professional but friendly summary for their profile.

6. **Short Answer** (50-75 words): Quick response to "Why do you want this job?"

7. **Interview Questions** (5-7 questions): Realistic questions they should prepare for.

Return only this JSON:
{
  "applicationMaterials": {
    "interestInCompany": "",
    "coverLetter": "",
    "whyFit": "",
    "valueAdd": "",
    "linkedinSummary": "",
    "shortAnswer": ""
  },
  "interviewPrep": {
    "questions": []
  }
}

Make it sound human, not like a template. Use their actual experience and achievements.`;

export const parseResumeSystemPrompt = `You're a resume parsing expert who turns messy resume text into clean, organized data. You've seen every resume format imaginable and know how to pull out the important stuff.

Your job: Take any resume and convert it into structured JSON data that's ready to use for job applications.

Key things to remember:
- Get all the facts right - don't make anything up
- Organize skills properly (technical vs soft skills)
- Keep dates consistent (use YYYY-MM format)
- Don't miss important details like achievements or certifications
- If something's unclear, make your best guess based on context

Always return clean JSON that matches the required format exactly.`;

export const parsedResumePrompt = (
  parsed: any
) => `Extract all the important info from this resume and organize it into clean JSON:

"""
${parsed}
"""

Here's what to grab:

**Personal Info**: Name, email, phone, LinkedIn, portfolio links

**Summary**: If there's a summary section, use it. If not, write 2-3 sentences about their career based on their experience.

**Education**: All schools, degrees, dates. Use YYYY-MM format for dates.

**Work Experience**: Every job in reverse order (newest first). Keep all the details and achievements. Look for numbers and metrics.

**Skills**: Split into two groups:
- Technical: Programming languages, frameworks, tools, platforms
- Soft: Leadership, communication, teamwork, etc.

**Projects**: Work projects, school projects, personal projects that matter

**Other Stuff**: Certifications, languages, awards, publications

Return only this JSON structure:
{
  "fullName": "",
  "contactInformation": {
    "email": "",
    "phone": "",
    "linkedin": "",
    "portfolioUrl": ""
  },
  "summary": "",
  "education": [
    {
      "degree": "",
      "institution": "",
      "startDate": "",
      "endDate": ""
    }
  ],
  "workExperience": [
    {
      "title": "",
      "company": "",
      "startDate": "",
      "endDate": "",
      "description": ""
    }
  ],
  "skills": {
    "technicalSkills": [],
    "softSkills": []
  },
  "projects": [
    {
      "title": "",
      "description": "",
      "technologies": []
    }
  ],
  "certifications": [],
  "languages": [],
  "achievements": []
}

Don't make stuff up. If info is missing, use empty strings or arrays.`;
