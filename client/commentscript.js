const password = "SSJC@2022"

document.getElementById('submit').addEventListener('click', (event) => {
    event.preventDefault();
    handleButtonSubmit();
  });

  async function handleButtonSubmit() {
    const user_pass = prompt("Enter your password to add a comment");
    if (user_pass == password) {
        const table_select = document.querySelector('input[name="table"]:checked').value;
        const rec_id = document.getElementById('rec_id').value;
        const comment = document.getElementById('comment').value;
        if (table_select == "RPS") {
            const rec_comment = await fetch(`/api/tfrecs/${rec_id}/${comment}`)   
        } else if (table_select == "MPAA") {
            const mpaa_comment = await fetch(`/api/mpaa/${rec_id}/${comment}`)
        } else if (table_select == "Audit"){
            const audit_comment = await fetch(`/api/audit/${rec_id}/${comment}`)
        }
        alert("Comment successfully added")
    } else {
        alert("Incorrect password. Please try again");
    }
}