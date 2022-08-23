window.addEventListener('load', init);

function init() {
    var host = 'https://recommender4twitter.herokuapp.com'
//    var host = 'http://localhost:8000'
    fetch(host + '/api/timeline', {
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

            var user_tr = document.createElement("tr");

            var icon_td = document.createElement("td");
            icon_td.rowSpan = 2;
            var icon_img = document.createElement("img");
            icon_img.src = data.user.profile_image_url;
            icon_td.appendChild(icon_img);
            user_tr.appendChild(icon_td);

            var user_td = document.createElement("td");
            user_td.innerHTML = data.user.name + " @" + data.user.username;
            user_tr.appendChild(user_td);

            var datetime_td = document.createElement("td");
            datetime_td.innerHTML = data.tweet.created_at;
            user_tr.appendChild(datetime_td);

            timeline_table.appendChild(user_tr);

            var tweet_tr = document.createElement("tr");
            var tweet_td = document.createElement("td");
            tweet_td.innerHTML = data.tweet.text;
            tweet_td.colSpan = 3;
            tweet_tr.appendChild(tweet_td);

            timeline_table.appendChild(tweet_tr);
        }
    });
}
