$("#submit").on("click", function (event) {
    event.preventDefault();

    var name = $("#name").val().trim();
    var social_link = $("#social_link").val().trim();

    var survey = [];

    for (let i = 1; i <= 5; i++) {
        survey.push($("#question_" + i).val())
    }

    if (name == "" || social_link == "") {
        alert("Please fill in required fields!")
    } else {
        for (i in survey) {
            if (survey[i] == "") {
                survey[i] = 0;
            }
        }
        console.log(name + "\n" + social_link + "\n" + survey);
        var newData = {
            name: name,
            photo: social_link,
            scores: survey
        }

        $.ajax("/api/findmatch", {
            type: "POST",
            data: newData
        }).then(
            function (match) {
                console.log("Saving your data so people can find you");
                console.log("here is your match: " + match.name + " " + match.photo);
                $("#name").val("");
                $("#social_link").val("");
                for (let i = 1; i <= 5; i++) {
                    $("#question_" + i).val("")
                }
            }
        );
    }
});