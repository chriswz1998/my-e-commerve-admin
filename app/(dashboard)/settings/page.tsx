import { SettingsForm } from '@/app/(dashboard)/settings/_components/setting-form'
const SettingsPage = async () => {
  return (
    <div className={'flex-col'}>
      <div className={'flex-1 p-6'}>
        <SettingsForm />
      </div>
    </div>
  )
}

export default SettingsPage
