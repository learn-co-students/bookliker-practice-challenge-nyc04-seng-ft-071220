const list = document.querySelector("#list");
const showPanel = document.querySelector("#show-panel");
const url = "http://localhost:3000/books";
const myUser = {"id": 1, "username": "pouros"}

fetch(url)
  .then((res) => res.json())
    .then((books) => {
        books.forEach((book) => {
        let bookObj = document.createElement("li");
        bookObj.innerText = book.title;
        list.append(bookObj);

        bookObj.addEventListener("click", function () {
            const bookImg = document.createElement("img");
            bookImg.src = book.img_url;
            const bookSubtitle = document.createElement("h3");
            bookSubtitle.innerText = book.subtitle;
            const bookAuthor = document.createElement("h3");
            bookAuthor.innerText = book.author;
            const bookDescription = document.createElement("p");
            bookDescription.innerText = book.description;
            const nameList = document.createElement("ul");

            showPanel.innerText = "";

            showPanel.append(
            bookImg,
            bookSubtitle,
            bookAuthor,
            bookDescription,
            nameList
            );
            book.users.forEach((user) => {
            let nameObj = document.createElement("li");
            nameObj.innerText = user.username;
            nameList.append(nameObj);
            });

            const bookButton = document.createElement("button");
            bookButton.innerText = "LIKE"
            showPanel.append(bookButton);

            bookButton.addEventListener("click", () => {
            
// ######################## IMPORTANT ######################
            book.users.push(myUser)
// ############################################################
            fetch(`http://localhost:3000/books/${book.id}`,{
            method: "PATCH",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
// ###################### IMPORTANT #############################
                users: book.users
// ##############################################################
                })
            })
            .then(res => res.json())
            .then(updatedbook=>{
                book.users = updatedbook.users
                let newUserLi = document.createElement("li")
                newUserLi.innerText = myUser.username
                nameList.append(newUserLi)
            })
        })
        });
    });
});