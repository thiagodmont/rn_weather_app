import React, { createContext, useState, useContext, useMemo } from "react"

export interface FormFieldValues {
  [key: string]: any
}

export type FormContent = {
  fieldsValue?: FormFieldValues,
  updateFieldValue: (field: string, value?: any) => void
}

const FormContext = createContext<FormContent>({ 
  updateFieldValue: () => {}, 
})

export function useForm(): FormContent | null {
  const context = useContext(FormContext)

  if (!context) {
    return null
  }

  return context
}

export function FormProvider(props) {
  const [fieldsValue, setFieldValue] = useState({})

  const updateFieldValue = (field: string, value?: any) => {
    setFieldValue((previous) => ({...previous, [field]: value }))
  }

  const value = useMemo(() => ({ fieldsValue, updateFieldValue }), [fieldsValue])

  return (
    <FormContext.Provider value={value} {...props} />
  )
}

function FormMountValue({ onHandleFields }) {
  const useFormContext = useForm()

  onHandleFields?.(useFormContext?.fieldsValue)

  return null
}

interface Props {
  children: any;
  onSubmit: (values: any) => void
  onHandleFields?: (values: any) => void
}

export default function Form({ children, onSubmit, onHandleFields }: Props) {
  return (
    <FormProvider>
      <FormMountValue onHandleFields={onHandleFields} />
      {Array.isArray(children) ? children.map((child, index) => React.cloneElement(child, { key: index })) : children}
    </FormProvider>
  )
}
