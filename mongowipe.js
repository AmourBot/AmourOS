// This command helps Amour developers to re-add servers to the MongoDB Database in the event it is wiped.
const DatabaseManager = require('../../utils/DatabaseManager.js');

module.exports = {
   name: 'ifmongogetswiped',
   category: 'admin',
   description: 'restores servers in the database.',
   enabled: true,
   hidefromhelp: true,
   run: async (client, message, args) => {


      if (message.author.id !== '679033218971861010') {
         return;
      }


      message.reply({content: `on it. `, allowedMentions: { repliedUser: true }})
      client.guilds.cache.forEach(async (guild) => {
        await DatabaseManager.addNewGuild(guild.id).catch(err => console.log(err))
        console.log(`Added ${guild.name} to my database.`)
    });

    message.reply({content: `done.`, allowedMentions: { repliedUser: true }})


   }
}
