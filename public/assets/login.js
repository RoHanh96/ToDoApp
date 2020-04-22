$(document).ready(function(){

    $('#form').on('submit', function(e){
        e.preventDefault();

        alert("chun chun 2");
        $.ajax({
          type: 'POST',
          url: '/login',
          data: $('#form').serialize(),
          success: function(response){
            alert("chun chun 1");
            //do something with the data via front-end framework
            if (response.user && response.token) {
                document.getElementById("user").click();
                // console.log("chun chun");
                // response.redirect('/user/todo');
            }
          },

          beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + btoa(xhr.token));
          },
          error: function(){
            alert('error');
          }
        });
    });
});
