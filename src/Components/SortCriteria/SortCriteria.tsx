import { Input, Radio, RadioChangeEvent } from "antd";
import s from "./SortCriteria.module.css";
import RepStore from "../../Store/RepStore";
import { observer } from "mobx-react-lite";

const SortCriteria = observer(() => {
  const handleSortAsc = () => {
    RepStore.setOrderByAsc();
  };

  const handleSortDesc = () => {
    RepStore.setOrderByDesc();
  };

  const handleSortCriteria = (e: RadioChangeEvent) => {
    RepStore.setSortCriteria(e.target.value);
  };

  const onSearch = (value: string) => {
    console.log(value);
  };
  return (
    <div className={s.container}>
      <div>
        <p className={s.count}>Repository amount: {RepStore.itemCount}</p>
      </div>
      <div className={s.sort__container}>
        <Input.Search
          className={s.input}
          placeholder="search..."
          onSearch={onSearch}
          enterButton
        />
        <div className={s.sort__block}>
          <Radio.Group defaultValue={"ASC"}>
            <Radio.Button onClick={handleSortAsc} value="ASC">
              Sort by asc
            </Radio.Button>
            <Radio.Button onClick={handleSortDesc} value="DESC">
              Sort by desc
            </Radio.Button>
          </Radio.Group>
        </div>
        <div className={s.sort__block}>
          <Radio.Group onChange={handleSortCriteria} defaultValue={"stars"}>
            <Radio.Button value="stars">Sort by stars</Radio.Button>
            <Radio.Button value="forks">Sort by forks</Radio.Button>
            <Radio.Button value="updated">Sort by updated</Radio.Button>
          </Radio.Group>
        </div>
      </div>
    </div>
  );
});

export default SortCriteria;
