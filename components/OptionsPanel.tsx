import React from 'react';

interface Option {
  id: string;
  label: string;
  type: 'slider' | 'select' | 'toggle' | 'number' | 'text';
  min?: number;
  max?: number;
  values?: (string | number)[];
  default?: any;
}

interface OptionsPanelProps {
  options: Option[];
  values: Record<string, any>;
  onChange: (id: string, value: any) => void;
}

const OptionsPanel: React.FC<OptionsPanelProps> = ({ options, values, onChange }) => {
  return (
    <div className="space-y-6">
      {options.map((opt) => (
        <div key={opt.id} className="space-y-3">
          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">
            {opt.label}
          </label>

          {opt.type === 'slider' && (
            <div className="space-y-2">
              <input
                type="range"
                min={opt.min}
                max={opt.max}
                value={values[opt.id] ?? opt.default}
                onChange={(e) => onChange(opt.id, parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] font-bold text-slate-400">
                <span>{opt.min}</span>
                <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{values[opt.id] ?? opt.default}</span>
                <span>{opt.max}</span>
              </div>
            </div>
          )}

          {opt.type === 'select' && (
            <select
              value={values[opt.id] ?? opt.default}
              onChange={(e) => onChange(opt.id, e.target.value)}
              className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all appearance-none cursor-pointer"
            >
              {opt.values?.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          )}

          {opt.type === 'toggle' && (
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={values[opt.id] ?? opt.default}
                onChange={(e) => onChange(opt.id, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              <span className="ml-3 text-xs font-bold text-slate-600">Enabled</span>
            </label>
          )}

          {opt.type === 'number' && (
            <input
              type="number"
              value={values[opt.id] ?? opt.default}
              onChange={(e) => onChange(opt.id, parseInt(e.target.value))}
              className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-500/10"
            />
          )}

          {opt.type === 'text' && (
            <input
              type="text"
              value={values[opt.id] ?? opt.default}
              onChange={(e) => onChange(opt.id, e.target.value)}
              className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-500/10"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default OptionsPanel;