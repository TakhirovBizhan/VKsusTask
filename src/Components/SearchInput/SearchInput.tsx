import { Input } from "antd";
import s from "./SearchInput.module.css";

const SearchInput = () => {
  const onSearch = (value: string) => {
    console.log(value);
  };

  return (
    <Input.Search
      className={s.input}
      placeholder="search..."
      onSearch={onSearch}
      enterButton
    />
  );
};

export default SearchInput;
