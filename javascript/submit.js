function submitFile() {
    var files = document.getElementById("fileUploadInput").files;

    if (files.length > 0){
        // create a FormData object which will be sent as the data payload in the
        // AJAX request
        var formData = new FormData();

        // loop through all the selected files and add them to the formData object
        for (var i = 0; i < files.length; i++) {
            var file = files[i];

            // add the files to formData object for the data payload
            formData.append('uploads[]', file, file.name);
        }

        $.ajax({
            url: '/fileupload',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(data){
                function appendLink(sId, sValue){
                    var sInnerText = document.getElementById(sId).href;
                    document.getElementById(sId).href = sInnerText + "&file=" + sValue;
                }

                console.log('upload successful!\n' + data);
                alert("successfull upload: " + data);
                var input = document.getElementById("fileUploadInput").files[0].name;
                appendLink("bar", input);
                appendLink("line", input);
                appendLink("pie", input);
                appendLink("doughnut", input);
                $('#container').show();
            }
        });

    }
}