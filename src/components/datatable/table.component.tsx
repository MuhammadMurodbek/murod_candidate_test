import React from 'react'
import { Space, Table, Tag, Button } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { TableComponent } from './table.style'

interface DataType {
    key: string
    name: string
    age: number
    address: string
    tags: string[]
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
        render: (src) => <img src={src} />,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Category',
        key: 'category',
        dataIndex: 'category',
        render: (_, { tags }) => (
            <>
                <Tag color="blue">oops</Tag>
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="small" style={{ width: 10 }}>
                <Button>update</Button>
                <Button>remove</Button>
            </Space>
        ),
    },
]

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
]

export const TableData = () => (
    <TableComponent>
        <Table columns={columns} dataSource={data} />
    </TableComponent>
)
