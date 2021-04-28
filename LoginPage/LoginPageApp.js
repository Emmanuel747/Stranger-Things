const BASE_URL = "https://strangers-things.herokuapp.com/api/2101-LSU-RM-WEB-PT";
const forumPage = "../Forum-AuthUsers/Forum-AuthPage.html";
const registerPage = "../RegisterPage/RegisterPage.html";

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

$('#userInfo').on('submit', async function registerUsers (event) {
    event.preventDefault();
    const user = {
        username: $('.username').val(),
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
   } catch (error) {
      console.error(error);
   } finally {
      onFetchEnd();
   }
});

function onFetchStart() {
   $('#loading').addClass('active');
}
function onFetchEnd() {
   $('#loading').removeClass('active');
}

$('.guest_btn').on('click', function () {
   localStorage.setItem("authToken", undefined)
   window.location.href = forumPage
});