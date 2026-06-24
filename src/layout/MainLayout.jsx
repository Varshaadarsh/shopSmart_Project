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
}) {
  return (
    <>
      <Navbar
        openLogin={openLogin}
        isLoggedIn={isLoggedIn}
        cartCount={cartCount}
        compareCount={compareCount}
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