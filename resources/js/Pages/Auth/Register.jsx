import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { FormSection } from "./Register/FormSection/FormSection";
import { InfoSection } from "./Register/InfoSection/InfoSection";

export default function Register() {
    const [userType, setUserType] = useState("tenant");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    const form = useForm({
        full_name: "",
        phone: "",
        email: "",
        password: "",
        password_confirmation: "",
        governorate: "",
        district: "",
        storeName: "",
        mainGovernorate: "",
        paymentMethod: "",
        type: "tenant",
    });

    const toggleCategory = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((item) => item !== category)
                : [...prev, category],
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        form.setData("type", userType);
        form.post("/register");
    };

    // Adapter to keep FormSection compatibility
    // const formData = form.data;
    // const setFormData = (updater) => {
    //     if (typeof updater === "function") {
    //         const updated = updater(form.data);
    //         Object.keys(updated).forEach((key) =>
    //             form.setData(key, updated[key]),
    //         );
    //     } else {
    //         Object.keys(updater).forEach((key) =>
    //             form.setData(key, updater[key]),
    //         );
    //     }
    // };

    return (
        <main className="min-h-screen flex flex-col md:flex-row" dir="rtl">
            <FormSection
                userType={userType}
                setUserType={setUserType}
                formData={form.data}
                setFormData={form.setData}
                handleSubmit={handleSubmit}
                selectedCategories={selectedCategories}
                toggleCategory={toggleCategory}
                agreeToTerms={agreeToTerms}
                setAgreeToTerms={setAgreeToTerms}
                errors={form.errors}
                processing={form.processing}
            />
            <InfoSection userType={userType} />
        </main>
    );
}
