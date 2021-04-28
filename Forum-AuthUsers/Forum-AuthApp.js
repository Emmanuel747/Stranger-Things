const BASE_URL = "https://strangers-things.herokuapp.com/api/2101-LSU-RM-WEB-PT";
const loginPage = "project_10/StrangerThings/signInPage.html"
const registerPage = "project_10/StrangerThings/registerPage.html"
const img_gifsArr = [
   "./images/000.jpg",
   "./images/001.jpg",
   "./images/002.png",
   "./images/003.jpg",
   "./images/004.jpg",
   "./images/005.jpg",
   "./images/006.jpg",
   "./images/007.jpg",
   "./images/008.jpg",
   "./images/009.jpg",
   "./images/010.jpg",
   "./images/011.jpg",
   "./images/012.jpg",
   "./images/013.jpg",
   "./images/014.jpg",
   "./images/015.jpg",
   "./images/016.jpg",
   "./images/017.jpg",
   "./images/018.jpg",
   "./images/019.jpg",
   "./images/020.jpg",
   "./images/021.jpg",
   "./images/022.jpg",
   "./images/023.jpg",
   "./images/024.jpg",
   "./images/025.gif",
   "./images/026.gif",
   "./images/027.gif",
   "./images/028.gif",
   "./images/028.jpg",
   "./images/029.gif",
   "./images/030.gif",
   "./images/031.gif",
   "./images/032.gif",
   "./images/033.gif",
   "./images/034.gif",
   "./images/035.gif",
   "./images/036.gif",
   "./images/037.gif",
   "./images/038.png",
   "./images/039.jpg",
   "./images/040.jpg",
   "./images/041.jpg",
   "./images/042.jpg",
   "./images/043.jpg",
   "./images/044.jpg",
   "./images/045.jpg",
   "./images/046.jpg",
   "./images/047.jpg",
   "./images/048.jpg",
   "./images/049.jpg",
   "./images/050.jpg",
   "./images/051.jpg",
   "./images/051.png",
   "./images/052.jpg",
   "./images/053.jpg",
   "./images/054.jpg",
   "./images/055.jpg",
   "./images/056.jpg",
   "./images/057.jpg",
   "./images/058.jpg",
   "./images/059.jpg",
   "./images/060.jpg",
]
const motivationalArr = [
   " I'm here to offset the zero index",
   " “The Best Way To Get Started Is To Quit Talking And Begin Doing.” – Walt Disney",
   " “The Pessimist Sees Difficulty In Every Opportunity. The Optimist Sees Opportunity In Every Difficulty.” – Winston Churchill",
   " “Don’t Let Yesterday Take Up Too Much Of Today.” – Will Rogers",
   " “You Learn More From Failure Than From Success. Don’t Let It Stop You. Failure Builds Character.” – Unknown",
   " “It’s Not Whether You Get Knocked Down, It’s Whether You Get Up.” – Inspirational Quote By Vince Lombardi",
   " “If You Are Working On Something That You Really Care About, You Don’t Have To Be Pushed. The Vision Pulls You.” – Steve Jobs",
   " “Failure Will Never Overtake Me If My Determination To Succeed Is Strong Enough.” – Og Mandino",
   " “You Are Never Too Old To Set Another Goal Or To Dream A New Dream.” – C.S. Lewis",
   " “We May Encounter Many Defeats But We Must Not Be Defeated.” – Maya Angelou",
   " “Knowing Is Not Enough; We Must Apply. Wishing Is Not Enough; We Must Do.” – Johann Wolfgang Von Goethe",
   " “Imagine Your Life Is Perfect In Every Respect; What Would It Look Like?” – Brian Tracy",
   " “We Generate Fears While We Sit. We Overcome Them By Action.” – Dr. Henry Link",
   " “Whether You Think You Can Or Think You Can’t, You’re Right.” – Quote By Henry Ford",
   " “Security Is Mostly A Superstition. Life Is Either A Daring Adventure Or Nothing.” – Life Quote By Helen Keller",
   " “The Man Who Has Confidence In Himself Gains The Confidence Of Others.” – Hasidic Proverb",
   " “The Only Limit To Our Realization Of Tomorrow Will Be Our Doubts Of Today.” – Motivational Quote By Franklin D. Roosevelt",
   " “Creativity Is Intelligence Having Fun.” – Albert Einstein",
   " “What You Lack In Talent Can Be Made Up With Desire, Hustle And Giving 110% All The Time.” – Don Zimmer",
   " “Do What You Can With All You Have, Wherever You Are.” – Theodore Roosevelt",
   ` "Don't tell everyone your plans, instead show them your results." `,
]

