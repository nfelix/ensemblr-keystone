var keystone = require('keystone');
var Types = keystone.Field.Types;

var Show = new keystone.List('Show', {
	singular: 'Show',
	plural: 'Shows',
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	defaultSort: '-lastUpdated',
});

Show.add({
	name: { type: String, required: true, unique: true },
	heroImage: { type: Types.CloudinaryImage },
	startDate: { type: Types.Date, index: true },
	//Base
	lastUpdated: { type: Types.Datetime, default: Date.now, hidden: true },
	createdAt: { type: Types.Datetime, default: Date.now, hidden: true },
});

Show.relationship({ path: 'productions', ref: 'Production', refPath: 'show' });

Show.schema.pre('save', function(next) {
	this.lastUpdated = new Date();
	next();
});

Show.track = true;
Show.defaultColumns = 'name, createdAt|20%, lastUpdated|20%';
Show.register();
