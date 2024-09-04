import React from 'react'
import '../styles/toggle.css'

const Toggle = ({isChecked, setIsChecked}) => {

    const handleChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className="checkbox-wrapper-35">
            <input onChange={handleChange} value="private" name="switch" id="switch" type="checkbox" className="switch" />
            <label htmlFor="switch">
                <span className="switch-x-text">3D is </span>
                <span className="switch-x-toggletext">
                    <span className="switch-x-unchecked"><span className="switch-x-hiddenlabel">Unchecked: </span>Off</span>
                    <span className="switch-x-checked"><span className="switch-x-hiddenlabel">Checked: </span>On</span>
                </span>
            </label>
        </div>

    )
}

export default Toggle
