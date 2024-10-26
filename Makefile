build:
	docker-compose build

up:
	docker-compose up --build --remove-orphans

down:
	docker-compose down

logs:
	docker-compose logs -f

test:
	docker-compose exec app npm run test

sh:
	docker-compose exec app sh