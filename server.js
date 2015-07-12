var http = require("http");

var server = http.createServer(function(request, response) {
	if (request.method === "GET") {
  	if (request.url === "/info/1") {
  		http.get("http://192.168.1.25/api/newdeveloper/lights/1", function(r) {
  			var data = "";
  			r.on("data", function(d) {
  				data += d;
  			});
  
  			r.on("end", function() {
  				response.end(data);	
  			});
  		});
  	} else if (request.url === "/info/2") {
  		http.get("http://192.168.1.25/api/newdeveloper/lights/3", function(r) {
  			var data = "";
  			r.on("data", function(d) {
  				data += d;
  			});
  
  			r.on("end", function() {
  				response.end(data);	
  			});
  		});
  	} else {
			response.end("");
		}
	}

	var data = "";
	request.on("data", function(d) {
		data += d;
	});

	request.on("end", function() {
		if (data !== "") {
			console.log("Received data: " + data);
			response.writeHead(200);
			var jsonData;
			try {
				jsonData = JSON.parse(data);
			} catch (e) {
				response.end("");
				return;
			}
			if (!jsonData.hasOwnProperty("bears")) {
				response.end("");
				return;
			}
			if (request.method === "PUT") {
				var options = {
					host: "192.168.1.25",
					port: 80,
					method: "PUT"
				};
				if (request.url === "/set/1") {
					options.path = "/api/newdeveloper/lights/1/state";
				} else if (request.url == "/set/2") {
					options.path = "/api/newdeveloper/lights/3/state";
				}
				var req = http.request(options, function(res) {
				});
				req.write(data);
				req.end();
				response.end();
			}
		}
	});
});

server.listen(1337, function() {
	console.log("server running");
});
