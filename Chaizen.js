const axios = require("axios");
module.exports = {
	config: {
		name: 'ai',
		version: '2.1.0',
		author: 'Vincent Armwnion',
		countDown: 5,
		role: 0,
		shortDescription: 'AI BY VINCENT ARMENION',
		longDescription: {
			en: 'AI BY VINCENT ARMENION'
		},
		category: 'ai',
		guide: {
			en: '   {pn} <word>: ask with AI'
				+ '\n   Example:{pn} hi'
		}
	},

	langs: {
		en: {
			chatting: '℘ᥣׁׅ֪ꫀׁׅܻ݊ɑׁׅׅ꯱ꫀׁׅܻ݊ ᨰׁׅɑׁׅꪱׁׁׁׅׅׅtׁׅ... ',
			error: 'If this report spam please contact Vincent Armenion'
		}
	},

	onStart: async function ({ args, message, event, getLang }) {
		if (args[0]) {
			const yourMessage = args.join(" ");
			try {
				const responseMessage = await getMessage(yourMessage);
				return message.reply(`${responseMessage}`);
			}
			catch (err) {
				console.log(err)
				return message.reply(getLang("error"));
			}
		}
	},

	onChat: async ({ args, message, threadsData, event, isUserCallCommand, getLang }) => {
		if (!isUserCallCommand) {
			return;
		}
		if (args.length > 1) {
			try {
				const langCode = await threadsData.get(event.threadID, "settings.lang") || global.GoatBot.config.language;
				const responseMessage = await getMessage(args.join(" "), langCode);
				return message.reply(`${responseMessage}`);
			}
			catch (err) {
				return message.reply(getLang("error"));
			}
		}
	}
};

async function getMessage(yourMessage, langCode) {
	try {
		const res = await axios.get(`https://api.kenliejugarap.com/ai/?text=${yourMessage}`);
		if (!res.data.response) {
			throw new Error('Please contact Vincent Armenion if this error spams...');
		}
		return res.data.response;
	} catch (err) {
		console.error('Error while getting a message:', err);
		throw err;
	}
}
