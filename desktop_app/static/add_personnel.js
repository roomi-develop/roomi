$(document).ready(function(){
    $('a#add').bind('click', function() {
        var name = $('#name').val();
        var accessLevel = $('#access-level').val();

        if (validate(name, accessLevel)) {
            var timeleft = 10;
            var timer = setInterval(function(){
                document.getElementById("progressBar").value = 11 - timeleft;
                timeleft -= 1;
                if(timeleft <= 0) { clearInterval(timer) }
            }, 1000);

            $.getJSON($SCRIPT_ROOT + '/poll_for_card', {}, function(data) {
                if (data.gotCard === 'true') {
                    addToDB(name, accessLevel, data.cardId);
                } else if (data.gotCard == 'unique') {
                    alert("That card has already been assigned");
                    window.location.replace($SCRIPT_ROOT + '/');
                } else { 
                    alert("Didn't see a card");
                    window.location.replace($SCRIPT_ROOT + '/');
                }
            })
        }
    });
});

function validate(name, accessLevel) {
    var nameRegex = /^[a-zA-Z0-9]+$/;
    var accessLevelRegex = /[0-5]/;

    if (name.length === 0 || name.length > 16 || !nameRegex.test(name)) {
        alert("Name Wrong: 1-16 Letters");
        return false;
    } else if (!accessLevelRegex.test(accessLevel)) {
        alert("Access Level Wrong: Number Between 0 and 5");
        return false;
    } else {
        return true;
    }
}

function addToDB(name, accessLevel, cardId) {
    
    $.get($SCRIPT_ROOT + '/add_personnel_to_db', {
        name: name,
        accessLevel: accessLevel,
        cardId: cardId
    },function() {
            alert(name + " has been added!");
            window.location.replace($SCRIPT_ROOT + '/');
        }   
    );
}