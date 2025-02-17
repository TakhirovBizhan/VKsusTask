import { Input } from "antd";

const SearchInput = () => {
  const onSearch = (value: string) => {
    console.log(value);
  };

  return (
    <Input.Search
      placeholder="input search text"
      onSearch={onSearch}
      enterButton
    />
  );
};

export default SearchInput;
