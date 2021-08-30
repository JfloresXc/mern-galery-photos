import React from 'react'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import InputFile from './InputFile'

function Input({ name, register, placeHolder = '', type = 'text', errors }) {
    const validationError = errors[name]?.type === 'required'
    return <div className="mb-3">
        <input
            type={type}
            className={`form-control ${validationError && 'border border-danger'}`}
            placeholder={placeHolder}
            {...register(name, { required: `${name} is required` })}
        />
        <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => <p className="text-danger text-start ps-2">{message}</p>}
        />
    </div>
}

export default function FormPublication({ functionSubmit, previewFile = null }) {
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors }
    } = useForm()

    const onSubmit = (data) => {
        if (data.file[0].size > 1024 * 1024) return
        functionSubmit(data)
        reset()
    }

    return (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <Input
                name='title'
                placeHolder='Título'
                register={register}
                errors={errors}
            />
            <Input
                name='description'
                placeHolder='Description'
                register={register}
                errors={errors}
            />
            <InputFile
                name='file'
                register={register}
                previewFile={previewFile}
                errors={errors}
            />
            <button className="btn btn-primary form-control">Add Image</button>
        </form>
    )
}
