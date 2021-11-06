const { Client, Intents, Message, Options } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]}, {
  restTimeOffset: 0,
  restRequestTimeout: 0
});
const prefix = '.'
var rpsm, botchoice, userchoice, orginalid, session = false;
var emojis =[
  '🗿',
  '📄',
  '✂'
]

client.once('ready', ()=>{
  console.log('ready')
})

client.on('messageCreate', message => {
  if(message.author.bot || !message.content.startsWith(prefix)) return;
  var command = message.content.slice(prefix.length)
  if(command == 'jsrps'){
    setupmessage(message)
  }
});

client.on('messageReactionAdd', (reaction, user) =>{
  if(!session || user.bot || reaction.message.id != rpsm || user.id != orginalid) return
  let userchoice;
  //fogive me js ive done a bad
  if(reaction.emoji.name == '🗿'){
    userchoice = 0
  } else{
    if(reaction.emoji.name == '📄'){
      userchoice = 1
    } else {
      if(reaction.emoji.name == '✂️'){
        userchoice = 2
      }
    }
  }
  let rm = reaction.message
  if(userchoice != undefined) LogicAndStuff(rm, userchoice)
})

async function setupmessage(message){
  orginalid = message.author;
  session = true
  rpsm = await message.channel.send('Rock, Paper, Or Scissors?')
  rpsm.react('🗿');
  rpsm.react('📄');
  rpsm.react('✂️');
  if (rpsm.author.id != 905940814327341116) {
    return
  }
  botchoice = Math.floor(Math.random() * 3);
}


function LogicAndStuff(rm, userchoice){
  let message = rm;
  let win;
  if(botchoice == userchoice){
    win = 't';
  }
  //Bot win scenarios
  if(botchoice == 0 && userchoice == 2){
    // message.channel.send('Scissors wins dumbass')
    win = 'b'
  }
  if(botchoice == 1 && userchoice == 0){
    // message.channel.send('My piece of paper has destroyed your rock')
    win = 'b'
  }
  if(botchoice == 2 && userchoice == 1){
    // message.channel.send('Snip snip snip snip')
    win = 'b'
  }
  //User win scenarios

  if(userchoice == 0 && botchoice == 1){
    // message.channel.send('ive been bested')
    win = 'p'
  }
  if(userchoice == 1 && botchoice == 0){
    // message.channel.send('my rock has been disarmed by a piece of paper')
    win = 'p'
  }
  if(userchoice == 2 && botchoice == 1){
    // message.channel.send('insert scissor/paper loss comment here')
    win = 'p'
  }
  //Win result
  if(win == 't'){
    message.channel.send(intToEmoji(userchoice) + '🤝' + intToEmoji(botchoice))
    message.channel.send('"If a tie is like kissing your sister, losing is like kissing you grandmother with her teeth out." - George Brett')
  }
  if(win == 'p'){
    message.channel.send(intToEmoji(userchoice) + '🤜' + intToEmoji(botchoice))
    message.channel.send('You win!🎉');
  }
  if(win == 'b'){
    message.channel.send(intToEmoji(userchoice) + '🤛' + intToEmoji(botchoice))
    message.channel.send('You loose :regional_indicator_l:')
  }
  session = false;
}

function intToEmoji(i){
  return emojis[i].toString()
}
client.login('token')
