// src/components/Form/GSTRegistrationForm.jsx   ← Recommended new name

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "./FormField";
import GradientButton from "../common/GradientButton";

const applicationTypes = ["New Registration", "Modification", "Renewal"];

const businessTypes = [
  "Manufacturer",
  "Trader",
  "Wholesaler",
  "Retailer",
  "Importer",
  "Exporter",
  "Service Provider",
  "Distributor",
  "E-commerce Seller",
  "Job Worker",
  "Supplier",
  "Hotel / Restaurant",
  "Professional Services",
  "Freelancer",
  "Others",
];

const designationOptions = [
  "INDIVIDUAL",
  "Proprietorship",
  "Partnership Firm",
  "Limited Liability Partnership (LLP)",
  "Private Limited Company",
  "One Person Company (OPC)",
  "Public Limited Company",
  "Hindu Undivided Family (HUF)",
  "Trust",
  "Society",
  "Section 8 Company",
  "Govt. Undertaking",
];

const indianStates = [
  "ANDAMAN AND NICOBAR ISLANDS",
  "ANDHRA PRADESH",
  "ARUNACHAL PRADESH",
  "ASSAM",
  "BIHAR",
  "CHANDIGARH",
  "CHHATTISGARH",
  "DADRA AND NAGAR HAVELI AND DAMAN AND DIU",
  "DELHI",
  "GOA",
  "GUJARAT",
  "HARYANA",
  "HIMACHAL PRADESH",
  "JHARKHAND",
  "KARNATAKA",
  "KERALA",
  "LAKSHADWEEP",
  "MADHYA PRADESH",
  "MAHARASHTRA",
  "ODISHA",
  "PUNJAB",
  "RAJASTHAN",
  "TAMIL NADU",
  "TELANGANA",
  "TRIPURA",
  "UTTAR PRADESH",
  "UTTARAKHAND",
  "WEST BENGAL",
];

const initialFormData = {
  application_type: "",
  applicant_name: "",
  email: "",
  mobile: "",
  nature_of_business: "",
  designation: "",
  house_no: "",
  area_locality: "",
  city: "",
  district: "",
  state: "",
  pin: "",
};

