import { useState } from 'react';
import './Register.css'; 

const GridIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

export default function Register({ onRegister, onSwitchToLogin }) {
  // 1. State for all 9 fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    gender: '',
    role: '',
    department: '',
    phone: '+94 ', // Default country code setup
    password: '',
    confirmPassword: ''
  });

  // 2. Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle Form Submit & Validation
  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match! Please check.");
      return;
    }

    // Call parent handler
    onRegister?.(formData);
    
    // Clear form
    setFormData({
      name: '',
      email: '',
      dob: '',
      gender: '',
      role: '',
      department: '',
      phone: '+94 ',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-header">
          <div className="register-logo-box">
            <div className="register-logo-icon">
              <GridIcon />
              <span>CollabBoard</span>
            </div>
          </div>
          <h1 className="register-title">Create your account</h1>
          <p className="register-subtitle">Join your workspace and start collaborating.</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          
          <div className="register-field">
            <label htmlFor="register-name">Full Name</label>
            <input id="register-name" type="text" name="name" placeholder="Your full name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="register-field">
            <label htmlFor="register-email">Email Address</label>
            <input id="register-email" type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="register-field">
            <label htmlFor="register-dob">Date of Birth</label>
            <input id="register-dob" type="date" name="dob" value={formData.dob} onChange={handleChange} required />
          </div>

          <div className="register-field">
            <label htmlFor="register-gender">Gender</label>
            <select id="register-gender" name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </div>

          <div className="register-field">
            <label htmlFor="register-role">Job Role</label>
            <select id="register-role" name="role" value={formData.role} onChange={handleChange} required>
              <option value="">Select Role</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="manager">Project Manager</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="register-field">
            <label htmlFor="register-department">Department</label>
            <input id="register-department" type="text" name="department" placeholder="e.g., IT, Marketing" value={formData.department} onChange={handleChange} required />
          </div>

          <div className="register-field">
            <label htmlFor="register-phone">Phone Number</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>

          <div className="register-field">
            <label htmlFor="register-password">Password</label>
            <input id="register-password" type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          <div className="register-field">
            <label htmlFor="register-confirm-password">Confirm Password</label>
            <input id="register-confirm-password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </div>

          <button className="register-btn" type="submit">Create account</button>
        </form>

        <p className="register-footer">
          Already have an account?{' '}
          <button type="button" className="register-footer__link" onClick={onSwitchToLogin}>
            Log in here
          </button>
        </p>
      </div>
    </div>
  );
}