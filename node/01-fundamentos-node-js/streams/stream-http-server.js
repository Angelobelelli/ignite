import http from "node:http";
import { Transform } from "node:stream";

class InverseNumber extends Transform {
	_transform(chunk, encoding, callback) {
		const transformed = Number(chunk.toString()) * -1;

		console.log(transformed);

		callback(null, Buffer.from(String(transformed)));
	}
}
const server = http.createServer(async(req, res) => {
	const buffers = []

	for await(const chunk of req) {
		buffers.push(chunk)
	}
	const body = Buffer.concat(buffers).toString()

	return res.end(body)
	
});

server.listen(3030);
