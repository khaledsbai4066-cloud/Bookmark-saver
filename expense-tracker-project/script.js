


const balance=document.getElementById("balance")
const income=document.getElementById("income")
const expense=document.getElementById("expense")
const amount=document.getElementById("amount")
const description=document.getElementById("description")
const transaction_form=document.getElementById("transaction-form")
const transactions_list=document.getElementById("transactions-list")

let transactions=JSON.parse(localStorage.getItem("transactions")) || []


transaction_form.addEventListener("submit",addtransaction)

function addtransaction(e){
    e.preventDefault()
    const desc_el=description.value.trim().replace(/\s+/g," ")
    const amount_el=parseFloat(amount.value)
    transactions.push({
        id:Date.now(),
        desc_el,
        amount_el
    })
    localStorage.setItem("transactions",JSON.stringify(transactions))
    updatetransactionLIST()
    updatesummary()
    transaction_form.reset()
}
function  updatetransactionLIST(){
    transactions_list.innerHTML=""
    const sortedtransactionList=[...transactions].reverse()
    sortedtransactionList.forEach((transaction) => {
        const li=createtransactionELEMENT(transaction)
        transactions_list.appendChild(li)
        
    })   
    
    updatesummary()
}
function createtransactionELEMENT(transaction){
     const li_element=document.createElement("li")
     li_element.classList.add("transactions")
    li_element.classList.add(transaction.amount_el>0 ? "income" : "expense")
    li_element.innerHTML=`<span>${transaction.desc_el}</span>
                    <span>${formattcurrency(transaction.amount_el)}</span><button onclick="removetransaction(${transaction.id})" class="delete-btn">X</button>`
    return li_element
}
function  updatesummary(){
    
    const balancee=transactions.reduce((acc,transaction) => acc+transaction.amount_el,0)
    balance.textContent=formattcurrency(balancee)
    const income_total=transactions.filter((transaction) =>transaction.amount_el>0).
    reduce((acc,transaction) => acc+transaction.amount_el,0)
    income.textContent=formattcurrency(income_total)


    const expenses_total=transactions.filter((transaction) =>transaction.amount_el<0).
    reduce((acc,transaction) => acc+transaction.amount_el,0)
    expense.textContent=formattcurrency(expenses_total)
    console.log(transactions.length)
    
}


function formattcurrency(number){
    return new Intl.NumberFormat("en-US",{
        style:"currency",
        currency:"USD"
    }).format(number)
}

function removetransaction(ID){
    transactions=transactions.filter((transaction) => transaction.id !== ID)
     localStorage.setItem("transactions",JSON.stringify(transactions))
     console.log(ID)
     updatetransactionLIST()
   
}




 







