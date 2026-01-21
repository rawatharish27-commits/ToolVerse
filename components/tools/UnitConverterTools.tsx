import React, { useState } from 'react';
import ToolLayout from '../ToolLayout';
import OptionsPanel from '../OptionsPanel';
import { 
  lengthConverterConfig, 
  weightConverterConfig, 
  temperatureConverterConfig, 
  speedConverterConfig,
  areaConverterConfig,
  volumeConverterConfig,
  dataSizeConverterConfig
} from '../../config/unitConverterTools';

interface ToolProps {
  slug: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const LENGTH_RATES: Record<string, number> = {
  meter: 1,
  kilometer: 1000,
  centimeter: 0.01,
  millimeter: 0.001,
  inch: 0.0254,
  foot: 0.3048,
  yard: 0.9144,
  mile: 1609.34,
};

const WEIGHT_RATES: Record<string, number> = {
  kg: 1,
  g: 0.001,
  lb: 0.45359237,
  oz: 0.0283495231,
  ton: 1000,
  mg: 0.000001,
};

const SPEED_RATES: Record<string, number> = {
  "m/s": 1,
  "km/h": 0.2777777778,
  "mph": 0.44704,
  "knot": 0.514444,
};

const AREA_RATES: Record<string, number> = {
  sqm: 1,
  sqkm: 1000000,
  sqft: 0.09290304,
  acre: 4046.8564224,
  hectare: 10000,
};

const VOLUME_RATES: Record<string, number> = {
  "Liter": 1,
  "Milliliter": 0.001,
  "Cubic Meter": 1000,
  "US Gallon": 3.785411784,
  "US Cup": 0.2365882365,
};

const DATA_RATES: Record<string, number> = {
  "Byte (B)": 1,
  "Kilobyte (KB)": 1024,
  "Megabyte (MB)": 1024 ** 2,
  "Gigabyte (GB)": 1024 ** 3,
  "Terabyte (TB)": 1024 ** 4,
};

const UnitConverterTools: React.FC<ToolProps> = ({ slug, onSuccess, onError }) => {
  const [options, setOptions] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    const configs = [
      lengthConverterConfig, 
      weightConverterConfig, 
      temperatureConverterConfig, 
      speedConverterConfig,
      areaConverterConfig,
      volumeConverterConfig,
      dataSizeConverterConfig
    ];
    const target = configs.find(c => c.slug === slug);
    if (target) {
      target.options.forEach(opt => initial[opt.id] = (opt as any).default);
    }
    return initial;
  });

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleOptionChange = (id: string, value: any) => {
    setOptions(prev => ({ ...prev, [id]: value }));
  };

  const convert = () => {
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      try {
        const value = Number(options.value);
        if (isNaN(value)) {
          onError("Invalid numeric value.");
          setLoading(false);
          return;
        }

        let converted = 0;
        let fromUnit = options.from;
        let toUnit = options.to;

        if (slug === 'length-converter') {
          const inBase = value * LENGTH_RATES[fromUnit];
          converted = inBase / LENGTH_RATES[toUnit];
        } else if (slug === 'weight-converter') {
          const inBase = value * WEIGHT_RATES[fromUnit];
          converted = inBase / WEIGHT_RATES[toUnit];
        } else if (slug === 'speed-converter') {
          const inBase = value * SPEED_RATES[fromUnit];
          converted = inBase / SPEED_RATES[toUnit];
        } else if (slug === 'area-converter') {
          const inBase = value * AREA_RATES[fromUnit];
          converted = inBase / AREA_RATES[toUnit];
        } else if (slug === 'volume-converter') {
          const inBase = value * VOLUME_RATES[fromUnit];
          converted = inBase / VOLUME_RATES[toUnit];
        } else if (slug === 'data-size-converter') {
          const inBase = value * DATA_RATES[fromUnit];
          converted = inBase / DATA_RATES[toUnit];
        } else if (slug === 'temperature-converter') {
          let celsiusValue = value;
          if (fromUnit === "Fahrenheit") {
            celsiusValue = (value - 32) * 5/9;
          } else if (fromUnit === "Kelvin") {
            celsiusValue = value - 273.15;
          }

          if (toUnit === "Celsius") {
            converted = celsiusValue;
          } else if (toUnit === "Fahrenheit") {
            converted = (celsiusValue * 9/5) + 32;
          } else if (toUnit === "Kelvin") {
            converted = celsiusValue + 273.15;
          }
        }

        setResult({
          val: converted.toFixed(6).replace(/\.?0+$/, ""),
          fromUnit: fromUnit,
          toUnit: toUnit,
          original: value
        });
        onSuccess("Conversion Complete!");
      } catch (err) {
        onError("Engine failure during conversion.");
      }
      setLoading(false);
    }, 200);
  };

  const swapUnits = () => {
    setOptions(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from
    }));
    setResult(null);
  };

  const currentConfig = slug === 'length-converter' ? lengthConverterConfig : 
                       slug === 'weight-converter' ? weightConverterConfig :
                       slug === 'temperature-converter' ? temperatureConverterConfig :
                       slug === 'speed-converter' ? speedConverterConfig :
                       slug === 'area-converter' ? areaConverterConfig :
                       slug === 'volume-converter' ? volumeConverterConfig : 
                       slug === 'data-size-converter' ? dataSizeConverterConfig : {
    title: slug.replace(/-/g, ' '),
    description: "Unit conversion utility.",
    icon: "🔢",
    colorClass: "bg-emerald-600",
    options: []
  };

  const inputSlot = (
    <div className="space-y-8 py-4 text-center">
      <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-[3rem] border border-slate-100">
        <div className="text-6xl mb-4">{currentConfig.icon || '📐'}</div>
        <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">
          {slug.replace(/-/g, ' ')} Engine Active
        </p>
      </div>
    </div>
  );

  const resultSlot = result && (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4">
      <div className="p-10 bg-indigo-50 rounded-[3rem] border border-indigo-100 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
           <div className="text-8xl font-black italic select-none">RESULT</div>
        </div>
        <div className="relative z-10">
          <div className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-4">Converted Value</div>
          <div className="text-5xl md:text-7xl font-black text-indigo-600 tracking-tighter break-all">
            {result.val}
            {slug === 'temperature-converter' && result.toUnit === 'Celsius' && '°C'}
            {slug === 'temperature-converter' && result.toUnit === 'Fahrenheit' && '°F'}
            {slug === 'temperature-converter' && result.toUnit === 'Kelvin' && 'K'}
          </div>
          <div className="text-lg font-bold text-indigo-400 mt-2 uppercase tracking-widest">
            {result.toUnit}
          </div>
        </div>
      </div>

      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center">
        <p className="text-slate-500 font-medium italic">
          {result.original} {result.fromUnit} is exactly equal to {result.val} {result.toUnit}
        </p>
      </div>

      <div className="flex justify-center gap-4">
         <button 
          onClick={() => {
            navigator.clipboard.writeText(result.val);
            onSuccess("Value Copied!");
          }}
          className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl"
         >
           Copy Value
         </button>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title={currentConfig.title}
      description={currentConfig.description}
      icon={currentConfig.icon}
      colorClass={currentConfig.colorClass}
      input={inputSlot}
      options={<OptionsPanel options={currentConfig.options as any} values={options} onChange={handleOptionChange} />}
      actions={
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <button 
            onClick={convert} 
            disabled={loading}
            className={`py-6 ${currentConfig.colorClass} text-white rounded-[2rem] font-black text-xl shadow-2xl transition-all active:scale-95`}
          >
            {loading ? "Converting..." : "Convert Now"}
          </button>
          <button 
            onClick={swapUnits}
            className="py-6 bg-white border-2 border-slate-100 text-slate-600 rounded-[2rem] font-black text-xl shadow-lg transition-all hover:bg-slate-50"
          >
            Swap Units ⇄
          </button>
        </div>
      }
      result={resultSlot}
    />
  );
};

export default UnitConverterTools;
