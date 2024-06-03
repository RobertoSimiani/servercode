

document.querySelector("#register").addEventListener("click", async () => {
  const data = {
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value,
    photo: document.querySelector("#photo").value,
    age: document.querySelector("#age").value,
  };
  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let response = await fetch("/api/sessions/register", opts);
  response = await response.json()
  console.log(response)

  if (response.statusCode === 201){
    location.replace("/login.html")
  }
 
});
