
//DOM ELEMENTS
const bookmarknameinput=document.getElementById("bookmark-name")
const bookmarkURLinput=document.getElementById("bookmark-URL")
const ADD_BOOKMARK_BUTTON=document.getElementById("add-bookmark-btn")
const bookmarklist=document.getElementById("LIST")


document.addEventListener("DOMContentLoaded",loadbookmarks)
ADD_BOOKMARK_BUTTON.addEventListener("click",function(){
    const name=bookmarknameinput.value.trim()
    const URL=bookmarkURLinput.value.trim()
    if(!URL || !name){
        alert("you must enter a name and a url !!")
        return
    }
    else{
        if(!URL.startsWith("https://") && !URL.startsWith("http://")){
            alert("url must start with (https://) OR (http://)")
            return
    }
    }
    addbookmark(name,URL)
    savebookmark(name,URL)
    bookmarkURLinput.value=""
    bookmarknameinput.value=""

})

function addbookmark(name,URL){
    const link=document.createElement("a")
    const li=document.createElement("li")

    link.textContent=name
    link.href=URL
    link.target="_blank"
    


    const removebtn=document.createElement("button")
    removebtn.addEventListener("click",function(){
        bookmarklist.removeChild(li)
        removebookmarkFROMSTORAGE(name,URL)
    })
    removebtn.classList.add("remove-btn")
    removebtn.textContent="Remove"
    li.appendChild(link)
    li.appendChild(removebtn)
    bookmarklist.appendChild(li)
}   
function getbookmarksfromstorage(){
    const bookmarks=localStorage.getItem("bookmarks")
    return bookmarks ? JSON.parse(bookmarks) : []
}
function savebookmark(name,URL){
    const bookmarks=getbookmarksfromstorage()
    bookmarks.push({name,URL})
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
}

function removebookmarkFROMSTORAGE(name,URL){
    let bookmarks=getbookmarksfromstorage()
    bookmarks=bookmarks.filter((bookmark) => bookmark.name !== name || bookmark.URL !== URL)
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
}

function loadbookmarks(){
    const bookmarks=getbookmarksfromstorage()
    bookmarks.forEach((bookmark) => 
        addbookmark(bookmark.name,bookmark.URL)
    );
}

