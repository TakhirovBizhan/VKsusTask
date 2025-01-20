import { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import RepStore from "../../Store/RepStore";
import s from "./List.module.css";
import Item from "../Item";
import { Skeleton, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import SortCriteria from "../SortCriteria";

const List = observer(() => {
  const [showLoader, setShowLoader] = useState(false);

  const handleScroll = debounce(() => {
    if (RepStore.loading) return;
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 10 && !RepStore.loading) {
      incrementPage();
      RepStore.getItems().finally(() => setShowLoader(false))
    }
  }, 200);

  const handleScrollShow = useCallback(() => {
    setShowLoader(true);
    handleScroll();
  }, [handleScroll])

  const incrementPage = () => {
    RepStore.setCurrentPage(RepStore.currentPage + 1);
  };

  useEffect(() => {
    if (!RepStore.items.length && !RepStore.loading) {
      RepStore.getItems();
    }

    window.addEventListener("scroll", handleScrollShow);
    return () => {
      window.removeEventListener("scroll", handleScrollShow);
    };
  }, [handleScrollShow]);

  return (
    <div className={s.wrapper}>
      <SortCriteria />
      <div className={s.list__block}>
        {RepStore.loading && !RepStore.items.length ? (
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        ) : RepStore.items && RepStore.items.length > 0 ? (
          <>
            {RepStore.items.map((item) => (
              <Item
                key={item.id}
                stars={item.stargazers_count}
                forks={item.forks_count}
                updated={item.updated_at}
                name={item.name}
                private={item.private}
                avatarUrl={item.owner.avatar_url}
                login={item.owner.login}
                onDelete={() => RepStore.deleteItem(item.id)}
              />
            ))}
            {showLoader && (
              <Spin
                className={s.loader}
                indicator={<LoadingOutlined spin />}
                size="large"
              />
            )}

            {RepStore.loading &&
              Array.from({ length: RepStore.itemsPerPage }).map((_, index) => (
                <Skeleton
                  className={s.skeleton__card}
                  key={index}
                  avatar
                  paragraph={{ rows: 4 }}
                  active
                />
              ))}
          </>
        ) : (
          <p>No data</p>
        )}
      </div>
    </div>
  );
});

export default List;