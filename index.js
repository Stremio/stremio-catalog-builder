
const lists = [
	{
		name: 'Top 100 Greatest Movies of All Time (The Ultimate List)',
		value: 'ls055592025'
	}, {
		name: '100+ Best Mind-Twisting Movies Ever Made',
		value: 'ls055521501'
	}, {
		name: '2019 Oscars: Trending Titles',
		value: 'ls041868378'
	}, {
		name: 'Sundance 2019: Trending Movies',
		value: 'ls041298577'
	}, {
		name: 'Golden Globes 2019: Trending Titles',
		value: 'ls047480385'
	}, {
		name: 'Emmys 2018: Trending Titles',
		value: 'ls028057361'
	}, {
		name: 'Comic-Con 2018: Title Trending List',
		value: 'ls063736893'
	}, {
		name: 'Cannes 2018: Features Lineup',
		value: 'ls023865445'
	}, {
		name: '2018 Oscar Nominees: Movies',
		value: 'ls021363441'
	}, {
		name: 'Golden Globe Nominees: Titles',
		value: 'ls027388243'
	}, {
		name: 'Best Picture Winners at the Golden Globes and Oscars',
		value: 'ls027925041'
	}, {
		name: 'The Best Documentary Films (Highly engrossing docos)',
		value: 'ls002769580'
	}, {
		name: 'Top 100 Movies of 2018',
		value: 'ls047677021'
	}, {
		name: 'Top 100 TV Shows of 2018',
		value: 'ls045252633'
	}, {
		name: 'Top 20 Highest-Rated Movies of 2018',
		value: 'ls045252260'
	}, {
		name: 'Top 20 Highest-Rated Shows of 2018',
		value: 'ls045252682'
	}, {
		name: 'Best TV Shows of 2018 So Far: Good Shows to Binge Watch',
		value: 'ls022397090'
	}, {
		name: 'Best Movies of 2018 So Far: Good Movies to Watch',
		value: 'ls022397054'
	}, {
		name: 'The Top 200 Movies as Rated by Women on IMDb in 2018',
		value: 'ls023589784'
	}, {
		name: 'The Top 200 TV Shows as Rated by Women on IMDb in 2018',
		value: 'ls023589152'
	}
]

const keywords = {

	'Theme': [
		'anime',
		'alternate-history',
		'neo-noir',
		'neorealism',
		'post-apocalypse',
		'deus-ex-machina',
		'cyberpunk',
		'dystopia',
		'epic',
		'experimental',
		'experimental-film',
		'spirituality',
		'high-school',
		'swashbuckler',
		'tech-noir',
		'medieval-times',
		'fairy-tale',
		'time-travel',
		'futuristic',
		'supernatural',
		'plot-twist',
		'based-on-book',
		'based-on-novel',
		'based-on-play',
		'based-on-comic',
		'based-on-comic-book'
	],

	'Heroes': [
		'hero',
		'superhero',
		'action-hero',
		'anti-hero',
		'dark-hero',
		'self-sacrifice'
	],

	'Thriller / Action': [
		'one-man-army',
		'organised-crime',
		'kidnapping',
		'murder',
		'business',
		'police-corruption',
		'police-detective',
		'conspiracy',
		'corruption',
		'criminal-mastermind',
		'psychopath',
		'robbery',
		'serial-killer',
		'espionage',
		'femme-fatale',
		'heist',
		'investigation',
		'double-cross',
		'cult'
	],

	'Type': [
		'black-comedy',
		'parody',
		'road-movie',
		'chick-flick',
		'cult-film'
	],

	'Character Type': [
		'robot',
		'zombie',
		'vampire',
		'knight',
		'kung-fu',
		'ninja'
	]

}

function simplify(str) {
	return str.replace(/[\W_]+/g,'').toLowerCase()
}

function toTitleCase(str) {
	return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function keywordName(str) {
	return toTitleCase(str.split('-').join(' '))
}

function showInterest(key) {
	$('.interesttags').each(function() {
		$(this).css('display','none')
	})
	$('.' + key).css('display','block')
	$('#interests').find('.littleboxes').scrollTop(0)
}

function init() {

	var firstKey

	for (var key in keywords) {
		var tag = simplify(key)
		$("#intselect").append(new Option(key, tag))
		if (!firstKey) firstKey = tag
	}

	var listBox = $('#lists').find('.littleboxes')

	lists.forEach(function(el) {
		listBox.append('<p><input class="opt" type="checkbox" name="lists" value="'+el.value+'"> '+el.name+'</p>')
	})

	var interestBox = $("#interests").find('.littleboxes')

	for (var key in keywords) {
		var tag = simplify(key)
		var keyHtml = ''
		keywords[key].forEach(function(el) {
			keyHtml += '<p><input class="opt" type="checkbox" name="interests" value="'+el+'"> '+keywordName(el)+'</p>'
		})
		interestBox.append('<div class="interesttags '+tag+'" style="display: none">'+keyHtml+'</div>')
	}

	showInterest(firstKey)

	$("#intselect").change(function() {
		showInterest($("#intselect").val())
	})

	$("p").click(function() {
		var option = $(this).find('input[type="checkbox"]')
		if (option.is(":hover"))
			return
		if (option.length) {
			if (option.is(':checked'))
				option.prop('checked', false)
			else
				option.prop('checked', true)
		}
	})

	$("#submitButton").click(function() {
		var form = $("#mainForm")
		var url = form.attr('action')

		$("#pageContent").html('<br/><br/><h2>Please wait while we build your catalogs</h2><br/><br/>')

		$.ajax({
			type: "GET",
			url: url,
			data: form.serialize(),
			success: function(data) {
				if (data) {
					if (data.collection)
						$("#pageContent").html('<br/><br/><h2>Copy this URL:</h2><div id="catalogUrl">https://stremio-catalog-builder.now.sh/'+data.collection+'/collection.json</div><br/><br/>And paste it in Stremio as shown in this image:<br/><br/><img id="addonImg" src="https://user-images.githubusercontent.com/1777923/43146711-65a33ccc-8f6a-11e8-978e-4c69640e63e3.png">')
					else if (data.err)
						$("#pageContent").html('<br/><br/><h2>'+data.err+'</h2><br/><br/>')
				} else
					$("#pageContent").html('<br/><br/><h2>An unknown error occurred, please try again later</h2><br/><br/>')
			},
			error: function() {
				$("#pageContent").html('<br/><br/><h2>Could not connect to server, please try again later</h2><br/><br/>')
			}
		})
	})

}
