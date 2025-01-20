import { Radio, RadioChangeEvent } from 'antd'
import s from "./SortCriteria.module.css";
import RepStore from '../../Store/RepStore'

 const SortCriteria = () => {

    const handleSortAsc = () => {
        RepStore.setOrderByAsc();
      };
    
      const handleSortDesc = () => {
        RepStore.setOrderByDesc();
      };

      const handleSortCriteria = (e: RadioChangeEvent) => {
        RepStore.setSortCriteria(e.target.value)
      }


  return (
    <div className={s.sort__container}>
        <p className={s.count}>Repository amount: {RepStore.itemCount}</p>
        <div className={s.sort__block}>
        <Radio.Group defaultValue={'ASC'}>
          <Radio.Button onClick={handleSortAsc} value="ASC">
            Sort by asc
          </Radio.Button>
          <Radio.Button onClick={handleSortDesc} value="DESC">
            Sort by desc
          </Radio.Button>
          </Radio.Group>
        </div>
        <div className={s.sort__block}>
        <Radio.Group onChange={handleSortCriteria} defaultValue={'stars'}>
          <Radio.Button value="stars">Sort by stars</Radio.Button>
          <Radio.Button value="forks">Sort by forks</Radio.Button>
          <Radio.Button value="updated">Sort by updated</Radio.Button>
          </Radio.Group>
        </div>
      </div>
  )
}

export default SortCriteria;
