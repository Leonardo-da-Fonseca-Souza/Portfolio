# Copyright 2025 Google LLC
# Por Leonardo da Fonseca Souza
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START gae_python38_app]
# [START gae_python3_app]
from flask import Flask

# If `entrypoint` is not defined in app.yaml, App Engine will look for an app
# called `app` in `main.py`.

app = Flask(__name__)

# Nota: Em um ambiente de produção, configure CORS de forma mais restritiva.
CORS(app) # Habilita CORS para todas as origens (bom para desenvolvimento)

# Rota para o webhook
@app.route('/webhook/pagamentos', methods=['POST'])
def processar_pagamento_webhook():
    try:
        # A maioria dos webhooks envia dados no formato JSON
        payload = request.json
        if not payload:
            raise ValueError("Corpo da requisição vazio ou não JSON.")

        print(f"Webhook de pagamento recebido: {payload}")

        # Aqui você adicionaria sua lógica de negócio:
        # - Validar a assinatura do webhook (importante para segurança!)
        # - Atualizar um banco de dados
        # - Enviar uma notificação
        # - Etc.

        status_pagamento = payload.get('status')
        id_transacao = payload.get('id_transacao')
        valor = payload.get('valor') # Adicionando para mais detalhes no teste

        if status_pagamento == 'aprovado':
            print(f"Pagamento {id_transacao} de R${valor:.2f} aprovado!")
            return jsonify({"status": "sucesso", "mensagem": "Pagamento processado com sucesso"}), 200
        else:
            print(f"Pagamento {id_transacao} de R${valor:.2f} com status: {status_pagamento}")
            return jsonify({"status": "pendente", "mensagem": "Status de pagamento não aprovado"}), 200

    except Exception as e:
        print(f"Erro ao processar webhook: {e}")
        return jsonify({"status": "erro", "mensagem": str(e)}), 400

if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. You
    # can configure startup instructions by adding `entrypoint` to app.yaml.
    app.run(host="127.0.0.1", port=8080, debug=True)
# [END gae_python3_app]
# [END gae_python38_app]
