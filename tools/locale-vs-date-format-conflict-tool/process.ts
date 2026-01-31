
export async function process(input:{locale:string, dateFormat:string}) {
  const us = input.locale === "en-US";
  const conflict = us && input.dateFormat.startsWith("DD");
  return {
    conflict,
    reason: conflict ? "US locale expects MM/DD format" : "No conflict detected"
  };
}
