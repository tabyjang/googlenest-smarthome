/**
 * Serverless API endpoint for Gemini AI
 * Proxies requests to Google Gemini API to keep API key secure
 *
 * Deployment: This file works with Vercel/Netlify serverless functions
 */

import { GoogleGenAI } from "@google/genai";

// Define request/response types
interface GeminiRequest {
  prompt: string;
}

interface GeminiResponse {
  success: boolean;
  text?: string;
  error?: string;
}

/**
 * Serverless function handler
 * For Vercel: export default async function handler(req, res)
 * For development: Can be called via fetch('/api/gemini')
 */
export default async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Use POST.'
    });
  }

  try {
    // Get API key from environment (server-side only)
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error('GEMINI_API_KEY not found in environment');
      return res.status(500).json({
        success: false,
        error: 'API configuration error'
      });
    }

    // Parse request body
    const { prompt }: GeminiRequest = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Invalid request: prompt is required'
      });
    }

    // Initialize Gemini AI client
    const ai = new GoogleGenAI({ apiKey });

    // Generate content using Gemini
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a helpful, concise Google Nest smart home assistant. Respond only in Korean."
      }
    });

    // Return successful response
    const responseText = response.text || "응답을 생성할 수 없습니다.";

    return res.status(200).json({
      success: true,
      text: responseText
    } as GeminiResponse);

  } catch (error) {
    console.error('Gemini API Error:', error);

    // Return error response (don't expose internal details)
    return res.status(500).json({
      success: false,
      error: 'Failed to generate response'
    } as GeminiResponse);
  }
}

/**
 * For local development without serverless platform:
 * You can use a simple Express server or Vite proxy
 *
 * Example Vite proxy in vite.config.ts:
 *
 * server: {
 *   proxy: {
 *     '/api/gemini': {
 *       target: 'http://localhost:3001',
 *       changeOrigin: true
 *     }
 *   }
 * }
 */
