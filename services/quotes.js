const db = require('../services/db');
const config = require('../config');

function getMultiple(page = 1) {
  const offset = (page - 1) * config.listPerPage;
  const data = db.query(`SELECT * FROM quote LIMIT ?,?`, [offset, config.listPerPage]);
  const meta = {page};

  return {
    data,
    meta
  }
}

function getById(id) {
  // const offset = (page - 1) * config.listPerPage;
  const data = db.query(`SELECT * FROM quote where id = ?`,id);
  // const meta = {page};

  return {
    data
    // meta
  }
}

function validateCreate(quote) {
  let messages = [];

  console.log(quote);

  if (!quote) {
    messages.push('No object is provided');
  }

  if (!quote.quote) {
    messages.push('Quote is empty');
  }

  if (!quote.author) {
    messages.push('Author is empty');
  }
  
  if (messages.length) {
    let error = new Error(messages.join());
    error.statusCode = 400;

    throw error;
  }
}

function create(quoteObj) {
  validateCreate(quoteObj);
  const {quote, author} = quoteObj;
  const result = db.run('INSERT INTO quote (quote, author) VALUES (@quote, @author)', {quote, author});
  
  let message = 'Error in creating quote';
  if (result.changes) {
    message = 'Quote created successfully';
  }

  return {message};
}

function deleteQuote(id) {
  const result= db.run(`DELETE FROM quote WHERE id = ?`,
  id,
  function (err, result) {
      if (err) {
          res.status(400).json({ "error": res.message })
          return;
      }
      res.status(200).json({ deletedID: this.changes })
      // return {messages}
  });

  return{
    result,
    message:"delete success"
  }
  // return{
  //   message:"delete success",
  //   deletedID: this.changes
  //   // res.status(200).json({ deletedID: this.changes })
  // }
  
}

module.exports = {
  getMultiple,
  create,
  deleteQuote,
  getById
}