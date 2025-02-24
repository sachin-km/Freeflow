export const config = {
  runtime: 'edge',
}

import { NextResponse } from 'next/server'

const HYPERBOLIC_API_URL = 'https://api.hyperbolic.xyz/v1/chat/completions'
const HYPERBOLIC_API_KEY = process.env.HYPERBOLIC_API_KEY

if (!HYPERBOLIC_API_KEY) {
  throw new Error('Missing Hyperbolic API Key')
}

function cleanMermaidCode(code: string): string {
  // Remove any explanatory text before graph TD
  const graphIndex = code.indexOf('graph TD')
  if (graphIndex === -1) return code

  code = code.substring(graphIndex)

  return code
    .replace(/```mermaid/g, '')
    .replace(/```/g, '')
    .replace(/^\s*[\r\n]/gm, '') // Remove empty lines
    .split('\n')
    .filter(line => 
      line.trim() && 
      !line.toLowerCase().includes('here') &&
      !line.toLowerCase().includes('flowchart') &&
      !line.toLowerCase().includes('diagram')
    )
    .join('\n')
    .trim()
}

export async function POST(req: Request) {
  try {
    const { prompt, context } = await req.json()

    const messages = [
      {
        role: 'system',
        content: `You are a flowchart expert. Create flowcharts using ONLY Mermaid syntax.
          IMPORTANT: Start your response with 'graph TD' and ONLY include the Mermaid code.
          
          Rules:
          1. ONLY output valid Mermaid flowchart code
          2. NO explanations or additional text
          3. Use A[Text] for process nodes
          4. Use B{Text} for decision nodes
          5. Use C([Text]) for start/end nodes
          6. Use proper connections: A --> B, or A -->|Yes| B
          7. Always include start and end nodes
          
          Example:
          graph TD
            A([Start]) --> B[Process Data]
            B --> C{Decision?}
            C -->|Yes| D[Action 1]
            C -->|No| E[Action 2]
            D --> F([End])
            E --> F`
      },
      ...(context || []),
      {
        role: 'user',
        content: `Create a flowchart using ONLY Mermaid syntax for: ${prompt}`
      }
    ]

    const response = await fetch(HYPERBOLIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${HYPERBOLIC_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-ai/DeepSeek-V3',
        messages,
        max_tokens: 1000,
        temperature: 0.1, // Reduced for more consistent outputs
        top_p: 0.9,
        stream: false
      }),
    })

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const json = await response.json()

    if (!json.choices?.[0]?.message?.content) {
      throw new Error('No response from API')
    }

    let mermaidCode = cleanMermaidCode(json.choices[0].message.content)

    // Ensure it starts with graph TD
    if (!mermaidCode.startsWith('graph TD')) {
      mermaidCode = `graph TD\n${mermaidCode.replace(/^graph .*\n/, '')}`
    }

    // Validate basic Mermaid syntax
    if (!mermaidCode.includes('-->')) {
      throw new Error('Invalid flowchart syntax - missing connections')
    }

    // Final validation of the structure
    const lines = mermaidCode.split('\n')
    if (lines.length < 2) {
      throw new Error('Invalid flowchart - not enough nodes')
    }

    return NextResponse.json({ mermaidCode })
  } catch (error: any) {
    console.error('Error generating flowchart:', error)
    return NextResponse.json(
      { 
        error: 'Failed to generate flowchart',
        details: error.message 
      },
      { status: error.status || 500 }
    )
  }
} 