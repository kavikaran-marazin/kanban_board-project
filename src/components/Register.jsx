import { useState } from 'react';
import './Register.css'; 

export default function Register() {
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

    // Console-la data theliva log aagum
    console.log("Ready to send to Backend:", formData);
    alert("Validation Success! Form Data logged in console.");
  };

  return (
    <div className="register-container">
      {/* 9 fields irukkardhala scroll pandra madhiri style add pannirukku */}
      <div className="register-card" style={{ maxHeight: '85vh', overflowY: 'auto' }}>
        <h2>Register Account</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <input type="date" name="dob" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select name="gender" onChange={handleChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px' }}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </div>

          <div className="form-group">
            <label>Job Role</label>
            <select name="role" onChange={handleChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px' }}>
              <option value="">Select Role</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="manager">Project Manager</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Department</label>
            <input type="text" name="department" placeholder="e.g., IT, Marketing" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" onChange={handleChange} required />
          </div>

          <button type="submit" style={{ marginTop: '10px', width: '100%' }}>Sign Up</button>
        </form>
      </div>
    </div>
  );
}