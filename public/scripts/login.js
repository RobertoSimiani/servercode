document.querySelector("#login").addEventListener("click", async () => {
  const data = {
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value,
  };
  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let response = await fetch("/api/sessions/login", opts);
  response = await response.json()
<<<<<<< HEAD

  if (response.statusCode === 200){
    console.log(response)
    localStorage.setItem("token",response.token)
    location.replace("/")

=======
  console.log(response)

  if (response.statusCode === 200){
    location.replace("/")
>>>>>>> 4ff8cccf5cca496878aee160e2b6fef45978a786
  }
});
