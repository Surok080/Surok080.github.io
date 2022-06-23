const object = {
	level1: {
		level2: {
			level3_1: {
				level4_1: {
					level_5end1key: 'level_end1',
					level_5end2key: 'level_end2',
					level_5end3key: 'level_end3',
				}
			}
		}
	}
}

getFiniteValue(object);

function getFiniteValue(obj) {
	let result = {};
	let propSpace = '|-';
	let level = 0;
	let count = 0;
	getProp(obj);

	function getProp(o) {
		for (var prop in o) {
			if (typeof (o[prop]) === 'object') {
				for (let i = 0; i <= level; i++) {
					propSpace += '-';
				}
				level++;
				let resulKey = propSpace + prop;
				result[resulKey] = '';
				propSpace = '|-';
				getProp(o[prop]);
			} else {
				for (let i = 0; i <= level; i++) {
					propSpace += '-';
				}
				let resulKey = propSpace + prop;
				result[resulKey] = o[prop];
				propSpace = '|-';
			}
		}
	}
	console.log(result);
}


