import { MainNav } from '@/components/main-nav'

const Navbar = async () => {
  return (
    <div className="border-b">
      <div className={'flex h-16 items-center px-4'}>
        {/*<StoreSwitcher items={stores} />*/}
        <MainNav className={'ml-4 lg:ml-6'} />
        <div className={'ml-auto flex items-center space-x-4'}>user avatar</div>
      </div>
    </div>
  )
}

export default Navbar
