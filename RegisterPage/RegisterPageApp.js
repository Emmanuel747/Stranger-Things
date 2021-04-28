const BASE_URL = "https://strangers-things.herokuapp.com/api/2101-LSU-RM-WEB-PT";
const registerPage = "/registerPage.html"
const loginPage = "../LoginPage/LoginPage.html"

const regexName = new RegExp("((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{6,20}$")
const regexPass = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[=#?!@$%^&*-]).{8,30}$")

const invalid_CSS = target => { $(`${target}`).css('background-color', '#fc7e7e')
                                              .css({"outline-color": "#e80c4d", "outline-width": "3px", "outline-style": "solid"}); }
const valid_CSS = target => { $(`${target}`).css('background-color', 'rgb(112 255 132)')
                                            .css({"outline-color": "rgb(27 232 70)", "outline-width": "0.5px", "outline-style": "solid"}); }
const invalid_MSG = target => {  $(`${target}`).html('')
                                               .css('color', 'red'); 
                                        $('h3').css('color','white'); }

$('#register_butn').prop('disabled', true).css('background-color', 'grey');

$('.RegexFormField').on('keyup', () => {
   const username = $('.username').val();
   const password = $('.password').val();
   const password2 = $('.re-password').val();
   if(!regexName.test(username)) {
      invalid_MSG(".loginErrorMsg")
      $(".loginErrorMsg").html('Username must contain: At least 6 characters & 1 Uppercase')
      invalid_CSS('.username')
      throw 'Username Invalid'
   } else valid_CSS('.username')

   if (!regexPass.test(password)) {
      invalid_MSG(".loginErrorMsg")
      $('.loginErrorMsg').text('Password must contain: At least 8 characters, 1 Special, 1 Number, 1 uppercase & 1 lowercase letter.')
      invalid_CSS('.password')
      throw 'Invalid Password'
    } else valid_CSS('.password')

   if(password !== password2) {
      invalid_MSG(".loginErrorMsg")
      invalid_CSS('.re-password')
      $(".loginErrorMsg").html('Passwords do not match. Please &nbsp&nbsp Re-Enter.')
      throw 'Passwords do not match'
   } else { valid_CSS('.re-password'); $(".loginErrorMsg").text(''); }
   
   if(password === password2 && regexPass.test(password)) {
      $(".loginErrorMsg").html(`✔ Everything looks good, We'll be expecting you...
                                 <span class='center'> 
                                    <ul>
                                       <li> I </li>
                                       <li> N </li>
                                       <li> S </li>
                                       <li> I </li>
                                       <li> D </li>
                                       <li> E </li>
                                    </ul>
                                 </span>
                              `)
                        .css('color', 'darkred')
                        .css('font-weight', 'bold')
      $('#register_butn').prop('disabled', false)
                         .css('background-color', '#FFC312')
                         .css('font-family', "'Della Respira', serif");
   } else { $(".loginErrorMsg").html('') 
                               .css('color', 'red');
            $('h3').css('color','white');
         }
});


$('#userInfo').on('submit', async function registerUsers (event) {
    event.preventDefault();
    const username = $('.username').val();
    const password = $('.password').val();
    try {
      const response = await fetch(`${BASE_URL}/users/register`, {
         method: "POST",
         headers: {'Content-Type':'application/json'},
         body: JSON.stringify({
            user: {username, password}
         })
      })
      const data = await response.json();
      console.log(data);
      localStorage.setItem("authToken", data.token)
      const userTOKEN = localStorage.getItem("authToken")
      $(".loginErrorMsg").empty()
      if (userTOKEN && data.error) {
         $(".loginErrorMsg").text(`${data.error.message}`)
      } else {
         localStorage.setItem("authToken", data.token);
         window.location.href = loginPage
      }
   } catch (error) {
      console.error(error);
   }
});