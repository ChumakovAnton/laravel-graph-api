/**
 *  Copyright (c) Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the license found in the
 *  LICENSE file in the root directory of this source tree.
 */

const express = require('express');
const graphqlHTTP = require('express-graphql');

const schema = require('./schema');

const app = express();
app.use(express.static(__dirname));
app.use('/graphql', graphqlHTTP(() => ({ schema })));

app.listen(8081, () => console.log('Started server on port 8081'));