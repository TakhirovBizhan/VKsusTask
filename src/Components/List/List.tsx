import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import RepStore from "../../Store/RepStore";
import s from "./List.module.css";
import Item from "../Item";
import { Radio } from "antd";
import { debounce } from "lodash";

const List = observer(() => {

  const handleScroll = debounce(() => {
    if (RepStore.loading) return;
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 10 && !RepStore.loading) {
      incrementPage();
      RepStore.getItems();
    }
  }, 150);

  const incrementPage = () => {
    RepStore.setCurrentPage(RepStore.currentPage + 1);
  };

  useEffect(() => {
    if (!RepStore.items.length && !RepStore.loading) {
      RepStore.getItems();
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleSortAsc = () => {
    RepStore.setOrderByAsc();
  };

  const handleSortDesc = () => {
    RepStore.setOrderByDesc();
  };

  return (
    <div className={s.wrapper}>
      <div className={s.sort__container}>
        <p className={s.count}>Repository amount: {RepStore.itemCount}</p>
        <div className={s.sort__block}>
          <Radio.Button onClick={handleSortAsc} value="ASC">Sort by asc</Radio.Button>
          <Radio.Button onClick={handleSortDesc} value="DESC">Sort by desc</Radio.Button>
        </div>
        <div className={s.sort__block}>
          <Radio.Button  value="stars">Sort by stars</Radio.Button>
          <Radio.Button  value="forks">Sort by forks</Radio.Button>
          <Radio.Button  value="updated">Sort by updated</Radio.Button>
        </div>
      </div>

      <div className={s.list__block}>
        {RepStore.loading && !RepStore.itemCount ? (
          <p>Loading...</p>
        ) : RepStore.items && RepStore.items.length > 0 ? (
          RepStore.items.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              stars={item.stargazers_count}
              forks={item.forks_count}
              updated={item.updated_at}
              name={item.name}
              private={item.private}
              avatarUrl={item.owner.avatar_url}
              login={item.owner.login}
            />
          ))
        ) : (
          <p>No data</p>
        )}
      </div>
    </div>
  );
});

export default List;