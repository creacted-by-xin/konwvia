import { Modal as AntdModal, Form, Input} from "antd";
import { useState } from "react";
import './index.css'
import { useForm } from "antd/es/form/Form";


const { TextArea } = Input;

interface ModalProps {
    isOpen: boolean,
    changeIsOpen: (isOpen: boolean)=>void
}

function Modal({isOpen, changeIsOpen}: ModalProps) {
    const [form] = useForm()
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleOk = async () => {
        try {
          const values = await form.validateFields();
      
          console.log(values);
      
          setConfirmLoading(true);
          setTimeout(() => {
            changeIsOpen(false);
            setConfirmLoading(false);
            form.resetFields();
          }, 2000);
        } catch (error) {
          console.log('校验失败', error);
        }
      };

    const handleCancel = () => {
        form.resetFields();
        changeIsOpen(false);
    };

    return <AntdModal
    className="modal"
        title="新建知识库"
        open={isOpen}
        onOk={handleOk}
        okText='新增'
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        cancelText= '取消'
        centered
    >

        <Form
        form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            className="modalForm"
        >
            <Form.Item
                label="知识库名称"
                name="knowledgeName"
                rules={[{ required: true, message: '请输入知识库名称!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="描述"
                name="desc"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <TextArea rows={4} maxLength={100} />
            </Form.Item>
        </Form>

    </AntdModal>
};

export default Modal;