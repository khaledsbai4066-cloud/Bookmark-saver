

//DOM ELEMENTS
const form=document.getElementById("registration-FORM")
const username=document.getElementById("username")
const email=document.getElementById("email")
const password=document.getElementById("password")
const confirm_password=document.getElementById("confirm-password")



form.addEventListener("submit",function(e){
    e.preventDefault()
    const checkrequired=check([username,email,password,confirm_password])
    let isformvalid=checkrequired
    if(checkrequired){
        const isusenamevlid=checklength(username,4,15)
        const isemailvalid=checkemail(email)
        const ispasswordvalid=checklength(password,8,12)
        const ismatching=checkmatching(password,confirm_password)
        isformvalid=isusenamevlid && isemailvalid && ispasswordvalid && ismatching
    }
    if(isformvalid){
        alert("you have registered successfully")
        [username,email,password,confirm_password].forEach((input) => {
            let groupform=input.parentElement
            groupform.className="form-group"
        })
    }
    
})



function check(Array){
    let isvalid=true
    Array.forEach((input) =>{
        if(input.value.trim() === ""){
            showerror(input,`${formatfield(input)} is required`)
            isvalid= false
        }

        else{
            showsuccess(input)
            isvalid= true
        }
    })
    return isvalid
}

function formatfield(name){
    return name.id.charAt(0).toUpperCase()+name.id.slice(1)
}

function showerror(input,message){
    const formgroup=input.parentElement
    formgroup.className="form-group error"
    const small=formgroup.querySelector("small")
    small.innerText=message
    
}
    
function showsuccess(input){
      const formgroup=input.parentElement
    formgroup.className="form-group success"
}


function checklength(name,min,max){
    if(name.value.length < min){
        showerror(name,`${formatfield(name)} cant be less than ${min}`)
        return false
    }
    else if(name.value.length > max){
        showerror(name,`${formatfield(name)} cant more than ${max}`)
        return false
    }
    else{
        showsuccess(name)
        return true
    }
}
function checkemail(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailRegex.test(email.value.trim())){
        showsuccess(email)
        return true
    }
    else{
        showerror(email,"email is invalid")
        return false
    }
}
function checkmatching(P,C){
    if(P.value !== C.value){
        showerror(C,"passwords do not match!")
        return false
    }
    else{
        showsuccess(C)
        return true
    }
    
}




