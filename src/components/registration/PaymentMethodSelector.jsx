
import Bkash_logo from '../../images/BKash-Logo.wine.svg';
import Nagad_logo from '../../images/Nagad-Logo.wine.png';
import Rocket_logo from '../../images/Rocket-Logo.png';

const PaymentMethodSelector = ({ 
  paymentMethod, 
  onChange, 
  isSubmitting, 
  options = ["Bkash", "Nagad", "Rocket"] 
}) => {
  const getPaymentLogo = (method) => {
    switch(method) {
      case 'Bkash':
        return (
          <div className='flex items-center justify-center'>
            <img className='w-20' src={Bkash_logo} alt="Bkash" />
            <p className='font-semibold'>Bkash Payment</p>
          </div>
        );
      case 'Nagad':
        return (
          <div className='flex items-center justify-center'>
            <img className='w-20' src={Nagad_logo} alt="Nagad" />
            <p className='font-semibold'>Nagad Payment</p>
          </div>
        );
      case 'Rocket':
        return (
          <div className='flex items-center justify-center'>
            <img className='w-14' src={Rocket_logo} alt="Rocket" />
            <p className='font-semibold'>Rocket Payment</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {isSubmitting ? (
        <span className="flex items-center justify-center h-3">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
      ) : (
        getPaymentLogo(paymentMethod)
      )}
    </div>
  );
};

export default PaymentMethodSelector;
