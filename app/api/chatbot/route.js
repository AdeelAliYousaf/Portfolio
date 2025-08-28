import { NextResponse } from "next/server";
import { portfolio } from "../../data/portfolio";

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

// ---- Context for LLM ----
function getPortfolioContext() {
  return `
  My name is Adeel Ali Yousaf. Here is my portfolio data:

  Projects: ${[
    ...portfolio.projects.realClient.map(
      (p) => `${p.title}: ${p.description} for ${p.company} `
    ),
    ...portfolio.projects.openSource.map(
      (p) => `${p.name}: ${p.description}`
    ),
  ].join(" | ")}

  Education: ${portfolio.education
    .map((e) => `${e.degree} at ${e.institution} (${e.duration})`)
    .join(" | ")}

  Certifications: ${[
    ...portfolio.certifications.courses,
    ...portfolio.certifications.certificates,
    ...portfolio.certifications.skillTests,
    ...portfolio.certifications.badges,
    ...portfolio.certifications.internships,
  ]
    .map((c) => `${c.title} from ${c.issuer}`)
    .join(" | ")}

  Social Links: ${Object.entries(portfolio.socialLinks)
    .map(([k, v]) => `${k}: ${v}`)
    .join(" | ")}

  Answer as if you are JARVIS an AI assitant created by Adeel to answer question about his portfolio on his behalf, in a friendly, conversational, and helpful way. 
  & answer in proper paragraph and readable way & Only answer questions related to the information above. If a question is unrelated or you don't have the answer, 
  politely say you can only answer questions about Adeel's portfolio, projects, education, certifications, or social links and donot Greet Everytime.
  `;
}

