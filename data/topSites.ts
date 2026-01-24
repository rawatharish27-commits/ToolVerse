
export interface TopSite {
  name: string;
  url: string;
  category: string;
  domain: string;
  country?: 'in' | 'global';
  rank: string;
  visits: string;
  popular?: boolean;
}

export const TOP_SITES: TopSite[] = [
  { name: "Google", url: "https://www.google.com", domain: "google.com", category: "Search Engines", rank: "#1", visits: "85.1B", popular: true },
  { name: "YouTube", url: "https://youtube.com", domain: "youtube.com", category: "Video & Streaming", rank: "#2", visits: "33.2B", popular: true },
  { name: "Facebook", url: "https://facebook.com", domain: "facebook.com", category: "Social Media", rank: "#3", visits: "12.4B", popular: true },
  { name: "Instagram", url: "https://instagram.com", domain: "instagram.com", category: "Social Media", rank: "#4", visits: "6.7B", popular: true },
  { name: "X", url: "https://x.com", domain: "x.com", category: "Social Media", rank: "#5", visits: "6.1B", popular: true },
  { name: "Wikipedia", url: "https://wikipedia.org", domain: "wikipedia.org", category: "News & Knowledge", rank: "#7", visits: "4.8B", popular: true },
  { name: "Amazon", url: "https://amazon.com", domain: "amazon.com", category: "E-Commerce", rank: "#12", visits: "2.8B", popular: true },
  { name: "ChatGPT", url: "https://chat.openai.com", domain: "openai.com", category: "AI / Tech Tools", rank: "#17", visits: "1.6B", popular: true },
  { name: "Reddit", url: "https://reddit.com", domain: "reddit.com", category: "Social Media", rank: "#18", visits: "2.1B", popular: true },
  { name: "Netflix", url: "https://netflix.com", domain: "netflix.com", category: "Video & Streaming", rank: "#19", visits: "2.0B", popular: true },
  { name: "LinkedIn", url: "https://linkedin.com", domain: "linkedin.com", category: "Social Media", rank: "#22", visits: "1.8B", popular: true },
  { name: "GitHub", url: "https://github.com", domain: "github.com", category: "AI / Tech Tools", rank: "#52", visits: "950M", popular: true },
  { name: "Pinterest", url: "https://pinterest.com", domain: "pinterest.com", category: "Social Media", rank: "#31", visits: "1.1B", popular: true },
  { name: "eBay", url: "https://ebay.com", domain: "ebay.com", category: "E-Commerce", rank: "#35", visits: "1.1B", popular: true },
  { name: "Spotify", url: "https://spotify.com", domain: "spotify.com", category: "Video & Streaming", rank: "#65", visits: "900M", popular: true },
  { name: "Canva", url: "https://canva.com", domain: "canva.com", category: "AI / Tech Tools", rank: "#98", visits: "650M", popular: true },
  { name: "Flipkart", url: "https://flipkart.com", domain: "flipkart.com", category: "E-Commerce", country: 'in', rank: "#90", visits: "450M", popular: true },
  { name: "Notion", url: "https://notion.so", domain: "notion.so", category: "Work & Productivity", rank: "#380", visits: "150M", popular: true },
  { name: "Gmail", url: "https://mail.google.com", domain: "gmail.com", category: "Work & Productivity", rank: "#1", visits: "N/A", popular: true },
  { name: "Binance", url: "https://binance.com", domain: "binance.com", category: "Finance & Crypto", rank: "#115", visits: "350M", popular: true }
];
