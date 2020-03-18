import React, { useState } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import UpdateItemForm from "../update_item_form"

export const LibraryQuery = gql`
  {
    items {
      id
      title
      imageUrl
      description
      user {
        id
        email
      }
    }
  }
`

const Library = () => {
  const [item, setItem] = useState(null)
  return (
    <Query query={LibraryQuery}>
      {({ data, loading }) => (
        <div>
          {loading
            ? 'loading...'
            : data.items.map(({ title, id, user, imageUrl, description }) => (
                <button
                  key={id}
                  onClick={() => (setItem({ title, imageUrl, id, description }))}
                >
                  <div>{title}</div>
                  <div>{description}</div>
                  {imageUrl && <img src={imageUrl} />}
                  {user ? (
                    <div>added by {user.email}</div>
                  ) : null}
                  <UpdateItemForm
                    id={id}
                    initialTitle={title}
                    initialDescription={description}
                    initialImageUrl={imageUrl}
                    onClose={() => setItem(null)}
                  />
                </button>
              ))}
        </div>
      )}
    </Query>
  )
}

export default Library
