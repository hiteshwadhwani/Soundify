import Header from "@/components/Header"
import ListItem from '@/components/ListItem'

export default function Home() {
  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-scroll">
      <Header>
        <div className="mb-2">
          <h1 className="text-white font-semibold text-3xl">
            Welcome Back
          </h1>
        </div>
        <div className="grid md:grid-cols-2 sm:grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
          <ListItem name="Liked Songs" image="/images/liked.png" href="liked" />
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
          <h1 className="text-white text-2xl font-semibold">
            Newest songs
          </h1>
        <div>
          List of Songs !
        </div>
      </div>
    </div>
  )
}
