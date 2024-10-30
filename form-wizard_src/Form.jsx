import React, { useState } from "react";
import "./form.css"; // Ensure you have proper CSS styling for this

const FormWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [schedule, setSchedule] = useState({ date: "", time: "" });
  const [errors, setErrors] = useState({});

  const nextPrev = (stepOffset) => {
    if (!validateStep(currentStep)) return;

    const newStep = currentStep + stepOffset;
    if (newStep >= steps.length) {
      if (currentStep === steps.length - 1) {
        showPopup();
      }
    } else {
      setCurrentStep(newStep);
    }
  };

  const validateStep = (stepIndex) => {
    const newErrors = {};
    if (stepIndex === 0) {
      if (!document.getElementById("firstName").value) {
        newErrors.firstName = "First name is required.";
      }
      if (!document.getElementById("lastName").value) {
        newErrors.lastName = "Last name is required.";
      }
      if (!document.querySelector('input[name="gender"]:checked')) {
        newErrors.gender = "Please select your gender.";
      }
      if (!document.getElementById("email").value) {
        newErrors.email = "Email is required.";
      }
      if (!document.getElementById("password").value) {
        newErrors.password = "Password is required.";
      }
    } else if (stepIndex === 1) {
      if (!document.getElementById("course").value) {
        newErrors.course = "Course selection is required.";
      }
      if (!document.getElementById("education").value) {
        newErrors.education = "Education level selection is required.";
      }
    } else if (stepIndex === 2) {
      if (!document.getElementById("scheduleDate").value) {
        newErrors.scheduleDate = "Date is required.";
      }
      if (!document.getElementById("scheduleTime").value) {
        newErrors.scheduleTime = "Time is required.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const showPopup = () => {
    const date = document.getElementById("scheduleDate").value;
    const time = document.getElementById("scheduleTime").value;
    setSchedule({ date, time });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    resetFormWizard();
  };

  const resetFormWizard = () => {
    setCurrentStep(0);
    setErrors({});
  };

  const steps = [
    <Step1 next={nextPrev} errors={errors} />,
    <Step2 next={nextPrev} errors={errors} />,
    <Step3 submit={nextPrev} errors={errors} />,
  ];

  return (
    <div>
      <div className="head">
        <h1>Form Wizard</h1>
      </div>
      <div className="container">
        <div className="step active">{steps[currentStep]}</div>
      </div>
      {modalVisible && (
        <div className="modal" id="scheduleModal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Confirmation</h2>
            <p>
              Your meeting has been scheduled for {schedule.date} at{" "}
              {schedule.time}.
            </p>
            <button onClick={closeModal}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

const Step1 = ({ next, errors }) => (
  <div>
    <h2>Personal Information</h2>
    <label htmlFor="firstName">First Name</label>
    <input type="text" id="firstName" name="firstName" required />
    {errors.firstName && <p className="error">{errors.firstName}</p>}

    <label htmlFor="lastName">Last Name</label>
    <input type="text" id="lastName" name="lastName" required />
    {errors.lastName && <p className="error">{errors.lastName}</p>}

    <label>Gender</label>
    <div className="gender-group">
      <input type="radio" id="male" name="gender" value="male" />
      <label htmlFor="male">Male</label>
      <input type="radio" id="female" name="gender" value="female" />
      <label htmlFor="female">Female</label>
      <input type="radio" id="other" name="gender" value="other" />
      <label htmlFor="other">Other</label>
    </div>
    {errors.gender && <p className="error">{errors.gender}</p>}

    <label htmlFor="email">Email</label>
    <input type="email" id="email" name="email" required />
    {errors.email && <p className="error">{errors.email}</p>}

    <label htmlFor="password">Password</label>
    <input type="password" id="password" name="password" required />
    {errors.password && <p className="error">{errors.password}</p>}

    <button type="button" onClick={() => next(1)}>
      Continue
    </button>
  </div>
);

const Step2 = ({ next, errors }) => (
  <div>
    <h2>Select Course</h2>
    <label htmlFor="course">Select a Course:</label>
    <select id="course" name="course" required>
      <option value="" disabled selected>
        Select a course
      </option>
      <option value="internship">Internship</option>
      <option value="frontend_developer">Frontend Developer</option>
      <option value="fullstack_developer">Full Stack Developer</option>
    </select>
    {errors.course && <p className="error">{errors.course}</p>}

    <label htmlFor="education">Select Education Level:</label>
    <select id="education" name="education" required>
      <option value="" disabled selected>
        Select education level
      </option>
      <option value="student">Student</option>
      <option value="graduate">Graduate</option>
      <option value="postgraduate">Postgraduate</option>
    </select>
    {errors.education && <p className="error">{errors.education}</p>}

    <button type="button" onClick={() => next(1)}>
      Continue
    </button>
  </div>
);

const Step3 = ({ submit, errors }) => (
  <div>
    <h2>Schedule a Meeting</h2>
    <label htmlFor="scheduleDate">Select Date:</label>
    <input type="date" id="scheduleDate" name="scheduleDate" required />
    {errors.scheduleDate && <p className="error">{errors.scheduleDate}</p>}

    <label htmlFor="scheduleTime">Select Time:</label>
    <input type="time" id="scheduleTime" name="scheduleTime" required />
    {errors.scheduleTime && <p className="error">{errors.scheduleTime}</p>}

    <button type="button" onClick={() => submit(1)}>
      Submit
    </button>
  </div>
);

export default FormWizard;