let loggedin_UserID;
let isUserLoggedin;
let userName;
let receiverIDnum;
let USDformatter = new Intl.NumberFormat('en-US', {
   style: 'currency', currency: 'USD', 
});

async function fetchPosts() {
   try {
     const response = await fetch(`${BASE_URL}/posts`);
     const { data } = await response.json();
     return data.posts;
   } catch (error) {
     	console.log(error);
   }
}

const createPost = async (POST) => {
   try {
      const userTOKEN = isUserLoggedin ? localStorage.getItem('authToken') : null;
      const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${userTOKEN}`
      },
      body: JSON.stringify({ post: POST })
   });
      const data = await response.json();
      $('#slideOut').removeClass('showSlideOut');
      await renderPosts()
      console.log(data)
   } catch (error) {
      console.log(error);
   }
}
const editPost = async (POST) => {
   let userTOKEN = localStorage.getItem("authToken")
   try {
      const response = await fetch(`${BASE_URL}/posts/${receiverIDnum}`, {
         method: "PATCH",
         headers: {
            'Content-Type': 'application/json',
				'Authorization': `Bearer ${userTOKEN}`
         },
         body: JSON.stringify({
            post: { POST }
         })
      })
      const data = await response.json()
      await renderPosts()
      await $('.sub_title').text('')
      $('#slideOut').removeClass('showSlideOut')
      $('#title').removeClass('msgMode')
      console.log(data)
   } catch (err) {
      console.log(err)
   }
}
const deletePOST = async (POST_ID) => {
	const userTOKEN = localStorage.getItem("authToken")
	try {
		const response = await fetch(`${BASE_URL}/posts/${POST_ID}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${userTOKEN}`
			}
		})
		const data = await response.json();
		renderPosts()
		console.log(data);
	} catch (error) {
		console.log(error)
	}
}

const msgOtherUser = async function (POST_ID) {
   const userTOKEN = localStorage.getItem("authToken")
	try {
		const response = await fetch(`${BASE_URL}/posts/${POST_ID}/messages`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${userTOKEN}`
			}, 
            body: JSON.stringify({
               message: {content: $('.DescriptionInput').val() }
            })
		})
		const data = await response.json();
		console.log(data);
      receiverIDnum = null;
      $('#slideOut').removeClass('showSlideOut');
	} catch (error) {
		console.log(error)
	}
}
const getUserInfo = async function() {
	const userTOKEN = localStorage.getItem("authToken")
	if(userTOKEN !== undefined) {
		try {
			const response = await fetch(`${BASE_URL}/users/me`, {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userTOKEN}`
            }
			});
			const {data} = await response.json();
         isUserLoggedin = true;
			$('#usernameNav').text(`${data.username}`)
			loggedin_UserID = await data._id;
         userName = await data.userame
         return data.messages
		} catch (error) {
          console.log(error) 
          isUserLoggedin = false
          $('#usernameNav').text('Welcome, Guest')
          $('.logout_btn').text('Sign-up / Sign-in')          
         }
	}
}

async function renderPosts() {
   const posts = await fetchPosts();
   await $('.postings-container')
   await $('#myHome').empty()
   await posts.forEach(post => {
      let userPost = createPostHTML(post);
      $(userPost).prependTo('#myHome');
   });
   return "Done Rendering"
}
async function renderMymsgs () {
   let myMsgsArr = await getUserInfo();
   $('#myMsgs').empty();
   myMsgsArr.forEach(msg => {
      let msgHTML = createMyMsgs(msg, loggedin_UserID)
      $(msgHTML).prependTo('#myMsgs');
   });
}

function formatDate(timestamp) {
   const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
   var targetDate =new Date(timestamp);
   let dd = (targetDate.getDate() < 10 ? "0" + targetDate.getDate() : targetDate.getDate());
   // let mm = (targetDate.getMonth() + 1) < 10 ? (targetDate.getMonth() + 1) : (targetDate.getMonth() + 1); // 0 is January
   let mm = MONTHS[(targetDate.getMonth())]
   let yyyy = targetDate.getFullYear();
   let hour; 
      if (targetDate.getHours() >= 13) {
         hour = targetDate.getHours() - 12 
      } else hour = targetDate.getHours();
   let minute;
      if (targetDate.getHours() > 12 ) {
         minute = targetDate.getMinutes() + "pm"
      } else {
        minute = targetDate.getMinutes() + "am"
      }
      if (minute < 10) { minute = "0" + minute }
   return mm +"&nbsp" + dd +",&nbsp" + yyyy + "&nbsp&nbsp&nbsp" + hour + ":" + minute;
}

const createPostHTML = (post) => {
   const { location, willDeliver,title, description, 
           price, author, createdAt, } = post;
   let ranNum = Math.floor(Math.random() * 60);

   return $(`
      <div class="comment card mt-4 text-justify">
         <div class="imgBx">
            <img src=${img_gifsArr[ranNum]} alt="Coming Soon">
         </div>
         <div class="card-body content">
            <div class="post-header"><h2 class="card-title">${title}</h2> <span>  ${formatDate(createdAt)}</span>
         </div>
         <p class="card-text">${description}</p>
            <footer class="post-footer text-md-left">  
               <span>
                  <p class="price-text">${USDformatter.format(price) === '$NaN' ? price : USDformatter.format(price)} 
                     <span class="" style="color:${willDeliver ? "lightgreen" : "red"}">${willDeliver ? " &nbsp Delivery is Available" : " &nbsp Pick-up Only"}</span>
                  </p>
                  <p>Location: ${location}</p>
                  <p>Seller: ${author.username} </p>
               </span>
               <span class="user_btns">
                  ${ loggedin_UserID === author._id ? `<input type="button" value="Delete" id="" class=" test delete_btn btn float-right"; style=" margin-top: 5px;">` : '' }
                  ${ loggedin_UserID === author._id ? `<input type="button" value="Edit" id="" class=" edit_btn btn float-right"; style=" margin-top: 5px;">` : '' }
                  ${ loggedin_UserID !== author._id ? `<input type="button" value="Message" id="reply_btn" class="Msg_btn btn float-right"; style=" margin-top: 5px;">` : '' }
               </span>
            </footer>
         </div>
      </div>
   `).data('post', post);
};

const createMyMsgs = (messages, myID) => {
   const {post, fromUser, content, } = messages 
   let ranNum = Math.floor(Math.random() * 60);
   console.log(ranNum)
   return $(`
      <div class="msg_Received comment card mt-4 text-justify">
         <div class="imgBx">
            <img src=${img_gifsArr[ranNum]} alt="Coming Soon">
         </div>
         <div class="card-body content">
            <div class="post-header"><h2 class="card-title"><i>Original Post</i>: <span style="color: rgb(230, 138, 0)">${post.title}</span></h2> <span>- ${fromUser.username}</span>
         </div>
         <p class="card-text" style="font-size: 1.3rem";>Message: &nbsp${content}<br><span>From:&nbsp ~${fromUser.username}</span></br></p>
         <footer class="post-footer text-md-left">  
            <p>Seller: ${fromUser.username} </p>
         </footer>         
      </div>
   `).data('post', post);
};

//Random Valid Zip Codes, May use google API to convert into respective City, State String Names
$('.lazy_btn').on('click', () => { 
   let min = Math.ceil(10001);
   let max = Math.floor(99800);

	$('#title').val('Auto-Generated Title #' + Math.floor(Math.random() * 500));
	$('.DescriptionInput').val(motivationalArr[ Math.floor(Math.random() * 20)]);
	$('#Price').val( Math.floor(Math.random() * 5000));
	$('#location').val(`Somewhere On, Earth  ${Math.floor(Math.random() * (max - min) + min)}`);
   document.getElementById(`rdo${Math.floor((Math.random() * 5) % 2) + 1}`).checked = true;

});

$('#sellerForm').on('submit', (event) => {
   event.preventDefault();
   const post = {
      title: $('#title').val(),
      description: $('#form-desc-box').val(),
      price: $('#Price').val(),
      location: $('#location').val(),
      willDeliver: document.querySelector('input[name=handeling]:checked').value, 
   };

   if (!isUserLoggedin) {
      $('.selfDes').text('Please Login to Post Listings & Send Messages ')
      $('.sell_btn').attr('disabled', true).text('')
                    .css('color', '#701f1fb3')
                    .css('text-decoration', 'line-through')
      console.log('I didnt break eman')
      return 'nothing to Nobody hahah'
      } else if ($('.sell_btn').hasClass('editMode')) {
         editPost(post)
      } else if ($('.sell_btn').hasClass('replyMode')) {
         msgOtherUser(receiverIDnum); 
      } else createPost(post); 
});

$('.msgOpen_btn').on('click', function () {
   $('#myMsgs').removeClass('HIDE')
   $('#myHome').addClass('HIDE')
   renderMymsgs()
});

$('.Home_btn').on('click', function () {
   $('#myMsgs').addClass('HIDE')
   $('#myHome').removeClass('HIDE')
});
$('.Home_btn').on('dblclick', function () {
   renderPosts()
});

$(".size a").click(function(){
   $('.size a.checked').not(this).removeClass('checked');
   $(this).toggleClass('checked');
});

$('#search_input').on('keyup', function() {
let value = $(this).val().toLowerCase();
   $('.card').filter( function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
   });
});

$('#slideOut').find('.slideOutTab').on('click', function() {
  $("#slideOut").toggleClass('showSlideOut');
  $('#slideOut').hasClass('showSlideOut') ? $('#pulloutTab').text('Close Tab') : $('#pulloutTab').text('Open Tab');
});

//Create, Edit, Delete Posts Event-Handlers
$(document).on( 'click', '.create_btn', function (e) {
   e.preventDefault()
   if (!$('#slideOut').hasClass('showSlideOut')) {
      $('#slideOut').toggleClass('showSlideOut');
   }
   $('#slideOut').hasClass('showSlideOut') ? $('#pulloutTab').text('Close Tab') : $('#pulloutTab').text('Open Tab');
   $('.sell_btn').remove('replyMode')
   $('.sell_btn').removeClass('msgMode')

   $('#title').val('')
   $('.sub_title').text('SELLER FORM')
   $('#title').attr('disabled', false).css('background-color', '#131419')
   $('.DescriptionInput').text('')
   $('#Price').attr('disabled', false).css('background-color', '#131419')
   $('#location').attr('disabled', false).css('background-color', '#131419')
   $('.rdo_container').show()
   

});
$(document).on('click', '.delete_btn', function () {
		console.log('Hey I worked')
      let animationEffect = $(this).closest('.comment.card')
		let selectedPost = $(this).closest('.comment.card').data('post')
      // $(animationEffect).slideUp()
      $(animationEffect).animate({
         marginTop: 5,
         marginBottom: 5,
         marginLeft: 50,
         width: '1%',
         height: '1%',
         opacity: '0.1',
      }, 430 , function () {
         deletePOST(selectedPost._id)
         receiverIDnum = null;
         $('.sell_btn').removeClass('replyMode')
         $('.sell_btn').removeClass('editMode')
      
      });
	}
);
$(document).on( 'click', '.edit_btn', function () {
   let clickedPostData = $(this).closest('.comment.card').data('post')
   console.log(clickedPostData)
   receiverIDnum = clickedPostData._id

   $('.sell_btn').addClass('editMode')
   if (!($('#slideOut').hasClass('showSlideOut'))) {
      $('#slideOut').toggleClass('showSlideOut'); 
   }
   $('#slideOut').hasClass('showSlideOut') ? $('#pulloutTab').text('Close Tab') : $('#pulloutTab').text('Open Tab');
   $('.sell_btn').removeClass('replyMode')
   $('#title').val(clickedPostData.title)
   $('#title').removeClass('msgMode')
   $('.sub_title').text(`Edit Post:\n${clickedPostData.title}`)

   $('#title').attr('disabled', false).css('background-color', '#131419')
   $('.DescriptionInput').text(clickedPostData.description)
   $('#Price').val(clickedPostData.price).attr('disabled', false).css('background-color', '#131419')
   $('#location').attr('disabled', false).css('background-color', '#131419').text(clickedPostData.location)
   // document.getElementById(`rdo${Math.floor((Math.random() * 5) % 2) + 1}`).checked = clickedPostData.willDeliver
   $('.rdo_container').show()

});

//My message button click event handler
$(document).on( 'click', '#reply_btn', function () {
   $('#title').removeClass('editMode')
   let clickedPostData = $(this).closest('.comment.card').data('post')
   receiverIDnum = clickedPostData._id
   if (!($('#slideOut').hasClass('showSlideOut'))) {
      $('#slideOut').toggleClass('showSlideOut'); 
   }
 
   $('.sell_btn').removeClass('editMode')

   $('.sell_btn').addClass('replyMode')
   $('#title').val(`To: ${clickedPostData.author.username}`)
   $('.sub_title').text('Direct Message Form')
   $('#slideOut').hasClass('showSlideOut') ? $('#pulloutTab').text('Close Tab') : $('#pulloutTab').text('Open Tab');
   $('#title').attr('disabled', true).addClass('msgMode')
   $('.DescriptionInput')
   $('#Price').attr('disabled', true).css('background-color', 'darkred').val('')
   $('#location').attr('disabled', true).css('background-color', 'darkred')
   $('.rdo_container').hide()

});


$('.Home_btn').on('click', (e) => { e.preventDefault() });
$('.msgOpen_btn ').on('click', (e) => { e.preventDefault() });

$('.search-form').on('submit', function (e) {
   e.preventDefault()
   $('.menu-item').removeClass('hide-item')
   $('.search-form').removeClass('active')
   $('.close').removeClass('active')
   $('#search').show()
});
$('.logout_btn').on('click', () => {
    localStorage.removeItem("authToken") = false
});
$('.guest_btn').on('click', () => {
   localStorage.remove("authToken")
});

const BOOTSTRAP = (async () => {
   await getUserInfo();
   await renderPosts();
})();