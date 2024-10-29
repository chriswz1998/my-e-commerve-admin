import { useEffect, useRef } from 'react'
import Script from 'next/script'
import { Button } from '@/components/ui/button'

interface UEditorComponentProps {
  onChange: (value: string) => void
  value: string
}

const UEditorComponent = ({ onChange, value }: UEditorComponentProps) => {
  const editorInstance = useRef<any>(null)
  // Cloudinary configuration
  const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`
  const UPLOAD_PRESET = 'ecommerce'

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const scriptEditor = document.createElement('script')
      scriptEditor.src = '/utf8-php/ueditor.all.min.js'
      scriptEditor.async = true
      scriptEditor.onload = () => {
        const scriptPlugin = document.createElement('script')
        scriptPlugin.src = '/utf8-php/135editor.js'
        scriptPlugin.async = true
        scriptPlugin.onload = () => {
          // Initialize editor and set ref
          editorInstance.current = window.UE.getEditor('editor')

          // Set initial value once editor is ready
          editorInstance.current?.ready(() => {
            editorInstance.current?.setContent(value)

            // Add content change listener
            editorInstance.current?.addListener('contentChange', () => {
              // Call onChange with current content
              const content = editorInstance.current?.getContent()
              onChange(content)
            })
          })
        }
        document.body.appendChild(scriptPlugin)
      }

      document.body.appendChild(scriptEditor)

      return () => {
        // Clean up scripts on unmount
        document.body.removeChild(scriptEditor)
      }
    }
  }, [value, onChange])

  const handleContentChange = () => {
    if (!editorInstance.current) return
    const content = editorInstance.current.getContent()

    const imageUrls = [
      ...content.matchAll(/<img[^>]*src=["']([^"']+)["']/g)
    ].map((match) => match[1])

    if (imageUrls.length > 0) {
      uploadImagesToCloudinary(imageUrls)
        .then((newUrls) => {
          let updatedContent = content
          imageUrls.forEach((url, index) => {
            updatedContent = updatedContent.replace(url, newUrls[index])
          })
          editorInstance?.current?.setContent(updatedContent)
        })
        .catch((error) => {
          console.error('Image upload failed:', error)
        })
    }
  }

  const uploadImagesToCloudinary = async (imageUrls: any[]) => {
    const uploadPromises = imageUrls.map(async (url) => {
      const formData = new FormData()
      formData.append('file', url)
      formData.append('upload_preset', UPLOAD_PRESET)

      const response = await fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      if (data.url) {
        return data.url
      } else {
        throw new Error('Upload to Cloudinary failed')
      }
    })

    return await Promise.all(uploadPromises)
  }

  const getEditorContent = () => {
    if (editorInstance.current) {
      const content = editorInstance.current.getContent()
      console.log('Editor content:', content)
      return content
    } else {
      console.warn('Editor is not initialized yet')
      return null
    }
  }

  return (
    <div>
      <Script src="/utf8-php/ueditor.config.js" strategy="afterInteractive" />
      <div
        id="editor"
        className={'max-w-4xl mx-auto border-l border-r border-b'}
        style={{ width: '100%', height: '400px' }}
      ></div>
      <Button
        onClick={handleContentChange}
        variant={'destructive'}
        className={'mt-6'}
      >
        Replace Image Links
      </Button>
    </div>
  )
}

export default UEditorComponent
