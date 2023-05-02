// const submitForm = document.getElementsByClassName("new-post-form");

async function newPostHandler(event) {
  event.preventDefault();
  const title = document.querySelector('#post-title').value;
  const content = document.querySelector('#post-content').value;
  const author = document.querySelector('#post-author').value;
  const date = document.querySelector('#post-date').value;


  const response = await fetch('/', {
    method: 'POST',
    body: JSON.stringify({
      title,
      content,
      author,
      date,
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
    console.log('whoops')
    alert('Failed to add post');
  }

  location.reload();
};

document.querySelector('.new-post-form').addEventListener('submit', newPostHandler);

