up:
	docker compose up -d

down:
	docker compose down

logs:
	docker compose logs -f api

ps:
	docker compose ps

restart:
	docker compose restar api

db-logs:
	docker compose logs -f db

migrate:
	docker compose exec api npx prisma migrate dev

generate:
	docker compose exec api npx prisma generate

studio:
	docker compose exec api npx prisma studio --port 5555 --browser none

shell:
	docker compose exec api sh
