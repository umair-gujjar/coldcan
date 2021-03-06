const path = require('path');
const cors = require('cors');

class ConfigurationController {
    constructor(app) {
        ConfigurationController.init(app);
    }

    static init(app) {
        app.get('/configuration', cors(), (req, res) => {
            res.sendFile(path.join(__dirname, '../configuration.json'));
        });
    }
}

module.exports = function controller(app) {
    return new ConfigurationController(app);
};
