import React, { useState } from 'react'
import ImageUploader, { FileObjectType } from 'react-image-upload'
import 'react-image-upload/dist/index.css'
import { Modal, Input, Button } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import {
    addProducts,
    putProducts,
} from '../../service/queries/api.add.products'
import { getProductsById } from '../../service/queries/api.get.products'

type TModalProps = {
    edit?: boolean
    id?: number
    addModal: boolean
    setAddModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalAddProduct: React.FC<TModalProps> = ({
    edit,
    id,
    addModal,
    setAddModal,
}) => {
    const [imageUrl, setImageUrl] = useState<string | null>('')
    const { mutateAsync } = useMutation(addProducts)
    const { mutateAsync: updateAsyn } = useMutation(putProducts)
    const { data } = useQuery(
        ['getGroupPupil', id],
        () => getProductsById(id),
        {
            onSuccess: (res: any) => {
                console.log(res?.data?.at(0))
                reset(res?.data?.at(0))
                setImageUrl(res?.data?.at(0)?.imageSrc)
            },
            enabled: !!id,
        }
    )
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm()
    const onSubmit = (data: any) => {
        let postData = {
            imageSrc: imageUrl,
            ...data,
        }
        if (edit) updateAsyn(postData)
        else mutateAsync(postData)
    }

    const handleOk = () => {
        setAddModal(false)
    }

    const handleCancel = () => {
        setAddModal(false)
    }
    function getImageFileObject(imageFile: any) {
        setImageUrl(imageFile?.dataUrl)
    }
    function runAfterImageDelete(img: FileObjectType): any {
        setImageUrl(null)
    }

    return (
        <>
            <Modal
                title="Basic Modal"
                open={addModal}
                footer={null}
                onCancel={handleCancel}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ImageUploader
                        onFileAdded={(img) => getImageFileObject(img)} // function that runs to confirm that your image actually exists
                        onFileRemoved={(img) => runAfterImageDelete(img)} // function runs on once you delete your image
                    />
                    <Controller
                        name="name"
                        defaultValue=""
                        control={control}
                        render={({ field }: any) => <Input {...field} />}
                    />
                    <Controller
                        name="description"
                        defaultValue=""
                        control={control}
                        render={({ field }: any) => <Input {...field} />}
                    />
                    <Controller
                        name="price"
                        defaultValue=""
                        control={control}
                        render={({ field }: any) => <Input {...field} />}
                    />
                    <Controller
                        name="category"
                        defaultValue=""
                        control={control}
                        render={({ field }: any) => <Input {...field} />}
                    />
                    <Button htmlType="submit">submit</Button>
                </form>
            </Modal>
        </>
    )
}
