///////////////////////////////////////////////////////////////
////                  Constant Variables                   ////
///////////////////////////////////////////////////////////////

//sign up form reference
const signupForm = document.querySelector('.register-form');
//Login In form reference
const loginForm = document.querySelector('.login-form');


///////////////////////////////////////////////////////////////
////          Sign up with Name, Email and Password        ////
///////////////////////////////////////////////////////////////

//add event listener
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const name = signupForm['signup-name'].value;
    const email = signupForm['signup-email'].value;
    const pswd = signupForm['signup-pswd'].value;
    console.log(email, pswd, name);

    //sign up user
    auth.createUserWithEmailAndPassword(email, pswd).then(cred => {
        // console.log(cred.user);
        $('.register-form, .login-form').css('display', 'none');
        let mainPage = document.getElementById('success');
        mainPage.style = "display:block";
        console.log("sign up successful");
        return cred.user.updateProfile({
            displayName: name
        })
    }).catch(err => {
        alert("Account already exists with this email.")
        signupForm.reset();
    })
});



///////////////////////////////////////////////////////////////
////              Login with Email and Password            ////
///////////////////////////////////////////////////////////////

//add event listener
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm['login-email'].value;
    const pswd = loginForm['login-pswd'].value;

    auth.signInWithEmailAndPassword(email, pswd).then(cred => {
        loginForm.reset();
        window.location = 'html/main_page.html';
    }).catch(err => {
        alert("Invalid user name or password. Please try again");
        loginForm.reset();
    });
});
