import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import ProcessItemForm from '../process_item_form'
import { LibraryQuery } from '../library'

const AddItemMutation = gql`
  mutation CreateItemMutation(
    $title: String!
    $description: String
    $imageUrl: String
  ) {
    addItem(title: $title, description: $description, imageUrl: $imageUrl) {
      item {
        id
        title
        description
        imageUrl
        user {
          id
          email
        }
      }
    }
  }
`

const AddItemForm = () => (
  <Mutation mutation={AddItemMutation}>
    {(addItem, { loading }) => (
      <ProcessItemForm
        buttonText='Add Item'
        loading={loading}
        onProcessItem={({ title, description, imageUrl }) =>
          addItem({
            variables: {
              title,
              description,
              imageUrl,
            },
            update: (cache, { data: { addItem } }) => {
              const item = addItem.item
              if (item) {
                const currentItems = cache.readQuery({ query: LibraryQuery })
                cache.writeQuery({
                  query: LibraryQuery,
                  data: {
                    items: [item].concat(currentItems.items)
                  },
                })
              }
            }
          })
        }
      />
    )}
  </Mutation>
)

export default AddItemForm
