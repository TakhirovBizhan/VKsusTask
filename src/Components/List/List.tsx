import { useCallback, useEffect, useState, useMemo } from "react";
import RepStore from "../../Store/RepStore";
import s from "./List.module.css";
import Item from "../Item";
import { Skeleton, Spin, Button, Alert } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import { observer } from "mobx-react-lite";

const List = observer(() => {
  const [showLoader, setShowLoader] = useState(false);

  const loadItems = useCallback(() => {
    if (RepStore.loading || RepStore.error) return;
    setShowLoader(true);
    RepStore.getItems()
      .catch((error) => {
        console.error("Error loading items:", error);
      })
      .finally(() => {
        setShowLoader(false);
      });
  }, []);

  const handleScroll = useMemo(
    () =>
      debounce(() => {
        if (RepStore.loading || RepStore.error) return;

        const { scrollTop, scrollHeight, clientHeight } =
          document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 10) {
          RepStore.setCurrentPage(RepStore.currentPage + 1);
          loadItems();
        }
      }, 500),
    [loadItems]
  );

  const handleRetry = () => {
    RepStore.clearError();
    loadItems();
  };

  const handleScrollShow = useCallback(() => {
    setShowLoader(true);
    handleScroll();
  }, [handleScroll]);

  useEffect(() => {
    if (!RepStore.items.length && !RepStore.loading && !RepStore.error) {
      loadItems();
    }

    window.addEventListener("scroll", handleScrollShow);
    return () => {
      window.removeEventListener("scroll", handleScrollShow);
    };
  }, [handleScrollShow, loadItems]);

  return (
    <>
      {RepStore.error && (
        <Alert
          className={s.alert_error}
          message="Error"
          description="An error occurred while loading items. Please try again."
          type="error"
          showIcon
          action={
            <Button size="small" type="primary" onClick={handleRetry}>
              Retry
            </Button>
          }
        />
      )}
      <div className={s.list__block}>
        {RepStore.loading && !RepStore.items.length ? (
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        ) : RepStore.items && RepStore.items.length > 0 ? (
          <>
            {RepStore.items.map((item) => (
              <Item
                id={item.id}
                key={item.id}
                stars={item.stargazers_count}
                forks={item.forks_count}
                url={item.html_url}
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
          !RepStore.error && <p>No data</p>
        )}
      </div>
    </>
  );
});

export default List;
