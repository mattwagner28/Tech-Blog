async function newFormHandler(event) {
  event.preventDefault();
  const dish_name = document.querySelector('#dish_name').value;
  const description = document.querySelector('#description').value;
  const guest_name = document.querySelector('#guest_name').value;
  // The following is a ternary operator. It checks to see if has_nuts is checked. If it is, it will return true, otherwise, it will return false.
  const has_nuts = document.querySelector('#has_nuts:checked') ? true : false;
  // Send fetch request to add a new dish
  const response = await fetch(`/api/dish`, {
    method: 'POST',
    body: JSON.stringify({
      dish_name,
      description,
      guest_name,
      has_nuts,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log('FRONT END RESPONSE', response)
  //if the dish is added, the 'all' template will be rerendered
  if (response.ok) {
    console.log('FRONT END hiiiiii')
    // document.location.replace('/');
  } else {
    alert('Failed to add dish');
  }
}

document.querySelector('.new-dish-form').addEventListener('submit', newFormHandler);
  