//$(document).ready(function(){
//         // Initialize Firebase
//  var config = {
//    apiKey: "AIzaSyDJ1Swa6le7M-IMSj70Y5-swmfWutlPvJw",
//    authDomain: "assignment-f12ad.firebaseapp.com",
//    databaseURL: "https://assignment-f12ad.firebaseio.com",
//    projectId: "assignment-f12ad",
//    storageBucket: "assignment-f12ad.appspot.com",
//    messagingSenderId: "766722529393"
//  };
//  firebase.initializeApp(config);
//    
//    var uploader = document.getElementById('uploader');
//    var fileButton = document.getElementById('fileButton');
//    
//    //listen for file selection
//    fileButton.addEventListener('change', function(e) {
//        console.log('ss');
//        var file = e.target.files[0];
//        var storageRef = firebase.storage().ref('codes/'+file.name);
//        
//        var task = storageRef.put(file);
//        
//        task.on('state_changed',
//        function progress(snapshot){
//            var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
//           uploader.value = percentage;
//            $('.pera').text(parseInt(percentage));
//        },
//        function error(err) {
//            
//        },
//        function complete() {
//            
//        });
//        
//        
//        
//        
//        
//        // Get the download URL
//storageRef.getDownloadURL().then(function(url) {
//  console.log(url);
//});
//        
//    });
//    
//});

$(document).ready(function () {
    var fileUrl = "null";

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDJ1Swa6le7M-IMSj70Y5-swmfWutlPvJw",
        authDomain: "assignment-f12ad.firebaseapp.com",
        databaseURL: "https://assignment-f12ad.firebaseio.com",
        projectId: "assignment-f12ad",
        storageBucket: "assignment-f12ad.appspot.com",
        messagingSenderId: "766722529393"
    };
    firebase.initializeApp(config);


    $('.ui.checkbox').checkbox();
    $('.progbar').progress();
    prog = 'CSE';
    $('.check').click(function () {
        prog = $(this).attr('prog');
    });


    var fileButton = document.getElementById('fileButton');

    //listen for file selection
    fileButton.addEventListener('change', function (e) {
        var random = Math.random();
        var file = e.target.files[0];

        var storageRef = firebase.storage().ref('codes/' + random + file.name);
        var task = storageRef.put(file);

        task.on('state_changed',
            function progress(snapshot) {
                $('.progbar').css("opacity", "1");
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                $('.progbar').progress({
                    percent: parseInt(percentage)
                });
                $('.proglabel').text(parseInt(percentage) + "%");
            },
            function error(err) {
                $('.proglabel').text("Error uploading file");
            },
            function complete() {
                $('.proglabel').text("Upload Completed");
                // Get the download URL
                storageRef.getDownloadURL().then(function (url) {
                    console.log(url);
                    fileUrl = url;
                    $('.submit').removeClass('disabled');
                });
            });



    });
    var database = firebase.database();
    $('.submit').click(function () {
        stdName = $('.name').val();
        stdID = $('.id').val();

        if (!$('.name').val().length == 0 && !$('.id').val().length == 0) {
            var Data = {
                name: $('.name').val(),
                id: $('.id').val(),
                program: prog,
                filelink: fileUrl
            }
            console.log(Data);

            firebase.database().ref('student/' + stdName + stdID + '/').set(Data);
            $('.hello_name').text(stdName + ",");
            $('.dimmer').dimmer('show');
            $('.submit').addClass('disabled');

            $('.fileButton').val('');
            $('.name').val('');
            $('.id').val('');
            $('.fileButton').val('');
        } else {
            alert("Please enter your name and id");
        }

    });

    $('.dimmer_content').click(function () {
        $('.dimmer').dimmer('hide');
    });
});
