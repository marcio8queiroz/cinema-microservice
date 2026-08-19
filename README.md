🧱 Rodar seu docker-compose.yml
docker compose up -d // dentro da pasta cinema-microservice

# rode npm start dentro de src

# Acessar o MongoDB pelo MongoDB Compass usando a string:
# movies-db
mongodb://admin:password@localhost:27018/?authSource=admin
# catalog-db
mongodb://admin:password@localhost:27019/?authSource=admin

# Ou conectar via terminal:
docker exec -it mongodb mongosh -u admin -p password

# dentro de src
geral:
npx jest

específico
npx jest repository.test.js --detectOpenHandles

## express - servidor web
## morgan - log de requisições no console - tudo que acontece no servidor ele printa
## helmet - módulo de segurança - protege a API com uma única linha de comando
