import { Link } from "@inertiajs/react";
import { LoginInput } from "./LoginInput";
import { PasswordInput } from "./PasswordInput";
import { LoginButton } from "./LoginButton";
import { SocialButtons } from "./SocialButtons";

export function Form({ data, setData, handleSubmit, errors }) {
    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <LoginInput
                login={data.login}
                setPhone={(val) => setData("login", val)}
            />
            {errors.login && (
                <p className="text-red-500 text-sm mt-1 font-medium">
                    {errors.login}
                </p>
            )}
            <PasswordInput
                password={data.password}
                setPassword={(val) => setData("password", val)}
            />
            {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}

            <LoginButton />

            {/* Divider */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-muted-foreground">
                        أو
                    </span>
                </div>
            </div>

            <SocialButtons />

            {/* Register Link */}
            <p className="text-center text-sm text-muted-foreground">
                ليس لديك حساب؟{" "}
                <Link
                    href="/register"
                    className="text-primary font-semibold hover:underline"
                >
                    إنشاء حساب جديد
                </Link>
            </p>
        </form>
    );
}
