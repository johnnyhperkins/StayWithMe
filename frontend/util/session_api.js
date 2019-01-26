export const login = (user) => {
  return $.ajax({
    url: '/api/session',
    method: "POST",
    data: { user },
    error: (err) => console.log(err)
  })
}

export const logout = () => {
  return $.ajax({
    url: '/api/session',
    method: "DELETE",
    error: (err) => console.log(err)
  })
}

export const signup = (user) => {
  return $.ajax({
    url: '/api/users',
    method: "POST",
    data: { user },
    error: (err) => console.log(err)
  })
}

export const userExists = (params) => {
  return $.ajax({
    url: `/api/users/search`,
    method: "POST",
    data: { username: params.username, email: params.email },
    error: (err) => console.log(err)
  })
}
