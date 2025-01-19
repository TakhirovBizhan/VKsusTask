import { Avatar, Card, Typography } from "antd";
import { cardProps } from "../../Models/CardProps";

const { Title, Text } = Typography;

const Item = ({
  stars,
  forks,
  updated,
  name,
  private: isPrivate,
  avatarUrl,
  login,
}: cardProps) => {

  const formattedDate = new Date(updated).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })

  return (
    <Card
      style={{ width: 300, margin: "16px" }}
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
