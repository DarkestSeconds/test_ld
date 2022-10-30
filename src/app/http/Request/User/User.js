import yup from "yup";

class UserRequest {

	async validateStorage ( req, res, next ) {

		const bodyValidator = yup.object().shape({
			full_name: yup.string().required(),
			username: yup.string().required(),
			email: yup.string().email().required(),
			password: yup.string().required(),
			genre: yup.string().required(),
			birth_date: yup.string().required(),
			resident_country: yup.string().required(), 
			developer_title: yup.string().required(),
			developer_skills: yup.array().required(),
		});

		try {
			await bodyValidator.validate(req.body);

		} catch (err) {
			return res.status(422).json({errors: err.errors});
		}

		await next();
	}

    async validateSeeProfile ( req, res, next ) {

		const headersValidator = yup.object().shape({
            session_id: yup.string().required(),
        });

		try {
			await headersValidator.validate(req.headers);

		} catch (err) {
			return res.status(422).json({errors: err.errors});
		}

		await next();
	}
}

export default new UserRequest;