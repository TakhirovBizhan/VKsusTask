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
      <Text>Last Updated: {updated}</Text>
    </Card>
  );
};

export default Item;