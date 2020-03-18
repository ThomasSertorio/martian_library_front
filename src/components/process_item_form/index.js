import React, { useState } from 'react'

const ProcessItemForm = ({
  initialTitle = '',
  initialDescription = '',
  initialImageUrl = '',
  onProcessItem,
  buttonText,
  loading
}) => {
  const [title, setTitle] = useState(initialTitle)
  const [description, setDescription] = useState(initialDescription)
  const [imageUrl, setImageUrl] = useState(initialImageUrl)
  return (
    <div>
      <input
        type='text'
        placeholder='title'
        value={title}
        onChange={e => setTitle(e.currentTarget.value)}
      />
      <input
        type='text'
        placeholder='description'
        value={description}
        onChange={e => setDescription(e.currentTarget.value)}
      />

      <input
        type='text'
        placeholder='url'
        value={imageUrl}
        onChange={e => setImageUrl(e.currentTarget.value)}
      />
      {loading ? (
        '...Loading'
      ) : (
        <button
          onClick={() => onProcessItem({ title, description, imageUrl })}
        >
          {buttonText}
        </button>
      )}
    </div>
  )
}

export default ProcessItemForm
