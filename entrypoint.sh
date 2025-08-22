#!/bin/sh

# Inicia o servidor Rails em background
bundle exec rails s -p 3000 -b 0.0.0.0 &

# Inicia o Sidekiq em foreground
bundle exec sidekiq -C config/sidekiq.yml