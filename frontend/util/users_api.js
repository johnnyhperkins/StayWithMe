export const update = (userFormData) => {
  return $.ajax({
    url: `/api/users/${userFormData.get('id')}`,
    method: "PATCH",
    data: userFormData,
    contentType: false,
    processData: false,
  })
}

export const fetchUser = (id) => {
  return $.ajax({
    url: `/api/users/fetch`,
    method: "POST",
    data: {id},
  })
}