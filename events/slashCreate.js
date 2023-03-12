module.exports = {
	name: 'interactionCreate',
	async run(interaction) {
		// Deconstructed client from interaction object.
		const { client } = interaction;

		// Checks if the interaction is a command (to prevent weird bugs)

		if (!interaction.isChatInputCommand()) return;

		const command = client.slashCommands.get(interaction.commandName);

		// If the interaction is not a command in cache.

		if (!command) return;

		// A try to runs the interaction.

		try {
			await command.run(interaction);
		} catch (err) {
			console.error(err);
			await interaction.reply({
				content: 'There was an issue while executing that command!',
				ephemeral: true,
			});
		}
	},
};
