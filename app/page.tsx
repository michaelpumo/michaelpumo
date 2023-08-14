import Image from 'next/image'
import Link from 'next/link'
import { getStoryblokApi } from '@storyblok/react/rsc'
import StoryblokStory from '@storyblok/react/story'
import ButtonAppearance from '@/components/ButtonAppearance'

export async function fetchData() {
  const sbParams = { version: 'draft' }
  const storyblokApi = getStoryblokApi()

  return storyblokApi.get(`cdn/stories/home`, sbParams)
}

export default async function Home() {
  const { data } = await fetchData()

  return (
    <main>
      <pre>{data.story.name}</pre>
      <StoryblokStory story={data.story} />

      <section className="sticky top-0 -z-10 w-full min-h-screen grid grid-cols-2">
        <div className="p-4 sm:p-10 lg:p-14 xl:p-20 bg-brand-blue text-white">
          <h1 className="font-display text-5xl text-balance mb-10">
            Frontend web development with a modern stack.
          </h1>
          <p className="text-xl mb-10">
            {
              "My name is Michael Pumo. I'm a frontend web developer based in London, UK and I'd like to help you build your next project."
            }
          </p>

          <p>
            <Link href="/boo">
              <ButtonAppearance>{"Let's work together"}</ButtonAppearance>
            </Link>
          </p>
        </div>

        <div className="bg-slate-100">
          <Image
            className="w-full h-full object-cover"
            src="/images/me.jpeg"
            alt="Michael Pumo"
            sizes="50vw"
            width={1000}
            height={1000}
            priority
          />
        </div>
      </section>

      <section className=" w-full min-h-screen bg-white">
        <div className="w-full min-h-screen flex items-center justify-center">
          <h2 className="font-display text-7xl text-balance text-center text-brand-blue mb-10">
            Wonderful things happen when you work together.
          </h2>
        </div>
      </section>
    </main>
  )
}
