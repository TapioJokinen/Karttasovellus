from flask import Flask

app = Flask(__name__)

# Cache control max age 0 seconds.
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

import flaskr.views