export default function GSTRegistrationForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });
  const [formAlert, setFormAlert] = useState(null);
  const firstErrorRef = useRef(null);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    if (name === "mobile") processedValue = value.replace(/\D/g, "").slice(0, 10);
    if (name === "pin") processedValue = value.replace(/\D/g, "").slice(0, 6);
    
    setFormData((prev) => ({ ...prev, [name]: processedValue }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (formAlert) setFormAlert(null);
  };

  // Auto-save draft
  useEffect(() => {
    sessionStorage.setItem("gstFormDraft", JSON.stringify(formData));
  }, [formData]);

  // Load draft
  useEffect(() => {
    const draft = sessionStorage.getItem("gstFormDraft");
    if (draft) {
      try {
        setFormData((prev) => ({ ...prev, ...JSON.parse(draft) }));
      } catch (e) {
        console.warn("Invalid draft data", e);
      }
    }
  }, []);

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
    setFormAlert(null);
    setSubmitStatus({ type: "", message: "" });
    sessionStorage.removeItem("gstFormDraft");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.application_type) newErrors.application_type = "Required";
    if (!formData.applicant_name.trim()) newErrors.applicant_name = "Required";
    if (!formData.email) newErrors.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.mobile) newErrors.mobile = "Required";
    else if (!/^[6-9]\d{9}$/.test(formData.mobile))
      newErrors.mobile = "10 digits starting with 6-9";
    if (!formData.nature_of_business) newErrors.nature_of_business = "Required";
    if (!formData.designation) newErrors.designation = "Required";
    if (!formData.state) newErrors.state = "Required";
    if (formData.pin && !/^\d{6}$/.test(formData.pin))
      newErrors.pin = "6 digits required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const first = Object.keys(newErrors)[0];
      const el = document.querySelector(`[name="${first}"]`);
      if (el) firstErrorRef.current = el;
    }

    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setFormAlert(null);

  if (!validateForm()) {
    setFormAlert({
      type: "error",
      message: "Please fill all required fields correctly.",
    });
    setTimeout(() => {
      if (firstErrorRef.current) {
        firstErrorRef.current.focus();
        firstErrorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 150);
    return;
  }

  setLoading(true);

  const payload = {
    "ctl00$ContentPlaceHolder1$ddlApplicationType": formData.application_type || "",
    "ctl00$ContentPlaceHolder1$txtName": formData.applicant_name.trim() || "",
    "ctl00$ContentPlaceHolder1$txtEmail": formData.email.trim() || "",
    "ctl00$ContentPlaceHolder1$txtPhone1": formData.mobile || "",
    "ctl00$ContentPlaceHolder1$ddlNatureBusiness": formData.nature_of_business || "",
    "ctl00$ContentPlaceHolder1$ddlDesignition": formData.designation || "",
    "ctl00$ContentPlaceHolder1$txtHOUSE": formData.house_no.trim() || "",
    "ctl00$ContentPlaceHolder1$txtAreaLocality": formData.area_locality.trim() || "",
    "ctl00$ContentPlaceHolder1$txtCity": formData.city.trim() || "",
    "ctl00$ContentPlaceHolder1$txtDistrict": formData.district.trim() || "",
    "ctl00$ContentPlaceHolder1$ddlState": formData.state || "",
    "ctl00$ContentPlaceHolder1$txtPin": formData.pin || "",
    "ctl00$ContentPlaceHolder1$txtDate": new Date().toISOString().slice(0, 19).replace("T", " "),

    serviceCategory: "gstReg",
    leadSource: "gstregistration.org",
    _timestamp: Date.now(),
    _formVersion: "2026-04",
  };

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  try {
    // Dono requests parallel mein bhej rahe hain
    const backendPromise = fetch(`${API_URL}/leadRoutes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(err => {
      console.warn("⚠️ Backend save failed:", err);
      return { ok: false, status: 0 };
    });

    const crmPromise = fetch("https://legalpapers.konceptsoftwaresolutions.com/leadRoutes", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(payload).toString(),
    }).catch(err => {
      console.warn("⚠️ CRM submission failed:", err);
      return { ok: false, status: 0 };
    });

    // Dono requests ko wait karte hain
    const [backendRes, crmRes] = await Promise.all([backendPromise, crmPromise]);

    // Success condition: Agar kisi ek mein bhi success ho toh payment page par le jaao
    const isBackendSuccess = backendRes.ok;
    const isCrmSuccess = crmRes.ok;

    if (!isBackendSuccess && !isCrmSuccess) {
      throw new Error("Both backend and CRM failed");
    }

    // At least one succeeded → Save data & redirect to payment
    sessionStorage.setItem("gstSubmittedData", JSON.stringify(payload));
    sessionStorage.removeItem("gstFormDraft");

    setSubmitStatus({
      type: "success",
      message: "Application submitted successfully!",
    });

    // Redirect to payment page after short delay
    setTimeout(() => {
      navigate("/payment-summary");
    }, 1000);

  } catch (err) {
    console.error("Submission failed:", err);
    setSubmitStatus({
      type: "error",
      message: "Something went wrong. Please try again later.",
    });
  } finally {
    setLoading(false);
  }
};
  return (
    <div id="registration-form" className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200/80 max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-6 text-center text-2xl md:text-3xl font-bold tracking-wide shadow-md">
        GST REGISTRATION FORM
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-10 lg:p-12 space-y-8">
        {formAlert && (
          <div className={`p-5 rounded-xl border-l-4 shadow-sm ${
            formAlert.type === "success" ? "bg-green-50 border-green-500 text-green-800" : "bg-red-50 border-red-500 text-red-800"
          }`}>
            <strong className="block mb-1">{formAlert.type === "success" ? "Success!" : "Error!"}</strong>
            {formAlert.message}
          </div>
        )}

        {submitStatus.message && (
          <div className={`p-5 rounded-xl border-l-4 text-center shadow-sm ${
            submitStatus.type === "success" ? "bg-green-50 border-green-500 text-green-800" : "bg-red-50 border-red-500 text-red-800"
          }`}>
            {submitStatus.message}
          </div>
        )}

        <FormField
          label="1. Application Type (आवेदन का प्रकार)"
          name="application_type"
          type="select"
          options={applicationTypes}
          value={formData.application_type}
          onChange={handleChange}
          required
          error={errors.application_type}
        />

        <FormField
          label="2. Applicant Name (आवेदक का नाम)"
          name="applicant_name"
          value={formData.applicant_name}
          onChange={handleChange}
          required
          placeholder="Full name as per PAN"
          error={errors.applicant_name}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="3. Email ID"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="yourname@example.com"
            error={errors.email}
          />

          <FormField
            label="4. Mobile Number"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            placeholder="10-digit number"
            maxLength={10}
            error={errors.mobile}
          />
        </div>

        <FormField
          label="5. Nature of Business (व्यवसाय की प्रकृति)"
          name="nature_of_business"
          type="select"
          options={businessTypes}
          value={formData.nature_of_business}
          onChange={handleChange}
          required
          error={errors.nature_of_business}
        />

        <FormField
          label="6. Designation / Type of Organization (संगठन का प्रकार)"
          name="designation"
          type="select"
          options={designationOptions}
          value={formData.designation}
          onChange={handleChange}
          required
          error={errors.designation}
        />

        <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
          <label className="block text-lg font-semibold text-gray-800">
            7. Business Address (व्यवसाय का पता)
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              name="house_no"
              placeholder="House / Shop No. / Flat No."
              value={formData.house_no}
              onChange={handleChange}
            />
            <FormField
              name="area_locality"
              placeholder="Area / Locality / Street / Village"
              value={formData.area_locality}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FormField
              name="city"
              placeholder="City / Town"
              value={formData.city}
              onChange={handleChange}
            />
            <FormField
              name="district"
              placeholder="District"
              value={formData.district}
              onChange={handleChange}
            />
            <FormField
              name="state"
              type="select"
              options={indianStates}
              value={formData.state}
              onChange={handleChange}
              required
              error={errors.state}
            />
            <FormField
              name="pin"
              placeholder="Pincode"
              value={formData.pin}
              onChange={handleChange}
              maxLength={6}
              error={errors.pin}
            />
          </div>
        </div>

        <div className="pt-8 flex justify-center">
          <GradientButton type="submit" disabled={loading} className="text-lg py-4 px-20">
            {loading ? "Processing..." : "Submit Application →"}
          </GradientButton>
        </div>
      </form>
    </div>
  );
}