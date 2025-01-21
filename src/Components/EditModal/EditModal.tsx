import {
  Modal,
  Form,
  Input,
  Button,
  Checkbox,
  InputNumber,
  message,
} from "antd";
import { modalProps } from "../../Models/modalProps";
import RepStore from "../../Store/RepStore";
import { updateProps } from "../../Models/updateProps";

const EditModal = ({
  id,
  visible,
  onClose,
  stars,
  forks,
  isPrivate,
  login,
}: modalProps) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Item is updated!",
    });
  };

  const error = (content: string) => {
    messageApi.open({
      type: "error",
      content: content,
    });
  };

  const handleSave = () => {
    form
      .validateFields()
      .then((values: updateProps) => {
        RepStore.updateItem(id, values);
        onClose();
        success();
      })
      .catch((e) => {
        console.error("Validation Failed:", e);
        error(e.message);
      });
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Edit Item"
        open={visible}
        onCancel={onClose}
        footer={[
          <Button key="cancel" onClick={onClose}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Save
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ login, stars, forks, isPrivate }}
        >
          <Form.Item
            label="login"
            name="login"
            rules={[{ required: true, message: "Please enter the login" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Stars"
            name="stars"
            rules={[
              { required: true, message: "Please enter the stars count" },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            label="Forks"
            name="forks"
            rules={[
              { required: true, message: "Please enter the forks count" },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name="isPrivate" valuePropName="checked">
            <Checkbox>Is Private</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditModal;
