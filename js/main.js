window.addEventListener('load', init);

function init() {
    fetch('http://127.0.0.1:8000/', {
        mode: 'cors'
    }).then(response => {
        console.log(response);
        return response.json();
    })
    .then(timeline => {
        console.log(timeline);

        var timeline_table = document.getElementById("timeline_table");
        for (const data of timeline) {
            console.log(data);

            var row_tr = document.createElement("tr");

            var datetime_td = document.createElement("td");
            datetime_td.innerHTML = data.tweet.created_at;
            row_tr.appendChild(datetime_td);

            var user_td = document.createElement("td");
            user_td.innerHTML = data.user.name + "<br>@" + data.user.username;
            row_tr.appendChild(user_td);

            var tweet_td = document.createElement("td");
            tweet_td.innerHTML = data.tweet.text;
            row_tr.appendChild(tweet_td);

            timeline_table.appendChild(row_tr);
        }
    });
}
