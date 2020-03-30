const fastify = require('fastify')({ logger: true })

fastify.register(require('point-of-view'), {
    engine: {
        ejs: require('ejs')
    }
});

fastify.get('/', async (req, reply) => {
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
    reply.view('client/index.ejs', { randStr, data });
});

const start = async () => {
    try {
        await fastify.listen(3000);
        fastify.log.info(`server listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();