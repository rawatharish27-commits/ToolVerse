
export const CONFIG = {
  options: [
    { 
      id: 'targetKb', 
      label: 'Target Size (KB)', 
      type: 'slider', 
      min: 10, 
      max: 500, 
      default: 50 
    },
    { 
      id: 'format', 
      label: 'Output Format', 
      type: 'select', 
      values: ['image/jpeg', 'image/webp'], 
      default: 'image/jpeg' 
    },
    { 
      id: 'precision', 
      label: 'Compression Strategy', 
      type: 'select', 
      values: ['Standard', 'High', 'Ultra'], 
      default: 'High' 
    }
  ]
};
