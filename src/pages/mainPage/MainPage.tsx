import List from "../../Components/List";
import SortCriteria from "../../Components/SortCriteria";
import s from "./MainPage.module.css";

export const MainPage = () => {
  return (
    <div className={s.wrapper}>
      <SortCriteria />
      <List />
    </div>
  );
};
