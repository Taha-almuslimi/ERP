import { FilterTabs } from "../../../../../components/shared";

export const RENTAL_TABS = [
  { key: 'all',       label: 'الكل' },
  { key: 'pending',   label: 'معلقة' },
  { key: 'confirmed', label: 'مؤكدة' },
  { key: 'in_use',    label: 'قيد الاستخدام' },
  { key: 'completed', label: 'مكتملة' },
  { key: 'cancelled', label: 'ملغية' },
  { key: 'disputed',  label: 'نزاعات' },
];

export default function OrderTabs({ activeTab, onTabChange, rentals }) {
    const tabs = RENTAL_TABS.map((tab) => ({
        id: tab.key,

        label: tab.label,

        count:
            tab.key === "all"
                ? rentals.length
                : rentals.filter((rental) => rental.status === tab.key).length,
    }));

    return (
        <FilterTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={onTabChange}
            className="mb-5"
        />
    );
}
