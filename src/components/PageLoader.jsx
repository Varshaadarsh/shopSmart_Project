import "./PageLoader.css";

function PageLoader() {
  return (
    <div className="page-loader">
      <div className="loader-logo">ShopSmart</div>

      <div className="loader-spinner"></div>

      <div className="loader-text">
        Loading amazing deals...
      </div>
    </div>
  );
}

export default PageLoader;