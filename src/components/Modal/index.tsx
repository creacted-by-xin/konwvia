import { Modal as AntdModal, Form, Input, Upload, message, Button } from "antd";
import { useState } from "react";
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { useForm } from "antd/es/form/Form";
import './index.css'
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
    root: {
        borderRadius: token.borderRadius,
        padding: token.padding,
    },
}));

const { TextArea } = Input;
const { Dragger } = Upload;

interface AddModalProps {
    isOpen: boolean,
    changeIsOpen: (isOpen: boolean) => void
}

export const AddModal = ({ isOpen, changeIsOpen }: AddModalProps) => {
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
        cancelText='取消'
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


interface UploadModalProps {
    isOpen: boolean,
    changeIsOpen: (isOpen: boolean) => void
}

// 上传文件弹窗
export const UploadModal = ({ isOpen, changeIsOpen }: UploadModalProps) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

  const props: UploadProps = {
    name: 'file',
    maxCount: 10,
    multiple: true,
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        messageApi.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        messageApi.error(`${info.file.name} file upload failed.`);
      }
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => percent && `${Number.parseFloat(percent.toFixed(2))}%`,
    },
  };

    const handleOk = async () => {
        try {
            setConfirmLoading(true);
            setTimeout(() => {
                changeIsOpen(false);
                setConfirmLoading(false);
            }, 2000);
        } catch (error) {
            console.log('校验失败', error);
        }
    };

    const handleCancel = () => {
        changeIsOpen(false);
    };

    return <AntdModal
        className="modal"
        title="上传文档"
        open={isOpen}
        onOk={handleOk}
        okText='上传'
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        cancelText='取消'
        centered
    >
        <div className="upload-tips">支持PDF、Word、Excel、PPT、TXT、Markdown；单个文件最大50MB；单次最多10个。</div>
      <Dragger className="ant-upload" {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
        <p className="ant-upload-hint">
          上传成功后，系统将自动解析并向量化文档
        </p>
      </Dragger>
    </AntdModal>
}