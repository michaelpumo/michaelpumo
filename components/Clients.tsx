import { FC } from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'

interface Clients {
  title?: string
}

interface Props {
  blok: any
}

const Clients: FC<Props> = ({ blok }) => {
  console.log(blok)
  return (
    <section
      {...storyblokEditable(blok)}
      data-component="Clients"
      className="relative z-10 flex flex-col items-center w-full min-h-screen bg-brand-grey-light text-brand-dark p-4 xs:p-8 sm:p-16 xl:p-20"
    >
      <div className="w-full max-w-xl">
        <h1 className="text-3xl mb-5">Clients</h1>

        <p className="text-lg text-brand-dark/50 mb-10 max-w-[40ch]">
          If you have a project in mind or would like to make an enquiry you can
          use the form below.
        </p>

        <ul className="flex flex-col gap-1 text-6xl">
          {blok.clients.map((client: any, index: number) => (
            <li key={index}>{client.title}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Clients
