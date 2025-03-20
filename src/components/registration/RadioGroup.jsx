
const RadioGroup = ({ 
  label, 
  options, 
  name, 
  value, 
  onChange, 
  error 
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {label}
      </label>
      <div className="space-y-3">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              type="radio"
              id={option.value}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className="w-5 h-5 text-sport-blue focus:ring-sport-blue"
            />
            <label htmlFor={option.value} className="ml-3 text-gray-700">
              {option.label}
            </label>
          </div>
        ))}
        
        {error && (
          <p className="text-red-500 text-sm mt-1 animate-fade-in">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default RadioGroup;
