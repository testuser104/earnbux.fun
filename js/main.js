wow = new WOW().init();
if (userdata.loggedin) {
    updateBalance();
}

function updateBalance() {
    $.get("api/balance", function (data) {
        $(".balance").text(data.balance);
    });
}

$("#withdraw").click(function (e) {
    let amnt = $("#robuxamnt").val();
    $.post("api/withdraw", {amount: amnt}, function (data) {
        if (data.status == "joingroup") {
            window.open(data.grouplink, "_blank");
            Swal.fire({
                customClass: {
                    confirmButton: "btn btn-lg btn-indigo",
                    cancelButton: "btn btn-lg btn-danger",
                },
                buttonsStyling: false,
                icon: "warning",
                title: data.message,
                footer: `<a href="${data.grouplink}" target="_blank" class="font-weight-bold">Click to go to the group</a>`,
            });
        } else if (data.status) {
            Swal.fire({
                customClass: {
                    confirmButton: "btn btn-lg btn-indigo",
                    cancelButton: "btn btn-lg btn-danger",
                },
                buttonsStyling: false,
                icon: "success",
                title: data.message,
            });
            updateBalance();
        } else if (!data.status) {
            Swal.fire({
                customClass: {
                    confirmButton: "btn btn-lg btn-indigo",
                    cancelButton: "btn btn-lg btn-danger",
                },
                buttonsStyling: false,
                icon: "error",
                title: data.error,
            });
        }
    });
});

$("#withdraw-priv").click(function (e) {
    $('#withdraw-priv').attr('disabled','disabled');
    $.ajax({
        url: 'api/privateserver_withdraw',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            Swal.fire({
                icon: 'success',
                title: 'Nice!',
                text: data.msg,
            }).then(function() {
                setTimeout(function() {
                    $(this).removeAttr('disabled');
                },3000);
                location.reload();
            });
        },
        error: function (data){
            console.log(data);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.responseJSON.msg,
              }).then(function() {
                setTimeout(function() {
                    $(this).removeAttr('disabled');
                },3000);
                location.reload();
            });
        }
    });
});


$("#claimpromocode").on("click", function (e) {
    let promocode = $("#promocode").val();
    let captcha = $("[name=h-captcha-response]").val();
    $.post("api/claimpromocode.php", { code: promocode, captcha: captcha }, function (data) {
        if (data.status) {
            Swal.fire({
                customClass: {
                    confirmButton: "btn btn-lg btn-indigo",
                    cancelButton: "btn btn-lg btn-danger",
                },
                buttonsStyling: false,
                icon: "success",
                title: data.message,
            });
            updateBalance();
            hcaptcha.reset();
            $("#promocode").val("");
        } else {
            Swal.fire({
                customClass: {
                    confirmButton: "btn btn-lg btn-indigo",
                    cancelButton: "btn btn-lg btn-danger",
                },
                buttonsStyling: false,
                icon: "error",
                title: data.error,
            });
            hcaptcha.reset();
        }
    });
});

function loadwall(number) {
    var wallUrl = offerwalls[number];
    wallUrl = wallUrl.replace("USER_ID", userdata["user_name"]);
    $("#offerwall").attr("src", wallUrl);
}

function timerTick(endtime) {
    setInterval(function () {
        var t = endtime * 1000 - Math.round(new Date().getTime());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        if (seconds == 0 && minutes == 0 && hours == 0) {
            window.location.reload();
        }
        $("#hours").text(hours);
        $("#minutes").text(minutes);
        $("#seconds").text(seconds);
    }, 1000);
}

$("#entergiveaway").on("click", function (e) {
    let captcha = $("[name=h-captcha-response]").val();
    $.post("api/entergiveaway.php", {captcha: captcha}, function (data) {
        if (data.status) {
            Swal.fire({
                customClass: {
                    confirmButton: "btn btn-lg btn-indigo",
                    cancelButton: "btn btn-lg btn-danger",
                },
                buttonsStyling: false,
                icon: "success",
                title: data.message,
            });
            hcaptcha.reset();
            $("#entergiveaway").text("Entered!");
            $("#entergiveaway").attr("disabled", "");
        } else {
            Swal.fire({
                customClass: {
                    confirmButton: "btn btn-lg btn-indigo",
                    cancelButton: "btn btn-lg btn-danger",
                },
                buttonsStyling: false,
                icon: "error",
                title: data.error,
            });
            hcaptcha.reset();
        }
    });
}); 
