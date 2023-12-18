/**
 * @file index.js
 * @description Main entry point for Lytro2. 
 * @license MIT
 * @author Ares
 */

const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { DISCORD_TOKEN } = require('./config.json');

const DISCORD_CLIENT = new Client({
    intents: [GatewayIntentBits.Guilds]
})

DISCORD_CLIENT.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
            DISCORD_CLIENT.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        try {
            DISCORD_CLIENT.once(event.name, (...args) => event.execute(...args));
        } catch (theErr) {
            console.error(theErr);
        }
    } else {
        try {
            DISCORD_CLIENT.on(event.name, (...args) => event.execute(...args));
        } catch (theErr) {
            console.error(theErr);
        }
    }
}

//LOGINS USING BOT TOKEN FROM ENV 
DISCORD_CLIENT.login(DISCORD_TOKEN);

//SHUTS DOWN BOT AND NODE INSTANCES TO PREVENT MULTIPLE RUNNING INSTANCES
process.on('SIGINT', () => {
    console.log('Received SIGINT signal. Shutting down.');
    DISCORD_CLIENT.destroy(); // Close the Discord.js client connection
    process.exit(0); // Exit the Node.js process
});

process.on('SIGTERM', () => {
    console.log('Received SIGTERM signal. Shutting down.');
    DISCORD_CLIENT.destroy(); // Close the Discord.js client connection
    process.exit(0); // Exit the Node.js process
});

