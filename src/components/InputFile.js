import React, { useState } from 'react'

export default function InputFile({ name, register, previewFile, errors }) {
    const [validationLimitFile, setValidationLimitFile] = useState({ limit: true })
    const { limit } = validationLimitFile
    const validationError = errors[name]?.type === 'required'

    const handleChange = (e) => {
        const { files } = e.target
        const file = files[0]

        if (file) delete errors.file

        setValidationLimitFile({ limit: file?.size > 1024 * 1024 ? false : true })
        previewFile(file)
    }

    const validarFileError = () => {
        if (validationError) return true
        if (!limit) return true
        return false
    }

    return <div className="mb-3">
        <input
            type='file'
            className={`form-control ${validarFileError() && 'border border-danger'}`}
            {...register(name, { required: true })}
            onChange={handleChange}
        />
        {(validationError && <p className="text-danger text-start ps-2">{name} is required</p>)
            || (!limit && <p className="text-danger text-start ps-2">{name} size limit: 1024KB </p>)}
    </div>
}