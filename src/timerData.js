import alakkir from "./img/events/alakkir.webp";
import ancheladus from "./img/events/ancheladus.png";
import asura from "./img/events/asura.webp";
import aurion from "./img/events/aurion.png";
import brealeos from "./img/events/brealeos.png";
import chaos from "./img/events/chaos.webp";
import chaoticchuo from "./img/events/chaoticchuo.png";
import deathshold from "./img/events/deathshold.png";
import drumbeat from "./img/events/drumbeat.webp";
import erasmo from "./img/events/erasmo.png";
import fieldboss from "./img/events/fieldboss.webp";
import forpe from "./img/events/forpe.webp";
import gesbroy from "./img/events/gesbroy.webp";
import ghostship from "./img/events/ghostship.png";
import grandprix from "./img/events/grandprix.webp";
import harmony from "./img/events/harmony.webp";
import harvestlordincarnate from "./img/events/harvestlordincarnate.png";
import illusion from "./img/events/illusion.webp";
import kohinorr from "./img/events/kohinorr.png";
import lagoon from "./img/events/lagoon.webp";
import lullaby from "./img/events/lullaby.png";
import lushreed from "./img/events/lushreed.webp";
import magmadon from "./img/events/magmadon.png";
import medeia from "./img/events/medeia.webp";
import moake from "./img/events/moake.png";
import monte from "./img/events/monte.webp";
import phantomwing from "./img/events/phantomwing.webp";
import coopbattle from "./img/events/coopbattle.png";
import oblivion from "./img/events/oblivion.webp";
import opportunity from "./img/events/opportunity.webp";
import proxima from "./img/events/proxima.png";
import sailingcoop from "./img/events/sailingcoop.webp";
import sailinggate from "./img/events/sailinggate.webp";
import signatus from "./img/events/signatus.png";
import shangra from "./img/events/shangra.png";
import snowpang from "./img/events/snowpang.webp";
import solgrande from "./img/events/solgrande.png";
import spida from "./img/events/spida.webp";
import tarsila from "./img/events/tarsila.png";
import tooki from "./img/events/tooki.png";
import tranquil from "./img/events/tranquil.webp";
import unknown from "./img/events/unknown.png";
import volare from "./img/events/volare.webp";

