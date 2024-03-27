/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'

import { Input } from './components'
import MasterData from './services/MasterData'
import styles from './styles.css'

const dataFields = {
  email: {
    type: 'email',
    name: 'email',
    label: 'Escribe acá tu correo electrónico*',
    placeholder: 'Escribe acá tu correo electrónico*',
  },
}

const initialDataForm = {
  email: '',
}

interface NewsletterFormProps {
  __terms: 'string'
  __textLink: 'string'
  __btn: 'string'
}

const NewsletterForm = ({
  __terms,
  __textLink,
  __btn,
}: NewsletterFormProps) => {
  const masterData = new MasterData('CL')
  const [checkBox, setCheckBox] = useState<boolean>(false)
  const updateCheckBox = (e: any) => {
    setCheckBox(e.target.checked)
  }

  const [dataForm, setDataForm] = useState<any>(initialDataForm)
  const [submitResultText, setSubmitResultText] = useState('')

  const updateDataForm = (name: string, value: string) => {
    setDataForm({
      ...dataForm,
      [name]: value,
    })
  }

  const onChange = (
    event:
      | React.FormEvent<HTMLInputElement>
      | React.FormEvent<HTMLSelectElement>
      | React.FormEvent<HTMLTextAreaElement>
  ) => {
    const target = event.target as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement

    const { name, value }: any = target

    updateDataForm(name, value)
  }

  const updateSubmitResultText = (message: string) => {
    setSubmitResultText(message)
    setTimeout(() => {
      setSubmitResultText('')
    }, 7000)
  }

  const onSubmit = async (event: any) => {
    event.preventDefault()

    const resSearchEmailInMD: any = await masterData.get(
      'email',
      dataForm.email
    )

    if (resSearchEmailInMD) {
      return updateSubmitResultText('Este email se encuentra en uso')
    }

    const resCreateDocument = await masterData.post(dataForm)

    if (!resCreateDocument) {
      updateSubmitResultText('Ha ocurrido un error, por favor intenta de nuevo')
    }

    updateSubmitResultText('Información enviada correctamente')
    window.dispatchEvent(new CustomEvent('custom:newsletterSubmit'))
    setDataForm(initialDataForm)
    setCheckBox(false)
  }

  return (
    <div className={`${styles.newsletterForm}`}>
      <form onSubmit={onSubmit}>
        <div>
          <div className={`flex relative ${styles.newsletterForm__emailBtn}`}>
            <Input
              required
              name={dataFields.email.name}
              type={dataFields.email.type}
              label={dataFields.email.label}
              placeholder={dataFields.email.label}
              value={dataForm.email}
              onChange={onChange}
            />
            <button
              type="submit"
              className={`${styles.newsletterForm__submitButton}`}
            >
              {__btn}
            </button>
          </div>
          <div className={styles.groupCheckBox}>
            <input
              required
              type="checkbox"
              name="nl-radio"
              checked={checkBox}
              onChange={updateCheckBox}
              className={styles.checkBox}
              id="checkModal"
            />
            <label htmlFor="checkModal" className={styles.lblCheckbox}>
              {__terms}{' '}
            </label>
          </div>
          <div className={styles.groupCheckBoxText}>
            <label className={styles.lblCheckboxText}>{__textLink} </label>
          </div>
          <p
            className={`tc ${styles.newsletterForm__resultMessage} ${
              submitResultText
                ? `${styles['newsletterForm__resultMessage--show']}`
                : ''
            }`}
          >
            {submitResultText}
          </p>
        </div>
      </form>
    </div>
  )
}

NewsletterForm.schema = {
  title: 'Newsletter',
  description: 'Configuración',
  type: 'object',
  // properties: {
  //   __terms: {
  //     title: 'Términos y condiciones',
  //     type: 'string',
  //   },
  //   __textLink: {
  //     title: 'Texto Link',
  //     type: 'string',
  //   },
  //   __link: {
  //     title: 'Url Tyc',
  //     type: 'string',
  //   },
  //   __btn: {
  //     title: 'Texto Boton',
  //     type: 'string',
  //   },
  // },
}

export default NewsletterForm
