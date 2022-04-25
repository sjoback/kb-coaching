import NoticeAdded from "./NoticeAdded/NoticeAdded";

function Notice({ text, component, timeOut = 500 }) {
   //    const buttonColor = `btn-${color}`;
   //    const buttonAlign = `btn-${align}`;
   //    const buttonSize = customSize.length > 0 ? `btn-custom` : `btn-${size}`;
   //    const buttonClasses = [buttonSize, buttonColor, buttonAlign];

   function hide() {}

   const Components = {
      added: NoticeAdded,
   };

   if (typeof Components[component] !== "undefined") {
      const Component = Components[component];
      return <Component text={text} timeOut={timeOut} />;
   } else {
      return <p>{component} is not yet defined.</p>;
   }
}

export default Notice;
