var statNames = {
    '3':'Agility',
    '4':'Strength',
    '5':'Intellect',
    '6':'Spirit',
    '7':'Stamina',
    '13':'Dodge',
    '14':'Parry',
    '31':'Hit',
    '32':'Critical Strike',
    '35':'PvP Resilience',
    '36':'Haste',
    '37':'Expertise',
    '45':'Spell Power',
    '49':'Mastery',
    '57':'PvP Power'
};


var statWeights = {
    '1':{
        'Fury':{

        },
        'Protection':{
            '7': 1.34,
            '31': 1,
            '37': 0.99,
            '49': 0.9,
            '4': 0.85,
            '13': 0.8,
            '14': 0.8,
            '36': 0.2
        }
    },
    '6':{
        'Blood':{
            '7': 1.5,
            '49': 1.3,
            '4': 1.2,
            '13': 1,
            '14': 1,
            '37': 0.2,
            '31': 0.2
        },
        'Frost':{

        },
        'Unholy':{

        }
    },
    '9':{
        'Affliction':{
            '5': 4.53,
            '45': 3.71,
            '49': 2.82,
            '36': 2.57,
            '31': 2.15,
            '32': 1.78
        },
        'Demonology': {

        },
        'Destruction': {
            '5': 4.1,
            '45': 3.33,
            '31': 2.8,
            '32': 1.75,
            '36': 1.7,
            '49': 1.65
        }
    }
};


var activeTalentIndex = function (talents) {
    return talents[0].selected ? 0 : 1;
}


