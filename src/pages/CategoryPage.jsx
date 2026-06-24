import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";

function CategoryPage({ products, addToCart, addToCompare }) {
    const { categoryName } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [categoryName]);

    const categoryGroups = {
        electronics: [
            "laptops",
            "mobile-accessories",
        ],


        mobiles: [
            "smartphones",
            "tablets"
        ],

        fashion: [
            "mens-shirts",
            "mens-shoes",
            "tops",
            "womens-dresses",
            "womens-shoes",
            "womens-bags",
            "womens-jewellery",
        ],

        beauty: [
            "beauty",
            "fragrances",
            "skin-care",
        ],

        home: [
            "furniture",
            "home-decoration",
            "kitchen-accessories",
        ],

        groceries: ["groceries"],

        more: [
            "sports-accessories",
            "sunglasses",
        ]
    };

    console.log("Category:", categoryName);
    console.log("Products:", products.length);


    const filteredProducts = products.filter(
        (product) =>
            categoryGroups[categoryName]?.includes(
                product.category
            )
    );

    console.log("Filtered:", filteredProducts.length);

    return (
        <div className="container mt-4">
            <h2 className="fw-bold text-capitalize mb-4">
                {categoryName}
            </h2>

            <ProductGrid
                products={filteredProducts}
                addToCart={addToCart}
                addToCompare={addToCompare}
            />
        </div>
    );
}

export default CategoryPage;