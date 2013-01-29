var Cat = require('../models/cat')

var allowedColors=[
  'yellow',
  'green',
  'blue',
  'black',
  'brown',
  'mauve',
  'tan',
  'orange',
  'sky blue',
  'lemon',
  'vermillion'
  ];
var allowedNames=[
  'Sassy',
  'Misty',
  'Missy',
  'Princess',
  'Samatha',
  'Kitty',
  'Puss',
  'Ginger',
  'Fluffy',
  'Daisy',
  'Max',
  'Sam',
  'Tigger',
  'Tiger',
  'Sooty',
  'Smokey',
  'Lucky',
  'Patch',
  'Simba',
  'Smudge'
]


exports.newCat = function (req,res){
  var newCat= new Cat ();
  newCat.name=allowedNames[Math.floor(Math.random()*allowedNames.length)];
  newCat.colors=new Array(allowedColors[Math.floor(Math.random()*allowedColors.length)]);
  for (var i = 0; i < Math.floor(Math.random()*allowedColors.length); i++) {
    newColor=allowedColors[Math.floor(Math.random()*allowedColors.length)];
    if (newCat.colors.indexOf(newColor) < 0)
      newCat.colors=newCat.colors.concat(newColor);
  };
  newCat.age=Math.floor(25*Math.random());
  
  newCat.save(function (err) {
    if (err)
      return console.log("error saving cat ",err)
    //res.send('new cat created '+newCat.name+ ". Colors: "+newCat.colors+" Age: "+newCat.age)
    res.render('cats',{cats: [
    		newCat
    	],
    	title: 'New Cat: '+newCat.name});
  });
};

exports.showCats= function(req,res){
	Cat.find({}).sort('age').execFind(function(err,sortedCats){
		if (err)
			return console.log(err);
		if (sortedCats.length<1){
			res.render('cats',{cats: sortedCats,title: 'No cats in database. Add more cats!'});
			return
		}
		res.render('cats',{cats: sortedCats,
			title: 'Cats sorted by age'});
	});
};

exports.removeCat=function(req,res){
	var quer=Cat.find({}).sort('age');
	quer.execFind(function(err,cats){
		if (err)
			return console.log(err)
		if (cats.length<1){
			res.render('cats',{cats: cats,title: 'No cats in database. Add more cats!'});
			return
		}
		oldestCat=cats[cats.length-1]
		console.log(oldestCat);
		Cat.findOneAndRemove({_id: oldestCat.id},function (err,found){
			if (err)
				return console.log(err);
			Cat.find({}).sort('age').execFind(function(err,sortedCats){
				if (err)
					return console.log(err);
				res.render('cats',{cats: sortedCats,
					title: 'Removed oldest cat "'+ found.name+'"'});
			});
		});
	});

};

exports.filterColor=function(req,res){
	Cat.find({colors:req.params.color}).sort('age').execFind(function(err,found){
		if (found.length<1){
			res.render('cats',{cats: found,
				title: 'No cats found with '+ req.params.color+' color'});
		}
		else{
			res.render('cats',{cats: found,
				title: 'Cats with '+ req.params.color+' color'});
		}
	});
}

