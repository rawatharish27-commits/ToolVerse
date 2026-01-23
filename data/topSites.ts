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
  // --- Search Engines (5) ---
  { name: "Google", url: "https://www.google.com", domain: "google.com", category: "Search Engines", rank: "#1", visits: "85.1B", popular: true },
  { name: "Bing", url: "https://www.bing.com", domain: "bing.com", category: "Search Engines", rank: "#28", visits: "1.2B" },
  { name: "Yahoo", url: "https://www.yahoo.com", domain: "yahoo.com", category: "Search Engines", rank: "#11", visits: "3.4B" },
  { name: "DuckDuckGo", url: "https://duckduckgo.com", domain: "duckduckgo.com", category: "Search Engines", rank: "#154", visits: "700M" },
  { name: "Baidu", url: "https://www.baidu.com", domain: "baidu.com", category: "Search Engines", rank: "#6", visits: "5.1B" },

  // --- Social Media (10) ---
  { name: "Facebook", url: "https://facebook.com", domain: "facebook.com", category: "Social Media", rank: "#3", visits: "12.4B", popular: true },
  { name: "Instagram", url: "https://instagram.com", domain: "instagram.com", category: "Social Media", rank: "#4", visits: "6.7B", popular: true },
  { name: "X", url: "https://x.com", domain: "x.com", category: "Social Media", rank: "#5", visits: "6.1B", popular: true },
  { name: "TikTok", url: "https://tiktok.com", domain: "tiktok.com", category: "Social Media", rank: "#15", visits: "2.3B", popular: true },
  { name: "LinkedIn", url: "https://linkedin.com", domain: "linkedin.com", category: "Social Media", rank: "#22", visits: "1.8B" },
  { name: "Reddit", url: "https://reddit.com", domain: "reddit.com", category: "Social Media", rank: "#18", visits: "2.1B" },
  { name: "Pinterest", url: "https://pinterest.com", domain: "pinterest.com", category: "Social Media", rank: "#31", visits: "1.1B" },
  { name: "Snapchat", url: "https://snapchat.com", domain: "snapchat.com", category: "Social Media", rank: "#102", visits: "800M" },
  { name: "Threads", url: "https://threads.net", domain: "threads.net", category: "Social Media", rank: "#145", visits: "750M" },
  { name: "Quora", url: "https://quora.com", domain: "quora.com", category: "Social Media", rank: "#78", visits: "900M" },

  // --- Video & Streaming (8) ---
  { name: "YouTube", url: "https://youtube.com", domain: "youtube.com", category: "Video & Streaming", rank: "#2", visits: "33.2B", popular: true },
  { name: "Netflix", url: "https://netflix.com", domain: "netflix.com", category: "Video & Streaming", rank: "#19", visits: "2.0B", popular: true },
  { name: "Twitch", url: "https://twitch.tv", domain: "twitch.tv", category: "Video & Streaming", rank: "#44", visits: "1.1B" },
  { name: "Vimeo", url: "https://vimeo.com", domain: "vimeo.com", category: "Video & Streaming", rank: "#185", visits: "600M" },
  { name: "Dailymotion", url: "https://dailymotion.com", domain: "dailymotion.com", category: "Video & Streaming", rank: "#340", visits: "250M" },
  { name: "Disney+", url: "https://hotstar.com", domain: "hotstar.com", category: "Video & Streaming", rank: "#210", visits: "400M" },
  { name: "Prime Video", url: "https://primevideo.com", domain: "primevideo.com", category: "Video & Streaming", rank: "#150", visits: "500M" },
  { name: "Spotify", url: "https://spotify.com", domain: "spotify.com", category: "Video & Streaming", rank: "#65", visits: "900M" },

  // --- E-Commerce (10) ---
  { name: "Amazon", url: "https://amazon.com", domain: "amazon.com", category: "E-Commerce", rank: "#12", visits: "2.8B", popular: true },
  { name: "Flipkart", url: "https://flipkart.com", domain: "flipkart.com", category: "E-Commerce", country: 'in', rank: "#90", visits: "450M", popular: true },
  { name: "eBay", url: "https://ebay.com", domain: "ebay.com", category: "E-Commerce", country: 'global', rank: "#35", visits: "1.1B" },
  { name: "AliExpress", url: "https://aliexpress.com", domain: "aliexpress.com", category: "E-Commerce", country: 'global', rank: "#42", visits: "950M" },
  { name: "Etsy", url: "https://etsy.com", domain: "etsy.com", category: "E-Commerce", country: 'global', rank: "#55", visits: "800M" },
  { name: "Walmart", url: "https://walmart.com", domain: "walmart.com", category: "E-Commerce", country: 'global', rank: "#68", visits: "700M" },
  { name: "Meesho", url: "https://meesho.com", domain: "meesho.com", category: "E-Commerce", country: 'in', rank: "#240", visits: "150M" },
  { name: "Myntra", url: "https://myntra.com", domain: "myntra.com", category: "E-Commerce", country: 'in', rank: "#310", visits: "120M" },
  { name: "Shopee", url: "https://shopee.com", domain: "shopee.com", category: "E-Commerce", country: 'global', rank: "#110", visits: "600M" },
  { name: "Target", url: "https://target.com", domain: "target.com", category: "E-Commerce", country: 'global', rank: "#140", visits: "550M" },

  // --- AI / Tech Tools (7) ---
  { name: "ChatGPT", url: "https://chat.openai.com", domain: "openai.com", category: "AI / Tech Tools", rank: "#17", visits: "1.6B", popular: true },
  { name: "Claude", url: "https://claude.ai", domain: "anthropic.com", category: "AI / Tech Tools", rank: "#450", visits: "80M" },
  { name: "GitHub", url: "https://github.com", domain: "github.com", category: "AI / Tech Tools", rank: "#52", visits: "950M", popular: true },
  { name: "Stack Overflow", url: "https://stackoverflow.com", domain: "stackoverflow.com", category: "AI / Tech Tools", rank: "#145", visits: "400M" },
  { name: "Canva", url: "https://canva.com", domain: "canva.com", category: "AI / Tech Tools", rank: "#98", visits: "650M" },
  { name: "Google Drive", url: "https://drive.google.com", domain: "google.com", category: "AI / Tech Tools", rank: "#1", visits: "N/A" },
  { name: "Dropbox", url: "https://dropbox.com", domain: "dropbox.com", category: "AI / Tech Tools", rank: "#180", visits: "350M" },

  // --- News & Knowledge (10) ---
  { name: "Wikipedia", url: "https://wikipedia.org", domain: "wikipedia.org", category: "News & Knowledge", rank: "#7", visits: "4.8B", popular: true },
  { name: "BBC", url: "https://bbc.com", domain: "bbc.com", category: "News & Knowledge", rank: "#85", visits: "700M" },
  { name: "CNN", url: "https://cnn.com", domain: "cnn.com", category: "News & Knowledge", rank: "#95", visits: "650M" },
  { name: "NY Times", url: "https://nytimes.com", domain: "nytimes.com", category: "News & Knowledge", rank: "#110", visits: "600M" },
  { name: "HT News", url: "https://hindustantimes.com", domain: "hindustantimes.com", category: "News & Knowledge", country: 'in', rank: "#180", visits: "250M" },
  { name: "NDTV", url: "https://ndtv.com", domain: "ndtv.com", category: "News & Knowledge", country: 'in', rank: "#190", visits: "240M" },
  { name: "The Guardian", url: "https://theguardian.com", domain: "theguardian.com", category: "News & Knowledge", rank: "#140", visits: "400M" },
  { name: "Reuters", url: "https://reuters.com", domain: "reuters.com", category: "News & Knowledge", rank: "#210", visits: "220M" },
  { name: "TOI", url: "https://timesofindia.indiatimes.com", domain: "indiatimes.com", category: "News & Knowledge", country: 'in', rank: "#150", visits: "300M" },
  { name: "Bloomberg", url: "https://bloomberg.com", domain: "bloomberg.com", category: "News & Knowledge", rank: "#280", visits: "180M" },

  // --- Work & Productivity (10) ---
  { name: "Gmail", url: "https://mail.google.com", domain: "gmail.com", category: "Work & Productivity", rank: "#1", visits: "N/A", popular: true },
  { name: "Outlook", url: "https://outlook.live.com", domain: "outlook.com", category: "Work & Productivity", rank: "#1", visits: "N/A" },
  { name: "Yahoo Mail", url: "https://mail.yahoo.com", domain: "yahoo.com", category: "Work & Productivity", rank: "#11", visits: "N/A" },
  { name: "Zoho Mail", url: "https://zoho.com/mail", domain: "zoho.com", category: "Work & Productivity", country: 'in', rank: "#350", visits: "50M" },
  { name: "Notion", url: "https://notion.so", domain: "notion.so", category: "Work & Productivity", rank: "#380", visits: "150M", popular: true },
  { name: "Trello", url: "https://trello.com", domain: "trello.com", category: "Work & Productivity", rank: "#520", visits: "110M" },
  { name: "Slack", url: "https://slack.com", domain: "slack.com", category: "Work & Productivity", rank: "#410", visits: "140M" },
  { name: "Office", url: "https://office.com", domain: "office.com", category: "Work & Productivity", rank: "#25", visits: "1.5B" },
  { name: "Google Docs", url: "https://docs.google.com", domain: "docs.google.com", category: "Work & Productivity", rank: "#1", visits: "N/A" },
  { name: "WeTransfer", url: "https://wetransfer.com", domain: "wetransfer.com", category: "Work & Productivity", rank: "#320", visits: "180M" },

  // --- Gaming (10) ---
  { name: "Steam", url: "https://store.steampowered.com", domain: "steampowered.com", category: "Gaming", rank: "#110", visits: "500M" },
  { name: "Epic Games", url: "https://epicgames.com", domain: "epicgames.com", category: "Gaming", rank: "#280", visits: "200M" },
  { name: "Roblox", url: "https://roblox.com", domain: "roblox.com", category: "Gaming", rank: "#24", visits: "1.1B", popular: true },
  { name: "IGN", url: "https://ign.com", domain: "ign.com", category: "Gaming", rank: "#410", visits: "140M" },
  { name: "GameSpot", url: "https://gamespot.com", domain: "gamespot.com", category: "Gaming", rank: "#650", visits: "80M" },
  { name: "PlayStation", url: "https://playstation.com", domain: "playstation.com", category: "Gaming", rank: "#320", visits: "180M" },
  { name: "Xbox", url: "https://xbox.com", domain: "xbox.com", category: "Gaming", rank: "#380", visits: "160M" },
  { name: "EA", url: "https://ea.com", domain: "ea.com", category: "Gaming", rank: "#450", visits: "100M" },
  { name: "Minecraft", url: "https://minecraft.net", domain: "minecraft.net", category: "Gaming", rank: "#520", visits: "90M" },
  { name: "Fandom", url: "https://fandom.com", domain: "fandom.com", category: "Gaming", rank: "#45", visits: "1.2B" },

  // --- Finance & Crypto (10) ---
  { name: "PayPal", url: "https://paypal.com", domain: "paypal.com", category: "Finance & Crypto", rank: "#48", visits: "600M" },
  { name: "Stripe", url: "https://stripe.com", domain: "stripe.com", category: "Finance & Crypto", rank: "#410", visits: "120M" },
  { name: "Coinbase", url: "https://coinbase.com", domain: "coinbase.com", category: "Finance & Crypto", rank: "#380", visits: "150M" },
  { name: "Binance", url: "https://binance.com", domain: "binance.com", category: "Finance & Crypto", rank: "#115", visits: "350M", popular: true },
  { name: "TradingView", url: "https://tradingview.com", domain: "tradingview.com", category: "Finance & Crypto", rank: "#82", visits: "400M" },
  { name: "Investing.com", url: "https://investing.com", domain: "investing.com", category: "Finance & Crypto", rank: "#154", visits: "220M" },
  { name: "Moneycontrol", url: "https://moneycontrol.com", domain: "moneycontrol.com", category: "Finance & Crypto", country: 'in', rank: "#180", visits: "190M" },
  { name: "Zerodha", url: "https://zerodha.com", domain: "zerodha.com", category: "Finance & Crypto", country: 'in', rank: "#310", visits: "80M" },
  { name: "PhonePe", url: "https://phonepe.com", domain: "phonepe.com", category: "Finance & Crypto", country: 'in', rank: "#450", visits: "50M" },
  { name: "Google Pay", url: "https://pay.google.com", domain: "google.com", category: "Finance & Crypto", rank: "#1", visits: "N/A" },

  // --- Travel & Maps (10) ---
  { name: "Google Maps", url: "https://maps.google.com", domain: "google.com", category: "Travel & Maps", rank: "#1", visits: "N/A", popular: true },
  { name: "Uber", url: "https://uber.com", domain: "uber.com", category: "Travel & Maps", rank: "#180", visits: "150M" },
  { name: "Airbnb", url: "https://airbnb.com", domain: "airbnb.com", category: "Travel & Maps", rank: "#115", visits: "320M" },
  { name: "Booking.com", url: "https://booking.com", domain: "booking.com", category: "Travel & Maps", rank: "#52", visits: "650M", popular: true },
  { name: "Tripadvisor", url: "https://tripadvisor.com", domain: "tripadvisor.com", category: "Travel & Maps", rank: "#145", visits: "250M" },
  { name: "MakeMyTrip", url: "https://makemytrip.com", domain: "makemytrip.com", category: "Travel & Maps", country: 'in', rank: "#410", visits: "60M" },
  { name: "Skyscanner", url: "https://skyscanner.com", domain: "skyscanner.net", category: "Travel & Maps", rank: "#320", visits: "110M" },
  { name: "Expedia", url: "https://expedia.com", domain: "expedia.com", category: "Travel & Maps", rank: "#210", visits: "180M" },
  { name: "Kayak", url: "https://kayak.com", domain: "kayak.com", category: "Travel & Maps", rank: "#580", visits: "70M" },
  { name: "Agoda", url: "https://agoda.com", domain: "agoda.com", category: "Travel & Maps", rank: "#350", visits: "130M" },

  // --- Learning & Freelancing (10) ---
  { name: "Coursera", url: "https://coursera.org", domain: "coursera.org", category: "Learning & Freelancing", rank: "#450", visits: "85M" },
  { name: "Udemy", url: "https://udemy.com", domain: "udemy.com", category: "Learning & Freelancing", rank: "#210", visits: "140M" },
  { name: "Khan Academy", url: "https://khanacademy.org", domain: "khanacademy.org", category: "Learning & Freelancing", rank: "#520", visits: "75M" },
  { name: "Medium", url: "https://medium.com", domain: "medium.com", category: "Learning & Freelancing", rank: "#110", visits: "210M", popular: true },
  { name: "Fiverr", url: "https://fiverr.com", domain: "fiverr.com", category: "Learning & Freelancing", rank: "#185", visits: "150M", popular: true },
  { name: "Upwork", url: "https://upwork.com", domain: "upwork.com", category: "Learning & Freelancing", rank: "#240", visits: "120M" },
  { name: "Freelancer", url: "https://freelancer.com", domain: "freelancer.com", category: "Learning & Freelancing", rank: "#580", visits: "40M" },
  { name: "WordPress", url: "https://wordpress.com", domain: "wordpress.com", category: "Learning & Freelancing", rank: "#48", visits: "450M" },
  { name: "Wix", url: "https://wix.com", domain: "wix.com", category: "Learning & Freelancing", rank: "#154", visits: "180M" },
  { name: "Adobe", url: "https://adobe.com", domain: "adobe.com", category: "Learning & Freelancing", rank: "#65", visits: "350M" }
];