import { useMemo, useState } from "react";
import { usePage } from "@inertiajs/react";

import { OrderHeader } from "./components/OrderHeader";
import { OrderActionBanner } from "./components/ActionBanner";
import OrderTabs from "./components/FilterTabs";
import OrdersGrid from "./components/OrdersGrid";

import TenantLayout from "../../../../layouts/tenant/TenantLayout";

export default function MyOrders() {
    const { props } = usePage();

    const rentals = props.rentals || [];

    const [activeTab, setActiveTab] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const hasActions = rentals.some(
        (rental) =>
            rental.status === "confirmed" ||
            rental.status === "pending"
    );

    const filtered = useMemo(() => {
        const query = searchQuery
            .trim()
            .toLowerCase();

        return rentals.filter((rental) => {
            const matchTab =
                activeTab === "all" ||
                rental.status === activeTab;

            const equipmentName = (
                rental.equipment?.name || ""
            ).toLowerCase();

            const ownerName = (
                rental.equipment?.owner?.name || ""
            ).toLowerCase();

            const orderNumber = (
                rental.order_number || ""
            )
                .toString()
                .toLowerCase();

            const matchSearch =
                equipmentName.includes(query) ||
                ownerName.includes(query) ||
                orderNumber.includes(query);

            return matchTab && matchSearch;
        });
    }, [rentals, activeTab, searchQuery]);

    return (
        <div
            dir="rtl"
            className="p-4 md:p-6 pb-24 md:pb-6"
            style={{
                fontFamily: "'Cairo', sans-serif",
            }}
        >
            <OrderHeader
                count={rentals.length}
                search={searchQuery}
                onSearchChange={setSearchQuery}
            />

            {hasActions && (
                <OrderActionBanner rentals={rentals} />
            )}

            <OrderTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                rentals={rentals}
            />

            <OrdersGrid filtered={filtered} />
        </div>
    );
}

MyOrders.layout = (page) => (
    <TenantLayout>
        {page}
    </TenantLayout>
);