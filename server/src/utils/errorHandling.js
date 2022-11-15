export default function errorHandling(err, req, res, next) {
	const status = err.status || 500;
	console.error(err.message, err.stack);
	return res.status(status).json({ message: err.message });
}
