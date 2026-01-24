
export interface ToolResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export const executeOnEdge = async (toolId: string, category: string, input: any): Promise<ToolResponse> => {
  try {
    const proToken = localStorage.getItem('tv_pro_token');
    const response = await fetch("/api/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(proToken ? { "Authorization": `Bearer ${proToken}` } : {})
      },
      body: JSON.stringify({
        toolId,
        category,
        input,
        adProof: sessionStorage.getItem('tv_ad_proof') || null
      }),
    });

    const result = await response.json();
    return result.success ? { success: true, data: result.data } : { success: false, error: result.error };
  } catch {
    return { success: false, error: "Edge Engine unreachable." };
  }
};
