import { Table as AntdTable} from "antd";

interface columnType {
    title: string,
    dataIndex: string,
    key: string
};

interface TableProps {
    columns: columnType[],
    data: Record<string, unknown>[]
};



function Table({columns, data}: TableProps) {
    return (<AntdTable columns={columns} dataSource={data} />)
};

export default Table;