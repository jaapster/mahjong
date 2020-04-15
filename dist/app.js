"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_sse_1 = __importDefault(require("express-sse"));
const tables_1 = require("./tables");
const app = express_1.default();
const port = 2001;
app.use(body_parser_1.default.json());
// Statics
app.use('/', express_1.default.static('../dist'));
const clock = new express_sse_1.default(['tick']);
setInterval(() => clock.send('tick'), 1000);
app.get('/streams/clock', (req, res) => {
    clock.init(req, res);
});
// Tables
const tableStreams = {};
const tablesStream = new express_sse_1.default({
    type: 'tables',
    data: {}
});
app.get('/streams/tables', (req, res) => {
    tablesStream.init(req, res);
});
app.get('/streams/tables/:id', (req, res) => {
    const id = req.params.id;
    if (!tableStreams[id]) {
        tableStreams[id] = new express_sse_1.default({
            type: 'table',
            data: tables_1.Tables.read(id)
        });
    }
    tableStreams[id].init(req, res);
    tableStreams[id].send(tables_1.Tables.read(id), 'update');
});
app.get('/tables', (req, res) => {
    res.send(tables_1.Tables.all());
});
app.post('/tables', (req, res) => {
    res.send(tables_1.Tables.create(req.body.creator));
    tablesStream.send(tables_1.Tables.all(), 'update');
});
app.get('/tables/:id', (req, res) => {
    res.send(tables_1.Tables.read(req.params.id));
});
app.put('/tables/:id', ({ params: { id }, body: { data } }, res) => {
    var _a;
    res.send(tables_1.Tables.update(id, data));
    tablesStream.send(tables_1.Tables.all(), 'update');
    (_a = tableStreams[id]) === null || _a === void 0 ? void 0 : _a.send(tables_1.Tables.read(id), 'update');
});
app.delete('/tables/:id', (req, res) => {
    res.send(tables_1.Tables.delete(req.params.id));
    tablesStream.send(tables_1.Tables.all(), 'update');
});
app.post('/tables/:id/game', ({ params: { id } }, res) => {
    var _a;
    res.send(tables_1.Tables.newGame(id));
    (_a = tableStreams[id]) === null || _a === void 0 ? void 0 : _a.send(tables_1.Tables.read(id), 'update');
});
app.put('/tables/:id/chairs/:chair', ({ params: { id, chair }, body: { data } }, res) => {
    var _a;
    res.send(tables_1.Tables.updateChair(id, chair, data));
    tablesStream.send(tables_1.Tables.all(), 'update');
    (_a = tableStreams[id]) === null || _a === void 0 ? void 0 : _a.send(tables_1.Tables.read(id), 'update');
});
app.put('/tables/:id/game/tiles/:tileId', ({ params: { id, tileId }, body: { data } }, res) => {
    if (data.tray && data.index != null) {
        const event = tables_1.Tables.moveTile(id, tileId, data);
        res.send(event);
        tableStreams[id].send(tables_1.Tables.read(id), 'update');
        tableStreams[id].send(event, 'tile-move');
    }
    if (data.space != null) {
        const event = tables_1.Tables.spaceTile(id, tileId, data.space);
        res.send(event);
        tableStreams[id].send(tables_1.Tables.read(id), 'update');
    }
    if (data.hidden != null) {
        res.send(tables_1.Tables.updateTile(id, tileId, data));
        tableStreams[id].send(tables_1.Tables.read(id), 'update');
    }
});
// app.listen(port, err => {
// 	if (err) {
// 		return console.error(err);
// 	}
// 	return console.log(`Mahjong server is listening on ${ port }`);
// });
https_1.default.createServer({
    key: fs_1.default.readFileSync('localhost+2-key.pem'),
    cert: fs_1.default.readFileSync('localhost+2.pem')
}, app).listen(2001, function () {
    console.log('Mahjong server on https://localhost:2001');
});
