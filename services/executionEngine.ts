
export interface ExecutionRequest {
  slug: string;
  category: string;
  input: any;
  options?: any;
}

export interface ExecutionResult {
  success: boolean;
  data: any;
  error?: string;
}

/**
 * ToolVerse Production Gateway
 * Direct connection to Cloudflare Edge Functions (/api/execute)
 */
export const executeTool = async (req: ExecutionRequest): Promise<ExecutionResult> => {
  try {
    const response = await fetch("/api/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        toolId: req.slug,
        category: req.category,
        input: req.input,
        options: req.options || {}
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      return { 
        success: false, 
        data: null, 
        error: result.error || "Backend logic failed to execute." 
      };
    }

    return { 
      success: true, 
      data: result.data 
    };
  } catch (err: any) {
    return { 
      success: false, 
      data: null, 
      error: "Network error: Could not reach ToolVerse Edge Core." 
    };
  }
};
