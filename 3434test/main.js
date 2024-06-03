import asyncio
import websockets
import json
import random
import string

connected_clients = {}

def generate_id():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=16))

async def handle_client(websocket, path):
    client_id = generate_id()
    connected_clients[client_id] = websocket
    try:
        await websocket.send(json.dumps({'type': 'id', 'id': client_id}))
        async for message in websocket:
            data = json.loads(message)
            print(f"Nachricht empfangen von {client_id}: {data}")

            if data['type'] == 'move':
                response = {
                    'type': 'update',
                    'x': data['x'],
                    'y': data['y']
                }
                await asyncio.wait([client.send(json.dumps(response)) for client in connected_clients.values()])
    except websockets.exceptions.ConnectionClosed as e:
        print(f"Verbindung geschlossen für {client_id}: {e.code} - {e.reason}")
    except Exception as e:
        print(f"Fehler für {client_id}: {str(e)}")
    finally:
        del connected_clients[client_id]

async def main():
    async with websockets.serve(handle_client, "0.0.0.0", 3434):
        print("Server läuft auf Port 3434")
        await asyncio.Future()  # Run forever

if __name__ == "__main__":
    asyncio.run(main())