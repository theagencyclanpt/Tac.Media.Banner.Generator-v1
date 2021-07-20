
function login(){
    const userNameInput = document.getElementById('UserUsername').value;
    const passwordInput = document.getElementById('UserPassword').value;

    fetch("/api/auth", {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        credentials: "include",
        body: JSON.stringify({ userName: userNameInput, password: passwordInput } ),
    })
        .then((response) => {
            console.log(response.signedCookies)
            if ( !(response.status >= 200 && response.status < 300) ) {
                var error = new Error(response.statusText)
                throw error
            }
        })
        .then((r) => {
            window.location.href = '/';
        });
}



