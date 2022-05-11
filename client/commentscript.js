const password = "SSJC@2022"

document.getElementById('submit').addEventListener('click', (event) => {
    event.preventDefault();
    handleButtonSubmit();
  });

  async function handleButtonSubmit() {
    const user_pass = prompt("Enter your password to add a comment");
    if (user_pass == password) {
        const rec_id = document.getElementById('rec_id').value;
        const comment = document.getElementById('comment').value;
        const rec_comment = await fetch(`/api/tfrecs/${rec_id}/${comment}`)
        alert("Comment successfully added")
    } else {
        alert("Incorrect password. Please try again");
    }
}