#!flask/bin/python
import os
from flask import Flask, request, jsonify, abort, make_response
from routefinder import RouteFinder

app = Flask(__name__)
rf = RouteFinder()


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

# On IBM Cloud Cloud Foundry, get the port number from the environment variable PORT
# When running this app on the local machine, default the port to 8000
port = int(os.getenv('PORT', 8000))

# curl -i "http://localhost:5000?origin=Exit_4&destination=C3-1"
# output: {'route': ['Exit_4', 'C1-2', 'E-1', 'E-2', 'E-3', 'C3-1']}
@app.route('/', methods=['GET'])
def get_optimal_route():
    origin = request.args.get('origin', None)
    destination = request.args.get('destination')
    route = []
    
    if origin == None and destination == None:
        abort(404)
    elif origin == None:
        route = rf.optimal_entry_route(destination)
    elif destination == None:
        route = rf.optimal_exit_route(origin)
    else:
        route = rf.optimal_route(origin, destination)
    
    return jsonify({'route': route})


if __name__ == '__main__':
    # app.run(debug=True)
    app.run(host='0.0.0.0', port=port, debug=True)
    