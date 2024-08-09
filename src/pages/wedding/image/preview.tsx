import { Image, Modal } from "antd";

interface Props {
  visible: boolean;
  imageUrl: string;
  onCancel: () => void;
}

function Preview(props: Props) {
  const { visible, imageUrl, onCancel } = props;
  return (
    <Modal destroyOnClose open={visible} onCancel={onCancel} footer={null}>
      <Image width={200} placeholder src={imageUrl} />
    </Modal>
  );
}

export default Preview;
