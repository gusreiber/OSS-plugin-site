/* eslint-disable no-console */ //This is because we are using console log for communications
const
  fs = require('fs'),
  express = require('express'),
  schedule = require('node-schedule'),
  request = require('request'),
  async = require('async');

const flatDb = require('./db');
const createPluginDb = require('./createPluginsDb');

const db = '/tmp/plugin-site';

const
  rest = express(),
  backendPort = '3000';

var lastModified = new Date();

schedule.scheduleJob('1 1 1 * * *', () => {
  console.log('scheduled indexing started');
  createPluginDb(db, (err) => {
    if (err) {
      callback(err);
    }
    flatDb(db, (err, data)=> {
      if (err) {
        callback(err);
      }
      this.dbStore = data;
      lastModified = new Date();
      console.log('scheduled indexing finished');
    });
  });
});


function getOptions(req) {
  if(!req.query) {
    return null;
  }
  var page = Number(req.query.page) || 1;
  var limit =  Number(req.query.limit) || 50;
  var category = req.query.category || null;
  var sort =  req.query.sort || 'title';
  var labelFilter = req.query.labelFilter;
  var latest =  req.query.latest;
  var asc =  req.query.asc? req.query.asc === 'true' : true;
  return options = {
    sort,
    asc,
    labelFilter,
    category,
    latest,
    page: page || 1,
    limit: limit || 10
  };
}

function setRestHeader(res) {
  res
    .header('Access-Control-Allow-Origin', '*')
    .header('Access-Control-Allow-Headers', 'X-Requested-With')
    .header('Last-modified', lastModified)
  ;
}

rest.get('/latest', (req, res) => {
  setRestHeader(res);
  res.send(this.dbStore.latest());
});

rest.get('/labels', (req, res) => {
  setRestHeader(res);
  res.send(this.dbStore.labels());
});

rest.get('/newcategories', (req, res) => {
  setRestHeader(res);
  const data = {"docs":[{"value":{"hi":"bye"},"key":"android"},{},{"value":31,"key":"listview-column"},{"value":29,"key":"maven"},{"value":162,"key":"misc"},{"value":1,"key":"must-be-labeled"},{"value":89,"key":"notifier"},{"value":7,"key":"page-decorator"},{"value":26,"key":"parameter"},{"value":8,"key":"pipeline"},{"value":1,"key":"plugin-external"},{"value":2,"key":"plugin-misc"},{"value":1,"key":"plugin-post-build"},{"value":1,"key":"plugin-test"},{"value":87,"key":"post-build"},{"value":1,"key":"python"},{"value":142,"key":"report"},{"value":6,"key":"ruby"},{"value":3,"key":"runcondition"},{"value":1,"key":"scala"},{"value":52,"key":"scm"},{"value":36,"key":"scm-related"},{"value":10,"key":"security"},{"value":41,"key":"slaves"},{"value":1,"key":"spot"},{"value":1,"key":"spotinst"},{"value":2,"key":"test"},{"value":1,"key":"textfile"},{"value":52,"key":"trigger"},{"value":92,"key":"ui"},{"value":51,"key":"upload"},{"value":37,"key":"user"},{"value":2,"key":"view"}],"limit":50,"total":50,"end":50,"start":0,"page":1,"pages":1};
  res.send(data);   
});

rest.get('/newplugins', (req, res) => {
  setRestHeader(res);
  fs.readFile("./server/static/plugin.json", {encoding: 'utf8'}, (err, data) => {
    if (err) {
      console.error("ERROR ===== " + err);
      res.json({error: err});
    } else {
      res.json(JSON.parse(data));
    }
  });    
});

rest.get('/newplugin/:name', (req, res) => {
	var name = req.params && req.params.name ? req.params.name : null;
  setRestHeader(res);
  fs.readFile("./server/static/plugin.json", {encoding: 'utf8'}, (err, data) => {
    if (err) {
      console.error("ERROR ===== " + err);
      res.json({error: err});
    } else {
      res.json(JSON.parse(data));
    }
  });    
});

rest.get('/plugin/:name', (req, res) => {
  var name = req.params && req.params.name ? req.params.name : null;
  setRestHeader(res);
  const data = this.dbStore.entry(name);
  res.send(data);
});
rest.get('/stats/:name', (req, res) => {
  var name = req.params && req.params.name ? req.params.name : null;
  setRestHeader(res);
  const url = `http://stats.jenkins-ci.org/plugin-installation-trend/${name}.stats.json`;
  request(url, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.json(JSON.parse(body));
    } else if (error) {
      res.json({error: error});
    } else if (response.statusCode == 404)  {
      res.statusCode = 404;
      res.json({error: `File not found ${url}`});
    }
  });
});
rest.get('/plugins', (req, res) => {
  setRestHeader(res);
  var q = req.query && req.query.q ? req.query.q : null;
  const options = getOptions(req);
  this.dbStore.search(q, options, (err, result) => {
    res.json(result);
  });
});

rest.get('/', (req, res) => {
  res.send('<a href=\'/plugins\'>Show plugins</a>');
});

async.series([
  (callback) => {
    createPluginDb(db, (err) => {
      if (err) {
        callback(err);
      }
      flatDb(db, (err, data)=> {
        if (err) {
          callback(err);
        }
        this.dbStore = data;
        callback();
      });
    });
  },
  (callback) => {
    rest.listen(backendPort, () => {
      console.log('Listening backend port', backendPort);
      callback();
    });
  }
], (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('finished');
  }

});
