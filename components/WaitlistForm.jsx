'use client';
import { useState } from 'react';

export default function WaitlistForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        country: 'india',
        state: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: '', message: '' });

        try {
            const response = await fetch('https://piecom.in/api/waitlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSubmitStatus({
                    type: 'success',
                    message: 'Thank you for joining our waitlist!'
                });
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    country: 'india',
                    state: ''
                });
            } else {
                throw new Error('Failed to submit');
            }
        } catch (error) {
            setSubmitStatus({
                type: 'error',
                message: 'Something went wrong. Please try again later.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="waitlist_form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                {/* ...existing country select... */}
                <div className="form-group">
                    <label htmlFor="state">State</label>
                    <select name="state" id="state" aria-readonly="true" value={formData.state}
                        onChange={handleChange} required>
                        <option value="andhrapradesh">Andhra Pradesh</option>
                        <option value="arunachalpradesh">Arunachal Pradesh</option>
                        <option value="assam">Assam</option>
                        <option value="bihar">Bihar</option>
                        <option value="chhattisgarh">Chhattisgarh</option>
                        <option value="goa">Goa</option>
                        <option value="gujarat">Gujarat</option>
                        <option value="haryana">Haryana</option>
                        <option value="himachalpradesh">Himachal Pradesh</option>
                        <option value="jharkhand">Jharkhand</option>
                        <option value="karnataka">Karnataka</option>
                        <option value="kerala">Kerala</option>
                        <option value="madhyapradesh">Madhya Pradesh</option>
                        <option value="maharashtra">Maharashtra</option>
                        <option value="manipur">Manipur</option>
                        <option value="meghalaya">Meghalaya</option>
                        <option value="mizoram">Mizoram</option>
                        <option value="nagaland">Nagaland</option>
                        <option value="odisha">Odisha</option>
                        <option value="punjab">Punjab</option>
                        <option value="rajasthan">Rajasthan</option>
                        <option value="sikkim">Sikkim</option>
                        <option value="tamilnadu">Tamil Nadu</option>
                        <option value="telangana">Telangana</option>
                        <option value="tripura">Tripura</option>
                        <option value="uttarpradesh">Uttar Pradesh</option>
                        <option value="uttarakhand">Uttarakhand</option>
                        <option value="westbengal">West Bengal</option>
                    </select>
                </div>
                <div className="form-group">
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Join Waitlist'}
                    </button>
                </div>
                {submitStatus.message && (
                    <div className={`submit-status ${submitStatus.type}`}>
                        {submitStatus.message}
                    </div>
                )}
            </form>
        </div>
    );
}
