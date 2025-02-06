import { useEffect } from "react";

const HeaderImage = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//biblia.com/api/logos.biblia.js";
    script.async = true;
    script.onload = () => {
      if (window.logos && window.logos.biblia) {
        window.logos.biblia.init();
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="flex justify-center items-center bg-gray-100 rounded-lg shadow-md p-4">
      <img 
  src="/dream-oracle.jpg" 
  alt="Oracle image" 
  className="w-full h-40 object-cover rounded-lg"
/>

  </div>

  );
};

export default HeaderImage;
