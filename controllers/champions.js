const express = require('express');
const router = express.Router();
const Champions = require('../models/champion');
const Builds = require('../models/build');
const Item = require('../models/item');
const PrimaryRune = require('../models/primary-rune');
const SecondaryRune = require('../models/secondary-rune');
const SummonerSpell = require('../models/summoner-spell');
const StarterItem = require('../models/starter-item');
const Role = require('../models/role')
const morgan = require('morgan');
const Build = require('../models/build');

router.use(morgan('dev'));


//show all champs
router.get('/', async (req, res) => {
    try {
        const champions = await Champions.find({}).populate();
        res.render('champs/index.ejs', {
            champions
        })
    } catch (error) {
        console.log(error);
        res.redirect('/champions');
    }
});


//show champ page
router.get('/:id', async (req, res) => {
    try {
        const champions = await Champions.findById(req.params.id).populate('builds');
        res.render('champs/show.ejs', {
            champions
        })
    } catch (error) {
        console.log(error);
        res.redirect(`champions/${req.params.id}`);
    }
});


//new build
router.get('/:id/new', async (req, res) => {
    try {
        const champions = await Champions.findById(req.params.id);
        const items = await Item.find({});
        const primaryRunes = await PrimaryRune.find({});
        const secondaryRunes = await SecondaryRune.find({});
        const summonerSpells = await SummonerSpell.find({});
        const starterItems = await StarterItem.find({});
        const role = await Role.find({});

        res.render('champs/builds/new.ejs', {
            champions,
            items,
            primaryRunes,
            secondaryRunes,
            summonerSpells,
            starterItems,
            role
        });
    } catch (error) {
        console.log(error);
        res.redirect(`/champions/${req.params.id}`);
    }
});


//upload build
router.post('/:id', async (req, res) => {
    try {
        console.log(req.body.role)
        const buildData = {
            name: req.body.name,
            champion: req.params.id,
            role: req.body.roles,
            items: req.body.items,
            primaryRune: req.body.primaryRune,
            secondaryRune: req.body.secondaryRune,
            summonerSpells: req.body.summonerSpells
        };

        const itemsSet = new Set(buildData.items);
        if (itemsSet.size !== buildData.items.length) {
            throw new Error('Cannot select the same item multiple times.');
        }

        req.body.owner = req.session.user._id;
        const build = await Builds.create(req.body);
        const champion = await Champions.findById(req.params.id);
        champion.builds.push(build);
        console.log(build)
        await champion.save();
    } catch (error) {
        console.log(error);
    }
    res.redirect(`/champions/${req.params.id}`)
});


//show build
router.get('/:champid/:buildid', async (req, res) => {
    try {
        const champions = await Champions.findById(req.params.champid);
        const build = await Builds.findById(req.params.buildid).populate(['items', 'starterItem', 'primaryRune', 'secondaryRune', 'summonerSpells', 'owner', 'role']);


        res.render('champs/builds/show.ejs', {
            build,
            champions
        })
    } catch (error) {
        console.log(error);
        res.redirect(`/champions/${req.params.champid}`)
    }
});


//show edit page
router.get('/:champid/:buildid/edit', async (req, res) => {
    try {
        const champions = await Champions.findById(req.params.champid);
        const build = await Builds.findById(req.params.buildid).populate(['items', 'starterItem', 'primaryRune', 'secondaryRune', 'summonerSpells', 'role']);
        const items = await Item.find({});
        const primaryRunes = await PrimaryRune.find({});
        const secondaryRunes = await SecondaryRune.find({});
        const summonerSpells = await SummonerSpell.find({});
        const starterItems = await StarterItem.find({});
        const roles = await Role.find({});

        res.render('champs/builds/edit.ejs', {
            build,
            champions,
            items,
            primaryRunes,
            secondaryRunes,
            summonerSpells,
            starterItems,
            roles
        });
    } catch (error) {
        console.log(error);
        res.redirect(`/champions/${req.params.champid}`);
    }
});

//upload edit

router.put('/:champid/:buildid', async (req, res) => {
    try {
        const buildData = {
            name: req.body.name,
            role: req.body.role,
            items: req.body.items,
            primaryRune: req.body.primaryRune,
            secondaryRune: req.body.secondaryRune,
            summonerSpells: req.body.summonerSpells
        };

        await Builds.findByIdAndUpdate(req.params.buildid, buildData);
        res.redirect(`/champions/${req.params.champid}`);
    } catch (error) {
        console.log(error);
        res.redirect(`/champions/${req.params.champid}`);
    }
});

//delete build
router.delete('/:champid/:buildid', async (req, res) => {
    try {
        const build = await Build.findById(req.params.buildid);
        if (build.owner.equals(req.session.user._id)) {
            await build.deleteOne();
            console.log('build deleted')
        }
        res.redirect(`/champions/${req.params.champid}`)
    } catch (error) {
        console.log(error)
        res.redirect('champions/');
    }
    
});

module.exports = router;