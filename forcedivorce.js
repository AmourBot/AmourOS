// I'm mean sometimes, and this command reflects it.
const { MessageEmbed, Permissions } = require('discord.js');
const DatabaseManager = require('../../utils/DatabaseManager.js');
const moment = require('moment')

module.exports = {
   name: 'forcedivorce',
   description: 'Forcibly divorce a couple.',
   category: 'fun',
   hidefromhelp: true,
   enabled: true,
   run: async (bot, message, args) => {

      if (message.author.id !== '679033218971861010') {
         return;
      }

      const member = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(err => err) || await message.guild.members.fetch({ query: args[0], limit: 1 });
      let marriage = await DatabaseManager.getMarriage(member.id)
      await DatabaseManager.divorce(member.id)

      if (!marriage) return message.reply({content: 'They aren\'t married!', allowedMentions: { repliedUser: true }})

      message.channel.send('You force divorced <@' + member.id + '> and <@' + marriage.partner + '> after they were together for ' + moment(marriage.time).fromNow(true) + '! ):')
   }
}
