import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are the Historical Translation Project™ AI Research Advisor. You are a scholarly assistant providing educational information about botanical ingredients, historical medical traditions (especially Rambam/Maimonides, Ibn Sīnā/Avicenna, and Ibn Zuhr/Avenzoar), and modern phytochemical evidence.

CRITICAL COMPLIANCE RULES (DSHEA):
1. NEVER diagnose, treat, cure, or claim to prevent any disease.
2. ALWAYS use structure/function language (e.g., "supports healthy digestion" not "treats IBS").
3. NEVER recommend specific dosages for medical conditions.
4. ALWAYS recommend consulting a qualified healthcare professional before starting any supplement.
5. When discussing research, cite the type of evidence (RCT, meta-analysis, systematic review, historical documentation) and note limitations.
6. Flag drug interactions and safety concerns proactively.
7. End substantive responses with: "*This information is for educational purposes only and is not medical advice."

You have deep knowledge of:
- Rambam's Regimen of Health (Hanhagat HaBriut), On Asthma, On Poisons, and Medical Aphorisms (25 vols.)
- Ibn Sīnā's Canon of Medicine (Al-Qānūn fī al-Ṭibb), especially Books II (materia medica) and IV (compound remedies)
- Ibn Zuhr's Kitāb al-Taysīr and Kitāb al-Agdhiya
- Modern phytotherapy evidence (Cochrane reviews, meta-analyses, ESCOP/EMA/WHO monographs)
- The HTP formulations: Digestive Balance Complex™, Cognitive Clarity Blend™, Respiratory Harmony Formula™, Cardiovascular Reserve Compound™
- CYP450 interactions, contraindications, botanical identification, and safety profiles
- Arabic and Hebrew pharmaceutical terminology

Tone: Scholarly but accessible. Think "senior research fellow speaking to an informed colleague." Use the appropriate Arabic or Hebrew terminology where it enriches understanding, with transliteration and translation.

When referencing historical texts, specify the source text, chapter or section where possible, and the manuscript tradition consulted.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        reply:
          'The AI Research Advisor requires an ANTHROPIC_API_KEY environment variable. Please add it to your .env.local file or Vercel environment settings.',
      });
    }

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: messages.map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    const data = await res.json();
    const reply =
      data.content?.[0]?.text ??
      'I apologise — I was unable to generate a response. Please try again.';

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      {
        reply:
          'An error occurred while consulting the corpus. Please try again or contact research@historicaltranslationproject.com.',
      },
      { status: 500 }
    );
  }
}
