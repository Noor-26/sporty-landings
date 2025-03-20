
import { useState, useRef, useEffect, useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { updateProfile } from 'firebase/auth';

// Import custom components
import FormField from './FormField';
import SelectField from './SelectField';
import RadioGroup from './RadioGroup';
import TShirtSizeSelector from './TShirtSizeSelector';
import PaymentMethodSelector from './PaymentMethodSelector';

// Import constants and utilities
import { divisions, bangladeshDivisions, payment_methods, jerseyOptions } from './constants';
import { validateForm, isFormValid } from './formValidation';

const RegistrationForm = () => {
  const { user, createUserEmailPass } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    division: '',
    district: '',
    area: '',
    address: '',
    jerseyOption: '',
    t_size: 'M',
    payment_method: '',
    password: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFormValidState, setIsFormValidState] = useState(false);
  const [isFocused, setIsFocused] = useState({});
  const [showAmount, setShowAmount] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const paymentTextRef = useRef(null);
  const formRef = useRef(null);
  
  // Validate form on data change
  useEffect(() => {
    setIsFormValidState(isFormValid(formData));
  }, [formData]);
  
  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
    
    // Show amount when jersey option changes
    if (name === 'jerseyOption' && value) {
      setShowAmount(true);
      
      // Use setTimeout to ensure ref is available after state update
      setTimeout(() => {
        if (paymentTextRef.current) {
          const amount = value === 'withoutJersey' ? '650 Taka' : '800 Taka';
          paymentTextRef.current.textContent = `Your payment amount: ${amount}`;
        }
      }, 100);
    }
  };
  
  // Form validation
  const validateFormSubmission = () => {
    const newErrors = validateForm(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateFormSubmission()) return;
  
    setIsSubmitting(true);
    setLoading(true);
  
    try {
      console.log("Submitting form...");
      initiatePayment();
      
      // User creation logic
      let currentUser = user;
      if (!currentUser) {
        const userCredential = await createUserEmailPass(formData.name, formData.email, formData.password);
        currentUser = userCredential.user;
        
        await updateProfile(currentUser, {
          displayName: formData.name
        });
        console.log("Profile updated!");
      }
  
      // Registration API call
      const response = await fetch('http://localhost:8000/api/registrations/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          user_email: currentUser?.email,
          phone_number: formData.number,
          division: formData.division,
          district: formData.district,
          area: formData.area,
          address: formData.address,
          with_jersey: formData.jerseyOption === "withJersey",
          t_shirt_size: formData.t_size === '' ? 'NO' : formData.t_size,
          account_number: "123456789012",
          payment_method: formData.payment_method,
          transaction_id: "rdxt",
        })
      });
  
      if (!response.ok) {
        throw new Error('Registration failed');
      }
  
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        number: '',
        division: '',
        district: '',
        area: '',
        address: '',
        jerseyOption: '',
        t_size: `${formData.jerseyOption === "withJersey" && formData.t_size === '' ? 'M' : ''}`,
        payment_method: ''
      });
      
      setShowAmount(false);
      alert('Registration successful! Thank you for participating.');
    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };
  
  const initiatePayment = async () => {
    const full_address = formData.address + ',' + formData.area + ',' + formData.district + ',' + formData.division;
    const res = await fetch('http://localhost:8000/api/payments/init/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: formData.jerseyOption === "withJersey" ? 800 : 650,
        name: formData.name,
        email: formData.email,
        address: full_address,
        phone: Number(formData.number),
      }),
    });
  
    const data = await res.json();
    if (data.payment_url) {
      window.location.href = data.payment_url;
    } else {
      alert("Failed to initiate payment");
    }
    console.log(data);
  };
  
  // Animation for form entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (formRef.current) {
      observer.observe(formRef.current);
    }
    
    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, []);
  
  return (
    <section className="py-8 bg-white" id="registration">
      <div className="section-container">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-title inline-block">Register Now</h2>
            <p className="text-gray-600 mt-4">
              Join the SportsSphere community for this exciting virtual run event.
            </p>
          </div>
          
          <div 
            ref={formRef} 
            className="bg-white rounded-2xl shadow-xl p-8 opacity-0"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name field */}
              <FormField
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setIsFocused({...isFocused, name: true})}
                onBlur={() => setIsFocused({...isFocused, name: false})}
                placeholder="Your full name"
                label="Full Name"
                error={errors.name}
                isFocused={isFocused.name}
              />
              
              {/* Email field */}
              <FormField
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setIsFocused({...isFocused, email: true})}
                onBlur={() => setIsFocused({...isFocused, email: false})}
                placeholder="your.email@example.com"
                label="Email Address"
                error={errors.email}
                isFocused={isFocused.email}
              />
              
              {/* Phone number field */}
              <FormField
                id="number"
                name="number"
                type="tel"
                value={formData.number}
                onChange={handleChange}
                onFocus={() => setIsFocused({...isFocused, number: true})}
                onBlur={() => setIsFocused({...isFocused, number: false})}
                placeholder="Your phone number"
                label="Phone Number"
                error={errors.number}
                isFocused={isFocused.number}
              />

              {/* Division selection */}
              <SelectField
                id="division"
                name="division"
                value={formData.division}
                onChange={handleChange}
                onFocus={() => setIsFocused({...isFocused, division: true})}
                onBlur={() => setIsFocused({...isFocused, division: false})}
                label="Division"
                error={errors.division}
                isFocused={isFocused.division}
                options={divisions}
                placeholder="Select Division"
              />
              
              {/* District selection */}
              <SelectField
                id="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
                onFocus={() => setIsFocused({...isFocused, district: true})}
                onBlur={() => setIsFocused({...isFocused, district: false})}
                label="District"
                error={errors.district}
                isFocused={isFocused.district}
                options={bangladeshDivisions[formData.division] || []}
                placeholder={formData.division === '' ? "Select division before select district" : "Select District"}
                disabled={formData.division === ''}
              />
              
              {/* Area field */}
              <FormField
                id="area"
                name="area"
                type="text"
                value={formData.area}
                onChange={handleChange}
                onFocus={() => setIsFocused({...isFocused, area: true})}
                onBlur={() => setIsFocused({...isFocused, area: false})}
                placeholder="Your Area name"
                label="Area"
                error={errors.area}
                isFocused={isFocused.area}
              />
              
              {/* Address field */}
              <FormField
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                onFocus={() => setIsFocused({...isFocused, address: true})}
                onBlur={() => setIsFocused({...isFocused, address: false})}
                placeholder="Your address name"
                label="Address"
                error={errors.address}
                isFocused={isFocused.address}
              />
              
              {/* Jersey option */}
              <RadioGroup
                label="Category"
                options={jerseyOptions}
                name="jerseyOption"
                value={formData.jerseyOption}
                onChange={handleChange}
                error={errors.jerseyOption}
              />
              
              {/* T-shirt size selector (conditional) */}
              {formData.jerseyOption === 'withJersey' && (
                <TShirtSizeSelector
                  selectedSize={formData.t_size}
                  onChange={handleChange}
                />
              )}
              
              {/* Payment method selection */}
              <SelectField
                id="payment_method"
                name="payment_method"
                value={formData.payment_method}
                onChange={handleChange}
                onFocus={() => setIsFocused({...isFocused, payment_method: true})}
                onBlur={() => setIsFocused({...isFocused, payment_method: false})}
                label="Payment Method"
                error={errors.payment_method}
                isFocused={isFocused.payment_method}
                options={payment_methods}
                placeholder="Select payment method"
              />
              
              {/* Display amount */}
              {showAmount && (
                <div className="p-4 bg-gray-50 rounded-lg w-full overflow-x-auto">
                  <p 
                    ref={paymentTextRef} 
                    className="font-medium text-sport-blue break-words"
                  ></p>
                </div>
              )}
              
              {/* Password field (conditional) */}
              {user === null && (
                <FormField
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setIsFocused({...isFocused, password: true})}
                  onBlur={() => setIsFocused({...isFocused, password: false})}
                  placeholder="Create your password"
                  label="Create your password"
                  error={errors.password}
                  isFocused={isFocused.password}
                />
              )}
              
              {/* Submit button */}
              {isFormValidState && (
                <button
                  type="submit"
                  disabled={!isFormValidState || isSubmitting}
                  className={`w-full py-3 rounded-lg font-medium text-white transition-all duration-300 ${
                    isFormValidState && !isSubmitting
                      ? 'bg-sport-blue hover:bg-blue-600 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  <PaymentMethodSelector 
                    paymentMethod={formData.payment_method} 
                    isSubmitting={isSubmitting}
                  />
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
