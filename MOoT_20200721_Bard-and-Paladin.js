var iFileName = "MOoT_20200721_Bard-and-Paladin.js";
RequiredSheetVersion(13);
// This file adds the content from the Mythic Odysseys of Theros: Bard and Paladin subclasses to MPMB's Character Record Sheet
// Thanks to u/newbuu2 for doing a better job of the paladin aura
// Define the source
SourceList["MOoT"] = {
	name : "Mythic Odysseys of Theros: Bard and Paladin",
	abbreviation : "MOoT",
	group : "Primary Sources",
	url : "",
	date : "2020/07/21"
};

// Add a subclasses for the bard and one for the paladin
AddSubClass("bard", "college of eloquence", {
	regExpSearch : /^(?=.*(college|bard|minstrel|troubadour|jongleur))(?=.*eloquence).*$/i,
	subname : "College of Eloquence",
	source : ["MOoT", 1],
	features : {
		"subclassfeature3" : {
			name : "Silver Tongue",
			source : ["MOoT", 1],
			minlevel : 3,
			description : desc([
				"When I make a Persuasion or Deception check, I can treat a roll of 9 or lower as a 10"
			])
		},
		"subclassfeature3.1" : {
			name : "Unsettling Words",
			source : ["MOoT", 1],
			minlevel : 3,
			description : desc([
				"As a bonus action I can choose one creature I can see within 60 feet",
				"They subtract my inspiration die from their first saving throw before my next turn"
			]),
			additional : "1 bardic inspiration die",
			action : [["bonus action", ""]]
		},
		"subclassfeature6" : {
			name : "Unfailing Inspiration",
			source : ["MOoT", 1],
			minlevel : 6,
			description : desc([
				"When a creature adds my inspiration die to a roll and fails anyway, they keep the die"
			])
		},
		"subclassfeature6.1" : {
			name : "Universal Speech",
			source : ["MOoT", 1],
			minlevel : 6,
			description : desc([
				"As an action I can choose up to my Charisma mod (min 1) creatures within 60 feet",
				"Those creatures understand any language I speak for an hour",
				"I can expend a spell slot of any level to use this feature again"
			]),
			recovery : "long rest",
			usages : 1,
			action : [["action", ""]]
		},
		"subclassfeature14" : {
			name : "Infectious Inspiration",
			source : ["MOoT", 1],
			minlevel : 14,
			description : desc([
				"As a reaction when a creature uses my inspiration die and succeeds, I can inspire another",
				"I give a creature within 60 ft that can hear me an inspiration die without expending any",
				"I can use this reaction a number of times per long rest equal to my Cha mod (min 1)"
			]),
			action : [["reaction", ""]],
			usages : "Charisma mod per ",
			usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
			recovery : "long rest"
		}
	}
});
AddSubClass("paladin", "oath of heroism", {
	regExpSearch : /^(?=.*\bhero)((?=.*paladin)|((?=.*(exalted|sacred|holy|divine))(?=.*(knight|fighter|warrior|warlord|trooper)))).*$/i,
	subname : "Oath of Heroism",
	source : ["MOoT", 2],
	features : {
		"subclassfeature3" : {
			name : "Channel Divinity: Peerless Athlete",
			source : ["MOoT", 2],
			minlevel : 3,
			description : desc([
				"As a bonus action, I gain adv. on Str (Athletics) and Dex (Acrobatics) checks for 10 min",
				"My carry, push, drag, and lift capacity also double. I add 10 feet to my jump distances"
			]),
			action : [["bonus action", ""]],
			spellcastingExtra : ["heroism", "guiding bolt", "enhance ability", "magic weapon", "haste", "protection from energy", "compulsion", "freedom of movement", "commune", "flame strike"]
		},
		"subclassfeature3.1" : {
			name : "Channel Divinity: Inspiring Smite",
			source : ["MOoT", 2],
			minlevel : 3,
			description : "\n   I distribute 2d8 + my Paladin level in temp hit points among those in 30 feet"
		},
        "subclassfeature7" : {
            name : "Aura of Alacrity",
            source : ["MOT", 0],
            minlevel : 7,
            description : desc([
                "If I'm not incapacitated, allies starting within range get extra movement for their turn"
            ]),
            changeeval : function (v) {
                var alacritySpd = '+' + (v[1] < 7 ? 0 : 10);
                SetProf('speed', alacritySpd !== '+0', {allModes : alacritySpd}, "Oath of Glory: Aura of Alacrity");
            },
            additional : levels.map(function (n) {
                if (n < 7) return "";
                return (n < 18 ? 5 : 10) + "-foot aura; +10ft movement";
            })
        },
		"subclassfeature15" : {
			name : "Glorious Defense",
			source : ["MOoT", 2],
			minlevel : 15,
			description : desc([
				"As a reaction when I or a creature I can see is hit with an attack roll, they gain bonus AC",
				"I add my Cha mod (min 1) to AC for that attack, potentially causing it to miss",
				"If it misses, I can make one weapon attack against the attacker as part of this reaction"
			]),
			action : [["reaction", ""]],
			usages : "Charisma mod per ",
			usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
			recovery : "long rest"
		},
		"subclassfeature20" : {
			name : "Living Myth",
			source : ["MOoT", 3],
			minlevel : 20,
			description : desc([
				"As a bonus action, I can gain the following benefits for 1 minute:",
				" \u2022 I have advantage on all Charisma checks",
				" \u2022 Once on each of my turns when I miss with a weapon attack, I can cause it to hit",
				" \u2022 As a reaction when I fail a saving throw, I can reroll it, using the new roll",
				"I can expend a 5th level spell slot to use this feature again"
			]),
			recovery : "long rest",
			usages : 1,
			action : [["bonus action", ""]]
		}
	}
});
