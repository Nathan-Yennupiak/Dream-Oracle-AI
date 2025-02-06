import { useEffect } from "react";

const BibleVerse = () => {
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
    <div className="flex justify-center items-center bg-gray-100 rounded-lg shadow-md">
        <biblia:bibleverse theme="quotation" resource="niv2011" width="100%" reference="Ge40.8">
          <blockquote className="w-full text-gray-800 italic">
            &quot;We both had dreams,&quot; they answered, &quot;but there is no one to interpret them.&quot;
            Then Joseph said to them, &quot;Do not interpretations belong to God? Tell me your dreams.&quot;
            &mdash;{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://biblia.com/bible/niv2011/Ge40.8"
              className="text-purple-700 hover:underline"
            >
              Ge 40:8
            </a>
          </blockquote>
        </biblia:bibleverse>
    </div>
  );
};

export default BibleVerse;
