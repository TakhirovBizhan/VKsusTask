import { Avatar, Card, Typography } from "antd";
import { cardProps } from "../../Models/CardProps";
import { DeleteOutlined, EditOutlined} from '@ant-design/icons';
import RepStore from "../../Store/RepStore";
import s from './Card.module.css'

const { Title, Text } = Typography;

const Item = ({
  id,
  stars,
  forks,
  updated,
  name,
  private: isPrivate,
  avatarUrl,
  login,
}: cardProps) => {

  const onDelete = () => {
    RepStore.deleteItem(id)
  }
  const actions: React.ReactNode[] = [
    <EditOutlined key="edit" />,
    <DeleteOutlined key="delete" onClick={onDelete}/>,
  ];

  const formattedDate = new Date(updated).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })

  return (
    <Card actions={actions}
      className={s.card}
      title={name}
      extra={
        isPrivate ? (
          <Text type="danger">Private</Text>
        ) : (
          <Text type="success">Public</Text>
        )
      }
    >
      <Avatar src={avatarUrl} alt={login} />
      <Title level={4}>{login}</Title>
      <Text>Stars: {stars}</Text>
      <br />
      <Text>Forks: {forks}</Text>
      <br />
      <Text>
        Last Updated:
        {formattedDate}
      </Text>

      
    </Card>
  );
};

export default Item;
