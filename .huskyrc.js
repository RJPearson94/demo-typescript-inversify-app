module.exports = {
    "hooks": {
        "pre-commit": "yarn prettier:all && yarn lint:all"
    }
}