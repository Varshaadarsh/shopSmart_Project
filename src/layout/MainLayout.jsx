import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategoryBar from "../components/CategoryBar";

function MainLayout({
  children,
  openLogin,
  isLoggedIn,
  cartCount,
  compareCount,
  products,
  wishlist
}) {
  return (
    <>
      <Navbar
        openLogin={openLogin}
        cartCount={cartCount}
        compareCount={compareCount}
        wishlist={wishlist}
        products={products}
      />

      <CategoryBar />

      <main className="main-content">
        {children}
      </main>

      <Footer />
    </>
  );
}

export default MainLayout;