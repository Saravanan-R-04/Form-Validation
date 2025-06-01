import React, { useState } from 'react';
import './style.css';
import * as Yup from 'yup';

const FormValidation = () => {
    const [formdata, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        age: "",
        gender: "",
        interests: [],
        birthDate: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {name,value}=e.target;
        setFormData({
            ...formdata,
            [name]:value
        })
    };

    const handleCheckBox = (e) => {
       const {value,checked}=e.target;
       let updatedInterest=[...formdata.interests]
       if(checked)
       {
        updatedInterest.push(value)
       }
       else
       {
        updatedInterest=updatedInterest.filter(interest=>interest!==value)
       }
       setFormData({
        ...formdata,
        interests:updatedInterest
       })
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        email: Yup.string().email("Invalid Email Format").required("Email is required"),
        password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters")
            .matches(/[0-9]/, "Password must contain at least one number")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Confirm password is required"),
        age: Yup.number()
            .typeError("Age must be a number")
            .min(18, "You must be at least 18 years old")
            .max(58, "You must be less than 58 years old")
            .required("Age is required"),
        gender: Yup.string().required("Gender is required"),
        interests: Yup.array()
            .min(1, "Select at least one interest")
        ,
        birthDate: Yup.date().required("Birth Date is required"),
    });

    const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
        await validationSchema.validate(formdata, { abortEarly: false });
        setErrors({}); // No errors
        console.log("Form Submitted Successfully!", formdata);
    } catch (error) {
        const newErrors = {};
        error.inner.forEach(err => {
            newErrors[err.path] = err.message;
        });
        setErrors(newErrors); 
    }
};


    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <h2>Form Validation</h2>

                <label>Enter your first name</label>
                <input type="text" name="firstName" value={formdata.firstName} onChange={handleChange} />
                {errors.firstName && <p className="error">{errors.firstName}</p>}

                <label>Enter your last name</label>
                <input type="text" name="lastName" value={formdata.lastName} onChange={handleChange} />
                {errors.lastName && <p className="error">{errors.lastName}</p>}

                <label>Enter your email</label>
                <input type="email" name="email" value={formdata.email} onChange={handleChange} />
                {errors.email && <p className="error">{errors.email}</p>}

                <label>Enter your password</label>
                <input type="password" name="password" value={formdata.password} onChange={handleChange} />
                {errors.password && <p className="error">{errors.password}</p>}

                <label>Confirm your password</label>
                <input type="password" name="confirmPassword" value={formdata.confirmPassword} onChange={handleChange} />
                {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

                <label>Enter your age</label>
                <input type="number" name="age" value={formdata.age} onChange={handleChange} />
                {errors.age && <p className="error">{errors.age}</p>}

                <label>Select your gender</label>
                <select name="gender" value={formdata.gender} onChange={handleChange}>
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                {errors.gender && <p className="error">{errors.gender}</p>}

                <label>Enter your birth date</label>
                <input type="date" name="birthDate" value={formdata.birthDate} onChange={handleChange} />
                {errors.birthDate && <p className="error">{errors.birthDate}</p>}

                <label>Select your interests</label>
                <div className="checkbox-group">
                    <label>
                        <input
                            type="checkbox"
                            value="Movies"
                            checked={formdata.interests.includes("Movies")}
                            onChange={handleCheckBox}
                        />
                        Movies
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Coding"
                            checked={formdata.interests.includes("Coding")}
                            onChange={handleCheckBox}
                        />
                        Coding
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Music"
                            checked={formdata.interests.includes("Music")}
                            onChange={handleCheckBox}
                        />
                        Music
                    </label>
                </div>
                {errors.interests && <p className="error">{errors.interests}</p>}

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default FormValidation;
