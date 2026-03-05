module.exports = {
    apps: [
        {
            name: "uagro-next",
            script: "npm",
            args: "run start -- -p 3003",
            env: {
                NODE_ENV: "production",
            }
        }
    ]
};
