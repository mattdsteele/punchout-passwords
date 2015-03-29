import angular from 'angular';
import punchout from './index';

angular.module('punchoutCodesApp', [])
.constant('punchout', punchout)
.controller('PunchoutCtrl', function(punchout) {
  this.wins = 0;
  this.losses = 0;
  this.kos = 0;
  this.enemy = 0;
  this.password = '';
  this.updatePassword = function() {
    var password = punchout(this.wins, this.losses, this.kos, this.enemy);
    password.splice(3, 0, ' ');
    password.splice(7, 0, ' ');
    this.password = password.join('');
  };
  this.updatePassword();
});