// ---- API Route ----
export async function POST(req) {
  const { question, confirm, linkType, linkUrl } = await req.json();

  // Easter egg: Adil Ali Yousaf
  const adilRegex = /\b(adil ali yousaf|adeel's brother|adeel ali yousaf's brother|adeel's mentor|adil yousaf|adil)\b/i;
  if (adilRegex.test(question)) {
    return NextResponse.json({
      answer: "Adil Ali Yousaf is Adeel's elder brother, his mentor. Adeel looks up to him for guidance and inspiration. in my knowledge Adil is also an Software Engineer residing in Canada."
    });
  }

  // CV detection (basic)
  const cvRegex = /\b(cv|resume|curriculum vitae|download your cv|download your resume)\b/i;
  if (cvRegex.test(question)) {
    return NextResponse.json({ answer: "Would you like to download Adeel's CV?", cvLink: "/AdeelAliYousafResume2025.pdf" });
  }

  // If user is confirming a link, always return the redirect or link for the provided linkUrl
  if ((confirm === true || confirm === false) && linkUrl) {
    if (confirm === true) {
      return NextResponse.json({ answer: `Redirecting you to the provided link...`, redirect: linkUrl });
    } else {
      return NextResponse.json({ answer: `Here is the link you requested: ${linkUrl}` });
    }
  }

  // Only trigger link matching if question contains explicit link-related keywords
  const linkKeywords = [
    'link','url','open','visit','see','show','redirect','go to','take me','launch','view','access'
  ];
  const lowerQ = (question||'').toLowerCase();
  if (linkKeywords.some(kw => lowerQ.includes(kw))) {
    const allProjects = [
      ...portfolio.projects.realClient.map(p => ({ ...p, type: 'project', matchFields: [p.title, p.description, p.url, ...(p.languages||[])] })),
      ...portfolio.projects.openSource.map(p => ({ ...p, type: 'project', matchFields: [p.name, p.description, p.url, ...(p.languages||[])] }))
    ];
    const allCerts = [
      ...portfolio.certifications.courses.map(c => ({ ...c, type: 'certification', matchFields: [c.title, c.issuer, c.description||'', c.url] })),
      ...portfolio.certifications.certificates.map(c => ({ ...c, type: 'certification', matchFields: [c.title, c.issuer, c.description||'', c.url] })),
      ...portfolio.certifications.skillTests.map(c => ({ ...c, type: 'certification', matchFields: [c.title, c.issuer, c.description||'', c.url] })),
      ...portfolio.certifications.badges.map(c => ({ ...c, type: 'certification', matchFields: [c.title, c.issuer, c.description||'', c.url] })),
      ...portfolio.certifications.internships.map(c => ({ ...c, type: 'certification', matchFields: [c.title, c.issuer, c.description||'', c.url] }))
    ];

    function tokenize(str) {
      return (str||"")
        .toLowerCase()
        .replace(/[^a-z0-9 ]/gi, " ")
        .split(/\s+/)
        .filter(Boolean);
    }
    const qTokens = tokenize(question);
    function scoreItem(item) {
      let score = 0;
      let titleTokens = tokenize(item.title || item.name || "");
      let titleMatchCount = 0;
      for (const qt of qTokens) {
        if (titleTokens.includes(qt)) {
          score += 4; // Strong boost for direct title/name match
          titleMatchCount++;
        } else if (titleTokens.some(tt => tt.includes(qt) || qt.includes(tt))) {
          score += 2; // Partial match in title/name
          titleMatchCount++;
        }
      }
      // Score other fields (description, url, etc.)
      for (const field of item.matchFields) {
        if (field === (item.title || item.name)) continue; // Already scored title/name
        const fieldTokens = tokenize(field);
        for (const qt of qTokens) {
          if (fieldTokens.includes(qt)) score += 1;
          else if (fieldTokens.some(ft => ft.includes(qt) || qt.includes(ft))) score += 0.5;
        }
      }
      // Bonus if most query tokens are found in title/name
      if (titleMatchCount >= Math.max(1, Math.floor(qTokens.length * 0.6))) {
        score += 3;
      }
      return score;
    }
    // Score all items
    const allItems = [...allProjects, ...allCerts];
    let best = null;
    let bestScore = 0;
    for (const item of allItems) {
      const score = scoreItem(item);
      if (score > bestScore && item.url) {
        best = item;
        bestScore = score;
      }
    }
    // Only match if score is reasonable (at least 2)
    if (best && bestScore >= 2) {
      return NextResponse.json({
        answer: `Do you want me to redirect you to the ${best.type} \"${best.title || best.name}\"? (yes/no)`,
        linkType: best.type,
        linkUrl: best.url
      });
    }
  }

  // Fallback chain: Gemini -> Hugging Face -> OpenRouter
  const prompt = `${getPortfolioContext()}\nUser: ${question}\nAI:`;
  // 1. Try Gemini
  try {
    const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 256 }
      })
    });
    if (res.ok) {
      const data = await res.json();
      let answer = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (answer) return NextResponse.json({ answer });
    }
  } catch (e) {}

  // 2. Try Hugging Face Inference API (text-generation, gpt2)
  try {
  const HF_API_KEY = process.env.HF_API_KEY || "";
    const hfRes = await fetch("https://api-inference.huggingface.co/models/gpt2", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: prompt, parameters: { max_new_tokens: 64, temperature: 0.8 } })
    });
    if (hfRes.ok) {
      const hfData = await hfRes.json();
      let answer = Array.isArray(hfData) ? hfData[0]?.generated_text : hfData?.generated_text;
      if (answer) return NextResponse.json({ answer });
    }
  } catch (e) {}

  // 3. Try OpenRouter API (if available)
  try {
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "";
    const orRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: getPortfolioContext() },
          { role: "user", content: question }
        ],
        max_tokens: 128,
        temperature: 0.8
      })
    });
    if (orRes.ok) {
      const orData = await orRes.json();
      let answer = orData.choices?.[0]?.message?.content;
      if (answer) return NextResponse.json({ answer });
    }
  } catch (e) {}

  // All failed
  return NextResponse.json({ answer: "Sorry, I couldn't connect to any AI service right now." }, { status: 500 });
}
