
const TShirtSizeSelector = ({ selectedSize, onChange }) => {
  const sizes = ['M', 'L', 'XL', 'XXL'];
  
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Select Jersey Size
      </label>
      <div className='space-x-2 flex items-center'>
        {sizes.map(size => (
          <div key={size} className="">
            <input
              type="radio"
              id={size}
              name="t_size"
              value={size}
              checked={selectedSize === size}
              onChange={onChange}
              className="appearance-none text-sport-blue focus:ring-sport-blue"
            />
            <label 
              htmlFor={size} 
              className={selectedSize === size
                ? "bg-blue-200 px-3 py-1 rounded-2xl border-2 text-gray-700"
                : "px-3 py-1 rounded-2xl border-2 text-gray-700"}
            >
              {size}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TShirtSizeSelector;
