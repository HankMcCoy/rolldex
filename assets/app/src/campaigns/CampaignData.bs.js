// Generated by BUCKLESCRIPT VERSION 3.0.0, PLEASE EDIT WITH CARE
'use strict';

var Fetch = require("bs-fetch/src/Fetch.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");

function decodeCampaign(json) {
  return /* record */[
          /* id */Json_decode.field("id", Json_decode.$$int, json),
          /* name */Json_decode.field("name", Json_decode.string, json),
          /* description */Json_decode.field("description", Json_decode.string, json),
          /* system_id */Json_decode.field("system_id", Json_decode.$$int, json)
        ];
}

function decodeCampaigns(json) {
  return Json_decode.list(decodeCampaign, json);
}

function getCampaigns() {
  return fetch("/api/campaigns").then((function (prim) {
                  return prim.json();
                })).then((function (json) {
                return Promise.resolve(Json_decode.field("data", decodeCampaigns, json));
              }));
}

function createCampaign(draftCampaign) {
  var campaignDict = { };
  campaignDict["name"] = draftCampaign[/* name */0];
  campaignDict["description"] = draftCampaign[/* description */1];
  campaignDict["system_id"] = draftCampaign[/* system_id */2];
  var payload = { };
  payload["campaign"] = campaignDict;
  return fetch("/api/campaigns", Fetch.RequestInit[/* make */0](/* Some */[/* Post */2], /* Some */[{
                          "Content-Type": "application/json"
                        }], /* Some */[JSON.stringify(payload)], /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0)(/* () */0)).then((function (prim) {
                  return prim.json();
                })).then((function (json) {
                return Promise.resolve(Json_decode.field("data", decodeCampaign, json));
              }));
}

exports.decodeCampaign = decodeCampaign;
exports.decodeCampaigns = decodeCampaigns;
exports.getCampaigns = getCampaigns;
exports.createCampaign = createCampaign;
/* No side effect */