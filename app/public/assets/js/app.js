$("#submit").on("click", function (event) {
    event.preventDefault();

    // Extract data
    var name = $("#name").val().trim();
    var photo_link = $("#photo_link").val().trim();

    var survey = [];

    for (let i = 1; i <= 10; i++) {
        survey.push($("#question_" + i).val())
    }

    // Validate required fields
    if (name == "" || photo_link == "") {
        $('#alert').modal('show');
    } else {
        for (i in survey) {
            if (survey[i] == "") {
                survey[i] = 0;
            }
        }
        console.log(name + "\n" + photo_link + "\n" + survey);
        var newData = {
            name: name,
            photo: photo_link,
            scores: survey
        }

        // POST request
        $.ajax("/api/findmatch", {
            type: "POST",
            data: newData
        }).then(
            function (match) {
                // Handle response

                // Reset fields to empty
                $("#name").val("");
                $("#photo_link").val("");
                for (let i = 1; i <= 10; i++) {
                    $("#question_" + i).val("")
                }

                // Dynamic elements to hold result
                let pm_body = $("<div>");
                let pm_name = $("<h3>");
                pm_name.text(match.name);
                let brk = ("<br>");
                let note = $("<i>");
                note.text("Saving your data, so people can find you.");
                let pm_picture = $("<img>");
                pm_picture.attr("src", match.photo);
                pm_picture.attr("width", "200");
                pm_picture.attr("height", "200");
                pm_body.append(pm_name, pm_picture, brk, note);
                $("#details").empty;
                $("#details").append(pm_body);

                // Show result
                $('#popup').modal('show');
            }
        );
    }
});