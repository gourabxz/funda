$(document).ready(function () {
    var fileUrl = [];

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
    department = 'CSE';
    $('.check').click(function () {
        department = $(this).attr('department');
    });


    var fileButton = document.getElementById('fileButton');


    //Listen for file selection
    fileButton.addEventListener('change', function (e) {
        //Get files
        for (var i = 0; i < e.target.files.length; i++) {
            var Cfile = e.target.files[i];

            upload(Cfile);


        }
        fileLength = e.target.files.length;
        uploaded = 0;

        console.log(fileLength);
    });
    var random = Math.random();
    //Handle waiting to upload each file using promise
    function upload(Cfile) {
        return new Promise(function (resolve, reject) {
            var storageRef = firebase.storage().ref('codes/' + random + Cfile.name);

            //Upload file
            var task = storageRef.put(Cfile);

            //Update progress bar
            task.on('state_changed',
                function progress(snapshot) {
                    $('.progbar').css("opacity", "1");
                    var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                    $('.progbar').progress({
                        percent: parseInt(percentage)
                    });
                    $('.proglabel').text(parseInt(percentage) + "%");
                },
                function error(err) {

                },
                function complete() {
                    // Get the download URL
                    var downloadURL = task.snapshot.downloadURL;
                    console.log(downloadURL);
                    fileUrl.push(downloadURL);
                    $('.proglabel').text("Upload Completed");
                    var progText = $('.proglabel').text();
                    uploaded = uploaded + 1;
                    if (uploaded == fileLength) {
                        $('.submit').removeClass('disabled');
                    } else {
                        $('.submit').addClass('disabled');
                    }

                }
            );

        });
    }



    var database = firebase.database();
    $('.submit').click(function () {
        stdName = $('.name').val();
        stdID = $('.id').val();

        if (!$('.name').val().length == 0 && !$('.id').val().length == 0) {
            var Data = {
                name: $('.name').val(),
                id: $('.id').val(),
                department: department,
                filelink: fileUrl
            }
            console.log(Data);


            if (department == "CSE") {
                firebase.database().ref('student/cse/' + stdName + stdID + '/').set(Data);
            } else if (department == "BST") {
                firebase.database().ref('student/bst/' + stdName + stdID + '/').set(Data);
            } else if (department == "EEE") {
                firebase.database().ref('student/eee/' + stdName + stdID + '/').set(Data);
            } else {
                firebase.database().ref('student/error/' + stdName + stdID + '/').set(Data);
            }
            $('.hello_name').text(stdName + ",");
            $('.dimmer').dimmer('show');
            $('.submit').addClass('disabled');

            $('#fileButton').val(null);
            $('.name').val('');
            $('.id').val('');

            fileUrl = [];
        } else {
            alert("Please enter your name and id");
        }

    });

    $('.dimmer_content').click(function () {
        $('.dimmer').dimmer('hide');
    });
});
