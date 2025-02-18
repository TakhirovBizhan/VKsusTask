import React, { useState } from "react";
import { Avatar, Card, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import EditModal from "../EditModal";
import { cardProps } from "../../Models/CardProps";
import s from "./Card.module.css";

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
  url,
  onDelete,
}: cardProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleEdit = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const actions: React.ReactNode[] = [
    <EditOutlined key="edit" onClick={handleEdit} />,
    <DeleteOutlined key="delete" onClick={onDelete} />,
  ];

  const formattedDate = new Date(updated).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <>
      <Card
        actions={actions}
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
        <div className={s.card__content}>
          <Text>Stars: {stars}</Text>
          <Text>Forks: {forks}</Text>
          <Text>
            Last Updated:
            {formattedDate}
          </Text>
          <a href={url}>link</a>
        </div>
      </Card>

      <EditModal
        id={id}
        visible={isModalVisible}
        onClose={handleCloseModal}
        stars={stars}
        forks={forks}
        isPrivate={isPrivate}
        login={login}
      />
    </>
  );
};

export default Item;
