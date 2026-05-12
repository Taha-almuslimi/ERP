import { useForm } from "@inertiajs/react";
import { FormSection } from "./Login/FormSection/FormSection";
import { PromoSection } from "./Login/PromoSection/PromoSection";

export default function Login() {
    console.log("Rendering Login Page");
    const form = useForm({
        login: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        form.post("/login");
    };

    return (
        <main className="min-h-screen flex">
            <FormSection
                data={form.data}
                setData={form.setData}
                handleSubmit={handleSubmit}
                errors={form.errors}
                processing={form.processing}
            />
            <PromoSection />
        </main>
    );
}
