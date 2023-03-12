module.exports = {
	name: 'interactionCreate',
	run: async (interaction) => {
		// Deconstructed client from interaction object.
		const { client } = interaction;

		// Checks if the interaction is a context interaction (to prevent weird bugs)

		if (!interaction.isContextMenuCommand()) return;

		/**********************************************************************/

		// Checks if the interaction target was a user

		if (interaction.isUserContextMenuCommand()) {
			const command = client.contextCommands.get(
				'USER ' + interaction.commandName
			);

			// A try to run the interaction.

			try {
				await command.run(interaction);
				return;
			} catch (err) {
				console.error(err);
				await interaction.reply({
					content:
						'There was an issue while executing that context command!',
					ephemeral: true,
				});
				return;
			}
		}
		// Checks if the interaction target was a user
		else if (interaction.isMessageContextMenuCommand()) {
			const command = client.contextCommands.get(
				'MESSAGE ' + interaction.commandName
			);

			// A try to run the interaction.

			try {
				await command.run(interaction);
				return;
			} catch (err) {
				console.error(err);
				await interaction.reply({
					content:
						'There was an issue while executing that context command!',
					ephemeral: true,
				});
				return;
			}
		}

		// Practically not possible, but we are still caching the bug.
		// Possible Fix is a restart!
		else {
			return console.log(
				'Something weird happening in context menu. Received a context menu of unknown type.'
			);
		}
	},
};
