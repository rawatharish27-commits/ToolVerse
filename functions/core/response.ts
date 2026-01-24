
export function success(data: any) {
  return new Response(
    JSON.stringify({ success: true, data }),
    { 
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      } 
    }
  );
}

export function error(message: string, status = 400) {
  return new Response(
    JSON.stringify({ success: false, error: message }),
    { 
      status, 
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      } 
    }
  );
}
