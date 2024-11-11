import React, {useRef, useState, useEffect} from 'react';
import './search-bar.css';
import { Col, Form, FormGroup } from 'reactstrap';

const SearchBar = () => {
    const locationRef = useRef('')
    const checkInRef = useRef('')
    const checkOutRef = useRef('')
    const guestSizeRef = useRef(1)
    const [showGuestAlert, setShowGuestAlert] = useState(false);

    useEffect(() => {
        if(guestSizeRef.current){
            guestSizeRef.current.value = 1;
        }
    }, []);
    const fields = [
        { label: 'Location', icon: 'ri-map-2-line', type: 'text', placeholder: 'Where are you going?', ref: locationRef },
        { label: 'Check In', icon: 'ri-calendar-line', type: 'date', placeholder: '', ref: checkInRef },
        { label: 'Check Out', icon: 'ri-calendar-line', type: 'date', placeholder: '', ref: checkOutRef },
        { label: 'Guests', icon: 'ri-group-line', type: 'number', placeholder: '1', ref: guestSizeRef },
    ];

    const handleGuestChange = (e) => {
        const value = parseInt(e.target.value);
        if (isNaN(value) || value < 1) {
          e.target.value = '1';
        }
        setShowGuestAlert(false);
      };
      
  

    const searchHandler = ()=>{
        const location = locationRef.current.value
        const checkIn =  checkInRef.current.value
        const checkOut = checkOutRef.current.value
        const guestSize = parseInt(guestSizeRef.current.value);
        if(location === '' || checkIn === '' || checkOut === '' || guestSize === ''){
            return alert("Please fill out all fields.");
        }
        if (!guestSize || guestSize < 1) {
            setShowGuestAlert(true);
            guestSizeRef.current.focus();
            return;
        }
        setShowGuestAlert(false);
    }
    return (
        <Col>
        <div className="search__bar">
            <Form className="d-flex align-items-center gap-4">
            {fields.map((field, index) => (
                <FormGroup
                key={index}
                className={`d-flex gap-3 form__group ${index === fields.length - 1 ? 'form__group-last' : 'form__group-fast'}`}
                >
                <span>
                    <i className={field.icon}></i>
                </span>
                <div>
                    <h6>{field.label}</h6>
                    <input 
                        type={field.type} 
                        placeholder={field.placeholder} 
                        ref={field.ref} 
                        onChange={field.label === 'Guests' ? handleGuestChange : null}
                        className= "contact-input"
                    />
                </div>
                </FormGroup>
            
            ))}
            <span className="search__icon" type = "submit" onClick={searchHandler}>
                <i class="ri-search-line"></i>
            </span>
            </Form>
        </div>
        </Col>
    );
};

export default SearchBar;
