const LoginPage = "../LoginPage/LoginPage.html";
const RegisterPage = "./RegisterPage/RegisterPage.html";
const forumPage = "./Forum-AuthUsers/Forum-AuthPage.html"
const BASE_URL = "https://strangers-things.herokuapp.com/api/2101-LSU-RM-WEB-PT";

const rememberMeFunc = () => {
   let item = localStorage.getItem('rememberMeBox')
   if(item) {
      let checkBoxStorage = JSON.parse(item)
      if(checkBoxStorage.isChecked) {
         $('.username').val(`${checkBoxStorage.username}`)
         document.getElementById("remember-box").checked = true;
      }
   }
}; rememberMeFunc();

$('#remember-box').on('click', () => {
   const checkBox = {
      isChecked: $('#remember-box').is(":checked"),
      username: $('.username').val()
   };
   if(checkBox.isChecked && $('#remember-box').is(":checked")) {
      localStorage.setItem('rememberMeBox', JSON.stringify(checkBox));
   } else localStorage.removeItem('rememberMeBox');
});

$('#userInfo').on('submit', async function registerUsers (event) {
   console.log("i'm hyperJS")
   event.preventDefault();
   const user = {
       username:  $('.username').val(),
       password: $('.password').val()
   }
   onFetchStart();
   try {
     const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({user})
     })
     const data = await response.json();
     console.log(data);
     $(".loginErrorMsg").empty()
     if (data.error) {
        $(".loginNetworkMsg").text(`${data.error.message}`)
     } else {
        $(".loginNetworkMsg").text(`${data.data.message}`)
                             .css("color", "lightgreen")
        
        window.location.href = forumPage
        console.log(data.data.token)
        localStorage.setItem("authToken", data.data.token);
     }
     console.log(window.location.href)
     
  } catch (error) {
     console.error(error);
  } finally {
     onFetchEnd();
  }

   function onFetchStart() {
      $('#loading').addClass('active');
   }
   function onFetchEnd() {
      $('#loading').removeClass('active');
   }
});

(async () => {
   if(localStorage.getItem('authToken')){
      try {
         const response = await fetch(`${BASE_URL}/test/me`, {
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
         })
         const data = await response.json();
         console.log(data)
         if(data.success) { 
            window.location.href = forumPage 
         }
      } catch (error) {
         console.log(error)
      }
   }
})();