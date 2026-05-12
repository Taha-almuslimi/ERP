import { useMemo } from "react";
import { Link, router } from "@inertiajs/react";

import { ProductCard } from "./ProductCard";

export default function EquipmentSection({
    equipments = [],
    onDetailsClick,
    activeCategory,
    searchQuery,
}) {
    const filteredProducts = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        return equipments.filter((product) => {
            const matchesCategory = (() => {
                if (!activeCategory || activeCategory === "الكل") {
                    return true;
                }

                const categoryMap = {
                    "مولدات كهرباء": "كهرباء",
                    "بناء وأعمال": "بناء",
                    زراعة: "زراعة",
                    تصوير: "تصوير",
                    رياضة: "رياضة",
                    فعاليات: "فعاليات",
                    طبي: "طبي",
                    أخرى: "أخرى",
                };

                const targetCategory =
                    categoryMap[activeCategory] || activeCategory;

                return product.category === targetCategory;
            })();

            const name = (product.name || "").toLowerCase();

            const description = (product.description || "").toLowerCase();

            const location = (product.location || "").toLowerCase();

            const matchesSearch =
                name.includes(query) ||
                description.includes(query) ||
                location.includes(query);

            return matchesCategory && matchesSearch;
        });
    }, [equipments, activeCategory, searchQuery]);

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold">
                        المعدات المتاحة
                    </h2>

                    <button
                        onClick={() => router.visit("/equipments")}
                        className="text-primary hover:underline"
                    >
                        عرض الكل ←
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <Link
                                key={product.id}
                                href={`/equipments/${product.id}`}
                                className="block"
                            >
                                <ProductCard
                                    product={product}
                                    onDetailsClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();

                                        onDetailsClick?.(product);
                                    }}
                                    onRentClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();

                                        router.visit(
                                            `/equipments/${product.id}`,
                                        );
                                    }}
                                />
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center text-muted-foreground">
                            لا توجد معدات متاحة في هذا القسم حالياً.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
