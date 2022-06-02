const app = require('./app');
const config = require('./config');
require('./database');

const startServer = () => {
    try {
        app.listen(config.PORT, () => {
            console.log('\x1b[35m%s\x1b[0m', `Rountbl API up and running at port: ${config.PORT}`);
        });
    } catch (error) {
        console.error(error);
        process.exit();
    }
};

startServer();
