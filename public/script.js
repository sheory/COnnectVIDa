const postBody = document.querySelector('#post-body');
const postBodyText = document.querySelector('#post-body-p');
const postBodyInput = document.querySelector('#post-body-input');
const newPostBodyText = postBodyText.cloneNode(true);
postBodyText.parentNode.removeChild(postBodyText);
newPostBodyText.innerHTML = postBodyInput.value;
postBody.appendChild(newPostBodyText);