import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill';

const AddBlog = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  
  const [image, setImage] = useState(false);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [category, setCategory] = useState('Startup');
  const [isPublished, setIsPublished] = useState(false);
  
  const onSubmitHandler = async (e) => {
    e.preventDefault();
  }
  
  useEffect(() => {
    // initiate quill only once
    if(!quillRef.current && editorRef.current){
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write blog description here...'
      });
    }
  }, [])
  
  const generateContent = async() => {
  }
  
  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50 min-h-screen'>
      <form onSubmit={onSubmitHandler} className='w-full max-w-3xl'>
        <div className='bg-white w-full p-4 md:p-10 shadow rounded'>
          <p className='text-gray-700 font-medium'>Upload thumbnail</p>
          <label htmlFor="image">
            <img 
              src={!image ? assets.upload_area : URL.createObjectURL(image)} 
              alt="" 
              className='mt-2 h-16 rounded cursor-pointer'
            />
            <input 
              onChange={(e) => setImage(e.target.files[0])} 
              type="file" 
              id='image' 
              hidden 
              required
            />
          </label>
          
          <p className='mt-4 text-gray-700 font-medium'>Blog Title</p>
          <input 
            type="text" 
            placeholder='Type Here' 
            required 
            className='w-full mt-2 p-2 border border-gray-300 outline-none rounded' 
            onChange={e => setTitle(e.target.value)} 
            value={title}
          />
          
          <p className='mt-4 text-gray-700 font-medium'>Sub Title</p>
          <input 
            type="text" 
            placeholder='Type Here' 
            required 
            className='w-full mt-2 p-2 border border-gray-300 outline-none rounded' 
            onChange={e => setSubTitle(e.target.value)} 
            value={subTitle}
          />
          
          <p className='mt-4 text-gray-700 font-medium'>Blog Description</p>
          <div className='w-full mt-2 relative'>
            <div ref={editorRef} className='h-72 border border-gray-300 rounded'></div>
            <button 
              onClick={generateContent} 
              type='button' 
              className='absolute bottom-2 right-2 text-xs text-white bg-blue-700 px-4 py-1.5 rounded hover:underline cursor-pointer z-10'
            >
              Generate With AI
            </button>
          </div>

          <p className='mt-4'>Blog Category</p>
          <select onChange={e => setCategory(e.target.value)} name="category" className='mt-2 px-3 py-2 border text-gray-500 border-gray-300
          outline-none rounded'>
            <option value="">Selection Category</option>
            {blogCategories.map((item, index)=>{
              return <option key={index} value={item}>{item}</option>
            })}
          </select>

          <div className='flex gap-2 mt-4'>
            <p>Publish Now</p>
            <input type="checkbox" checked={isPublished} className='scale-125 cursor-pointer'
            onChange={e => e.target.checked}/>
          </div>

          <button type='submit' className='mt-8 w-40 h-10 bg-blue-700 text-white 
          rounded cursor-pointer text-sm'>Add Blog</button>
        </div>
      </form>
    </div>
  )
}

export default AddBlog