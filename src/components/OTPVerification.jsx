import React, { useState, useRef, useEffect } from 'react';

const OTPVerification = ({ onVerify }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) { // Only allow digits
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto focus to next input
      if (value && index < 3) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length === 4) {
      onVerify();
    } else {
      alert('Please enter a valid 4-digit OTP');
    }
  };

  // Auto focus first input on component mount
  useEffect(() => {
    inputRefs[0].current.focus();
  }, []);

  return (
    <div className="otp-page">
      <div className="otp-container">
        <form className="otp-form" onSubmit={handleSubmit}>
          <div className="otp-title">OTP</div>
          <div className="otp-title">Verification Code</div>
          <p className="otp-message">We have sent a verification code to your mobile number</p>
          
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`input${index + 1}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={inputRefs[index]}
                className="otp-input"
              />
            ))}
          </div>
          
          <button type="submit" className="otp-action-btn">verify me</button>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;