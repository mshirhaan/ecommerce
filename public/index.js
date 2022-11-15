function deleteProduct(id, csrf) {
  const url = 'http://localhost:3000/product/' + id;
  fetch(url, {
    method: 'DELETE',
    headers: {
      'csrf-token': csrf,
    },
  }).then((result) => {
    alert(result);
  });
}
