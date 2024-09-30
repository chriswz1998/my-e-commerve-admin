'use client'

import { UserButton } from '@clerk/nextjs'
import { Modal } from '@/components/ui/modal'

const SetupPage = () => {
  return (
    <div>
      <Modal
        title={'test'}
        description={'test'}
        isOpen={true}
        onClose={() => {}}
      >
        this is protected route!
      </Modal>
      <UserButton />
    </div>
  )
}

export default SetupPage
