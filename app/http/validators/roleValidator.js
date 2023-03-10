const validator = require('./validator');
const { check } = require('express-validator');
const Role = require('app/models/role');

class roleValidator extends validator {
	handle() {
		return [
			check('title')
				.isLength({ min: 3 })
				.withMessage('عنوان نمیتواند کمتر از 3 کاراکتر باشد')
				.custom(async (value, { req }) => {
					if (req.query._method === 'put') {
						let role = await Role.findById(req.params.id);
						if (role.title === value) return;
					}
					let role = await Role.findOne({ title: value });
					if (role) {
						throw new Error('چنین نقشی قبلا در سایت تعریف شده است');
					}
				}),
			check('label')
				.not()
				.isEmpty()
				.withMessage('فیلد برچسب نمیتواند خالی بماند'),
			check('permissions')
				.not()
				.isEmpty()
				.withMessage('فیلد لیست اجازه دسترسی نمیتواند خالی بماند'),
		];
	}
}

module.exports = new roleValidator();
