
export const validateForm = (formData) => {
  const newErrors = {};
  
  if (!formData.name.trim()) {
    newErrors.name = 'Name is required';
  }
  
  if (!formData.email.trim()) {
    newErrors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'Email is invalid';
  }
  
  if (!formData.number.trim()) {
    newErrors.number = 'Phone number is required';
  } else if (!/^\d{10,}$/.test(formData.number.replace(/\D/g, ''))) {
    newErrors.number = 'Phone number is invalid';
  }
  
  if (!formData.area.trim()) {
    newErrors.area = 'Area is required';
  }
  
  if (!formData.address.trim()) {
    newErrors.address = 'Address is required';
  }
  
  if (!formData.jerseyOption) {
    newErrors.jerseyOption = 'Please select a jersey option';
  }
  
  if (!formData.payment_method) {
    newErrors.payment_method = 'Please select a payment method';
  }
  
  return newErrors;
};

export const isFormValid = (formData) => {
  return (
    formData.name !== '' && 
    formData.email.trim() !== '' && 
    formData.number.trim() !== '' && 
    formData.division.trim() !== '' && 
    formData.district.trim() !== '' && 
    formData.area.trim() !== '' && 
    formData.address.trim() !== '' && 
    formData.jerseyOption !== '' &&
    formData.payment_method.trim() !== ''
  );
};
