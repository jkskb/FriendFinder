const friendsData = require('../data/friends.js');

module.exports = function(app) {
	//display data
	app.get('/api/friends', function(req, res) {
		return res.json(friendsData);
	});

	app.post('/api/friends', function(req, res) {
		console.log(req.body);

		let bestMatch = {
      		name: "",
      		img: "",
      		difference: 20
    	};

		let newFriend = req.body;
	    let newImg = req.body.newImg;
	    let newName = req.body.newName;
	    let newScores = req.body.scores;

	    console.log(newFriend);
	    console.log(newImg);
	    console.log(newName);
	    console.log(newScores);
	    var friendCalc = 0;

	    for (var i = 0; i < friendsData.length; i++) {
	    	console.log(friendsData[i].friendName);
	    	friendCalc = 0;

			for (var j = 0; j < friendsData[i].scores.length; j++) {

				friendCalc += Math.abs(friendsData[i].scores[j] - newScores[j]);
				console.log("friendCalc: " + friendCalc);

				if (friendCalc < bestMatch.difference) {
					bestMatch.name = friendsData[i].friendName;
					bestMatch.img = friendsData[i].friendImg;
					bestMatch.difference = friendCalc;
					console.log("bestMatch.name: " + bestMatch.name);
					console.log("bestMatch.difference: " + bestMatch.difference);

				}

			}

			console.log("bestMatch" + bestMatch.name);
			console.log("bestMatch.img: " + bestMatch.img);

		}

		friendsData.push(newFriend);
		res.json(bestMatch);


  	});
  	
}