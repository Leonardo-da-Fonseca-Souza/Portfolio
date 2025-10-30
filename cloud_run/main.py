from flask import Flask, request, jsonify

# If `entrypoint` is not defined in app.yaml, App Engine will look for an app
# called `app` in `main.py`.

app = Flask(__name__)

# Nota: Em um ambiente de produção, configure CORS de forma mais restritiva.
# CORS(app): habilita CORS para todas as origens (bom para desenvolvimento)

# Saudacao
@app.route('/')
def home():
    return "Bem vindo ao meu servidor Flask!"

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
    
    app.run(host="127.0.0.1", port=5000, debug=True)


