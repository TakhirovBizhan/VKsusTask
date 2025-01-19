import { useRepos } from "../../api/getRepos";

 const List = () => {

  {data, loading, error} = useRepos();
  return (
    <div>List</div>
  )
}

export default List;
