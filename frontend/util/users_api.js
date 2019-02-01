export const update = (userFormData) => {
  return $.ajax({
    url: `/api/users/${userFormData.get('id')}`,
    method: "PATCH",
    data: userFormData,
    contentType: false,
    processData: false,
    error: (err) => console.log(err)
  })
}