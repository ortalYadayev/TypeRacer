import fastify from "fastify";
import pointOfView from "point-of-view";
import ejs from 'ejs';

const app = fastify({
    logger: true
});

app.register(pointOfView, {
    engine: {
        ejs: ejs,
    }
});

app.get('/',  (request, reply) => {
    const randStr = Math.random().toString(36).replace(/[^a-z]+/g, '');
    const data = {
        firstName: 'John',
        lastName: 'Doe',
        hobbies: [
            'Writing',
            'Programming',
            'Playing'
        ],
    };
    reply.view('views/index.ejs', { randStr: randStr, data: data });
});

const startServer = async (): Promise<void> => {
    try {
        const PORT = 3000;
        await app.listen(PORT);
        app.log.info(`Start server! Listening on port ${PORT}`);
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
};

startServer();