export const timerData = {
  fever: [
    {
      name: "Arkesia Grand Prix",
      time: [
        "2:00",
        "4:00",
        "6:00",
        "8:00",
        "10:00",
        "12:00",
        "14:00",
        "16:00",
        "18:00",
        "20:00",
        "22:00",
        "24:00",
      ],
      id: "grandprix",
      ilvl: 0,
      image: grandprix,
      location: "Main Cities",
      days: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
    },
  ],
  adventure: [
    // adventure islands change every week!?!?
    {
      name: "Asura Island",
      time: ["11:00", "13:00", "19:00", "21:00", "23:00"],
      id: "asura",
      ilvl: 250,
      image: asura,
      location: "Asura Island",
      days: ["fri"],
    },
    {
      name: "Drumbeat Island",
      time: ["19:00", "21:00", "23:00"],
      id: "drumbeat",
      ilvl: 250,
      image: drumbeat,
      location: "Drumbeat Island",
      days: ["sat", "sun"],
    },
    {
      name: "Forpe",
      time: ["11:00", "13:00", "19:00", "21:00", "23:00"],
      id: "forpe",
      ilvl: 250,
      image: forpe,
      location: "Forpe",
      days: ["tue", "fri"],
    },
    {
      name: "Harmony Island",
      time: ["11:00", "13:00", "19:00", "21:00", "23:00"],
      id: "harmony",
      ilvl: 250,
      image: harmony,
      location: "Harmony Island",
      days: ["mon"],
    },
    {
      name: "Harmony Island",
      time: ["19:00", "21:00", "23:00"],
      id: "harmony",
      ilvl: 250,
      image: harmony,
      location: "Harmony Island",
      days: ["sat"],
    },
    {
      name: "Lagoon Island",
      time: ["11:00", "13:00", "19:00", "21:00", "23:00"],
      id: "lagoon",
      ilvl: 250,
      image: lagoon,
      location: "Lagoon Island",
      days: ["thu"],
    },
    {
      name: "Lush Reed Island",
      time: ["11:00", "13:00", "19:00", "21:00", "23:00"],
      id: "lushreed",
      ilvl: 250,
      image: lushreed,
      location: "Lush Reed Island",
      days: ["thu"],
    },
    {
      name: "Medeia",
      time: ["11:00", "13:00", "19:00", "21:00", "23:00"],
      id: "medeia",
      ilvl: 250,
      image: medeia,
      location: "Medeia",
      days: ["wed"],
    },
    {
      name: "Medeia",
      time: ["11:00", "13:00", "15:00"],
      id: "medeia",
      ilvl: 250,
      image: medeia,
      location: "Medeia",
      days: ["sun"],
    },
    {
      name: "Monte Island",
      time: ["11:00", "13:00", "19:00", "21:00", "23:00"],
      id: "monte",
      ilvl: 250,
      image: monte,
      location: "Monte Island",
      days: ["tue"],
    },
    {
      name: "Monte Island",
      time: ["11:00", "13:00", "15:00"],
      id: "monte",
      ilvl: 250,
      image: monte,
      location: "Monte Island",
      days: ["sat", "sun"],
    },
    {
      name: "Oblivion Isle",
      time: ["11:00", "13:00", "19:00", "21:00", "23:00"],
      id: "oblivion",
      ilvl: 250,
      image: oblivion,
      location: "Oblivion Isle",
      days: ["fri"], // was Monday on 14th....
    },
    // {
    //   name: "Oblivion Isle",
    //   time: ["19:00", "21:00", "23:00"],
    //   id: "oblivion",
    //   ilvl: 250,
    //   image: oblivion,
    //   location: "Oblivion Isle",
    //   days: ["sun"],
    // },
    {
      name: "Oblivion Isle",
      time: ["11:00", "13:00", "15:00"],
      id: "oblivion",
      ilvl: 250,
      image: oblivion,
      location: "Oblivion Isle",
      days: ["sat"],
    },
    {
      name: "Opportunity Isle",
      time: ["19:00", "21:00", "23:00"],
      id: "opportunity",
      ilvl: 250,
      image: opportunity,
      location: "Opportunity Isle",
      days: ["sat"],
    },
    {
      name: "Phantomwing Island",
      time: ["11:00", "13:00", "19:00", "21:00", "23:00"],
      id: "phantomwing",
      ilvl: 250,
      image: phantomwing,
      location: "Phantomwing Island",
      days: ["tue"],
    },
    {
      name: "Phantomwing Island",
      time: ["11:00", "13:00", "15:00"],
      id: "phantomwing",
      ilvl: 250,
      image: phantomwing,
      location: "Phantomwing Island",
      days: ["sat"],
    },
    {
      name: "Phantomwing Island",
      time: ["19:00", "21:00", "23:00"],
      id: "phantomwing",
      ilvl: 250,
      image: phantomwing,
      location: "Phantomwing Island",
      days: ["sun"],
    },
    {
      name: "Snowpang Island",
      time: ["11:00", "13:00", "19:00", "21:00", "23:00"],
      id: "snowpang",
      ilvl: 250,
      image: snowpang,
      location: "Snowpang Island",
      days: ["mon", "thu"],
    },
    {
      name: "Tranquil Isle",
      time: ["11:00", "13:00", "19:00", "21:00", "23:00"],
      id: "tranquil",
      ilvl: 250,
      image: tranquil,
      location: "Tranquil Isle",
      days: ["mon"], // was wed last week...?
    },
    {
      name: "Tranquil Isle",
      time: ["11:00", "13:00", "15:00"],
      id: "tranquil",
      ilvl: 250,
      image: tranquil,
      location: "Tranquil Isle",
      days: ["sat"],
    },
    {
      name: "Volare Island",
      time: ["11:00", "13:00", "19:00", "21:00", "23:00"],
      id: "volare",
      ilvl: 250,
      image: volare,
      location: "Volare Island",
      days: ["wed"],
    },
    {
      name: "Volare Island",
      time: ["11:00", "13:00", "15:00"],
      id: "volare",
      ilvl: 250,
      image: volare,
      location: "Volare Island",
      days: ["sun"],
    },
  ],
  chaos: [
    // Monday, Saturday
    {
      name: "Twisting Chaos Legion",
      time: [
        "11:00",
        "13:00",
        "15:00",
        "17:00",
        "19:00",
        "21:00",
        "23:00",
        "25:00",
        "27:00",
        "29:00",
      ],
      id: "chaos_chaos_302",
      ilvl: 302,
      image: chaos,
      location: "Rattan Hill",
      days: ["mon", "sat"],
    },
    {
      name: "Twisting Plague Legion",
      time: [
        "12:00",
        "14:00",
        "16:00",
        "18:00",
        "20:00",
        "22:00",
        "24:00",
        "26:00",
        "28:00",
      ],
      id: "chaos_plague_302",
      ilvl: 302,
      image: chaos,
      location: "???",
      days: ["mon", "sat"],
    },
    // Thursday, Sunday
    {
      name: "Twisting Phantom Legion",
      time: [
        "12:00",
        "14:00",
        "16:00",
        "18:00",
        "20:00",
        "22:00",
        "24:00",
        "26:00",
        "28:00",
      ],
      id: "chaos_phantom_302",
      ilvl: 302,
      image: chaos,
      location: "???",
      days: ["mon", "thu", "sun"],
    },
    {
      name: "Twisting Darkness Legion",
      time: [
        "11:00",
        "13:00",
        "15:00",
        "17:00",
        "19:00",
        "21:00",
        "23:00",
        "25:00",
        "27:00",
        "29:00",
      ],
      id: "chaos_darkness_302",
      ilvl: 302,
      image: chaos,
      location: "Rattan Hill",
      days: ["mon", "thu", "sun"],
    },
    {
      name: "Twisting Phantom Legion",
      time: [
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
        "24:00",
        "25:00",
        "26:00",
        "27:00",
        "28:00",
        "29:00",
      ],
      id: "chaos_phantom_460",
      ilvl: 460,
      image: chaos,
      location: "???",
      days: ["mon", "thu", "sat", "sun"],
    },
    {
      name: "Twisting Plague Legion",
      time: [
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
        "24:00",
        "25:00",
        "26:00",
        "27:00",
        "28:00",
        "29:00",
      ],
      id: "chaos_plague_802",
      ilvl: 802,
      image: chaos,
      location: "???",
      days: ["mon", "thu", "sat", "sun"],
    },
    {
      name: "Twisting Darkness Legion",
      time: [
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
        "24:00",
        "25:00",
        "26:00",
        "27:00",
        "28:00",
        "29:00",
      ],
      id: "chaos_darkness_960",
      ilvl: 960,
      image: chaos,
      location: "???",
      days: ["mon", "thu", "sat", "sun"],
    },
    {
      name: "Twisting Chaos Legion",
      time: [
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
        "24:00",
        "25:00",
        "26:00",
        "27:00",
        "28:00",
        "29:00",
      ],
      id: "chaos_chaos_1302",
      ilvl: 1302,
      image: chaos,
      location: "???",
      days: ["mon", "thu", "sat", "sun"],
    },
  ],
  fieldboss: [
    {
      name: "Tarsila",
      time: [
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
        "24:00",
        "25:00",
        "26:00",
        "27:00",
        "28:00",
        "29:00",
      ],
      id: "tarsila",
      ilvl: 380,
      image: tarsila,
      location: "",
      days: ["tue", "fri", "sun"],
    },
    {
      name: "Signatus",
      time: [
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
        "24:00",
        "25:00",
        "26:00",
        "27:00",
        "28:00",
        "29:00",
      ],
      id: "signatus",
      ilvl: 380,
      image: signatus,
      location: "",
      days: ["tue", "fri", "sun"],
    },
    {
      name: "Chaotic Chuo",
      time: [
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
        "24:00",
        "25:00",
        "26:00",
        "27:00",
        "28:00",
        "29:00",
      ],
      id: "chaoticchuo",
      ilvl: 380,
      image: chaoticchuo,
      location: "",
      days: ["tue", "fri", "sun"],
    },
    {
      name: "Proxima",
      time: [
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
        "24:00",
        "25:00",
        "26:00",
        "27:00",
        "28:00",
        "29:00",
      ],
      id: "proxima",
      ilvl: 540,
      image: proxima,
      location: "",
      days: ["tue", "fri", "sun"],
    },
    {
      name: "Magmadon",
      time: [
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
        "24:00",
        "25:00",
        "26:00",
        "27:00",
        "28:00",
        "29:00",
      ],
      id: "magmadon",
      ilvl: 540,
      image: magmadon,
      location: "",
      days: ["tue", "fri", "sun"],
    },
    {
      name: "Harvest Lord Incarnate",
      time: [
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
        "24:00",
        "25:00",
        "26:00",
        "27:00",
        "28:00",
        "29:00",
      ],
      id: "harvestlordincarnate",
      ilvl: 880,
      image: harvestlordincarnate,
      location: "",
      days: ["tue", "fri", "sun"],
    },
    {
      name: "Kohinorr",
      time: [
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
        "24:00",
        "25:00",
        "26:00",
        "27:00",
        "28:00",
        "29:00",
      ],
      id: "kohinorr",
      ilvl: 880,
      image: kohinorr,
      location: "",
      days: ["tue", "fri", "sun"],
    },
    {
      name: "Sol Grande",
      time: [
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
        "24:00",
        "25:00",
        "26:00",
        "27:00",
        "28:00",
        "29:00",
      ],
      id: "solgrande",
      ilvl: 1040,
      image: solgrande,
      location: "",
      days: ["tue", "fri", "sun"],
    },
    {
      name: "Ancheladus",
      time: [
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
        "24:00",
        "25:00",
        "26:00",
        "27:00",
        "28:00",
        "29:00",
      ],
      id: "ancheladus",
      ilvl: 1040,
      image: ancheladus,
      location: "",
      days: ["tue", "fri", "sun"],
    },
    {
      name: "Brealeos",
      time: [
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
        "24:00",
        "25:00",
        "26:00",
        "27:00",
        "28:00",
        "29:00",
      ],
      id: "brealeos",
      ilvl: 1385,
      image: brealeos,
      location: "",
      days: ["tue", "fri", "sun"],
    },
    {
      name: "Aurion",
      time: [
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
        "24:00",
        "25:00",
        "26:00",
        "27:00",
        "28:00",
        "29:00",
      ],
      id: "aurion",
      ilvl: 1385,
      image: aurion,
      location: "",
      days: ["tue", "fri", "sun"],
    },
    {
      name: "Moake",
      time: [
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
        "24:00",
        "25:00",
        "26:00",
        "27:00",
        "28:00",
        "29:00",
      ],
      id: "moake",
      ilvl: 1415,
      image: moake,
      location: "Tikatika Colony",
      days: ["tue", "fri", "sun"],
    },
  ],
  ghostship: [
    {
      name: "Nightmare Ghost Ship",
      time: [
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
        "24:00",
        "25:00",
        "26:00",
        "27:00",
        "28:00",
        "29:00",
      ],
      id: "ghostship_460",
      ilvl: 460,
      image: ghostship,
      location: "",
      days: ["tue", "thu", "sat"],
    },
    {
      name: "Shadow Ghost Ship",
      time: [
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
        "24:00",
        "25:00",
        "26:00",
        "27:00",
        "28:00",
        "29:00",
      ],
      id: "ghostship_960",
      ilvl: 960,
      image: ghostship,
      location: "",
      days: ["tue", "thu", "sat"],
    },
    {
      name: "Tempest Ghost Ship",
      time: [
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
        "24:00",
        "25:00",
        "26:00",
        "27:00",
        "28:00",
        "29:00",
      ],
      id: "ghostship_1370",
      ilvl: 1370,
      image: ghostship,
      location: "",
      days: ["tue", "thu", "sat"],
    },
  ],
  islands: [
    {
      name: "Alakkir",
      time: ["1:50", "7:50", "13:50", "16:50", "19:50", "22:50"],
      id: "alakkir",
      ilvl: 250,
      image: alakkir,
      location: "Alakkir",
      days: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
    },
    {
      name: "Death's Hold Island",
      time: ["1:20", "7:20", "13:20", "15:20", "19:20", "22:20"],
      id: "deathshold",
      ilvl: 250,
      image: deathshold,
      location: "Death's Hold Island",
      days: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
    },
    {
      name: "Erasmo",
      time: ["6:00", "14:00", "20:00"],
      id: "erasmo",
      ilvl: 460,
      image: erasmo,
      location: "Erasmo",
      days: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
    },
    {
      name: "Gesbroy",
      time: [
        "0:20",
        "1:20",
        "2:20",
        "3:20",
        "4:20",
        "5:20",
        "6:20",
        "7:20",
        "8:20",
        "9:20",
        "10:20",
        "11:20",
        "12:20",
        "13:20",
        "14:20",
        "15:20",
        "16:20",
        "17:20",
        "18:20",
        "19:20",
        "20:20",
        "21:20",
        "22:20",
        "23:20",
      ],
      id: "gesbroy",
      ilvl: 600,
      image: gesbroy,
      location: "Gesbroy",
      days: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
    },
    {
      name: "Illusion Isle",
      time: [
        "2:00",
        "4:00",
        "6:00",
        "8:00",
        "10:00",
        "12:00",
        "14:00",
        "16:00",
        "18:00",
        "20:00",
        "22:00",
        "24:00",
      ],
      id: "illusion",
      ilvl: 250,
      image: illusion,
      location: "Illusion Isle",
      days: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
    },
    {
      name: "Lullaby Island",
      time: [
        "0:20",
        "2:20",
        "4:20",
        "6:20",
        "8:20",
        "10:20",
        "12:20",
        "14:20",
        "16:20",
        "18:20",
        "20:20",
        "22:20",
      ],
      id: "lullaby",
      ilvl: 250,
      image: lullaby,
      location: "Lullaby Island",
      days: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
    },
    {
      name: "Shangra",
      time: ["6:00", "12:00", "16:00", "18:00", "22:00", "24:00"],
      id: "shangra",
      ilvl: 460,
      image: shangra,
      location: "Shangra",
      days: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
    },
    {
      name: "Spida Island",
      time: ["1:30", "7:30", "13:30", "19:30", "22:30"],
      id: "spida",
      ilvl: 250,
      image: spida,
      location: "Spida Island",
      days: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
    },
    {
      name: "Tooki Island",
      time: ["0:50", "4:50", "8:50", "12:50", "16:50", "20:50"],
      id: "tooki",
      ilvl: 250,
      image: tooki,
      location: "Tooki Island",
      days: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
    },
    {
      name: "Unknown Island",
      time: ["0:20", "4:20", "10:20", "13:20", "16:20", "22:20"],
      id: "unknown",
      ilvl: 460,
      image: unknown,
      location: "Unknown Island",
      days: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
    },
  ],
  sailing: [
    // Arthetine
    {
      name: "Sailing Co-op: Arthetine",
      time: ["19:30"],
      id: "sailingcoop_arthetine_1930",
      ilvl: 302,
      image: sailingcoop,
      location: "Arthetine",
      days: ["mon", "thu", "sun"],
    },
    {
      name: "Sailing Co-op: Arthetine",
      time: ["21:30"],
      id: "sailingcoop_arthetine_2130",
      ilvl: 302,
      image: sailingcoop,
      location: "Arthetine",
      days: ["wed", "sat"],
    },
    {
      name: "Sailing Co-op: Arthetine",
      time: ["23:30"],
      id: "sailingcoop_arthetine_2330",
      ilvl: 302,
      image: sailingcoop,
      location: "Arthetine",
      days: ["tue", "fri"],
    },
    // Anikka
    {
      name: "Sailing Co-op: Anikka",
      time: ["19:30"],
      id: "sailingcoop_anikka_1930",
      ilvl: 302,
      image: sailingcoop,
      location: "Anikka",
      days: ["tue", "fri"],
    },
    {
      name: "Sailing Co-op: Anikka",
      time: ["21:30"],
      id: "sailingcoop_anikka_2130",
      ilvl: 302,
      image: sailingcoop,
      location: "Anikka",
      days: ["mon", "thu"],
    },
    {
      name: "Sailing Co-op: Anikka",
      time: ["23:30"],
      id: "sailingcoop_anikka_2330",
      ilvl: 302,
      image: sailingcoop,
      location: "Anikka",
      days: ["wed", "sat", "sun"],
    },
    // Vern
    {
      name: "Sailing Co-op: Vern",
      time: ["19:30"],
      id: "sailingcoop_vern_1930",
      ilvl: 302,
      image: sailingcoop,
      location: "Vern",
      days: ["wed", "sat"],
    },
    {
      name: "Sailing Co-op: Vern",
      time: ["21:30"],
      id: "sailingcoop_vern_2130",
      ilvl: 302,
      image: sailingcoop,
      location: "Vern",
      days: ["tue", "fri", "sun"],
    },
    {
      name: "Sailing Co-op: Vern",
      time: ["23:30"],
      id: "sailingcoop_vern_2330",
      ilvl: 302,
      image: sailingcoop,
      location: "Vern",
      days: ["mon", "thu"],
    },
    // Rohendel
    {
      name: "Sailing Co-op: Rohendel",
      time: ["19:30"],
      id: "sailingcoop_rohendel_1930",
      ilvl: 460,
      image: sailingcoop,
      location: "Rohendel",
      days: ["thu", "sat"],
    },
    {
      name: "Sailing Co-op: Rohendel",
      time: ["21:30"],
      id: "sailingcoop_rohendel_2130",
      ilvl: 460,
      image: sailingcoop,
      location: "Rohendel",
      days: ["mon", "fri"],
    },
    {
      name: "Sailing Co-op: Rohendel",
      time: ["23:30"],
      id: "sailingcoop_rohendel_2330",
      ilvl: 460,
      image: sailingcoop,
      location: "Rohendel",
      days: ["tue", "sun"],
    },
    // Yorn
    {
      name: "Sailing Co-op: Yorn",
      time: ["19:30"],
      id: "sailingcoop_yorn_1930",
      ilvl: 802,
      image: sailingcoop,
      location: "Yorn",
      days: ["wed"],
    },
    {
      name: "Sailing Co-op: Yorn",
      time: ["21:30"],
      id: "sailingcoop_yorn_2130",
      ilvl: 802,
      image: sailingcoop,
      location: "Yorn",
      days: ["tue", "sat"],
    },
    {
      name: "Sailing Co-op: Yorn",
      time: ["23:30"],
      id: "sailingcoop_yorn_2330",
      ilvl: 802,
      image: sailingcoop,
      location: "Yorn",
      days: ["mon", "fri"],
    },
    // Feiton
    {
      name: "Sailing Co-op: Feiton",
      time: ["19:30"],
      id: "sailingcoop_feiton_1930",
      ilvl: 960,
      image: sailingcoop,
      location: "Feiton",
      days: ["mon", "fri", "sun"],
    },
    {
      name: "Sailing Co-op: Feiton",
      time: ["21:30"],
      id: "sailingcoop_feiton_2130",
      ilvl: 960,
      image: sailingcoop,
      location: "Feiton",
      days: ["wed"],
    },
    {
      name: "Sailing Co-op: Feiton",
      time: ["23:30"],
      id: "sailingcoop_feiton_2330",
      ilvl: 960,
      image: sailingcoop,
      location: "Feiton",
      days: ["thu"],
    },
    // Punika
    {
      name: "Sailing Co-op: Punika",
      time: ["19:30"],
      id: "sailingcoop_punika_1930",
      ilvl: 1302,
      image: sailingcoop,
      location: "Punika",
      days: ["tue"],
    },
    {
      name: "Sailing Co-op: Punika",
      time: ["21:30"],
      id: "sailingcoop_punika_2130",
      ilvl: 1302,
      image: sailingcoop,
      location: "Punika",
      days: ["thu", "sun"],
    },
    {
      name: "Sailing Co-op: Punika",
      time: ["23:30"],
      id: "sailingcoop_punika_2330",
      ilvl: 1302,
      image: sailingcoop,
      location: "Punika",
      days: ["wed", "sat"],
    },
    // Gates
    {
      name: "Gate of Harmony",
      time: ["18:00", "22:00"],
      id: "sailingcoop_harmony_2200",
      ilvl: 302,
      image: sailingcoop,
      location: "",
      days: ["mon", "wed"],
    },
    {
      name: "Gate of Harmony",
      time: ["18:00", "23:00"],
      id: "sailingcoop_harmony_2300",
      ilvl: 302,
      image: sailinggate,
      location: "",
      days: ["sat"],
    },
    {
      name: "Gate of Wisdom",
      time: ["18:00"],
      id: "sailingcoop_wisdom_1800",
      ilvl: 460,
      image: sailinggate,
      location: "",
      days: ["wed"],
    },
    {
      name: "Gate of Wisdom",
      time: ["22:00"],
      id: "sailingcoop_wisdom_2200",
      ilvl: 460,
      image: sailinggate,
      location: "",
      days: ["mon"],
    },
    {
      name: "Gate of Wisdom",
      time: ["23:00"],
      id: "sailingcoop_wisdom_2300",
      ilvl: 460,
      image: sailinggate,
      location: "",
      days: ["sat"],
    },
    {
      name: "Gate of Earth",
      time: ["18:00"],
      id: "sailingcoop_earth_1800",
      ilvl: 802,
      image: sailinggate,
      location: "",
      days: ["mon", "sat"],
    },
    {
      name: "Gate of Earth",
      time: ["22:00"],
      id: "sailingcoop_earth_2200",
      ilvl: 802,
      image: sailinggate,
      location: "",
      days: ["wed"],
    },
    {
      name: "Gate of Endurance",
      time: ["18:00"],
      id: "sailingcoop_endurance_1800",
      ilvl: 960,
      image: sailinggate,
      location: "",
      days: ["mon", "sat"],
    },
    {
      name: "Gate of Endurance",
      time: ["22:00"],
      id: "sailingcoop_endurance_2200",
      ilvl: 960,
      image: sailinggate,
      location: "",
      days: ["wed"],
    },
    {
      name: "Gate of Guidance",
      time: ["18:00"],
      id: "sailingcoop_guidance_1800",
      ilvl: 1302,
      image: sailinggate,
      location: "",
      days: ["wed", "sat"],
    },
    {
      name: "Gate of Guidance",
      time: ["22:00"],
      id: "sailingcoop_guidance_2200",
      ilvl: 1302,
      image: sailinggate,
      location: "",
      days: ["mon"],
    },
  ],
  pvp: [
    {
      name: "Proving Grounds Co-op Battle",
      time: ["19:00"],
      id: "coopbattle",
      ilvl: 250,
      image: coopbattle,
      location: "",
      days: ["mon", "tue", "wed", "thu", "fri"],
    },
    {
      name: "Proving Grounds Co-op Battle",
      time: ["12:00", "18:00"],
      id: "coopbattle",
      ilvl: 250,
      image: coopbattle,
      location: "",
      days: ["sat", "sun"],
    },
  ],
};

export const days = {
  0: "sun",
  1: "mon",
  2: "tue",
  3: "wed",
  4: "thu",
  5: "fri",
  6: "sat",
};
