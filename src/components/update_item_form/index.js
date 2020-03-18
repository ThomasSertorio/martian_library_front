import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import ProcessItemForm from '../process_item_form'
import { LibraryQuery } from '../library'

const UpdateItemMutation = gql`
  mutation UpdateItemMutation(
    $id: ID!
    $title: String!
    $description: String
    $imageUrl: String
  ) {
    updateItem(id: $id, title: $title, description: $description, imageUrl: $imageUrl) {
      item {
        id
        title
        description
        imageUrl
      }
    }
  }
`

const UpdateItemForm = ({
  id,
  initialTitle,
  initialDescription,
  initialImageUrl,
  onClose
}) => (
  <div>
    <div>
      <Mutation mutation={UpdateItemMutation}>
        {(updateItem, { loading }) => (
          <ProcessItemForm
            initialImageUrl={initialImageUrl}
            initialTitle={initialTitle}
            initialDescription={initialDescription}
            buttonText='Update Item'
            loading={loading}
            onProcessItem={({ title, description, imageUrl }) => {
              updateItem({
                variables: {
                  id,
                  title,
                  description,
                  imageUrl
                },
                optimisticResponse: {
                  __typename: 'Mutation',
                  updateItem: {
                    __typename: 'UpdateItemMutationPayload',
                    item: {
                      id,
                      __typename: 'Item',
                      title,
                      description,
                      imageUrl
                    }
                  }
                }
              })
              onClose()
            }}
          />
        )}
      </Mutation>
      <button onClick={onClose}>
        Close
      </button>
    </div>
  </div>
)

export default UpdateItemForm
