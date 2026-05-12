import { router } from "@inertiajs/react";

function ActionButton({ rental, readyForDelivery }) {
    const { status, id } = rental;

    if (status === "pending") {
        return (
            <button
                onClick={() => router.visit(`/dashboard/orders/${id}`)}
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
                style={{
                    color: "#F39C12",
                    backgroundColor: "transparent",
                    border: "1px solid #F39C12",
                }}
            >
                بانتظار الموافقة
            </button>
        );
    }

    if (status === "confirmed" && rental.payment_status === "unpaid") {
        return (
            <button
                onClick={() => router.visit(`/dashboard/orders/${id}`)}
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
                style={{
                    color: "#FFFFFF",
                    backgroundColor: "#F39C12",
                }}
            >
                إتمام الدفع
            </button>
        );
    }

    const configs = {
        confirmed: {
            label: readyForDelivery ? "جاهز للاستلام؟" : "عرض التفاصيل",
            color: "#FFFFFF",
            bg: "#2D5A27",
            onClick: () =>
                router.visit(
                    readyForDelivery
                        ? `/dashboard/orders/${id}/delivery`
                        : `/dashboard/orders/${id}`,
                ),
        },

        in_use: {
            label: "التسليم والإرجاع",
            color: "#FFFFFF",
            bg: "#3498DB",
            onClick: () => router.visit(`/dashboard/orders/${id}/delivery`),
        },

        completed: {
            label: "قيّم",
            color: "#FFFFFF",
            bg: "#27AE60",
            onClick: () => router.visit(`/dashboard/ratings?orderId=${id}`),
        },

        disputed: {
            label: "عرض النزاع",
            color: "#FFFFFF",
            bg: "#E74C3C",
            onClick: () => router.visit(`/dashboard/orders/${id}/delivery`),
        },
    };

    const config = configs[status];

    if (!config) return null;

    return (
        <button
            onClick={config.onClick}
            className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
            style={{
                color: config.color,
                backgroundColor: config.bg,
            }}
        >
            {config.label}
        </button>
    );
}

export default function OrderCard({ rental }) {
    const equipment = rental.equipment;

    const paymentLabel =
        rental.payment_status === "paid"
            ? "مدفوع"
            : rental.payment_status === "refunded"
              ? "مسترد"
              : "غير مدفوع";

    const paymentColor =
        rental.payment_status === "paid"
            ? "#27AE60"
            : rental.payment_status === "refunded"
              ? "#95A5A6"
              : "#F39C12";

    const readyForDelivery =
        rental.status === "confirmed" && rental.ready_for_delivery;

    const statusConfig = {
        pending: {
            label: "بانتظار الموافقة",
            color: "#F39C12",
            bg: "#FEF5E7",
        },

        confirmed: {
            label: "مؤكد",
            color: "#2D5A27",
            bg: "#E8F5E9",
        },

        in_use: {
            label: "قيد الاستخدام",
            color: "#3498DB",
            bg: "#EBF5FB",
        },

        completed: {
            label: "مكتمل",
            color: "#27AE60",
            bg: "#E9F7EF",
        },

        disputed: {
            label: "نزاع",
            color: "#E74C3C",
            bg: "#FDEDEC",
        },
    };

    const st = statusConfig[rental.status];

    return (
        <div
            className="bg-white rounded-2xl border border-[#E0E0E0] overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
            onClick={() => router.visit(`/dashboard/orders/${rental.id}`)}
        >
            <div className="flex items-start gap-4 p-4 pb-3">
                <div className="w-[72px] h-[72px] rounded-xl bg-[#F4F6F9] border border-[#E0E0E0] overflow-hidden flex-shrink-0">
                    <img
                        src={equipment?.image_url}
                        alt={equipment?.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-[#222222] text-base leading-tight">
                            {equipment?.name}
                        </h3>

                        <span className="text-xs text-[#888888] font-mono whitespace-nowrap">
                            #{rental.order_number}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-[#888888]">
                            👤 {equipment?.owner?.name}
                        </span>

                        <span className="text-[#E0E0E0]">|</span>

                        <span className="text-sm text-[#F39C12]">
                            ⭐ {equipment?.owner?.rating ?? "0.0"}
                        </span>
                    </div>
                </div>
            </div>

            <div className="border-t border-[#E0E0E0] mx-4" />

            <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-sm text-[#888888]">
                    <span>📅</span>

                    <span>
                        {rental.start_date} - {rental.end_date}
                    </span>

                    <span className="text-[#2D5A27] font-medium">
                        ({rental.duration_days} أيام)
                    </span>
                </div>

                <div className="flex items-center gap-1 font-bold text-[#222222]">
                    <span className="text-sm">💰</span>

                    <span>{rental.total_amount} ر.ي</span>
                </div>
            </div>

            <div className="px-4 pb-3 flex flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-full bg-[#F4F6F9] text-[#555555]">
                    مدة الإيجار: {rental.duration_days} أيام
                </span>

                <span
                    className="px-2.5 py-1 rounded-full bg-[#F4F6F9]"
                    style={{ color: paymentColor }}
                >
                    الدفع: {paymentLabel}
                </span>

                {rental.status === "disputed" && (
                    <span className="px-2.5 py-1 rounded-full bg-[#FDEDEC] text-[#E74C3C] font-bold">
                        عليه نزاع
                    </span>
                )}
            </div>

            <div className="border-t border-[#E0E0E0] mx-4" />

            <div
                className="px-4 py-3 flex items-center justify-between"
                onClick={(e) => e.stopPropagation()}
            >
                <span
                    className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                        color: st?.color,
                        backgroundColor: st?.bg,
                    }}
                >
                    {st?.label}
                </span>

                <ActionButton
                    rental={rental}
                    readyForDelivery={readyForDelivery}
                />
            </div>
        </div>
    );
}
