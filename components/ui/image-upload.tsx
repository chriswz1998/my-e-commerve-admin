'use client'

import { FC, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ImagePlus, Trash } from 'lucide-react'
import Image from 'next/image'
import { CldUploadWidget } from 'next-cloudinary'

interface ImageUploadProps {
  disabled?: boolean
  onChange: (value: string) => void
  onRemove: (value: string) => void
  value: string[]
}

const ImageUpload: FC<ImageUploadProps> = ({
  disabled,
  value,
  onChange,
  onRemove
}) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }
  const onUpload = (result: any) => {
    onChange(result.info.secure_url)
  }

  return (
    <div>
      <div className={'mb-4 flex items-center gap-4'}>
        {value.map((url) => (
          <div
            key={url}
            className={
              'relative w-[200px] h-[200px] rounded-md overflow-hidden'
            }
          >
            <div className={'z-10 absolute top-2 right-2'}>
              <Button
                type={'button'}
                onClick={() => onRemove(url)}
                variant={'destructive'}
                size={'icon'}
              >
                <Trash className={'w-4 h-4'} />
              </Button>
            </div>
            <Image src={url} alt={'Image'} className={'object-fill'} fill />
          </div>
        ))}
      </div>
      <CldUploadWidget uploadPreset="ecommerce" onSuccess={onUpload}>
        {({ open }) => {
          return (
            <Button
              type={'button'}
              disabled={disabled}
              variant={'secondary'}
              onClick={() => open()}
            >
              <ImagePlus className={'w-4 h-4 mr-2'} />
              Upload an image
            </Button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}

export default ImageUpload
