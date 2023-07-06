const openai = require("./config/openai.js");
const readLineSync = require("readline-sync");
const colours = require("colors");

async function main(){
    console.log(colours.bold.green('Welcome to the Chatbot!'));
    console.log(colours.bold.green('Please ask me a question c:'));

    while(true){
        const userInput = readLineSync.question(colours.yellow('You: '))
        
        try{
            //chatgbt API and user input processing

        const chatCompletion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            {role:'user', content: userInput},
           ],
        });

        const botAwsner = chatCompletion.data.choices[0].message.content;

        if(userInput.toLocaleLowerCase() === 'exit'){
            console.log(colours.green('Bot: ' + botAwsner));
            return;
        }

        console.log(colours.green('Bot: ' ) + botAwsner);
        }catch (error){
            console.error(colours.red(error));
        }
    }
}

main();



//old version of the app that works in the console. 