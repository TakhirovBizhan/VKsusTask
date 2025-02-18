import { Input } from "antd";
import s from "./SearchInput.module.css";

const SearchInput = () => {
  return (
    <Input.Search className={s.input} placeholder="search..." enterButton />
  );
};

export default SearchInput;
