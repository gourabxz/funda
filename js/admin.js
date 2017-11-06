$(document).ready(function () {
    $('.menu .item').tab();



    var config = {
        apiKey: "AIzaSyDJ1Swa6le7M-IMSj70Y5-swmfWutlPvJw",
        authDomain: "assignment-f12ad.firebaseapp.com",
        databaseURL: "https://assignment-f12ad.firebaseio.com",
        projectId: "assignment-f12ad",
        storageBucket: "assignment-f12ad.appspot.com",
        messagingSenderId: "766722529393"
    };
    firebase.initializeApp(config);

    var cseData = firebase.database().ref('student/cse');
    var bstData = firebase.database().ref('student/bst');
    var eeeData = firebase.database().ref('student/eee');

    cseData.on('value', function (snapshot) {
        $(".gridParent").html("");
        $(".gridCSE").html("");
        snapshot.forEach(function (childSnapshot) {
            var cData = childSnapshot.val();
            //console.log(cData.id);
            $(".gridCSE").append('' +
                '<div class="column itemSeg" cDataAttr ="' + cData.name + cData.id + '">' +
                '<div class="ui segment">' +
                '<h4>Name: ' + cData.name + '</h4>' +
                '<h5>ID: ' + cData.id + '</h5>' +
                '</div>' +
                '</div>');

        });
    });

    bstData.on('value', function (snapshot) {
        $(".gridParent").html("");
        snapshot.forEach(function (childSnapshot) {
            var cData = childSnapshot.val();
            //console.log(cData.id);
            $(".gridBST").append('' +
                '<div class="column itemSeg" cDataAttr ="' + cData.name + cData.id + '">' +
                '<div class="ui segment">' +
                '<h4>Name: ' + cData.name + '</h4>' +
                '<h5>ID: ' + cData.id + '</h5>' +
                '</div>' +
                '</div>');

        });
    });


    eeeData.on('value', function (snapshot) {
        $(".gridParent").html("");
        snapshot.forEach(function (childSnapshot) {
            var cData = childSnapshot.val();
            //console.log(cData.id);
            $(".gridEEE").append('' +
                '<div class="column itemSeg" cDataAttr ="' + cData.name + cData.id + '">' +
                '<div class="ui segment">' +
                '<h4>Name: ' + cData.name + '</h4>' +
                '<h5>ID: ' + cData.id + '</h5>' +
                '</div>' +
                '</div>');

        });
    });



    $('.gridCSE').on('click', '.itemSeg', function () {
        $('.scrollDiv').html('');
        var i = 0;
        var namex = $(this).attr('cDataAttr');
        var thisUID = namex.replace(/[^\w\s]/gi, '');
        var thisData = firebase.database().ref('student/cse/' + thisUID);
        thisData.on('value', function (snapshot) {
            thisFileLink = snapshot.val().filelink;
        });
        jQuery.each(thisFileLink, function (i, val) {
            i++;
            //            console.log(val);

            var linkx = filename(val);
            var linkx = linkx.replace(/%/g, "");

            var linkx = linkx.replace(/[0-9]/g, "");
            var dLink = linkx.slice(7);
            $('.scrollDiv').append('<div class="fileHolder">' +
                '<p>file ' + i + ': ' + dLink + '</p>' +
                '<button link="' + val + '" class="ui button downBtn">Download</button>' +
                '</div>');
        });

        $('.ui.modal')
            .modal('show');
    });





    $('.gridEEE').on('click', '.itemSeg', function () {
        $('.scrollDiv').html('');
        var i = 0;
        var namex = $(this).attr('cDataAttr');
        var thisUID = namex.replace(/[^\w\s]/gi, '');
        var thisData = firebase.database().ref('student/eee/' + thisUID);
        thisData.on('value', function (snapshot) {
            thisFileLink = snapshot.val().filelink;
        });
        jQuery.each(thisFileLink, function (i, val) {
            i++;
            //            console.log(val);
            var linkx = filename(val);
            var linkx = linkx.replace(/%/g, "");

            var linkx = linkx.replace(/[0-9]/g, "");
            var dLink = linkx.slice(7);
            $('.scrollDiv').append('<p class="fileHolder">' +
                'file ' + i + ': ' + dLink + " " +
                '<button link="' + val + '" class="ui button downBtn">Download</button>' +
                '</p>');
        });

        $('.ui.modal')
            .modal('show');
    });




    function filename(path) {
        path = path.substring(path.lastIndexOf("/") + 1);
        return (path.match(/[^.]+(\.[^?#]+)?/) || [])[0];
    }

    console.log(filename('http://example.com/index.html?lang=ja'));

    $('.gridBST').on('click', '.itemSeg', function () {
        $('.scrollDiv').html('');
        var i = 0;
        var namex = $(this).attr('cDataAttr');
        var thisUID = namex.replace(/[^\w\s]/gi, '');



        var thisData = firebase.database().ref('student/bst/' + thisUID);
        thisData.on('value', function (snapshot) {
            thisFileLink = snapshot.val().filelink;
        });
        jQuery.each(thisFileLink, function (i, val) {
            i++;
            //            console.log(val);
            var linkx = filename(val);
            var linkx = linkx.replace(/%/g, "");

            var linkx = linkx.replace(/[0-9]/g, "");
            var dLink = linkx.slice(7);
            $('.scrollDiv').append('<p class="fileHolder">' +
                'file ' + i + ': ' + dLink + " " +
                '<button link="' + val + '" class="ui button downBtn">Download</button>' +
                '</p>');
        });

        $('.ui.modal')
            .modal('show');
    });

    $('body').on('click', '.downBtn', function () {
        window.open($(this).attr('link'));
    });









    $('.scrollDiv').css('height', '500px');

    $('.ui.modal').modal();

    $('.close').click(function () {
        $('.ui.modal')
            .modal('hide');
    });
    //    var client = new XMLHttpRequest();
    //    client.open('GET', 'https://firebasestorage.googleapis.com/v0/b/assignment-f12ad.appspot.com/o/codes%2F0.30032217441325204leap%20year.c?alt=media&token=12f07c93-04fe-406a-85b1-5ceca29995d0');
    //    client.onreadystatechange = function () {
    //        alert(client.responseText);
    //    }
    //    client.send();

    // However to make it work, we are going to use the cors-anywhere free service to bypass this


});
