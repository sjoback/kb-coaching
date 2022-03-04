import LinkButton from "components/LinkButton";
import styles from "./Home.module.scss";
function HomePage() {
  return (
    <div>
      <h1>App content</h1>
      <ul className={styles.mainList}>
        <li>
          <LinkButton icon={"faCoffe"} link={"/drills"} text={"Drills"} />
        </li>
      </ul>
    </div>
  );
}

export default HomePage;
