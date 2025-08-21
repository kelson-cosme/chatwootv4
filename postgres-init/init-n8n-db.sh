#!/bin/bash
# Este script é executado automaticamente pelo contentor do PostgreSQL na primeira inicialização.

set -e # Termina o script imediatamente se algum comando falhar.

# Executa um comando SQL usando o psql.
# A variável ON_ERROR_STOP=1 garante que o script falhe se o comando SQL falhar.
# As variáveis POSTGRES_USER e POSTGRES_DB são fornecidas pelo ambiente do contentor.
# A variável POSTGRES_DB_N8N é a que definimos no nosso ficheiro .env.
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Esta consulta verifica se a base de dados para o n8n já existe.
    -- Se não existir, ela gera o comando 'CREATE DATABASE n8n'.
    -- O comando '\gexec' no final executa a string que foi gerada.
    -- Isto evita um erro ao tentar criar uma base de dados que já existe.
    SELECT 'CREATE DATABASE ${POSTGRES_DB_N8N}'
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '${POSTGRES_DB_N8N}')\gexec
EOSQL