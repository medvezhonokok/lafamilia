import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from '@formspree/react';
import './OrderSamples.css';

const OrderSamples = () => {
    const [state, handleSubmit] = useForm("manoeyrp");
    const [showForm, setShowForm] = useState(false);

    const [formErrors, setFormErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        company: '',
        info: ''
    });

    const validateForm = () => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

        if (!formData.name.trim()) errors.name = 'Name is required';
        if (!formData.phone.trim()) {
            errors.phone = 'Phone is required';
        } else if (!phoneRegex.test(formData.phone)) {
            errors.phone = 'Please enter a valid phone number';
        }
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (touchedFields[name]) {
            validateForm();
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouchedFields(prev => ({
            ...prev,
            [name]: true
        }));
        validateForm();
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const allFieldsTouched = Object.keys(formData).reduce((acc, field) => {
            acc[field] = true;
            return acc;
        }, {});
        setTouchedFields(allFieldsTouched);

        if (!validateForm()) {
            toast.error('Please fix the errors in the form', {
                position: "top-center",
                autoClose: 5000,
            });
            return;
        }

        try {
            await handleSubmit(e);
        } catch (error) {
            toast.error('Failed to submit the form. Please try again later.', {
                position: "top-center",
                autoClose: 5000,
            });
        }
    };

    useEffect(() => {
        if (state.succeeded) {
            setFormData({
                name: '',
                phone: '',
                email: '',
                company: '',
                info: ''
            });
            setTouchedFields({});
            toast.success('Success! We will contact you shortly.', {
                position: "top-center",
                autoClose: 5000,
            });
        }
    }, [state.succeeded]);

    useEffect(() => {
        if (state.errors && state.errors.length > 0) {
            const errorMessage = state.errors[0]?.message ||
                'There was an error submitting your form. Please try again.';
            toast.error(errorMessage, {
                position: "top-center",
                autoClose: 5000,
            });
        }
    }, [state.errors]);

    return (
        <div className='order-samples-container' onClick={() => {
            if (!showForm) setShowForm(true)
        }}>
            <ToastContainer/>
            <div className="form-toggle-button-container">
                {!showForm && <button
                    type="button"
                    className="form-toggle-button"
                    onClick={() => {
                        if (!showForm) setShowForm(true)
                    }}
                >
                    Order Samples
                </button>
                }
            </div>
            {showForm && (
                <form className='order-form' onSubmit={onSubmit} noValidate>
                    <div className='form-grid'>
                        <div className='form-group'>
                            <input
                                name='name'
                                type='text'
                                placeholder='Name *'
                                value={formData.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`form-input ${touchedFields.name && formErrors.name ? 'error' : ''}`}
                                required
                            />
                            {touchedFields.name && formErrors.name && (
                                <span className="error-message">{formErrors.name}</span>
                            )}
                        </div>

                        <div className='form-group'>
                            <input
                                name='phone'
                                type='tel'
                                placeholder='Phone *'
                                value={formData.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`form-input ${touchedFields.phone && formErrors.phone ? 'error' : ''}`}
                                required
                            />
                            {touchedFields.phone && formErrors.phone && (
                                <span className="error-message">{formErrors.phone}</span>
                            )}
                        </div>

                        <div className='form-group'>
                            <input
                                name='email'
                                type='email'
                                placeholder='Email *'
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`form-input ${touchedFields.email && formErrors.email ? 'error' : ''}`}
                                required
                            />
                            {touchedFields.email && formErrors.email && (
                                <span className="error-message">{formErrors.email}</span>
                            )}
                        </div>

                        <div className='form-group'>
                            <input
                                name='company'
                                type='text'
                                placeholder='Company Name'
                                value={formData.company}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='form-input'
                            />
                        </div>
                    </div>

                    <div className='form-group full-width'>
                    <textarea
                        name='info'
                        placeholder='Additional Information'
                        value={formData.info}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className='form-textarea'
                        rows={4}
                    />
                    </div>

                    <div className='button-container'>
                        <button
                            type='submit'
                            className='submit-button'
                            disabled={state.submitting}
                        >
                            {state.submitting ? (
                                <>
                                    <span className="spinner"></span>
                                    Sending...
                                </>
                            ) : (
                                'Submit Request'
                            )}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default OrderSamples;