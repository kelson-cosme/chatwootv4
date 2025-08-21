-- O contentor PostgreSQL executa este ficheiro automaticamente na primeira inicialização.

-- A base de dados do Chatwoot já é criada pela variável de ambiente POSTGRES_DB.
-- Este comando cria a base de dados para o n8n, mas apenas se ela ainda não existir.
-- O comando \gexec executa a string gerada pela consulta SELECT.
SELECT 'CREATE DATABASE n8n'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'n8n')\gexec