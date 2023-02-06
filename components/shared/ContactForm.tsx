import axios from 'axios'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface IFormInput {
  firstName: String
  lastName: String
  email: String
  subject: String
  message: String
}

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<IFormInput>()
  const [successMessage, setSuccessMessage] = useState('')

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log({ data })
    axios
      .post('https://eot4359pijjo9u0.m.pipedream.net', data)
      .then((response) => {
        setSuccessMessage(`Thanks for contacting me 😊`)
      })
      .catch((e) => console.error(e))
  }

  return (
    <form className="m-auto max-w-sm" onSubmit={handleSubmit(onSubmit)}>
      <label
        className="mb-2 block text-sm font-bold text-gray-700"
        htmlFor="firstName"
      >
        First Name
      </label>
      {errors.firstName && (
        <div className="text-red-700">First Name is required</div>
      )}
      <input
        className="focus:shadow-outline mb-4 w-full appearance-none rounded border py-3 px-3 leading-tight text-gray-700 shadow focus:outline-none"
        id="firstName"
        type="text"
        placeholder="First Name"
        {...register('firstName', { required: true })}
      ></input>
      <label
        className="mb-2 block text-sm font-bold text-gray-700"
        htmlFor="lastName"
      >
        Last Name
      </label>
      {errors.lastName && (
        <div className="text-red-700">Last Name is required</div>
      )}
      <input
        className="focus:shadow-outline mb-4 w-full appearance-none rounded border py-3 px-3 leading-tight text-gray-700 shadow focus:outline-none"
        id="lastName"
        type="text"
        placeholder="Last Name"
        {...register('lastName', { required: true })}
      ></input>
      <label
        className="mb-2 block text-sm font-bold text-gray-700"
        htmlFor="email"
      >
        Email
      </label>
      {errors.email && (
        <div className="text-red-700">Is your email correct?</div>
      )}
      <input
        className="focus:shadow-outline mb-4 w-full appearance-none rounded border py-3 px-3 leading-tight text-gray-700 shadow focus:outline-none"
        id="email"
        type="text"
        placeholder="Email"
        {...register('email', {
          required: true,
          pattern:
            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        })}
      ></input>
      <label
        className="mb-2 block text-sm font-bold text-gray-700"
        htmlFor="subject"
      >
        Subject
      </label>
      {errors.subject && (
        <div className="text-red-700">Subject is required</div>
      )}
      <input
        className="focus:shadow-outline mb-4 w-full appearance-none rounded border py-3 px-3 leading-tight text-gray-700 shadow focus:outline-none"
        id="subject"
        type="text"
        placeholder="Subject"
        {...register('subject', { required: true })}
      ></input>
      <label
        className="mb-2 block text-sm font-bold text-gray-700"
        htmlFor="message"
      >
        Message
      </label>
      {errors.message && (
        <div className="text-red-700">Message is required</div>
      )}
      <textarea
        rows={5}
        className="focus:shadow-outline mb-4 w-full appearance-none rounded border py-3 px-3 leading-tight text-gray-700 shadow focus:outline-none"
        id="message"
        placeholder="Message"
        {...register('message', { required: true })}
      ></textarea>
      <button
        className="focus:ring-violet-300 rounded bg-gray-700 py-2 px-4 font-bold text-white hover:bg-gray-900 focus:outline-none focus:outline-none focus:ring"
        role="submit"
      >
        {isSubmitting ? 'Submitting' : 'Submit'}
      </button>
      {successMessage && <p className="my-3 text-gray-800">{successMessage}</p>}
    </form>
  )
}
