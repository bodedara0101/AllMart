import { X } from 'lucide-react'
import React from 'react'

const ImgPreview = ({imagePreview, setImagePreview, image}) => {
    console.log(image)
  return (
    <>
        {imagePreview && (
        <div className="fixed flex items-center inset-0 h-[100vh] w-full z-[60] bg-black bg-opacity-50">
          <div className="flex justify-center items-center md:h-[70%] sm:h-1/2 h-1/3 md:w-[50%] w-[80%] rounded-lg p-1 mx-auto overflow-hidden">
            <X
              onClick={() => setImagePreview(false)}
              className="absolute top-2 right-2 text-white w-6 h-6 bg-red-600"
            />
            <img
              src={image.name ? URL.createObjectURL(image) : image}
              alt="Preview"
              className="h-[100%] w-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default ImgPreview