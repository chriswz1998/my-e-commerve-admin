import { useEffect, useRef } from 'react'
import Script from 'next/script'
import { Button } from '@/components/ui/button'

const UEditorComponent = () => {
  const editorInstance = useRef(null)
  // Cloudinary 配置
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
          // 初始化编辑器并将实例保存到 ref 中
          editorInstance.current = window.UE.getEditor('editor')
        }
        document.body.appendChild(scriptPlugin)
      }

      document.body.appendChild(scriptEditor)

      return () => {
        // 卸载组件时清理脚本
        document.body.removeChild(scriptEditor)
      }
    }
  }, [])

  const handleContentChange = () => {
    if (!editorInstance.current) return
    // @ts-ignore
    const content = editorInstance.current.getContent()

    // 提取内容中的图片链接
    const imageUrls = [
      ...content.matchAll(/<img[^>]*src=["']([^"']+)["']/g)
    ].map((match) => match[1])

    // 如果存在图片链接，上传到 Cloudinary
    if (imageUrls.length > 0) {
      uploadImagesToCloudinary(imageUrls)
        .then((newUrls) => {
          // 替换编辑器内容中的原始链接为 Cloudinary 新链接
          let updatedContent = content
          imageUrls.forEach((url, index) => {
            updatedContent = updatedContent.replace(url, newUrls[index])
          })
          // @ts-ignore
          editorInstance?.current?.setContent(updatedContent)
        })
        .catch((error) => {
          console.error('图片上传失败:', error)
        })
    }
  }

  // 上传图片到 Cloudinary
  const uploadImagesToCloudinary = async (imageUrls: any[]) => {
    // 使用 Promise.all 处理多个图片链接的上传
    const uploadPromises = imageUrls.map(async (url) => {
      const formData = new FormData()
      formData.append('file', url) // 图片链接
      // @ts-ignore
      formData.append('upload_preset', UPLOAD_PRESET) // Cloudinary 上传预设

      // 发送上传请求到 Cloudinary
      const response = await fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      if (data.url) {
        return data.url // 返回 Cloudinary 上的新图片 URL
      } else {
        throw new Error('上传到 Cloudinary 失败')
      }
    })

    // 等待所有上传完成并返回新链接数组
    return await Promise.all(uploadPromises)
  }

  // 获取编辑器内容
  const getEditorContent = () => {
    if (editorInstance.current) {
      // @ts-ignore
      const content = editorInstance.current.getContent()
      console.log('编辑器内容:', content)
      return content
    } else {
      console.warn('编辑器尚未初始化')
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
      <Button onClick={() => console.log(getEditorContent())}>获取内容</Button>
      <Button onClick={handleContentChange}>替换图片链接</Button>
    </div>
  )
}

export default UEditorComponent
