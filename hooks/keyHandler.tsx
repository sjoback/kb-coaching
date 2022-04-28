import { useEffect } from "react";

const keyHandler = () => {
   const esc = useEffect(() => {
      const close = (e) => {
         if (e.keyCode === 27) {
            return false;
         }
      };
      window.addEventListener("keydown", close);
      return () => window.removeEventListener("keydown", close);
   }, []);

   return { esc };
};

export default keyHandler;