$(function () {

    ko.bindingHandlers.tooltip = {
        init:function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            $(element).tooltip({
                title:value.content,
                animation:true,
                html:true,
                placement:'bottom'
            });
        }
    };

    function appViewModel() {
        var self = this;
        var iconUrl = "http://media.blizzard.com/wow/icons/18/";

        self.chars = ko.observableArray();
        self.detailsToShow = ko.observableArray();
        self.cloth = ko.observable(true);
        self.leather = ko.observable(true);
        self.mail = ko.observable(true);
        self.plate = ko.observable(true);
        self.healing = ko.observable(true);
        self.dps = ko.observable(true);
        self.tank = ko.observable(true);
        self.classNames = {
            '1':'warrior',
            '2':'paladin',
            '3':'hunter',
            '4':'rogue',
            '5':'priest',
            '6':'deathknight',
            '7':'shaman',
            '8':'mage',
            '9':'warlock',
            '10':'monk',
            '11':'druid'
        };


        self.getChars = function getChars() {
            $.ajax({
                type:"GET",
                url:"/enwow/api/character/enwow",
                dataType:"json",
                beforeSend:function () {
                    $('#loading').show();
                },
                complete:function () {
                    $('#loading').hide();
                },
                success:function (response) {
                    self.chars(response);
                    self.sortName();
                }
            });
        };

        self.selectedArmor = function (index) {
            var classId = self.chars()[index].classId;
            var cloth = (self.cloth() && ( classId === 5 || classId === 8 || classId === 9));
            var leather = (self.leather() && ( classId === 4 || classId === 10 || classId === 11));
            var mail = (self.mail() && ( classId === 3 || classId === 7));
            var plate = (self.plate() && ( classId === 1 || classId === 2 || classId === 6));
            return cloth || leather || mail || plate;
        };

        self.selectedRole = function (index) {
            var talentIndex = activeTalentIndex(self.chars()[index].talents);
            var dps = (self.dps() && self.chars()[index].talents[talentIndex].spec.role === 'DPS');
            var healing = (self.healing() && self.chars()[index].talents[talentIndex].spec.role === 'HEALING');
            var tank = (self.tank() && self.chars()[index].talents[talentIndex].spec.role === 'TANK');
            return dps || healing || tank;
        };

        self.talentImage = function (index) {
            var talentIndex = self.chars()[index].talents[0].selected ? 0 : 1;
            return iconUrl + self.chars()[index].talents[talentIndex].spec.icon + ".jpg";
        };

        self.detailsVisible = function (index) {
            return self.detailsToShow.indexOf(index.toString()) > -1;
        };

        self.showDetails = function (index) {
            self.detailsToShow.push(index.toString());
        };

        self.hideDetails = function (index) {
            self.detailsToShow.remove(index.toString());
        };

        self.sortName = function () {
            self.chars.sort(function (left, right) {
                return left.name == right.name ? 0 : (left.name < right.name ? -1 : 1)
            });
        };

        self.sortAverageItemLevelEquipped = function () {
            self.chars.sort(function (left, right) {
                return left.items.averageItemLevelEquipped == right.items.averageItemLevelEquipped ? 0 : (left.items.averageItemLevelEquipped < right.items.averageItemLevelEquipped ? -1 : 1)
            });
        };

        self.sortHead = function () {
            self.chars.sort(function (left, right) {
                return left.items.head.itemLevel == right.items.head.itemLevel ? 0 : (left.items.head.itemLevel < right.items.head.itemLevel ? -1 : 1)
            });
        };

        self.sortNeck = function () {
            self.chars.sort(function (left, right) {
                return left.items.neck.itemLevel == right.items.neck.itemLevel ? 0 : (left.items.neck.itemLevel < right.items.neck.itemLevel ? -1 : 1)
            });
        };

        self.sortShoulder = function () {
            self.chars.sort(function (left, right) {
                return left.items.shoulder.itemLevel == right.items.shoulder.itemLevel ? 0 : (left.items.shoulder.itemLevel < right.items.shoulder.itemLevel ? -1 : 1)
            });
        };

        self.sortChest = function () {
            self.chars.sort(function (left, right) {
                return left.items.chest.itemLevel == right.items.chest.itemLevel ? 0 : (left.items.chest.itemLevel < right.items.chest.itemLevel ? -1 : 1)
            });
        };
        self.sortWrist = function () {
            self.chars.sort(function (left, right) {
                return left.items.wrist.itemLevel == right.items.wrist.itemLevel ? 0 : (left.items.wrist.itemLevel < right.items.wrist.itemLevel ? -1 : 1)
            });
        };

        self.sortHands = function () {
            self.chars.sort(function (left, right) {
                return left.items.hands.itemLevel == right.items.hands.itemLevel ? 0 : (left.items.hands.itemLevel < right.items.hands.itemLevel ? -1 : 1)
            });
        };

        self.sortWaist = function () {
            self.chars.sort(function (left, right) {
                return left.items.waist.itemLevel == right.items.waist.itemLevel ? 0 : (left.items.waist.itemLevel < right.items.waist.itemLevel ? -1 : 1)
            });
        };

        self.sortLegs = function () {
            self.chars.sort(function (left, right) {
                return left.items.legs.itemLevel == right.items.legs.itemLevel ? 0 : (left.items.legs.itemLevel < right.items.legs.itemLevel ? -1 : 1)
            });
        };

        self.sortFeet = function () {
            self.chars.sort(function (left, right) {
                return left.items.feet.itemLevel == right.items.feet.itemLevel ? 0 : (left.items.feet.itemLevel < right.items.feet.itemLevel ? -1 : 1)
            });
        };

        self.sortFinger = function () {
            self.chars.sort(function (left, right) {
                var leftRing = Math.min(left.items.finger1.itemLevel, left.items.finger2.itemLevel);
                var rightRing = Math.min(right.items.finger1.itemLevel, right.items.finger2.itemLevel);
                return leftRing == rightRing ? 0 : (leftRing < rightRing ? -1 : 1)
            });
        };

        self.sortTrinket = function () {
            self.chars.sort(function (left, right) {
                var leftTrinket = Math.min(left.items.trinket1.itemLevel, left.items.trinket2.itemLevel);
                var rightTrinket = Math.min(right.items.trinket1.itemLevel, right.items.trinket2.itemLevel);
                return leftTrinket == rightTrinket ? 0 : (leftTrinket < rightTrinket ? -1 : 1)
            });
        };

        self.sortMainHand = function () {
            self.chars.sort(function (left, right) {
                return left.items.mainHand.itemLevel == right.items.mainHand.itemLevel ? 0 : (left.items.mainHand.itemLevel < right.items.mainHand.itemLevel ? -1 : 1)
            });
        };

        self.sortOffHand = function () {
            self.chars.sort(function (left, right) {
                if (typeof left.items.offHand === 'undefined') {
                    return 1;
                }
                if (typeof right.items.offHand === 'undefined') {
                    return -1;
                }
                return left.items.offHand.itemLevel == right.items.offHand.itemLevel ? 0 : (left.items.offHand.itemLevel < right.items.offHand.itemLevel ? -1 : 1)
            });
        };

        self.getTooltip = function (item, classId, talents) {
            var tooltip = '<table>';
            item.stats.sort(function (left, right) {
                return left.stat == right.stat ? 0 : (left.stat < right.stat ? -1 : 1)
            });
            $.each(item.stats, function (key, value) {
                tooltip += '<tr><td>' + statNames[value.stat] + '</td><td>' + value.amount + '</td></tr>';
            });
            tooltip += '<tr><td>Weight</td><td>' + self.getItemWeight(item, classId, talents) + '</td></tr></table>';
            return tooltip;
        };

        self.getItemWeight = function (item, classId, talents) {
            var spec = talents[activeTalentIndex(talents)].spec.name;
            var weight = 0;
            $.each(item.stats, function (key, value) {
                var statWeight = statWeights[classId][spec][value.stat];
                if (typeof statWeight !== 'undefined') {
                    weight += statWeight * value.amount;
                }
            });
            return weight.toFixed(0);
        };

        self.getChars();
    }

    ko.applyBindings(appViewModel());

});

