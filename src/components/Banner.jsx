import desktopBanner from "../assets/banners/shopsmart-desktop.png";
import mobileBanner from "../assets/banners/shopsmart-mobile.png";

function Banner() {
  return (
    <div className="banner-wrapper">
      <picture>
        <source
          media="(max-width: 768px)"
          srcSet={mobileBanner}
        />

        <img
          src={desktopBanner}
          alt="ShopSmart Banner"
          className="banner-img"
        />
      </picture>
    </div>
  );
}

export default Banner;