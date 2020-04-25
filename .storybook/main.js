module.exports = {
	stories: ['../stories/*.stories.tsx'],
	webpackFinal: async config => {
		config.module.rules.push({
			test: /\.(ts|tsx)$/,
			use: [
				{
					loader: require.resolve('ts-loader'),
				},
				// Optional
				{
					loader: require.resolve('react-docgen-typescript-loader'),
				},
			],
		});

		config.module.rules.push({
			test: /\.scss$/,
			use: [
				{
					loader: require.resolve('style-loader'),
				},
				{
					loader: require.resolve('css-loader'),
				},
				{
					loader: require.resolve('sass-loader'),
				}
			],
		});
		config.resolve.extensions.push('.ts', '.tsx');
		config.resolve.extensions.push('.scss');
		return config;
	},
};