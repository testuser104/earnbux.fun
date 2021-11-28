$(".LoginBTN").click(function(e) {
    e.preventDefault();
    Login();
})

 function Login() {
    Swal.fire({
        customClass: {
            confirmButton: 'btn btn-success btn-lg',
            cancelButton: 'btn btn-danger btn-lg'
        },
        buttonsStyling: false,
        title: 'Enter your ROBLOX username.',
        input: 'text',
        inputPlaceholder: 'ROBLOX Username',
        showCancelButton: true,
        confirmButtonText: 'Continue',
        cancelButtonText: 'Cancel',
        inputValidator: (value) => {
            if (!value) {
                return 'Please enter your ROBLOX username!'
            }
        }
    }).then((result) => {
        if(result.dismiss){
            return;
        }
        let username = result.value;
        Swal.fire({
            customClass: {
                confirmButton: 'btn btn-success btn-lg',
                cancelButton: 'btn btn-danger btn-lg'
            },
            buttonsStyling: false,
            title: 'Is this you?',
            text: 'Please confirm this is you!',
            imageUrl: 'https://assetgame.roblox.com/Thumbs/Avatar.ashx?username=' + result.value + '&width=250&height=250',
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Userimage',
            showLoaderOnConfirm: true,
            showCancelButton: true,
            confirmButtonText: 'This is me!',
            cancelButtonText: 'This is not me',
        }).then((result) => {
            if(result.dismiss){
                return;
            }
            if (result.value) {
                $.ajax({
                    method: "POST",
                    url: "https://rewardrobux.com/api/login",
                    data: {
                        username: username
                    }
                }).done(function(data){
                    if(data.status){
                        Swal.fire({
                            customClass: {
                                confirmButton: 'btn btn-success btn-lg',
                                cancelButton: 'btn btn-danger btn-lg'
                            },
                            buttonsStyling: false,
                            icon: 'success',
                            title: 'Woo!',
                            text: data.message
                        })
                        window.location.replace("https://rewardrobux.com/earn");
                    } else {
                        Swal.fire({
                            customClass: {
                                confirmButton: 'btn btn-success btn-lg',
                                cancelButton: 'btn btn-danger btn-lg'
                            },
                            buttonsStyling: false,
                            icon: 'error',
                            title: 'Aww!',
                            text: data.error
                        })
                    }
                });
            }
        })
    })
}
