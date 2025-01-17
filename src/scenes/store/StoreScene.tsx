import { NavLink } from "react-router";
import styles from "./StoreScene.module.css";

export const StoreScene = ({
  testID = "store",
}: Readonly<Partial<Common.ComponentProps>>) => {
  return (
    <div data-testid={testID} className={styles.frame}>
      <h1>Store</h1>
      <NavLink to="/store/product">Product</NavLink>
    </div>
  );
};
