export const update = (user) => {
  // debugger
  return $.ajax({
    url: `/api/users/${user.id}`,
    method: "PATCH",
    data: { user },
    error: (err) => console.log(err)
  })
}