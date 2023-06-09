import React, { useState } from 'react'
import { Space, Table, Tag, Button, Image, Modal } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { TableComponent } from './table.style'
import { useMutation } from 'react-query'
import { ModalAddProduct } from '../table-config/add.modal'
import {
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons'
import { deleteProduct } from '../../service/queries/api.delete.products'
interface DataType {
    key: string
    name: string
    age: number
    address: string
    tags: string[]
}

export const TableData = ({
    products,
    refetchProducts,
    setFilter,
    filter,
    categories,
    isLoadingProduct,
}: any) => {
    const [modal, contextHolder] = Modal.useModal()
    const { mutateAsync } = useMutation('delete', deleteProduct, {
        onSuccess: () => refetchProducts(),
    })
    const [addModal, setAddModal] = useState<boolean>(false)
    const [idProduct, setIdProduct] = useState<number>(0)
    const columns: ColumnsType<DataType> = [
        {
            title: 'Image',
            dataIndex: 'imageSrc',
            key: 'imageSrc',
            render: (src) => (
                <Image style={{ width: 100 }} src={src} alt="image" />
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <Space>{text}</Space>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (text) => (
                <Space style={{ minWidth: 60 }}>
                    <div>{text.slice(0, 100) + '...'}</div>
                </Space>
            ),
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
            render: (text) => (
                <>
                    <Tag color="green">{text?.toUpperCase()}</Tag>
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record: any) => (
                <Space size="small" style={{ width: 'auto' }}>
                    <Button
                        onClick={() => {
                            setIdProduct(record?.id)
                            setAddModal(true)
                        }}
                    >
                        <EditOutlined style={{ color: '#002f96' }} />
                    </Button>
                    <Button
                        onClick={() =>
                            modal.confirm({
                                title: 'Confirm',
                                icon: <ExclamationCircleOutlined />,
                                content:
                                    'Are you sure you want to delete this item?',
                                okText: 'Yes',
                                cancelText: 'Cancel',
                                onOk: () => mutateAsync(record?.id),
                            })
                        }
                    >
                        <DeleteOutlined style={{ color: '#eb2f96' }} />
                    </Button>
                </Space>
            ),
        },
    ]
    return (
        <>
            <TableComponent>
                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={products?.data}
                    pagination={{
                        current: filter?._page,
                        pageSize: filter?._limit,
                        total: products?.headers['x-total-count'],
                        onChange: (current: number, size: number) =>
                            setFilter({
                                ...filter,
                                _page: current,
                                _limit: size,
                            }),
                        showSizeChanger: true,
                    }}
                    loading={isLoadingProduct}
                />
            </TableComponent>
            <ModalAddProduct
                refetch={refetchProducts}
                edit={true}
                id={idProduct}
                categories={categories}
                addModal={addModal}
                setAddModal={setAddModal}
            />
            {contextHolder}
        </>
    )
}
