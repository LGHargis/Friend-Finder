let friendData = require("../data/friends");



module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friendData);
    });

    app.post("/api/friends", function (req, res) {

        let currentUser = req.body;

        let bestMatch = null;
        let currentLowestDifference = null;

        for (j = 0; j < friendData.length; j++) {
            let sum = 0;
            for (i = 0; i < friendData[j].scores.length; i++) {

                sum += Math.abs(friendData[j].scores[i] - currentUser[i])
            }

            if (!currentLowestDifference || currentLowestDifference > sum) {
                bestMatch = friendData[j];
                currentLowestDifference = sum;
            }

        }
        friendData.push(currentUser)

        res.json(bestMatch);
        ;
    });

};