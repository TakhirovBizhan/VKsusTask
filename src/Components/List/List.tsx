import { useRepos } from "../../Hooks/useRepos";

 const List = () => {

  {data, loading, error} = useRepos();
  return (
    <div>List</div>
  )
}

export default List;
