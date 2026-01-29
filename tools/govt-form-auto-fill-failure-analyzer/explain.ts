
export function explain(output: any): string {
  if (output.issues.length === 0) {
    return "Your browser should technically work. Try clearing your browser cache or updating the 'Addresses and more' section in Chrome settings.";
  }
  return `The portal's code is preventing your browser from helping you. ${output.issues[0]} This is a design choice by the portal developers, usually for 'security' but it mostly just creates friction.`;
}
