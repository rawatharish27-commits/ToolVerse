
export const CONFIG = {
  options: [
    { id: 'loan', label: 'Loan Amount (Principal)', type: 'number', default: 500000 },
    { id: 'rate', label: 'Flat Rate Quoted (%)', type: 'slider', min: 1, max: 20, default: 8 },
    { id: 'months', label: 'Tenure (Months)', type: 'slider', min: 6, max: 120, default: 24 }
  ]
};
