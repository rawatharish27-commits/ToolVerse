
/**
 * Security Utility: Daily Key Rotation Limiter
 * Ensures a single user cannot rotate more than 3 keys per 24 hours.
 */

const QUOTA_KEY = 'tv_key_rotation_log';

export const canRotateKey = (): boolean => {
  const today = new Date().toDateString();
  const raw = localStorage.getItem(QUOTA_KEY);
  const log = raw ? JSON.parse(raw) : { date: today, count: 0 };

  if (log.date !== today) {
    localStorage.setItem(QUOTA_KEY, JSON.stringify({ date: today, count: 0 }));
    return true;
  }

  return log.count < 3;
};

export const incrementKeyRotation = () => {
  const today = new Date().toDateString();
  const raw = localStorage.getItem(QUOTA_KEY);
  const log = raw ? JSON.parse(raw) : { date: today, count: 0 };
  
  localStorage.setItem(QUOTA_KEY, JSON.stringify({ 
    date: today, 
    count: log.count + 1 
  }));
};
