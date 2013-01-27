var fs = require("fs"),
csv = require('csv'),
_ = require("underscore"),
genreFrequency = {};
csv()
.from.stream(fs.createReadStream('watchlist.csv'))
.on('record', function(data,index){
  if(index){
  	var genres = data[11].split(","),
  	trimmedValues = _.map(genres, function(elem){
  		return elem.trim();
  	});
  	for(var i = 0, len = trimmedValues.length; i < len ; i++){
  		genreFrequency[trimmedValues[i]] = (genreFrequency[trimmedValues[i]]) ? ++genreFrequency[trimmedValues[i]] : 1;
  	}

  }
})
.on('end', function(count){
	console.log(_.map(genreFrequency, function(value, key){
		return {"name": key, "size": value};
	}));
  //console.log('Number of lines: '+count);
})
.on('error', function(error){
  console.log(error.message);
});