const LOGIN = (function() {
    const _addLoader = () => {
        let parent = document.getElementById('appender');
        let div = document.createElement('div');
        div.className = 'wave';
        parent.appendChild(div);
    };

    const _facebookListener = button => {
        button.addEventListener('click', function() {
            let removeItems = document.querySelectorAll('.removeItem');
            for (let i = 0; i < removeItems.length; i++) {
                removeItems[i].parentNode.removeChild(removeItems[i]);
            }
            _addLoader();
            FB.login(
                function(response) {
                    console.log(response);
                    if (response.status === 'connected') {
                        _getSimpleData(
                            response.authResponse.userID,
                            response.authResponse.accessToken
                        );
                    }
                },
                {
                    scope:
                        'public_profile,email,user_status,user_birthday,user_gender,user_location'
                }
            );
        });
    };

    const _getSimpleData = (id, token) => {
        FB.api(
            `/${id}?fields=id,birthday,email,name,gender,location,picture.type(large)&access_token=${token}`,
            function(res) {
                console.log(res);
                let xhr = new XMLHttpRequest();
                xhr.open('POST', `/users/facebook/save`);
                xhr.setRequestHeader(
                    'Content-Type',
                    'application/x-www-form-urlencoded'
                );
                xhr.onload = function(response) {
                    if (xhr.status === 200) {
                        let respuesta = JSON.parse(xhr.responseText);
                        let wave = document.querySelector('.wave');
                        wave.classList.add('remove');
                        setTimeout(function() {
                            window.location.href = respuesta.url;
                        }, 500);
                    } else {
                        let respuesta = JSON.parse(xhr.responseText);
                        window.location.href = '/';
                    }
                };
                console.log('se envía ajax');
                xhr.send(
                    encodeURI(
                        `avatar=${res.picture.data.url}&birthday=${
                            res.birthday
                        }&email=${res.email}&gender=${res.gender}&id=${
                            res.id
                        }&location=${res.location.name}&name=${
                            res.name
                        }&token=${token}`
                    )
                );
            }
        );
    };

    return {
        isLogged: function() {
            alert('sesión iniciada');
        },
        loginListener: function() {
            let button = document.getElementById('login');
            button.disabled = false;
            _facebookListener(button);
        }
    };
})();
