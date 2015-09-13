Package.describe({
  name: "raix:eventstate",
  version: '0.0.4',
  summary: "A server and client event state package.",
  git: "https://github.com/raix/Meteor-EventState.git"
});

Package.onUse(function (api) {

  api.versionsFrom('1.0');

  api.use(['underscore', 'raix:eventemitter@0.1.3']);

  api.addFiles('eventstate.common.js', ['client', 'server']);

  api.export('EventState')
});


Package.onTest(function (api) {
  api.use(['raix:eventstate']);
  api.use('test-helpers', ['server', 'client']);
  api.use('tinytest');

  api.addFiles('eventstate.tests.js');
});
