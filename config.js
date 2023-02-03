const env = process.env;

const config = {
  listPerPage: env.LIST_PER_PAGE || 30,
}

module.exports = config;