class errorHandler {
	async error404(req, res, next) {
		try {
			res.statusCode = 404;
			throw new Error('چنین صفحه ای یافت نشد');
		} catch (err) {
			next(err);
		}
	}

	async handler(err, req, res, next) {
		try {
			const statusCode = err.status || 500;
			const message = err.message || '';
			const stack = err.stack || '';

			const layouts = {
				layout: 'errors/master',
				extractScripts: true,
				extractStyles: true,
			};

			if (config.debug)
				return res.render('errors/stack', { ...layouts, message, stack });

			return res.render(`errors/${statusCode}`, { ...layouts, message, stack });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new errorHandler();
