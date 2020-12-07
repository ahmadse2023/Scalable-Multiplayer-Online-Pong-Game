build:
	docker build -t gcr.io/pong-297810/pong-docker .
	rm -f pong-docker

push:
	docker push gcr.io/pong-297810/pong-docker