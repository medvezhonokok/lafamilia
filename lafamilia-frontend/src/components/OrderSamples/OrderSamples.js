import React, {useState, useEffect} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useForm} from '@formspree/react';
import './OrderSamples.css';

const OrderSamples = () => {
    const [state, handleSubmit] = useForm("manoeyrp");
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        company: '',
        info: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await handleSubmit(e);
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
            toast.success('Your order has been sent successfully!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    }, [state.succeeded]);

    useEffect(() => {
        if (state.errors && state.errors.length > 0) {
            toast.error('Failed to send order. Please try again.', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    }, [state.errors]);

    return (
        <div className='order-samples-container'>
            <ToastContainer/>
            <h1 className='order-title'>Order Samples</h1>

            <form className='order-form' onSubmit={onSubmit}>
                <div className='form-grid'>
                    <div className='form-group'>
                        <input
                            name='name'
                            type='text'
                            placeholder='Name'
                            value={formData.name}
                            onChange={handleChange}
                            className='form-input'
                            required
                        />
                    </div>

                    <div className='form-group'>
                        <input
                            name='phone'
                            type='tel'
                            placeholder='Phone'
                            value={formData.phone}
                            onChange={handleChange}
                            className='form-input'
                            required
                        />
                    </div>

                    <div className='form-group'>
                        <input
                            name='email'
                            type='email'
                            placeholder='Email'
                            value={formData.email}
                            onChange={handleChange}
                            className='form-input'
                            required
                        />
                    </div>

                    <div className='form-group'>
                        <input
                            name='company'
                            type='text'
                            placeholder='Company Name'
                            value={formData.company}
                            onChange={handleChange}
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
                        {state.submitting ? 'Sending...' : 'Confirm'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OrderSamples;