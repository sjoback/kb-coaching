import Button from "components/Button/Button";
import styles from "./List.module.scss";
import { motion } from "framer-motion";

const listVariants = {
   hidden: {
      transition: {
         staggerChildren: 0.1,
         staggerDirection: -1,
      },
   },
   visible: {
      transition: {
         staggerChildren: 0.2,
      },
   },
};

const itemVariants = {
   hidden: {
      opacity: 0,
      x: -16,
   },
   visible: {
      opacity: 1,
      x: 0,
   },
};

function List({ items, linkType }) {
   return (
      <div className={styles.container}>
         {items.length > 0 ? (
            <motion.ul
               className="link-list"
               variants={listVariants}
               initial="hidden"
               animate="visible"
            >
               {items.map((item) => {
                  return (
                     <motion.li
                        key={`${item.name} + ${item.id}`}
                        variants={itemVariants}
                     >
                        <Button
                           onClick={() => {}}
                           color="default"
                           size="sm"
                           text={item.name}
                           component="link"
                           link={`/${linkType}/${item.id}`}
                        />
                     </motion.li>
                  );
               })}
            </motion.ul>
         ) : (
            <div className={styles.empty}>
               <h2>No {linkType} added</h2>
            </div>
         )}
      </div>
   );
}

export default List;
