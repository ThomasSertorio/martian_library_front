import React, { useRef } from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const Me = gql`
  {
    me {
      id
      fullName
    }
  }
`

const SignMeIn = gql`
  mutation SignMeIn($email: String!) {
    signIn(email: $email) {
      token
      user {
        id
        fullName
      }
    }
  }
`

const UserInfo = () => {
  const input = useRef(null)
  return (
    <div>
      <Query query={Me}>
        {({ data, loading }) => {
          if (loading) return '...Loading'
          if (!data.me) {
            return (
              <Mutation
                mutation={SignMeIn}
                update={(cache, { data: { signIn } }) => {
                  cache.writeQuery({
                    query: Me,
                    data: { me: signIn.user }
                  })
                }}
              >
                {(signIn, { loading: authenticating }) =>
                  authenticating ? (
                    '...'
                  ) : (
                    <div>
                      <form
                        onSubmit={event => {
                          event.preventDefault()
                          signIn({
                            variables: { email: input.current.value }
                          }).then(({ data: { signIn: { token } } }) => {
                            if (token) {
                              localStorage.setItem('mlToken', token)
                            }
                          })
                        }}
                      >
                        <input
                          ref={input}
                          type='email'
                          placeholder='your email'
                        />
                        <input
                          type='submit'
                          value='Sign In'
                        />
                      </form>
                    </div>
                  )
                }
              </Mutation>
            )
          }

          const { fullName } = data.me
          return <div>😈 {fullName}</div>
        }}
      </Query>
    </div>
  )
}

export default UserInfo
