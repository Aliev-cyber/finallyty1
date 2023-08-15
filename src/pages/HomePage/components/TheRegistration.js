import { useNavigate } from 'react-router-dom';
import BaseButton from './BaseButton';
import TheRegistrationInfo from './TheRegistrationInfo';

function TheRegistration() {
  const navigate = useNavigate()
  return (
    <div
      className="bg-gradient-to-r from-[#af2896] to-[#509bf5] text-white py-4 px-8 flex justify-between items-center flex-wrap gap-x-6 gap-y-2"
    >
      <TheRegistrationInfo />
      <BaseButton primary onClick={() => navigate('/auth')}>Sign up free</BaseButton>
    </div>
  );
}

export default TheRegistration;
