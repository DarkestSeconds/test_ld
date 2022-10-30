import yup from "yup";

class ProjectRequest {

	async validateCreateProject ( req, res, next ) {

        const bodyValidator = yup.object().shape({
            project_name: yup.string().required(),
            wanted_developers: yup.array().required(),
			project_type: yup.string().required(),
            skills_sought: yup.array().required(),
        });

        const headersValidator = yup.object().shape({
            session_id: yup.string().required(),
        });

		try {
			await headersValidator.validate(req.headers);
			await bodyValidator.validate(req.body);

		} catch (err) {
			return res.status(422).json({errors: err.errors});
		}

		await next();
	}

	async validateGetAllProjects ( req, res, next ) {

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

	async validateGetAllProjectsFiltered ( req, res, next ) {

        const paramsValidator = yup.object().shape({
            type: yup.string().required(),
			date_flow: yup.string().required(),
        });

        const headersValidator = yup.object().shape({
            session_id: yup.string().required(),
        });

		try {
			await headersValidator.validate(req.headers);
			await paramsValidator.validate(req.params);

		} catch (err) {
			return res.status(422).json({errors: err.errors});
		}

		await next();
	}
}

export default new ProjectRequest;