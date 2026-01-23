
export interface AttractionState {
  visits: number;
  points: number;
  clicks: Record<string, number>;
  cats: Record<string, number>;
  mood: string | null;
  lastVisit: string;
}

const STORAGE_KEY = "ua_v2_storage";

export const getAttractionState = (): AttractionState => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {
    visits: 0,
    points: 0,
    clicks: {},
    cats: {},
    mood: null,
    lastVisit: new Date().toISOString()
  };
};

export const updateAttractionState = (update: Partial<AttractionState>) => {
  const state = getAttractionState();
  const newState = { ...state, ...update };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  window.dispatchEvent(new Event('ua_update'));
  return newState;
};

export const trackToolClick = (slug: string, category: string) => {
  const state = getAttractionState();
  
  const clicks = { ...state.clicks };
  clicks[slug] = (clicks[slug] || 0) + 1;
  
  const cats = { ...state.cats };
  cats[category] = (cats[category] || 0) + 1;
  
  // Reward: 10 XP for discovery, 2 XP for usage
  const xpGain = state.clicks[slug] ? 2 : 10;
  
  updateAttractionState({
    clicks,
    cats,
    points: state.points + xpGain
  });

  return xpGain;
};

export const getUserLevel = (points: number) => {
  return Math.floor(points / 50) + 1;
};

export const getTopCategories = (): string[] => {
  const state = getAttractionState();
  return Object.entries(state.cats)
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .slice(0, 2)
    .map(entry => entry[0]);
};

export const getToolOfDay = (tools: any[]): any => {
  const day = new Date().getDate();
  const month = new Date().getMonth();
  const seed = day + month;
  return tools[seed % tools.length];
};
