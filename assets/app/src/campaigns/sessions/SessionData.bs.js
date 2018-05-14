// Generated by BUCKLESCRIPT VERSION 3.0.0, PLEASE EDIT WITH CARE
'use strict';

var $$Map = require("bs-platform/lib/js/map.js");
var List = require("bs-platform/lib/js/list.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Fetch = require("bs-fetch/src/Fetch.js");
var Int32 = require("bs-platform/lib/js/int32.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");

function decodeSession(json) {
  return /* record */[
          /* id */Json_decode.field("id", Json_decode.$$int, json),
          /* name */Json_decode.field("name", Json_decode.string, json),
          /* summary */Json_decode.field("summary", Json_decode.string, json),
          /* notes */Json_decode.field("notes", Json_decode.string, json),
          /* campaign_id */Json_decode.field("campaign_id", Json_decode.$$int, json)
        ];
}

function decodeSessions(json) {
  return Json_decode.list(decodeSession, json);
}

function getSessions(campaignId) {
  return fetch("/api/campaigns/" + (String(campaignId) + "/sessions")).then((function (prim) {
                  return prim.json();
                })).then((function (json) {
                return Promise.resolve(Json_decode.field("data", decodeSessions, json));
              }));
}

function createSession(draftSession) {
  var sessionDict = { };
  sessionDict["name"] = draftSession[/* name */0];
  sessionDict["summary"] = draftSession[/* summary */1];
  sessionDict["notes"] = draftSession[/* notes */2];
  sessionDict["campaign_id"] = draftSession[/* campaign_id */3];
  var payload = { };
  payload["session"] = sessionDict;
  return fetch("/api/sessions", Fetch.RequestInit[/* make */0](/* Some */[/* Post */2], /* Some */[{
                          "Content-Type": "application/json"
                        }], /* Some */[JSON.stringify(payload)], /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0)(/* () */0)).then((function (prim) {
                  return prim.json();
                })).then((function (json) {
                return Promise.resolve(Json_decode.field("data", decodeSession, json));
              }));
}

var SessionMap = $$Map.Make([Int32.compare]);

function getSessionMap(systems) {
  return List.fold_left((function (map, system) {
                return Curry._3(SessionMap[/* add */3], system[/* id */0], system, map);
              }), SessionMap[/* empty */0], systems);
}

exports.decodeSession = decodeSession;
exports.decodeSessions = decodeSessions;
exports.getSessions = getSessions;
exports.createSession = createSession;
exports.SessionMap = SessionMap;
exports.getSessionMap = getSessionMap;
/* SessionMap Not a pure module */
