import { useEffect } from "react";
import RepStore from "../../Store/RepStore";
import s from "./List.module.css";
import Item from "../Item";

const List = () => {

  useEffect(() => {
    RepStore.getItems()
  })
  
  return (
    <div className={s.wrapper}>

      <div className={s.sort__container}>
        <p className={s.count}>Repository amount: {RepStore.pageCount}</p>
        <div className={s.sort__block}> 
          <button>sort</button>
          <button>order</button>
        </div>
      </div>

      <div>
    {RepStore.items && RepStore.items.length > 0 ? (
        RepStore.items.map((item) => (
            <Item 
                key={item.id}
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
        <p>no data</p> 
    )}
</div>

    </div>
  );
};

export default List;
