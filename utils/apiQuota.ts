
const LOG_KEY = 'tv_key_audit_log';

export const canRotateKey = (): boolean => {
  const today = new Date().toDateString();
  const raw = localStorage.getItem(LOG_KEY);
  const log = raw ? JSON.parse(raw) : { date: today, count: 0 };

  if (log.date !== today) {
    localStorage.setItem(LOG_KEY, JSON.stringify({ date: today, count: 0 }));
    return true;
  }
  return log.count < 3;
};

export const incrementKeyRotation = () => {
  const today = new Date().toDateString();
  const raw = localStorage.getItem(LOG_KEY);
  const log = raw ? JSON.parse(raw) : { date: today, count: 0 };
  localStorage.setItem(LOG_KEY, JSON.stringify({ date: today, count: log.count + 1 }));
};
